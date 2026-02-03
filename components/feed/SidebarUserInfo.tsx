'use client'
import { User } from '@/lib/schemas/user'
import Image from 'next/image'
import Link from 'next/link'
import defaultAvatar from '@/public/assets/images/default-avatar.png'
import React, { useEffect, useState } from 'react'
import { formatFollowersCount, truncateText } from '@/lib/utils'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { followUser, unfollowUser } from '@/lib/api'
import { useFetchUser } from '@/lib/queries'
import { toast } from 'sonner'
import { useAuth } from '@/lib/contexts/authContext'

const SideBarUserInfo = ({user}: {user: User}) => {
    const {user: sessionUser} = useAuth();
    const queryClient = useQueryClient();
    const [isSelf, setIsSelf] = useState(false)
    const followersCount = formatFollowersCount(user?.followers_count || 0);
    const followingCount = formatFollowersCount(user?.following_count || 0);
    const bio = truncateText(user.bio || '', 30)


    useEffect(() => {
        setIsSelf(sessionUser?.id == user?.id)
    }, [sessionUser, user])

    const followMutation = useMutation({
        mutationFn: () => followUser(String(user.id) || ''),
        onMutate: async () => {     
            await queryClient.cancelQueries({ queryKey: [`user-${user.id}`] })
 
          const prevValue = queryClient.getQueryData([`user-${user.id}`, String(user.id)]);
          queryClient.setQueryData([`user-${user.id}`, String(user.id)], (old: any) => ({
            ...old,
            is_following: true,
          }));
      
          return { prevValue };
        },
      
        onError: (_, __, context) => {
          queryClient.setQueryData([`user-${user.id}`, String(user.id)], context?.prevValue);
          toast.error("An error occured")
        },
      
        onSettled: () => {
          queryClient.invalidateQueries({queryKey: [`user-${user.id}`]});
        },
      });

    const unfollowMutation = useMutation({
        mutationFn: () => unfollowUser(String(user.id) || ''),
      
        onMutate: async () => {     
            await queryClient.cancelQueries({ queryKey: [`user-${user.id}`] })
 
          const prevValue = queryClient.getQueryData([`user-${user.id}`]);
          queryClient.setQueryData([`user-${user.id}`], (old: any) => ({
            ...old,
            is_following: false,
          }));
      
          return { prevValue };
        },
      
        onError: (_, __, context) => {
          queryClient.setQueryData([`user-${user.id}`], context?.prevValue);
          toast.error("An error occured")
        },
      
        onSettled: () => {
          queryClient.invalidateQueries({queryKey: [`user-${user.id}`]});
        },
      });

  return (
    <div className="w-full">
        {user && (
            <div className='w-full'>
            <div className="w-full flex justify-between items-start">
                <div className="w-full flex gap-5">
                    <Link href='#'>
                        <div className='size-[20px] rounded-full overflow-hidden cursor-pointer relative'>
                            <Image
                            className='object-cover'
                            fill
                            sizes="(max-width: 768px) 100px, 100px"
                            src={user?.profile_pic_url || defaultAvatar}
                            loading='eager'
                            placeholder='blur'
                            blurDataURL='/assets/images/default-avatar.png'
                            alt='Profle Picture'
                            />
                        </div>
                    </Link>
                    <div className="w-full hidden lg:block">
                        <p className='text-sm font-medium text-black font-sans max-w-[140px]'>{user?.first_name} {user?.last_name}</p>
                        <p className='font-sans text-xs font-normal text-black/80 mt-2 max-w-[150px]'>{bio}</p>
                    </div>
                </div>
                {isSelf ? null : (
                        <>
                            {user?.is_following ? (
                                <button onClick={() => unfollowMutation.mutate()} className='bg-white text-black border border-black px-3 py-1 rounded-4xl cursor-pointer text-xs'>Unfollow</button>
                            ) : (
                                <button onClick={() => followMutation.mutate()} className='bg-emerald-700 border border-emerald-700 text-white px-3 py-1 rounded-4xl cursor-pointer text-xs'>Follow</button>
                            )}
                        </>
                    )}
            </div>
        </div>
)}
    </div>
  )
}

export default SideBarUserInfo