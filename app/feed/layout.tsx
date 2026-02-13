import HomeSidebar from '@/components/feed/HomeSidebar'
import Nav from '@/components/feed/Nav'
import LayoutWrapper from '@/components/LayoutWrapper'
import ProfileSidebar from '@/components/profile/ProfileSidebar'
import ProtectedRoute from '@/components/ProtectedRoute'
import React from 'react'

const layout = ({children} :{children: React.ReactNode}) => {
  return (
    <ProtectedRoute>
      <LayoutWrapper>
       <section className="w-full min-h-full px-4 md:pl-10 bg-white flex">
        <div className="w-full lg:w-[70%] md:pr-10 md:border-r md:border-gray-100">
          <Nav/>
          {children}
        </div>
          <HomeSidebar />
        </section>
      </LayoutWrapper>      
    </ProtectedRoute>
  )
}

export default layout