'use client'
import { useSideBarActive } from '@/lib/contexts/sidebardContext'
import React from 'react'
import SideBar from './SideBar'

const LayoutWrapper = ({children}: {children: React.ReactNode}) => {
    const {isActive} = useSideBarActive() 
  return (
    <div className="w-full flex justify-between">
        <div className={`hidden md:block ${isActive? 'w-[18%]' : 'w-0'} h-dvh fixed top-0 left-0 bg-white transition-all duration-400 ease-in-out overflow-hidden border-r border-gray-100`}>
        <SideBar/>
        </div>
        <div className={`hidden md:block ${isActive? 'w-[18%]' : 'w-0'} h-dvh bg-white transition-all duration-400 ease-in-out`}>
        </div>
        <div className={`w-full ${isActive? 'md:w-[82%]' : 'w-full'} bg-white transition-all duration-400 ease-in-out flex justify-between`}>
        {children}
        </div>
    </div>
  )
}

export default LayoutWrapper