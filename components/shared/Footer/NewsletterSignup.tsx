'use client'

import { useState } from 'react'
import { Button } from '@/components/shared/Button'
import { Mail } from 'lucide-react'
import { subscribeToNewsletter } from '@/app/(app)/actions/newsletter'

export function NewsletterSignup() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) {
      setMessage('Please enter your email address.')
      setIsSuccess(false)
      return
    }

    setIsSubmitting(true)
    setMessage('')

    const result = await subscribeToNewsletter(email)

    setIsSubmitting(false)
    setMessage(result.message)
    setIsSuccess(result.success)

    if (result.success) {
      setEmail('')
      // Clear success message after 5 seconds
      setTimeout(() => {
        setMessage('')
        setIsSuccess(false)
      }, 5000)
    }
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-white flex items-center gap-2">
        <Mail className="w-5 h-5" />
        Stay Updated
      </h3>
      <p className="text-white/80 text-sm">
        Subscribe to receive news, updates, and training opportunities.
      </p>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="flex-1 px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent"
            disabled={isSubmitting}
          />
          <Button
            type="submit"
            variant="secondary"
            size="md"
            disabled={isSubmitting}
            className="whitespace-nowrap"
          >
            {isSubmitting ? 'Subscribing...' : 'Subscribe'}
          </Button>
        </div>
        {message && (
          <p
            className={`text-sm ${
              isSuccess ? 'text-green-300' : 'text-red-300'
            }`}
          >
            {message}
          </p>
        )}
      </form>
      <p className="text-white/60 text-xs">
        We respect your privacy. Unsubscribe anytime.
      </p>
    </div>
  )
}
