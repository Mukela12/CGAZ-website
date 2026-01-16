/**
 * Seed CGAZ Team Members Script
 *
 * Seeds the real CGAZ staff from official documents (CGAZ PROFILE December 2024)
 * Section 5.0 - STAFF ESTABLISHMENT
 *
 * Usage:
 *   npx tsx scripts/seed-team-members.ts           # Seeds to local database
 *   npx tsx scripts/seed-team-members.ts --prod    # Seeds to production database
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

async function seedTeamMembers() {
  console.log('🌱 Starting CGAZ Team Members seeding...\n')

  // Safety check for production
  if (isProduction) {
    console.log('⚠️  WARNING: You are about to modify the PRODUCTION database!')
    console.log('   This will DELETE all existing team members and replace them.\n')

    // Auto-proceed after 3 seconds (or use readline for interactive)
    await new Promise(resolve => setTimeout(resolve, 3000))
    console.log('   Proceeding with production seeding...\n')
  }

  const payload = await getPayload({ config })

  // Official CGAZ Staff from CGAZ PROFILE document (December 2024)
  // Section 5.0 - STAFF ESTABLISHMENT
  const teamMembers = [
    {
      name: 'Allan Chinambu',
      position: 'National Coordinator',
      department: 'management',
      qualification: 'MSc. Agricultural Sciences',
      bio: 'Allan Chinambu leads the Cashew Growers Association of Zambia as National Coordinator. With a Master of Science degree in Agricultural Sciences, he has extensive experience in agricultural development, climate adaptation, and rural empowerment programs. Under his leadership, CGAZ has mobilized over 22,490 farmers across 10 districts in Western Province.',
      email: 'allanchinambu666@gmail.com',
      phone: '+260-977429666',
      displayOrder: 1,
      isActive: true,
    },
    {
      name: 'Collins Katungu',
      position: 'Finance & Administration Manager',
      department: 'management',
      qualification: 'ACCA (Association of Chartered Certified Accountants)',
      bio: 'Collins Katungu manages CGAZ financial operations and administrative systems. As an ACCA-certified accountant, he brings expertise in non-profit financial management, donor reporting, and organizational governance, ensuring transparent and accountable management across all CGAZ projects.',
      email: 'finance@cgaz.org.zm',
      phone: '',
      displayOrder: 2,
      isActive: true,
    },
    {
      name: 'Edgar Reed',
      position: 'Cashew Value Chain Development Officer',
      department: 'technical',
      qualification: 'MSc. Agriculture',
      bio: 'Edgar Reed specializes in value chain development, agricultural processing, and market linkages. He leads CGAZ efforts to develop the cashew business model, establish the warehouse receipt system, and connect farmers with processors and markets.',
      email: 'valuechain@cgaz.org.zm',
      phone: '',
      displayOrder: 3,
      isActive: true,
    },
    {
      name: 'Wakunyambo Yeta',
      position: 'Monitoring and Evaluation Specialist',
      department: 'technical',
      qualification: 'Diploma in Finance & Administration',
      bio: 'Wakunyambo Yeta is responsible for monitoring project implementation and evaluating impact across all CGAZ programs. He ensures projects achieve their intended outcomes and that lessons learned are documented and shared with stakeholders.',
      email: 'monitoring@cgaz.org.zm',
      phone: '',
      displayOrder: 4,
      isActive: true,
    },
    {
      name: 'Mwenda Mukatimui',
      position: 'Outreach Officer',
      department: 'field',
      qualification: 'Certificate in General Agriculture',
      bio: 'Mwenda Mukatimui coordinates CGAZ activities at the district level, working directly with Cashew Development Centers and farmer groups. He facilitates trainings, mobilizes farmers, and ensures effective communication between headquarters and grassroots communities.',
      email: 'outreach@cgaz.org.zm',
      phone: '',
      displayOrder: 5,
      isActive: true,
    },
    {
      name: 'Savior Indala',
      position: 'Orchard/Nursery Supervisor',
      department: 'field',
      qualification: 'Certificate in Nursery Management/Grafting',
      bio: 'Savior Indala manages CGAZ cashew nurseries and demonstration orchards. He has received specialized training in cashew propagation techniques from Mozambique and oversees production of high-quality cashew seedlings for distribution to farmers.',
      email: 'nursery@cgaz.org.zm',
      phone: '',
      displayOrder: 6,
      isActive: true,
    },
    {
      name: 'Kaneta Kaneta',
      position: 'Driver',
      department: 'admin',
      qualification: 'Grade XII Certificate',
      bio: 'Kaneta Kaneta provides transportation services for CGAZ field operations, ensuring timely delivery of seedlings, training materials, and project resources to remote communities across Western Province.',
      email: '',
      phone: '',
      displayOrder: 7,
      isActive: true,
    },
    {
      name: 'Brenda Mwanamwalye',
      position: 'Office Assistant',
      department: 'admin',
      qualification: 'Grade VIII Certificate',
      bio: 'Brenda Mwanamwalye provides administrative support to the CGAZ team, managing office operations, correspondence, and visitor coordination at the Mongu headquarters.',
      email: 'office@cgaz.org.zm',
      phone: '',
      displayOrder: 8,
      isActive: true,
    },
    {
      name: 'Charles Mafulo',
      position: 'General Worker',
      department: 'admin',
      qualification: '',
      bio: 'Charles Mafulo supports CGAZ field operations and facilities maintenance, ensuring smooth day-to-day operations at nurseries and demonstration sites.',
      email: '',
      phone: '',
      displayOrder: 9,
      isActive: true,
    },
  ]

  // First, delete all existing team members
  console.log('🗑️  Clearing existing team members...')
  try {
    const existing = await payload.find({
      collection: 'team-members',
      limit: 100,
    })

    for (const member of existing.docs) {
      await payload.delete({
        collection: 'team-members',
        id: member.id,
      })
      console.log(`   Deleted: ${member.name}`)
    }
    console.log(`   ✅ Cleared ${existing.docs.length} existing team members\n`)
  } catch (error: any) {
    console.log(`   ⚠️  Error clearing existing members: ${error.message}\n`)
  }

  // Now create the real team members
  console.log('👥 Creating real CGAZ team members...\n')

  let created = 0
  for (const member of teamMembers) {
    try {
      await payload.create({
        collection: 'team-members',
        data: member,
      })
      console.log(`   ✅ Created: ${member.name} - ${member.position}`)
      created++
    } catch (error: any) {
      console.log(`   ❌ Failed to create ${member.name}: ${error.message}`)
    }
  }

  console.log('\n' + '='.repeat(60))
  console.log('✅ CGAZ Team Members Seeding Complete!')
  console.log('='.repeat(60))
  console.log(`\n   Created ${created}/${teamMembers.length} team members`)
  console.log('\n   Staff by Department:')
  console.log('   - Management (2): Allan Chinambu, Collins Katungu')
  console.log('   - Technical (2): Edgar Reed, Wakunyambo Yeta')
  console.log('   - Field Operations (2): Mwenda Mukatimui, Savior Indala')
  console.log('   - Administration (3): Kaneta Kaneta, Brenda Mwanamwalye, Charles Mafulo')
  console.log('\n   Source: CGAZ PROFILE (December 2024), Section 5.0')
  console.log('='.repeat(60))
}

seedTeamMembers()
  .then(() => {
    console.log('\n✅ Seeding completed successfully')
    process.exit(0)
  })
  .catch((error) => {
    console.error('\n❌ Seeding failed:', error)
    process.exit(1)
  })
