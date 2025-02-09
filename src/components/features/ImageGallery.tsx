'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface ImageGalleryProps {
  images: string[]
  onImageClick: (index: number) => void
}

export default function ImageGallery({ images, onImageClick }: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  return (
    <div className="relative group">
      <div 
        className="relative h-[280px] w-full cursor-pointer"
        onClick={() => onImageClick(currentIndex)}
      >
        <Image
          src={images[currentIndex]}
          alt={`Product image ${currentIndex + 1}`}
          fill
          className="object-cover rounded-lg"
        />
        
        {/* Navigation buttons */}
        <button
          className="absolute left-2 top-1/2 -translate-y-1/2 p-1 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={handlePrev}
        >
          <ChevronLeft className="h-6 w-6 text-white" />
        </button>
        <button
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={handleNext}
        >
          <ChevronRight className="h-6 w-6 text-white" />
        </button>

        {/* Image counter */}
        <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/50 rounded text-white text-sm">
          {currentIndex + 1} / {images.length}
        </div>
      </div>
    </div>
  )
} 