'use client';
import { User } from '@/lib/schemas/user'
import Image from 'next/image'
import React, { use } from 'react'
import defaultAvatar from '@/public/assets/images/default-avatar.png'
import Link from 'next/link'
import { truncateText } from '@/lib/utils'
import { HelpCircle, Info, Settings } from 'lucide-react'
import { api } from '@/lib/api'
import { useRouter } from 'next/navigation';


const ProfileDropdown = ({user, isOpen}:{user:User, isOpen:boolean}) => {
    const name = truncateText(`${user.first_name} ${user.last_name}`, 12)
    const router = useRouter()
    const handleSignout = async () => {
        try {
            const response = await api.post('/api/auth/logout/')
            console.log(response.data)
            window.location.replace('/login')
        } catch (error) {
            console.log("Error logging out")
        }
    }

  return (
    <div className={`p-6 shadow-md rounded-md bg-white absolute right-0 bottom-[-320px] w-[260px] ${isOpen ? 'block' : 'hidden'} z-500`}>
        <Link href={`/${user.id}/profile`} className="w-full flex items-center gap-6 group">
            <div className='size-[45px] rounded-full overflow-hidden cursor-pointer relative'>
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
                <h4 className='text-base font-sans text-black/60 group-hover:text-black'>{name}</h4>
                <p className='text-xs font-sans text-black/60 group-hover:text-black'>View profile</p>
            </div>
        </Link>
       
            <div className="w-full py-2 mt-5">
                <Link href={`/me/settings`} className='flex items-center gap-3 py-2 group'>
                    <Settings strokeWidth={1} className='text-black/60 size-[24px] group-hover:text-black' />
                    <p className='text-sm font-sans text-black/60 group-hover:text-black'>Settings</p>
                </Link>
                <Link href={`/me/settings`} className='flex items-center gap-3 py-2 group'>
                    <HelpCircle strokeWidth={1} className='text-black/60 size-[24px] group-hover:text-black' />
                    <p className='text-sm font-sans text-black/60 group-hover:text-black'>Help</p>
                </Link>
            </div>

            <div className="w-full py-2 mt-5 border-t border-gray-100">
                <button onClick={handleSignout} className='py-2 group cursor-pointer'>
                    <p className='text-sm font-sans text-black/60 group-hover:text-black flex justify-start'>Sign out</p>
                    <p className='text-xs font-sans text-black/60 group-hover:text-black'>{user.email.substring(0,3)}...........{user.email.substring(user.email.length - 10, user.email.length)}</p>
                </button>
            </div>
    </div>
  )
}

export default ProfileDropdown