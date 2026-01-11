import Nav from '@/components/feed/Nav'
import ProtectedRoute from '@/components/ProtectedRoute'
import React from 'react'

const layout = ({children} :{children: React.ReactNode}) => {
  return (
    <ProtectedRoute>
       <section className="w-full min-h-full px-4 [@media(min-width:375px)]:px-6 overflow-x-hidden">
        <Nav/>
        {children}
      </section>
    </ProtectedRoute>
  )
}

export default layout