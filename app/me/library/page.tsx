'use client'
import React, { useMemo } from 'react'
import { useFetchBookmarks } from "@/lib/queries"
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { ChevronDown } from 'lucide-react'
import PostPreview from '@/components/feed/PostPreview'
import { useAuth } from '@/lib/contexts/authContext'

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
  return (
    <div className='w-full relative'>
        {isLoading && (<p>
            Loading...
        </p>)}
        {isError && (<p>
            error occured...
        </p>)}
        {allBookmarks && (
            <div className="w-full flex flex-col gap-4">
                {allBookmarks.map((bm) => (
                    <PostPreview post={bm.post} />
                ))}
            </div>
        )}

        {allBookmarks && allBookmarks.length == 0 && (
              <div className="w-full flex items-center justify-center h-[60vh]">
                  <p className='font-sans  text-base text-black mb-2'>Oops! No bookmarks yet.</p>
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