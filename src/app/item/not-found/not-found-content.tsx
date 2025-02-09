'use client'

import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { Home, ArrowLeft } from 'lucide-react'
import PageContainer from '@/components/layout/PageContainer'
import Button from '@/components/ui/Button'

export function NotFoundContent() {
  const searchParams = useSearchParams()
  const url = searchParams.get('url')

  return (
    <PageContainer>
      <div className="max-w-2xl mx-auto text-center py-16">
        {/* 404 图片 */}
        <div className="relative w-64 h-64 mx-auto mb-8">
          <Image
            src="/images/not-found.svg"
            alt="Product not found illustration"
            fill
            className="object-contain"
          />
        </div>

        {/* 标题和描述 */}
        <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
          Product Not Found
        </h1>
        <div className="mb-8">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            We couldn't find a product matching the URL:
          </p>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 break-all">
            <code className="text-sm text-gray-800 dark:text-gray-200 font-mono">
              {url}
            </code>
          </div>
        </div>

        {/* 操作按钮 */}
        <div className="flex items-center justify-center gap-4">
          <Button 
            variant="outline"
            onClick={() => window.history.back()}
            className="min-w-[120px]"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Go Back
          </Button>
          <Button 
            variant="primary"
            onClick={() => window.location.href = '/'}
            className="min-w-[120px]"
          >
            <Home className="h-4 w-4 mr-2" />
            Home
          </Button>
        </div>

        {/* 提示信息 */}
        <p className="mt-8 text-sm text-gray-500 dark:text-gray-400">
          If you believe this is a mistake, please try again or contact support.
        </p>
      </div>
    </PageContainer>
  )
} 