import type { CollectionConfig } from 'payload'
import path from 'path'

// Lazy import cloudinary to avoid issues with env variables during build/seed
function getCloudinary() {
  const cloudinaryModule = require('@/lib/cloudinary')
  return cloudinaryModule.default
}

export const Resources: CollectionConfig = {
  slug: 'resources',
  admin: {
    useAsTitle: 'title',
    group: 'Content',
    defaultColumns: ['title', 'category', 'fileType', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  upload: {
    staticDir: 'public/resources',
    mimeTypes: [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-powerpoint',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'text/plain',
      'application/zip',
    ],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Resource Title',
      admin: {
        description: 'Name of the resource (e.g., "Cashew Farming Guide 2024")',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
      admin: {
        description: 'Brief description of what this resource contains',
      },
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Training Materials', value: 'training' },
        { label: 'Technical Guides', value: 'guides' },
        { label: 'Reports', value: 'reports' },
        { label: 'Policy Documents', value: 'policy' },
        { label: 'Project Documents', value: 'projects' },
        { label: 'Forms & Templates', value: 'forms' },
        { label: 'Research Papers', value: 'research' },
        { label: 'Annual Reports', value: 'annual-reports' },
        { label: 'Other', value: 'other' },
      ],
      label: 'Resource Category',
    },
    {
      name: 'fileType',
      type: 'select',
      admin: {
        description: 'File type will be auto-detected',
        readOnly: true,
      },
      options: [
        { label: 'PDF', value: 'pdf' },
        { label: 'Word Document', value: 'doc' },
        { label: 'Excel Spreadsheet', value: 'excel' },
        { label: 'PowerPoint', value: 'ppt' },
        { label: 'Text File', value: 'txt' },
        { label: 'ZIP Archive', value: 'zip' },
        { label: 'Other', value: 'other' },
      ],
      label: 'File Type',
    },
    {
      name: 'fileSize',
      type: 'text',
      admin: {
        readOnly: true,
        description: 'File size will be calculated automatically',
      },
      label: 'File Size',
    },
    {
      name: 'language',
      type: 'select',
      defaultValue: 'en',
      options: [
        { label: 'English', value: 'en' },
        { label: 'Bemba', value: 'bem' },
        { label: 'Lozi', value: 'loz' },
        { label: 'Nyanja', value: 'nya' },
        { label: 'Tonga', value: 'toi' },
      ],
      label: 'Language',
    },
    {
      name: 'tags',
      type: 'array',
      label: 'Tags',
      fields: [
        {
          name: 'tag',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      label: 'Featured Resource',
      admin: {
        description: 'Display this resource prominently on the resources page',
      },
    },
    {
      name: 'downloadCount',
      type: 'number',
      defaultValue: 0,
      admin: {
        readOnly: true,
        description: 'Number of times this resource has been downloaded',
      },
      label: 'Download Count',
    },
    {
      name: 'cloudinaryUrl',
      type: 'text',
      admin: {
        readOnly: true,
        description: 'Cloudinary CDN URL for this resource',
      },
      label: 'Cloudinary URL',
    },
    {
      name: 'cloudinaryPublicId',
      type: 'text',
      admin: {
        readOnly: true,
        description: 'Cloudinary public ID for managing this resource',
      },
      label: 'Cloudinary Public ID',
    },
  ],
  hooks: {
    beforeChange: [
      async ({ data, req, operation }) => {
        // Auto-detect file type from mimeType
        if (operation === 'create' && data.mimeType) {
          const mimeType = data.mimeType.toLowerCase()
          if (mimeType.includes('pdf')) {
            data.fileType = 'pdf'
          } else if (mimeType.includes('word') || mimeType.includes('msword')) {
            data.fileType = 'doc'
          } else if (mimeType.includes('excel') || mimeType.includes('spreadsheet')) {
            data.fileType = 'excel'
          } else if (mimeType.includes('powerpoint') || mimeType.includes('presentation')) {
            data.fileType = 'ppt'
          } else if (mimeType.includes('text')) {
            data.fileType = 'txt'
          } else if (mimeType.includes('zip')) {
            data.fileType = 'zip'
          } else {
            data.fileType = 'other'
          }
        }

        // Calculate and format file size
        if (operation === 'create' && data.filesize) {
          const bytes = data.filesize
          if (bytes < 1024) {
            data.fileSize = `${bytes} B`
          } else if (bytes < 1024 * 1024) {
            data.fileSize = `${(bytes / 1024).toFixed(2)} KB`
          } else {
            data.fileSize = `${(bytes / (1024 * 1024)).toFixed(2)} MB`
          }
        }

        return data
      },
    ],
    afterChange: [
      async ({ doc, req, operation }) => {
        // Upload to Cloudinary on create - scheduled after transaction commits
        if (operation === 'create' && doc.filename) {
          const docId = doc.id
          const filename = doc.filename
          const filePath = path.join(process.cwd(), 'public/resources', filename)

          // Schedule upload AFTER the database transaction commits
          // Using setImmediate to run after current event loop
          setImmediate(async () => {
            // Additional delay to ensure transaction is fully committed
            await new Promise(resolve => setTimeout(resolve, 500))

            let uploadResult = null
            let lastError = null

            // Retry logic: 3 attempts with 1 second delay between retries
            for (let attempt = 1; attempt <= 3; attempt++) {
              try {
                const cloudinary = getCloudinary()
                uploadResult = await cloudinary.uploader.upload(filePath, {
                  folder: 'CGAZ-RESOURCES',
                  public_id: path.parse(filename).name,
                  resource_type: 'auto', // Auto-detect resource type
                  overwrite: false,
                })
                console.log(`✓ Resource uploaded to Cloudinary: ${uploadResult.public_id}`)
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
              // Update document with Cloudinary URL using fresh Payload instance
              // Import getPayload dynamically to avoid circular dependencies
              try {
                const { getPayload } = await import('payload')
                const payload = await getPayload({ config: (await import('@/payload.config')).default })

                await payload.update({
                  collection: 'resources',
                  id: docId,
                  data: {
                    cloudinaryUrl: uploadResult.secure_url,
                    cloudinaryPublicId: uploadResult.public_id,
                  },
                })
                console.log(`✓ Resource ${docId} updated with Cloudinary URL: ${uploadResult.secure_url}`)
              } catch (updateError: any) {
                console.error(`✗ Failed to update resource ${docId} with Cloudinary URL:`, updateError?.message || updateError)
                console.error(`Cloudinary URL for manual recovery: ${uploadResult.secure_url}`)
              }
            } else {
              // All retries failed - log for manual intervention
              console.error(`✗ All Cloudinary upload attempts failed for resource ${docId}`)
              console.error(`Last error: ${lastError?.message || 'Unknown error'}`)
            }
          })
        }
        return doc
      },
    ],
    afterDelete: [
      async ({ doc }) => {
        // Delete from Cloudinary when resource is deleted
        if (doc.cloudinaryPublicId) {
          try {
            const cloudinary = getCloudinary()
            await cloudinary.uploader.destroy(doc.cloudinaryPublicId, {
              resource_type: 'raw', // For non-image files
            })
          } catch (error) {
            console.error('Error deleting resource from Cloudinary:', error)
          }
        }
      },
    ],
  },
}
