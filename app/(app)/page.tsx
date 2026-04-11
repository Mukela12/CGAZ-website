import {
  getDocumentarySettings,
  getFeaturedMediaVideo,
  getHomepageSlideshowSettings,
  type DocumentarySettings,
} from '@/lib/payload/api'
import HomePageClient from './HomePageClient'

export default async function Home() {
  const [documentarySettings, featuredVideo, slideshowSettings] = await Promise.all([
    getDocumentarySettings(),
    getFeaturedMediaVideo(),
    getHomepageSlideshowSettings(),
  ])

  // Prefer a Media Library entry marked "Featured on Homepage" — this is the
  // new workflow the content manager uses. Fall back to the legacy
  // FeaturedDocumentary global if nothing is featured there yet.
  const resolvedDocumentary: DocumentarySettings | null =
    featuredVideo && featuredVideo.youtubeVideoId
      ? {
          isEnabled: true,
          title: featuredVideo.title,
          subtitle: featuredVideo.description,
          youtubeVideoId: featuredVideo.youtubeVideoId,
          showControls: documentarySettings?.showControls ?? true,
          loop: documentarySettings?.loop ?? false,
          sectionBackground: documentarySettings?.sectionBackground ?? 'dark',
        }
      : documentarySettings

  return (
    <HomePageClient
      documentarySettings={resolvedDocumentary}
      slideshowSettings={slideshowSettings}
    />
  )
}
