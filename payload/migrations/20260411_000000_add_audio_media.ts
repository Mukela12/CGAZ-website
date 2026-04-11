import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

/**
 * Add audio_media collection + wire it onto media_library.audioFile.
 *
 * The initial Railway schema was provisioned via `push` mode (a single
 * placeholder row named "dev" in payload_migrations), so there is no baseline
 * migration. This migration only applies the delta introduced by the direct
 * Cloudinary audio upload feature (commit abfe966):
 *
 *   1. New `audio_media` table backing the AudioMedia collection.
 *   2. New `audio_file_id` FK column on `media_library` (relationship field).
 *   3. Loosen `media_library.youtube_video_id` from NOT NULL to NULL — it is
 *      now conditional on `type = 'video'` in the MediaLibrary collection.
 */

export async function up({ db, payload: _payload, req: _req }: MigrateUpArgs): Promise<void> {
  // 1. audio_media table
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "audio_media" (
      "id" serial PRIMARY KEY NOT NULL,
      "title" varchar NOT NULL,
      "cloudinary_url" varchar NOT NULL,
      "cloudinary_public_id" varchar NOT NULL,
      "duration" numeric,
      "file_size" numeric,
      "mime_type" varchar,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );
  `)
  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "audio_media_created_at_idx" ON "audio_media" ("created_at");
  `)
  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "audio_media_updated_at_idx" ON "audio_media" ("updated_at");
  `)

  // 2. media_library.audio_file_id column + FK + index
  await db.execute(sql`
    ALTER TABLE "media_library" ADD COLUMN IF NOT EXISTS "audio_file_id" integer;
  `)
  await db.execute(sql`
    DO $$ BEGIN
      ALTER TABLE "media_library"
        ADD CONSTRAINT "media_library_audio_file_id_audio_media_id_fk"
        FOREIGN KEY ("audio_file_id") REFERENCES "audio_media"("id") ON DELETE SET NULL;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  `)
  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "media_library_audio_file_idx" ON "media_library" ("audio_file_id");
  `)

  // 3. Loosen youtube_video_id — it is now conditional on type = 'video'
  await db.execute(sql`
    ALTER TABLE "media_library" ALTER COLUMN "youtube_video_id" DROP NOT NULL;
  `)

  // 4. Wire the new collection into payload_locked_documents_rels so admin
  //    locks / relationship lookups work.
  await db.execute(sql`
    ALTER TABLE "payload_locked_documents_rels"
      ADD COLUMN IF NOT EXISTS "audio_media_id" integer;
  `)
  await db.execute(sql`
    DO $$ BEGIN
      ALTER TABLE "payload_locked_documents_rels"
        ADD CONSTRAINT "payload_locked_documents_rels_audio_media_fk"
        FOREIGN KEY ("audio_media_id") REFERENCES "audio_media"("id") ON DELETE CASCADE;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  `)
  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_audio_media_id_idx"
      ON "payload_locked_documents_rels" ("audio_media_id");
  `)
}

export async function down({ db, payload: _payload, req: _req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP INDEX IF EXISTS "payload_locked_documents_rels_audio_media_id_idx";
  `)
  await db.execute(sql`
    ALTER TABLE "payload_locked_documents_rels"
      DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_audio_media_fk";
  `)
  await db.execute(sql`
    ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "audio_media_id";
  `)
  await db.execute(sql`
    ALTER TABLE "media_library" ALTER COLUMN "youtube_video_id" SET NOT NULL;
  `)
  await db.execute(sql`
    DROP INDEX IF EXISTS "media_library_audio_file_idx";
  `)
  await db.execute(sql`
    ALTER TABLE "media_library"
      DROP CONSTRAINT IF EXISTS "media_library_audio_file_id_audio_media_id_fk";
  `)
  await db.execute(sql`
    ALTER TABLE "media_library" DROP COLUMN IF EXISTS "audio_file_id";
  `)
  await db.execute(sql`DROP TABLE IF EXISTS "audio_media";`)
}
