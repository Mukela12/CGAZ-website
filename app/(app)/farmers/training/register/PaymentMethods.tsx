'use client'

import { useState, useEffect } from 'react'
import { AlertCircle, Building, Smartphone, Banknote } from 'lucide-react'

interface PaymentSettings {
  // Mobile Money
  enableMobileMoney?: boolean
  mobileMoneyNumber?: string
  mobileMoneyName?: string
  mobileMoneyInstructions?: string

  // Bank Transfer
  enableBankTransfer?: boolean
  bankName?: string
  branchName?: string
  sortCode?: string
  swiftCode?: string
  accountNumber?: string
  accountName?: string
  bankInstructions?: string

  // Cash
  enableCash?: boolean
  cashInstructions?: string
}

export function PaymentMethods() {
  const [settings, setSettings] = useState<PaymentSettings | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/payment-settings')
      .then((res) => res.json())
      .then((data) => setSettings(data))
      .catch((err) => console.error('Failed to load payment settings:', err))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return <div className="text-neutral-600">Loading payment options...</div>
  }

  if (!settings) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <p className="text-yellow-800">
          Payment details temporarily unavailable. Please contact admin.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-blue-900">
          <strong>Payment Instructions:</strong> Choose your preferred payment method
          below and make the payment. Then upload your receipt or proof of payment in the
          form.
        </div>
      </div>

      {/* Mobile Money */}
      {settings.enableMobileMoney && (
        <div className="border border-neutral-200 rounded-lg p-6 bg-white">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
              <Smartphone className="w-5 h-5 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-neutral-900">Mobile Money</h3>
          </div>

          <div className="space-y-3">
            <div>
              <span className="text-sm font-medium text-neutral-600">Send to:</span>
              <p className="text-xl font-bold text-neutral-900">
                {settings.mobileMoneyNumber}
              </p>
            </div>
            <div>
              <span className="text-sm font-medium text-neutral-600">Account Name:</span>
              <p className="text-neutral-900">{settings.mobileMoneyName}</p>
            </div>
            <div className="bg-neutral-50 rounded-lg p-3 text-sm text-neutral-600">
              {settings.mobileMoneyInstructions}
            </div>
          </div>
        </div>
      )}

      {/* Bank Transfer */}
      {settings.enableBankTransfer && (
        <div className="border border-neutral-200 rounded-lg p-6 bg-white">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <Building className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-neutral-900">Bank Transfer</h3>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-sm font-medium text-neutral-600">Bank:</span>
              <p className="text-neutral-900">{settings.bankName}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-neutral-600">Branch:</span>
              <p className="text-neutral-900">{settings.branchName}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-neutral-600">Sort Code:</span>
              <p className="font-mono text-neutral-900">{settings.sortCode}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-neutral-600">SWIFT Code:</span>
              <p className="font-mono text-neutral-900">{settings.swiftCode}</p>
            </div>
            <div className="col-span-2">
              <span className="text-sm font-medium text-neutral-600">Account Number:</span>
              <p className="text-xl font-bold text-neutral-900">{settings.accountNumber}</p>
            </div>
            <div className="col-span-2">
              <span className="text-sm font-medium text-neutral-600">Account Name:</span>
              <p className="text-neutral-900">{settings.accountName}</p>
            </div>
          </div>

          <div className="mt-4 bg-neutral-50 rounded-lg p-3 text-sm text-neutral-600">
            {settings.bankInstructions}
          </div>
        </div>
      )}

      {/* Cash Payment */}
      {settings.enableCash && (
        <div className="border border-neutral-200 rounded-lg p-6 bg-white">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
              <Banknote className="w-5 h-5 text-amber-600" />
            </div>
            <h3 className="text-lg font-semibold text-neutral-900">Cash Payment</h3>
          </div>

          <div className="bg-neutral-50 rounded-lg p-3 text-sm text-neutral-600">
            {settings.cashInstructions}
          </div>
        </div>
      )}
    </div>
  )
}
