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
          const filePath = path.join(process.cwd(), 'public/media', doc.filename)
          let uploadResult = null
          let lastError = null

          // Retry logic: 3 attempts with 1 second delay between retries
          for (let attempt = 1; attempt <= 3; attempt++) {
            try {
              const cloudinary = getCloudinary()
              uploadResult = await cloudinary.uploader.upload(filePath, {
                folder: 'CGAZ-IMAGES',
                public_id: path.parse(doc.filename).name,
                overwrite: false,
              })
              console.log(`✓ Media uploaded to Cloudinary: ${uploadResult.public_id}`)
              break // Success, exit retry loop
            } catch (error) {
              lastError = error
              console.error(`✗ Cloudinary upload attempt ${attempt}/3 failed:`, error)
              if (attempt < 3) {
                // Wait 1 second before retrying
                await new Promise(resolve => setTimeout(resolve, 1000))
              }
            }
          }

          if (uploadResult) {
            // Update document with Cloudinary URL
            try {
              await req.payload.update({
                collection: 'media',
                id: doc.id,
                data: {
                  cloudinaryUrl: uploadResult.secure_url,
                  cloudinaryPublicId: uploadResult.public_id,
                },
              })
            } catch (updateError) {
              console.error('Failed to update media with Cloudinary URL:', updateError)
            }
          } else {
            // All retries failed - delete the record to prevent orphaned entries
            console.error(`✗ All Cloudinary upload attempts failed for media ${doc.id}`)
            try {
              await req.payload.delete({
                collection: 'media',
                id: doc.id,
              })
              console.log(`✗ Deleted media record ${doc.id} due to Cloudinary upload failure`)
            } catch (deleteError) {
              console.error('Failed to cleanup media record:', deleteError)
            }
            throw new Error(`Failed to upload media to Cloudinary after 3 attempts: ${lastError?.message || 'Unknown error'}`)
          }
        }
        return doc
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
