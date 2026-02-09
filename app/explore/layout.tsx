import Nav from '@/components/explore/Nav'
import LayoutWrapper from '@/components/LayoutWrapper'
import ProtectedRoute from '@/components/ProtectedRoute'
import React from 'react'

const layout = ({children}: {children: React.ReactNode}) => {
  return (
    <ProtectedRoute>
        <LayoutWrapper>
        <section className="w-full min-h-full px-6 bg-white flex">
        <div className="w-full bg-white">
            <Nav/>
            {children}
        </div>
        </section>
        </LayoutWrapper>      
    </ProtectedRoute>
  )
}

export default layout