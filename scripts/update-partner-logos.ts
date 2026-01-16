/**
 * Update Partner Logos Script
 *
 * Updates partners in the CMS with their Cloudinary logo URLs
 * Uses the logoUrl text field for direct Cloudinary URLs
 *
 * Usage:
 *   npx tsx scripts/update-partner-logos.ts           # Updates local database
 *   npx tsx scripts/update-partner-logos.ts --prod    # Updates production database
 */

import dotenv from 'dotenv'
import path from 'path'

// Check if --prod flag is passed
const isProduction = process.argv.includes('--prod') || process.argv.includes('--production')

// Load appropriate environment file
const envFile = isProduction ? '.env.production' : '.env.local'
dotenv.config({ path: path.resolve(process.cwd(), envFile) })

console.log(`\n🔧 Environment: ${isProduction ? 'PRODUCTION' : 'LOCAL'}`)
console.log(`📄 Using env file: ${envFile}\n`)

import { getPayload } from 'payload'
import config from '@payload-config'

// Partner logos from Cloudinary (already uploaded)
const partnerLogos: Record<string, string> = {
  // International Development Partners
  'GIZ': 'https://res.cloudinary.com/dvj7ayoot/image/upload/v1768452742/giz-logo_h8u91n.png',
  'European Union': 'https://res.cloudinary.com/dvj7ayoot/image/upload/v1768452742/eu-logo_mf2oug.png',
  'African Development Bank': 'https://res.cloudinary.com/dvj7ayoot/image/upload/v1768452741/afdb-logo_hck4eg.png',
  'AfDB': 'https://res.cloudinary.com/dvj7ayoot/image/upload/v1768452741/afdb-logo_hck4eg.png',
  'OACPS': 'https://res.cloudinary.com/dvj7ayoot/image/upload/v1768452743/oacps-logo_ydtc17.png',
  'USAID': 'https://res.cloudinary.com/dvj7ayoot/image/upload/v1768452742/usaid-logo_uke7kt.svg',
  'IFAD': 'https://res.cloudinary.com/dvj7ayoot/image/upload/v1768452740/ifad-logo_jxqtvo.webp',
  'World Bank': 'https://res.cloudinary.com/dvj7ayoot/image/upload/v1768452743/world-bank-logo_tyg58o.png',

  // Government Partners
  'Ministry of Agriculture': 'https://res.cloudinary.com/dvj7ayoot/image/upload/v1768452738/ministry-of-agriculture_lzmqiz.png',
  'Ministry of Commerce': 'https://res.cloudinary.com/dvj7ayoot/image/upload/v1768452736/ministry-of-commerce_sfyzmu.jpg',
  'Ministry of Green Economy': 'https://res.cloudinary.com/dvj7ayoot/image/upload/v1768452738/ministry-of-agriculture_lzmqiz.png',

  // NGO Partners
  'Heifer International': 'https://res.cloudinary.com/dvj7ayoot/image/upload/v1768452741/heifer-international_p0mdgq.webp',
  'SNV': 'https://res.cloudinary.com/dvj7ayoot/image/upload/v1768452739/snv-logo_ywqrhk.jpg',
  'Farm Radio International': 'https://res.cloudinary.com/dvj7ayoot/image/upload/v1768452738/farm-radio-international_axfn8y.webp',
  'People in Need': 'https://res.cloudinary.com/dvj7ayoot/image/upload/v1768452739/snv-logo_ywqrhk.jpg',
  'ACF': 'https://res.cloudinary.com/dvj7ayoot/image/upload/v1768452738/farm-radio-international_axfn8y.webp',

  // Research & Financial Partners
  'ZANACO': 'https://res.cloudinary.com/dvj7ayoot/image/upload/v1768452738/zanaco-logo_luwmlw.png',
  'UNZA': 'https://res.cloudinary.com/dvj7ayoot/image/upload/v1768452738/unza-logo_d4gj1b.png',
  'University of Zambia': 'https://res.cloudinary.com/dvj7ayoot/image/upload/v1768452738/unza-logo_d4gj1b.png',
  'ZARI': 'https://res.cloudinary.com/dvj7ayoot/image/upload/v1768452743/zari-logo_tyg58o.png',
  'Zambia Agriculture Research Institute': 'https://res.cloudinary.com/dvj7ayoot/image/upload/v1768452743/zari-logo_tyg58o.png',
  'IITA': 'https://res.cloudinary.com/dvj7ayoot/image/upload/v1768452736/iita-logo_olt4qu.png',
}

async function updatePartnerLogos() {
  console.log('🖼️  Starting partner logos update...\n')

  const payload = await getPayload({ config })

  // Get all partners
  const { docs: partners } = await payload.find({
    collection: 'partners',
    limit: 100,
  })

  console.log(`Found ${partners.length} partners in database\n`)

  let updated = 0

  for (const partner of partners) {
    // Try to find matching logo by checking if partner name contains any key
    let logoUrl: string | null = null

    for (const [key, url] of Object.entries(partnerLogos)) {
      // Check if the partner name includes the key (case insensitive)
      if (partner.name.toLowerCase().includes(key.toLowerCase())) {
        logoUrl = url
        break
      }
    }

    if (logoUrl) {
      try {
        await payload.update({
          collection: 'partners',
          id: partner.id,
          data: {
            logoUrl: logoUrl,
          },
        })
        console.log(`   ✅ Updated: ${partner.name}`)
        updated++
      } catch (error: any) {
        console.log(`   ❌ Failed to update ${partner.name}: ${error.message}`)
      }
    } else {
      console.log(`   ⚠️  No logo found for: ${partner.name}`)
    }
  }

  console.log('\n' + '='.repeat(60))
  console.log('✅ Partner Logos Update Complete!')
  console.log('='.repeat(60))
  console.log(`\n   Updated ${updated}/${partners.length} partners with logos`)
  console.log('='.repeat(60))
}

updatePartnerLogos()
  .then(() => {
    console.log('\n✅ Update completed successfully')
    process.exit(0)
  })
  .catch((error) => {
    console.error('\n❌ Update failed:', error)
    process.exit(1)
  })
