'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import {motion} from 'motion/react'


const Nav = () => {
    const pathname = usePathname()
    const [visible, setVisible] = useState(true);
    const lastScrollY = useRef(0)
    const [isMobile, setIsMobile] = useState(false)

  
  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 768)
    }
  
    checkScreen()
    window.addEventListener('resize', checkScreen)
  
    return () => window.removeEventListener('resize', checkScreen)
  }, [])
  
  
    useEffect(() => {
        if (!isMobile) return
        const handleScroll = () => {
          const currentScrollY = window.scrollY
    
          if (currentScrollY <= 0) {
            setVisible(true)
            lastScrollY.current = currentScrollY
            return
          }
    
          if (Math.abs(currentScrollY - lastScrollY.current) < 15) {
            return
          }
    
          if (currentScrollY < lastScrollY.current) {
            setVisible(true)
          } 
          else {
            setVisible(false)
          }
    
          lastScrollY.current = currentScrollY
        }
    
        window.addEventListener('scroll', handleScroll, { passive: true })
    
        return () => {
          window.removeEventListener('scroll', handleScroll)
        }
      }, [isMobile])

  return (
    <motion.nav  initial={{y:0}} animate={{y: visible ? 0 : '-85%', animationDuration: 1, transition: {type: 'tween'}}} className="w-full py-4 pt-6 md:pt-10 bg-white sticky top-12 border-b border-gray-100 overflow-hidden z-200">
        <div className='min-w-full flex items-center gap-4 lg:gap-8 bg-white overflow-x-auto'>
        <Link href='/feed'>
            <div className={`px-5 py-1 rounded-4xl min-w-[100px] border ${pathname == '/feed' ? 'bg-emerald-700/90 border-emerald-700/90' : 'bg-white border-black/60'} text-white flex items-center justify-center hover:bg-emerald-700 hover:border-emerald-700 group transition-all duration-300 ease-in-out`}>
                <p className={`text-sm md:text-[16px] font-sans group-hover:text-white ${pathname == '/feed' ? 'text-white' : 'text-black/60'} transition-all duration-300 ease-in-out`}>For you</p>
            </div>
        </Link>
        <Link href='/feed/following'>
            <div className={`px-5 py-1 rounded-4xl min-w-[100px] border ${pathname == '/feed/following' ? 'bg-emerald-700/90 border-emerald-700/90' : 'bg-white border-black/60'} text-white flex items-center justify-center hover:bg-emerald-700 hover:border-emerald-700 group transition-all duration-300 ease-in-out`}>
                <p className={`text-sm md:text-[16px] font-sans group-hover:text-white ${pathname == '/feed/following' ? 'text-white' : 'text-black/60'} transition-all duration-300 ease-in-out`}>Following</p>
            </div>
        </Link>
        <Link href='/feed/trending'>
            <div className={`px-5 py-1 rounded-4xl min-w-[100px] border ${pathname == '/feed/trending' ? 'bg-emerald-700/90 border-emerald-700/90' : 'bg-white border-black/60'} text-white flex items-center justify-center hover:bg-emerald-700 hover:border-emerald-700 group transition-all duration-300 ease-in-out`}>
                <p className={`text-sm md:text-[16px] font-sans group-hover:text-white ${pathname == '/feed/trending' ? 'text-white' : 'text-black/60'} transition-all duration-300 ease-in-out`}>Trending</p>
            </div>
        </Link>
        <Link href='/feed/latest'>
            <div className={`px-5 py-1 rounded-4xl min-w-[100px] border ${pathname == '/feed/latest' ? 'bg-emerald-700/90 border-emerald-700/90' : 'bg-white border-black/60'} text-white flex items-center justify-center hover:bg-emerald-700 hover:border-emerald-700 group transition-all duration-300 ease-in-out`}>
                <p className={`text-sm md:text-[16px] font-sans group-hover:text-white ${pathname == '/feed/latest' ? 'text-white' : 'text-black/60'} transition-all duration-300 ease-in-out`}>Latest</p>
            </div>
        </Link>
        </div>
    </motion.nav>
  )
}

export default Nav