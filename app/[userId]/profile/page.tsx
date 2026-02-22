'use client';
import ProfilePostPreview from '@/components/profile/ProfilePostPreview';
import { ProfilePostPreviewSkeleton } from '@/components/skeletons/ProfilePostPreviewSkeleton';
import { useAuth } from '@/lib/contexts/authContext'
import { useFetchUserPosts } from '@/lib/queries'
import { ChevronDown } from 'lucide-react';
import { useParams } from 'next/navigation';
import React, { useMemo } from 'react'

const ProfilePage = () => {
  const userId = useParams<{userId: string}>().userId
  const {user} = useAuth()
  const {data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
} = useFetchUserPosts(userId || '')

const allPosts = useMemo(() => {
    return data?.pages.flatMap(page => page.results) ;
  }, [data]);  
  
  return (
    <section className='w-full min-h-dvh overflow-x-hidden bg-white'>
      {isLoading && (
        <div className="w-full">
          {Array.from({length: 5}).map((_,i) => (
                <ProfilePostPreviewSkeleton key={i} />
            ))}
        </div>
      )}
        {isError && (
          <div className="w-full h-[60vh] flex items-center justify-center">
            <p className='text-base font-sans text-black/60'>Oops! Failed to load user articles.</p>
          </div>
        )}
        {allPosts && allPosts.map((post) => (
            <ProfilePostPreview post={post} queryKey='user-posts' />
        ))}
        {allPosts && allPosts.length == 0 && (
            <div className="w-full flex items-center justify-center h-[60vh]">
                <p className='font-sans  text-base text-black mb-2'>Oops! No posts yet.</p>
            </div>
        )}

        <div className={`w-full h-[200px] bg-linear-to-t from-white via-white/80 to-white/40 items-end justify-center absolute left-0 bottom-0 z-30 pb-4 ${hasNextPage ? 'flex' : 'hidden'}`}>
            <button disabled={!hasNextPage} onClick={() => fetchNextPage()} className='text-emerald-700 flex items-center gap-2 cursor-pointer disabled:hidden'>
                <p className='text-sm font-sans font-medium'>{isFetchingNextPage ? "Loading more..." : 'Show more'}</p>
                <ChevronDown className='text-emerald-700 size-[20px]'/>
            </button>
        </div>
    </section>
  )
}

export default ProfilePage