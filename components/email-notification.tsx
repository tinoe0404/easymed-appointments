"use client"

import { Mail, Send } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"

interface EmailNotificationProps {
  type: "confirmation" | "reminder" | "doctor_notification"
  appointment: {
    patientName: string
    doctorName: string
    date: string
    time: string
    location: string
    reason?: string
  }
  recipient: {
    email: string
    name: string
  }
}

export function EmailNotification({ type, appointment, recipient }: EmailNotificationProps) {
  const [sending, setSending] = useState(false)
  const { toast } = useToast()

  const sendNotification = async () => {
    setSending(true)

    try {
      const response = await fetch("/api/send-notification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type,
          appointment,
          recipient,
        }),
      })

      const result = await response.json()

      if (result.success) {
        toast({
          title: "Email Sent Successfully",
          description: `${type} notification sent to ${recipient.email}`,
        })
      } else {
        throw new Error(result.error)
      }
    } catch (error) {
      toast({
        title: "Failed to Send Email",
        description: "There was an error sending the notification email.",
        variant: "destructive",
      })
    } finally {
      setSending(false)
    }
  }

  const getEmailPreview = () => {
    switch (type) {
      case "confirmation":
        return {
          subject: "Appointment Confirmation - EasyMed Appointments",
          preview: `Dear ${appointment.patientName}, your appointment with ${appointment.doctorName} on ${appointment.date} at ${appointment.time} has been confirmed.`,
        }
      case "reminder":
        return {
          subject: "Appointment Reminder - Tomorrow",
          preview: `Dear ${appointment.patientName}, this is a reminder that you have an appointment tomorrow with ${appointment.doctorName} at ${appointment.time}.`,
        }
      case "doctor_notification":
        return {
          subject: "New Appointment Booked",
          preview: `Dear Dr. ${appointment.doctorName}, a new appointment has been booked with ${appointment.patientName} on ${appointment.date} at ${appointment.time}.`,
        }
    }
  }

  const emailPreview = getEmailPreview()

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mail className="h-5 w-5" />
          Email Notification
        </CardTitle>
        <CardDescription>
          {type === "confirmation" && "Send appointment confirmation"}
          {type === "reminder" && "Send appointment reminder"}
          {type === "doctor_notification" && "Notify doctor of new appointment"}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="text-sm font-medium">To: {recipient.email}</div>
          <div className="text-sm font-medium">Subject: {emailPreview.subject}</div>
        </div>

        <div className="bg-gray-50 p-3 rounded-md">
          <div className="text-sm text-gray-600">{emailPreview.preview}</div>
        </div>

        <Button onClick={sendNotification} disabled={sending} className="w-full bg-blue-600 hover:bg-blue-700">
          <Send className="h-4 w-4 mr-2" />
          {sending ? "Sending..." : "Send Notification"}
        </Button>
      </CardContent>
    </Card>
  )
}
