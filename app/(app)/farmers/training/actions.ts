'use server'

import { getPayloadClient } from '@/lib/payload/api'
import {
  sendCourseRegistrationConfirmation,
  sendCourseRegistrationAdminNotification,
} from '@/lib/email/resend'

export interface CourseRegistrationData {
  name: string
  email: string
  phone: string
  district: string
  courseName: string
  preferredDate?: string
  farmingExperience: string
  paymentMethod?: string
  paymentAmount?: string
  transactionReference?: string
  paymentReceiptId?: string
  additionalNotes?: string
}

export async function submitCourseRegistration(formData: CourseRegistrationData) {
  try {
    // Validate required fields
    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.district ||
      !formData.courseName ||
      !formData.farmingExperience
    ) {
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
    const registration = await payload.create({
      collection: 'course-registrations',
      data: {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        district: formData.district,
        courseName: formData.courseName,
        preferredDate: formData.preferredDate || '',
        farmingExperience: formData.farmingExperience,
        paymentMethod: formData.paymentMethod || 'pending',
        paymentAmount: formData.paymentAmount || '',
        transactionReference: formData.transactionReference || '',
        paymentReceipt: formData.paymentReceiptId || null,
        additionalNotes: formData.additionalNotes || '',
        status: 'pending',
      },
    })

    // Send confirmation email to applicant
    const confirmationResult = await sendCourseRegistrationConfirmation({
      name: formData.name,
      email: formData.email,
      courseName: formData.courseName,
      phone: formData.phone,
      district: formData.district,
      preferredDate: formData.preferredDate,
    })

    if (!confirmationResult.success) {
      console.error('Failed to send confirmation email:', confirmationResult.error)
    }

    // Send notification to admin
    const adminNotificationResult = await sendCourseRegistrationAdminNotification({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      district: formData.district,
      courseName: formData.courseName,
      preferredDate: formData.preferredDate,
      farmingExperience: formData.farmingExperience,
      paymentMethod: formData.paymentMethod,
      paymentAmount: formData.paymentAmount,
      transactionReference: formData.transactionReference,
      additionalNotes: formData.additionalNotes,
    })

    if (!adminNotificationResult.success) {
      console.error('Failed to send admin notification:', adminNotificationResult.error)
    }

    return {
      success: true,
      message:
        'Registration submitted successfully! Check your email for confirmation details.',
      registrationId: registration.id,
    }
  } catch (error) {
    console.error('Error submitting course registration:', error)
    return {
      success: false,
      message: 'An error occurred while submitting your registration. Please try again later.',
    }
  }
}

export async function uploadPaymentReceipt(formData: FormData) {
  try {
    const file = formData.get('file') as File
    if (!file) {
      return {
        success: false,
        message: 'No file provided.',
      }
    }

    // Validate file type
    const allowedTypes = [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/gif',
      'image/webp',
      'application/pdf',
    ]
    if (!allowedTypes.includes(file.type)) {
      return {
        success: false,
        message: 'Invalid file type. Please upload an image or PDF.',
      }
    }

    // Validate file size (5MB max)
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      return {
        success: false,
        message: 'File size exceeds 5MB limit.',
      }
    }

    const payload = await getPayloadClient()

    // Upload file to Media collection
    const media = await payload.create({
      collection: 'media',
      data: {
        alt: `Payment receipt - ${file.name}`,
      },
      file: {
        data: Buffer.from(await file.arrayBuffer()),
        mimetype: file.type,
        name: file.name,
        size: file.size,
      },
    })

    return {
      success: true,
      message: 'Receipt uploaded successfully.',
      mediaId: media.id,
      url: media.url,
    }
  } catch (error) {
    console.error('Error uploading payment receipt:', error)
    return {
      success: false,
      message: 'Failed to upload receipt. Please try again.',
    }
  }
}
