import { LoaderCircle } from 'lucide-react'
import React from 'react'

const loading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
        <div className="animate-bounce h-8 w-8 rounded-full bg-emerald-600"></div>
        <p className="text-gray-600">Loading...</p>
        </div>
      </div>
  )
}

export default loading