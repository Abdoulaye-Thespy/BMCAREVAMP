'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { startCheckoutSession } from '@/app/actions/stripe'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

export default function Checkout({ cartItems, customerInfo, total, onSuccess, onError }) {
  const [clientSecret, setClientSecret] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  // Use refs to track initialization state across re-renders
  const initialized = useRef(false)
  const sessionIdRef = useRef(null)
  const initializationInProgress = useRef(false)

  // Memoize the cart and customer info to prevent unnecessary re-renders
  const cartString = useRef(JSON.stringify(cartItems))
  const customerString = useRef(JSON.stringify(customerInfo))

  useEffect(() => {
    // Check if cart or customer actually changed
    const newCartString = JSON.stringify(cartItems)
    const newCustomerString = JSON.stringify(customerInfo)
    
    if (newCartString !== cartString.current || newCustomerString !== customerString.current) {
      console.log('Cart or customer info changed, resetting checkout')
      cartString.current = newCartString
      customerString.current = newCustomerString
      initialized.current = false
      sessionIdRef.current = null
      setClientSecret('')
    }
  }, [cartItems, customerInfo])

  useEffect(() => {
    // CRITICAL: Prevent multiple initializations
    if (initialized.current) {
      console.log('Checkout already initialized, skipping...')
      return
    }

    // Prevent parallel initialization attempts
    if (initializationInProgress.current) {
      console.log('Initialization already in progress, skipping...')
      return
    }

    let isMounted = true
    let timeoutId = null

    async function initializeCheckout() {
      // Mark initialization as in progress
      initializationInProgress.current = true
      
      try {
        setLoading(true)
        setError(null)
        
        console.log('🚀 Initializing checkout (ONCE)...')
        console.log('Cart items:', cartItems.length)
        console.log('Customer:', customerInfo.email)
        
        // Validate required data
        if (!cartItems?.length) {
          throw new Error('No items in cart')
        }

        if (!customerInfo?.email) {
          throw new Error('Customer email is required')
        }

        // Call server action to create checkout session
        const result = await startCheckoutSession(cartItems, customerInfo)
        
        if (!isMounted) return
        
        if (result?.clientSecret) {
          // Store the session info
          sessionIdRef.current = result.orderId
          setClientSecret(result.clientSecret)
          
          console.log('✅ Checkout initialized successfully!')
          console.log('Order ID:', result.orderId)
          console.log('Client secret (first 10 chars):', result.clientSecret.substring(0, 10) + '...')
          
          // Mark as initialized - THIS PREVENTS DUPLICATES
          initialized.current = true
        } else {
          throw new Error('Failed to initialize checkout - no client secret received')
        }
      } catch (err) {
        console.error('❌ Checkout initialization error:', err)
        if (isMounted) {
          setError(err.message || 'Failed to initialize checkout')
          onError?.(err)
          
          // Allow retry on error
          initialized.current = false
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
        initializationInProgress.current = false
      }
    }

    // Small delay to prevent double initialization in Strict Mode
    timeoutId = setTimeout(() => {
      initializeCheckout()
    }, 100)

    return () => {
      isMounted = false
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }, []) // ← EMPTY DEPENDENCY ARRAY - ONLY RUNS ONCE!

  const handleComplete = useCallback(() => {
    console.log('💰 Checkout completed for order:', sessionIdRef.current)
    onSuccess?.(sessionIdRef.current)
  }, [onSuccess])

  const handleRetry = useCallback(() => {
    // Reset all state and refs
    initialized.current = false
    sessionIdRef.current = null
    initializationInProgress.current = false
    setClientSecret('')
    setLoading(true)
    setError(null)
  }, [])

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#F5A623] mb-4"></div>
        <p className="text-gray-600">Preparing secure checkout...</p>
        <p className="text-xs text-gray-400 mt-2">This should only take a moment</p>
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
            onClick={handleRetry}
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
        <p className="text-gray-600">Unable to initialize checkout. Please try again.</p>
        <button
          onClick={handleRetry}
          className="mt-4 bg-[#F5A623] text-white px-4 py-2 rounded hover:bg-[#F5A623]/90"
        >
          Retry
        </button>
      </div>
    )
  }

  return (
    <div id="checkout" className="min-h-[500px]">
      <EmbeddedCheckoutProvider
        stripe={stripePromise}
        options={{ 
          clientSecret, 
          onComplete: handleComplete 
        }}
      >
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  )
}