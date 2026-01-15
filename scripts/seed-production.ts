import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../payload.config'

async function seedProduction() {
  console.log('🚀 Starting production database seed...')
  console.log('📡 Connecting to database...')

  try {
    const payload = await getPayload({ config: await config })

    // 1. Seed Site Metrics
    console.log('\n📊 Seeding Site Metrics...')
    await payload.updateGlobal({
      slug: 'site-metrics',
      data: {
        membersCount: 22490,
        centersCount: 145,
        districtsCount: 10,
        growthRate: '85%',
      },
    })
    console.log('✅ Site Metrics seeded!')

    // 2. Seed Payment Settings
    console.log('\n💳 Seeding Payment Settings...')
    await payload.updateGlobal({
      slug: 'payment-settings',
      data: {
        // Mobile Money
        enableMobileMoney: true,
        mobileMoneyNumber: '+260 97 7429666',
        mobileMoneyName: 'Cashew Growers Association of Zambia',
        mobileMoneyInstructions:
          'Send your training fee to the mobile money number above and upload your payment receipt.',

        // Bank Transfer
        enableBankTransfer: true,
        bankName: 'Zambia National Commercial Bank',
        branchName: 'Woodlands Branch',
        sortCode: '010085',
        swiftCode: 'ZNCOZMLU',
        accountNumber: '6360061500130',
        accountName: 'Cashew Growers Association of Zambia',
        bankInstructions:
          'Transfer training fees using the bank details above and upload proof of payment.',

        // Cash
        enableCash: true,
        cashInstructions:
          'Visit any CGAZ development center to make cash payments in person. Bring your registration confirmation.',
      },
    })
    console.log('✅ Payment Settings seeded!')

    console.log('\n🎉 Production database seeding completed successfully!')
    console.log('=' .repeat(50))
    console.log('Summary:')
    console.log('  ✅ Site Metrics: 22,490 members, 145 centers, 10 districts')
    console.log('  ✅ Payment Settings: Mobile Money, Bank Transfer, Cash enabled')
    console.log('  ✅ Mobile Money Number: +260 97 7429666')
    console.log('  ✅ Bank: Zambia National Commercial Bank')
    console.log('  ✅ Account: 6360061500130')
    console.log('=' .repeat(50))

    process.exit(0)
  } catch (error) {
    console.error('\n❌ Error seeding production database:', error)
    process.exit(1)
  }
}

seedProduction()
