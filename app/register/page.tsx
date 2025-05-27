"use client"

import type React from "react"

import { Calendar, Eye, EyeOff, Mail, Lock, User, Phone, MapPin } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"
import { Progress } from "@/components/ui/progress"

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [agreeToTerms, setAgreeToTerms] = useState(false)
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    address: "",
    password: "",
    confirmPassword: "",
  })
  const { toast } = useToast()
  const router = useRouter()

  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    feedback: "",
    color: "bg-gray-200",
    requirements: {
      length: false,
      uppercase: false,
      lowercase: false,
      number: false,
      special: false,
    },
  })

  const checkPasswordStrength = (password: string) => {
    const requirements = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    }

    const score = Object.values(requirements).filter(Boolean).length
    let feedback = ""
    let color = "bg-gray-200"

    switch (score) {
      case 0:
      case 1:
        feedback = "Very Weak"
        color = "bg-red-500"
        break
      case 2:
        feedback = "Weak"
        color = "bg-orange-500"
        break
      case 3:
        feedback = "Fair"
        color = "bg-yellow-500"
        break
      case 4:
        feedback = "Good"
        color = "bg-blue-500"
        break
      case 5:
        feedback = "Strong"
        color = "bg-green-500"
        break
    }

    setPasswordStrength({ score, feedback, color, requirements })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!agreeToTerms) {
      toast({
        title: "Terms Required",
        description: "Please agree to the terms and conditions.",
        variant: "destructive",
      })
      return
    }

    if (form.password !== form.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match.",
        variant: "destructive",
      })
      return
    }

    if (passwordStrength.score < 3) {
      toast({
        title: "Weak Password",
        description: "Please create a stronger password with at least 3 requirements met.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    // Simulate registration process
    setTimeout(() => {
      toast({
        title: "Registration Successful",
        description: "Your account has been created. Please sign in to continue.",
      })
      router.push("/login")
      setIsLoading(false)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <Link className="flex items-center justify-center mb-4" href="/">
            <Calendar className="h-8 w-8 text-blue-600" />
            <span className="ml-2 text-2xl font-bold text-gray-900">EasyMed Appointments</span>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Create Your Account</h1>
          <p className="text-gray-600">Join thousands of patients using EasyMed</p>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Patient Registration</CardTitle>
            <CardDescription>Fill in your details to create a new patient account</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Personal Information</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="firstName"
                        placeholder="Enter your first name"
                        className="pl-10"
                        value={form.firstName}
                        onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="lastName"
                        placeholder="Enter your last name"
                        className="pl-10"
                        value={form.lastName}
                        onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      className="pl-10"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="phone"
                        placeholder="Enter your phone number"
                        className="pl-10"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dateOfBirth">Date of Birth</Label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={form.dateOfBirth}
                      onChange={(e) => setForm({ ...form, dateOfBirth: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="address"
                      placeholder="Enter your full address"
                      className="pl-10"
                      value={form.address}
                      onChange={(e) => setForm({ ...form, address: e.target.value })}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Security */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Security</h3>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a strong password"
                      className="pl-10 pr-10"
                      value={form.password}
                      onChange={(e) => {
                        setForm({ ...form, password: e.target.value })
                        checkPasswordStrength(e.target.value)
                      }}
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

                  {/* Password Strength Meter */}
                  {form.password && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Password Strength:</span>
                        <span
                          className={`text-sm font-medium ${
                            passwordStrength.score <= 2
                              ? "text-red-600"
                              : passwordStrength.score === 3
                                ? "text-yellow-600"
                                : passwordStrength.score === 4
                                  ? "text-blue-600"
                                  : "text-green-600"
                          }`}
                        >
                          {passwordStrength.feedback}
                        </span>
                      </div>
                      <Progress value={(passwordStrength.score / 5) * 100} className="h-2" />

                      {/* Password Requirements */}
                      <div className="grid grid-cols-1 gap-1 text-xs">
                        <div
                          className={`flex items-center gap-2 ${passwordStrength.requirements.length ? "text-green-600" : "text-gray-500"}`}
                        >
                          <div
                            className={`w-2 h-2 rounded-full ${passwordStrength.requirements.length ? "bg-green-500" : "bg-gray-300"}`}
                          />
                          At least 8 characters
                        </div>
                        <div
                          className={`flex items-center gap-2 ${passwordStrength.requirements.uppercase ? "text-green-600" : "text-gray-500"}`}
                        >
                          <div
                            className={`w-2 h-2 rounded-full ${passwordStrength.requirements.uppercase ? "bg-green-500" : "bg-gray-300"}`}
                          />
                          One uppercase letter
                        </div>
                        <div
                          className={`flex items-center gap-2 ${passwordStrength.requirements.lowercase ? "text-green-600" : "text-gray-500"}`}
                        >
                          <div
                            className={`w-2 h-2 rounded-full ${passwordStrength.requirements.lowercase ? "bg-green-500" : "bg-gray-300"}`}
                          />
                          One lowercase letter
                        </div>
                        <div
                          className={`flex items-center gap-2 ${passwordStrength.requirements.number ? "text-green-600" : "text-gray-500"}`}
                        >
                          <div
                            className={`w-2 h-2 rounded-full ${passwordStrength.requirements.number ? "bg-green-500" : "bg-gray-300"}`}
                          />
                          One number
                        </div>
                        <div
                          className={`flex items-center gap-2 ${passwordStrength.requirements.special ? "text-green-600" : "text-gray-500"}`}
                        >
                          <div
                            className={`w-2 h-2 rounded-full ${passwordStrength.requirements.special ? "bg-green-500" : "bg-gray-300"}`}
                          />
                          One special character
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      className="pl-10 pr-10"
                      value={form.confirmPassword}
                      onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                      required
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={agreeToTerms}
                  onCheckedChange={(checked) => setAgreeToTerms(checked as boolean)}
                />
                <Label htmlFor="terms" className="text-sm">
                  I agree to the{" "}
                  <Link href="/terms" className="text-blue-600 hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-blue-600 hover:underline">
                    Privacy Policy
                  </Link>
                </Label>
              </div>

              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
                {isLoading ? "Creating Account..." : "Create Account"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link href="/login" className="text-blue-600 hover:underline">
                  Sign in here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Back to Home */}
        <div className="mt-6 text-center">
          <Button variant="outline" size="sm" asChild>
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
