import { v2 as cloudinary, UploadApiResponse, UploadApiErrorResponse } from 'cloudinary'

// Only validate env vars at runtime when actually needed (not during build)
function validateEnvVars() {
  if (!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME) {
    throw new Error('Missing NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME environment variable')
  }
  if (!process.env.CLOUDINARY_API_KEY) {
    throw new Error('Missing CLOUDINARY_API_KEY environment variable')
  }
  if (!process.env.CLOUDINARY_API_SECRET) {
    throw new Error('Missing CLOUDINARY_API_SECRET environment variable')
  }
}

// Configure Cloudinary lazily
let configured = false
function ensureConfigured() {
  if (!configured && process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME) {
    cloudinary.config({
      cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      secure: true,
    })
    configured = true
  }
}

export default cloudinary

// Export helper function
export function getCloudinaryUrl(publicId: string, transformations?: string) {
  ensureConfigured()
  return cloudinary.url(publicId, {
    secure: true,
    transformation: transformations,
  })
}

// Upload from buffer directly to Cloudinary (for serverless environments)
export async function uploadToCloudinaryFromBuffer(
  buffer: Buffer,
  options: {
    folder: string
    publicId: string
    resourceType?: 'image' | 'video' | 'raw' | 'auto'
    overwrite?: boolean
  }
): Promise<UploadApiResponse> {
  validateEnvVars()
  ensureConfigured()

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: options.folder,
        public_id: options.publicId,
        resource_type: options.resourceType || 'auto',
        overwrite: options.overwrite ?? false,
      },
      (error: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined) => {
        if (error) {
          reject(error)
        } else if (result) {
          resolve(result)
        } else {
          reject(new Error('No result from Cloudinary upload'))
        }
      }
    )

    // Write buffer to the upload stream
    uploadStream.end(buffer)
  })
}

// Delete from Cloudinary
export async function deleteFromCloudinary(
  publicId: string,
  resourceType: 'image' | 'video' | 'raw' = 'image'
): Promise<void> {
  ensureConfigured()
  await cloudinary.uploader.destroy(publicId, { resource_type: resourceType })
}
