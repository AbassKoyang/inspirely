'use client';
import { useFetchFollowing, useFetchIsFollowing, useFetchUser } from '@/lib/queries';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import defaultAvatar from '@/public/assets/images/default-avatar.png'

import React from 'react'
import { formatFollowersCount } from '@/lib/utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Ellipsis } from 'lucide-react';

const ProfileSidebar = () => {
    const userId = useParams<{userId: string}>().userId;
    const {data:user, isLoading, isError} = useFetchUser(userId);
    const {data:isFollowing} = useFetchIsFollowing(userId)
    const {data:following} = useFetchFollowing(userId)
    const followersCount = formatFollowersCount(user?.followers_count || 0);
    const queryClient = useQueryClient();

    console.log(isFollowing)
    console.log(following)

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
    <div className="w-[30%] p-8 bg-white border-l border-gray-100">
        <div className="w-[100px] h-[100px] rounded-full object-cover object-center overflow-hidden mt-2">
            <Image
            className='size-full'
            src={user?.profile_pic_url || defaultAvatar}
            width={50}
            height={50}
            alt='Profle Picture'
            />
        </div>
         <h6 className='font-sans text-lg font-semibold text-black mt-3'>{user?.first_name} {user?.last_name}</h6>
         <p className='font-sans text-sm font-normal text-black/60 mt-1'>{followersCount} followers</p>
         <p className='font-sans text-sm font-normal text-black/60 mt-3'>{user?.bio}</p>
         {isFollowing?.is_following ? (
            <button onClick={() => unfollowMutation.mutate()} className='mt-3 bg-white text-black border border-black px-4.5 py-1 rounded-4xl cursor-pointer'>Unfollow</button>
         ) : (
            <button onClick={() => followMutation.mutate()} className='mt-3 bg-emerald-600 border border-emerald-600 text-white px-4.5 py-1 rounded-4xl cursor-pointer'>Follow</button>
         )}

         <div className="mt-14 w-full">
            <h4 className='font-sans text-base font-semibold text-black'>Following</h4>
            <div className="w-full mt-3">
                {following?.results.map((follow) => (
                    <div className='w-full flex items-center justify-between mb-2'>
                       <div className="flex items-center gap-3.5">
                        <div className="w-[25px] h-[25px] rounded-full object-cover object-center overflow-hidden mt-2">
                                <Image
                                className='size-full'
                                src={follow.following?.profile_pic_url || defaultAvatar}
                                width={25}
                                height={25}
                                alt='Profle Picture'
                                />
                            </div>
                            <h6 className='font-sans text-sm font-normal text-black/60'>{follow.following?.first_name} {follow.following?.last_name}</h6>
                       </div>
                        <button><Ellipsis className='text-black/60 size-4' /></button>
                    </div>
                ))}
            </div>
         </div>
    </div>
  )
}

export default ProfileSidebar