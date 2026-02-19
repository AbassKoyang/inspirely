import React from 'react'
import { Skeleton } from '../ui/skeleton'

const ResponseSkeleton = () => {
  return (
    <div className='w-full'>
        <Skeleton className='w-[200px] h-[14px]' />
        <Skeleton className='w-[200px] h-[14px] mt-1' />
        <Skeleton className='w-[160px] h-[14px] mt-1' />
        <div className="mt-6 flex items-center gap-20 justify-between lg:justify-start">
            <Skeleton className='w-[100px] h-[10px]' />
            <div className="flex items-center gap-3">
                <Skeleton className='size-[30px] lg:size-[25px]' />
                <Skeleton className='size-[30px] lg:size-[25px]' />
            </div>
        </div>
    </div>
  )
}

export default ResponseSkeleton