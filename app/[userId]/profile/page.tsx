'use client';
import ProfilePostPreview from '@/components/profile/ProfilePostPreview';
import { useAuth } from '@/lib/contexts/authContext'
import { useFetchUserPosts } from '@/lib/queries'
import { useParams } from 'next/navigation';
import React from 'react'

const ProfilePage = () => {
  const userId = useParams<{userId: string}>().userId
  const {user} = useAuth()
  const {data, isLoading, isError} = useFetchUserPosts(userId || '')
  return (
    <section className='w-full min-h-dvh overflow-x-hidden bg-white'>
      {isLoading && (<p>
            Loading...
        </p>)}
        {isError && (<p>
            error occured...
        </p>)}
        {data && data.results.map((post) => (
            <ProfilePostPreview post={post} />
        ))}
    </section>
  )
}

export default ProfilePage