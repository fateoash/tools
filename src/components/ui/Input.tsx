'use client'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode
  error?: string
}

export default function Input({ icon, error, className = '', ...props }: InputProps) {
  return (
    <div className="relative">
      <input
        className={`
          w-full h-10 rounded-lg pl-4 pr-10 text-sm
          border bg-gray-50 dark:bg-gray-900 
          transition-all duration-200
          ${error 
            ? 'border-red-500 focus:ring-red-500 dark:border-red-500 dark:focus:ring-red-500' 
            : 'border-gray-200 dark:border-gray-700 focus:ring-orange-500/20 focus:border-orange-500 dark:focus:ring-orange-500/20 dark:focus:border-orange-500'
          }
          focus:outline-none focus:ring-4
          ${className}
        `}
        {...props}
      />
      {icon && (
        <div className="absolute right-3 top-2.5 text-gray-400">
          {icon}
        </div>
      )}
    </div>
  )
} 