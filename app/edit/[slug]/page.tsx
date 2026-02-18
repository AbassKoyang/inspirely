'use client';
import { Bell, Ellipsis, ImagePlus, RotateCcw, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import defaultAvatar from '@/public/assets/images/default-avatar.png'
import { useAuth } from '@/lib/contexts/authContext'

import EditComponent from '@/components/feed/EditComponent';
import { useParams, useRouter } from 'next/navigation';
import { useFetchPost } from '@/lib/queries';
import { useState } from 'react';
import ProfileDropdown from '@/components/ProfileDropdown';

const EditPage = () => {
   const [isSidebarOpen, setisSidebarOpen] = useState(false)
   const [isMoreOpen, setisMoreOpen] = useState(false)
    const slug = useParams<{slug: string}>().slug
    const {data: post, isLoading, isError} = useFetchPost(slug)
    const {user} = useAuth()
    const router = useRouter()
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false)

  

  return (
    <section className='w-full min-h-dvh flex items-center flex-col bg-white'>
      <div className="w-full max-w-5xl flex items-center justify-between py-4">
        <div className="flex items-center gap-3">
          <Link href="/feed" className="text-xl md:text-3xl font-bold text-emerald-700 transition-colors hover:text-emerald-700">
                Inspirely
          </Link>
          <div className="w-px h-6 bg-gray-300 hidden lg:block"></div>
          <h3 className='font-sans font-semibold text-lg text-black hidden lg:block'>{user?.first_name} {user?.last_name}</h3>
        </div>

        <div className="flex items-center gap-7">
          <div className="flex items-center gap-4">
            <button onClick={() => router.back()} className='text-black/60 text-xs font-sans cursor-pointer'>Back</button>
            <button onClick={() => setisSidebarOpen(!isSidebarOpen)} className='text-xs py-[5px] px-4.5 text-white bg-emerald-700/90 hover:bg-emerald-700 rounded-4xl transition-all duration-200 ease-in-out cursor-pointer'>
              Save and Publish
            </button>
          </div>

          <div className='flex items-center gap-5 md:gap-5'>
              <div className="relative">
                <button onClick={() => setisMoreOpen(!isMoreOpen)} className='cursor-pointer'>
                  <Ellipsis strokeWidth={1} className='size-5.5 text-black/70 hover:text-black transition-all duration-200 ease-in-out' />
                </button>
                <div  className={`${isMoreOpen ? 'block' : 'hidden'} absolute left-[50%] translate-x-[-50%] bottom-[-80px]`}>
                  <div className=" bg-white relative p-2 justify-center rounded-xs shadow-sm w-[200px]">
                    <button className="w-full py-1 text-black/60 hover:text-black cursor-pointer font-sans text-sm flex items-center justify-start px-2">Cancel editing</button>
                    <button className="w-full py-1 text-black/60 hover:text-black cursor-pointer font-sans text-sm flex items-center justify-start px-2">Share</button>
                    <div className="size-4 bg-white absolute left-[50%] translate-x-[-50%] top-[-8px] rotate-45 border border-gray-200 z-[-1]"></div>
                  </div>
                </div>
              </div>

              <Link href='#'>
                <Bell strokeWidth={1} className='size-5.5 text-black/70 hover:text-black transition-all duration-200 ease-in-out' />
              </Link>

              <div className="relative">
                <button onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)} className={`size-[33px] rounded-full overflow-hidden cursor-pointer relative ${isProfileDropdownOpen ? 'outline-2 outline-offset-1 outline-emerald-700' : 'outline-0'}`}>
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
                </button>
                {user && <ProfileDropdown user={user} isOpen={isProfileDropdownOpen} />}
              </div>
            </div>
        </div>
        </div>

        {isLoading && (
            <p>Loading...</p>
        )}
        {isError && (
            <p>An error occurred</p>
        )}

      {post && (
        <EditComponent post={post} isSidebarOpen={isSidebarOpen} closeSidebar={() => setisSidebarOpen(false)} />
      )}
    </section>
  )
}

export default EditPage