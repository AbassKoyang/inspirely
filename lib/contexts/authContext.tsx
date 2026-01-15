'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { User } from '../schemas/user'
import axios from 'axios'
import { api } from '../api'
import { useFetchSessionUser } from '../queries'

const AuthContext = createContext<{
  user: User | null
  loading: boolean
}>({
  user: null,
  loading: true,
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const {data, isLoading, isError, error} = useFetchSessionUser()

  useEffect(() => {
    setLoading(true)
    const getUser = async () => {
      if(isLoading) setLoading(true)
      if(data) {
        setUser(data)
        setLoading(false)
      }
      if(isError) console.error(error)
    }
    getUser();
  }, [data])

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
