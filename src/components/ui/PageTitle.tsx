'use client'

interface PageTitleProps {
  children: React.ReactNode
  className?: string
}

export default function PageTitle({ children, className = '' }: PageTitleProps) {
  return (
    <h1 className={`text-2xl font-medium mb-8 ${className}`}>
      {children}
    </h1>
  )
} 