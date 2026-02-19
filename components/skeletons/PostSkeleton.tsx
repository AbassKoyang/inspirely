import React from 'react'
import { Skeleton } from '../ui/skeleton'

const PostSkeleton = () => {
  return (
    <div className='w-full'>
        <Skeleton className='w-full h-[40px]' />
        <Skeleton className='w-full h-[20px] mt-3' />
        <Skeleton className='w-[70%] h-[20px] mt-1.5' />

        <div className="w-full flex flex-col-reverse lg:flex-row lg:items-center gap-2 lg:gap-5 mt-5">
            <div className="flex items-center gap-5">
                <Skeleton className='size-[40px] rounded-full' />
                <Skeleton className='w-[120px] h-[15px]' />
            </div>
            <div className="flex items-center gap-3">
                <Skeleton className='w-[70px] h-[12px]' />
                <div className="size-[3px] bg-black/60 rounded-full"></div>
                <Skeleton className='w-[70px] h-[12px]' />
            </div>
        </div>

        <div className="w-full flex items-center justify-between mt-5 py-3 border-y border-y-gray-100">
            <div className="flex gap-5 items-center">
                <Skeleton className='w-[80px] lg:w-[35px] h-[35px] lg:h-[30px] rounded-4xl lg:rounded-sm' />
                <Skeleton className='w-[80px] lg:w-[35px] h-[35px] lg:h-[30px] rounded-4xl lg:rounded-sm' />
                <Skeleton className='w-[80px] lg:w-[35px] h-[35px] lg:h-[30px] rounded-4xl lg:rounded-sm' />
            </div>
            <div className="hidden gap-5 items-center lg:flex">
                <Skeleton className='w-[35px] h-[30px]' />
                <Skeleton className='w-[35px] h-[30px]' />
                <Skeleton className='w-[35px] h-[30px]' />
            </div>
        </div>

        <div className="mt-10">
            <Skeleton className='w-full h-[20px]' />
            <Skeleton className='w-full h-[20px] mt-1.5' />
            <Skeleton className='w-[60%] h-[20px] mt-1.5' />
            <Skeleton className='w-full h-[20px] mt-1.5' />
            <Skeleton className='w-full h-[20px] mt-1.5' />
            <Skeleton className='w-[60%] h-[20px] mt-1.5' />
            <Skeleton className='w-full h-[20px] mt-1.5' />
            <Skeleton className='w-full h-[20px] mt-1.5' />
            <Skeleton className='w-[60%] h-[20px] mt-1.5' />
        </div>

        <div className="w-full flex items-center justify-between mt-5 py-3 border-y border-y-gray-100">
            <div className="flex gap-5 items-center">
                <Skeleton className='w-[80px] lg:w-[35px] h-[35px] lg:h-[30px] rounded-4xl lg:rounded-sm' />
                <Skeleton className='w-[80px] lg:w-[35px] h-[35px] lg:h-[30px] rounded-4xl lg:rounded-sm' />
                <Skeleton className='w-[80px] lg:w-[35px] h-[35px] lg:h-[30px] rounded-4xl lg:rounded-sm' />
            </div>
            <div className="hidden gap-5 items-center lg:flex">
                <Skeleton className='w-[35px] h-[30px]' />
                <Skeleton className='w-[35px] h-[30px]' />
                <Skeleton className='w-[35px] h-[30px]' />
            </div>
        </div>
    </div>
  )
}

export default PostSkeleton