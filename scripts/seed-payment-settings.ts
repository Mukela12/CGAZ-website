import { getPayload } from 'payload'
import config from '../payload.config'

async function seed() {
  console.log('🏦 Seeding payment settings...')

  try {
    const payload = await getPayload({ config: await config })

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

    console.log('✅ Payment settings seeded successfully!')
    process.exit(0)
  } catch (error) {
    console.error('❌ Error seeding payment settings:', error)
    process.exit(1)
  }
}

seed()
