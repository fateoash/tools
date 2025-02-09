'use client'

import { X, ExternalLink, ArrowUpRight } from 'lucide-react'
import Image from 'next/image'

interface Platform {
  name: string
  productLink: string
  logoImage: string | null
  sort: number
  platformDesc?: string
  recommendFlag?: number
}

interface BuyOptionsModalProps {
  onClose: () => void
  platforms: Platform[]
}

const PLATFORM_INFO = {
  allchinabuy: {
    name: 'AllChinaBuy',
    description: 'Global shipping, multiple payment methods',
    logo: '/images/store-default.svg'
  },
  hoobuy: {
    name: 'HooBuy',
    description: 'Fast shipping, easy returns',
    logo: '/images/store-default.svg'
  },
  cnfans: {
    name: 'CNFans',
    description: 'Best prices, reliable service',
    logo: '/images/store-default.svg'
  },
  oopbuy: {
    name: 'OopBuy',
    description: 'Quality inspection, secure payment',
    logo: '/images/store-default.svg'
  }
}

export default function BuyOptionsModal({ onClose, platforms }: BuyOptionsModalProps) {
  // 按 sort 排序
  const sortedPlatforms = [...platforms].sort((a, b) => b.sort - a.sort)

  const handleProviderClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer')
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="relative w-full max-w-xl max-h-[90vh] bg-white dark:bg-gray-900 rounded-lg shadow-xl flex flex-col">
        {/* Header - 固定在顶部 */}
        <div className="flex-shrink-0 flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Select shipping provider
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Provider List - 可滚动区域 */}
        <div className="flex-1 overflow-y-auto min-h-0 p-4">
          <div className="space-y-3">
            {sortedPlatforms.map((platform) => {
              const info = PLATFORM_INFO[platform.name as keyof typeof PLATFORM_INFO]
              return (
                <button
                  key={platform.name}
                  onClick={() => handleProviderClick(platform.productLink)}
                  className="relative w-full flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-800/50 
                    hover:bg-orange-50 dark:hover:bg-orange-900/20 
                    rounded-lg transition-all duration-200 group
                    hover:scale-[1.02] hover:shadow-md"
                >
                  {/* 推荐标签 - 向下移动位置 */}
                  {platform.recommendFlag === 1 && (
                    <div className="absolute top-2 right-12 px-1.5 py-0.5 bg-orange-500 text-white text-[10px] 
                      rounded-full shadow-sm transform rotate-6 
                      group-hover:rotate-3 transition-transform duration-200"
                    >
                      Recommended
                    </div>
                  )}

                  <div className="flex-shrink-0 w-12 h-12 relative">
                    <Image
                      src={platform.logoImage || info?.logo || '/images/store-default.svg'}
                      alt={info?.name || platform.name}
                      fill
                      unoptimized
                      className="object-contain dark:invert group-hover:scale-105 transition-transform duration-200"
                    />
                  </div>

                  <div className="flex-1 text-left min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-gray-900 dark:text-white 
                        group-hover:text-orange-600 dark:group-hover:text-orange-400 
                        transition-colors duration-200"
                      >
                        {info?.name || platform.name}
                      </span>
                    </div>
                    <p className="text-sm text-gray-400 dark:text-gray-400 
                      group-hover:text-orange-600/80 dark:group-hover:text-orange-400/80 
                      transition-colors duration-200"
                    >
                      {platform.platformDesc || info?.description || 'International shipping available'}
                    </p>
                  </div>

                  {/* 修改 Open 图标和样式 */}
                  <div className="flex-shrink-0 flex flex-col items-center gap-0.5 
                    text-gray-400 group-hover:text-orange-500 transition-all duration-200
                    group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  >
                    <ArrowUpRight className="h-4 w-4" />
                    <span className="text-[10px]">Open</span>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
} 