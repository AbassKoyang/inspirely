'use client';
import PostPreview from '@/components/feed/PostPreview';
import {useFetchPersonalisedPosts } from '@/lib/queries'
import { LoaderCircle } from 'lucide-react';
import React, { useEffect, useMemo } from 'react'
import { useInView } from 'react-intersection-observer';
import { PostPreviewSkeleton } from '@/components/skeletons/PostPreviewSkeleton';

const Page = () => {
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
    <section className='w-full min-h-dvh mt-5'>
        {isLoading && (
            <div className="w-full">
                {Array.from({ length: 3 }).map((_, i) => (
                    <PostPreviewSkeleton key={i} />
                ))}
            </div>
        )}
        {isError && (
            <div className="w-full flex items-center justify-center py-10">
                <p className='font-sans text-base text-red-600'>An error occurred while loading posts.</p>
            </div>
        )}
        {allPosts && allPosts.map((post) => (
            <PostPreview key={post.id} post={post} queryKey='personalised-posts' />
        ))}
        <div className='w-full flex items-center justify-center py-3' ref={ref}>
            {isFetchingNextPage ? <LoaderCircle className="animate-spin size-[26px] text-emerald-700" /> : null}
        </div>
    </section>
  )
}

export default Page