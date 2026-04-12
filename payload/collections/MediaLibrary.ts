import type { CollectionConfig } from 'payload'

/**
 * Media Library collection — holds all videos and radio/audio programs.
 *
 * Content lives on YouTube. Editors paste the YouTube video ID and fill in
 * metadata. One entry can be marked "Featured on Homepage" — a beforeChange
 * hook un-features any other entry whenever a new one is marked featured,
 * so only one featured entry ever exists at a time.
 *
 * The homepage reads whichever entry currently has isFeatured=true AND
 * type='video'. Radio programs can also be featured (for future use on the
 * media page banner) without breaking the homepage documentary slot.
 */
export const MediaLibrary: CollectionConfig = {
  slug: 'media-library',
  labels: {
    singular: 'Media Library Entry',
    plural: 'Media Library',
  },
  admin: {
    useAsTitle: 'title',
    group: 'Content',
    defaultColumns: ['title', 'type', 'language', 'publishedDate', 'isFeatured', 'status'],
    description:
      'All media content for the /media page. For videos: paste a YouTube link. For radio/podcasts: upload an audio file. Check "Feature on Homepage" to display a video in the homepage documentary section.',
  },
  access: {
    read: ({ req }) => {
      // Published entries are public; drafts only visible to authenticated users
      if (req.user) return true
      return {
        status: {
          equals: 'published',
        },
      }
    },
  },
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (!data) return data

        // Auto-generate slug from title if slug is empty or looks unformatted
        if (data.title && (!data.slug || data.slug === data.title || /\s/.test(data.slug))) {
          data.slug = data.title
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, '')
        }

        // Auto-extract YouTube video ID from full URLs
        if (data.youtubeVideoId) {
          const raw = data.youtubeVideoId.trim()
          // Match youtu.be/ID, youtube.com/watch?v=ID, youtube.com/embed/ID
          const match = raw.match(
            /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/))([a-zA-Z0-9_-]{11})/,
          )
          if (match) {
            data.youtubeVideoId = match[1]
          }
        }

        return data
      },
    ],
    beforeChange: [
      async ({ data, req, operation, originalDoc }) => {
        // When an entry is being marked featured, un-feature every other entry
        // of the same type so only one featured-per-type exists at a time.
        const wasFeatured = originalDoc?.isFeatured === true
        const isNowFeatured = data?.isFeatured === true

        if (isNowFeatured && !wasFeatured && data?.type) {
          try {
            const { docs } = await req.payload.find({
              collection: 'media-library',
              where: {
                and: [
                  { isFeatured: { equals: true } },
                  { type: { equals: data.type } },
                  // Exclude this doc when updating
                  ...(operation === 'update' && originalDoc?.id
                    ? [{ id: { not_equals: originalDoc.id } }]
                    : []),
                ],
              },
              limit: 100,
              depth: 0,
            })

            for (const existing of docs) {
              await req.payload.update({
                collection: 'media-library',
                id: existing.id,
                data: { isFeatured: false },
                depth: 0,
              })
            }
          } catch (err) {
            req.payload.logger?.error(
              { err },
              'Failed to un-feature other media-library entries',
            )
          }
        }

        return data
      },
    ],
  },
  fields: [
    // ── Row 1: Type + Status side-by-side (pick these first) ──
    {
      type: 'row',
      fields: [
        {
          name: 'type',
          type: 'select',
          required: true,
          defaultValue: 'video',
          options: [
            { label: 'Video (YouTube)', value: 'video' },
            { label: 'Radio Program', value: 'radio' },
            { label: 'Podcast', value: 'podcast' },
          ],
          admin: {
            width: '50%',
            description: 'Choose "Video" for YouTube content, or "Radio/Podcast" for audio uploads.',
          },
        },
        {
          name: 'status',
          type: 'select',
          required: true,
          defaultValue: 'published',
          options: [
            { label: 'Published (visible on site)', value: 'published' },
            { label: 'Draft (hidden from site)', value: 'draft' },
          ],
          admin: {
            width: '50%',
            description: 'Set to Published when ready for the public to see.',
          },
        },
      ],
    },
    // ── Title ──
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Title',
      admin: {
        description: 'The name shown on the website, e.g. "Cashew Farming in Senanga".',
      },
    },
    // ── Slug (auto-generated, hidden from admin) ──
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'URL Slug',
      admin: {
        position: 'sidebar',
        description: 'Auto-generated from title. Only edit if you need a custom URL.',
      },
    },
    // ── Description ──
    {
      name: 'description',
      type: 'textarea',
      required: true,
      label: 'Description',
      admin: {
        description: 'A short summary (2–4 sentences) shown on the media card and detail page.',
      },
    },
    // ── YouTube field (only for video type) ──
    {
      name: 'youtubeVideoId',
      type: 'text',
      label: 'YouTube Link or Video ID',
      admin: {
        description:
          'Paste the full YouTube link (e.g. https://youtu.be/O4QVdR-od9c) or just the video ID. The system extracts the ID automatically. Make sure the video is set to Public or Unlisted on YouTube — Private videos will not play.',
        condition: (_, siblingData) => siblingData?.type === 'video',
      },
      validate: (value: string | null | undefined, { siblingData }: any) => {
        if (siblingData?.type === 'video' && (!value || value.trim().length === 0)) {
          return 'Video entries require a YouTube link or video ID.'
        }
        return true
      },
    },
    // ── Audio file (only for radio/podcast type) ──
    {
      name: 'audioFile',
      type: 'relationship',
      relationTo: 'audio-media',
      label: 'Audio File',
      admin: {
        description:
          'Select an audio file. If you haven\'t uploaded one yet, go to "Audio Media" in the sidebar first, upload the file there, then come back and select it.',
        condition: (_, siblingData) =>
          siblingData?.type === 'radio' || siblingData?.type === 'podcast',
      },
      validate: (value: any, { siblingData }: any) => {
        const isAudioType = siblingData?.type === 'radio' || siblingData?.type === 'podcast'
        if (isAudioType && !value) {
          return 'Radio and podcast entries require an audio file.'
        }
        return true
      },
    },
    // ── Row 2: Language + Location side-by-side ──
    {
      type: 'row',
      fields: [
        {
          name: 'language',
          type: 'select',
          required: true,
          defaultValue: 'english',
          options: [
            { label: 'English', value: 'english' },
            { label: 'Lozi', value: 'lozi' },
            { label: 'Bemba', value: 'bemba' },
            { label: 'Nyanja', value: 'nyanja' },
            { label: 'Tonga', value: 'tonga' },
            { label: 'Mixed', value: 'mixed' },
          ],
          admin: {
            width: '50%',
          },
        },
        {
          name: 'location',
          type: 'text',
          label: 'Location',
          admin: {
            width: '50%',
            description: 'e.g. "Senanga", "Mongu", "Limulunga District"',
          },
        },
      ],
    },
    // ── Row 3: Date + Duration side-by-side ──
    {
      type: 'row',
      fields: [
        {
          name: 'publishedDate',
          type: 'date',
          required: true,
          label: 'Published Date',
          defaultValue: () => new Date(),
          admin: {
            width: '50%',
            date: {
              pickerAppearance: 'dayOnly',
            },
            description: 'When this was originally released.',
          },
        },
        {
          name: 'duration',
          type: 'text',
          label: 'Duration',
          admin: {
            width: '50%',
            description: 'e.g. "6:45" or "18 minutes"',
          },
        },
      ],
    },
    // ── Thumbnail ──
    {
      name: 'customThumbnail',
      type: 'upload',
      relationTo: 'media',
      label: 'Custom Thumbnail (optional)',
      admin: {
        description:
          'For videos, a YouTube thumbnail is used automatically. Only upload here if you want a different image.',
      },
    },
    // ── Featured checkbox ──
    {
      name: 'isFeatured',
      type: 'checkbox',
      defaultValue: false,
      label: 'Feature on Homepage',
      admin: {
        description:
          'Check this to display the video in the homepage documentary section. Only one video can be featured at a time — checking this will automatically un-feature the current one.',
        condition: (_, siblingData) => siblingData?.type === 'video',
      },
    },
  ],
}
