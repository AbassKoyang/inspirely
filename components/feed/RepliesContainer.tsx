'use client'

import { useFetchReplies } from "@/lib/queries"
import { CommentType } from "@/lib/types"
import ReplyCard from "./ReplyCard"
import { useEffect, useMemo } from "react"
import { LoaderCircle } from "lucide-react"
import { useInView } from "react-intersection-observer"

const RepliesContainer = ({comment}:{comment: CommentType}) => {
    const { ref, inView } = useInView();
    const {data:replies,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        isError,
    } = useFetchReplies(String(comment.id))

    const allReplies = useMemo(() => {
        return replies?.pages.flatMap(page => page.results) ;
      }, [replies]);
    
    useEffect(() => {
    if (inView && hasNextPage) {
        fetchNextPage();
    }
}, [inView, hasNextPage, fetchNextPage]);

  return (
    <div className="w-full px-5 mt-3 border-l-3 border-gray-100/90">
        {isLoading && (
            <p>Loading...</p>
        )}
        {allReplies && allReplies.map((reply) => (
            <ReplyCard comment={reply} />
        ))}
        <div className='w-full flex items-center justify-center py-3' ref={ref}>
            {isFetchingNextPage ? <LoaderCircle className="animate-spin size-[26px] text-emerald-700" /> : null}
        </div>
    </div>
  )
}

export default RepliesContainer