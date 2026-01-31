import { getDocumentarySettings, getHomepageSlideshowSettings } from '@/lib/payload/api'
import HomePageClient from './HomePageClient'

export default async function Home() {
  const [documentarySettings, slideshowSettings] = await Promise.all([
    getDocumentarySettings(),
    getHomepageSlideshowSettings(),
  ])

  return (
    <HomePageClient
      documentarySettings={documentarySettings}
      slideshowSettings={slideshowSettings}
    />
  )
}
