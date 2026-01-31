import type { CollectionConfig } from 'payload'
import path from 'path'
import { uploadToCloudinaryFromBuffer, deleteFromCloudinary } from '@/lib/cloudinary'

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
    // Disable local storage - we upload directly to Cloudinary
    disableLocalStorage: true,
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
    beforeChange: [
      async ({ data, req, operation }) => {
        // Upload to Cloudinary on create
        if (operation === 'create' && req.file) {
          const file = req.file
          const filename = file.name || 'upload'
          const publicId = path.parse(filename).name

          try {
            // Get the file buffer
            const buffer = file.data as Buffer

            if (!buffer || buffer.length === 0) {
              console.error('No file buffer available for upload')
              return data
            }

            console.log(`Uploading ${filename} to Cloudinary...`)

            const uploadResult = await uploadToCloudinaryFromBuffer(buffer, {
              folder: 'CGAZ-IMAGES',
              publicId: publicId,
              resourceType: 'image',
              overwrite: false,
            })

            console.log(`✓ Media uploaded to Cloudinary: ${uploadResult.public_id}`)

            // Set Cloudinary URLs in the document data
            data.cloudinaryUrl = uploadResult.secure_url
            data.cloudinaryPublicId = uploadResult.public_id

            // Also set the URL field that Payload uses for display
            data.url = uploadResult.secure_url

          } catch (error: any) {
            console.error('✗ Cloudinary upload failed:', error?.message || error)
            // Don't throw - allow the upload to proceed without Cloudinary
            // The admin can retry later
          }
        }

        return data
      },
    ],
    afterDelete: [
      async ({ doc }) => {
        // Delete from Cloudinary when media is deleted
        if (doc.cloudinaryPublicId) {
          try {
            await deleteFromCloudinary(doc.cloudinaryPublicId, 'image')
            console.log(`✓ Deleted from Cloudinary: ${doc.cloudinaryPublicId}`)
          } catch (error) {
            console.error('Error deleting from Cloudinary:', error)
          }
        }
      },
    ],
  },
}
