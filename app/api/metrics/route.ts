import { NextResponse } from 'next/server'
import { getPayloadClient } from '@/lib/payload/api'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function GET() {
  try {
    const payload = await getPayloadClient()

    // Fetch site metrics from the global
    const metrics = await payload.findGlobal({
      slug: 'site-metrics',
    })

    // Return metrics with defaults in case they're not set
    return NextResponse.json({
      membersCount: metrics?.membersCount || 22490,
      centersCount: metrics?.centersCount || 145,
      districtsCount: metrics?.districtsCount || 10,
      growthRate: metrics?.growthRate || '85%',
      lastUpdated: metrics?.lastUpdated || new Date().toISOString(),
    })
  } catch (error) {
    console.error('Error fetching site metrics:', error)

    // Return defaults on error
    return NextResponse.json({
      membersCount: 22490,
      centersCount: 145,
      districtsCount: 10,
      growthRate: '85%',
      lastUpdated: new Date().toISOString(),
    })
  }
}
