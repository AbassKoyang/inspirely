'use client'

import { createContext, useContext, useEffect, useState } from 'react'
const SidebarContext = createContext<{
  isActive: boolean;
  setIsActive: (active: boolean) => void
}>({
  isActive: true,
  setIsActive: () => {}
})

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [isActive, setIsActive] = useState(true)

  return (
    <SidebarContext.Provider value={{ isActive, setIsActive }}>
      {children}
    </SidebarContext.Provider>
  )
}

export const useSideBarActive = () => useContext(SidebarContext)
