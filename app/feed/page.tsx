'use client';
import Nav from '@/components/feed/Nav';
import { useFetchCombinedPosts } from '@/lib/queries'
import React from 'react'

const Page = () => {
    const {isLoading, isError, data} = useFetchCombinedPosts()
  return (
    <section className='w-full min-h-dvh mt-5 bg-pink-300'>
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