'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Eye } from 'lucide-react'
import Card from '@/components/ui/Card'
import { Product } from '@/types/product'

interface ProductCardProps extends Product {
  channel?: string
}

export default function ProductCard({ id, title, price, imageUrl, views, channel }: ProductCardProps) {
  return (
    <Link 
      href={`/item/${id}?channel=${channel || 'weidian'}`}
      className="block w-full group"
    >
      <Card className="w-full sm:max-w-[280px] mx-auto">
        <div className="relative aspect-square">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover rounded-t-lg"
          />
        </div>
        <div className="p-2.5 sm:p-4">
          <h3 className="text-xs sm:text-sm font-medium line-clamp-2 mb-1.5 sm:mb-2 group-hover:text-orange-500 transition-colors">
            {title}
          </h3>
          <div className="flex items-center justify-between">
            <div className="text-base sm:text-lg font-medium">
              <span className="text-xs sm:text-sm font-normal">¥</span>
              {price}
            </div>
            <div className="flex items-center gap-1 text-gray-500">
              <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="text-xs sm:text-sm">{views}</span>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  )
} 