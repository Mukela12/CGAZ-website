'use client'

import React from 'react'

const Step1Instructions: React.FC = () => {
  return (
    <div style={{ padding: '16px 0', color: '#475569', lineHeight: '1.8' }}>
      <ol style={{ paddingLeft: '20px', margin: 0 }}>
        <li style={{ marginBottom: '8px' }}>
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
        <li style={{ marginBottom: '8px' }}>
          Click the <strong>&quot;+&quot; (Create)</strong> button in the top right corner
        </li>
        <li style={{ marginBottom: '8px' }}>
          Select <strong>&quot;Upload video&quot;</strong>
        </li>
        <li style={{ marginBottom: '8px' }}>
          Drag and drop your video file or click <strong>&quot;Select files&quot;</strong>
        </li>
        <li style={{ marginBottom: '8px' }}>
          Fill in the title and description for your video
        </li>
        <li style={{ marginBottom: '8px' }}>
          Set visibility to <strong>&quot;Unlisted&quot;</strong> (recommended) or <strong>&quot;Public&quot;</strong>
        </li>
        <li>
          Click <strong>&quot;Publish&quot;</strong> and wait for YouTube to process the video
        </li>
      </ol>
    </div>
  )
}

export default Step1Instructions
