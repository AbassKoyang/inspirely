'use client'
import { useFetchCategories, useSearchCategories, useSearchPosts } from '@/lib/queries'
import Link from 'next/link'
import React, { useMemo } from 'react'
import { Button } from '../ui/button'
import { useSearchParams } from 'next/navigation'

const MatchingCategories = () => {
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
    <div className='w-full mt-10'>
        <h5 className="font-sans font-bold text-base text-black/90 mb-5">Topics matching javascript
        </h5>
        {isLoading && (<p>
            Loading...
        </p>)}
        {isError && (<p>
            error occured...
        </p>)}
        {allCatgeories && (
            <div className="w-full flex flex-wrap gap-3">
                {allCatgeories.map((cat) => (
                    <Link href='#' className='text-base text-black/80 font-normal font-sans bg-gray-100/90 rounded-4xl px-5 py-1.5'>{cat.name}</Link>
                ))}
            </div>
        )}
        {allCatgeories && (
            <Link href="#" className='text-xs text-black/60 font-normal font-sans hover:underline mt-3'>See more categories</Link>
        )}
    </div>
  )
}

export default MatchingCategories