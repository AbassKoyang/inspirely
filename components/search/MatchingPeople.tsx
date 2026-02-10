import Link from 'next/link'
import React, { useMemo } from 'react'
import SideBarUserInfo from '../feed/SidebarUserInfo'
import { useSearchParams } from 'next/navigation'
import { useSearchUsers } from '@/lib/queries'

const MatchingPeople = () => {
    const query = useSearchParams().get('q')
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        isError,
    } = useSearchUsers(query || '')

    const allPeople = useMemo(() => {
        return data?.pages.flatMap(page => page.results) ;
      }, [data]);
    return (
      <div className='w-full pt-10 border-t border-gray-100'>
          <h5 className="font-sans font-semibold text-base tracking-tighter text-black/90 mb-6">People matching {query}</h5>
          {isLoading && (<p>
              Loading...
          </p>)}
          {isError && (<p>
              error occured...
          </p>)}
          {allPeople && (
              <div className="w-full flex flex-wrap gap-5 mb-4">
                  {allPeople.map((user) => (
                    <SideBarUserInfo user={user} />
                  ))}
              </div>
          )}

          {allPeople && allPeople.length == 0 && (
              <div className="w-full mb-4">
                  <p className='font-sans  text-base text-black mb-2'>Oops! No result for this search.</p>
                  <p className='font-sans  text-sm text-black/60 mb-1'>Make sure all words are spelled correctly.</p>
                  <p className='font-sans  text-sm text-black/60 mb-1'>Try different keywords.</p>
                  <p className='font-sans  text-sm text-black/60 mb-1'>Try more general keywords.</p>
              </div>
          )}
          {allPeople && (
            <Link href="#" className='text-xs text-black/60 font-normal font-sans hover:underline'>See all</Link>
        )}
      </div>
    )
}

export default MatchingPeople