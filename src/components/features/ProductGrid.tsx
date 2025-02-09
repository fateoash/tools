'use client'

import ProductCard from './ProductCard'
import { Product } from '@/types/product'

interface ProductGridProps {
  products: (Product & { channel?: string })[]
  className?: string
  children?: React.ReactNode
}

export default function ProductGrid({ products, children, className = '' }: ProductGridProps) {
  return (
    <div className={`
      grid auto-cols-fr gap-3
      grid-cols-[repeat(auto-fit,minmax(160px,1fr))]
      sm:grid-cols-2 sm:gap-4
      lg:grid-cols-3 lg:gap-6 
      xl:grid-cols-4
      ${className}
    `}>
      {products.map(product => (
        <ProductCard key={product.id} {...product} />
      ))}
      {children}
    </div>
  )
} 