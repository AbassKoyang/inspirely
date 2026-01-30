'use client'
import { User } from '@/lib/schemas/user'
import Image from 'next/image'
import Link from 'next/link'
import defaultAvatar from '@/public/assets/images/default-avatar.png'
import React, { useEffect, useState } from 'react'
import { formatFollowersCount } from '@/lib/utils'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { followUser, unfollowUser } from '@/lib/api'
import { useFetchUser } from '@/lib/queries'
import { toast } from 'sonner'
import { useAuth } from '@/lib/contexts/authContext'

const UserInfo = ({userId}: {userId: string}) => {
    const {data:user, isLoading} = useFetchUser(String(userId) || '')
    const {user: sessionUser} = useAuth();
    const queryClient = useQueryClient();
    const [isSelf, setIsSelf] = useState(false)
    const followersCount = formatFollowersCount(user?.followers_count || 0);
    const followingCount = formatFollowersCount(user?.following_count || 0);

    useEffect(() => {
        setIsSelf(sessionUser?.id == user?.id)
    }, [sessionUser, user])

    const followMutation = useMutation({
        mutationFn: () => followUser(String(userId) || ''),
        onMutate: async () => {     
            await queryClient.cancelQueries({ queryKey: [`user-${userId}`] })
 
          const prevValue = queryClient.getQueryData([`user-${userId}`, String(userId)]);
          queryClient.setQueryData([`user-${userId}`, String(userId)], (old: any) => ({
            ...old,
            is_following: true,
          }));
      
          return { prevValue };
        },
      
        onError: (_, __, context) => {
          queryClient.setQueryData([`user-${userId}`, String(userId)], context?.prevValue);
          toast.error("An error occured")
        },
      
        onSettled: () => {
          queryClient.invalidateQueries({queryKey: [`user-${userId}`]});
        },
      });

    const unfollowMutation = useMutation({
        mutationFn: () => unfollowUser(String(userId) || ''),
      
        onMutate: async () => {     
            await queryClient.cancelQueries({ queryKey: [`user-${userId}`] })
 
          const prevValue = queryClient.getQueryData([`user-${userId}`]);
          queryClient.setQueryData([`user-${userId}`], (old: any) => ({
            ...old,
            is_following: false,
          }));
      
          return { prevValue };
        },
      
        onError: (_, __, context) => {
          queryClient.setQueryData([`user-${userId}`], context?.prevValue);
          toast.error("An error occured")
        },
      
        onSettled: () => {
          queryClient.invalidateQueries({queryKey: [`user-${userId}`]});
        },
      });

  return (
    <div className="w-full mb-20 mt-16">
        {isLoading && (
            <p className="">Loading...</p>
        )}
        {user && (
            <div className='w-full'>
            <div className="w-full flex justify-between items-start">
                <div className="w-full flex gap-5">
                    <Link href='#'>
                        <div className='size-[60px] rounded-full overflow-hidden cursor-pointer relative'>
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
                    <div className="w-full max-w-lg hidden lg:block">
                        <p className='text-xl font-medium text-black font-sans'>Written by {user?.first_name} {user?.last_name}</p>
                        <div className="flex gap-2 items-center mt-1">
                            <p className='font-sans text-sm font-normal text-black/60'><span className='font-medium text-black/80'>{followersCount}</span> followers</p>
                                <div className="size-[3px] bg-black/60 rounded-full"></div>
                            <p className='font-sans text-sm font-normal text-black/60'><span className='font-medium text-black/80'>{followingCount}</span> following</p>
                        </div>
                        <p className='font-sans text-sm font-normal text-black/80 mt-3'>{user?.bio}</p>
                    </div>
                </div>
                {isSelf ? null : (
                        <>
                            {user?.is_following ? (
                                <button onClick={() => unfollowMutation.mutate()} className='mt-3 bg-white text-black border border-black px-4.5 py-1 rounded-4xl cursor-pointer'>Unfollow</button>
                            ) : (
                                <button onClick={() => followMutation.mutate()} className='mt-3 bg-emerald-700 border border-emerald-700 text-white px-4.5 py-1 rounded-4xl cursor-pointer'>Follow</button>
                            )}
                        </>
                    )}
            </div>
            <div className="w-full lg:hidden mt-5">
                <p className='text-xl font-medium text-black font-sans'>Written by {user?.first_name} {user?.last_name}</p>
                <div className="flex gap-2 items-center mt-2">
                    <p className='font-sans text-sm font-normal text-black/60'><span className='font-medium text-black/80'>{followersCount}</span> followers</p>
                        <div className="size-[3px] bg-black/60 rounded-full"></div>
                    <p className='font-sans text-sm font-normal text-black/60'><span className='font-medium text-black/80'>{followingCount}</span> following</p>
                </div>
                <p className='font-sans text-sm font-normal text-black/80 mt-3'>{user?.bio}</p>
            </div>
        </div>
)}
    </div>
  )
}

export default UserInfo