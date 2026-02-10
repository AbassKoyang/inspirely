'use client'
import React, { useMemo } from 'react'
import { useFetchLatestPosts, useSearchCategories, useSearchPosts } from "@/lib/queries"
import Link from 'next/link'
import PostPreview from '../feed/PostPreview'
import { useSearchParams } from 'next/navigation'
import { ChevronDown } from 'lucide-react'
import CategoryLink from '../explore/CategoryLink'

const CategoriesResult = () => {
    const query = useSearchParams().get('q')
    const {data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        isError,
    } = useSearchCategories(query || '')

    const allCatgeories = useMemo(() => {
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
        {allCatgeories && (
            <div className="w-full flex flex-wrap gap-4 mt-6">
                {allCatgeories.map((cat) => (
                    <CategoryLink category={cat} />
                ))}
            </div>
        )}

        {allCatgeories && allCatgeories.length == 0 && (
              <div className="w-full mt-4">
                  <p className='font-sans  text-base text-black mb-2'>Oops! No result for this search.</p>
                  <p className='font-sans  text-sm text-black/60 mb-1'>Make sure all words are spelled correctly.</p>
                  <p className='font-sans  text-sm text-black/60 mb-1'>Try different keywords.</p>
                  <p className='font-sans  text-sm text-black/60 mb-1'>Try more general keywords.</p>
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

export default CategoriesResult