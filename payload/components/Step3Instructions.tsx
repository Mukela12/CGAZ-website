'use client'

import React from 'react'

const Step3Instructions: React.FC = () => {
  return (
    <div style={{ padding: '16px 0', color: '#475569', lineHeight: '1.8' }}>
      <ol style={{ paddingLeft: '20px', margin: 0 }}>
        <li style={{ marginBottom: '8px' }}>
          Go to the <strong>&quot;Video Settings&quot;</strong> tab above
        </li>
        <li style={{ marginBottom: '8px' }}>
          Paste the Video ID in the <strong>&quot;YouTube Video ID&quot;</strong> field
        </li>
        <li style={{ marginBottom: '8px' }}>
          Set your preferred title and description for the section
        </li>
        <li style={{ marginBottom: '8px' }}>
          Check the <strong>&quot;Display Documentary on Homepage&quot;</strong> checkbox
        </li>
        <li>
          Click <strong>&quot;Save&quot;</strong> to publish your changes
        </li>
      </ol>

      <div
        style={{
          marginTop: '16px',
          padding: '12px 16px',
          backgroundColor: '#ecfdf5',
          borderRadius: '6px',
          border: '1px solid #a7f3d0',
        }}
      >
        <strong style={{ color: '#065f46' }}>The video will appear:</strong>
        <p style={{ margin: '8px 0 0 0', color: '#047857', fontSize: '14px' }}>
          On the homepage, below the hero slideshow and above the stats section.
          The video will autoplay muted (browser requirement) with an &quot;Unmute&quot; button visible.
        </p>
      </div>
    </div>
  )
}

export default Step3Instructions
