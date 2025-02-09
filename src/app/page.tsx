'use client'

import { useState, useEffect } from 'react'
import PageContainer from '@/components/layout/PageContainer'
import PageTitle from '@/components/ui/PageTitle'
import ProductGrid from '@/components/features/ProductGrid'
import ViewMoreCard from '@/components/features/ViewMoreCard'
import { Product } from '@/types/product'

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

export default function Home() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          'https://api.findlink.top/spu/page?pageNo=1&pageSize=10',
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
          setProducts(formattedProducts)
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

    fetchProducts()
  }, [])

  if (loading) {
    return (
      <PageContainer>
        <PageTitle>Trending items</PageTitle>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-pulse text-gray-500">Loading products...</div>
        </div>
      </PageContainer>
    )
  }

  if (error) {
    return (
      <PageContainer>
        <PageTitle>Trending items</PageTitle>
        <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
          <div className="text-red-500 mb-4">{error}</div>
        </div>
      </PageContainer>
    )
  }

  return (
    <PageContainer>
      <PageTitle>Trending items</PageTitle>
      <ProductGrid products={products}>
        <ViewMoreCard href="/popular" />
      </ProductGrid>
    </PageContainer>
  )
} 