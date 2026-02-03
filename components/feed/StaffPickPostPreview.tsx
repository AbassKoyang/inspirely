import { PostType } from '@/lib/schemas/post'
import { truncateText } from '@/lib/utils';
import defaultAvatar from '@/public/assets/images/default-avatar.png'
import Image from 'next/image';
import Link from 'next/link';

import React from 'react'
import { HoverCard, HoverCardTrigger } from '../ui/hover-card';
import ProfilePopup from './ProfilePopup';
import { HoverCardContent } from '@radix-ui/react-hover-card';

const StaffPickPostPreview = ({post}:{post:PostType}) => {
    const date = new Date(post.created_at)
    const formattedMonth = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"}).format(date);   
    const title = truncateText(post.title, 70)
    const name = truncateText(`${post.author.first_name} ${post.author.last_name}`, 25)
    const content = truncateText(post.title, 150)
  return (
    <div className="w-full">
       <div className="w-full flex items-center gap-3">
            <HoverCard openDelay={700} closeDelay={100}>
                <HoverCardTrigger asChild>
                    <Link href='#'>
                        <div className='size-[25px] relative rounded-xs overflow-hidden object-center object-cover cursor-pointer'>
                        <Image
                            className='object-cover z-10'
                            fill
                            sizes="(max-width: 768px) 100px, 100px"
                            src={post.author.profile_pic_url || defaultAvatar}
                            loading='eager'
                            placeholder='blur'
                            blurDataURL='/assets/images/default-avatar.png'
                            alt='Profle Picture'
                            />
                        </div>
                    </Link>
                </HoverCardTrigger>
                <HoverCardContent side='bottom' className="w-[290px] bg-white p-6 z-300 shadow-md">
                    <ProfilePopup userId={String(post?.author.id) || ''} />                             
                </HoverCardContent>
            </HoverCard>
            <HoverCard openDelay={700} closeDelay={100}>
                <HoverCardTrigger asChild>
                    <Link href='#' className='hover:underline'>
                        <p className='font-sans text-xs text-black/60 font-normal'>{name}</p>
                    </Link>
                </HoverCardTrigger>
                <HoverCardContent side='bottom' className="w-[290px] bg-white p-6 z-300 shadow-md">
                    <ProfilePopup userId={String(post?.author.id) || ''} />                             
                </HoverCardContent>
            </HoverCard>
       </div>

       <h4 className='text-base font-sans font-bold mt-2 mb-1.5'>{title}</h4>
       <p className='text-xs font-sans text-black/60'>{formattedMonth}</p>
    </div>
  )
}

export default StaffPickPostPreview