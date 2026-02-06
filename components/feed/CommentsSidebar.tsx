'use client'
import React, { useEffect, useMemo, useState } from 'react'
import {motion} from 'motion/react'
import { Check, ChevronDown, LoaderCircle, X } from 'lucide-react';
import { PostType } from '@/lib/schemas/post';
import { useFetchComments } from '@/lib/queries';
import Image from 'next/image';
import { useAuth } from '@/lib/contexts/authContext';
import defaultAvatar from '@/public/assets/images/default-avatar.png'
import Link from 'next/link';
import { Button } from '../ui/button';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import CommentCard from './CommentCard';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { createComment } from '@/lib/api';
import { useCreatComment } from '@/lib/mutations';
import { useInView } from 'react-intersection-observer';

  const orderTypes = [
    {
        name: 'Most Relevant',
        value: 'relevant'
    },
    {
        name: 'Most Recent',
        value: 'recent'
    }
  ]

  type orderType = {
    name: string;
    value: string;
  }




const CommentsSidebar = ({isOpen, closeSidebar, post} : {isOpen: boolean; closeSidebar: () => void; post: PostType}) => {
    const { ref, inView } = useInView();
    const {mutate: createComment, isPending}  = useCreatComment(String(post.id))
    const {data: comments,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        isError,
    } = useFetchComments(String(post.id))
    const queryClient = useQueryClient();
    const {user} = useAuth();
    const [orderType, setOrderType] = useState<orderType>({
        name: 'Most Relevant',
        value: 'relevant'
    });
    const [isSelectOpen, setIsSelectOpen] = useState(false)
    const [commentContent, setCommentContent] = useState('')
    const [isTextAreaOpen, setIsTextAreaOpen] = useState(false)

    useEffect(() => {
        if (inView && hasNextPage) {
          fetchNextPage();
        }
    }, [inView, hasNextPage, fetchNextPage]);

    const allComments = useMemo(() => {
        return comments?.pages.flatMap(page => page.results) ;
      }, [comments]);


    const handleCreateComment = (data: {postId: string; comment: {content: string; parent_id?: number}}) => {
        createComment(data, {
            onSuccess: async (createdComment) => {
                queryClient.setQueryData(['comments', data.postId], (old: any) => ({
                    ...old,
                    pages: old.pages.map((page: any, i: number) =>
                      i === 0
                        ? { ...page, results: [createdComment, ...page.results] }
                        : page
                    ),
                }))
                setCommentContent('')
                setIsTextAreaOpen(false)
                toast.error("Reply sent")
            }
        })
    } 

  return (
    <motion.div className='w-[400px] fixed top-0 right-0 bg-white shadow-xl h-dvh z-300 hidden md:block' initial={{x:'110%'}} animate={{x: isOpen ? 0 : '110%', animationDuration: 0.8, transition: {type: 'tween'}}}>
        {allComments && (
            <div className="w-full h-full relative overflow-auto">
                <div className="w-full py-5 px-5 border-b border-gray-100 sticky top-0 z-200 bg-white flex items-center justify-between">
                <h2 className='font-sans text-xl text-black font-semibold leading-1'>Comments ({post.comment_count})</h2>
                <button onClick={closeSidebar} className='p-2 bg-white rounded-full cursor-pointer'>
                    <X className='size-[20px] text-black/70'/>
                </button>
                </div>
    
                <div className="w-full mt-5 px-5 flex items-center gap-3">
                    <Link href='#'>
                        <div className='size-[35px] rounded-full overflow-hidden cursor-pointer relative'>
                            <Image
                            className='object-cover'
                            fill
                            sizes="(max-width: 768px) 100px, 100px"
                            src={post?.author.profile_pic_url || defaultAvatar}
                            loading='eager'
                            placeholder='blur'
                            blurDataURL='/assets/images/default-avatar.png'
                            alt='Profle Picture'
                            />
                        </div>
                    </Link>
                    <Link href='#' className='text-sm font-sans text-black hover:underline'>{user?.first_name} {user?.last_name}</Link>
                </div>

                <div className="w-full px-5 mt-3">
                    <div className="w-full p-4 rounded-sm bg-gray-100/90">
                        <motion.textarea initial={{height:20}} animate={{height: isTextAreaOpen ? 100 : 20, animationDuration: 1.5, transition: {type: 'tween'}}} onFocus={() => setIsTextAreaOpen(true)} onChange={(e) => setCommentContent(e.target.value)} className={`w-full min-h-[20px] md:min-h-[20px] text-sm font-medium outline-0 stroke-0 border-0 placeholder:text-black/65`} placeholder='What are your thoughts?'></motion.textarea>
                        <div className={`w-full ${isTextAreaOpen ? 'flex' : 'hidden'} items-center gap-2 justify-end mt-3`}>
                            <Button onClick={() => setIsTextAreaOpen(false)} variant='secondary' className='cursor-pointer'>Cancel</Button>
                            <Button disabled={commentContent == '' || isPending} onClick={() => handleCreateComment({postId: String(post.id), comment:{content: commentContent}})} variant='default' className='rounded-4xl cursor-pointer'>Respond</Button>
                        </div>
                    </div>
                </div>

                <div className="w-full px-5 mt-8">
                    <div onClick={() => setIsSelectOpen(!isSelectOpen)} className="flex items-center gap-3 cursor-pointer relative">
                     <p className={`text-xs uppercase font-sans font-semibold ${isSelectOpen ? 'text-emerald-700' : 'text-black'}`}>{orderType.name}</p>
                     <ChevronDown className={`${isSelectOpen ? 'text-emerald-600' : 'text-black'} size-[18px]`} />
                     <div className={`w-[150px] absolute -bottom-[85px] left-0 p-2 shadow-sm z-100 bg-white rounded-sm ${isSelectOpen ? 'block' : 'hidden'}`}>
                        {orderTypes.map((ot) => (
                            <button onClick={() => setOrderType(ot)} className={`group text-xs font-sans font-medium p-2 w-full flex items-center gap-3 cursor-pointer ${ot.value == orderType.value ? 'text-emerald-700' : 'text-black'} hover:text-emerald-700`}>
                                <Check className={`${ot.value == orderType.value ? 'visible text-emerald-700' : 'invisible text-black'} size-[18px] group-hover:text-emerald-700 group-hover:visible`}/>
                                <p>{ot.name}</p>
                            </button>
                        ))}
                     </div>
                    </div>
                </div>

                <div className="w-full px-5 mt-5 border-t border-gray-100 py-8">
                {allComments && allComments.length > 0 && allComments.map((comment) => (
                    <CommentCard comment={comment} />
                ))}
                <div className='w-full flex items-center justify-center py-3' ref={ref}>
                    {isFetchingNextPage ? <LoaderCircle className="animate-spin size-[26px] text-emerald-700" /> : null}
                </div>
                {allComments && allComments.length == 0 && (
                    <p>No comments for this post</p>
                )}
                </div>
            </div>

        )}
    </motion.div>
  )
}

export default CommentsSidebar