'use client'

import { useCallback, useEffect, useState } from 'react'
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

import { startCheckoutSession, getCheckoutSessionStatus } from '@/app/actions/stripe'

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
)

export default function Checkout({
  cartItems = [],
  email,
  onSuccess,
  onError,
}) {
  const [clientSecret, setClientSecret] = useState('')
  const [orderId, setOrderId] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const startCheckout = useCallback(async () => {
    try {
      setLoading(true)
      setError('')
      
      // Pass cart items instead of single productId
      const { clientSecret: secret, orderId: id } = 
        await startCheckoutSession(cartItems, email)
      
      setClientSecret(secret)
      setOrderId(id)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to start checkout'
      setError(message)
      onError?.(message)
    } finally {
      setLoading(false)
    }
  }, [cartItems, email, onError])

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
