import { getPayload } from 'payload'
import config from '../payload.config'

async function seed() {
  try {
    console.log('🌱 Seeding site metrics...')

    const payload = await getPayload({ config: await config })

    await payload.updateGlobal({
      slug: 'site-metrics',
      data: {
        membersCount: 22490,
        centersCount: 145,
        districtsCount: 10,
        growthRate: '85%',
        lastUpdated: new Date().toISOString(),
        totalProduction: '1,200',
        exportValue: '$2.5M',
        trainedFarmers: 5600,
        certifiedFarmers: 1200,
        showOnHomepage: true,
        showInFooter: true,
        animateCounters: true,
        displayNotes: 'Initial seed data as of January 2026',
      },
    })

    console.log('✅ Site metrics seeded successfully!')
    console.log('📊 Metrics:')
    console.log('   - Members: 22,490')
    console.log('   - Centers: 145')
    console.log('   - Districts: 10')
    console.log('   - Growth Rate: 85%')

    process.exit(0)
  } catch (error) {
    console.error('❌ Error seeding metrics:', error)
    process.exit(1)
  }
}

seed()
