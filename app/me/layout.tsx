import LayoutWrapper from '@/components/LayoutWrapper'
import Nav from '@/components/profile/Nav'
import ProfileSidebar from '@/components/profile/ProfileSidebar'
import ProtectedRoute from '@/components/ProtectedRoute'
import React from 'react'

const layout = ({children} :{children: React.ReactNode}) => {
  return (
    <ProtectedRoute>
      <LayoutWrapper>
       <section className="w-full md:w-[70%] min-h-full px-4 md:px-12 md:pl-16 pt-0 md:pt-20 md:border-r border-gray-100">
          {children}
        </section>
      </LayoutWrapper>      
    </ProtectedRoute>
  )
}

export default layout