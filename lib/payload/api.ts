import { getPayload } from 'payload'
import config from '@payload-config'

let payload: any = null

/**
 * Get or initialize Payload CMS client
 * Reuses the same instance across multiple calls
 */
export async function getPayloadClient() {
  if (!payload) {
    payload = await getPayload({ config })
  }
  return payload
}

/**
 * Fetch all projects with optional status filter
 * @param status - Filter by project status (active, completed, upcoming, all)
 * @returns Array of project documents
 */
export async function getProjects(status?: string) {
  const payload = await getPayloadClient()

  const where: any = {}
  if (status && status !== 'all') {
    where.status = { equals: status }
  }

  const { docs } = await payload.find({
    collection: 'projects',
    where,
    sort: '-startDate',
    limit: 50,
    depth: 3, // Include related data (featured image, fundingAgency -> logo)
  })

  return docs
}

/**
 * Fetch a single project by slug
 * @param slug - Project slug
 * @returns Project document or null
 */
export async function getProjectBySlug(slug: string) {
  const payload = await getPayloadClient()

  const { docs } = await payload.find({
    collection: 'projects',
    where: {
      slug: { equals: slug },
    },
    limit: 1,
    depth: 3, // Deep enough to get fundingAgency -> logo relation
  })

  return docs[0] || null
}

/**
 * Fetch blog posts with optional filters
 * @param category - Filter by category
 * @param search - Search in title and excerpt
 * @param limit - Maximum number of posts to return
 * @returns Array of blog post documents
 */
export async function getBlogPosts(
  category?: string,
  search?: string,
  limit: number = 50
) {
  const payload = await getPayloadClient()

  const where: any = { status: { equals: 'published' } }

  if (category && category !== 'all') {
    where.category = { equals: category }
  }

  if (search) {
    where.or = [
      { title: { contains: search } },
      { excerpt: { contains: search } },
    ]
  }

  const { docs } = await payload.find({
    collection: 'blog-posts',
    where,
    sort: '-publishedDate',
    limit,
    depth: 2, // Include author and featured image
  })

  return docs
}

/**
 * Fetch a single blog post by slug
 * @param slug - Blog post slug
 * @returns Blog post document or null
 */
export async function getBlogPostBySlug(slug: string) {
  const payload = await getPayloadClient()

  const { docs } = await payload.find({
    collection: 'blog-posts',
    where: {
      slug: { equals: slug },
      status: { equals: 'published' },
    },
    limit: 1,
    depth: 2,
  })

  return docs[0] || null
}

/**
 * Fetch team members
 * @returns Array of team member documents
 */
export async function getTeamMembers() {
  const payload = await getPayloadClient()

  const { docs } = await payload.find({
    collection: 'team-members',
    where: {
      isActive: { equals: true },
    },
    sort: 'displayOrder',
    limit: 100,
    depth: 2, // Include photo relation
  })

  return docs
}

/**
 * Fetch partners with optional category filter
 * @param category - Filter by partner category
 * @returns Array of partner documents
 */
export async function getPartners(category?: string) {
  const payload = await getPayloadClient()

  const where: any = {}
  if (category && category !== 'all') {
    where.category = { equals: category }
  }

  const { docs } = await payload.find({
    collection: 'partners',
    where,
    sort: 'name',
    limit: 100,
    depth: 1,
  })

  return docs
}

/**
 * Fetch success stories
 * @param limit - Maximum number of stories to return
 * @returns Array of success story documents
 */
export async function getSuccessStories(limit: number = 50) {
  const payload = await getPayloadClient()

  const { docs } = await payload.find({
    collection: 'success-stories',
    where: {
      status: { equals: 'published' },
    },
    sort: '-publishedDate',
    limit,
    depth: 2,
  })

  return docs
}

/**
 * Fetch a single success story by slug
 * @param slug - Success story slug
 * @returns Success story document or null
 */
export async function getSuccessStoryBySlug(slug: string) {
  const payload = await getPayloadClient()

  const { docs } = await payload.find({
    collection: 'success-stories',
    where: {
      slug: { equals: slug },
      status: { equals: 'published' },
    },
    limit: 1,
    depth: 2,
  })

  return docs[0] || null
}

/**
 * Fetch media files from Media collection
 * @param category - Filter by media category
 * @param limit - Maximum number of media items to return
 * @returns Array of media documents
 */
export async function getMediaFiles(category?: string, limit: number = 50) {
  const payload = await getPayloadClient()

  const where: any = {}
  if (category && category !== 'all') {
    where.category = { equals: category }
  }

  const { docs } = await payload.find({
    collection: 'media',
    where,
    sort: '-createdAt',
    limit,
  })

  return docs
}

/**
 * Fetch resources with optional filters
 * @param category - Filter by resource category
 * @param search - Search in title and description
 * @param limit - Maximum number of resources to return
 * @returns Array of resource documents
 */
export async function getResources(
  category?: string,
  search?: string,
  limit: number = 50
) {
  const payload = await getPayloadClient()

  const where: any = {}

  if (category && category !== 'all') {
    where.category = { equals: category }
  }

  if (search) {
    where.or = [
      { title: { contains: search } },
      { description: { contains: search } },
    ]
  }

  const { docs } = await payload.find({
    collection: 'resources',
    where,
    sort: '-createdAt',
    limit,
  })

  return docs
}

/**
 * Increment download count for a resource
 * @param resourceId - ID of the resource
 */
export async function incrementResourceDownload(resourceId: string) {
  const payload = await getPayloadClient()

  const resource = await payload.findByID({
    collection: 'resources',
    id: resourceId,
  })

  if (resource) {
    await payload.update({
      collection: 'resources',
      id: resourceId,
      data: {
        downloadCount: (resource.downloadCount || 0) + 1,
      },
    })
  }
}

/**
 * Fetch featured/recent content for homepage
 * @returns Object containing featured projects, posts, and success stories
 */
export async function getFeaturedContent() {
  const payload = await getPayloadClient()

  // Fetch featured projects (active status, most recent)
  const { docs: projects } = await payload.find({
    collection: 'projects',
    where: {
      status: { equals: 'active' },
    },
    sort: '-startDate',
    limit: 3,
    depth: 2,
  })

  // Fetch recent blog posts
  const { docs: posts } = await payload.find({
    collection: 'blog-posts',
    where: {
      status: { equals: 'published' },
    },
    sort: '-publishedDate',
    limit: 3,
    depth: 2,
  })

  // Fetch recent success stories
  const { docs: stories } = await payload.find({
    collection: 'success-stories',
    where: {
      status: { equals: 'published' },
    },
    sort: '-publishedDate',
    limit: 3,
    depth: 2,
  })

  return {
    projects,
    posts,
    stories,
  }
}

/**
 * Documentary Settings interface
 */
export interface DocumentarySettings {
  isEnabled: boolean
  title: string
  subtitle: string
  youtubeVideoId: string
  showControls: boolean
  loop: boolean
  sectionBackground: 'dark' | 'light' | 'green'
}

/**
 * Fetch documentary settings from global configuration
 * @returns Documentary settings or null if not configured
 */
export async function getDocumentarySettings(): Promise<DocumentarySettings | null> {
  const payload = await getPayloadClient()
  try {
    const documentary = await payload.findGlobal({
      slug: 'featured-documentary',
    })
    return {
      isEnabled: documentary?.isEnabled ?? false,
      title: documentary?.title ?? 'Our Story',
      subtitle: documentary?.subtitle ?? '',
      youtubeVideoId: documentary?.youtubeVideoId ?? '',
      showControls: documentary?.showControls ?? true,
      loop: documentary?.loop ?? false,
      sectionBackground: documentary?.sectionBackground ?? 'dark',
    }
  } catch {
    return null
  }
}
