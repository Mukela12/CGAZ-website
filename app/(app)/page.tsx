import { getDocumentarySettings } from '@/lib/payload/api'
import HomePageClient from './HomePageClient'

export default async function Home() {
  const documentarySettings = await getDocumentarySettings()
  return <HomePageClient documentarySettings={documentarySettings} />
}
