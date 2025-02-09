'use client'

import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

interface ViewMoreCardProps {
  href: string
  className?: string
}

export default function ViewMoreCard({ href, className = '' }: ViewMoreCardProps) {
  return (
    <Link 
      href={href}
      className={`
        w-[280px] h-[280px] bg-gray-50 dark:bg-gray-800 rounded-lg
        flex flex-col items-center justify-center gap-4
        hover:bg-gray-100 dark:hover:bg-gray-700
        transition-colors cursor-pointer group
        ${className}
      `}
    >
      <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
        <ArrowRight className="h-8 w-8 text-gray-500 dark:text-gray-400 group-hover:translate-x-1 transition-transform" />
      </div>
      <span className="text-lg font-medium text-gray-600 dark:text-gray-300">
        View More
      </span>
    </Link>
  )
} 