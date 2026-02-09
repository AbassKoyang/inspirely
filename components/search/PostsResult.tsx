'use client'
import React, { useMemo } from 'react'
import { useFetchLatestPosts, useSearchPosts } from "@/lib/queries"
import Link from 'next/link'
import PostPreview from '../feed/PostPreview'
import { useSearchParams } from 'next/navigation'
import { ChevronDown } from 'lucide-react'

const PostsResult = () => {
    const query = useSearchParams().get('q')
    const {data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        isError,
    } = useSearchPosts(query || '')

    const allPosts = useMemo(() => {
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
        {allPosts && (
            <div className="w-full flex flex-col gap-4">
                {allPosts.map((post) => (
                    <PostPreview post={post} />
                ))}
            </div>
        )}

        <div className="w-full h-[200px] bg-linear-to-t from-white via-white/80 to-white/40 flex items-end justify-center absolute left-0 bottom-0 z-30 pb-4">
            <button disabled={!hasNextPage} onClick={() => fetchNextPage()} className='text-emerald-700 flex items-center gap-2 cursor-pointer disabled:hidden'>
                <p className='text-sm font-sans font-medium'>{isFetchingNextPage ? "Loading more..." : 'Show more'}</p>
                <ChevronDown className='text-emerald-700 size-[20px]'/>
            </button>
        </div>
    </div>
  )
}

export default PostsResult