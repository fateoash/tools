'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { Share2, Settings } from 'lucide-react'
import ImageGallery from '@/components/features/ImageGallery'
import ImageModal from '@/components/features/ImageModal'
import PageContainer from '@/components/layout/PageContainer'
import Button from '@/components/ui/Button'
import ShareMenu from '@/components/features/ShareMenu'
import BuyOptionsModal from '@/components/features/BuyOptionsModal'

interface QcImage {
  id: number
  imageUrl: string
  contSign: string
  productLink: string
  imageChannel: string
  groupCode: string
  uploadType: string
  productChannel: string
  spuNo: string
  skuNo: string
  shopNo: string | null
  remark: string | null
}

interface Platform {
  name: string
  productLink: string
  logoImage: string | null
  sort: number
}

interface ProductDetail {
  success: boolean
  code: string
  result?: {
    id: number
    itemCode: string
    title: string
    price: number
    mainImage: string
    channel: string
    channelItemNo: string
    qcImageVoGroupMap: Record<string, QcImage[]>
    platformVoList: Platform[]
  }
  message: string | null
  traceId: string | null
}

interface ImageGroup {
  id: string
  date: string
  fetchTime: string
  images: string[]
}



// 辅助函数：确保 URL 是完整的
const ensureFullUrl = (url: string) => {
  return url.startsWith('//') ? `https:${url}` : url
}

export default function ItemPage({ params }: { params: { sku: string } }) {
  const searchParams = useSearchParams()
  const [selectedGroup, setSelectedGroup] = useState<ImageGroup | null>(null)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [showBuyOptions, setShowBuyOptions] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [productDetail, setProductDetail] = useState<ProductDetail | null>(null)

  const channel = searchParams.get('channel') || 'weidian'

  useEffect(() => {
    let isSubscribed = true
    
    const fetchProductDetail = async () => {
      setLoading(true)
      setError(null)
      
      try {
        const response = await fetch(
          `https://api.findlink.top/spu/getQcDetail?channel=${channel}&itemNo=${params.sku}`,
          {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
            }
          }
        )

        const data: ProductDetail = await response.json()

        if (isSubscribed) {
          if (data.success && data.result) {
            setProductDetail(data)
          } else {
            setError(data.message || 'Failed to load product details')
          }
        }
      } catch (err) {
        if (isSubscribed) {
          console.error('Error fetching product details:', err)
          setError('Failed to load product details. Please try again later.')
        }
      } finally {
        if (isSubscribed) {
          setLoading(false)
        }
      }
    }

    fetchProductDetail()

    return () => {
      isSubscribed = false
    }
  }, [params.sku, channel])

  if (loading) {
    return (
      <PageContainer>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-pulse text-gray-500">Loading product details...</div>
        </div>
      </PageContainer>
    )
  }

  if (error || !productDetail?.result) {
    return (
      <PageContainer>
        <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
          <div className="text-red-500 mb-4">{error}</div>
          <Button 
            variant="outline" 
            onClick={() => window.history.back()}
          >
            Go Back
          </Button>
        </div>
      </PageContainer>
    )
  }

  const { result } = productDetail
  const shareUrl = typeof window !== 'undefined' ? window.location.href : ''
  const shareTitle = `Check out ${result.title} on our store!`

  // 转换图片组数据结构
  const groupedImages = result.qcImageVoGroupMap 
    ? Object.entries(result.qcImageVoGroupMap).map(([groupCode, images]) => {
        const date = groupCode.substring(0, 8) // 提取日期部分 YYYYMMDD
        const formattedDate = `${date.substring(0, 4)}/${date.substring(4, 6)}/${date.substring(6, 8)}`
        
        return {
          id: groupCode,
          date: formattedDate,
          fetchTime: formattedDate,
          images: images.map(img => ensureFullUrl(img.imageUrl))
        }
      })
    : []

  return (
    <PageContainer>
      <div className="mb-12">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
          <div className="w-full lg:w-64 aspect-square lg:h-64 relative">
            <Image
              src={ensureFullUrl(result.mainImage)}
              alt={result.title}
              fill
              className="object-cover rounded-lg"
            />
          </div>

          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6 lg:mb-8">
              <h1 className="text-xl lg:text-2xl font-medium flex-1">{result.title}</h1>
              <div className="flex gap-2 self-end sm:self-start">
                <ShareMenu url={shareUrl} title={shareTitle} />
              </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8 mb-6 lg:mb-8">
              <div className="col-span-2 lg:col-span-1 space-y-4 lg:space-y-6">
                <div>
                  <div className="text-gray-600 mb-1">Price</div>
                  <div className="text-2xl font-medium">
                    <span className="text-base font-normal">¥</span>
                    {result.price}
                  </div>
                </div>
                <Button 
                  variant="primary" 
                  size="lg"
                  className="w-full bg-orange-500 hover:bg-orange-600 dark:bg-orange-500 dark:hover:bg-orange-600"
                  onClick={() => setShowBuyOptions(true)}
                >
                  Buy Now
                </Button>
              </div>
              {/* <div>
                <div className="text-gray-600 mb-1">Height</div>
                <div className="text-lg lg:text-2xl font-medium">26.0</div>
              </div>
              <div>
                <div className="text-gray-600 mb-1">Length</div>
                <div className="text-lg lg:text-2xl font-medium">22.0</div>
              </div>
              <div className="lg:col-start-3">
                <div className="text-gray-600 mb-1">Width</div>
                <div className="text-lg lg:text-2xl font-medium">7.0</div>
              </div> */}
            </div>
          </div>
        </div>
      </div>

      {/* 只在有 QC 图片时显示图片组列表 */}
      {groupedImages.length > 0 && (
        <div className="space-y-8 lg:space-y-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {groupedImages.map((group) => (
              <div key={group.id}>
                <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden p-4 relative">
                  <ImageGallery
                    images={group.images}
                    onImageClick={(index) => {
                      setSelectedGroup(group)
                      setSelectedImageIndex(index)
                    }}
                  />
                  <div className="absolute bottom-6 left-4 flex gap-2">
                    <div className="text-xs bg-black/50 text-white px-2 py-1 rounded">
                      获取于 {group.fetchTime}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 没有 QC 图片时显示提示信息 */}
      {groupedImages.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No QC images available yet
        </div>
      )}

      {selectedGroup && (
        <ImageModal
          images={selectedGroup.images}
          currentIndex={selectedImageIndex}
          onClose={() => setSelectedGroup(null)}
          onIndexChange={setSelectedImageIndex}
        />
      )}

      {showBuyOptions && (
        <BuyOptionsModal 
          onClose={() => setShowBuyOptions(false)} 
          platforms={result.platformVoList}
        />
      )}
    </PageContainer>
  )
} 