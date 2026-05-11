'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useCart } from '@/context/cart-context'
import { useState, useEffect } from 'react'
import { Check, Star, Users, Calendar, MapPin, X, Plus, Minus, ShoppingCart, Clock, Shirt, ArrowRight, UserPlus, Info } from 'lucide-react'
import { HotelBooking } from '@/components/sections/hotel-booking'
import { useRouter } from 'next/navigation'

// T-shirt sizes
const TSHIRT_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL']

// Badge component
const Badge = ({ children, className = '', ...props }) => {
  return (
    <div className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold ${className}`} {...props}>
      {children}
    </div>
  )
}

// Confirmation Popup Component with T-shirt sizes
const AddToCartPopup = ({ pkg, isOpen, onClose, onConfirm, onGoToCheckout, currentQuantity = 0 }) => {
  const [quantity, setQuantity] = useState(1)
  const [allSizesSelected, setAllSizesSelected] = useState(true) // Guest packages don't need t-shirts

  if (!isOpen) return null

  const totalPrice = pkg.price * quantity

  const handleConfirm = () => {
    onConfirm(pkg, quantity, [])
  }

  const handleGoToCheckout = () => {
    onConfirm(pkg, quantity, [])
    onGoToCheckout()
  }

  const increment = () => setQuantity(prev => prev > 10 ? 10 : prev + 1)
  const decrement = () => setQuantity(prev => prev > 1 ? prev - 1 : 1)

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-auto max-h-[90vh] overflow-y-auto">
        <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white p-6 rounded-t-2xl">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-bold">
                {currentQuantity > 0 ? 'Update Cart' : 'Add Guest Package'}
              </h3>
              <p className="text-purple-100 mt-1">
                {currentQuantity > 0 ? 'Update your selection' : 'Confirm your guest selection'}
              </p>
            </div>
            <button onClick={onClose} className="text-white hover:text-purple-200 transition-colors">
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <UserPlus className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 text-lg">{pkg.name}</h4>
              <p className="text-gray-600 text-base">Guest package for convention attendees</p>
              {currentQuantity > 0 && (
                <div className="text-base text-purple-600 mt-1">
                  Currently in cart: {currentQuantity}
                </div>
              )}
            </div>
          </div>

          <div className="mb-6 p-3 bg-purple-50 rounded-lg">
            <div className="flex items-center gap-2 text-purple-800">
              <Users className="h-5 w-5" />
              <span className="font-semibold">Guest Package</span>
            </div>
            <p className="text-sm text-purple-600 mt-1">
              For guests accompanying registered members
            </p>
          </div>

          <div className="mb-6">
            <label className="block text-base font-medium text-gray-700 mb-3">
              {currentQuantity > 0 ? 'Update Quantity' : 'Number of Guests'}
            </label>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={decrement}
                  className="w-12 h-12 rounded-full border-2 border-purple-500 text-purple-500 flex items-center justify-center hover:bg-purple-50 transition-colors"
                >
                  <Minus className="h-5 w-5" />
                </button>
                <span className="text-3xl font-bold text-gray-900 w-12 text-center">{quantity}</span>
                <button
                  onClick={increment}
                  className="w-12 h-12 rounded-full border-2 border-purple-500 text-purple-500 flex items-center justify-center hover:bg-purple-50 transition-colors"
                >
                  <Plus className="h-5 w-5" />
                </button>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-purple-600">${totalPrice}</div>
                <div className="text-base text-gray-500">${pkg.price} × {quantity}</div>
              </div>
            </div>
          </div>

          <div className="border-t pt-4">
            <h5 className="font-medium text-gray-900 text-lg mb-3">Includes:</h5>
            <div className="grid grid-cols-2 gap-2">
              {pkg.features?.slice(0, 6).map((feature, idx) => (
                <div key={idx} className="flex items-center gap-2 text-base text-gray-600">
                  <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 p-6 border-t">
          <Button variant="outline" onClick={onClose} className="flex-1 border-gray-300 hover:bg-gray-50 text-base">
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            className="flex-1 text-base bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white shadow-lg hover:shadow-xl"
          >
            {currentQuantity > 0 ? 'Update Cart' : 'Add to Cart'}
          </Button>
          <Button
            onClick={handleGoToCheckout}
            className="flex-1 text-base flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-lg hover:shadow-xl"
          >
            Go to Checkout
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default function GuestPage() {
  const { addToCart, cartItems } = useCart()
  const router = useRouter()
  const [packages, setPackages] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedPackage, setSelectedPackage] = useState(null)
  const [isPopupOpen, setIsPopupOpen] = useState(false)

  // Fetch packages from database
  useEffect(() => {
    fetchPackages()
  }, [])

  const fetchPackages = async () => {
    try {
      const res = await fetch('/api/packages')
      const data = await res.json()
      // Filter only guest packages
      const guestPackages = data.filter(pkg => 
        pkg.name.toLowerCase().includes('guest') || 
        pkg.category === 'Guest Package'
      )
      setPackages(guestPackages)
    } catch (error) {
      console.error('Failed to fetch packages:', error)
    } finally {
      setLoading(false)
    }
  }

  // Get current quantity for a package in cart
  const getCurrentQuantity = (pkgId) => {
    const cartItem = cartItems.find(item => item.id === pkgId)
    return cartItem ? cartItem.quantity : 0
  }

  const handleAddToCartClick = (pkg) => {
    setSelectedPackage(pkg)
    setIsPopupOpen(true)
  }

  const handleConfirmAddToCart = (pkg, quantity, tshirtSizes) => {
    addToCart({
      id: pkg.id,
      name: pkg.name,
      category: 'guest',
      price: pkg.price,
      quantity: quantity,
      tshirtSizes: [],
      isCouple: false
    })
    setIsPopupOpen(false)
    setSelectedPackage(null)
  }

  const handleGoToCheckout = () => {
    router.push('/cart?step=information')
  }

  const handleClosePopup = () => {
    setIsPopupOpen(false)
    setSelectedPackage(null)
  }

  const formatItems = (items) => {
    if (Array.isArray(items)) {
      return items
    }
    if (typeof items === 'string') {
      return items.split(',').map(item => item.trim())
    }
    return []
  }

  if (loading) {
    return (
      <main className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 via-white to-purple-50">
        <Header />
        <section className="flex-grow py-8">
          <div className="container mx-auto px-4 text-center">
            <div className="text-gray-600">Loading guest packages...</div>
          </div>
        </section>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 via-white to-purple-50">
      <Header />

      {selectedPackage && (
        <AddToCartPopup
          pkg={selectedPackage}
          isOpen={isPopupOpen}
          onClose={handleClosePopup}
          onConfirm={handleConfirmAddToCart}
          onGoToCheckout={handleGoToCheckout}
          currentQuantity={getCurrentQuantity(selectedPackage.id)}
        />
      )}

      <section className="flex-grow py-8">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-base font-medium mb-4">
              <Calendar className="h-4 w-4" />
              July 30th to August 2nd, 2026
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
              Guest Registration
            </h1>
            <p className="text-xl text-gray-600 mb-4 max-w-3xl mx-auto">
              Special packages for guests accompanying registered convention attendees.
              Enjoy the full convention experience with these exclusive guest packages.
            </p>
          </div>

          {/* Event Details Section */}
          <div className="max-w-5xl mx-auto mb-8">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-purple-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Info className="h-6 w-6 text-purple-600" />
                Event Information
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-purple-100 p-2 rounded-lg">
                    <Calendar className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Event Dates</p>
                    <p className="text-gray-600">July 30th to August 2nd, 2026</p>
                    <p className="text-sm text-gray-500">4 days of cultural celebration</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-purple-100 p-2 rounded-lg">
                    <MapPin className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Location</p>
                    <p className="text-gray-600">Great Lakes Region, USA</p>
                    <p className="text-sm text-purple-600 mt-1 flex items-center gap-1">
                      <span className="font-medium">Nearest Airport:</span> Detroit Metropolitan Airport (DTW)
                    </p>
                    <p className="text-xs text-gray-500 mt-1">Approximately 30-45 minutes drive</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-purple-100 p-2 rounded-lg">
                    <Users className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Organizer</p>
                    <p className="text-gray-600">Bafut Manjong Cultural Association USA</p>
                    <p className="text-sm text-gray-500">26th Annual Convention</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100">
                <p className="text-sm text-gray-500 italic">
                  Join us for our 26th Annual Convention - Strength in Unity
                </p>
              </div>
            </div>
          </div>

          {/* Hotel Booking Section */}
          <div className="mb-8">
            <HotelBooking />
          </div>

          {/* Guest Information Box */}
          <div className="max-w-5xl mx-auto mb-8">
            <div className="p-4 rounded-xl bg-purple-50 border border-purple-200">
              <div className="flex items-center gap-3">
                <UserPlus className="h-6 w-6 text-purple-600" />
                <div className="text-left">
                  <p className="font-semibold text-purple-800">Guest Information</p>
                  <p className="text-sm text-purple-600 mt-1">
                    These packages are designed for guests who are not registered members but wish to attend the convention.
                    Guests must be accompanied by a registered member.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Cart Summary */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Available Guest Packages</h2>
              <p className="text-gray-600 text-base mt-1">
                Showing <span className="font-semibold text-purple-600">{packages.length}</span> guest packages
              </p>
            </div>
            <div className="flex items-center gap-4 mt-2 sm:mt-0">
              <div className="flex items-center gap-2 text-base text-gray-600">
                <ShoppingCart className="h-5 w-5" />
                <span>{cartItems.reduce((sum, item) => sum + item.quantity, 0)} items in cart</span>
              </div>
              <Button
                onClick={() => router.push('/cart?step=information')}
                className="bg-green-600 hover:bg-green-700 text-white text-sm flex items-center gap-2"
                size="sm"
              >
                Go to Checkout
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Guest Packages Grid */}
          {packages.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
              <UserPlus className="h-12 w-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-500">No guest packages available at this time.</p>
              <p className="text-sm text-gray-400 mt-2">Please check back later for guest registration options.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {packages.map((pkg) => {
                const currentQuantity = getCurrentQuantity(pkg.id)
                const itemsList = formatItems(pkg.items)
                
                return (
                  <Card
                    key={pkg.id}
                    className={`flex flex-col hover:shadow-xl transition-all duration-300 overflow-hidden border-2 ${
                      currentQuantity > 0 
                        ? 'border-green-300 shadow-md ring-1 ring-green-200' 
                        : 'border-purple-200 hover:border-purple-400'
                    }`}
                  >
                    {pkg.popular && (
                      <div className="absolute top-3 right-3 z-10">
                        <Badge className="bg-gradient-to-r from-purple-600 to-purple-800 text-white flex items-center gap-1 text-sm">
                          <Star className="h-3 w-3 fill-current" />
                          Popular
                        </Badge>
                      </div>
                    )}

                    {currentQuantity > 0 && (
                      <div className="absolute top-3 left-3 z-10">
                        <Badge className="bg-green-500 text-white flex items-center gap-1 text-sm">
                          <ShoppingCart className="h-3 w-3" />
                          {currentQuantity} in cart
                        </Badge>
                      </div>
                    )}

                    <CardHeader className="relative p-5 bg-gradient-to-r from-purple-600 to-purple-800 text-white">
                      <CardTitle className="text-xl text-center">{pkg.name}</CardTitle>
                      <CardDescription className="text-purple-100 text-center text-base">
                        Guest Package
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="flex-grow p-5">
                      <div className="text-center mb-5">
                        <span className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                          ${pkg.price}
                        </span>
                        <p className="text-sm text-gray-500 mt-1">per guest</p>
                      </div>

                      <div className="mb-5">
                        <p className="font-semibold mb-2 flex items-center gap-2 text-gray-700">
                          <Check className="h-4 w-4 text-purple-500" />
                          What's Included:
                        </p>
                        <div className="grid grid-cols-1 gap-2">
                          {itemsList.slice(0, 6).map((feature, idx) => (
                            <div key={idx} className="flex items-start gap-2">
                              <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-gray-700 leading-relaxed">{feature}</span>
                            </div>
                          ))}
                          {itemsList.length > 6 && (
                            <p className="text-xs text-gray-500 pl-6">
                              +{itemsList.length - 6} more items
                            </p>
                          )}
                        </div>
                      </div>
                    </CardContent>

                    <div className="p-5 pt-0">
                      <Button
                        onClick={() => handleAddToCartClick(pkg)}
                        className={`w-full text-base font-semibold transition-all py-3 ${
                          currentQuantity > 0
                            ? 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700'
                            : 'bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900'
                        } text-white shadow-md hover:shadow-lg`}
                      >
                        {currentQuantity > 0 ? (
                          <span className="flex items-center gap-2">
                            <ShoppingCart className="h-4 w-4" />
                            Update ({currentQuantity})
                          </span>
                        ) : (
                          `Add to Cart - $${pkg.price}`
                        )}
                      </Button>
                    </div>
                  </Card>
                )
              })}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}