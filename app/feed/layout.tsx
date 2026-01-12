import Nav from '@/components/feed/Nav'
import LayoutWrapper from '@/components/LayoutWrapper'
import ProtectedRoute from '@/components/ProtectedRoute'
import React from 'react'

const layout = ({children} :{children: React.ReactNode}) => {
  return (
    <ProtectedRoute>
      <LayoutWrapper>
       <section className="w-full min-h-full px-4 md:px-12 md:pl-16">
        <Nav/>
          {children}
        </section>
      </LayoutWrapper>      
    </ProtectedRoute>
  )
}

export default layout