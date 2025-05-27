// Email service utility functions for EasyMed Appointments

export interface AppointmentData {
  id: string
  patientName: string
  patientEmail: string
  doctorName: string
  doctorEmail: string
  date: string
  time: string
  location: string
  reason?: string
  consultationFee: string
}

export class EmailService {
  // In a real application, you would configure your email provider here
  // Examples: SendGrid, Resend, Nodemailer with SMTP, etc.

  static async sendAppointmentConfirmation(appointment: AppointmentData) {
    const emailData = {
      to: appointment.patientEmail,
      subject: "Appointment Confirmation - EasyMed Appointments",
      html: this.generateConfirmationEmail(appointment),
    }

    return this.sendEmail(emailData)
  }

  static async sendAppointmentReminder(appointment: AppointmentData) {
    const emailData = {
      to: appointment.patientEmail,
      subject: "Appointment Reminder - Tomorrow",
      html: this.generateReminderEmail(appointment),
    }

    return this.sendEmail(emailData)
  }

  static async notifyDoctor(appointment: AppointmentData) {
    const emailData = {
      to: appointment.doctorEmail,
      subject: "New Appointment Booked",
      html: this.generateDoctorNotificationEmail(appointment),
    }

    return this.sendEmail(emailData)
  }

  private static generateConfirmationEmail(appointment: AppointmentData): string {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Appointment Confirmation</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #2563eb; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; background-color: #f9fafb; }
            .appointment-details { background-color: white; padding: 15px; border-radius: 8px; margin: 15px 0; }
            .footer { text-align: center; padding: 20px; color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Appointment Confirmed</h1>
            </div>
            <div class="content">
              <p>Dear ${appointment.patientName},</p>
              <p>Your appointment has been successfully booked with EasyMed Appointments.</p>
              
              <div class="appointment-details">
                <h3>Appointment Details:</h3>
                <ul>
                  <li><strong>Doctor:</strong> ${appointment.doctorName}</li>
                  <li><strong>Date:</strong> ${appointment.date}</li>
                  <li><strong>Time:</strong> ${appointment.time}</li>
                  <li><strong>Location:</strong> ${appointment.location}</li>
                  <li><strong>Consultation Fee:</strong> ${appointment.consultationFee}</li>
                  ${appointment.reason ? `<li><strong>Reason:</strong> ${appointment.reason}</li>` : ""}
                </ul>
              </div>
              
              <p><strong>Important Reminders:</strong></p>
              <ul>
                <li>Please arrive 15 minutes early for your appointment</li>
                <li>Bring a valid ID and insurance card</li>
                <li>You will receive a reminder email 24 hours before your appointment</li>
              </ul>
              
              <p>If you need to reschedule or cancel your appointment, please contact us at least 24 hours in advance.</p>
            </div>
            <div class="footer">
              <p>Thank you for choosing EasyMed Appointments</p>
              <p>For support, visit our website or call our helpline</p>
            </div>
          </div>
        </body>
      </html>
    `
  }

  private static generateReminderEmail(appointment: AppointmentData): string {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Appointment Reminder</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #059669; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; background-color: #f0fdf4; }
            .appointment-details { background-color: white; padding: 15px; border-radius: 8px; margin: 15px 0; }
            .footer { text-align: center; padding: 20px; color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Appointment Reminder</h1>
            </div>
            <div class="content">
              <p>Dear ${appointment.patientName},</p>
              <p>This is a friendly reminder that you have an appointment scheduled for tomorrow.</p>
              
              <div class="appointment-details">
                <h3>Appointment Details:</h3>
                <ul>
                  <li><strong>Doctor:</strong> ${appointment.doctorName}</li>
                  <li><strong>Date:</strong> ${appointment.date}</li>
                  <li><strong>Time:</strong> ${appointment.time}</li>
                  <li><strong>Location:</strong> ${appointment.location}</li>
                </ul>
              </div>
              
              <p><strong>Please remember to:</strong></p>
              <ul>
                <li>Arrive 15 minutes early</li>
                <li>Bring your ID and insurance card</li>
                <li>Bring any relevant medical records or test results</li>
                <li>Prepare a list of current medications</li>
              </ul>
              
              <p>If you need to reschedule or have any questions, please contact us immediately.</p>
            </div>
            <div class="footer">
              <p>EasyMed Appointments - Making Healthcare Accessible</p>
            </div>
          </div>
        </body>
      </html>
    `
  }

  private static generateDoctorNotificationEmail(appointment: AppointmentData): string {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>New Appointment Notification</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #7c3aed; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; background-color: #faf5ff; }
            .appointment-details { background-color: white; padding: 15px; border-radius: 8px; margin: 15px 0; }
            .footer { text-align: center; padding: 20px; color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>New Appointment Scheduled</h1>
            </div>
            <div class="content">
              <p>Dear Dr. ${appointment.doctorName},</p>
              <p>A new appointment has been booked with you through EasyMed Appointments.</p>
              
              <div class="appointment-details">
                <h3>Patient Information:</h3>
                <ul>
                  <li><strong>Patient Name:</strong> ${appointment.patientName}</li>
                  <li><strong>Date:</strong> ${appointment.date}</li>
                  <li><strong>Time:</strong> ${appointment.time}</li>
                  <li><strong>Location:</strong> ${appointment.location}</li>
                  ${appointment.reason ? `<li><strong>Reason for Visit:</strong> ${appointment.reason}</li>` : ""}
                  <li><strong>Appointment ID:</strong> ${appointment.id}</li>
                </ul>
              </div>
              
              <p>Please review this appointment in your admin dashboard and prepare accordingly.</p>
              <p>The patient has been sent a confirmation email with all the details.</p>
            </div>
            <div class="footer">
              <p>EasyMed Appointments - Doctor Portal</p>
              <p>Login to your dashboard to manage appointments</p>
            </div>
          </div>
        </body>
      </html>
    `
  }

  private static async sendEmail(emailData: { to: string; subject: string; html: string }) {
    // In a real application, integrate with your email service provider
    // Example with a hypothetical email service:

    try {
      // Simulate email sending
      console.log("Sending email:", emailData)

      // Replace this with actual email service integration
      // const response = await emailProvider.send(emailData)

      return { success: true, messageId: "mock-message-id" }
    } catch (error) {
      console.error("Email sending failed:", error)
      return { success: false, error: error }
    }
  }

  // Utility function to schedule reminder emails
  static scheduleReminderEmail(appointment: AppointmentData) {
    // In a real application, you would use a job queue or cron job
    // to schedule emails 24 hours before the appointment

    const appointmentDate = new Date(appointment.date + " " + appointment.time)
    const reminderTime = new Date(appointmentDate.getTime() - 24 * 60 * 60 * 1000) // 24 hours before

    console.log(`Reminder email scheduled for ${reminderTime.toISOString()}`)

    // Example with a job scheduler:
    // scheduler.schedule(reminderTime, () => {
    //   this.sendAppointmentReminder(appointment)
    // })
  }
}
