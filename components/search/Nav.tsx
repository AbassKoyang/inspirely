'use client'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import React from 'react'

const Nav = () => {
    const pathname = usePathname()
    const query = useSearchParams().get('q')
  return (
    <div className="w-full pt-14 bg-white">
        <h1 className='text-black/60 text-4xl font-semibold font-sans'>Results for <span className='text-black'>{query}</span></h1>
         <nav className="w-full py-4 pt-6 md:pt-10 bg-white sticky top-10 border-b border-gray-100 overflow-hidden z-200">
            <div className='min-w-full flex items-center gap-4 lg:gap-8 bg-white overflow-x-auto'>
            <Link href='/search'>
                <div className={`px-5 py-1 rounded-4xl min-w-[100px] border ${pathname == '/search' ? 'bg-emerald-700/90 border-emerald-700/90' : 'bg-white border-black/60'} text-white flex items-center justify-center hover:bg-emerald-700 hover:border-emerald-700 group transition-all duration-300 ease-in-out`}>
                    <p className={`text-sm md:text-[16px] font-sans group-hover:text-white ${pathname == '/search' ? 'text-white' : 'text-black/60'} transition-all duration-300 ease-in-out`}>Articles</p>
                </div>
            </Link>
            <Link href='/search/users'>
                <div className={`px-5 py-1 rounded-4xl min-w-[100px] border ${pathname == '/search/users' ? 'bg-emerald-700/90 border-emerald-700/90' : 'bg-white border-black/60'} text-white flex items-center justify-center hover:bg-emerald-700 hover:border-emerald-700 group transition-all duration-300 ease-in-out`}>
                    <p className={`text-sm md:text-[16px] font-sans group-hover:text-white ${pathname == '/search/users' ? 'text-white' : 'text-black/60'} transition-all duration-300 ease-in-out`}>People</p>
                </div>
            </Link>
            <Link href='/search/categories'>
                <div className={`px-5 py-1 rounded-4xl min-w-[100px] border ${pathname == '/search/categories' ? 'bg-emerald-700/90 border-emerald-700/90' : 'bg-white border-black/60'} text-white flex items-center justify-center hover:bg-emerald-700 hover:border-emerald-700 group transition-all duration-300 ease-in-out`}>
                    <p className={`text-sm md:text-[16px] font-sans group-hover:text-white ${pathname == '/search/categories' ? 'text-white' : 'text-black/60'} transition-all duration-300 ease-in-out`}>Categories</p>
                </div>
            </Link>
            </div>
        </nav>
    </div>
  )
}

export default Nav