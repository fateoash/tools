'use client'

import { useEffect, useCallback, useState } from 'react'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, RotateCw } from 'lucide-react'
import { usePreventScroll } from '@/hooks/usePreventScroll'

interface ImageModalProps {
  images: string[]
  currentIndex: number
  onClose: () => void
  onIndexChange: (index: number) => void
}

export default function ImageModal({
  images,
  currentIndex,
  onClose,
  onIndexChange,
}: ImageModalProps) {
  usePreventScroll()

  const [scale, setScale] = useState(1)
  const [rotation, setRotation] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })

  const handlePrev = () => {
    onIndexChange(currentIndex === 0 ? images.length - 1 : currentIndex - 1)
    resetImageState()
  }

  const handleNext = () => {
    onIndexChange(currentIndex === images.length - 1 ? 0 : currentIndex + 1)
    resetImageState()
  }

  const resetImageState = () => {
    setScale(1)
    setRotation(0)
    setPosition({ x: 0, y: 0 })
  }

  const handleZoomIn = () => {
    setScale(prev => Math.min(prev + 0.25, 4))
  }

  const handleZoomOut = () => {
    setScale(prev => Math.max(prev - 0.25, 0.5))
  }

  const handleRotate = () => {
    setRotation(prev => (prev + 90) % 360)
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale > 1) {
      setIsDragging(true)
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y
      })
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault()
    const delta = -Math.sign(e.deltaY) * 0.1
    setScale(prev => Math.min(Math.max(prev + delta, 0.5), 4))
  }

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose()
    if (e.key === 'ArrowLeft') handlePrev()
    if (e.key === 'ArrowRight') handleNext()
    if (e.key === '+') handleZoomIn()
    if (e.key === '-') handleZoomOut()
    if (e.key === 'r') handleRotate()
  }, [currentIndex])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      <div className="relative w-full h-full">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 text-white hover:text-gray-300"
        >
          <X className="h-8 w-8" />
        </button>

        {/* Control buttons */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2">
          <button
            onClick={handleZoomOut}
            className="p-2 bg-black/50 rounded-full text-white hover:bg-black/70"
            title="Zoom Out (- key)"
          >
            <ZoomOut className="h-5 w-5" />
          </button>
          <button
            onClick={handleZoomIn}
            className="p-2 bg-black/50 rounded-full text-white hover:bg-black/70"
            title="Zoom In (+ key)"
          >
            <ZoomIn className="h-5 w-5" />
          </button>
          <button
            onClick={handleRotate}
            className="p-2 bg-black/50 rounded-full text-white hover:bg-black/70"
            title="Rotate (R key)"
          >
            <RotateCw className="h-5 w-5" />
          </button>
        </div>

        {/* Main image */}
        <div 
          className="relative w-full h-full flex items-center justify-center cursor-move"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onWheel={handleWheel}
        >
          <div
            style={{
              transform: `translate(${position.x}px, ${position.y}px) scale(${scale}) rotate(${rotation}deg)`,
              transition: isDragging ? 'none' : 'transform 0.3s ease-out'
            }}
          >
            <Image
              src={images[currentIndex]}
              alt={`Image ${currentIndex + 1}`}
              width={1200}
              height={800}
              className="max-w-none object-contain"
              draggable={false}
            />
          </div>
        </div>

        {/* Navigation buttons */}
        <button
          onClick={handlePrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 rounded-full text-white hover:bg-black/70"
        >
          <ChevronLeft className="h-8 w-8" />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 rounded-full text-white hover:bg-black/70"
        >
          <ChevronRight className="h-8 w-8" />
        </button>

        {/* Image counter and zoom info */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/50 rounded text-white flex items-center gap-4">
          <span>{currentIndex + 1} / {images.length}</span>
          <span>|</span>
          <span>{Math.round(scale * 100)}%</span>
        </div>
      </div>
    </div>
  )
} 