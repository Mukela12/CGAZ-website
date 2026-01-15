import {
  REST_DELETE,
  REST_GET,
  REST_OPTIONS,
  REST_PATCH,
  REST_POST,
  REST_PUT,
} from '@payloadcms/next/routes'
import configPromise from '@payload-config'

// Next.js route configuration
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

// Payload API route handlers
export const GET = REST_GET(configPromise)
export const POST = REST_POST(configPromise)
export const PUT = REST_PUT(configPromise)
export const PATCH = REST_PATCH(configPromise)
export const DELETE = REST_DELETE(configPromise)
export const OPTIONS = REST_OPTIONS(configPromise)
