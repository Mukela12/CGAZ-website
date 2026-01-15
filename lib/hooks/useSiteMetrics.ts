import { useState, useEffect } from 'react'

export interface SiteMetrics {
  membersCount: number
  centersCount: number
  districtsCount: number
  growthRate: string
  lastUpdated?: string
}

export function useSiteMetrics() {
  const [metrics, setMetrics] = useState<SiteMetrics>({
    membersCount: 22490,
    centersCount: 145,
    districtsCount: 10,
    growthRate: '85%',
  })
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    let isMounted = true
    setIsHydrated(true)

    async function fetchMetrics() {
      try {
        const response = await fetch('/api/metrics')

        if (!response.ok) {
          throw new Error('Failed to fetch metrics')
        }

        const data = await response.json()

        if (isMounted) {
          setMetrics(data)
          setError(null)
        }
      } catch (err) {
        console.error('Error fetching site metrics:', err)
        if (isMounted) {
          setError(err instanceof Error ? err : new Error('Unknown error'))
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    fetchMetrics()

    return () => {
      isMounted = false
    }
  }, [])

  return { metrics, isLoading, error, isHydrated }
}
