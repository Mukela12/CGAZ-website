import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import sharp from 'sharp'
import path from 'path'
import { fileURLToPath } from 'url'

// Import collections
import { Users } from './payload/collections/Users'
import { TeamMembers } from './payload/collections/TeamMembers'
import { Partners } from './payload/collections/Partners'
import { Projects } from './payload/collections/Projects'
import { BlogPosts } from './payload/collections/BlogPosts'
import { SuccessStories } from './payload/collections/SuccessStories'
import { Media } from './payload/collections/Media'
import { Resources } from './payload/collections/Resources'
import { ContactSubmissions } from './payload/collections/ContactSubmissions'
import { CourseRegistrations } from './payload/collections/CourseRegistrations'
import { NewsletterSubscribers } from './payload/collections/NewsletterSubscribers'

// Import globals
import { SiteMetrics } from './payload/globals/SiteMetrics'
import { PaymentSettings } from './payload/globals/PaymentSettings'
import { FeaturedDocumentary } from './payload/globals/FeaturedDocumentary'
import { HomepageSlideshow } from './payload/globals/HomepageSlideshow'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  // Server URL for API calls and authentication
  serverURL: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',

  // Admin user configuration
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: '- CGAZ CMS',
      favicon: '/cashew-logo.ico',
      ogImage: '/cashew-logo.png',
    },
    // Custom branding
    components: {},
  },

  // Collections
  collections: [
    Users,
    TeamMembers,
    Partners,
    Projects,
    BlogPosts,
    SuccessStories,
    Media,
    Resources,
    ContactSubmissions,
    CourseRegistrations,
    NewsletterSubscribers,
  ],

  // Globals
  globals: [
    SiteMetrics,
    PaymentSettings,
    FeaturedDocumentary,
    HomepageSlideshow,
  ],

  // Database
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || 'postgresql://localhost:5432/cgaz',
    },
  }),

  // Rich text editor (Lexical - recommended for Payload 3.0)
  editor: lexicalEditor({}),

  // Image optimization with sharp
  sharp,

  // Secret for JWT encryption
  secret: process.env.PAYLOAD_SECRET || 'YOUR-SECRET-HERE',

  // TypeScript configuration
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },

  // GraphQL configuration
  graphQL: {
    schemaOutputFile: path.resolve(dirname, 'generated-schema.graphql'),
  },

  // CORS configuration
  cors: [
    process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  ].filter(Boolean),

  // CSRF protection
  csrf: [
    process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  ].filter(Boolean),
})
