import { CommentType } from '@/lib/types'
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
  } from "@/components/ui/hover-card"
import ProfilePopup from '@/components/feed/ProfilePopup';
import Link from 'next/link';
import Image from 'next/image';
import defaultAvatar from '@/public/assets/images/default-avatar.png'
import { useEffect, useState } from 'react';
import { truncateText } from '@/lib/utils';
import { Ellipsis, MessageCircle } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createComment, likeComment } from '@/lib/api';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import {motion} from 'motion/react'
import RepliesContainer from './RepliesContainer';
import { useCreatComment, useLikeComment } from '@/lib/mutations';


const CommentCard = ({comment}:{comment: CommentType}) => {
    const {mutate: createComment, isPending}  = useCreatComment()
    const {mutate: likeComment}  = useLikeComment()
    const [formattedDate, setFormattedDate] = useState('')
    const [showReplies, setShowReplies] = useState(false)
    const [showReplyInput, setShowReplyInput] = useState(false)
    const [replyContent, setreplyContent] = useState('')
    const [isTextAreaOpen, setIsTextAreaOpen] = useState(false)
    const name = truncateText(`${comment.user.first_name} ${comment.user.last_name}`, 20)

    useEffect(() => {
        if(!comment?.created_at) return
        const date = new Date(comment?.created_at || '')
        const month = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric"}).format(date);
        setFormattedDate(month);
        console.log(comment)
    }, [comment])

    const handleLikeComment = (commentId: string) => {
        likeComment(commentId)
    }

    const handleCreateComment = (data: {postId: string; comment: {content: string; parent_id?: number}}) => {
    createComment(data, {
        onSuccess: () => {
            setreplyContent('')
            setShowReplyInput(false)
            toast.error("Reply sent")
        }
    })
    }


  return (
    <div className='w-full mb-3 border-b last:border-0 border-gray-100 py-6 first:pt-0'>
        <div className="w-full flex items-center justify-between">
            <div className="flex gap-3">
                <HoverCard openDelay={700} closeDelay={100}>
                    <HoverCardTrigger asChild>
                        <Link href='#'>
                            <div className='size-[35px] rounded-full overflow-hidden cursor-pointer relative z-10'>
                                <Image
                                className='object-cover z-10'
                                fill
                                sizes="(max-width: 768px) 100px, 100px"
                                src={comment?.user.profile_pic_url || defaultAvatar}
                                loading='eager'
                                placeholder='blur'
                                blurDataURL='/assets/images/default-avatar.png'
                                alt='Profle Picture'
                                />
                            </div>
                        </Link>
                    </HoverCardTrigger>
                    <HoverCardContent side='left' className="w-[290px] bg-white p-6 z-400">
                        <ProfilePopup userId={String(comment.user.id)}  />                             
                    </HoverCardContent>
                </HoverCard>
                <div className="">
                    <h6 className='font-sans text-sm text-black'>{comment.user.first_name} {name}</h6>
                    <p className='text-xs font-sans text-black/60'>{formattedDate}</p>
                </div>
            </div>

            <HoverCard openDelay={700} closeDelay={100}>
                <HoverCardTrigger asChild>
                    <button className='group cursor-pointer disabled:cursor-not-allowed rounded-4xl'>
                        <Ellipsis className="size-[18px] text-black/60 group-hover:text-black transition-all duration-200 ease-in-out" />
                    </button>
                </HoverCardTrigger>
                <HoverCardContent side='top' className="w-fit flex items-center justify-center p-0 z-400">
                    <div className=" bg-black/95 relative p-2 flex items-center justify-center rounded-sm">
                        <p className='text-sm font-sans text-white font-normal'>More</p>
                        <div className="size-5 bg-black/95 [clip-path:polygon(0_0,100%_0,50%_100%)] absolute left-[50%] translate-x-[-50%] bottom-[-7px]"></div>
                    </div>
                </HoverCardContent>
            </HoverCard>
        </div>
        <div className="w-full my-4">
            <p className='text-sm font-sans text-black/70 font-normal'>
                {comment.content}
            </p>
        </div>
        <div className="w-full flex items-center gap-5">
            <HoverCard openDelay={700} closeDelay={100}>
                <HoverCardTrigger asChild>
                <button onClick={() => likeComment(String(comment.id))} className="flex items-center gap-2 cursor-pointer group">
                    <svg width="12" height="16" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path className={`${comment.is_liked ? 'fill-[#4CAF50]' : 'fill-black/60'} group-hover:fill-[#4CAF50] transition-all duration-200 ease-in-out`} d="M5.83333 15.8975C5.41236 15.8975 5.04938 15.7517 4.74438 15.46C4.43938 15.1683 4.27354 14.812 4.24688 14.391H7.41979C7.39313 14.812 7.22729 15.1683 6.92229 15.46C6.61729 15.7517 6.25431 15.8975 5.83333 15.8975ZM3.33333 13.2371C3.15597 13.2371 3.0075 13.1773 2.88792 13.0577C2.76819 12.938 2.70833 12.7894 2.70833 12.6121C2.70833 12.4347 2.76819 12.2863 2.88792 12.1667C3.0075 12.0469 3.15597 11.9871 3.33333 11.9871H8.33333C8.5107 11.9871 8.65917 12.0469 8.77875 12.1667C8.89847 12.2863 8.95833 12.4347 8.95833 12.6121C8.95833 12.7894 8.89847 12.938 8.77875 13.0577C8.65917 13.1773 8.5107 13.2371 8.33333 13.2371H3.33333ZM2.83646 10.8333C1.96368 10.2906 1.27278 9.58139 0.76375 8.70584C0.254583 7.83042 0 6.87292 0 5.83333C0 4.20945 0.56625 2.83125 1.69875 1.69875C2.83125 0.56625 4.20944 0 5.83333 0C7.45722 0 8.83542 0.56625 9.96792 1.69875C11.1004 2.83125 11.6667 4.20945 11.6667 5.83333C11.6667 6.87292 11.4121 7.83042 10.9029 8.70584C10.3939 9.58139 9.70299 10.2906 8.83021 10.8333H2.83646Z" fill=""/>
                    </svg>
                    <span className='text-sm font-normal font-sans text-black/60'>{comment.reaction_count}</span>
                </button>
                </HoverCardTrigger>
                <HoverCardContent side='top' className="w-fit flex items-center justify-center p-0">
                    <div className=" bg-black/95 relative p-2 flex items-center justify-center rounded-sm">
                        <p className='text-sm font-sans text-white font-normal'>Like</p>
                        <div className="size-5 bg-black/95 [clip-path:polygon(0_0,100%_0,50%_100%)] absolute left-[50%] translate-x-[-50%] bottom-[-7px]"></div>
                    </div>
                </HoverCardContent>
            </HoverCard>

            {comment.reply_count > 0 && (
                 <HoverCard openDelay={700} closeDelay={100}>
                    <HoverCardTrigger asChild>
                        <button onClick={() => setShowReplies(true)} className="flex items-center gap-2 cursor-pointer group">
                            <MessageCircle className="size-[18px] text-black/60 group-hover:text-black transition-all duration-200 ease-in-out" />
                            <span className='text-sm font-normal font-sans text-black/60'>{comment.reply_count}</span>
                        </button>
                    </HoverCardTrigger>
                    <HoverCardContent side='top' className="w-fit flex items-center justify-center p-0">
                        <div className=" bg-black/95 relative p-2 flex items-center justify-center rounded-sm">
                            <p className='text-sm font-sans text-white font-normal'>Comment</p>
                            <div className="size-5 bg-black/95 [clip-path:polygon(0_0,100%_0,50%_100%)] absolute left-[50%] translate-x-[-50%] bottom-[-7px]"></div>
                        </div>
                    </HoverCardContent>
                </HoverCard>
            )}

            <Button onClick={() => setShowReplyInput(true)} variant='link' className='text-sm font-sans text-black/90 font-normal cursor-pointer p-0'>Reply</Button>
        </div>
        {showReplyInput && (
            <div className="w-full px-5 mt-3 border-l-3 border-gray-100/90">
                <div className="w-full p-4 rounded-sm bg-gray-100/90">
                    <motion.textarea initial={{height:20}} animate={{height: isTextAreaOpen ? '200px' : 20, animationDuration: 1.5, transition: {type: 'tween'}}} onFocus={() => setIsTextAreaOpen(true)} onChange={(e) => setreplyContent(e.target.value)} className={`w-full min-h-[20px] md:min-h-[20px] max-h-fit text-sm font-medium outline-0 stroke-0 border-0 placeholder:text-black/65`} placeholder='What are your thoughts?'></motion.textarea>
                    <div className={`w-full ${isTextAreaOpen ? 'flex' : 'hidden'} items-center gap-2 justify-end mt-3`}>
                        <Button onClick={() => setShowReplyInput(false)} variant='secondary' className='cursor-pointer'>Cancel</Button>
                        <Button onClick={() => handleCreateComment({postId: String(comment.post.id), comment:{content: replyContent, parent_id: comment.id}})} variant='default' className='rounded-4xl cursor-pointer text-xs px-3 py-1'>Respond</Button>
                    </div>
                </div>
            </div>
        )}
        {showReplies && (
            <RepliesContainer comment={comment} />
        )}
    </div>
  )
}

export default CommentCard