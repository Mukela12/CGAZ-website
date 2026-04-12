import { GlobalConfig } from 'payload'

export const FeaturedDocumentary: GlobalConfig = {
  slug: 'featured-documentary',
  label: 'Featured Documentary',

  access: {
    // Everyone can read (public)
    read: () => true,
    // Only admins can update
    update: ({ req: { user } }) => !!user,
  },

  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (!data) return data
        // Auto-extract YouTube video ID from full URLs
        if (data.youtubeVideoId) {
          const raw = data.youtubeVideoId.trim()
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
    afterChange: [
      async ({ doc, previousDoc, req }) => {
        // When the featured video changes, auto-add the OLD video to the
        // Media Library so it's still visible on the /media page.
        const oldId = previousDoc?.youtubeVideoId
        const newId = doc?.youtubeVideoId
        if (!oldId || oldId === newId) return

        try {
          // Check if the old video already exists in Media Library
          const { docs } = await req.payload.find({
            collection: 'media-library',
            where: { youtubeVideoId: { equals: oldId } },
            limit: 1,
            depth: 0,
          })

          if (docs.length === 0) {
            // Create a new Media Library entry for the old featured video
            const oldTitle = previousDoc?.title || 'Previous Featured Documentary'
            const slug = oldTitle
              .toLowerCase()
              .trim()
              .replace(/[^a-z0-9\s-]/g, '')
              .replace(/\s+/g, '-')
              .replace(/-+/g, '-')
              .replace(/^-|-$/g, '')

            await req.payload.create({
              collection: 'media-library',
              data: {
                title: oldTitle,
                slug,
                type: 'video',
                description: previousDoc?.subtitle || oldTitle,
                youtubeVideoId: oldId,
                language: 'english',
                publishedDate: new Date().toISOString(),
                isFeatured: false,
                status: 'published',
              },
            })
            req.payload.logger?.info(
              `Auto-archived previous featured documentary "${oldTitle}" (${oldId}) to Media Library`,
            )
          }
        } catch (err) {
          req.payload.logger?.error(
            { err },
            'Failed to auto-archive previous featured documentary to Media Library',
          )
        }
      },
    ],
  },

  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Video Settings',
          fields: [
            {
              name: 'isEnabled',
              type: 'checkbox',
              label: 'Display Documentary on Homepage',
              defaultValue: false,
              admin: {
                description: 'Toggle to show/hide the documentary section on the homepage.',
              },
            },
            {
              name: 'title',
              type: 'text',
              label: 'Section Title',
              defaultValue: 'Our Story',
              admin: {
                description: 'Heading shown above the video on the homepage (e.g. "Our Story").',
              },
            },
            {
              name: 'subtitle',
              type: 'textarea',
              label: 'Section Subtitle',
              defaultValue: 'Watch our documentary to learn about CGAZ\'s mission to empower cashew farmers across Zambia.',
              admin: {
                description: 'Short description shown below the heading.',
              },
            },
            {
              name: 'youtubeVideoId',
              type: 'text',
              label: 'YouTube Video ID or Link',
              admin: {
                description:
                  'Paste the full YouTube link or just the ID — both work. When you change the video here, the previous video is automatically saved to the Media Library so it stays visible on the /media page.',
              },
            },
            {
              name: 'youtubeUrl',
              type: 'text',
              label: 'Generated Embed URL',
              admin: {
                readOnly: true,
                description: 'Auto-generated — do not edit.',
              },
              hooks: {
                beforeChange: [
                  ({ siblingData }) => {
                    const videoId = siblingData?.youtubeVideoId
                    if (videoId) {
                      return `https://www.youtube.com/embed/${videoId}`
                    }
                    return ''
                  },
                ],
              },
            },
          ],
        },
        {
          label: 'Display Options',
          fields: [
            {
              name: 'showControls',
              type: 'checkbox',
              label: 'Show YouTube Player Controls',
              defaultValue: true,
              admin: {
                description: 'Display native YouTube controls (play/pause, volume, fullscreen)',
              },
            },
            {
              name: 'loop',
              type: 'checkbox',
              label: 'Loop Video Playback',
              defaultValue: false,
              admin: {
                description: 'Automatically restart the video when it ends',
              },
            },
            {
              name: 'sectionBackground',
              type: 'select',
              label: 'Section Background Theme',
              defaultValue: 'dark',
              options: [
                { label: 'Dark (Black)', value: 'dark' },
                { label: 'Light (White)', value: 'light' },
                { label: 'Green (Brand)', value: 'green' },
              ],
              admin: {
                description: 'Background color theme for the documentary section',
              },
            },
          ],
        },
        {
          label: 'How to Upload',
          description: 'Step-by-step guide for adding a YouTube video',
          fields: [
            {
              name: 'step1',
              type: 'collapsible',
              label: 'Step 1: Upload Video to YouTube',
              admin: {
                initCollapsed: false,
              },
              fields: [
                {
                  name: 'step1Instructions',
                  type: 'ui',
                  admin: {
                    components: {
                      Field: '/payload/components/Step1Instructions',
                    },
                  },
                },
              ],
            },
            {
              name: 'step2',
              type: 'collapsible',
              label: 'Step 2: Get the Video ID',
              admin: {
                initCollapsed: false,
              },
              fields: [
                {
                  name: 'step2Instructions',
                  type: 'ui',
                  admin: {
                    components: {
                      Field: '/payload/components/Step2Instructions',
                    },
                  },
                },
              ],
            },
            {
              name: 'step3',
              type: 'collapsible',
              label: 'Step 3: Add to Website',
              admin: {
                initCollapsed: false,
              },
              fields: [
                {
                  name: 'step3Instructions',
                  type: 'ui',
                  admin: {
                    components: {
                      Field: '/payload/components/Step3Instructions',
                    },
                  },
                },
              ],
            },
            {
              name: 'tips',
              type: 'collapsible',
              label: 'Tips & Best Practices',
              admin: {
                initCollapsed: true,
              },
              fields: [
                {
                  name: 'tipsContent',
                  type: 'ui',
                  admin: {
                    components: {
                      Field: '/payload/components/TipsContent',
                    },
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
