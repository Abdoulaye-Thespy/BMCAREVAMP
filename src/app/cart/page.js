'use client'

import { useState } from 'react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useCart } from '@/context/cart-context'
import { Trash2, Plus, Minus, ArrowLeft, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import Checkout from '@/components/checkout'

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
  chapter: '', // This will be a string like "LAG-001" or "ABJ-123"
}

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart()
  const [currentStep, setCurrentStep] = useState('cart') // 'cart', 'information', 'payment'
  const [customerInfo, setCustomerInfo] = useState(initialCustomerInfo)
  const [formErrors, setFormErrors] = useState({})

  const total = getTotalPrice()
  const tax = total * 0.1
  const grandTotal = total + tax

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
    // Clear error for this field when user starts typing
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
    }
  }

  const handlePaymentSuccess = (orderId) => {
    clearCart()
    setCurrentStep('cart')
    setCustomerInfo(initialCustomerInfo)
    console.log('Order completed:', orderId)
    // You could redirect to a success page or show a success message
  }

  const handlePaymentError = (error) => {
    console.error('Checkout error:', error)
    setCurrentStep('information')
  }

  if (cartItems.length === 0) {
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
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <Input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => {
                              const val = parseInt(e.target.value) || 1
                              updateQuantity(item.id, val)
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
                          <Label htmlFor="firstName">First Name *</Label>
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
                          <Label htmlFor="lastName">Last Name *</Label>
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
                          <Label htmlFor="email">Email Address *</Label>
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
                          <Label htmlFor="phone">Phone Number *</Label>
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
                        <Label htmlFor="address">Street Address *</Label>
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
                          <Label htmlFor="city">City *</Label>
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
                          <Label htmlFor="state">State *</Label>
                          <Select
                            value={customerInfo.state}
                            onValueChange={(value) => handleInputChange('state', value)}
                          >
                            <SelectTrigger className={formErrors.state ? 'border-red-500' : ''}>
                              <SelectValue placeholder="Select state" />
                            </SelectTrigger>
                            <SelectContent>
                              {US_STATES.map((state) => (
                                <SelectItem key={state} value={state}>
                                  {state}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          {formErrors.state && (
                            <p className="text-sm text-red-500">{formErrors.state}</p>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="zipCode">ZIP Code *</Label>
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
                          <Label htmlFor="country">Country</Label>
                          <Select
                            value={customerInfo.country}
                            onValueChange={(value) => handleInputChange('country', value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select country" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="US">United States</SelectItem>
                              <SelectItem value="CA">Canada</SelectItem>
                              <SelectItem value="UK">United Kingdom</SelectItem>
                              <SelectItem value="NG">Nigeria</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      {/* Chapter Field - Now an input field for custom chapter ID */}
                      <div className="space-y-2">
                        <Label htmlFor="chapter">Chapter ID *</Label>
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
                      cartItems={cartItems}
                      customerInfo={customerInfo}
                      total={grandTotal}
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
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Tax (10%)</span>
                      <span className="font-semibold">${tax.toFixed(2)}</span>
                    </div>
                    <div className="border-t pt-4 flex justify-between">
                      <span className="font-bold text-gray-900">Grand Total</span>
                      <span className="text-2xl font-bold text-[#F5A623]">${grandTotal.toFixed(2)}</span>
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
                    </div>
                  )}

                  <Button variant="outline" className="w-full">
                    Save for Later
                  </Button>

                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <p className="text-xs text-gray-600">
                      ✓ Secure checkout
                      <br />
                      ✓ All payments non-refundable
                      <br />
                      ✓ Instant confirmation
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