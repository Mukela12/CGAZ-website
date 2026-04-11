-- Mirror of payload/migrations/20260411_000000_add_audio_media.ts as raw SQL.
-- Applied directly to Railway because the Payload CLI can't resolve the
-- extensionless TS imports in payload.config.ts under Node 22 ESM.

BEGIN;

-- 1. audio_media table
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
CREATE INDEX IF NOT EXISTS "audio_media_created_at_idx" ON "audio_media" ("created_at");
CREATE INDEX IF NOT EXISTS "audio_media_updated_at_idx" ON "audio_media" ("updated_at");

-- 2. media_library.audio_file_id column + FK + index
ALTER TABLE "media_library" ADD COLUMN IF NOT EXISTS "audio_file_id" integer;
DO $$ BEGIN
  ALTER TABLE "media_library"
    ADD CONSTRAINT "media_library_audio_file_id_audio_media_id_fk"
    FOREIGN KEY ("audio_file_id") REFERENCES "audio_media"("id") ON DELETE SET NULL;
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
CREATE INDEX IF NOT EXISTS "media_library_audio_file_idx" ON "media_library" ("audio_file_id");

-- 3. Loosen youtube_video_id — it is now conditional on type = 'video'
ALTER TABLE "media_library" ALTER COLUMN "youtube_video_id" DROP NOT NULL;

-- 4. Wire AudioMedia into payload_locked_documents_rels
ALTER TABLE "payload_locked_documents_rels"
  ADD COLUMN IF NOT EXISTS "audio_media_id" integer;
DO $$ BEGIN
  ALTER TABLE "payload_locked_documents_rels"
    ADD CONSTRAINT "payload_locked_documents_rels_audio_media_fk"
    FOREIGN KEY ("audio_media_id") REFERENCES "audio_media"("id") ON DELETE CASCADE;
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_audio_media_id_idx"
  ON "payload_locked_documents_rels" ("audio_media_id");

-- 5. Record the migration so Payload's tracker stays honest
INSERT INTO payload_migrations (name, batch, created_at, updated_at)
VALUES ('20260411_000000_add_audio_media', 1, now(), now())
ON CONFLICT DO NOTHING;

COMMIT;
