require('dotenv').config({ path: '.env.local' });
const { v2: cloudinary } = require('cloudinary');

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dvj7ayoot',
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

console.log('Using cloud_name:', process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME);
console.log('API key loaded:', process.env.CLOUDINARY_API_KEY ? 'Yes' : 'No');

async function listPartnerLogos() {
  try {
    console.log('📂 Listing partner logos from Cloudinary...\n');

    // Search for images in partner-logos folder
    const result = await cloudinary.api.resources({
      type: 'upload',
      prefix: 'partner-logos/',
      max_results: 100,
    });

    if (result.resources.length === 0) {
      console.log('No partner logos found in partner-logos/ folder');
      console.log('\nSearching in root directory...');

      // Search in root if nothing in partner-logos folder
      const rootResult = await cloudinary.api.resources({
        type: 'upload',
        max_results: 100,
      });

      console.log(`\nFound ${rootResult.resources.length} images in Cloudinary:`);
      rootResult.resources.forEach((resource, index) => {
        console.log(`${index + 1}. ${resource.public_id}`);
        console.log(`   URL: ${resource.secure_url}`);
        console.log('');
      });
    } else {
      console.log(`Found ${result.resources.length} partner logos:\n`);
      result.resources.forEach((resource, index) => {
        const name = resource.public_id.split('/').pop();
        console.log(`${index + 1}. ${name}`);
        console.log(`   Full path: ${resource.public_id}`);
        console.log(`   URL: ${resource.secure_url}`);
        console.log('');
      });
    }
  } catch (error) {
    console.error('Error listing Cloudinary images:', error.message);
  }
}

listPartnerLogos();
