'use client'
import { useFetchUser } from '@/lib/queries'
import { Ellipsis } from 'lucide-react'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'
import React from 'react'
import defaultAvatar from '@/public/assets/images/default-avatar.png'
import Image from 'next/image'
import { formatFollowersCount } from '@/lib/utils'


const Nav = () => {
    const pathname = usePathname()
    const userId = useParams<{userId: string}>().userId;
    const {data:user, isLoading, isError} = useFetchUser(userId);
    const followersCount = formatFollowersCount(user?.followers_count || 0);



    if(pathname.includes('/profile/settings')) return null
  return (
    <div className="w-full mt-4">
        {
            user && (
                <div className="w-full flex items-center justify-between py-6">
                   <div className="flex items-start gap-5">
                        <div className='size-[60px] rounded-full overflow-hidden cursor-pointer relative block lg:hidden'>
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
                        <div className="">
                            <h1 className='font-sans text-2xl lg:text-5xl font-semibold text-black'>{user?.first_name} {user?.last_name}</h1> 
                            <p className='font-sans text-base font-normal text-black/60 mt-1 block lg:hidden'><span className='font-medium text-black/60'>{followersCount}</span> followers</p>
                        </div>
                    </div>         
                    <button><Ellipsis className='text-black/60' /></button>
                </div>
            )
        }
        <nav className="w-full py-4 lg:pt-6 bg-white border-b border-gray-100 overflow-hidden">
            <div className='min-w-full flex items-center gap-3 lg:gap-5 bg-white overflow-x-auto'>
            <Link href={`/${userId}/profile`}>
                <div className={`px-5 py-1 rounded-4xl min-w-[100px] border ${pathname.endsWith('/profile') ? 'bg-emerald-700/90 border-emerald-700/90' : 'bg-white border-black/60'} text-white flex items-center justify-center hover:bg-emerald-700 hover:border-emerald-700 group transition-all duration-300 ease-in-out`}>
                    <p className={`text-xs md:text-sm font-sans group-hover:text-white ${pathname.endsWith('/profile') ? 'text-white' : 'text-black/60'} transition-all duration-300 ease-in-out`}>Home</p>
                </div>
            </Link>
            <Link href={`/${userId}/profile/about`}>
                <div className={`px-5 py-1 rounded-4xl min-w-[100px] border ${pathname.endsWith('/profile/about') ? 'bg-emerald-700/90 border-emerald-700/90' : 'bg-white border-black/60'} text-white flex items-center justify-center hover:bg-emerald-700 hover:border-emerald-700 group transition-all duration-300 ease-in-out`}>
                    <p className={`text-xs md:text-sm font-sans group-hover:text-white ${pathname.endsWith('/profile/about') ? 'text-white' : 'text-black/60'} transition-all duration-300 ease-in-out`}>About</p>
                </div>
            </Link>
            </div>
        </nav>
    </div>
  )
}

export default Nav