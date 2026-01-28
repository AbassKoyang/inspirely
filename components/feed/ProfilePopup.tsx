import { User } from '@/lib/schemas/user'
import Image from 'next/image'
import Link from 'next/link'
import defaultAvatar from '@/public/assets/images/default-avatar.png'
import React from 'react'
import { formatFollowersCount } from '@/lib/utils'

const ProfilePopup = ({user, isSelf, isFollowing, unfollow, follow}: {user:User; isSelf: boolean; isFollowing: boolean; unfollow: () => void; follow: ()=> void}) => {
    const followersCount = formatFollowersCount(user.followers_count || 0);

  return (
    <div className="w-full">
        <div className="w-full flex items-end">
            <Link href='#'>
                <div className='size-[65px] rounded-full overflow-hidden cursor-pointer relative'>
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
            {isSelf ? null : (
                <>
                    {isFollowing ? (
                        <button onClick={unfollow} className='mt-3 bg-white text-black border border-black px-4.5 py-1 rounded-4xl cursor-pointer'>Unfollow</button>
                    ) : (
                        <button onClick={follow} className='mt-3 bg-emerald-700 border border-emerald-700 text-white px-4.5 py-1 rounded-4xl cursor-pointer'>Follow</button>
                    )}
                </>
            )}
        </div>
        <div className="w-full mt-3">
            <p className='text-sm font-semibold text-black font-sans'>{user?.first_name} {user?.last_name}</p>
            <p className='font-sans text-sm font-normal text-black/60 mt-1'><span className='font-medium text-black/80'>{followersCount}</span> followers</p>
            <p className='font-sans text-sm font-normal text-black/60 mt-3'>{user?.bio}</p>
        </div>
    </div>
  )
}

export default ProfilePopup