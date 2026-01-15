import type { CollectionConfig } from 'payload'
import path from 'path'

// Lazy import cloudinary to avoid issues with env variables during build/seed
function getCloudinary() {
  const cloudinaryModule = require('@/lib/cloudinary')
  return cloudinaryModule.default
}

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    useAsTitle: 'alt',
    group: 'Media',
  },
  access: {
    read: () => true,
  },
  upload: {
    staticDir: 'public/media',
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
      },
      {
        name: 'card',
        width: 768,
        height: 512,
        position: 'centre',
      },
      {
        name: 'tablet',
        width: 1024,
        height: undefined,
        position: 'centre',
      },
    ],
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/*'],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      label: 'Alt Text',
      admin: {
        description: 'Descriptive text for accessibility and SEO',
      },
    },
    {
      name: 'caption',
      type: 'text',
      label: 'Caption',
    },
    {
      name: 'category',
      type: 'select',
      options: [
        { label: 'Government Visits', value: 'government-visits' },
        { label: 'Training Programs', value: 'training' },
        { label: 'Processing Facilities', value: 'processing' },
        { label: 'Farming Activities', value: 'farming' },
        { label: 'Products', value: 'products' },
        { label: 'Team Photos', value: 'team' },
        { label: 'Events', value: 'events' },
        { label: 'Partner Logos', value: 'logos' },
        { label: 'Other', value: 'other' },
      ],
      label: 'Image Category',
    },
    {
      name: 'photographer',
      type: 'text',
      label: 'Photographer/Credit',
    },
    {
      name: 'dateTaken',
      type: 'date',
      label: 'Date Taken',
    },
    {
      name: 'cloudinaryUrl',
      type: 'text',
      admin: {
        readOnly: true,
        description: 'Cloudinary CDN URL for this image',
      },
      label: 'Cloudinary URL',
    },
    {
      name: 'cloudinaryPublicId',
      type: 'text',
      admin: {
        readOnly: true,
        description: 'Cloudinary public ID for managing this image',
      },
      label: 'Cloudinary Public ID',
    },
  ],
  hooks: {
    afterChange: [
      async ({ doc, req, operation }) => {
        // Only upload to Cloudinary on create operations
        if (operation === 'create' && doc.filename) {
          try {
            const filePath = path.join(process.cwd(), 'public/media', doc.filename)

            // Upload to Cloudinary in CGAZ-IMAGES folder
            const cloudinary = getCloudinary()
            const result = await cloudinary.uploader.upload(filePath, {
              folder: 'CGAZ-IMAGES',
              public_id: path.parse(doc.filename).name,
              overwrite: false,
            })

            // Update document with Cloudinary URL
            await req.payload.update({
              collection: 'media',
              id: doc.id,
              data: {
                cloudinaryUrl: result.secure_url,
                cloudinaryPublicId: result.public_id,
              },
            })
          } catch (error) {
            console.error('Error uploading to Cloudinary:', error)
          }
        }
      },
    ],
    afterDelete: [
      async ({ doc }) => {
        // Delete from Cloudinary when media is deleted
        if (doc.cloudinaryPublicId) {
          try {
            const cloudinary = getCloudinary()
            await cloudinary.uploader.destroy(doc.cloudinaryPublicId)
          } catch (error) {
            console.error('Error deleting from Cloudinary:', error)
          }
        }
      },
    ],
  },
}
