import type { CollectionConfig } from 'payload'
import { deleteFromCloudinary } from '@/lib/cloudinary'

/**
 * Audio Media collection — holds direct-uploaded audio files (mp3/wav/m4a).
 *
 * Unlike the Media collection (images), audio files are NOT uploaded through
 * Payload's body parser. Netlify functions cap request bodies at ~26 MB so
 * larger radio programs would fail. Instead we use Cloudinary signed direct
 * uploads: the browser gets a short-lived signature from our API, then POSTs
 * the file straight to Cloudinary. Once that succeeds, the custom admin
 * component populates the metadata fields below and Joseph clicks Save to
 * persist the record.
 *
 * The `audioUpload` UI field is a custom React component that drives this
 * flow — it writes to cloudinaryUrl / cloudinaryPublicId / duration / fileSize
 * via Payload's useField hook.
 */
export const AudioMedia: CollectionConfig = {
  slug: 'audio-media',
  labels: {
    singular: 'Audio File',
    plural: 'Audio Files',
  },
  admin: {
    useAsTitle: 'title',
    group: 'Media',
    defaultColumns: ['title', 'duration', 'fileSize', 'updatedAt'],
    description:
      'Upload radio programs, podcasts, and other audio files directly. Files go straight to Cloudinary — no size limits.',
  },
  access: {
    read: () => true,
  },
  hooks: {
    beforeValidate: [
      ({ data, operation }) => {
        // Require a Cloudinary upload before allowing save. The custom
        // field component populates these after a successful direct upload.
        if (operation === 'create' && (!data?.cloudinaryUrl || !data?.cloudinaryPublicId)) {
          throw new Error(
            'Please upload an audio file before saving. Use the "Audio File Upload" section above.',
          )
        }
        return data
      },
    ],
    afterDelete: [
      async ({ doc }) => {
        // Clean up the Cloudinary asset. Audio is stored as resource_type=video.
        if (doc?.cloudinaryPublicId) {
          try {
            await deleteFromCloudinary(doc.cloudinaryPublicId, 'video')
            console.log(`✓ Deleted audio from Cloudinary: ${doc.cloudinaryPublicId}`)
          } catch (error) {
            console.error('Error deleting audio from Cloudinary:', error)
          }
        }
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
        description: 'A descriptive name, e.g. "Bulimi bwa Ndongo — Mongu Episode 1"',
      },
    },
    {
      name: 'audioUpload',
      type: 'ui',
      label: 'Audio File Upload',
      admin: {
        components: {
          Field: '/payload/components/AudioUploadField',
        },
      },
    },
    {
      name: 'cloudinaryUrl',
      type: 'text',
      required: true,
      label: 'Cloudinary URL',
      admin: {
        readOnly: true,
        description: 'Populated automatically after upload.',
        position: 'sidebar',
      },
    },
    {
      name: 'cloudinaryPublicId',
      type: 'text',
      required: true,
      label: 'Cloudinary Public ID',
      admin: {
        readOnly: true,
        position: 'sidebar',
      },
    },
    {
      name: 'duration',
      type: 'number',
      label: 'Duration (seconds)',
      admin: {
        readOnly: true,
        description: 'Auto-detected from the uploaded file.',
        position: 'sidebar',
      },
    },
    {
      name: 'fileSize',
      type: 'number',
      label: 'File Size (bytes)',
      admin: {
        readOnly: true,
        position: 'sidebar',
      },
    },
    {
      name: 'mimeType',
      type: 'text',
      label: 'MIME Type',
      admin: {
        readOnly: true,
        position: 'sidebar',
      },
    },
  ],
}
