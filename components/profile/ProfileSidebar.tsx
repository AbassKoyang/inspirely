'use client';
import { useFetchFollowing, useFetchIsFollowing, useFetchUser } from '@/lib/queries';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import defaultAvatar from '@/public/assets/images/default-avatar.png'

import React, { useEffect, useState } from 'react'
import { formatFollowersCount } from '@/lib/utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Ellipsis } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/lib/contexts/authContext';
import { Skeleton } from '../ui/skeleton';

const ProfileSidebar = () => {
    const [isSelf, setIsSelf] = useState(false)
    const {user: sessionUser} = useAuth();
    const userId = useParams<{userId: string}>().userId;
    const {data:user, isLoading, isError} = useFetchUser(userId);
    const {data:isFollowing} = useFetchIsFollowing(userId)
    const {data:following, isLoading:followingLoading, isError: followingError} = useFetchFollowing(userId)
    const followersCount = formatFollowersCount(user?.followers_count || 0);
    const followingCount = formatFollowersCount(user?.following_count || 0);
    const queryClient = useQueryClient();

    useEffect(() => {
        setIsSelf(sessionUser?.id == Number(userId))
    }, [user, userId, sessionUser])

    
    const followMutation = useMutation({
        mutationFn: () =>
          api.post(`/api/users/${userId}/follow/`),
      
        onMutate: async () => {     
            await queryClient.cancelQueries({ queryKey: ['is-following'] })
 
          const prevValue = queryClient.getQueryData(['is-following', userId]);
          queryClient.setQueryData(['is-following', userId], (old: any) => ({
            ...old,
            is_following: true,
          }));
      
          return { prevValue };
        },
      
        onError: (_, __, context) => {
          queryClient.setQueryData(['is-following', userId], context?.prevValue);
        },
      
        onSettled: () => {
          queryClient.invalidateQueries({queryKey: ['is-following']});
        },
      });

    const unfollowMutation = useMutation({
        mutationFn: () =>
          api.delete(`/api/users/${userId}/follow/`),
      
        onMutate: async () => {     
            await queryClient.cancelQueries({ queryKey: ['is-following'] })
 
          const prevValue = queryClient.getQueryData(['is-following']);
          queryClient.setQueryData(['is-following'], (old: any) => ({
            ...old,
            is_following: false,
          }));
      
          return { prevValue };
        },
      
        onError: (_, __, context) => {
          queryClient.setQueryData(['is-following'], context?.prevValue);
        },
      
        onSettled: () => {
          queryClient.invalidateQueries({queryKey: ['is-following']});
        },
      });

      
  return (
    <div className="hidden md:block w-[30%] p-8 bg-white border-l border-gray-100">
      {isLoading && (
          <div className='w-full'>
            <Skeleton className='size-[100px] rounded-full' />
            <Skeleton className='mt-2 h-[14px] w-[90%]' />
            <Skeleton className='mt-1 h-[10px] w-[100px]' />
            <Skeleton className='mt-3 w-full h-[12px]' />
            <Skeleton className='mt-1 w-full h-[12px]' />
            <Skeleton className='mt-1 w-[50%] h-[12px]' />
          </div>
      )}

        {isError && (
            <div className="w-full h-[300px] flex items-center justify-center">
                <p className='text-xs font-sans text-black/60'>Oops! Failed to load user info.</p>
            </div>
        )}

        {user && (
          <div className="w-full">
                <div className="w-[100px] h-[100px] rounded-full object-center overflow-hidden mt-2 relative">
                <Image
                fill
                alt='Profle Picture'
                className='object-cover'
                src={user?.profile_pic_url || defaultAvatar}
                loading='eager'
                placeholder='blur'
                blurDataURL='/assets/images/default-avatar.png'
                />
            </div>
            <h6 className='font-sans text-lg font-semibold text-black mt-3'>{user?.first_name} {user?.last_name}</h6>
            <p className='font-sans text-sm font-normal text-black/60 mt-1'>{followersCount} followers</p>
            <p className='font-sans text-sm font-normal text-black/60 mt-3 mb-5'>{user?.bio}</p>
            {isSelf ? (
                <Link href='/me/settings' className=' text-emerald-700 rounded-4xl cursor-pointer text-sm font-medium'>Edit profile</Link>
            ) : (
                <>
                    {isFollowing?.is_following ? (
                        <button onClick={() => unfollowMutation.mutate()} className='mt-3 bg-white text-black border border-black px-4.5 py-1 rounded-4xl cursor-pointer'>Unfollow</button>
                    ) : (
                        <button onClick={() => followMutation.mutate()} className='mt-3 bg-emerald-700 border border-emerald-700 text-white px-4.5 py-1 rounded-4xl cursor-pointer'>Follow</button>
                    )}
                </>
            )}
          </div>
        )}

         <div className="mt-14 w-full mb-5">
            <h4 className='font-sans text-base font-semibold text-black'>Following</h4>
            <div className="w-full mt-3">
                {followingLoading && (
                  <div className="w-full">
                      {Array.from({length: 10}).map((_, i) => (
                          <div key={i} className="w-full flex items-center justify-between mb-3">
                              <Skeleton className='size-[25px] rounded-full' />
                              <Skeleton className='h-[10px] w-[100px] rounded-sm' />
                              <Skeleton className='h-[5px] w-[20px]' />
                          </div>
                      ))}
                  </div>
                )}

                {followingError && (
                    <div className="w-full h-[300px] flex items-center justify-center">
                        <p className='text-xs font-sans text-black/60'>Oops! Failed to load following.</p>
                    </div>
                )}
                {following && following.results.map((follow) => (
                    <div className='w-full flex items-center justify-between mb-3'>
                       <div className="flex items-center gap-3.5">
                        <div className="w-[25px] h-[25px] rounded-full object-cover object-center overflow-hidden">
                                <Image
                                className=''
                                src={follow.following?.profile_pic_url || defaultAvatar}
                                width={25}
                                height={25}
                                alt='Profle Picture'
                                />
                            </div>
                            <p className='font-sans text-sm font-normal text-black/60'>{follow.following?.first_name} {follow.following?.last_name}</p>
                       </div>
                        <button><Ellipsis className='text-black/60 size-4' /></button>
                    </div>
                ))}
            </div>
         </div>
         <Link className='font-sans text-sm font-normal text-black/60' href='#'>See all ({followingCount})</Link>
    </div>
  )
}

export default ProfileSidebar