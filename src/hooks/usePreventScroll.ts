import { useEffect } from 'react'

export function usePreventScroll() {
  useEffect(() => {
    // 保存原始的 overflow 值
    const originalStyle = window.getComputedStyle(document.body).overflow
    // 禁用滚动
    document.body.style.overflow = 'hidden'
    
    // 清理函数
    return () => {
      document.body.style.overflow = originalStyle
    }
  }, [])
} 