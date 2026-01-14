'use client';
import ProfilePostPreview from '@/components/profile/ProfilePostPreview';
import { useAuth } from '@/lib/contexts/authContext'
import { useFetchUser } from '@/lib/queries'
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const AboutPage = () => {
const [isSelf, setIsSelf] = useState(false)
const {user:sessionUser} = useAuth();
  const userId = useParams<{userId: string}>().userId
  const {data:user, isLoading, isError} = useFetchUser(userId);

  useEffect(() => {
    setIsSelf(user?.id == sessionUser?.id)
}, [user, sessionUser])

  return (
    <section className='w-full min-h-dvh overflow-x-hidden bg-white py-10'>
      {isLoading && (<p>
            Loading...
        </p>)}
        {isError && (<p>
            error occured...
        </p>)}
        {user &&  (
            <div className="w-full">
                <div className="w-full min-h-[350px] bg-gray-100/90 flex items-center justify-center">
                {user.about ? (<p>{user.about}</p>) : (
                    <>
                    {isSelf ? (
                        <div className='w-full flex flex-col justify-center items-center'>
                            <h4 className='font-sans text-black font-semibold text-lg'>Tell the world about yourself</h4>
                            <p className='mt-5 max-w-[350px] text-center font-sans text-black/60 text-sm'>Here’s where you can share more about yourself: your history, work experience, accomplishments, interests, dreams, and more. You can even add images and use rich text to personalize your bio.</p>
                            <button className='mt-5 bg-gray-100/90 text-black border border-black px-4.5 py-1 rounded-4xl cursor-pointer'>Get started</button>
                        </div>
                    ): null}
                    </>
                )}
                </div>
            </div>
        )}
    </section>
  )
}

export default AboutPage