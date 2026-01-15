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

async function listCloudinaryImages() {
  console.log('📸 Fetching images from Cloudinary...\n')

  try {
    // Get all images from CGAZ-IMAGES folder
    const result = await cloudinary.api.resources({
      type: 'upload',
      prefix: 'CGAZ-IMAGES/',
      max_results: 500,
      resource_type: 'image',
    })

    console.log(`✅ Found ${result.resources.length} images in CGAZ-IMAGES/\n`)

    // Group by subfolder
    const folders: { [key: string]: any[] } = {}

    result.resources.forEach((resource: any) => {
      const parts = resource.public_id.split('/')
      const folder = parts.length > 1 ? parts[1] : 'root'

      if (!folders[folder]) {
        folders[folder] = []
      }

      folders[folder].push({
        filename: parts[parts.length - 1],
        public_id: resource.public_id,
        url: resource.secure_url,
        width: resource.width,
        height: resource.height,
        format: resource.format,
      })
    })

    // Print organized list
    Object.keys(folders).sort().forEach((folder) => {
      console.log(`\n📁 ${folder}/`)
      console.log('─'.repeat(80))
      folders[folder].forEach((img) => {
        console.log(`  📷 ${img.filename}`)
        console.log(`     Size: ${img.width}x${img.height} | Format: ${img.format}`)
        console.log(`     URL: ${img.url}`)
        console.log()
      })
    })

    // Save to JSON file for reference
    const outputPath = path.join(process.cwd(), 'cloudinary-images.json')
    const fs = require('fs')
    fs.writeFileSync(outputPath, JSON.stringify(folders, null, 2))
    console.log(`\n💾 Full list saved to: ${outputPath}`)

  } catch (error) {
    console.error('❌ Error fetching Cloudinary images:', error)
  }
}

listCloudinaryImages()
