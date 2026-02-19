import Link from 'next/link'
import React, { useMemo } from 'react'
import SideBarUserInfo from '../feed/SidebarUserInfo'
import { useSearchParams } from 'next/navigation'
import { useSearchPosts, useSearchUsers } from '@/lib/queries'
import StaffPickPostPreview from '../feed/StaffPickPostPreview'
import { Skeleton } from '@/components/ui/skeleton'
import { StaffPicksPostPreviewSkeleton } from '../skeletons/StaffPicksPostPreviewSkeleton'

const MatchingPosts = () => {
    const query = useSearchParams().get('q')
    const {
        data,
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
      <div className='w-full pt-10 border-t border-gray-100'>
          <h5 className="font-sans font-semibold text-base tracking-tighter text-black/90 mb-6">Posts matching {query}</h5>
          {isLoading && (
            <StaffPicksPostPreviewSkeleton />
            )}
        {isError && (
            <div className="w-full h-[300px] flex items-center justify-center">
                <p className='text-xs font-sans text-black/60'>Oops! Failed to load articles.</p>
            </div>
        )}
          {isError && (
              <div className="w-full flex items-center justify-center py-10">
                  <p className='font-sans text-base text-red-600'>An error occurred while loading posts.</p>
              </div>
          )}
          {allPosts && (
              <div className="w-full flex flex-wrap gap-5 mb-4">
                  {allPosts.map((post) => (
                    <StaffPickPostPreview key={post.id} post={post} />
                  ))}
              </div>
          )}

          {allPosts && allPosts.length == 0 && (
              <div className="w-full mb-4">
                  <p className='font-sans  text-base text-black mb-2'>Oops! No result for this search.</p>
                  <p className='font-sans  text-sm text-black/60 mb-1'>Make sure all words are spelled correctly.</p>
                  <p className='font-sans  text-sm text-black/60 mb-1'>Try different keywords.</p>
                  <p className='font-sans  text-sm text-black/60 mb-1'>Try more general keywords.</p>
              </div>
          )}
          {allPosts && (
            <Link href="#" className='text-xs text-black/60 font-normal font-sans hover:underline'>See all</Link>
        )}
      </div>
    )
}

export default MatchingPosts