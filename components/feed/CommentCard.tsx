import { CommentType } from '@/lib/types'
import React from 'react'

const CommentCard = ({comment}:{comment: CommentType}) => {
  return (
    <div>{comment.content}</div>
  )
}

export default CommentCard