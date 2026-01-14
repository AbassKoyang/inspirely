'use client'
import { useAuth } from '@/lib/contexts/authContext'
import defaultAvatar from '@/public/assets/images/default-avatar.png'
import { useFetchUser } from '@/lib/queries'
import { Divide, Ellipsis, Github, Globe, Instagram, Linkedin, Twitter } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'
import React from 'react'
import { truncateText } from '@/lib/utils'
import ProfileInformationModal from '@/components/me/ProfileInformationModal'

const SettingsPage = () => {
    const pathname = usePathname()
    const {user} = useAuth()
    const name = truncateText(`${user?.first_name} ${user?.last_name}`, 15)
    const email = truncateText(user?.email || '', 15)
    const website = truncateText(user?.website || '', 15)
    const github = truncateText(user?.github || '', 15)
    const linkedin = truncateText(user?.linkedin || '', 15)
    const twitter = truncateText(user?.twitter || '', 15)
    const instagram = truncateText(user?.instagram || '', 15)

  return (
    <div className="w-full h-dvh bg-white">
        <div className="w-full flex items-center justify-between pt-4 py-2 md:py-6 border-b border-gray-100">
            <h1 className='font-sans text-2xl md:text-5xl font-semibold text-black'>Settings</h1>
        </div>
        <div className="w-full py-8">
          <div className="w-full flex items-center justify-between mb-8">
            <p className='font-sans text-sm font-normal text-black'>Email address</p>
            <p className='font-sans text-sm font-normal text-black/60'>{email}</p>
          </div>

          <button className="w-full flex items-center justify-between mb-8 group cursor-pointer">
            <div className="flex flex-col items-start max-w-[200px] md:max-w-fit">
              <p className='font-sans text-sm font-normal text-black'>Profile Information</p>
              <p className='font-sans text-xs font-normal text-black/60'>Edit your photo, name, short bio, etc.</p>
            </div>
            <div className="flex items-center gap-3">
              <p className='font-sans text-sm font-normal text-black/60 group-hover:text-black transition-all duration-300'>{name}</p>
              <div className='size-[25px] rounded-full overflow-hidden object-center object-cover cursor-pointer'>
                <Image
                className='size-full'
                src={user?.profile_pic_url || defaultAvatar}
                width={25}
                height={25}
                alt='Profle Picture'
                />
              </div>
            </div>
          </button>
          <h3 className='font-sans text-base font-semibold text-black mb-5'>Socials</h3>
          <button className="w-full flex items-center justify-between mb-8 group cursor-pointer">
            <div className="flex items-center gap-2">
              <Globe  className='text-black size-4.5' />
              <p className='font-sans text-sm font-normal text-black'>Website</p>
            </div>
              {user?.website ? (
                <p className='font-sans text-sm font-normal text-black/60'>{website}</p>
              ) : (
                <p className='font-sans text-sm font-normal text-emerald-600'>Add website</p>
              )}
          </button>
          <button className="w-full flex items-center justify-between mb-8 group cursor-pointer">
            <div className="flex items-center gap-2">
              <Github className='text-black size-4.5' />
              <p className='font-sans text-sm font-normal text-black'>Github account</p>
            </div>
              {user?.github ? (
                <p className='font-sans text-sm font-normal text-black/60'>{github}</p>
              ) : (
                <p className='font-sans text-sm font-normal text-emerald-600'>Add github</p>
              )}
          </button>
          <button className="w-full flex items-center justify-between mb-8 group cursor-pointer">
            <div className="flex items-center gap-2">
              <Linkedin className='text-black size-4.5' />
              <p className='font-sans text-sm font-normal text-black'>LinkedIn account</p>
            </div>
              {user?.linkedin ? (
                <p className='font-sans text-sm font-normal text-black/60'>{linkedin}</p>
              ) : (
                <p className='font-sans text-sm font-normal text-emerald-600'>Add LinkedIn</p>
              )}
          </button>
          <button className="w-full flex items-center justify-between mb-8 group cursor-pointer">
            <div className="flex items-center gap-2">
              <Twitter className='text-black size-4.5' />
              <p className='font-sans text-sm font-normal text-black'>Twitter account</p>
            </div>
              {user?.twitter ? (
                <p className='font-sans text-sm font-normal text-black/60'>{twitter}</p>
              ) : (
                <p className='font-sans text-sm font-normal text-emerald-600'>Add Twitter</p>
              )}
          </button>
          <button className="w-full flex items-center justify-between mb-8 group cursor-pointer">
            <div className="flex items-center gap-2">
              <Instagram className='text-black size-4.5' />
              <p className='font-sans text-sm font-normal text-black'>Instagram account</p>
            </div>
              {user?.instagram ? (
                <p className='font-sans text-sm font-normal text-black/60'>{instagram}</p>
              ) : (
                <p className='font-sans text-sm font-normal text-emerald-600'>Add Instagram</p>
              )}
          </button>
        </div>
        <ProfileInformationModal />
    </div>
  )
}

export default SettingsPage