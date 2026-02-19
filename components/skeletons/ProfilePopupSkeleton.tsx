import React from 'react'
import { Skeleton } from '../ui/skeleton'

const ProfilePopupSkeleton = () => {
  return (
    <div className='w-full'>
        <Skeleton className='size-[65px] rounded-full' />
        <Skeleton className='mt-2 h-[10px] w-[100px]' />
        <Skeleton className='mt-4 w-full h-[14px]' />
        <Skeleton className='mt-1 w-full h-[14px]' />
        <Skeleton className='mt-1 w-[50%] h-[14px]' />
    </div>
  )
}

export default ProfilePopupSkeleton