'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search } from 'lucide-react'
import Input from '@/components/ui/Input'

interface SearchResponse {
  success: boolean
  code: string
  result?: {
    channel: string
    itemId: string
    link: string | null
  }
  message: string | null
  traceId: string | null
}

export default function SearchBar() {
  const router = useRouter()
  const [url, setUrl] = useState('')
  const [error, setError] = useState('')
  const [isSearching, setIsSearching] = useState(false)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!url.trim()) {
      setError('Please enter a URL')
      return
    }

    setIsSearching(true)
    try {
      const response = await fetch(
        `https://api.findlink.top/product/analysisLink?link=${encodeURIComponent(url.trim())}`,
        {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          }
        }
      )

      const data: SearchResponse = await response.json()

      if (data.success && data.result?.itemId) {
        router.push(`/item/${data.result.itemId}?channel=${data.result.channel}`)
      } else {
        router.push(`/item/not-found?url=${encodeURIComponent(url)}`)
      }
    } catch (err) {
      setError('Failed to analyze URL. Please try again.')
      console.error('Search error:', err)
    } finally {
      setIsSearching(false)
    }
  }

  return (
    <form onSubmit={handleSearch} className="flex-1 max-w-3xl">
      <div className="relative">
        <Input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://item.taobao.com/item.htm?id=..."
          disabled={isSearching}
          icon={
            <button 
              type="submit" 
              disabled={isSearching}
              className="disabled:opacity-50"
            >
              <Search className={`h-5 w-5 hover:text-gray-700 dark:hover:text-gray-300 transition-colors
                ${isSearching ? 'animate-spin' : ''}`} 
              />
            </button>
          }
          error={error}
        />
        {error && (
          <div className="absolute -bottom-6 left-0 text-sm text-red-500">
            {error}
          </div>
        )}
      </div>
    </form>
  )
} 