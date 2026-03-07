'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { startCheckoutSession } from '@/app/actions/stripe'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

export default function Checkout({ cartItems, customerInfo, onSuccess, onError }) {
  const [clientSecret, setClientSecret] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  const initialized = useRef(false)
  const sessionIdRef = useRef(null)

  useEffect(() => {
    if (initialized.current) return

    let isMounted = true

    async function initializeCheckout() {
      try {
        setLoading(true)
        setError(null)
        
        console.log('Initializing checkout...')
        
        if (!cartItems?.length || !customerInfo?.email) {
          throw new Error('Missing required information')
        }

        const result = await startCheckoutSession(cartItems, customerInfo)
        
        if (!isMounted) return
        
        if (result?.clientSecret) {
          sessionIdRef.current = result.orderId
          setClientSecret(result.clientSecret)
          initialized.current = true
          console.log('✅ Checkout ready for order:', result.orderId)
        }
      } catch (err) {
        console.error('Checkout error:', err)
        if (isMounted) {
          setError(err.message)
          onError?.(err)
        }
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    initializeCheckout()
    return () => { isMounted = false }
  }, [cartItems, customerInfo, onError])

  // This fires when payment is COMPLETE!
  const handleComplete = useCallback(() => {
    console.log('💰💰💰 Payment completed successfully!')
    console.log('Order ID:', sessionIdRef.current)
    
    // Pass the order ID to parent component
    onSuccess?.(sessionIdRef.current)
  }, [onSuccess])

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#F5A623] mb-4"></div>
        <p className="text-gray-600">Preparing secure checkout...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h3 className="text-red-800 font-semibold mb-2">Checkout Error</h3>
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-[#F5A623] text-white px-4 py-2 rounded hover:bg-[#F5A623]/90"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  if (!clientSecret) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">Unable to initialize checkout.</p>
      </div>
    )
  }

  return (
    <div id="checkout" className="min-h-[500px]">
      <EmbeddedCheckoutProvider
        stripe={stripePromise}
        options={{ 
          clientSecret, 
          onComplete: handleComplete // THIS IS KEY!
        }}
      >
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  )
}