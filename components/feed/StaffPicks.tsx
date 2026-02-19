import React, { useMemo, useEffect } from 'react'
import { useFetchLatestPosts, useFetchPersonalisedPosts } from "@/lib/queries"
import PostPreview from "./PostPreview"
import StaffPickPostPreview from "./StaffPickPostPreview"
import Link from 'next/link'
import { useInView } from 'react-intersection-observer'
import { Skeleton } from '../ui/skeleton'
import { StaffPicksPostPreviewSkeleton } from '../skeletons/StaffPicksPostPreviewSkeleton'

const StaffPicks = () => {
    const { ref, inView } = useInView();
    const {data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        isError,
    } = useFetchPersonalisedPosts()

    useEffect(() => {
        if (inView && hasNextPage) {
          fetchNextPage();
        }
    }, [inView, hasNextPage, fetchNextPage]);

    const allPosts = useMemo(() => {
        return data?.pages.flatMap(page => page.results) ;
      }, [data]);
      
  return (
    <div className='w-full'>
        <h5 className="font-sans font-bold text-base text-black/90 mb-5">Staff Picks</h5>
        {isLoading && (
            <StaffPicksPostPreviewSkeleton />
        )}
        {isError && (
            <div className="w-full h-[300px] flex items-center justify-center">
                <p className='text-xs font-sans text-black/60'>Oops! Failed to load articles.</p>
            </div>
        )}
        {allPosts && (
            <div className="w-full flex flex-col gap-4">
                {allPosts.slice(0,3).map((post) => (
                    <StaffPickPostPreview post={post} />
                ))}
             <Link href="#" className='text-xs text-black/60 font-normal font-sans hover:underline mt-1'>See the full list</Link>
            </div>
        )}
    </div>
  )
}

export default StaffPicks