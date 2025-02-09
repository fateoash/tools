import { useState, useEffect } from 'react'

export function useFetch<T>(url: string, options?: RequestInit) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const abortController = new AbortController()
    let ignore = false

    async function fetchData() {
      try {
        const response = await fetch(url, {
          ...options,
          signal: abortController.signal
        })
        const json = await response.json()
        if (!ignore) {
          setData(json)
        }
      } catch (err) {
        if (!ignore) {
          setError(err as Error)
        }
      } finally {
        if (!ignore) {
          setLoading(false)
        }
      }
    }

    fetchData()

    return () => {
      ignore = true
      abortController.abort()
    }
  }, [url])

  return { data, loading, error }
} 