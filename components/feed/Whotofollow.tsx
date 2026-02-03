import { useFetchUsers } from '@/lib/queries'
import Link from 'next/link'
import React from 'react'
import UserInfo from './UserInfo'
import SideBarUserInfo from './SidebarUserInfo'

const Whotofollow = () => {
    const {data, isLoading, isError} = useFetchUsers()
    return (
      <div className='w-full mt-10'>
          <h5 className="font-sans font-bold text-base text-black/90 mb-5">Who to follow</h5>
          {isLoading && (<p>
              Loading...
          </p>)}
          {isError && (<p>
              error occured...
          </p>)}
          {data && (
              <div className="w-full flex flex-wrap gap-5">
                  {data.results.slice(1,4).map((user) => (
                    <SideBarUserInfo user={user} />
                  ))}
               <Link href="#" className='text-xs text-black/60 font-normal font-sans hover:underline'>See more suggestions</Link>
              </div>
          )}
      </div>
    )
}

export default Whotofollow