"use client"

import { Calendar, Clock, MapPin, Search, Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const doctors = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialty: "Cardiology",
    rating: 4.9,
    experience: "15 years",
    location: "Downtown Medical Center",
    image: "/placeholder.svg?height=100&width=100",
    availableToday: true,
    nextAvailable: "Today 2:00 PM",
    consultationFee: "$150",
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    specialty: "Dermatology",
    rating: 4.8,
    experience: "12 years",
    location: "Skin Care Clinic",
    image: "/placeholder.svg?height=100&width=100",
    availableToday: true,
    nextAvailable: "Today 3:30 PM",
    consultationFee: "$120",
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez",
    specialty: "Pediatrics",
    rating: 4.9,
    experience: "10 years",
    location: "Children's Hospital",
    image: "/placeholder.svg?height=100&width=100",
    availableToday: false,
    nextAvailable: "Tomorrow 9:00 AM",
    consultationFee: "$100",
  },
  {
    id: 4,
    name: "Dr. James Wilson",
    specialty: "Orthopedics",
    rating: 4.7,
    experience: "18 years",
    location: "Sports Medicine Center",
    image: "/placeholder.svg?height=100&width=100",
    availableToday: true,
    nextAvailable: "Today 4:15 PM",
    consultationFee: "$180",
  },
  {
    id: 5,
    name: "Dr. Lisa Thompson",
    specialty: "Neurology",
    rating: 4.8,
    experience: "14 years",
    location: "Brain & Spine Institute",
    image: "/placeholder.svg?height=100&width=100",
    availableToday: false,
    nextAvailable: "Tomorrow 11:30 AM",
    consultationFee: "$200",
  },
  {
    id: 6,
    name: "Dr. Robert Kumar",
    specialty: "General Medicine",
    rating: 4.6,
    experience: "8 years",
    location: "Family Health Clinic",
    image: "/placeholder.svg?height=100&width=100",
    availableToday: true,
    nextAvailable: "Today 1:45 PM",
    consultationFee: "$80",
  },
]

export default function DoctorsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSpecialty, setSelectedSpecialty] = useState("all")
  const [availabilityFilter, setAvailabilityFilter] = useState("all")

  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSearch =
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSpecialty = selectedSpecialty === "all" || doctor.specialty.toLowerCase() === selectedSpecialty
    const matchesAvailability =
      availabilityFilter === "all" || (availabilityFilter === "today" && doctor.availableToday)

    return matchesSearch && matchesSpecialty && matchesAvailability
  })

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
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Find Available Doctors</h1>
          <p className="text-gray-600">Book appointments with qualified doctors in real-time</p>
        </div>

        {/* Filters */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <div className="grid gap-4 md:grid-cols-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search doctors or specialties..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
              <SelectTrigger>
                <SelectValue placeholder="Select Specialty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Specialties</SelectItem>
                <SelectItem value="cardiology">Cardiology</SelectItem>
                <SelectItem value="dermatology">Dermatology</SelectItem>
                <SelectItem value="pediatrics">Pediatrics</SelectItem>
                <SelectItem value="orthopedics">Orthopedics</SelectItem>
                <SelectItem value="neurology">Neurology</SelectItem>
                <SelectItem value="general medicine">General Medicine</SelectItem>
              </SelectContent>
            </Select>
            <Select value={availabilityFilter} onValueChange={setAvailabilityFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Availability" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Doctors</SelectItem>
                <SelectItem value="today">Available Today</SelectItem>
              </SelectContent>
            </Select>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredDoctors.length} doctor{filteredDoctors.length !== 1 ? "s" : ""} available
          </p>
        </div>

        {/* Doctor Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredDoctors.map((doctor) => (
            <Card key={doctor.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex items-start gap-4">
                  <Image
                    src={doctor.image || "/placeholder.svg"}
                    alt={doctor.name}
                    width={80}
                    height={80}
                    className="rounded-full"
                  />
                  <div className="flex-1">
                    <CardTitle className="text-lg">{doctor.name}</CardTitle>
                    <CardDescription className="text-blue-600 font-medium">{doctor.specialty}</CardDescription>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{doctor.rating}</span>
                      <span className="text-sm text-gray-500">• {doctor.experience}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="h-4 w-4" />
                  {doctor.location}
                </div>

                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-600" />
                  <span className="text-sm">Next available: </span>
                  <Badge variant={doctor.availableToday ? "default" : "secondary"}>{doctor.nextAvailable}</Badge>
                </div>

                <div className="flex items-center justify-between">
                  <span className="font-semibold text-lg">{doctor.consultationFee}</span>
                  <Button asChild className="bg-blue-600 hover:bg-blue-700">
                    <Link href={`/book/${doctor.id}`}>Book Appointment</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredDoctors.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No doctors found matching your criteria.</p>
            <p className="text-gray-400 mt-2">Try adjusting your filters or search terms.</p>
          </div>
        )}
      </div>
    </div>
  )
}
