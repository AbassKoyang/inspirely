import { useFetchCategories } from '@/lib/queries'
import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'

const RecommendedTopics = () => {
    const {data:categories, isLoading, isError} = useFetchCategories()
  return (
    <div className='w-full mt-10'>
        <h5 className="font-sans font-bold text-base text-black/90 mb-5">Recommended Topics</h5>
        {isLoading && (<p>
            Loading...
        </p>)}
        {isError && (<p>
            error occured...
        </p>)}
        {categories && (
            <div className="w-full flex flex-wrap gap-3">
                {categories.map((cat) => (
                    <Link href='#' className='text-base text-black/80 font-normal font-sans bg-gray-100/90 rounded-4xl px-5 py-1.5'>{cat.name}</Link>
                ))}
             <Link href="#" className='text-xs text-black/60 font-normal font-sans hover:underline mt-2'>See more topics</Link>
            </div>
        )}
    </div>
  )
}

export default RecommendedTopics