import { NextRequest, NextResponse } from 'next/server'
import { v2 as cloudinary } from 'cloudinary'
import { getPayload } from 'payload'
import config from '@payload-config'

/**
 * Returns a short-lived Cloudinary upload signature so the admin UI can
 * POST audio files directly to Cloudinary without going through Netlify's
 * 26 MB function body limit.
 *
 * Auth: requires an authenticated Payload user. Uses the same cookie-based
 * session the admin panel uses, so only logged-in CMS editors can mint
 * signatures — public visitors get 401.
 *
 * Flow:
 *   1. Admin component calls this endpoint.
 *   2. We verify the Payload session, then sign a params object with the
 *      Cloudinary API secret.
 *   3. Return { signature, timestamp, apiKey, cloudName, folder, publicId }.
 *   4. Client POSTs FormData with file + the same params to
 *      https://api.cloudinary.com/v1_1/{cloudName}/video/upload
 *   5. Cloudinary verifies the signature and accepts the upload.
 */
export async function POST(req: NextRequest) {
  try {
    // Verify the caller is an authenticated Payload user.
    const payload = await getPayload({ config })
    const { user } = await payload.auth({ headers: req.headers })

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized — you must be logged into the CMS to upload.' },
        { status: 401 },
      )
    }

    // Validate Cloudinary env
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
    const apiKey = process.env.CLOUDINARY_API_KEY
    const apiSecret = process.env.CLOUDINARY_API_SECRET

    if (!cloudName || !apiKey || !apiSecret) {
      return NextResponse.json(
        { error: 'Cloudinary environment variables are not configured on the server.' },
        { status: 500 },
      )
    }

    cloudinary.config({
      cloud_name: cloudName,
      api_key: apiKey,
      api_secret: apiSecret,
      secure: true,
    })

    const body = await req.json().catch(() => ({}))
    const requestedPublicId =
      typeof body?.publicId === 'string' && body.publicId.trim().length > 0
        ? body.publicId.trim().replace(/[^a-zA-Z0-9_-]/g, '-').slice(0, 120)
        : `audio-${Date.now()}`

    const timestamp = Math.floor(Date.now() / 1000)
    const folder = 'CGAZ-AUDIO'

    // NOTE: only sign the params that the client will actually send. If the
    // client sends extra fields Cloudinary will reject the signature.
    const paramsToSign: Record<string, string | number> = {
      folder,
      public_id: requestedPublicId,
      timestamp,
    }

    const signature = cloudinary.utils.api_sign_request(paramsToSign, apiSecret)

    return NextResponse.json({
      signature,
      timestamp,
      apiKey,
      cloudName,
      folder,
      publicId: requestedPublicId,
    })
  } catch (error: any) {
    console.error('sign-audio-upload failed:', error)
    return NextResponse.json(
      { error: error?.message || 'Failed to sign upload' },
      { status: 500 },
    )
  }
}
