'use client';
import PostPreview from '@/components/feed/PostPreview';
import { useFetchCombinedPosts, useFetchPersonalisedPosts } from '@/lib/queries'
import { LoaderCircle } from 'lucide-react';
import React, { useEffect, useMemo } from 'react'
import { useInView } from 'react-intersection-observer';

const Page = () => {
    const { ref, inView } = useInView();
    const {data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        isError,
    } = useFetchCombinedPosts()

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
        {isLoading && (<p>
            Loading...
        </p>)}
        {isError && (<p>
            error occured...
        </p>)}
        {allPosts && allPosts.map((post) => (
            <PostPreview post={post} />
        ))}
        <div className='w-full flex items-center justify-center py-3' ref={ref}>
            {isFetchingNextPage ? <LoaderCircle className="animate-spin size-[26px] text-emerald-700" /> : null}
        </div>
    </section>
  )
}

export default Page