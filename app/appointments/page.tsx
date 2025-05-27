"use client"

import { Calendar, Clock, MapPin, Phone, Video } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const upcomingAppointments = [
  {
    id: 1,
    doctor: "Dr. Sarah Johnson",
    specialty: "Cardiology",
    date: "2024-01-15",
    time: "2:00 PM",
    location: "Downtown Medical Center",
    type: "In-person",
    status: "confirmed",
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    id: 2,
    doctor: "Dr. Michael Chen",
    specialty: "Dermatology",
    date: "2024-01-18",
    time: "10:30 AM",
    location: "Skin Care Clinic",
    type: "Video Call",
    status: "confirmed",
    image: "/placeholder.svg?height=60&width=60",
  },
]

const pastAppointments = [
  {
    id: 3,
    doctor: "Dr. Emily Rodriguez",
    specialty: "Pediatrics",
    date: "2024-01-10",
    time: "9:00 AM",
    location: "Children's Hospital",
    type: "In-person",
    status: "completed",
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    id: 4,
    doctor: "Dr. Robert Kumar",
    specialty: "General Medicine",
    date: "2024-01-05",
    time: "3:30 PM",
    location: "Family Health Clinic",
    type: "In-person",
    status: "completed",
    image: "/placeholder.svg?height=60&width=60",
  },
]

export default function AppointmentsPage() {
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
          <Link className="text-sm font-medium text-blue-600" href="/appointments">
            My Appointments
          </Link>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              localStorage.clear()
              window.location.href = "/login"
            }}
          >
            Logout
          </Button>
        </nav>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Appointments</h1>
          <p className="text-gray-600">Manage your upcoming and past medical appointments</p>
        </div>

        <Tabs defaultValue="upcoming" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="past">Past Appointments</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-6">
            {upcomingAppointments.length > 0 ? (
              <div className="grid gap-6">
                {upcomingAppointments.map((appointment) => (
                  <Card key={appointment.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-4">
                          <Image
                            src={appointment.image || "/placeholder.svg"}
                            alt={appointment.doctor}
                            width={60}
                            height={60}
                            className="rounded-full"
                          />
                          <div>
                            <CardTitle className="text-lg">{appointment.doctor}</CardTitle>
                            <CardDescription className="text-blue-600 font-medium">
                              {appointment.specialty}
                            </CardDescription>
                          </div>
                        </div>
                        <Badge variant="default" className="bg-green-100 text-green-800">
                          {appointment.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid gap-3 md:grid-cols-3">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-600" />
                          <span className="text-sm">{appointment.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-gray-600" />
                          <span className="text-sm">{appointment.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {appointment.type === "Video Call" ? (
                            <Video className="h-4 w-4 text-gray-600" />
                          ) : (
                            <MapPin className="h-4 w-4 text-gray-600" />
                          )}
                          <span className="text-sm">
                            {appointment.type === "Video Call" ? "Video Call" : appointment.location}
                          </span>
                        </div>
                      </div>

                      <div className="flex gap-3 pt-4">
                        <Button variant="outline" size="sm">
                          Reschedule
                        </Button>
                        <Button variant="outline" size="sm">
                          Cancel
                        </Button>
                        {appointment.type === "Video Call" && (
                          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                            <Video className="h-4 w-4 mr-2" />
                            Join Call
                          </Button>
                        )}
                        {appointment.type === "In-person" && (
                          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                            <Phone className="h-4 w-4 mr-2" />
                            Contact Clinic
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="text-center py-12">
                  <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No Upcoming Appointments</h3>
                  <p className="text-gray-500 mb-6">You don't have any scheduled appointments.</p>
                  <Button asChild className="bg-blue-600 hover:bg-blue-700">
                    <Link href="/doctors">Book New Appointment</Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="past" className="space-y-6">
            {pastAppointments.length > 0 ? (
              <div className="grid gap-6">
                {pastAppointments.map((appointment) => (
                  <Card key={appointment.id} className="opacity-75">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-4">
                          <Image
                            src={appointment.image || "/placeholder.svg"}
                            alt={appointment.doctor}
                            width={60}
                            height={60}
                            className="rounded-full"
                          />
                          <div>
                            <CardTitle className="text-lg">{appointment.doctor}</CardTitle>
                            <CardDescription className="text-blue-600 font-medium">
                              {appointment.specialty}
                            </CardDescription>
                          </div>
                        </div>
                        <Badge variant="secondary">{appointment.status}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid gap-3 md:grid-cols-3">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-600" />
                          <span className="text-sm">{appointment.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-gray-600" />
                          <span className="text-sm">{appointment.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-gray-600" />
                          <span className="text-sm">{appointment.location}</span>
                        </div>
                      </div>

                      <div className="flex gap-3 pt-4">
                        <Button variant="outline" size="sm">
                          Download Report
                        </Button>
                        <Button variant="outline" size="sm">
                          Book Follow-up
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="text-center py-12">
                  <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No Past Appointments</h3>
                  <p className="text-gray-500">Your appointment history will appear here.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
