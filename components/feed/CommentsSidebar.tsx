'use client'
import React from 'react'
import {motion} from 'motion/react'
import { X } from 'lucide-react';
import { PostType } from '@/lib/schemas/post';
import { useFetchComments } from '@/lib/queries';
import Image from 'next/image';
import { useAuth } from '@/lib/contexts/authContext';
import defaultAvatar from '@/public/assets/images/default-avatar.png'
import Link from 'next/link';
import { Button } from '../ui/button';


const CommentsSidebar = ({isOpen, closeSidebar, post} : {isOpen: boolean; closeSidebar: () => void; post: PostType}) => {
    const {data: comments} = useFetchComments(String(post.id))
    const {user} = useAuth();

  return (
    <motion.div className='w-[380px] fixed top-0 right-0 bg-white shadow-xl h-dvh z-200' initial={{x:'110%'}} animate={{x: isOpen ? 0 : '110%', animationDuration: 0.8, transition: {type: 'tween'}}}>
        {comments && (
            <div className="w-full h-full relative overflow-auto">
                <div className="w-full py-5 px-5 border-b border-gray-100 sticky top-0 bg-white flex items-center justify-between">
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

                <div className="px-5 mt-5">
                    <div className="w-full p-4 rounded-sm bg-gray-100/90">
                        <textarea className='w-full min-h-[120px] h-[120px] md:min-h-[120px] md:h-fit max-h-fit text-lg font-medium outline-0 stroke-0 border-0 placeholder:text-black/65' placeholder='What are your thoughts?'></textarea>
                        <div className="w-full flex items-center gap-2 justify-end mt-5">
                            <Button variant='secondary' className='cursor-pointer'>Cancel</Button>
                            <Button variant='default' className='rounded-4xl cursor-pointer'>Respond</Button>
                        </div>
                    </div>
                </div>
            </div>
        )}
    </motion.div>
  )
}

export default CommentsSidebar