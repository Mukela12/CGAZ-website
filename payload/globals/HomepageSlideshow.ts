import type { GlobalConfig } from 'payload'

export const HomepageSlideshow: GlobalConfig = {
  slug: 'homepage-slideshow',
  label: 'Homepage Slideshow',
  admin: {
    group: 'Site Settings',
    description: 'Manage the hero slideshow images on the homepage',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'slides',
      type: 'array',
      label: 'Slideshow Images',
      minRows: 1,
      maxRows: 20,
      admin: {
        description: 'Add images for the homepage hero slideshow. Drag to reorder.',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Image',
          admin: {
            description: 'Select an image from the media library',
          },
        },
        {
          name: 'altText',
          type: 'text',
          label: 'Alt Text (Optional)',
          admin: {
            description: 'Override the image alt text. Leave empty to use the media alt text.',
          },
        },
        {
          name: 'caption',
          type: 'text',
          label: 'Caption (Optional)',
          admin: {
            description: 'Optional caption to display over the image',
          },
        },
      ],
    },
    {
      name: 'autoPlayInterval',
      type: 'number',
      label: 'Auto-Play Interval (ms)',
      defaultValue: 5000,
      min: 2000,
      max: 15000,
      admin: {
        description: 'Time between slide transitions in milliseconds (default: 5000 = 5 seconds)',
      },
    },
  ],
}
