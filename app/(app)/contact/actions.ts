'use server'

import { getPayloadClient } from '@/lib/payload/api'
import { sendContactFormNotification } from '@/lib/email/resend'

export interface ContactFormData {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
}

export async function submitContactForm(formData: ContactFormData) {
  try {
    // Validate required fields
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      return {
        success: false,
        message: 'Please fill in all required fields.',
      }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      return {
        success: false,
        message: 'Please enter a valid email address.',
      }
    }

    // Save to CMS
    const payload = await getPayloadClient()
    await payload.create({
      collection: 'contact-submissions',
      data: {
        name: formData.name,
        email: formData.email,
        phone: formData.phone || '',
        subject: formData.subject,
        message: formData.message,
        status: 'new',
      },
    })

    // Send email notification to admin
    const emailResult = await sendContactFormNotification(formData)

    if (!emailResult.success) {
      console.error('Failed to send email notification:', emailResult.error)
      // Still return success since the submission was saved to CMS
    }

    return {
      success: true,
      message: 'Thank you for your message! We will get back to you soon.',
    }
  } catch (error) {
    console.error('Error submitting contact form:', error)
    return {
      success: false,
      message: 'An error occurred while sending your message. Please try again later.',
    }
  }
}
