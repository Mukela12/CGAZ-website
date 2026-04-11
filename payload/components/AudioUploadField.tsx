'use client'

import React, { useCallback, useRef, useState } from 'react'
import { useField } from '@payloadcms/ui'

/**
 * Custom admin field that drives direct-to-Cloudinary audio uploads.
 *
 * Reads/writes these sibling fields on the `audio-media` collection via
 * Payload's useField hook:
 *   - cloudinaryUrl        (text, required)
 *   - cloudinaryPublicId   (text, required)
 *   - duration             (number, seconds)
 *   - fileSize             (number, bytes)
 *   - mimeType             (text)
 *
 * Flow:
 *   1. User picks an audio file
 *   2. We POST to /api/cloudinary/sign-audio-upload to get a signature
 *   3. We POST the file directly to Cloudinary's video/upload endpoint
 *      (audio is stored as resource_type=video in Cloudinary)
 *   4. On success we populate the sibling fields — user clicks Save to persist
 *
 * Upload progress is shown via an XMLHttpRequest so the user can see big
 * files move. This bypasses Netlify's body-size limit entirely because the
 * file never touches our server.
 */
const AudioUploadField: React.FC = () => {
  const cloudinaryUrl = useField<string>({ path: 'cloudinaryUrl' })
  const cloudinaryPublicId = useField<string>({ path: 'cloudinaryPublicId' })
  const duration = useField<number>({ path: 'duration' })
  const fileSize = useField<number>({ path: 'fileSize' })
  const mimeType = useField<string>({ path: 'mimeType' })
  const title = useField<string>({ path: 'title' })

  const inputRef = useRef<HTMLInputElement>(null)
  const [status, setStatus] = useState<'idle' | 'signing' | 'uploading' | 'done' | 'error'>('idle')
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [selectedName, setSelectedName] = useState<string | null>(null)

  const hasUpload = Boolean(cloudinaryUrl.value)

  const handleFile = useCallback(
    async (file: File) => {
      setError(null)
      setProgress(0)
      setSelectedName(file.name)

      // 1. Get signature from our API
      setStatus('signing')
      const baseName = file.name.replace(/\.[^/.]+$/, '').toLowerCase()
      const safePublicId = baseName.replace(/[^a-z0-9_-]+/g, '-').slice(0, 80)

      const signRes = await fetch('/api/cloudinary/sign-audio-upload', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ publicId: safePublicId }),
      })

      if (!signRes.ok) {
        const body = await signRes.json().catch(() => ({}))
        setStatus('error')
        setError(body?.error || `Failed to get upload signature (${signRes.status})`)
        return
      }

      const { signature, timestamp, apiKey, cloudName, folder, publicId } = await signRes.json()

      // 2. POST directly to Cloudinary
      setStatus('uploading')
      const formData = new FormData()
      formData.append('file', file)
      formData.append('api_key', apiKey)
      formData.append('timestamp', String(timestamp))
      formData.append('signature', signature)
      formData.append('folder', folder)
      formData.append('public_id', publicId)

      // Audio is stored under resource_type=video in Cloudinary
      const cloudinaryEndpoint = `https://api.cloudinary.com/v1_1/${cloudName}/video/upload`

      const uploadResult = await new Promise<any>((resolve, reject) => {
        const xhr = new XMLHttpRequest()
        xhr.open('POST', cloudinaryEndpoint)
        xhr.upload.onprogress = (e) => {
          if (e.lengthComputable) {
            setProgress(Math.round((e.loaded / e.total) * 100))
          }
        }
        xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            try {
              resolve(JSON.parse(xhr.responseText))
            } catch {
              reject(new Error('Invalid Cloudinary response'))
            }
          } else {
            reject(new Error(`Cloudinary upload failed (${xhr.status}): ${xhr.responseText}`))
          }
        }
        xhr.onerror = () => reject(new Error('Network error uploading to Cloudinary'))
        xhr.send(formData)
      }).catch((err) => {
        setStatus('error')
        setError(err?.message || 'Upload failed')
        return null
      })

      if (!uploadResult) return

      // 3. Populate sibling fields
      cloudinaryUrl.setValue(uploadResult.secure_url)
      cloudinaryPublicId.setValue(uploadResult.public_id)
      if (typeof uploadResult.duration === 'number') {
        duration.setValue(Math.round(uploadResult.duration))
      }
      if (typeof uploadResult.bytes === 'number') {
        fileSize.setValue(uploadResult.bytes)
      }
      if (typeof uploadResult.resource_type === 'string' && typeof uploadResult.format === 'string') {
        mimeType.setValue(`${uploadResult.resource_type}/${uploadResult.format}`)
      }
      // If the title hasn't been set yet, seed it with the original filename
      if (!title.value) {
        const prettyTitle = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]+/g, ' ')
        title.setValue(prettyTitle)
      }

      setStatus('done')
      setProgress(100)
    },
    [cloudinaryUrl, cloudinaryPublicId, duration, fileSize, mimeType, title],
  )

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files?.[0]
    if (file) void handleFile(file)
  }

  const formatBytes = (bytes?: number | null) => {
    if (!bytes) return ''
    const mb = bytes / (1024 * 1024)
    return `${mb.toFixed(1)} MB`
  }
  const formatDuration = (seconds?: number | null) => {
    if (!seconds) return ''
    const m = Math.floor(seconds / 60)
    const s = Math.floor(seconds % 60)
    return `${m}:${s.toString().padStart(2, '0')}`
  }

  return (
    <div style={{ padding: '16px 0' }}>
      <label
        style={{
          display: 'block',
          fontSize: '13px',
          fontWeight: 600,
          color: '#0f172a',
          marginBottom: '8px',
        }}
      >
        Audio File Upload
      </label>
      <p style={{ fontSize: '12px', color: '#64748b', marginBottom: '12px', lineHeight: 1.6 }}>
        Pick an MP3, WAV, or M4A file. It will upload directly to Cloudinary — you can upload
        files of any size. After the upload finishes, click <strong>Save</strong> to create
        this audio record.
      </p>

      <div
        style={{
          border: '2px dashed #cbd5e1',
          borderRadius: '8px',
          padding: '20px',
          background: '#f8fafc',
        }}
      >
        <input
          ref={inputRef}
          type="file"
          accept="audio/*"
          onChange={onChange}
          style={{ display: 'block', marginBottom: '12px', width: '100%' }}
          disabled={status === 'signing' || status === 'uploading'}
        />

        {status === 'signing' && (
          <p style={{ fontSize: '12px', color: '#475569' }}>Getting upload signature…</p>
        )}

        {status === 'uploading' && (
          <div>
            <div
              style={{
                height: '6px',
                background: '#e2e8f0',
                borderRadius: '999px',
                overflow: 'hidden',
                marginBottom: '6px',
              }}
            >
              <div
                style={{
                  height: '100%',
                  width: `${progress}%`,
                  background: '#16a34a',
                  transition: 'width 0.2s ease',
                }}
              />
            </div>
            <p style={{ fontSize: '12px', color: '#475569' }}>
              Uploading {selectedName} — {progress}%
            </p>
          </div>
        )}

        {status === 'done' && hasUpload && (
          <div
            style={{
              marginTop: '12px',
              padding: '12px',
              background: '#ecfdf5',
              border: '1px solid #a7f3d0',
              borderRadius: '6px',
            }}
          >
            <p style={{ fontSize: '13px', color: '#065f46', fontWeight: 600, margin: 0 }}>
              ✓ Upload complete — click Save to persist
            </p>
            <p style={{ fontSize: '12px', color: '#047857', marginTop: '6px', wordBreak: 'break-all' }}>
              {cloudinaryUrl.value}
            </p>
            <p style={{ fontSize: '12px', color: '#047857', marginTop: '4px' }}>
              {formatDuration(duration.value)} · {formatBytes(fileSize.value)}
            </p>
          </div>
        )}

        {status === 'idle' && hasUpload && (
          <div
            style={{
              marginTop: '12px',
              padding: '12px',
              background: '#f0fdf4',
              border: '1px solid #bbf7d0',
              borderRadius: '6px',
            }}
          >
            <p style={{ fontSize: '13px', color: '#065f46', margin: 0 }}>
              ✓ Audio file already uploaded. Pick a new file above to replace it.
            </p>
            <p style={{ fontSize: '12px', color: '#047857', marginTop: '4px' }}>
              {formatDuration(duration.value)} · {formatBytes(fileSize.value)}
            </p>
          </div>
        )}

        {status === 'error' && error && (
          <div
            style={{
              marginTop: '12px',
              padding: '12px',
              background: '#fef2f2',
              border: '1px solid #fecaca',
              borderRadius: '6px',
            }}
          >
            <p style={{ fontSize: '13px', color: '#991b1b', fontWeight: 600, margin: 0 }}>
              Upload failed
            </p>
            <p style={{ fontSize: '12px', color: '#b91c1c', marginTop: '4px' }}>{error}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default AudioUploadField
