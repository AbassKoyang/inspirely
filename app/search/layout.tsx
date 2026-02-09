import HomeSidebar from '@/components/feed/HomeSidebar'
import LayoutWrapper from '@/components/LayoutWrapper'
import ProfileSidebar from '@/components/profile/ProfileSidebar'
import ProtectedRoute from '@/components/ProtectedRoute'
import Nav from '@/components/search/Nav'
import React from 'react'

const layout = ({children} :{children: React.ReactNode}) => {
  return (
    <ProtectedRoute>
      <LayoutWrapper>
       <section className="w-full min-h-full px-4 md:pl-10 bg-white flex">
        <div className="w-full">
          {children}
        </div>
        </section>
      </LayoutWrapper>      
    </ProtectedRoute>
  )
}

export default layout