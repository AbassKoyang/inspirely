'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const Nav = () => {
    const pathname = usePathname()
  return (
    <div className="w-full p-6 bg-white flex items-center gap-8 py-10">
        <Link href='/feed'>
            <div className={`px-5 py-1 rounded-4xl border ${pathname == '/feed' ? 'bg-emerald-600/90 border-emerald-600/90' : 'bg-white border-black/60'} text-white flex items-center justify-center hover:bg-emerald-600 hover:border-emerald-600 group transition-all duration-300 ease-in-out`}>
                <p className={`text-sm md:text-lg font-sans group-hover:text-white ${pathname == '/feed' ? 'text-white' : 'text-black/60'} transition-all duration-300 ease-in-out`}>For you</p>
            </div>
        </Link>
        <Link href='/feed/following'>
            <div className={`px-5 py-1 rounded-4xl border ${pathname == '/feed/following' ? 'bg-emerald-600/90 border-emerald-600/90' : 'bg-white border-black/60'} text-white flex items-center justify-center hover:bg-emerald-600 hover:border-emerald-600 group transition-all duration-300 ease-in-out`}>
                <p className={`text-sm md:text-lg font-sans group-hover:text-white ${pathname == '/feed/following' ? 'text-white' : 'text-black/60'} transition-all duration-300 ease-in-out`}>Following</p>
            </div>
        </Link>
        <Link href='/feed/trending'>
            <div className={`px-5 py-1 rounded-4xl border ${pathname == '/feed/trending' ? 'bg-emerald-600/90 border-emerald-600/90' : 'bg-white border-black/60'} text-white flex items-center justify-center hover:bg-emerald-600 hover:border-emerald-600 group transition-all duration-300 ease-in-out`}>
                <p className={`text-sm md:text-lg font-sans group-hover:text-white ${pathname == '/feed/trending' ? 'text-white' : 'text-black/60'} transition-all duration-300 ease-in-out`}>Trending</p>
            </div>
        </Link>
        <Link href='/feed/latest'>
            <div className={`px-5 py-1 rounded-4xl border ${pathname == '/feed/latest' ? 'bg-emerald-600/90 border-emerald-600/90' : 'bg-white border-black/60'} text-white flex items-center justify-center hover:bg-emerald-600 hover:border-emerald-600 group transition-all duration-300 ease-in-out`}>
                <p className={`text-sm md:text-lg font-sans group-hover:text-white ${pathname == '/feed/latest' ? 'text-white' : 'text-black/60'} transition-all duration-300 ease-in-out`}>Latest</p>
            </div>
        </Link>

    </div>
  )
}

export default Nav