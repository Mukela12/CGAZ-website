'use client'

import React from 'react'

const TipsContent: React.FC = () => {
  return (
    <div style={{ padding: '16px 0', color: '#475569', lineHeight: '1.8' }}>
      <ul style={{ paddingLeft: '20px', margin: 0 }}>
        <li style={{ marginBottom: '10px' }}>
          <strong>Use MP4 format</strong> for best compatibility across all devices
        </li>
        <li style={{ marginBottom: '10px' }}>
          <strong>YouTube processes HD videos faster</strong> during off-peak hours (nights/weekends)
        </li>
        <li style={{ marginBottom: '10px' }}>
          <strong>&quot;Unlisted&quot; visibility</strong> means the video is accessible via embed on your website but won&apos;t appear in YouTube search results - ideal for exclusive content
        </li>
        <li style={{ marginBottom: '10px' }}>
          <strong>Autoplay requires muted audio</strong> - this is a browser requirement, not a limitation. Users can click &quot;Unmute&quot; to hear the audio
        </li>
        <li style={{ marginBottom: '10px' }}>
          <strong>Recommended video length:</strong> 2-5 minutes for best engagement
        </li>
        <li>
          <strong>Test on mobile</strong> - the video player is fully responsive
        </li>
      </ul>

      <div
        style={{
          marginTop: '20px',
          padding: '12px 16px',
          backgroundColor: '#f1f5f9',
          borderRadius: '6px',
          border: '1px solid #cbd5e1',
        }}
      >
        <strong style={{ color: '#334155' }}>Need help?</strong>
        <p style={{ margin: '8px 0 0 0', color: '#64748b', fontSize: '14px' }}>
          Contact the website administrator for technical assistance with video uploads or embedding.
        </p>
      </div>
    </div>
  )
}

export default TipsContent
