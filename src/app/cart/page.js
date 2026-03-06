'use client'

import { useState } from 'react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useCart } from '@/context/cart-context'
import { Trash2, Plus, Minus, ArrowLeft, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import Checkout from '@/components/checkout'

// Alert Component
const Alert = ({ message, type, onClose }) => {
  const bgColor = type === 'success' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
  const textColor = type === 'success' ? 'text-green-800' : 'text-red-800'
  const iconColor = type === 'success' ? 'text-green-400' : 'text-red-400'
  const icon = type === 'success' ? '✓' : '✗'

  return (
    <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg border ${bgColor} shadow-lg max-w-md animate-slide-in`}>
      <div className="flex items-start">
        <div className={`flex-shrink-0 ${iconColor}`}>
          <span className="text-2xl">{icon}</span>
        </div>
        <div className="ml-3 flex-1 whitespace-pre-line">
          <p className={`text-sm font-bold ${textColor}`}>
            {type === 'success' ? 'Success!' : 'Error!'}
          </p>
          <p className={`text-sm mt-1 ${textColor}`}>{message}</p>
        </div>
        <button
          onClick={onClose}
          className={`ml-4 ${textColor} hover:opacity-75`}
        >
          <span className="text-xl">&times;</span>
        </button>
      </div>
    </div>
  )
}

// US States for dropdown
const US_STATES = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
  'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
  'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
  'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
  'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
]

const initialCustomerInfo = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  state: '',
  zipCode: '',
  country: 'US',
  chapter: '',
}

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart()
  const [currentStep, setCurrentStep] = useState('cart')
  const [customerInfo, setCustomerInfo] = useState(initialCustomerInfo)
  const [formErrors, setFormErrors] = useState({})
  const [alert, setAlert] = useState(null)
  const [orderId, setOrderId] = useState(null)

  const total = getTotalPrice()

  const validateForm = () => {
    const errors = {}

    if (!customerInfo.firstName?.trim()) errors.firstName = 'First name is required'
    if (!customerInfo.lastName?.trim()) errors.lastName = 'Last name is required'
    if (!customerInfo.email?.trim()) {
      errors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(customerInfo.email)) {
      errors.email = 'Email is invalid'
    }
    if (!customerInfo.phone?.trim()) errors.phone = 'Phone number is required'
    if (!customerInfo.address?.trim()) errors.address = 'Address is required'
    if (!customerInfo.city?.trim()) errors.city = 'City is required'
    if (!customerInfo.state) errors.state = 'State is required'
    if (!customerInfo.zipCode?.trim()) errors.zipCode = 'ZIP code is required'
    if (!customerInfo.chapter?.trim()) errors.chapter = 'Chapter ID is required'

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleInputChange = (field, value) => {
    setCustomerInfo(prev => ({ ...prev, [field]: value }))
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const handleContinueToInformation = () => {
    setCurrentStep('information')
  }

  const handleBackToCart = () => {
    setCurrentStep('cart')
  }

  const handleContinueToPayment = () => {
    if (validateForm()) {
      setCurrentStep('payment')
    } else {
      setAlert({
        type: 'error',
        message: 'Please fill in all required fields correctly before proceeding to payment.'
      })
      setTimeout(() => setAlert(null), 5000)
    }
  }

  const handlePaymentSuccess = (receivedOrderId) => {
    setOrderId(receivedOrderId)
    clearCart()

    // Show success alert
    setAlert({
      type: 'success',
      message: `Thank you for your purchase, ${customerInfo.firstName}!\n\nOrder ID: ${receivedOrderId}\n\nA confirmation email will be sent to ${customerInfo.email} shortly.`
    })

    // Auto-hide after 8 seconds
    setTimeout(() => setAlert(null), 8000)

    // Reset to cart view after successful payment
    setTimeout(() => {
      setCurrentStep('cart')
      setCustomerInfo(initialCustomerInfo)
      setOrderId(null)
    }, 3000)
  }

  const handlePaymentError = (error) => {
    console.error('Checkout error:', error)

    let errorMessage = 'Payment failed. Please try again.'
    let errorDetails = ''

    // Parse different types of errors
    if (typeof error === 'string') {
      errorMessage = error
    } else if (error?.message) {
      errorMessage = error.message
    }

    // Handle specific Stripe errors with user-friendly messages
    if (errorMessage.includes('card') || errorMessage.includes('Card')) {
      if (errorMessage.includes('declined')) {
        errorDetails = 'Your card was declined. Please try a different card.'
      } else if (errorMessage.includes('insufficient funds')) {
        errorDetails = 'Your card has insufficient funds.'
      } else if (errorMessage.includes('expired')) {
        errorDetails = 'Your card has expired. Please use a different card.'
      } else if (errorMessage.includes('number')) {
        errorDetails = 'The card number is invalid. Please check and try again.'
      } else if (errorMessage.includes('CVC') || errorMessage.includes('cvc')) {
        errorDetails = 'The security code (CVC) is invalid.'
      } else {
        errorDetails = 'Please check your card details and try again.'
      }
    } else if (errorMessage.includes('authentication') || errorMessage.includes('3D Secure')) {
      errorDetails = 'Additional authentication required. Please complete the bank verification process.'
    } else if (errorMessage.includes('network') || errorMessage.includes('connection')) {
      errorDetails = 'Network issue detected. Please check your internet connection and try again.'
    } else if (errorMessage.includes('timeout')) {
      errorDetails = 'The request timed out. Please try again.'
    } else if (errorMessage.includes('email')) {
      errorDetails = 'There was an issue with your email address. Please verify it.'
    } else if (errorMessage.includes('amount') || errorMessage.includes('total')) {
      errorDetails = 'There was an issue with the payment amount. Please contact support.'
    }

    // Show error alert
    setAlert({
      type: 'error',
      message: `Payment Failed\n\n${errorMessage}\n${errorDetails ? '\n' + errorDetails : ''}\n\nPlease check your information and try again.`
    })

    // Auto-hide after 10 seconds
    setTimeout(() => setAlert(null), 10000)

    // Return to information step to correct any issues
    setCurrentStep('information')
  }

  if (cartItems.length === 0 && currentStep === 'cart') {
    return (
      <main className="min-h-screen flex flex-col">
        <Header />
        <section className="flex-grow bg-gradient-to-b from-orange-50 to-white py-12">
          <div className="container mx-auto px-4">
            <div className="text-center py-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Shopping Cart</h1>
              <p className="text-gray-600 mb-8">Your cart is empty</p>
              <Button asChild className="bg-[#F5A623] text-white hover:bg-[#F5A623]/90">
                <Link href="/convention">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Continue Shopping
                </Link>
              </Button>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      {/* Alert Popup */}
      {alert && (
        <Alert
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert(null)}
        />
      )}

      <section className="flex-grow bg-gradient-to-b from-orange-50 to-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

          {/* Checkout Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-center space-x-4">
              <div className={`flex items-center ${currentStep === 'cart' ? 'text-[#F5A623]' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 
                  ${currentStep === 'cart' ? 'border-[#F5A623] bg-[#F5A623] text-white' : 'border-gray-300'}`}>
                  1
                </div>
                <span className="ml-2 font-medium">Cart</span>
              </div>
              <div className={`w-12 h-0.5 ${currentStep === 'information' || currentStep === 'payment' ? 'bg-[#F5A623]' : 'bg-gray-300'}`} />
              <div className={`flex items-center ${currentStep === 'information' ? 'text-[#F5A623]' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 
                  ${currentStep === 'information' ? 'border-[#F5A623] bg-[#F5A623] text-white' :
                    currentStep === 'payment' ? 'border-green-500 bg-green-500 text-white' : 'border-gray-300'}`}>
                  {currentStep === 'payment' ? <CheckCircle className="w-4 h-4" /> : '2'}
                </div>
                <span className="ml-2 font-medium">Information</span>
              </div>
              <div className={`w-12 h-0.5 ${currentStep === 'payment' ? 'bg-[#F5A623]' : 'bg-gray-300'}`} />
              <div className={`flex items-center ${currentStep === 'payment' ? 'text-[#F5A623]' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 
                  ${currentStep === 'payment' ? 'border-[#F5A623] bg-[#F5A623] text-white' : 'border-gray-300'}`}>
                  3
                </div>
                <span className="ml-2 font-medium">Payment</span>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Cart Items or Checkout Form */}
            <div className="lg:col-span-2">
              {currentStep === 'cart' && (
                <Card>
                  <CardHeader>
                    <CardTitle>Order Items ({cartItems.length})</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {cartItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex gap-4 pb-6 border-b last:border-b-0 last:pb-0"
                      >
                        <div className="flex-grow">
                          <h3 className="font-semibold text-gray-900">{item.name}</h3>
                          <p className="text-sm text-gray-500 capitalize mb-2">{item.category}</p>
                          <p className="font-bold text-[#F5A623]">${item.price}</p>
                        </div>

                        <div className="flex items-center gap-2">
                          <Button
                            size="icon"
                            variant="outline"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="h-8 w-8"
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <Input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => {
                              const val = parseInt(e.target.value) || 1
                              updateQuantity(item.id, Math.max(1, val))
                            }}
                            className="w-16 text-center"
                            min="1"
                          />
                          <Button
                            size="icon"
                            variant="outline"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="h-8 w-8"
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="text-right w-24">
                          <p className="font-bold text-gray-900">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50 mt-2"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}

              {currentStep === 'information' && (
                <Card>
                  <CardHeader>
                    <CardTitle>Customer Information</CardTitle>
                    <CardDescription>
                      Please provide your details for the order
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
                      {/* Name Fields */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label htmlFor="firstName" className="text-sm font-medium leading-none">
                            First Name *
                          </label>
                          <Input
                            id="firstName"
                            value={customerInfo.firstName}
                            onChange={(e) => handleInputChange('firstName', e.target.value)}
                            className={formErrors.firstName ? 'border-red-500' : ''}
                          />
                          {formErrors.firstName && (
                            <p className="text-sm text-red-500">{formErrors.firstName}</p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="lastName" className="text-sm font-medium leading-none">
                            Last Name *
                          </label>
                          <Input
                            id="lastName"
                            value={customerInfo.lastName}
                            onChange={(e) => handleInputChange('lastName', e.target.value)}
                            className={formErrors.lastName ? 'border-red-500' : ''}
                          />
                          {formErrors.lastName && (
                            <p className="text-sm text-red-500">{formErrors.lastName}</p>
                          )}
                        </div>
                      </div>

                      {/* Contact Info */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label htmlFor="email" className="text-sm font-medium leading-none">
                            Email Address *
                          </label>
                          <Input
                            id="email"
                            type="email"
                            value={customerInfo.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            className={formErrors.email ? 'border-red-500' : ''}
                          />
                          {formErrors.email && (
                            <p className="text-sm text-red-500">{formErrors.email}</p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="phone" className="text-sm font-medium leading-none">
                            Phone Number *
                          </label>
                          <Input
                            id="phone"
                            type="tel"
                            value={customerInfo.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                            placeholder="+1 (234) 567-8900"
                            className={formErrors.phone ? 'border-red-500' : ''}
                          />
                          {formErrors.phone && (
                            <p className="text-sm text-red-500">{formErrors.phone}</p>
                          )}
                        </div>
                      </div>

                      {/* Address */}
                      <div className="space-y-2">
                        <label htmlFor="address" className="text-sm font-medium leading-none">
                          Street Address *
                        </label>
                        <Input
                          id="address"
                          value={customerInfo.address}
                          onChange={(e) => handleInputChange('address', e.target.value)}
                          placeholder="123 Main St"
                          className={formErrors.address ? 'border-red-500' : ''}
                        />
                        {formErrors.address && (
                          <p className="text-sm text-red-500">{formErrors.address}</p>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label htmlFor="city" className="text-sm font-medium leading-none">
                            City *
                          </label>
                          <Input
                            id="city"
                            value={customerInfo.city}
                            onChange={(e) => handleInputChange('city', e.target.value)}
                            className={formErrors.city ? 'border-red-500' : ''}
                          />
                          {formErrors.city && (
                            <p className="text-sm text-red-500">{formErrors.city}</p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="state" className="text-sm font-medium leading-none">
                            State *
                          </label>
                          <select
                            id="state"
                            value={customerInfo.state}
                            onChange={(e) => handleInputChange('state', e.target.value)}
                            className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${formErrors.state ? 'border-red-500' : ''
                              }`}
                          >
                            <option value="">Select state</option>
                            {US_STATES.map((state) => (
                              <option key={state} value={state}>
                                {state}
                              </option>
                            ))}
                          </select>
                          {formErrors.state && (
                            <p className="text-sm text-red-500">{formErrors.state}</p>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label htmlFor="zipCode" className="text-sm font-medium leading-none">
                            ZIP Code *
                          </label>
                          <Input
                            id="zipCode"
                            value={customerInfo.zipCode}
                            onChange={(e) => handleInputChange('zipCode', e.target.value)}
                            className={formErrors.zipCode ? 'border-red-500' : ''}
                          />
                          {formErrors.zipCode && (
                            <p className="text-sm text-red-500">{formErrors.zipCode}</p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="country" className="text-sm font-medium leading-none">
                            Country
                          </label>
                          <select
                            id="country"
                            value={customerInfo.country}
                            onChange={(e) => handleInputChange('country', e.target.value)}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            <option value="US">United States</option>
                            <option value="CA">Canada</option>
                            <option value="UK">United Kingdom</option>
                          </select>
                        </div>
                      </div>

                      {/* Chapter Field */}
                      <div className="space-y-2">
                        <label htmlFor="chapter" className="text-sm font-medium leading-none">
                          Chapter ID *
                        </label>
                        <Input
                          id="chapter"
                          value={customerInfo.chapter}
                          onChange={(e) => handleInputChange('chapter', e.target.value)}
                          placeholder="e.g., LAG-001, ABJ-123, PH-789"
                          className={formErrors.chapter ? 'border-red-500' : ''}
                        />
                        {formErrors.chapter && (
                          <p className="text-sm text-red-500">{formErrors.chapter}</p>
                        )}
                        <p className="text-xs text-gray-500 mt-1">
                          Enter your chapter identification code
                        </p>
                      </div>

                      <div className="flex gap-4 pt-4">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={handleBackToCart}
                        >
                          Back to Cart
                        </Button>
                        <Button
                          type="button"
                          onClick={handleContinueToPayment}
                          className="flex-1 bg-[#F5A623] text-white hover:bg-[#F5A623]/90"
                        >
                          Continue to Payment
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              )}

// In your CartPage component, when rendering Checkout:

              {currentStep === 'payment' && (
                <Card>
                  <CardHeader>
                    <CardTitle>Payment</CardTitle>
                    <CardDescription>
                      Complete your payment securely
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Checkout
                      cartItems={cartItems}  // These should be stable
                      customerInfo={customerInfo}  // These should be stable
                      total={total}
                      onSuccess={handlePaymentSuccess}
                      onError={handlePaymentError}
                    />

                    <Button
                      variant="outline"
                      onClick={() => setCurrentStep('information')}
                      className="mt-4"
                    >
                      Back to Information
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Right Column - Order Summary (Always Visible) */}
            <div>
              <Card className="sticky top-20">
                <CardHeader className="bg-[#F5A623] text-white">
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  {/* Order Items Summary */}
                  <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span className="text-gray-600">
                          {item.name} x {item.quantity}
                        </span>
                        <span className="font-medium">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-semibold">${total.toFixed(2)}</span>
                    </div>
                    <div className="border-t pt-4 flex justify-between">
                      <span className="font-bold text-gray-900">Total</span>
                      <span className="text-2xl font-bold text-[#F5A623]">${total.toFixed(2)}</span>
                    </div>
                  </div>

                  {currentStep === 'cart' && (
                    <Button
                      onClick={handleContinueToInformation}
                      className="w-full bg-[#F5A623] text-white hover:bg-[#F5A623]/90 mb-3"
                    >
                      Proceed to Checkout
                    </Button>
                  )}

                  {/* Customer Info Summary (when in payment step) */}
                  {currentStep === 'payment' && (
                    <div className="mb-4 p-3 bg-gray-50 rounded-lg text-sm">
                      <p className="font-medium mb-2">Shipping to:</p>
                      <p>{customerInfo.firstName} {customerInfo.lastName}</p>
                      <p>{customerInfo.address}</p>
                      <p>{customerInfo.city}, {customerInfo.state} {customerInfo.zipCode}</p>
                      <p className="mt-2">Chapter: {customerInfo.chapter}</p>
                      <p className="mt-1 text-xs text-gray-500">Email: {customerInfo.email}</p>
                      <p className="text-xs text-gray-500">Phone: {customerInfo.phone}</p>
                    </div>
                  )}

                  <Button variant="outline" className="w-full">
                    Save for Later
                  </Button>

                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <p className="text-xs text-gray-600 whitespace-pre-line">
                      ✓ Secure checkout
                      {'\n'}✓ All payments non-refundable
                      {'\n'}✓ Instant confirmation
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}