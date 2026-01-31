import { NextResponse } from 'next/server'
import { getPayloadClient } from '@/lib/payload/api'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function GET() {
  try {
    const payload = await getPayloadClient()

    // Fetch featured documentary settings from the global
    const documentary = await payload.findGlobal({
      slug: 'featured-documentary',
    })

    // Return settings with defaults in case they're not set
    return NextResponse.json({
      isEnabled: documentary?.isEnabled ?? false,
      title: documentary?.title ?? 'Our Story',
      subtitle: documentary?.subtitle ?? 'Watch our documentary to learn about CGAZ\'s mission.',
      youtubeVideoId: documentary?.youtubeVideoId ?? '',
      youtubeUrl: documentary?.youtubeUrl ?? '',
      showControls: documentary?.showControls ?? true,
      loop: documentary?.loop ?? false,
      sectionBackground: documentary?.sectionBackground ?? 'dark',
    })
  } catch (error) {
    console.error('Error fetching documentary settings:', error)

    // Return defaults on error
    return NextResponse.json({
      isEnabled: false,
      title: 'Our Story',
      subtitle: 'Watch our documentary to learn about CGAZ\'s mission.',
      youtubeVideoId: '',
      youtubeUrl: '',
      showControls: true,
      loop: false,
      sectionBackground: 'dark',
    })
  }
}
