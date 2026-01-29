'use client'

import { useFetchReplies } from "@/lib/queries"
import { CommentType } from "@/lib/types"
import ReplyCard from "./ReplyCard"

const RepliesContainer = ({comment}:{comment: CommentType}) => {
    const {data:replies, isLoading} = useFetchReplies(String(comment.id))
  return (
    <div className="w-full px-5 mt-3 border-l-3 border-gray-100/90">
        {isLoading && (
            <p>Loading...</p>
        )}
        {replies && replies.results.map((reply) => (
            <ReplyCard comment={reply} />
        ))}
    </div>
  )
}

export default RepliesContainer