import type { CollectionConfig } from 'payload'
import path from 'path'
import { uploadToCloudinaryFromBuffer, deleteFromCloudinary } from '@/lib/cloudinary'

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
    // Disable local storage - we upload directly to Cloudinary
    disableLocalStorage: true,
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

            console.log(`Uploading resource ${filename} to Cloudinary...`)

            const uploadResult = await uploadToCloudinaryFromBuffer(buffer, {
              folder: 'CGAZ-RESOURCES',
              publicId: publicId,
              resourceType: 'raw', // Use 'raw' for non-image files (PDFs, docs, etc.)
              overwrite: false,
            })

            console.log(`✓ Resource uploaded to Cloudinary: ${uploadResult.public_id}`)

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
        // Delete from Cloudinary when resource is deleted
        if (doc.cloudinaryPublicId) {
          try {
            await deleteFromCloudinary(doc.cloudinaryPublicId, 'raw')
            console.log(`✓ Deleted from Cloudinary: ${doc.cloudinaryPublicId}`)
          } catch (error) {
            console.error('Error deleting resource from Cloudinary:', error)
          }
        }
      },
    ],
  },
}
