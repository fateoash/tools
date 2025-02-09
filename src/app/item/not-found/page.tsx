import { Suspense } from 'react'
import { NotFoundContent } from './not-found-content'

export default function NotFoundPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NotFoundContent />
    </Suspense>
  )
} 