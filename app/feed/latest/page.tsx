'use client';
import { useFetchLatestPosts } from '@/lib/queries'
import React from 'react'

const Page = () => {
    const {isLoading, isError, data} = useFetchLatestPosts()
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