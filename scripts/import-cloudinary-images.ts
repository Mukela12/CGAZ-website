import { getPayload } from 'payload'
import config from '@payload-config'
import cloudinary from '@/lib/cloudinary'

async function importImages() {
  console.log('🚀 Starting Cloudinary image import...')

  try {
    // Get Payload instance
    const payload = await getPayload({ config })
    console.log('✅ Connected to Payload')

    // Get all images from Cloudinary CGAZ-IMAGES folder
    const result = await cloudinary.api.resources({
      type: 'upload',
      prefix: 'CGAZ-IMAGES/',
      max_results: 500,
      resource_type: 'image',
    })

    console.log(`📦 Found ${result.resources.length} images in Cloudinary`)

    let imported = 0
    let skipped = 0

    for (const resource of result.resources) {
      try {
        // Extract filename from public_id
        const publicId = resource.public_id
        const filename = publicId.split('/').pop() || publicId

        // Create readable alt text from filename
        // Remove extension and replace underscores/hyphens with spaces
        const altText = filename
          .replace(/\.(jpg|jpeg|png|gif|webp)$/i, '')
          .replace(/[_-]/g, ' ')
          .replace(/([A-Z])/g, ' $1')
          .trim()

        // Determine category from folder path or filename
        let category = 'other'
        if (publicId.includes('Training') || publicId.includes('training')) {
          category = 'training'
        } else if (publicId.includes('Government') || publicId.includes('government')) {
          category = 'government-visits'
        } else if (publicId.includes('Processing') || publicId.includes('processing')) {
          category = 'processing'
        } else if (publicId.includes('Farming') || publicId.includes('farming')) {
          category = 'farming'
        } else if (publicId.includes('Product') || publicId.includes('product')) {
          category = 'products'
        } else if (publicId.includes('Team') || publicId.includes('team')) {
          category = 'team'
        } else if (publicId.includes('Event') || publicId.includes('event')) {
          category = 'events'
        }

        // Check if image already exists in Media collection
        const existing = await payload.find({
          collection: 'media',
          where: {
            cloudinaryPublicId: {
              equals: publicId,
            },
          },
          limit: 1,
        })

        if (existing.docs.length > 0) {
          console.log(`⏭️  Skipping (already exists): ${filename}`)
          skipped++
          continue
        }

        // Create Media document
        await payload.create({
          collection: 'media',
          data: {
            alt: altText,
            cloudinaryUrl: resource.secure_url,
            cloudinaryPublicId: publicId,
            filename: publicId,
            category,
            mimeType: resource.format ? `image/${resource.format}` : 'image/jpeg',
            filesize: resource.bytes,
            width: resource.width,
            height: resource.height,
          },
        })

        console.log(`✅ Imported: ${filename}`)
        imported++
      } catch (error) {
        console.error(`❌ Error importing ${resource.public_id}:`, error)
      }
    }

    console.log('\n📊 Import Summary:')
    console.log(`   ✅ Imported: ${imported}`)
    console.log(`   ⏭️  Skipped: ${skipped}`)
    console.log(`   📦 Total: ${result.resources.length}`)
    console.log('\n✨ Import completed!')
  } catch (error) {
    console.error('❌ Error during import:', error)
    process.exit(1)
  }

  process.exit(0)
}

importImages()
