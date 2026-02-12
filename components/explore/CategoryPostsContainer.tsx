'use client'
import React, { useMemo } from 'react'
import { useFetchBookmarks, useFetchCategoryPosts } from "@/lib/queries"
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { ChevronDown } from 'lucide-react'
import { useAuth } from '@/lib/contexts/authContext'
import { CategoryType } from '@/lib/types'
import PostPreview from './PostPreview'

const CategoryPostsContainer = ({category}:{category: CategoryType}) => {
    const {data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        isError,
    } = useFetchCategoryPosts(String(category.slug) || '')

    const allPosts = useMemo(() => {
        return data?.pages.flatMap(page => page.results) ;
      }, [data]);
  return (
    <div className="w-full border-y border-gray-100 py-10 mt-20 relative">
        <h3 className='text-xl lg:text-2xl font-semibold font-sans mb-5 lg:mb-0'>Recommended Articles</h3>
        {isLoading && (<p>
            Loading...
        </p>)}
        {isError && (<p>
            error occured...
        </p>)}
        {allPosts && (
            <div className="w-full flex flex-wrap lg:gap-4">
                {allPosts.map((post) => (
                    <PostPreview post={post} />
                ))}
            </div>
        )}

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
    </div>
  )
}

export default CategoryPostsContainer