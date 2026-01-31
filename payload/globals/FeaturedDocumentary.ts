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
                description: 'Toggle to show/hide the documentary section on the homepage',
              },
            },
            {
              name: 'title',
              type: 'text',
              label: 'Section Title',
              defaultValue: 'Our Story',
              admin: {
                description: 'Title displayed above the video (e.g., "Our Story", "Documentary")',
              },
            },
            {
              name: 'subtitle',
              type: 'textarea',
              label: 'Section Subtitle',
              defaultValue: 'Watch our documentary to learn about CGAZ\'s mission to empower cashew farmers across Zambia.',
              admin: {
                description: 'Description text displayed below the title',
              },
            },
            {
              name: 'youtubeVideoId',
              type: 'text',
              label: 'YouTube Video ID',
              admin: {
                description: 'Enter the YouTube video ID (e.g., dQw4w9WgXcQ). Find it in the YouTube URL after "v=" or "youtu.be/"',
              },
            },
            {
              name: 'youtubeUrl',
              type: 'text',
              label: 'Generated Embed URL',
              admin: {
                readOnly: true,
                description: 'Auto-generated embed URL (for reference only)',
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
