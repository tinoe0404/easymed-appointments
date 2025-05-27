"use client"

import { Calendar, Clock, Plus, Users } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const todaysAppointments = [
  {
    id: 1,
    time: "9:00 AM",
    patient: "John Smith",
    reason: "Regular Checkup",
    status: "confirmed",
  },
  {
    id: 2,
    time: "10:30 AM",
    patient: "Sarah Wilson",
    reason: "Heart Consultation",
    status: "confirmed",
  },
  {
    id: 3,
    time: "2:00 PM",
    patient: "Mike Johnson",
    reason: "Follow-up",
    status: "pending",
  },
  {
    id: 4,
    time: "3:30 PM",
    patient: "Emily Davis",
    reason: "Chest Pain",
    status: "confirmed",
  },
]

export default function AdminDashboard() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0])
  const [timeSlots, setTimeSlots] = useState([
    { time: "9:00 AM", available: true },
    { time: "9:30 AM", available: false },
    { time: "10:00 AM", available: true },
    { time: "10:30 AM", available: false },
    { time: "11:00 AM", available: true },
    { time: "11:30 AM", available: true },
    { time: "2:00 PM", available: false },
    { time: "2:30 PM", available: true },
    { time: "3:00 PM", available: true },
    { time: "3:30 PM", available: false },
    { time: "4:00 PM", available: true },
    { time: "4:30 PM", available: true },
  ])

  const toggleSlotAvailability = (index: number) => {
    const newSlots = [...timeSlots]
    newSlots[index].available = !newSlots[index].available
    setTimeSlots(newSlots)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white px-4 lg:px-6 h-14 flex items-center border-b">
        <Link className="flex items-center justify-center" href="/">
          <Calendar className="h-6 w-6 text-blue-600" />
          <span className="ml-2 text-xl font-bold text-gray-900">EasyMed Admin</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:text-blue-600 transition-colors" href="/admin">
            Dashboard
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Doctor Dashboard</h1>
          <p className="text-gray-600">Manage your appointments and availability</p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-6 md:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Appointments</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4</div>
              <p className="text-xs text-muted-foreground">2 confirmed, 1 pending</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">This Week</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">23</div>
              <p className="text-xs text-muted-foreground">+12% from last week</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Available Slots</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">Today remaining</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Patient Rating</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4.9</div>
              <p className="text-xs text-muted-foreground">Based on 127 reviews</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="appointments" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="schedule">Manage Schedule</TabsTrigger>
          </TabsList>

          <TabsContent value="appointments" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Today's Appointments</CardTitle>
                <CardDescription>
                  {new Date().toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Time</TableHead>
                      <TableHead>Patient</TableHead>
                      <TableHead>Reason</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {todaysAppointments.map((appointment) => (
                      <TableRow key={appointment.id}>
                        <TableCell className="font-medium">{appointment.time}</TableCell>
                        <TableCell>{appointment.patient}</TableCell>
                        <TableCell>{appointment.reason}</TableCell>
                        <TableCell>
                          <Badge variant={appointment.status === "confirmed" ? "default" : "secondary"}>
                            {appointment.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              View
                            </Button>
                            {appointment.status === "pending" && (
                              <Button size="sm" className="bg-green-600 hover:bg-green-700">
                                Confirm
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="schedule" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Manage Your Schedule</CardTitle>
                <CardDescription>Set your availability for appointments</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="date">Select Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                  />
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Time Slots</h3>
                  <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                    {timeSlots.map((slot, index) => (
                      <Button
                        key={slot.time}
                        variant={slot.available ? "default" : "outline"}
                        className={`p-3 ${
                          slot.available
                            ? "bg-green-600 hover:bg-green-700"
                            : "bg-red-100 text-red-600 hover:bg-red-200"
                        }`}
                        onClick={() => toggleSlotAvailability(index)}
                      >
                        <Clock className="h-4 w-4 mr-2" />
                        {slot.time}
                      </Button>
                    ))}
                  </div>
                  <p className="text-sm text-gray-500">
                    Click on time slots to toggle availability. Green = Available, Red = Unavailable
                  </p>
                </div>

                <div className="flex gap-4">
                  <Button className="bg-blue-600 hover:bg-blue-700">Save Schedule</Button>
                  <Button variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Custom Slot
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
