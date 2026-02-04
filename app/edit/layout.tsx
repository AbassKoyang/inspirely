import LayoutWrapper from '@/components/LayoutWrapper'
import Nav from '@/components/profile/Nav'
import ProfileSidebar from '@/components/profile/ProfileSidebar'
import ProtectedRoute from '@/components/ProtectedRoute'
import React from 'react'

const layout = ({children} :{children: React.ReactNode}) => {
  return (
    <ProtectedRoute>
       <section className="w-full min-h-dvh px-4 md:px-6">
          {children}
        </section>
    </ProtectedRoute>
  )
}

export default layout