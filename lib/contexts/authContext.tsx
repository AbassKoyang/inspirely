'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { User } from '@/lib/schemas/user'

interface AuthContextType {
  user: User | null
  loading: boolean
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
})

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  /**
   * Decode JWT without any library
   */
  const decodeJWT = (token: string) => {
    try {
      const payload = token.split('.')[1]
      return JSON.parse(atob(payload))
    } catch (error) {
      return null
    }
  }

  useEffect(() => {
    const loadUser = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken')

        if (!accessToken) {
          setUser(null)
          return
        }

        const decoded = decodeJWT(accessToken)

        if (!decoded?.user_id && !decoded?.id) {
          setUser(null)
          return
        }

        const userId = decoded.user_id || decoded.id

        const res = await fetch(
          `http://localhost:8000/api/users/${userId}/`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )

        if (!res.ok) {
          setUser(null)
          return
        }

        const userData: User = await res.json()
        setUser(userData)
      } catch (error) {
        console.error('Auth error:', error)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    loadUser()
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
export default AuthProvider