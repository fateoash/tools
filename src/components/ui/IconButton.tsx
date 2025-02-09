'use client'

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

export default function IconButton({ children, className = '', ...props }: IconButtonProps) {
  return (
    <button
      className={`p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors ${className}`}
      {...props}
    >
      {children}
    </button>
  )
} 