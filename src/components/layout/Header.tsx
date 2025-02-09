'use client'

import { Search, Moon, Sun } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'
import SearchBar from '@/components/features/SearchBar'
import IconButton from '@/components/ui/IconButton'
import Button from '@/components/ui/Button'

export default function Header() {
  const [isDark, setIsDark] = useState(false)

  return (
    <header className="bg-white dark:bg-gray-950 border-b border-gray-100 dark:border-gray-800">
      <div className="container mx-auto px-3 h-14 sm:h-16 sm:px-4">
        {/* 移动端垂直布局，桌面端水平布局 */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 py-2 sm:py-0">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <span className="text-xl sm:text-2xl font-bold text-orange-500">FINDLink.</span>
          </Link>
          
          {/* 搜索框容器 */}
          <div className="flex-1 max-w-2xl w-full">
            <SearchBar />
          </div>
        </div>
      </div>
    </header>
  )
} 