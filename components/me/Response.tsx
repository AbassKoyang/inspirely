'use client'
import { CommentType } from '@/lib/types'
import React, { useState } from 'react'
import { toast } from 'sonner';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '../ui/hover-card';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deletePost } from '@/lib/api';
import { Ellipsis, Share } from 'lucide-react';
import { useAuth } from '@/lib/contexts/authContext';

const Response = ({comment}:{comment: CommentType}) => {
    const {user} = useAuth()
    const [isMoreOpen, setisMoreOpen] = useState(false)
    const queryClient = useQueryClient()


    const date = new Date(comment.created_at || '')
    const month = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"}).format(date);

    const handleShare = () => {
        if (navigator.share) {
          navigator.share({
            title: comment.post?.title,
            text: comment.content,
            url: `https://inspirely.vercel.app/articles/${comment.id}`,
          })
          .then(() => toast.success('Thanks for sharing!'))
          .catch((err) => toast.error('Error sharing:', err));
        } else {
          navigator.clipboard.writeText(`https://inspirely.vercel.app/articles/${comment.id}`);
          toast.success('Product link copied to clipboard');
        }
    }

    const deleteMutation = useMutation({
        mutationFn: () => deletePost(String(comment.id) || ''),      
        onError: (_, __, context) => {
            setisMoreOpen(false)
          toast.error("An error occured")
        },
        onSuccess: () => {
            toast.success("Comment deleted.")
        },
      
        onSettled: () => {
            setisMoreOpen(false)
          queryClient.invalidateQueries({queryKey: ['article']});
        },
      });

  return (
    <div className='w-full mb-3 last:mb-0'>
        <p className='text-base font-medium font-sans'>{comment.content}</p>
        <div className="w-full flex items-center gap-5 justify-between lg:justify-start text-black">
            <p className='text-sm fonts-sans text-black/60'>Published on {month}</p>
            <div className="flex items-center gap-1">
                <HoverCard openDelay={700} closeDelay={100}>
                     <HoverCardTrigger asChild>
                         <button onClick={handleShare} className='py-2 px-4 group cursor-pointer disabled:cursor-not-allowed border lg:border-0 border-gray-100 rounded-4xl flex items-center gap-2'>
                             <Share className='size-[18px] text-black/60 group-hover:text-black transition-all duration-200 ease-in-out' />
                         </button>
                     </HoverCardTrigger>
                     <HoverCardContent side='top' className="w-fit flex items-center justify-center p-0">
                         <div className=" bg-black/95 relative p-2 flex items-center justify-center rounded-sm">
                             <p className='text-sm font-sans text-white font-normal'>Share</p>
                             <div className="size-5 bg-black/95 [clip-path:polygon(0_0,100%_0,50%_100%)] absolute left-[50%] translate-x-[-50%] bottom-[-7px]"></div>
                         </div>
                     </HoverCardContent>
                 </HoverCard>

                 <HoverCard openDelay={700} closeDelay={100}>
                     <HoverCardTrigger asChild>
                        <div className="relative">
                            <button onClick={() => setisMoreOpen(!isMoreOpen)} className='py-2 px-4 group cursor-pointer disabled:cursor-not-allowed border lg:border-0 border-gray-100 rounded-4xl flex items-center gap-2'>
                                <Ellipsis className="size-[18px] text-black/60 group-hover:text-black transition-all duration-200 ease-in-out" />
                            </button>
                            <div  className={`${isMoreOpen ? 'block' : 'hidden'} absolute left-[50%] translate-x-[-50%] bottom-[-50px] z-200`}>
                            <div className=" bg-white relative p-2 justify-center rounded-xs shadow-sm w-[160px]">
                                {user?.id == comment.user.id && (
                                   <div className="w-full">
                                     <button onClick={() => deleteMutation.mutate()} className="w-full py-1 text-red-600 hover:text-red-700 cursor-pointer font-sans text-sm flex items-center justify-start px-2">Delete response</button>
                                   </div>
                                )}
                                <div className="size-4 bg-white absolute left-[50%] translate-x-[-50%] top-[-8px] rotate-45 border border-gray-200 z-[-1]"></div>
                            </div>
                            </div>
                        </div>
                     </HoverCardTrigger>
                     <HoverCardContent side='top' className="w-fit flex items-center justify-center p-0">
                         <div className=" bg-black/95 relative p-2 flex items-center justify-center rounded-sm">
                             <p className='text-sm font-sans text-white font-normal'>More</p>
                             <div className="size-5 bg-black/95 [clip-path:polygon(0_0,100%_0,50%_100%)] absolute left-[50%] translate-x-[-50%] bottom-[-7px]"></div>
                         </div>
                     </HoverCardContent>
                 </HoverCard>
            </div>
        </div>
    </div>
  )
}

export default Response