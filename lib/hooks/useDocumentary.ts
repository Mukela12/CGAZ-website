import { useState, useEffect } from 'react'

export interface DocumentarySettings {
  isEnabled: boolean
  title: string
  subtitle: string
  youtubeVideoId: string
  youtubeUrl: string
  showControls: boolean
  loop: boolean
  sectionBackground: 'dark' | 'light' | 'green'
}

const defaultSettings: DocumentarySettings = {
  isEnabled: false,
  title: 'Our Story',
  subtitle: 'Watch our documentary to learn about CGAZ\'s mission.',
  youtubeVideoId: '',
  youtubeUrl: '',
  showControls: true,
  loop: false,
  sectionBackground: 'dark',
}

export function useDocumentary() {
  const [settings, setSettings] = useState<DocumentarySettings>(defaultSettings)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    let isMounted = true

    async function fetchSettings() {
      try {
        const response = await fetch('/api/documentary')

        if (!response.ok) {
          throw new Error('Failed to fetch documentary settings')
        }

        const data = await response.json()

        if (isMounted) {
          setSettings(data)
          setError(null)
        }
      } catch (err) {
        console.error('Error fetching documentary settings:', err)
        if (isMounted) {
          setError(err instanceof Error ? err : new Error('Unknown error'))
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    fetchSettings()

    return () => {
      isMounted = false
    }
  }, [])

  return { settings, isLoading, error }
}
