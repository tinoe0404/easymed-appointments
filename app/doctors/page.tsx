"use client"

import { Calendar, Clock, MapPin, Search, Star, Filter, Heart, Phone, Mail, Award, CheckCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState, useMemo, useEffect } from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"

// Enhanced doctor data with more fields
const doctorsData = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialty: "Cardiology",
    rating: 4.9,
    reviewCount: 248,
    experience: 15,
    location: "Downtown Medical Center",
    address: "123 Main St, City Center",
    image: "/placeholder.svg?height=100&width=100",
    availableToday: true,
    nextAvailable: "Today 2:00 PM",
    consultationFee: 150,
    education: "Harvard Medical School",
    languages: ["English", "Spanish"],
    acceptsInsurance: true,
    isVerified: true,
    phone: "+1 (555) 123-4567",
    email: "sarah.johnson@medical.com",
    about: "Specialized in cardiovascular diseases with extensive experience in interventional cardiology.",
    procedures: ["Angioplasty", "Cardiac Catheterization", "Echocardiography"],
    timeSlots: ["9:00 AM", "11:00 AM", "2:00 PM", "4:00 PM"]
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    specialty: "Dermatology",
    rating: 4.8,
    reviewCount: 189,
    experience: 12,
    location: "Skin Care Clinic",
    address: "456 Oak Ave, Medical District",
    image: "/placeholder.svg?height=100&width=100",
    availableToday: true,
    nextAvailable: "Today 3:30 PM",
    consultationFee: 120,
    education: "Johns Hopkins University",
    languages: ["English", "Mandarin"],
    acceptsInsurance: true,
    isVerified: true,
    phone: "+1 (555) 234-5678",
    email: "michael.chen@skincare.com",
    about: "Expert in medical and cosmetic dermatology with focus on skin cancer prevention.",
    procedures: ["Skin Biopsy", "Mole Removal", "Laser Therapy"],
    timeSlots: ["10:00 AM", "1:00 PM", "3:30 PM", "5:00 PM"]
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez",
    specialty: "Pediatrics",
    rating: 4.9,
    reviewCount: 312,
    experience: 10,
    location: "Children's Hospital",
    address: "789 Pine St, Family District",
    image: "/placeholder.svg?height=100&width=100",
    availableToday: false,
    nextAvailable: "Tomorrow 9:00 AM",
    consultationFee: 100,
    education: "Stanford Medical School",
    languages: ["English", "Spanish", "Portuguese"],
    acceptsInsurance: true,
    isVerified: true,
    phone: "+1 (555) 345-6789",
    email: "emily.rodriguez@childcare.com",
    about: "Pediatric specialist with expertise in child development and preventive care.",
    procedures: ["Vaccinations", "Growth Assessment", "Developmental Screening"],
    timeSlots: ["9:00 AM", "11:00 AM", "2:00 PM", "4:00 PM"]
  },
  // Add more doctors with complete data...
  {
    id: 4,
    name: "Dr. James Wilson",
    specialty: "Orthopedics",
    rating: 4.7,
    reviewCount: 156,
    experience: 18,
    location: "Sports Medicine Center",
    address: "321 Sports Ave, Athletic Complex",
    image: "/placeholder.svg?height=100&width=100",
    availableToday: true,
    nextAvailable: "Today 4:15 PM",
    consultationFee: 180,
    education: "Mayo Clinic",
    languages: ["English"],
    acceptsInsurance: true,
    isVerified: true,
    phone: "+1 (555) 456-7890",
    email: "james.wilson@sportsmed.com",
    about: "Orthopedic surgeon specializing in sports injuries and joint replacement.",
    procedures: ["Arthroscopy", "Joint Replacement", "Fracture Repair"],
    timeSlots: ["8:00 AM", "11:00 AM", "2:00 PM", "4:15 PM"]
  },
  {
    id: 5,
    name: "Dr. Lisa Thompson",
    specialty: "Neurology",
    rating: 4.8,
    reviewCount: 198,
    experience: 14,
    location: "Brain & Spine Institute",
    address: "654 Neuro Blvd, Medical Center",
    image: "/placeholder.svg?height=100&width=100",
    availableToday: false,
    nextAvailable: "Tomorrow 11:30 AM",
    consultationFee: 200,
    education: "UCLA Medical School",
    languages: ["English", "French"],
    acceptsInsurance: true,
    isVerified: true,
    phone: "+1 (555) 567-8901",
    email: "lisa.thompson@neuro.com",
    about: "Neurologist with expertise in epilepsy, stroke, and neurodegenerative diseases.",
    procedures: ["EEG", "EMG", "Lumbar Puncture"],
    timeSlots: ["9:00 AM", "11:30 AM", "2:30 PM", "4:30 PM"]
  },
  {
    id: 6,
    name: "Dr. Robert Kumar",
    specialty: "General Medicine",
    rating: 4.6,
    reviewCount: 89,
    experience: 8,
    location: "Family Health Clinic",
    address: "987 Family Way, Residential Area",
    image: "/placeholder.svg?height=100&width=100",
    availableToday: true,
    nextAvailable: "Today 1:45 PM",
    consultationFee: 80,
    education: "University of Michigan",
    languages: ["English", "Hindi", "Urdu"],
    acceptsInsurance: true,
    isVerified: true,
    phone: "+1 (555) 678-9012",
    email: "robert.kumar@familyhealth.com",
    about: "General practitioner focused on preventive care and chronic disease management.",
    procedures: ["Annual Checkups", "Blood Work", "Preventive Screening"],
    timeSlots: ["9:00 AM", "11:00 AM", "1:45 PM", "3:00 PM"]
  }
]

export default function EnhancedDoctorsPage() {
  // State management
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSpecialty, setSelectedSpecialty] = useState("all")
  const [availabilityFilter, setAvailabilityFilter] = useState("all")
  const [priceRange, setPriceRange] = useState([0, 250])
  const [experienceRange, setExperienceRange] = useState([0, 20])
  const [ratingFilter, setRatingFilter] = useState(0)
  const [insuranceFilter, setInsuranceFilter] = useState(false)
  const [verifiedOnly, setVerifiedOnly] = useState(false)
  const [sortBy, setSortBy] = useState("rating")
  const [viewMode, setViewMode] = useState("grid")
  const [favorites, setFavorites] = useState<number[]>([])
  const [showFilters, setShowFilters] = useState(false)

  // Load favorites from localStorage on component mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedFavorites = localStorage.getItem('doctorFavorites')
      if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites))
      }
    }
  }, [])

  // Save favorites to localStorage
  const toggleFavorite = (doctorId: number) => {
    const newFavorites = favorites.includes(doctorId)
      ? favorites.filter(id => id !== doctorId)
      : [...favorites, doctorId]
    
    setFavorites(newFavorites)
    if (typeof window !== 'undefined') {
      localStorage.setItem('doctorFavorites', JSON.stringify(newFavorites))
    }
  }

  // Enhanced filtering and sorting logic
  const filteredAndSortedDoctors = useMemo(() => {
    let filtered = doctorsData.filter((doctor) => {
      const matchesSearch =
        doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.location.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesSpecialty = selectedSpecialty === "all" || 
        doctor.specialty.toLowerCase() === selectedSpecialty
      
      const matchesAvailability = availabilityFilter === "all" || 
        (availabilityFilter === "today" && doctor.availableToday)
      
      const matchesPrice = doctor.consultationFee >= priceRange[0] && 
        doctor.consultationFee <= priceRange[1]
      
      const matchesExperience = doctor.experience >= experienceRange[0] && 
        doctor.experience <= experienceRange[1]
      
      const matchesRating = doctor.rating >= ratingFilter
      
      const matchesInsurance = !insuranceFilter || doctor.acceptsInsurance
      
      const matchesVerified = !verifiedOnly || doctor.isVerified

      return matchesSearch && matchesSpecialty && matchesAvailability && 
             matchesPrice && matchesExperience && matchesRating && 
             matchesInsurance && matchesVerified
    })

    // Sort the filtered results
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.rating - a.rating
        case "price-low":
          return a.consultationFee - b.consultationFee
        case "price-high":
          return b.consultationFee - a.consultationFee
        case "experience":
          return b.experience - a.experience
        case "reviews":
          return b.reviewCount - a.reviewCount
        case "name":
          return a.name.localeCompare(b.name)
        default:
          return 0
      }
    })

    return filtered
  }, [searchTerm, selectedSpecialty, availabilityFilter, priceRange, experienceRange, 
      ratingFilter, insuranceFilter, verifiedOnly, sortBy])

  // Get unique specialties for filter dropdown
  const specialties = [...new Set(doctorsData.map(doctor => doctor.specialty))]

  const clearFilters = () => {
    setSearchTerm("")
    setSelectedSpecialty("all")
    setAvailabilityFilter("all")
    setPriceRange([0, 250])
    setExperienceRange([0, 20])
    setRatingFilter(0)
    setInsuranceFilter(false)
    setVerifiedOnly(false)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Enhanced Header */}
      <header className="bg-white px-4 lg:px-6 h-16 flex items-center border-b shadow-sm">
        <Link className="flex items-center justify-center" href="/">
          <Calendar className="h-6 w-6 text-blue-600" />
          <span className="ml-2 text-xl font-bold text-gray-900">EasyMed Pro</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
          <Link className="text-sm font-medium hover:text-blue-600 transition-colors" href="/doctors">
            Find Doctors
          </Link>
          <Link className="text-sm font-medium hover:text-blue-600 transition-colors" href="/appointments">
            My Appointments
          </Link>
          <Link className="text-sm font-medium hover:text-blue-600 transition-colors" href="/favorites">
            Favorites ({favorites.length})
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
        {/* Enhanced Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Find Your Perfect Doctor</h1>
          <p className="text-gray-600 text-lg">Book appointments with qualified, verified doctors in real-time</p>
        </div>

        {/* Quick Search Bar */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
          <div className="flex gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search doctors, specialties, or locations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 text-lg h-12"
              />
            </div>
            <Button 
              variant="outline" 
              onClick={() => setShowFilters(!showFilters)}
              className="h-12"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>

        {/* Advanced Filters Panel */}
        {showFilters && (
          <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Advanced Filters</h3>
              <Button variant="outline" size="sm" onClick={clearFilters}>
                Clear All
              </Button>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {/* Specialty Filter */}
              <div>
                <label className="text-sm font-medium mb-2 block">Specialty</label>
                <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Specialty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Specialties</SelectItem>
                    {specialties.map(specialty => (
                      <SelectItem key={specialty} value={specialty.toLowerCase()}>
                        {specialty}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Availability Filter */}
              <div>
                <label className="text-sm font-medium mb-2 block">Availability</label>
                <Select value={availabilityFilter} onValueChange={setAvailabilityFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Availability" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Doctors</SelectItem>
                    <SelectItem value="today">Available Today</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Price Range */}
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Price Range: ${priceRange[0]} - ${priceRange[1]}
                </label>
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={250}
                  step={10}
                  className="w-full"
                />
              </div>

              {/* Experience Range */}
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Experience: {experienceRange[0]} - {experienceRange[1]} years
                </label>
                <Slider
                  value={experienceRange}
                  onValueChange={setExperienceRange}
                  max={20}
                  step={1}
                  className="w-full"
                />
              </div>

              {/* Rating Filter */}
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Minimum Rating: {ratingFilter}
                </label>
                <Slider
                  value={[ratingFilter]}
                  onValueChange={(value) => setRatingFilter(value[0])}
                  max={5}
                  step={0.1}
                  className="w-full"
                />
              </div>

              {/* Insurance & Verification */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="insurance" 
                    checked={insuranceFilter}
                    onCheckedChange={setInsuranceFilter}
                  />
                  <label htmlFor="insurance" className="text-sm font-medium">
                    Accepts Insurance
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="verified" 
                    checked={verifiedOnly}
                    onCheckedChange={setVerifiedOnly}
                  />
                  <label htmlFor="verified" className="text-sm font-medium">
                    Verified Only
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Results Header with Sort */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <p className="text-gray-600">
              Showing {filteredAndSortedDoctors.length} doctor{filteredAndSortedDoctors.length !== 1 ? "s" : ""} available
            </p>
          </div>
          <div className="flex gap-4 items-center">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="experience">Most Experienced</SelectItem>
                <SelectItem value="reviews">Most Reviews</SelectItem>
                <SelectItem value="name">Name A-Z</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Enhanced Doctor Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredAndSortedDoctors.map((doctor) => (
            <Card key={doctor.id} className="hover:shadow-xl transition-all duration-200 border-0 shadow-md">
              <CardHeader className="pb-4">
                <div className="flex items-start gap-4">
                  <div className="relative">
                    <Image
                      src={doctor.image || "/placeholder.svg"}
                      alt={doctor.name}
                      width={80}
                      height={80}
                      className="rounded-full border-2 border-gray-100"
                    />
                    {doctor.isVerified && (
                      <CheckCircle className="absolute -bottom-1 -right-1 h-6 w-6 text-blue-600 bg-white rounded-full" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{doctor.name}</CardTitle>
                        <CardDescription className="text-blue-600 font-medium">
                          {doctor.specialty}
                        </CardDescription>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleFavorite(doctor.id)}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <Heart 
                          className={`h-4 w-4 ${favorites.includes(doctor.id) ? 'fill-red-500 text-red-500' : ''}`} 
                        />
                      </Button>
                    </div>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{doctor.rating}</span>
                      <span className="text-sm text-gray-500">({doctor.reviewCount} reviews)</span>
                    </div>
                    <div className="flex items-center gap-1 mt-1">
                      <Award className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{doctor.experience} years exp.</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="h-4 w-4" />
                  <div>
                    <div className="font-medium">{doctor.location}</div>
                    <div className="text-xs">{doctor.address}</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-600" />
                  <span className="text-sm">Next available: </span>
                  <Badge variant={doctor.availableToday ? "default" : "secondary"}>
                    {doctor.nextAvailable}
                  </Badge>
                </div>

                <div className="flex flex-wrap gap-1">
                  {doctor.languages.map(lang => (
                    <Badge key={lang} variant="outline" className="text-xs">
                      {lang}
                    </Badge>
                  ))}
                  {doctor.acceptsInsurance && (
                    <Badge variant="outline" className="text-xs bg-green-50 text-green-700">
                      Insurance
                    </Badge>
                  )}
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div>
                    <span className="font-semibold text-xl">${doctor.consultationFee}</span>
                    <span className="text-sm text-gray-500 ml-1">consultation</span>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/doctor/${doctor.id}`}>View Profile</Link>
                    </Button>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700" asChild>
                      <Link href={`/book/${doctor.id}`}>Book Now</Link>
                    </Button>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="flex gap-4 pt-2 border-t">
                  <Button variant="ghost" size="sm" className="p-1">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="p-1">
                    <Mail className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Enhanced No Results State */}
        {filteredAndSortedDoctors.length === 0 && (
          <div className="text-center py-16">
            <div className="mb-4">
              <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No doctors found</h3>
              <p className="text-gray-500">
                We couldn't find any doctors matching your criteria.
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-400">Try:</p>
              <ul className="text-sm text-gray-400 space-y-1">
                <li>• Adjusting your filters</li>
                <li>• Searching for different specialties</li>
                <li>• Expanding your price range</li>
                <li>• Removing location restrictions</li>
              </ul>
            </div>
            <Button 
              variant="outline" 
              className="mt-6"
              onClick={clearFilters}
            >
              Clear All Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}