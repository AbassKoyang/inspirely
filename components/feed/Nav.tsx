'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const Nav = () => {
    const pathname = usePathname()
  return (
    <nav className="w-full py-4 pt-6 md:pt-10 bg-white sticky top-10 border-b border-gray-100 overflow-hidden">
        <div className='min-w-full flex items-center gap-4 lg:gap-8 bg-white overflow-x-auto'>
        <Link href='/feed'>
            <div className={`px-5 py-1 rounded-4xl min-w-[100px] border ${pathname == '/feed' ? 'bg-emerald-600/90 border-emerald-600/90' : 'bg-white border-black/60'} text-white flex items-center justify-center hover:bg-emerald-600 hover:border-emerald-600 group transition-all duration-300 ease-in-out`}>
                <p className={`text-sm md:text-[16px] font-sans group-hover:text-white ${pathname == '/feed' ? 'text-white' : 'text-black/60'} transition-all duration-300 ease-in-out`}>For you</p>
            </div>
        </Link>
        <Link href='/feed/following'>
            <div className={`px-5 py-1 rounded-4xl min-w-[100px] border ${pathname == '/feed/following' ? 'bg-emerald-600/90 border-emerald-600/90' : 'bg-white border-black/60'} text-white flex items-center justify-center hover:bg-emerald-600 hover:border-emerald-600 group transition-all duration-300 ease-in-out`}>
                <p className={`text-sm md:text-[16px] font-sans group-hover:text-white ${pathname == '/feed/following' ? 'text-white' : 'text-black/60'} transition-all duration-300 ease-in-out`}>Following</p>
            </div>
        </Link>
        <Link href='/feed/trending'>
            <div className={`px-5 py-1 rounded-4xl min-w-[100px] border ${pathname == '/feed/trending' ? 'bg-emerald-600/90 border-emerald-600/90' : 'bg-white border-black/60'} text-white flex items-center justify-center hover:bg-emerald-600 hover:border-emerald-600 group transition-all duration-300 ease-in-out`}>
                <p className={`text-sm md:text-[16px] font-sans group-hover:text-white ${pathname == '/feed/trending' ? 'text-white' : 'text-black/60'} transition-all duration-300 ease-in-out`}>Trending</p>
            </div>
        </Link>
        <Link href='/feed/latest'>
            <div className={`px-5 py-1 rounded-4xl min-w-[100px] border ${pathname == '/feed/latest' ? 'bg-emerald-600/90 border-emerald-600/90' : 'bg-white border-black/60'} text-white flex items-center justify-center hover:bg-emerald-600 hover:border-emerald-600 group transition-all duration-300 ease-in-out`}>
                <p className={`text-sm md:text-[16px] font-sans group-hover:text-white ${pathname == '/feed/latest' ? 'text-white' : 'text-black/60'} transition-all duration-300 ease-in-out`}>Latest</p>
            </div>
        </Link>
        </div>
    </nav>
  )
}

export default Nav