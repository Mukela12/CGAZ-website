'use server'

import { getPayloadClient } from '@/lib/payload/api'
import { sendNewsletterWelcomeEmail } from '@/lib/email/resend'

export async function subscribeToNewsletter(email: string, name?: string) {
  try {
    // Validate email
    if (!email) {
      return {
        success: false,
        message: 'Please enter your email address.',
      }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return {
        success: false,
        message: 'Please enter a valid email address.',
      }
    }

    const payload = await getPayloadClient()

    // Check if already subscribed
    const { docs } = await payload.find({
      collection: 'newsletter-subscribers',
      where: {
        email: { equals: email.toLowerCase() },
      },
      limit: 1,
    })

    if (docs.length > 0) {
      const subscriber = docs[0]

      // If already active, inform the user
      if (subscriber.status === 'active') {
        return {
          success: true,
          message: "You're already subscribed to our newsletter!",
        }
      }

      // If unsubscribed or bounced, reactivate
      await payload.update({
        collection: 'newsletter-subscribers',
        id: subscriber.id,
        data: {
          status: 'active',
          subscribedAt: new Date().toISOString(),
          name: name || subscriber.name || '',
        },
      })

      // Send welcome email
      await sendNewsletterWelcomeEmail(email, name || subscriber.name)

      return {
        success: true,
        message: 'Welcome back! Your subscription has been reactivated.',
      }
    }

    // Create new subscription
    await payload.create({
      collection: 'newsletter-subscribers',
      data: {
        email: email.toLowerCase(),
        name: name || '',
        status: 'active',
        source: 'website',
        subscribedAt: new Date().toISOString(),
        welcomeEmailSent: false,
      },
    })

    // Send welcome email
    const emailResult = await sendNewsletterWelcomeEmail(email, name)

    // Update welcomeEmailSent flag if email sent successfully
    if (emailResult.success) {
      const { docs: newSubscribers } = await payload.find({
        collection: 'newsletter-subscribers',
        where: { email: { equals: email.toLowerCase() } },
        limit: 1,
      })

      if (newSubscribers.length > 0) {
        await payload.update({
          collection: 'newsletter-subscribers',
          id: newSubscribers[0].id,
          data: { welcomeEmailSent: true },
        })
      }
    }

    return {
      success: true,
      message: 'Success! Check your inbox for a welcome email.',
    }
  } catch (error) {
    console.error('Error subscribing to newsletter:', error)
    return {
      success: false,
      message: 'An error occurred. Please try again later.',
    }
  }
}

export async function unsubscribeFromNewsletter(email: string) {
  try {
    if (!email) {
      return {
        success: false,
        message: 'Please enter your email address.',
      }
    }

    const payload = await getPayloadClient()

    const { docs } = await payload.find({
      collection: 'newsletter-subscribers',
      where: { email: { equals: email.toLowerCase() } },
      limit: 1,
    })

    if (docs.length === 0) {
      return {
        success: false,
        message: 'Email address not found in our subscriber list.',
      }
    }

    await payload.update({
      collection: 'newsletter-subscribers',
      id: docs[0].id,
      data: { status: 'unsubscribed' },
    })

    return {
      success: true,
      message: "You've been unsubscribed from our newsletter.",
    }
  } catch (error) {
    console.error('Error unsubscribing from newsletter:', error)
    return {
      success: false,
      message: 'An error occurred. Please try again later.',
    }
  }
}
