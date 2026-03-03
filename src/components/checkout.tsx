'use client'

import { useCallback, useEffect, useState } from 'react'
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

import { startCheckoutSession, getCheckoutSessionStatus } from '@/app/actions/stripe'

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
)

export default function Checkout({
  productId,
  email,
  onSuccess,
  onError,
}: {
  productId: string
  email: string
  onSuccess?: (orderId: string) => void
  onError?: (error: string) => void
}) {
  const [clientSecret, setClientSecret] = useState<string>('')
  const [orderId, setOrderId] = useState<string>('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string>('')

  const startCheckout = useCallback(async () => {
    try {
      setLoading(true)
      setError('')
      const { clientSecret: secret, orderId: id } = 
        await startCheckoutSession(productId, email)
      setClientSecret(secret)
      setOrderId(id)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to start checkout'
      setError(message)
      onError?.(message)
    } finally {
      setLoading(false)
    }
  }, [productId, email, onError])

  useEffect(() => {
    startCheckout()
  }, [startCheckout])

  // Poll for payment status
  useEffect(() => {
    if (!clientSecret) return

    const pollInterval = setInterval(async () => {
      try {
        const { status } = await getCheckoutSessionStatus(
          clientSecret.split('_secret_')[0] // Extract session ID from secret
        )
        
        if (status === 'paid') {
          clearInterval(pollInterval)
          onSuccess?.(orderId)
        }
      } catch (err) {
        console.error('Error checking payment status:', err)
      }
    }, 2000) // Poll every 2 seconds

    return () => clearInterval(pollInterval)
  }, [clientSecret, orderId, onSuccess])

  if (loading) {
    return <div className="flex items-center justify-center p-8">Loading checkout...</div>
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
        <p className="font-medium">Checkout Error</p>
        <p className="text-sm">{error}</p>
      </div>
    )
  }

  return (
    <div id="checkout">
      {clientSecret && (
        <EmbeddedCheckoutProvider
          stripe={stripePromise}
          options={{
            clientSecret,
          }}
        >
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      )}
    </div>
  )
}
