import Nav from '@/components/me/Nav'
import React from 'react'

const layout = ({children}:{children: React.ReactNode}) => {
  return (
    <div className='w-full bg-white pt-6 md:pt-14'>
        <Nav/>
        {children}
    </div>
  )
}

export default layout