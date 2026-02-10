'use client'
import { useAuth } from '@/lib/contexts/authContext'
import { useSideBarActive } from '@/lib/contexts/sidebardContext'
import { useFetchFollowing } from '@/lib/queries'
import {Ellipsis, Users } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import defaultAvatar from '@/public/assets/images/default-avatar.png'
import { truncateText } from '../lib/utils'
import { HoverCard, HoverCardContent, HoverCardTrigger } from './ui/hover-card'


const SideBar = () => {
    const {user} = useAuth();
    const {isActive} = useSideBarActive()
    const {data:following} = useFetchFollowing(String(user?.id ) || '')
    const pathname = usePathname() 

  return (
    <div className='w-full h-full overflow-y-auto hidden md:block mt-26 px-1'>
        <div className="w-full border-b border-gray-100 pb-10">
            <Link className='w-full group' href='/feed'>
                <div className="w-full flex items-center gap-4">
                    <div className={`h-[24px] w-[2px] ${pathname.includes('feed') ? 'bg-emerald-600' : 'bg-white'}`}></div>
                    <svg className={`${pathname.includes('/feed') ? 'stroke-emerald-600' : 'stroke-black/60'} group-hover:stroke-emerald-600 transition-all duration-200 ease-in-out size-[24px]`} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.9998 18V15M10.0698 2.81997L3.13978 8.36997C2.35978 8.98997 1.85978 10.3 2.02978 11.28L3.35978 19.24C3.59978 20.66 4.95978 21.81 6.39978 21.81H17.5998C19.0298 21.81 20.3998 20.65 20.6398 19.24L21.9698 11.28C22.1298 10.3 21.6298 8.98997 20.8598 8.36997L13.9298 2.82997C12.8598 1.96997 11.1298 1.96997 10.0698 2.81997Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <p className={`text-lg font-normal font-sans ${pathname.includes('/feed') ? 'text-emerald-600' : 'text-black/60'} group-hover:text-emerald-600 transition-all duration-200 ease-in-out`}>Home</p>
                </div>
            </Link>
            <Link className='w-full group' href='/me/library'>
                <div className="w-full flex items-center gap-4 mt-5">
                <div className={`h-[24px] w-[2px] ${pathname == '/me/library' || '/me/library/responses' ? 'bg-emerald-600' : 'bg-white'}`}></div>
                <svg className=' size-[24px] fil'  width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path className={`${pathname == '/me/library' || '/me/library/responses' ? 'fill-emerald-600' : 'fill-black/60'} group-hover:fill-emerald-600 transition-all duration-200 ease-in-out`} d="M10.077 18.673L5.8155 20.8328C5.51417 20.9866 5.21958 20.9773 4.93175 20.8048C4.64392 20.6323 4.5 20.3736 4.5 20.0288V8.23075C4.5 7.73208 4.67658 7.30617 5.02975 6.953C5.38308 6.59967 5.80908 6.423 6.30775 6.423H13.8365C14.3352 6.423 14.7612 6.59967 15.1145 6.953C15.4677 7.30617 15.6443 7.73208 15.6443 8.23075V20.0288C15.6443 20.3736 15.5003 20.6323 15.2125 20.8048C14.9247 20.9773 14.6301 20.9866 14.3288 20.8328L10.077 18.673ZM6 19.1865L9.223 17.4693C9.491 17.3218 9.774 17.248 10.072 17.248C10.3702 17.248 10.6533 17.3218 10.9213 17.4693L14.1443 19.1865V8.23075C14.1443 8.14108 14.1154 8.06733 14.0577 8.0095C14.0001 7.95183 13.9263 7.923 13.8365 7.923H6.30775C6.21792 7.923 6.14417 7.95183 6.0865 8.0095C6.02883 8.06733 6 8.14108 6 8.23075V19.1865ZM18.75 17.7213C18.5372 17.7213 18.359 17.6494 18.2155 17.5058C18.0718 17.3621 18 17.1839 18 16.9713V4.30775C18 4.21792 17.9712 4.14417 17.9135 4.0865C17.8558 4.02883 17.7821 4 17.6923 4H8.14425C7.93142 4 7.75325 3.92817 7.60975 3.7845C7.46608 3.641 7.39425 3.46283 7.39425 3.25C7.39425 3.03717 7.46608 2.859 7.60975 2.7155C7.75325 2.57183 7.93142 2.5 8.14425 2.5H17.6923C18.1909 2.5 18.6169 2.67658 18.9703 3.02975C19.3234 3.38308 19.5 3.80908 19.5 4.30775V16.9713C19.5 17.1839 19.4282 17.3621 19.2845 17.5058C19.141 17.6494 18.9628 17.7213 18.75 17.7213Z" fill=""/>
                </svg>

                    <p className={`text-lg font-normal font-sans ${pathname == '/me/library' || '/me/library/responses' ? 'text-emerald-600' : 'text-black/60'} group-hover:text-emerald-600 transition-all duration-200 ease-in-out`}>Library</p>
                </div>
            </Link>
            <Link className='w-full group' href={`/${user?.id}/profile`}>
                <div className="w-full flex items-center gap-4 mt-5">
                <div className={`h-[24px] w-[2px] ${pathname.includes('/profile') ? 'bg-emerald-600' : 'bg-white'}`}></div>
                <svg className={`${pathname.includes('/profile') ? 'stroke-emerald-600' : 'stroke-black/60'} group-hover:stroke-emerald-600 transition-all duration-200 ease-in-out size-[24px]`}  width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18.14 21.62C17.26 21.88 16.22 22 15 22H9C7.78 22 6.74 21.88 5.86 21.62M18.14 21.62C17.92 19.02 15.25 16.97 12 16.97C8.75 16.97 6.08 19.02 5.86 21.62M18.14 21.62C20.86 20.85 22 18.78 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 18.78 3.14 20.85 5.86 21.62M12 14.17C10.02 14.17 8.42 12.56 8.42 10.58C8.42 8.60002 10.02 7 12 7C13.98 7 15.58 8.60002 15.58 10.58C15.58 12.56 13.98 14.17 12 14.17Z"  strokeWidth="1.5"strokeLinecap="round" strokeLinejoin="round"/></svg>

                    <p className={`text-lg font-normal font-sans ${pathname.includes('/profile') ? 'text-emerald-600' : 'text-black/60'} group-hover:text-emerald-600 transition-all duration-200 ease-in-out`}>Profile</p>
                </div>
            </Link>
            <Link className='w-full group' href='/explore'>
                <div className="w-full flex items-center gap-4 mt-5">
                <div className={`h-[24px] w-[2px] ${pathname == '/search' || '/explore' ? 'bg-emerald-600' : 'bg-white'}`}></div>
                <svg className={`${pathname =='/search' || '/explore' ? 'stroke-emerald-600' : 'stroke-black/60'} group-hover:stroke-emerald-600 transition-all duration-200 ease-in-out size-[24px]`}  width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17.8001 2.1L7.87009 4.59C6.42009 4.95 4.95009 6.42 4.59009 7.87L2.10009 17.8C1.35009 20.8 3.19009 22.65 6.20009 21.9L16.1301 19.42C17.5701 19.06 19.0501 17.58 19.4101 16.14L21.9001 6.2C22.6501 3.2 20.8001 1.35 17.8001 2.1Z"  strokeWidth="1.5"strokeLinecap="round" strokeLinejoin="round"/><path d="M12.0001 15.5C13.9331 15.5 15.5001 13.933 15.5001 12C15.5001 10.067 13.9331 8.5 12.0001 8.5C10.0671 8.5 8.50009 10.067 8.50009 12C8.50009 13.933 10.0671 15.5 12.0001 15.5Z"  strokeWidth="1.5"strokeLinecap="round" strokeLinejoin="round"/></svg>

                    <p className={`text-lg font-normal font-sans ${pathname == '/search' || '/explore' ? 'text-emerald-600' : 'text-black/60'} group-hover:text-emerald-600 transition-all duration-200 ease-in-out`}>Discover</p>
                </div>
            </Link>
            <Link className='w-full group' href='#'>
                <div className="w-full flex items-center gap-4 mt-5">
                <div className={`h-[24px] w-[2px] ${pathname == '/me/insights' ? 'bg-emerald-600' : 'bg-white'}`}></div>
                <svg className={`${pathname =='/me/insights'? 'stroke-emerald-600' : 'stroke-black/60'} group-hover:stroke-emerald-600 transition-all duration-200 ease-in-out size-[24px]`}  width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.33 14.49L9.71 11.4C10.05 10.96 10.68 10.88 11.12 11.22L12.95 12.66C13.39 13 14.02 12.92 14.36 12.49L16.67 9.51M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>

                    <p className={`text-lg font-normal font-sans ${pathname == '/me/insights' ? 'text-emerald-600' : 'text-black/60'} group-hover:text-emerald-600 transition-all duration-200 ease-in-out`}>Insights</p>
                </div>
            </Link>
        </div>

        <div className="px-4 mt-10">
            <div className='w-full flex items-center gap-4 mb-5'>
                <Users strokeWidth={1} className='size-[24px] text-black/60' />
                <h3 className='font-sans text-base font-normal text-black/60'>Following</h3>
            </div>
            <div className="w-full mt-3 pl-0.5">
            {following?.results.map((follow) => { 
                    const followingName = truncateText(`${follow.following?.first_name} ${follow.following?.last_name}`, 20)

                return (
                    <HoverCard openDelay={700} closeDelay={100}>
                     <HoverCardTrigger asChild>
                        <Link href={`/${follow.following.id}/profile`} className='w-full flex items-center justify-between mb-3 cursor-pointer group'>
                        <div className="flex items-center gap-4">
                            <div className="w-[20px] h-[20px] rounded-full object-cover object-center overflow-hidden">
                                    <Image
                                    className=''
                                    src={follow.following?.profile_pic_url || defaultAvatar}
                                    width={20}
                                    height={20}
                                    alt='Profle Picture'
                                    />
                                </div>
                                <p className='font-sans text-sm font-normal text-black/60 group-hover:text-black'>{followingName}</p>
                            </div>
                            <div className='size-[5px] rounded-full bg-emerald-700'></div>
                        </Link>
                     </HoverCardTrigger>
                     <HoverCardContent side='top' className="w-fit flex items-center justify-center p-0">
                         <div className=" bg-black/95 relative p-2 flex items-center justify-center rounded-sm">
                             <p className='text-sm font-sans text-white font-normal'>{follow.following?.first_name} {follow.following?.last_name}</p>
                             <div className="size-5 bg-black/95 [clip-path:polygon(0_0,100%_0,50%_100%)] absolute left-[50%] translate-x-[-50%] bottom-[-7px]"></div>
                         </div>
                     </HoverCardContent>
                    </HoverCard>
                )})}
            </div>
        </div>

    </div>
  )
}

export default SideBar