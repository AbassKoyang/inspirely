'use client'
import { useFetchUser } from '@/lib/queries'
import { Ellipsis } from 'lucide-react'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'
import React from 'react'

const Nav = () => {
    const pathname = usePathname()
    const userId = useParams<{userId: string}>().userId;
    const {data:user, isLoading, isError} = useFetchUser(userId);


    if(pathname.includes('/profile/settings')) return null
  return (
    <div className="w-full">
        {
            user && (
                <div className="w-full flex items-center justify-between py-6">
                    <h1 className='font-sans text-5xl font-semibold text-black'>{user?.first_name} {user?.last_name}</h1>
                    <button><Ellipsis className='text-black/60' /></button>
                </div>
            )
        }
        <nav className="w-full py-4 pt-6 bg-white border-b border-gray-100 overflow-hidden">
            <div className='min-w-full flex items-center gap-3 lg:gap-5 bg-white overflow-x-auto'>
            <Link href={`/${userId}/profile`}>
                <div className={`px-5 py-1 rounded-4xl min-w-[100px] border ${pathname.endsWith('/profile') ? 'bg-emerald-600/90 border-emerald-600/90' : 'bg-white border-black/60'} text-white flex items-center justify-center hover:bg-emerald-600 hover:border-emerald-600 group transition-all duration-300 ease-in-out`}>
                    <p className={`text-xs md:text-sm font-sans group-hover:text-white ${pathname.endsWith('/profile') ? 'text-white' : 'text-black/60'} transition-all duration-300 ease-in-out`}>Home</p>
                </div>
            </Link>
            <Link href={`/${userId}/profile/about`}>
                <div className={`px-5 py-1 rounded-4xl min-w-[100px] border ${pathname.endsWith('/profile/about') ? 'bg-emerald-600/90 border-emerald-600/90' : 'bg-white border-black/60'} text-white flex items-center justify-center hover:bg-emerald-600 hover:border-emerald-600 group transition-all duration-300 ease-in-out`}>
                    <p className={`text-xs md:text-sm font-sans group-hover:text-white ${pathname.endsWith('/profile/about') ? 'text-white' : 'text-black/60'} transition-all duration-300 ease-in-out`}>About</p>
                </div>
            </Link>
            </div>
        </nav>
    </div>
  )
}

export default Nav