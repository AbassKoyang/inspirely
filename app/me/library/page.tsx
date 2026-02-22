'use client'
import React, { useMemo } from 'react'
import { useFetchBookmarks } from "@/lib/queries"
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { ChevronDown } from 'lucide-react'
import PostPreview from '@/components/feed/PostPreview'
import { useAuth } from '@/lib/contexts/authContext'
import { PostPreviewSkeleton } from '@/components/skeletons/PostPreviewSkeleton'

const BookmarksPage = () => {
    const {user} = useAuth()
    const {data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        isError,
    } = useFetchBookmarks(String(user?.id) || '')

    const allBookmarks = useMemo(() => {
        return data?.pages.flatMap(page => page.results) ;
      }, [data]);
      console.log(allBookmarks)
  return (
    <div className='w-full relative'>
        {isLoading && (
            <PostPreviewSkeleton />
        )}
        {isError && (
            <div className="w-full h-[60vh] flex items-center justify-center">
                <p className='text-base font-sans text-black/60'>Oops! Failed to load bookmarks.</p>
            </div>        )}
        {allBookmarks && (
            <div className="w-full flex flex-col gap-4">
                {allBookmarks.map((bm) => (
                    <PostPreview post={bm.post} queryKey='bookmarks' />
                ))}
            </div>
        )}

        {allBookmarks && allBookmarks.length == 0 && (
              <div className="w-full flex items-center justify-center h-[60vh]">
                  <p className='font-sans text-base text-black/60'>Oops! No bookmarks yet.</p>
              </div>
          )}

        <div className={`w-full h-[200px] bg-linear-to-t from-white via-white/80 to-white/40 items-end justify-center absolute left-0 bottom-0 z-30 pb-4 ${hasNextPage ? 'flex' : 'hidden'}`}>
            <button disabled={!hasNextPage} onClick={() => fetchNextPage()} className='text-emerald-700 flex items-center gap-2 cursor-pointer disabled:hidden'>
                <p className='text-sm font-sans font-medium'>{isFetchingNextPage ? "Loading more..." : 'Show more'}</p>
                <ChevronDown className='text-emerald-700 size-[20px]'/>
            </button>
        </div>
    </div>
  )
}

export default BookmarksPage