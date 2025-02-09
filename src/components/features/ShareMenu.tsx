'use client'

import { useState, useRef } from 'react'
import { Share2, Twitter, Facebook, Copy, X } from 'lucide-react'
import { useClickAway } from '@/hooks/useClickAway'

interface ShareMenuProps {
  url: string
  title: string
}

export default function ShareMenu({ url, title }: ShareMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  
  useClickAway(menuRef, () => setIsOpen(false))

  const shareLinks = [
    {
      name: 'Twitter',
      icon: <Twitter className="h-4 w-4" />,
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`
    },
    {
      name: 'Facebook',
      icon: <Facebook className="h-4 w-4" />,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
    },
    {
      name: 'Copy Link',
      icon: <Copy className="h-4 w-4" />,
      onClick: async () => {
        await navigator.clipboard.writeText(url)
        alert('Link copied to clipboard!')
      }
    }
  ]

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
      >
        <Share2 className="h-4 w-4" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-10">
          {shareLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => {
                if (link.onClick) {
                  e.preventDefault()
                  link.onClick()
                } else {
                  window.open(link.href, '_blank', 'noopener,noreferrer')
                }
                setIsOpen(false)
              }}
              className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
            >
              {link.icon}
              <span className="text-sm">{link.name}</span>
            </a>
          ))}
        </div>
      )}
    </div>
  )
} 