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
      'Videos and radio programs. Videos use a YouTube video ID. Radio programs and podcasts upload audio files directly.',
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
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Title',
      admin: {
        description: 'e.g. "Cashew Farming in Senanga" or "CGAZ/GIZ Radio Program"',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'URL Slug',
      admin: {
        description:
          'Lowercase, words separated by dashes. This becomes the page URL: /media/your-slug',
      },
    },
    {
      name: 'type',
      type: 'select',
      required: true,
      defaultValue: 'video',
      options: [
        { label: 'Video (Documentary / News)', value: 'video' },
        { label: 'Radio Program', value: 'radio' },
        { label: 'Podcast', value: 'podcast' },
      ],
      admin: {
        description:
          'Used to filter the media page. Videos use YouTube; radio and podcasts upload audio files directly.',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      label: 'Description',
      admin: {
        description: 'A short paragraph explaining what this is about (2–4 sentences).',
      },
    },
    {
      name: 'youtubeVideoId',
      type: 'text',
      label: 'YouTube Video ID',
      admin: {
        description:
          'Required for Video entries. Paste only the ID, not the full URL. From https://youtu.be/ABC123xyz paste "ABC123xyz". Radio/podcast entries should use Audio File upload instead.',
        condition: (_, siblingData) => siblingData?.type === 'video',
      },
      validate: (value: string | null | undefined, { siblingData }: any) => {
        if (siblingData?.type === 'video' && (!value || value.trim().length === 0)) {
          return 'Video entries require a YouTube Video ID.'
        }
        return true
      },
    },
    {
      name: 'audioFile',
      type: 'relationship',
      relationTo: 'audio-media',
      label: 'Audio File',
      admin: {
        description:
          'For radio programs and podcasts. Upload an audio file in the Audio Files collection first, then select it here.',
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
    {
      name: 'customThumbnail',
      type: 'upload',
      relationTo: 'media',
      label: 'Custom Thumbnail (optional)',
      admin: {
        description:
          'Leave blank to auto-pull the YouTube thumbnail. Only upload a custom image if the YouTube one is low quality.',
      },
    },
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
    },
    {
      name: 'location',
      type: 'text',
      label: 'Location',
      admin: {
        description: 'Optional. e.g. "Senanga", "Mongu", "Limulunga District"',
      },
    },
    {
      name: 'publishedDate',
      type: 'date',
      required: true,
      label: 'Published Date',
      defaultValue: () => new Date(),
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
        },
        description: 'The date this video/program was originally released.',
      },
    },
    {
      name: 'duration',
      type: 'text',
      label: 'Duration',
      admin: {
        description: 'Optional. Free text, e.g. "12:34" or "23 minutes"',
      },
    },
    {
      name: 'isFeatured',
      type: 'checkbox',
      defaultValue: false,
      label: 'Feature on Homepage',
      admin: {
        description:
          'Only ONE entry per type can be featured at a time. Ticking this will automatically un-feature whatever is currently featured. Videos appear in the homepage documentary section.',
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
      admin: {
        description: 'Drafts are hidden from the public website.',
      },
    },
  ],
}
