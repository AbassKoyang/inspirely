'use client'
import { useAuth } from '@/lib/contexts/authContext'
import defaultAvatar from '@/public/assets/images/default-avatar.png'
import { useFetchUser } from '@/lib/queries'
import { Divide, Ellipsis, Github, Globe, Instagram, Linkedin, Twitter } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'
import React, { useState } from 'react'
import { truncateText } from '@/lib/utils'
import ProfileInformationModal from '@/components/me/ProfileInformationModal'
import AddSocialForm from '@/components/me/AddSocialForm'

const SettingsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isWebsiteModalOpen, setisWebsiteModalOpen] = useState(false);
  const [isGithubModalOPen, setisGithubModalOPen] = useState(false);
  const [isInstagramModalOPen, setisInstagramModalOPen] = useState(false);
  const [isTwitterModalOPen, setisTwitterModalOPen] = useState(false);
  const [isLinkedInModalOPen, setisLinkedInModalOPen] = useState(false);
  const pathname = usePathname()
  const {user} = useAuth()
  const name = truncateText(`${user?.first_name} ${user?.last_name}`, 10)
  const email = truncateText(user?.email || '', 30)
  const website = truncateText(user?.website || '', 30)
  const github = truncateText(user?.github || '', 30)
  const linkedin = truncateText(user?.linkedin || '', 30)
  const twitter = truncateText(user?.twitter || '', 30)
  const instagram = truncateText(user?.instagram || '', 30)

  return (
    <div className="w-full h-dvh bg-white pt-0 md:pt-20">
        <div className="w-full flex items-center justify-between pt-4 py-2 md:py-6 border-b border-gray-100">
            <h1 className='font-sans text-2xl md:text-5xl font-semibold text-black'>Settings</h1>
        </div>
        <div className="w-full py-8">
          <div className="w-full flex items-center justify-between mb-8">
            <p className='font-sans text-sm font-normal text-black'>Email address</p>
            <p className='font-sans text-sm font-normal text-black/60'>{email}</p>
          </div>

          <button onClick={() => setIsModalOpen(true)} className="w-full flex items-center justify-between mb-8 group cursor-pointer">
            <div className="flex flex-col items-start max-w-[160px] md:max-w-fit">
              <p className='font-sans text-sm font-normal text-black'>Profile Information</p>
              <p className='font-sans text-xs font-normal text-black/60 text-left'>Edit your photo, name, short bio, etc.</p>
            </div>
            <div className="flex items-center gap-3">
              <p className='font-sans text-sm font-normal text-black/60 group-hover:text-black transition-all duration-300'>{name}</p>
              <div className='size-[25px] rounded-full overflow-hidden object-center object-cover cursor-pointer'>
                <Image
                className=''
                src={user?.profile_pic_url || defaultAvatar}
                width={25}
                height={25}
                alt='Profle Picture'
                />
              </div>
            </div>
          </button>
          <h3 className='font-sans text-base font-semibold text-black mb-5'>Socials</h3>
          <button onClick={() => setisWebsiteModalOpen(true)} className="w-full flex items-center justify-between mb-8 group cursor-pointer">
            <div className="flex items-center gap-2">
              <Globe  className='text-black size-4.5' />
              <p className='font-sans text-sm font-normal text-black'>Website</p>
            </div>
              {user?.website ? (
                <p className='font-sans text-sm font-normal text-black/60 max-w-[150px] lg:max-w-fit text-left'>{website}</p>
              ) : (
                <p className='font-sans text-sm font-normal text-emerald-700'>Add website</p>
              )}
          </button>
          <button onClick={() => setisGithubModalOPen(true)} className="w-full flex items-center justify-between mb-8 group cursor-pointer">
            <div className="flex items-center gap-2">
              <Github className='text-black size-4.5' />
              <p className='font-sans text-sm font-normal text-black'>Github account</p>
            </div>
              {user?.github ? (
                <p className='font-sans text-sm font-normal text-black/60 max-w-[150px] lg:max-w-fit text-left'>{github}</p>
              ) : (
                <p className='font-sans text-sm font-normal text-emerald-700'>Add github</p>
              )}
          </button>
          <button onClick={() => setisLinkedInModalOPen(true)} className="w-full flex items-center justify-between mb-8 group cursor-pointer">
            <div className="flex items-center gap-2">
              <Linkedin className='text-black size-4.5' />
              <p className='font-sans text-sm font-normal text-black'>LinkedIn account</p>
            </div>
              {user?.linkedin ? (
                <p className='font-sans text-sm font-normal text-black/60 max-w-[150px] lg:max-w-fit text-left'>{linkedin}</p>
              ) : (
                <p className='font-sans text-sm font-normal text-emerald-700'>Add LinkedIn</p>
              )}
          </button>
          <button onClick={() => setisTwitterModalOPen(true)} className="w-full flex items-center justify-between mb-8 group cursor-pointer">
            <div className="flex items-center gap-2">
              <Twitter className='text-black size-4.5' />
              <p className='font-sans text-sm font-normal text-black'>Twitter account</p>
            </div>
              {user?.twitter ? (
                <p className='font-sans text-sm font-normal text-black/60 max-w-[150px] lg:max-w-fit text-left'>{twitter}</p>
              ) : (
                <p className='font-sans text-sm font-normal text-emerald-700'>Add Twitter</p>
              )}
          </button>
          <button onClick={() => setisInstagramModalOPen(true)} className="w-full flex items-center justify-between mb-8 group cursor-pointer">
            <div className="flex items-center gap-2">
              <Instagram className='text-black size-4.5' />
              <p className='font-sans text-sm font-normal text-black'>Instagram account</p>
            </div>
              {user?.instagram ? (
                <p className='font-sans text-sm font-normal text-black/60 max-w-[150px] lg:max-w-fit text-left'>{instagram}</p>
              ) : (
                <p className='font-sans text-sm font-normal text-emerald-700'>Add Instagram</p>
              )}
          </button>
        </div>
        <ProfileInformationModal isModalOpen={isModalOpen} closeModal={() => setIsModalOpen(false)} />
        <AddSocialForm social='website' isModalOpen={isWebsiteModalOpen} closeModal={() => setisWebsiteModalOpen(false)} />
        <AddSocialForm social='github' isModalOpen={isGithubModalOPen} closeModal={() => setisGithubModalOPen(false)} />
        <AddSocialForm social='linkedin' isModalOpen={isLinkedInModalOPen} closeModal={() => setisLinkedInModalOPen(false)} />
        <AddSocialForm social='twitter' isModalOpen={isTwitterModalOPen} closeModal={() => setisTwitterModalOPen(false)} />
        <AddSocialForm social='instagram' isModalOpen={isInstagramModalOPen} closeModal={() => setisInstagramModalOPen(false)} />
    </div>
  )
}

export default SettingsPage