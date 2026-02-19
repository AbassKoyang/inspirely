'use client';
import ProfilePostPreview from '@/components/profile/ProfilePostPreview';
import { ProfilePostPreviewSkeleton } from '@/components/skeletons/ProfilePostPreviewSkeleton';
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
      {isLoading && (
        <div className="w-full">
          {Array.from({length: 5}).map((_,i) => (
                <ProfilePostPreviewSkeleton key={i} />
            ))}
        </div>
      )}
        {isError && (
          <div className="w-full h-[60vh] flex items-center justify-center">
            <p className='text-base font-sans text-black/60'>Oops! Failed to load user articles..</p>
          </div>
        )}
        {data && data.results.map((post) => (
            <ProfilePostPreview post={post} />
        ))}
    </section>
  )
}

export default ProfilePage