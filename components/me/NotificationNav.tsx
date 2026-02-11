'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const NotificatonNav = () => {
    const pathname = usePathname()
  return (
    <div>
        <h1 className='text-black text-2xl lg:text-5xl font-semibold font-sans tracking-tight'>Notifications</h1>
         <nav className="w-full py-4 pt-6 md:pt-8 bg-white sticky top-10 border-b border-gray-100 overflow-hidden z-200">
            <div className='min-w-full flex items-center gap-4 lg:gap-6 bg-white overflow-x-auto'>
            <Link href={`/me/notifications`}>
                <div className={`px-5 py-1 rounded-4xl min-w-[100px] border ${pathname == '/me/notifications' ? 'bg-emerald-700/90 border-emerald-700/90' : 'bg-white border-black/60'} text-white flex items-center justify-center hover:bg-emerald-700 hover:border-emerald-700 group transition-all duration-300 ease-in-out`}>
                    <p className={`text-sm md:text-[16px] font-sans group-hover:text-white ${pathname == '/me/notifications' ? 'text-white' : 'text-black/60'} transition-all duration-300 ease-in-out`}>All</p>
                </div>
            </Link>
            <Link href={`/me/notifications/responses`}>
                <div className={`px-5 py-1 rounded-4xl min-w-[100px] border ${pathname == '/me/notifications/responses' ? 'bg-emerald-700/90 border-emerald-700/90' : 'bg-white border-black/60'} text-white flex items-center justify-center hover:bg-emerald-700 hover:border-emerald-700 group transition-all duration-300 ease-in-out`}>
                    <p className={`text-sm md:text-[16px] font-sans group-hover:text-white ${pathname == '/me/notifications/responses' ? 'text-white' : 'text-black/60'} transition-all duration-300 ease-in-out`}>Responses</p>
                </div>
            </Link>
            </div>
        </nav>
    </div>
  )
}

export default NotificatonNav