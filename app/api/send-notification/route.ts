import { type NextRequest, NextResponse } from "next/server"

// This would integrate with an email service like SendGrid, Resend, or Nodemailer
export async function POST(request: NextRequest) {
  try {
    const { type, appointment, recipient } = await request.json()

    // Mock email notification logic
    const emailContent = generateEmailContent(type, appointment)

    // In a real application, you would send the email here
    console.log(`Sending ${type} email to ${recipient.email}:`, emailContent)

    // Simulate email sending
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return NextResponse.json({
      success: true,
      message: `${type} notification sent successfully`,
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to send notification" }, { status: 500 })
  }
}

function generateEmailContent(type: string, appointment: any) {
  switch (type) {
    case "confirmation":
      return {
        subject: "Appointment Confirmation - EasyMed Appointments",
        html: `
          <h2>Appointment Confirmed</h2>
          <p>Dear ${appointment.patientName},</p>
          <p>Your appointment has been successfully booked:</p>
          <ul>
            <li><strong>Doctor:</strong> ${appointment.doctorName}</li>
            <li><strong>Date:</strong> ${appointment.date}</li>
            <li><strong>Time:</strong> ${appointment.time}</li>
            <li><strong>Location:</strong> ${appointment.location}</li>
          </ul>
          <p>Please arrive 15 minutes early for your appointment.</p>
          <p>Best regards,<br>EasyMed Appointments Team</p>
        `,
      }
    case "reminder":
      return {
        subject: "Appointment Reminder - Tomorrow",
        html: `
          <h2>Appointment Reminder</h2>
          <p>Dear ${appointment.patientName},</p>
          <p>This is a reminder that you have an appointment tomorrow:</p>
          <ul>
            <li><strong>Doctor:</strong> ${appointment.doctorName}</li>
            <li><strong>Date:</strong> ${appointment.date}</li>
            <li><strong>Time:</strong> ${appointment.time}</li>
            <li><strong>Location:</strong> ${appointment.location}</li>
          </ul>
          <p>Please don't forget to bring your ID and insurance card.</p>
          <p>Best regards,<br>EasyMed Appointments Team</p>
        `,
      }
    case "doctor_notification":
      return {
        subject: "New Appointment Booked",
        html: `
          <h2>New Appointment Scheduled</h2>
          <p>Dear Dr. ${appointment.doctorName},</p>
          <p>A new appointment has been booked with you:</p>
          <ul>
            <li><strong>Patient:</strong> ${appointment.patientName}</li>
            <li><strong>Date:</strong> ${appointment.date}</li>
            <li><strong>Time:</strong> ${appointment.time}</li>
            <li><strong>Reason:</strong> ${appointment.reason || "Not specified"}</li>
          </ul>
          <p>Please review the appointment details in your dashboard.</p>
          <p>Best regards,<br>EasyMed Appointments System</p>
        `,
      }
    default:
      return {
        subject: "EasyMed Appointments Notification",
        html: "<p>You have a new notification from EasyMed Appointments.</p>",
      }
  }
}
