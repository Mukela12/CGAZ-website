'use client'

import React from 'react'

const UploadInstructions: React.FC = () => {
  return (
    <div
      style={{
        padding: '24px',
        backgroundColor: '#f8fafc',
        borderRadius: '8px',
        border: '1px solid #e2e8f0',
        marginTop: '8px',
      }}
    >
      <h2
        style={{
          fontSize: '20px',
          fontWeight: '600',
          marginBottom: '20px',
          color: '#1e293b',
        }}
      >
        How to Add a Documentary Video
      </h2>

      {/* Step 1 */}
      <div style={{ marginBottom: '24px' }}>
        <h3
          style={{
            fontSize: '16px',
            fontWeight: '600',
            color: '#16a34a',
            marginBottom: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <span
            style={{
              backgroundColor: '#16a34a',
              color: 'white',
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '14px',
              fontWeight: '700',
            }}
          >
            1
          </span>
          Upload to YouTube
        </h3>
        <ol
          style={{
            paddingLeft: '40px',
            color: '#475569',
            lineHeight: '1.8',
            listStyleType: 'decimal',
          }}
        >
          <li>
            Go to{' '}
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#16a34a', textDecoration: 'underline' }}
            >
              youtube.com
            </a>{' '}
            and sign in to your CGAZ YouTube account
          </li>
          <li>Click the &quot;+&quot; (Create) button in the top right</li>
          <li>Select &quot;Upload video&quot;</li>
          <li>Drag and drop your video file or click &quot;Select files&quot;</li>
          <li>Fill in the title and description</li>
          <li>
            Set visibility to <strong>&quot;Unlisted&quot;</strong> or{' '}
            <strong>&quot;Public&quot;</strong>
          </li>
          <li>Click &quot;Publish&quot; and wait for processing</li>
        </ol>
      </div>

      {/* Step 2 */}
      <div style={{ marginBottom: '24px' }}>
        <h3
          style={{
            fontSize: '16px',
            fontWeight: '600',
            color: '#16a34a',
            marginBottom: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <span
            style={{
              backgroundColor: '#16a34a',
              color: 'white',
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '14px',
              fontWeight: '700',
            }}
          >
            2
          </span>
          Get the Video ID
        </h3>
        <ol
          style={{
            paddingLeft: '40px',
            color: '#475569',
            lineHeight: '1.8',
            listStyleType: 'decimal',
          }}
        >
          <li>After publishing, click &quot;Share&quot; on your video</li>
          <li>
            Copy the link (e.g.,{' '}
            <code
              style={{
                backgroundColor: '#e2e8f0',
                padding: '2px 6px',
                borderRadius: '4px',
                fontFamily: 'monospace',
                fontSize: '13px',
              }}
            >
              https://youtu.be/dQw4w9WgXcQ
            </code>
            )
          </li>
          <li>
            The Video ID is the part after &quot;youtu.be/&quot; →{' '}
            <code
              style={{
                backgroundColor: '#dcfce7',
                padding: '2px 6px',
                borderRadius: '4px',
                fontFamily: 'monospace',
                fontSize: '13px',
                color: '#16a34a',
                fontWeight: '600',
              }}
            >
              dQw4w9WgXcQ
            </code>
          </li>
        </ol>
        <div
          style={{
            marginTop: '12px',
            marginLeft: '40px',
            padding: '12px',
            backgroundColor: '#fef3c7',
            borderRadius: '6px',
            border: '1px solid #fcd34d',
          }}
        >
          <strong style={{ color: '#92400e' }}>Alternative:</strong>
          <span style={{ color: '#92400e' }}>
            {' '}
            For standard YouTube URLs like{' '}
            <code style={{ fontFamily: 'monospace', fontSize: '13px' }}>
              https://www.youtube.com/watch?v=dQw4w9WgXcQ
            </code>
            , the Video ID is the value after{' '}
            <code style={{ fontFamily: 'monospace', fontSize: '13px' }}>v=</code>
          </span>
        </div>
      </div>

      {/* Step 3 */}
      <div style={{ marginBottom: '24px' }}>
        <h3
          style={{
            fontSize: '16px',
            fontWeight: '600',
            color: '#16a34a',
            marginBottom: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <span
            style={{
              backgroundColor: '#16a34a',
              color: 'white',
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '14px',
              fontWeight: '700',
            }}
          >
            3
          </span>
          Add to Website
        </h3>
        <ol
          style={{
            paddingLeft: '40px',
            color: '#475569',
            lineHeight: '1.8',
            listStyleType: 'decimal',
          }}
        >
          <li>
            Go to the <strong>&quot;Video Settings&quot;</strong> tab above
          </li>
          <li>Paste the Video ID in the &quot;YouTube Video ID&quot; field</li>
          <li>Set your preferred title and description</li>
          <li>
            Enable <strong>&quot;Display Documentary on Homepage&quot;</strong>
          </li>
          <li>Click Save changes</li>
        </ol>
      </div>

      {/* Tips Section */}
      <div
        style={{
          padding: '16px',
          backgroundColor: '#ecfdf5',
          borderRadius: '8px',
          border: '1px solid #a7f3d0',
        }}
      >
        <h4
          style={{
            fontSize: '14px',
            fontWeight: '600',
            color: '#065f46',
            marginBottom: '8px',
          }}
        >
          Tips
        </h4>
        <ul
          style={{
            paddingLeft: '20px',
            color: '#047857',
            lineHeight: '1.6',
            listStyleType: 'disc',
            fontSize: '14px',
          }}
        >
          <li>Use MP4 format for best compatibility</li>
          <li>YouTube processes HD videos faster during off-peak hours</li>
          <li>
            <strong>Unlisted</strong> videos are accessible via embed but won&apos;t
            appear in YouTube search
          </li>
          <li>
            The video will autoplay <strong>muted</strong> (browser requirement) with
            an unmute button visible
          </li>
        </ul>
      </div>
    </div>
  )
}

export default UploadInstructions
