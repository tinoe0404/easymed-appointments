import { Calendar, Clock, Mail, Users } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="px-4 lg:px-6 h-14 flex items-center border-b">
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

      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-r from-blue-50 to-indigo-100">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Skip the Queue, Book Your Doctor
                <span className="text-blue-600"> Instantly</span>
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                End long hospital waits and overcrowding. Book appointments with available doctors in real-time, get
                instant confirmations, and receive timely reminders.
              </p>
            </div>
            <div className="space-x-4">
              <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
                <Link href="/doctors">Book Appointment Now</Link>
              </Button>
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Why Choose EasyMed Appointments?
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl mt-4">
              Our platform solves the major challenges in healthcare accessibility and efficiency.
            </p>
          </div>
          <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
            <Card className="border-0 shadow-lg">
              <CardHeader className="text-center">
                <Clock className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>Real-Time Availability</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  See doctor schedules in real-time. No more wasted trips to hospitals. Book only when doctors are
                  actually available.
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg">
              <CardHeader className="text-center">
                <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>Reduce Overcrowding</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Spread appointments evenly throughout the day. Minimize waiting rooms crowding and reduce disease
                  transmission risks.
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg">
              <CardHeader className="text-center">
                <Mail className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>Smart Notifications</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Automatic email reminders for patients and doctors. Never miss an appointment with our intelligent
                  notification system.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">How It Works</h2>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl mt-4">
              Simple steps to book your appointment and get the care you need.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">Choose Your Doctor</h3>
              <p className="text-gray-500">
                Browse available doctors by specialty, location, and real-time availability.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">Select Time Slot</h3>
              <p className="text-gray-500">
                Pick from available time slots that fit your schedule. See real-time updates.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">Get Confirmation</h3>
              <p className="text-gray-500">Receive instant confirmation and email reminders for your appointment.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid gap-6 lg:grid-cols-4 lg:gap-12 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-gray-500">Registered Doctors</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">10,000+</div>
              <div className="text-gray-500">Appointments Booked</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">95%</div>
              <div className="text-gray-500">Patient Satisfaction</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">24/7</div>
              <div className="text-gray-500">Online Booking</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-blue-600">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
                Ready to Skip the Wait?
              </h2>
              <p className="mx-auto max-w-[600px] text-blue-100 md:text-xl">
                Join thousands of patients who have already discovered a better way to book medical appointments.
              </p>
            </div>
            <Button asChild size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
              <Link href="/doctors">Start Booking Today</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500">© 2024 EasyMed Appointments. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy Policy
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Contact Us
          </Link>
        </nav>
      </footer>
    </div>
  )
}
