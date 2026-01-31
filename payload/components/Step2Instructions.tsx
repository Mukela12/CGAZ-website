'use client'

import React from 'react'

const Step2Instructions: React.FC = () => {
  return (
    <div style={{ padding: '16px 0', color: '#475569', lineHeight: '1.8' }}>
      <ol style={{ paddingLeft: '20px', margin: 0 }}>
        <li style={{ marginBottom: '8px' }}>
          After publishing, click <strong>&quot;Share&quot;</strong> on your video
        </li>
        <li style={{ marginBottom: '8px' }}>
          Copy the link - it will look like:{' '}
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
        </li>
        <li style={{ marginBottom: '12px' }}>
          The <strong>Video ID</strong> is the part after &quot;youtu.be/&quot; &rarr;{' '}
          <code
            style={{
              backgroundColor: '#dcfce7',
              padding: '4px 8px',
              borderRadius: '4px',
              fontFamily: 'monospace',
              fontSize: '14px',
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
          marginTop: '16px',
          padding: '12px 16px',
          backgroundColor: '#fef3c7',
          borderRadius: '6px',
          border: '1px solid #fcd34d',
        }}
      >
        <strong style={{ color: '#92400e' }}>Alternative URL format:</strong>
        <p style={{ margin: '8px 0 0 0', color: '#92400e', fontSize: '14px' }}>
          For standard YouTube URLs like{' '}
          <code style={{ fontFamily: 'monospace', fontSize: '13px', backgroundColor: '#fef9c3', padding: '2px 4px', borderRadius: '3px' }}>
            https://www.youtube.com/watch?v=dQw4w9WgXcQ
          </code>
          <br />
          The Video ID is the value after <code style={{ fontFamily: 'monospace' }}>v=</code>
        </p>
      </div>
    </div>
  )
}

export default Step2Instructions
