/**
 * Media Library types and pure helpers.
 *
 * Lives in its own file (separate from lib/payload/api.ts) because client
 * components import these, and api.ts pulls in the Payload server + Postgres
 * adapter — which explodes the browser bundle with "Can't resolve 'fs'".
 */

export type MediaLibraryType = 'video' | 'radio' | 'podcast'
export type MediaLibraryLanguage =
  | 'english'
  | 'lozi'
  | 'bemba'
  | 'nyanja'
  | 'tonga'
  | 'mixed'

export interface AudioMediaFile {
  id: string
  title: string
  cloudinaryUrl: string
  cloudinaryPublicId: string
  duration?: number | null
  fileSize?: number | null
  mimeType?: string | null
}

export interface MediaLibraryEntry {
  id: string
  title: string
  slug: string
  type: MediaLibraryType
  description: string
  youtubeVideoId?: string | null
  audioFile?: AudioMediaFile | string | null
  customThumbnail?: { cloudinaryUrl?: string; url?: string; alt?: string } | null
  language: MediaLibraryLanguage
  location?: string | null
  publishedDate: string
  duration?: string | null
  isFeatured: boolean
  status: 'draft' | 'published'
}

/**
 * Resolve the audioFile field to a plain object even if Payload returns
 * just the relationship ID (shallow depth).
 */
export function resolveAudioFile(
  entry: MediaLibraryEntry,
): AudioMediaFile | null {
  const raw = entry.audioFile
  if (!raw) return null
  if (typeof raw === 'string') return null // unresolved relationship
  return raw
}
