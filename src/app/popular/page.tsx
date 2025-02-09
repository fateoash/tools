'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import PageContainer from '@/components/layout/PageContainer'
import PageTitle from '@/components/ui/PageTitle'
import Tabs from '@/components/ui/Tabs'
import ProductGrid from '@/components/features/ProductGrid'
import { Product } from '@/types/product'

type TimeRange = 'day' | 'week' | 'month' | 'year'

const TIME_RANGE_TABS = [
  { id: 'day', label: 'Today' },
  { id: 'week', label: 'Week' },
  { id: 'month', label: 'Month' },
  { id: 'year', label: 'Year' }
]

interface SpuItem {
  id: number
  itemCode: string
  title: string
  price: number
  mainImage: string
  channel: string
  channelItemNo: string
}

interface PageResponse {
  success: boolean
  code: string
  result?: {
    records: SpuItem[]
    total: number
    size: number
    current: number
    pages: number
  }
  message: string | null
  traceId: string | null
}

export default function PopularPage() {
  const [timeRange, setTimeRange] = useState<TimeRange>('week')
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [hasMore, setHasMore] = useState(true)
  const currentPage = useRef(1)
  
  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: '100px'
  })

  const fetchProducts = async (page: number) => {
    try {
      const response = await fetch(
        `https://api.findlink.top/spu/page?pageNo=${page}&pageSize=12`,
        {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          }
        }
      )

      const data: PageResponse = await response.json()

      if (data.success && data.result?.records) {
        const formattedProducts = data.result.records.map(item => ({
          id: item.channelItemNo,
          title: item.title,
          price: item.price,
          imageUrl: item.mainImage.startsWith('//') 
            ? `https:${item.mainImage}` 
            : item.mainImage,
          views: Math.floor(Math.random() * 9000) + 1000,
          channel: item.channel
        }))

        setProducts(prev => page === 1 ? formattedProducts : [...prev, ...formattedProducts])
        setHasMore(data.result.current < data.result.pages)
      } else {
        setError(data.message || 'Failed to load products')
      }
    } catch (err) {
      console.error('Error fetching products:', err)
      setError('Failed to load products. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  // 切换时间范围时重置数据
  useEffect(() => {
    currentPage.current = 1
    setProducts([])
    setHasMore(true)
    setLoading(true)
    fetchProducts(1)
  }, [timeRange])

  // 滚动加载更多
  useEffect(() => {
    if (inView && !loading && hasMore) {
      currentPage.current += 1
      setLoading(true)
      fetchProducts(currentPage.current)
    }
  }, [inView, loading, hasMore])

  return (
    <PageContainer>
      <div className="flex items-center justify-between mb-8">
        <PageTitle>Popular Items</PageTitle>
        {/* <Tabs
          tabs={TIME_RANGE_TABS}
          activeTab={timeRange}
          onChange={(tab) => setTimeRange(tab as TimeRange)}
          className="w-auto"
        /> */}
      </div>
      
      <ProductGrid products={products} />
      
      {hasMore && (
        <div ref={ref} className="flex justify-center py-8">
          {loading ? (
            <div className="animate-pulse text-gray-500">Loading more items...</div>
          ) : (
            <div className="h-10" />
          )}
        </div>
      )}
      
      {!hasMore && products.length > 0 && (
        <div className="text-center py-8 text-gray-500">
          No more items to load
        </div>
      )}

      {error && (
        <div className="text-center py-8 text-red-500">
          {error}
        </div>
      )}
    </PageContainer>
  )
} 