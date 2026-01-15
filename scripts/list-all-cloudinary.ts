// Load environment variables FIRST
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

import { v2 as cloudinary } from 'cloudinary'

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
})

async function listAllCloudinary() {
  console.log('📸 Fetching ALL resources from Cloudinary...\n')

  try {
    // Get all resources (no prefix filter)
    const result = await cloudinary.api.resources({
      type: 'upload',
      max_results: 500,
      resource_type: 'image',
    })

    console.log(`✅ Found ${result.resources.length} total images\n`)

    result.resources.forEach((resource: any) => {
      console.log(`📷 ${resource.public_id}`)
      console.log(`   URL: ${resource.secure_url}`)
      console.log()
    })

    // Also try to list folders
    console.log('\n📁 Listing folders...\n')
    const folders = await cloudinary.api.root_folders()
    console.log('Root folders:', folders)

  } catch (error) {
    console.error('❌ Error:', error)
  }
}

listAllCloudinary()
