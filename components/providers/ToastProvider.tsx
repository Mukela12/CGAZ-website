'use client'

import { Toaster } from 'sonner'

export function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      expand={false}
      richColors
      closeButton
      toastOptions={{
        style: {
          background: 'white',
          border: '1px solid #e5e7eb',
          padding: '16px',
        },
        className: 'font-sans',
      }}
    />
  )
}
