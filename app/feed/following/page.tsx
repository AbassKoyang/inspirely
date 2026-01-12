'use client';
import { useFetchPersonalisedPosts } from '@/lib/queries'
import React from 'react'

const Page = () => {
    const {isLoading, isError, data} = useFetchPersonalisedPosts()
  return (
    <section className='w-full bg-white h-dvh'>
        {isLoading && (<p>
            Loading...
        </p>)}
        {isError && (<p>
            error occured...
        </p>)}
        {data && (
            <p>{JSON.stringify(data.results, null, 2)}</p>
        )}
    </section>
  )
}

export default Page