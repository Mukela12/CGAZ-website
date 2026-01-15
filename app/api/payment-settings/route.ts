import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '../../../payload.config'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const payload = await getPayload({ config: await config })
    const settings = await payload.findGlobal({ slug: 'payment-settings' })

    return NextResponse.json(settings)
  } catch (error) {
    console.error('Error fetching payment settings:', error)

    // Return defaults on error
    return NextResponse.json({
      enableMobileMoney: true,
      mobileMoneyNumber: '+260 97 7429666',
      mobileMoneyName: 'CGAZ',
      mobileMoneyInstructions: 'Send payment to the number above and upload your receipt.',
      enableBankTransfer: false,
      enableCash: true,
      cashInstructions: 'Visit any CGAZ office to make cash payments in person.',
    })
  }
}
