"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

interface AuthGuardProps {
  children: React.ReactNode
  requiredUserType?: "patient" | "doctor"
  redirectTo?: string
}

export function AuthGuard({ children, requiredUserType, redirectTo = "/login" }: AuthGuardProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = () => {
      const userType = localStorage.getItem("userType")
      const userEmail = localStorage.getItem("userEmail")

      if (!userType || !userEmail) {
        router.push(redirectTo)
        return
      }

      if (requiredUserType && userType !== requiredUserType) {
        router.push(redirectTo)
        return
      }

      setIsAuthenticated(true)
      setIsLoading(false)
    }

    checkAuth()
  }, [router, requiredUserType, redirectTo])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return <>{children}</>
}
