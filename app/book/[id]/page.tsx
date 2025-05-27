"use client"

import { Calendar, Clock, MapPin, Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

// Mock doctor data - in real app this would come from API
const doctor = {
  id: 1,
  name: "Dr. Sarah Johnson",
  specialty: "Cardiology",
  rating: 4.9,
  experience: "15 years",
  location: "Downtown Medical Center",
  image: "/placeholder.svg?height=150&width=150",
  consultationFee: "$150",
  about:
    "Dr. Sarah Johnson is a board-certified cardiologist with over 15 years of experience in treating heart conditions. She specializes in preventive cardiology and has helped thousands of patients maintain healthy hearts.",
  education: "MD from Harvard Medical School, Residency at Johns Hopkins Hospital",
}

const timeSlots = [
  { time: "9:00 AM", available: true },
  { time: "9:30 AM", available: false },
  { time: "10:00 AM", available: true },
  { time: "10:30 AM", available: true },
  { time: "11:00 AM", available: false },
  { time: "11:30 AM", available: true },
  { time: "2:00 PM", available: true },
  { time: "2:30 PM", available: true },
  { time: "3:00 PM", available: false },
  { time: "3:30 PM", available: true },
  { time: "4:00 PM", available: true },
  { time: "4:30 PM", available: true },
]

export default function BookAppointmentPage() {
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [patientName, setPatientName] = useState("")
  const [patientEmail, setPatientEmail] = useState("")
  const [patientPhone, setPatientPhone] = useState("")
  const [symptoms, setSymptoms] = useState("")
  const { toast } = useToast()

  const handleBooking = () => {
    if (!selectedDate || !selectedTime || !patientName || !patientEmail || !patientPhone) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    // Simulate booking process
    toast({
      title: "Appointment Booked Successfully!",
      description: `Your appointment with ${doctor.name} is confirmed for ${selectedDate} at ${selectedTime}. Confirmation email sent to ${patientEmail}.`,
    })

    // In real app, this would make API call to book appointment and send emails
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white px-4 lg:px-6 h-14 flex items-center border-b">
        <Link className="flex items-center justify-center" href="/">
          <Calendar className="h-6 w-6 text-blue-600" />
          <span className="ml-2 text-xl font-bold text-gray-900">EasyMed Appointments</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:text-blue-600 transition-colors" href="/doctors">
            Find Doctors
          </Link>
          <Link className="text-sm font-medium hover:text-blue-600 transition-colors" href="/appointments">
            My Appointments
          </Link>
          <Link className="text-sm font-medium hover:text-blue-600 transition-colors" href="/login">
            Login
          </Link>
          <Button asChild size="sm" className="bg-blue-600 hover:bg-blue-700">
            <Link href="/register">Sign Up</Link>
          </Button>
        </nav>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Doctor Information */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <Image
                    src={doctor.image || "/placeholder.svg"}
                    alt={doctor.name}
                    width={100}
                    height={100}
                    className="rounded-full"
                  />
                  <div>
                    <CardTitle className="text-xl">{doctor.name}</CardTitle>
                    <CardDescription className="text-blue-600 font-medium text-base">
                      {doctor.specialty}
                    </CardDescription>
                    <div className="flex items-center gap-1 mt-2">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{doctor.rating}</span>
                      <span className="text-sm text-gray-500">• {doctor.experience}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-gray-600" />
                  {doctor.location}
                </div>
                <div className="text-lg font-semibold">Consultation Fee: {doctor.consultationFee}</div>
                <div>
                  <h4 className="font-semibold mb-2">About</h4>
                  <p className="text-sm text-gray-600">{doctor.about}</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Education</h4>
                  <p className="text-sm text-gray-600">{doctor.education}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Book Your Appointment</CardTitle>
                <CardDescription>Fill in your details and select your preferred time slot</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Patient Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Patient Information</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        placeholder="Enter your full name"
                        value={patientName}
                        onChange={(e) => setPatientName(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={patientEmail}
                        onChange={(e) => setPatientEmail(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        placeholder="Enter your phone number"
                        value={patientPhone}
                        onChange={(e) => setPatientPhone(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/* Date Selection */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Select Date *</h3>
                  <Input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                  />
                </div>

                {/* Time Selection */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Available Time Slots *</h3>
                  <RadioGroup value={selectedTime} onValueChange={setSelectedTime}>
                    <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                      {timeSlots.map((slot) => (
                        <div key={slot.time}>
                          <RadioGroupItem
                            value={slot.time}
                            id={slot.time}
                            disabled={!slot.available}
                            className="peer sr-only"
                          />
                          <Label
                            htmlFor={slot.time}
                            className={`flex items-center justify-center rounded-md border-2 p-3 text-sm font-medium cursor-pointer transition-colors ${
                              slot.available
                                ? "border-gray-200 hover:border-blue-300 peer-data-[state=checked]:border-blue-600 peer-data-[state=checked]:bg-blue-50"
                                : "border-gray-100 bg-gray-50 text-gray-400 cursor-not-allowed"
                            }`}
                          >
                            <Clock className="h-4 w-4 mr-2" />
                            {slot.time}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                </div>

                {/* Symptoms/Reason */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Reason for Visit (Optional)</h3>
                  <Textarea
                    placeholder="Briefly describe your symptoms or reason for the appointment..."
                    value={symptoms}
                    onChange={(e) => setSymptoms(e.target.value)}
                    rows={4}
                  />
                </div>

                {/* Booking Summary */}
                {selectedDate && selectedTime && (
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Appointment Summary</h4>
                    <div className="space-y-1 text-sm">
                      <p>
                        <strong>Doctor:</strong> {doctor.name}
                      </p>
                      <p>
                        <strong>Date:</strong> {selectedDate}
                      </p>
                      <p>
                        <strong>Time:</strong> {selectedTime}
                      </p>
                      <p>
                        <strong>Fee:</strong> {doctor.consultationFee}
                      </p>
                      <p>
                        <strong>Location:</strong> {doctor.location}
                      </p>
                    </div>
                  </div>
                )}

                {/* Book Button */}
                <Button onClick={handleBooking} className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-6" size="lg">
                  <Calendar className="h-5 w-5 mr-2" />
                  Confirm Appointment
                </Button>

                <p className="text-sm text-gray-500 text-center">
                  You will receive a confirmation email with appointment details and reminders.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
