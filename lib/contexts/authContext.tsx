'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { User } from '../schemas/user'
import axios from 'axios'

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

  useEffect(() => {
    const getUser = async () => {
        setLoading(true)
        try {
            const response = await axios.get(`/api/auth/me/`, {withCredentials: true})
            setUser(response.data)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    getUser();
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
