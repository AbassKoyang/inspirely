import React from 'react'
import { useFetchLatestPosts } from "@/lib/queries"
import PostPreview from "./PostPreview"
import StaffPickPostPreview from "./StaffPickPostPreview"
import Link from 'next/link'

const StaffPicks = () => {
    const {isLoading, isError, data} = useFetchLatestPosts()

  return (
    <div className='w-full'>
        <h5 className="font-sans font-bold text-base text-black/90 mb-5">Staff Picks</h5>
        {isLoading && (<p>
            Loading...
        </p>)}
        {isError && (<p>
            error occured...
        </p>)}
        {data && (
            <div className="w-full flex flex-col gap-4">
                {data.results.slice(0,3).map((post) => (
                    <StaffPickPostPreview post={post} />
                ))}
             <Link href="#" className='text-xs text-black/60 font-normal font-sans hover:underline mt-1'>See the full list</Link>
            </div>
        )}
    </div>
  )
}

export default StaffPicks