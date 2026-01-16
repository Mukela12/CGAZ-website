import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@/payload.config'
import fs from 'fs'
import path from 'path'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const { searchParams } = new URL(request.url)
    const filename = searchParams.get('filename') || 'download'

    // Get the resource from Payload
    const payload = await getPayload({ config })
    const resource = await payload.findByID({
      collection: 'resources',
      id: id,
    })

    if (!resource) {
      return NextResponse.json(
        { error: 'Resource not found' },
        { status: 404 }
      )
    }

    let fileBuffer: ArrayBuffer | null = null

    // Try local file first (faster and more reliable)
    if (resource.filename) {
      const localPath = path.join(process.cwd(), 'public/resources', resource.filename)
      console.log('Checking local file:', localPath)

      if (fs.existsSync(localPath)) {
        console.log('Using local file')
        const localBuffer = fs.readFileSync(localPath)
        fileBuffer = localBuffer.buffer.slice(localBuffer.byteOffset, localBuffer.byteOffset + localBuffer.byteLength)
      }
    }

    // Fall back to Cloudinary if local file not found
    if (!fileBuffer && resource.cloudinaryUrl) {
      console.log('Fetching from Cloudinary URL:', resource.cloudinaryUrl)
      const fileResponse = await fetch(resource.cloudinaryUrl)

      if (!fileResponse.ok) {
        console.error('Cloudinary fetch failed:', {
          status: fileResponse.status,
          statusText: fileResponse.statusText,
          url: resource.cloudinaryUrl
        })
        return NextResponse.json(
          { error: 'Failed to fetch file from storage', details: `${fileResponse.status} ${fileResponse.statusText}` },
          { status: 500 }
        )
      }

      fileBuffer = await fileResponse.arrayBuffer()
    }

    if (!fileBuffer) {
      return NextResponse.json(
        { error: 'File not available' },
        { status: 404 }
      )
    }

    // Determine content type from the resource
    let contentType = 'application/octet-stream'
    if (resource.mimeType) {
      contentType = resource.mimeType
    } else if (resource.fileType === 'pdf') {
      contentType = 'application/pdf'
    } else if (resource.fileType === 'doc') {
      contentType = 'application/msword'
    } else if (resource.fileType === 'excel') {
      contentType = 'application/vnd.ms-excel'
    }

    // Get file extension from original filename or cloudinary URL
    let extension = ''
    if (resource.filename) {
      const parts = resource.filename.split('.')
      if (parts.length > 1) {
        extension = '.' + parts[parts.length - 1]
      }
    }

    // Clean the filename and add extension if needed
    let downloadFilename = filename.replace(/[^a-zA-Z0-9\s\-_]/g, '')
    if (extension && !downloadFilename.toLowerCase().endsWith(extension.toLowerCase())) {
      downloadFilename += extension
    }

    // Increment download count (fire and forget)
    payload.update({
      collection: 'resources',
      id: id,
      data: {
        downloadCount: (resource.downloadCount || 0) + 1,
      },
    }).catch(() => {}) // Ignore errors for download count

    // Return the file with download headers
    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `attachment; filename="${downloadFilename}"`,
        'Content-Length': fileBuffer.byteLength.toString(),
      },
    })
  } catch (error) {
    console.error('Download error:', error)
    return NextResponse.json(
      { error: 'Failed to download resource' },
      { status: 500 }
    )
  }
}
