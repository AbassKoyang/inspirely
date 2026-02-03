'use client';
import PostPreview from '@/components/feed/PostPreview';
import { useFetchLatestPosts } from '@/lib/queries'
import React from 'react'

const Page = () => {
    const {isLoading, isError, data} = useFetchLatestPosts()
  return (
    <section className='w-full min-h-dvh mt-5'>
        {isLoading && (<p>
            Loading...
        </p>)}
        {isError && (<p>
            error occured...
        </p>)}
        {data && data.results.map((post) => (
            <PostPreview post={post} />
        ))}
    </section>
  )
}

export default Page