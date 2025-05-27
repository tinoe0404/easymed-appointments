"use client"

import type React from "react"

import { Calendar, Eye, EyeOff, Mail, Lock, User } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [patientForm, setPatientForm] = useState({
    email: "",
    password: "",
  })
  const [doctorForm, setDoctorForm] = useState({
    email: "",
    password: "",
  })
  const { toast } = useToast()
  const router = useRouter()

  const handlePatientLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate login process
    setTimeout(() => {
      if (patientForm.email && patientForm.password) {
        // Mock successful login
        localStorage.setItem("userType", "patient")
        localStorage.setItem("userEmail", patientForm.email)
        localStorage.setItem("userName", "John Doe")

        toast({
          title: "Login Successful",
          description: "Welcome back! Redirecting to your dashboard...",
        })

        router.push("/appointments")
      } else {
        toast({
          title: "Login Failed",
          description: "Please enter valid credentials.",
          variant: "destructive",
        })
      }
      setIsLoading(false)
    }, 1500)
  }

  const handleDoctorLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate login process
    setTimeout(() => {
      if (doctorForm.email && doctorForm.password) {
        // Mock successful login
        localStorage.setItem("userType", "doctor")
        localStorage.setItem("userEmail", doctorForm.email)
        localStorage.setItem("userName", "Dr. Sarah Johnson")

        toast({
          title: "Login Successful",
          description: "Welcome back, Doctor! Redirecting to your dashboard...",
        })

        router.push("/admin")
      } else {
        toast({
          title: "Login Failed",
          description: "Please enter valid credentials.",
          variant: "destructive",
        })
      }
      setIsLoading(false)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link className="flex items-center justify-center mb-4" href="/">
            <Calendar className="h-8 w-8 text-blue-600" />
            <span className="ml-2 text-2xl font-bold text-gray-900">EasyMed Appointments</span>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h1>
          <p className="text-gray-600">Sign in to your account to continue</p>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>Choose your account type to continue</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="patient" className="space-y-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="patient" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Patient
                </TabsTrigger>
                <TabsTrigger value="doctor" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Doctor
                </TabsTrigger>
              </TabsList>

              {/* Patient Login */}
              <TabsContent value="patient">
                <form onSubmit={handlePatientLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="patient-email">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="patient-email"
                        type="email"
                        placeholder="Enter your email"
                        className="pl-10"
                        value={patientForm.email}
                        onChange={(e) => setPatientForm({ ...patientForm, email: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="patient-password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="patient-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        className="pl-10 pr-10"
                        value={patientForm.password}
                        onChange={(e) => setPatientForm({ ...patientForm, password: e.target.value })}
                        required
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <Link href="/forgot-password" className="text-sm text-blue-600 hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
                    {isLoading ? "Signing in..." : "Sign In as Patient"}
                  </Button>
                </form>

                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-600">
                    Don't have an account?{" "}
                    <Link href="/register" className="text-blue-600 hover:underline">
                      Sign up here
                    </Link>
                  </p>
                </div>

                {/* Demo Credentials */}
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-xs text-blue-800 font-medium mb-1">Demo Credentials:</p>
                  <p className="text-xs text-blue-700">Email: patient@demo.com</p>
                  <p className="text-xs text-blue-700">Password: demo123</p>
                </div>
              </TabsContent>

              {/* Doctor Login */}
              <TabsContent value="doctor">
                <form onSubmit={handleDoctorLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="doctor-email">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="doctor-email"
                        type="email"
                        placeholder="Enter your email"
                        className="pl-10"
                        value={doctorForm.email}
                        onChange={(e) => setDoctorForm({ ...doctorForm, email: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="doctor-password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="doctor-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        className="pl-10 pr-10"
                        value={doctorForm.password}
                        onChange={(e) => setDoctorForm({ ...doctorForm, password: e.target.value })}
                        required
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <Link href="/forgot-password" className="text-sm text-blue-600 hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
                    {isLoading ? "Signing in..." : "Sign In as Doctor"}
                  </Button>
                </form>

                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-600">
                    Need a doctor account?{" "}
                    <Link href="/register-doctor" className="text-blue-600 hover:underline">
                      Apply here
                    </Link>
                  </p>
                </div>

                {/* Demo Credentials */}
                <div className="mt-4 p-3 bg-green-50 rounded-lg">
                  <p className="text-xs text-green-800 font-medium mb-1">Demo Credentials:</p>
                  <p className="text-xs text-green-700">Email: doctor@demo.com</p>
                  <p className="text-xs text-green-700">Password: demo123</p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Quick Access */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 mb-3">Quick Access</p>
          <div className="flex gap-3 justify-center">
            <Button variant="outline" size="sm" asChild>
              <Link href="/doctors">Browse Doctors</Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link href="/">Back to Home</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
