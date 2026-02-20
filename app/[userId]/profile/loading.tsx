import { LoaderCircle } from 'lucide-react'
import React from 'react'

const loading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
        <div className="animate-bounce animate-pulse h-8 w-8 rounded-full bg-emerald-700"></div>
        </div>
      </div>
  )
}

export default loading