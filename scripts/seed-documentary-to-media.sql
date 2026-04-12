-- Add the CGAZ CASHEW PLANTATION DOCUMENTARY to the media library.
-- This was previously the homepage featured video (youtubeVideoId: cLMfUiyHYJI).
-- Run against Railway Postgres once.

INSERT INTO media_library (
  title,
  slug,
  type,
  description,
  youtube_video_id,
  language,
  location,
  published_date,
  duration,
  is_featured,
  status,
  created_at,
  updated_at
) VALUES (
  'CGAZ Cashew Plantation Documentary',
  'cgaz-cashew-plantation-documentary',
  'video',
  'Documentary showcasing the CGAZ cashew plantation operations and mission to empower cashew farmers across Zambia.',
  'cLMfUiyHYJI',
  'english',
  'Western Province',
  '2026-01-31T00:00:00.000Z',
  '18:30',
  false,
  'published',
  NOW(),
  NOW()
) ON CONFLICT (slug) DO NOTHING;
