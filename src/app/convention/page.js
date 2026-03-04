'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useCart } from '@/context/cart-context'
import { useState, useMemo, useEffect } from 'react'
import { Check, Filter, Star, Users, Calendar, MapPin, X, Plus, Minus, ShoppingCart, ChevronDown, Clock, Shirt, ArrowRight } from 'lucide-react'
import { HotelBooking } from '@/components/sections/hotel-booking'
import { useRouter } from 'next/navigation'

// Deadline dates from the image (Central US/Canada time)
const DEADLINES = {
  EARLY_BIRD: { 
    end: "May 31, 2026 23:59:59", 
    label: "Early Bird",
    description: "Save up to $40"
  },
  STANDARD: { 
    start: "June 1, 2026 00:00:00",
    end: "June 30, 2026 23:59:59", 
    label: "Standard"
  },
  LATE: { 
    start: "July 1, 2026 00:00:00",
    end: "July 13, 2026 23:59:59", 
    label: "Late",
    description: "Limited availability"
  }
}

// T-shirt sizes
const TSHIRT_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL']

// Temporary Badge component
const Badge = ({ children, className = '', ...props }) => {
  return (
    <div className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold ${className}`} {...props}>
      {children}
    </div>
  )
}

// Confirmation Popup Component with T-shirt sizes - FIXED
const AddToCartPopup = ({ pkg, isOpen, onClose, onConfirm, onGoToCheckout, currentQuantity = 0, deadline }) => {
  const [quantity, setQuantity] = useState(1)
  const [tshirtSizes, setTshirtSizes] = useState([])
  const [allSizesSelected, setAllSizesSelected] = useState(false)
  
  // Calculate number of t-shirts needed based on package type and quantity
  const getTshirtCount = () => {
    if (pkg.category === 'couple') {
      return quantity * 2 // Couple package needs 2 shirts per package × quantity
    }
    return quantity // All others need 1 shirt per package
  }

  const tshirtCount = getTshirtCount()

  // Initialize t-shirt sizes array when quantity or package changes
  useEffect(() => {
    // Initialize with empty strings (no default size)
    setTshirtSizes(Array(tshirtCount).fill(''))
  }, [tshirtCount, isOpen])

  useEffect(() => {
    if (currentQuantity > 0) {
      setQuantity(currentQuantity + 1)
    } else {
      setQuantity(1)
    }
  }, [currentQuantity, isOpen])

  // Check if all t-shirt sizes are selected
  useEffect(() => {
    // Check if every size has been selected (not empty string)
    const allSelected = tshirtSizes.every(size => size !== '')
    setAllSizesSelected(allSelected)
  }, [tshirtSizes])

  if (!isOpen) return null

  const totalPrice = pkg.price * quantity

  const handleConfirm = () => {
    if (allSizesSelected) {
      onConfirm(pkg, quantity, tshirtSizes)
    }
  }

  const handleGoToCheckout = () => {
    if (allSizesSelected) {
      // First add to cart, then go to checkout
      onConfirm(pkg, quantity, tshirtSizes)
      onGoToCheckout()
    }
  }

  const increment = () => setQuantity(prev => prev + 1)
  const decrement = () => setQuantity(prev => prev > 1 ? prev - 1 : 1)

  const updateTshirtSize = (index, size) => {
    const newSizes = [...tshirtSizes]
    newSizes[index] = size
    setTshirtSizes(newSizes)
  }

  // Generate person labels for couple packages
  const getPersonLabel = (index) => {
    if (pkg.category !== 'couple') return `Person ${index + 1}`
    
    const packageNumber = Math.floor(index / 2) + 1
    const personInPackage = index % 2 === 0 ? 'Person 1' : 'Person 2'
    return `Package ${packageNumber} - ${personInPackage}`
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-auto max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 rounded-t-2xl">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-bold">
                {currentQuantity > 0 ? 'Update Cart' : 'Add to Cart'}
              </h3>
              <p className="text-blue-100 mt-1">
                {currentQuantity > 0 ? 'Update your selection' : 'Confirm your selection'}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-blue-200 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Package Info */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Star className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 text-lg">{pkg.name}</h4>
              <p className="text-gray-600 text-base">{pkg.description}</p>
              {currentQuantity > 0 && (
                <div className="text-base text-blue-600 mt-1">
                  Currently in cart: {currentQuantity}
                </div>
              )}
            </div>
          </div>

          {/* Price Period Indicator */}
          <div className="mb-6 p-3 bg-blue-50 rounded-lg">
            <div className="flex items-center gap-2 text-blue-800">
              <Clock className="h-5 w-5" />
              <span className="font-semibold">{deadline.label} Pricing</span>
            </div>
            <p className="text-sm text-blue-600 mt-1">
              {deadline.description}
            </p>
          </div>

          {/* Quantity Selector */}
          <div className="mb-6">
            <label className="block text-base font-medium text-gray-700 mb-3">
              {currentQuantity > 0 ? 'Update Quantity' : 'Quantity'}
            </label>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={decrement}
                  className="w-12 h-12 rounded-full border-2 border-blue-500 text-blue-500 flex items-center justify-center hover:bg-blue-50 transition-colors"
                >
                  <Minus className="h-5 w-5" />
                </button>
                <span className="text-3xl font-bold text-gray-900 w-12 text-center">{quantity}</span>
                <button
                  onClick={increment}
                  className="w-12 h-12 rounded-full border-2 border-blue-500 text-blue-500 flex items-center justify-center hover:bg-blue-50 transition-colors"
                >
                  <Plus className="h-5 w-5" />
                </button>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-blue-600">${totalPrice}</div>
                <div className="text-base text-gray-500">${pkg.price} × {quantity}</div>
              </div>
            </div>
          </div>

          {/* T-shirt Size Selection */}
          {tshirtCount > 0 && (
            <div className="mb-6 border-t pt-4">
              <div className="flex items-center gap-2 mb-4">
                <Shirt className="h-5 w-5 text-blue-600" />
                <h5 className="font-semibold text-gray-900 text-lg">
                  Select T-shirt Sizes ({tshirtCount} {tshirtCount === 1 ? 'shirt' : 'shirts'})
                </h5>
                {pkg.category === 'couple' && (
                  <p className="text-sm text-gray-500 ml-2">(2 shirts per couple package)</p>
                )}
              </div>
              
              <div className="space-y-3">
                {Array.from({ length: tshirtCount }).map((_, index) => (
                  <div key={index} className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
                    <span className="text-sm font-medium text-gray-700 w-32">
                      {getPersonLabel(index)}
                    </span>
                    <select
                      value={tshirtSizes[index] || ''}
                      onChange={(e) => updateTshirtSize(index, e.target.value)}
                      className={`flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base ${
                        tshirtSizes[index] ? 'border-gray-300' : 'border-red-300 bg-red-50'
                      }`}
                    >
                      <option value="" disabled>Select a size</option>
                      {TSHIRT_SIZES.map(size => (
                        <option key={size} value={size}>{size}</option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
              
              {!allSizesSelected && (
                <p className="text-sm text-red-500 mt-2 flex items-center gap-1">
                  <X className="h-4 w-4" />
                  Please select all t-shirt sizes
                </p>
              )}
            </div>
          )}

          {/* Features Preview */}
          <div className="border-t pt-4">
            <h5 className="font-medium text-gray-900 text-lg mb-3">Includes:</h5>
            <div className="grid grid-cols-2 gap-2">
              {pkg.features.slice(0, 6).map((feature, idx) => (
                <div key={idx} className="flex items-center gap-2 text-base text-gray-600">
                  <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 p-6 border-t">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1 border-gray-300 hover:bg-gray-50 text-base"
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={!allSizesSelected}
            className={`flex-1 text-base ${
              allSizesSelected
                ? 'bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white shadow-lg hover:shadow-xl'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {currentQuantity > 0 ? 'Update Cart' : 'Add to Cart'}
          </Button>
          <Button
            onClick={handleGoToCheckout}
            disabled={!allSizesSelected}
            className={`flex-1 text-base flex items-center justify-center gap-2 ${
              allSizesSelected
                ? 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-lg hover:shadow-xl'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Go to Checkout
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

// Helper function to determine current pricing period based on date (Central US/Canada time)
const getCurrentDeadline = () => {
  const now = new Date()
  
  // Convert to Central US/Canada time
  const centralTime = new Date(now.toLocaleString('en-US', { timeZone: 'America/Chicago' }))
  
  const earlyBirdEnd = new Date(DEADLINES.EARLY_BIRD.end)
  const standardStart = new Date(DEADLINES.STANDARD.start)
  const standardEnd = new Date(DEADLINES.STANDARD.end)
  const lateStart = new Date(DEADLINES.LATE.start)
  const lateEnd = new Date(DEADLINES.LATE.end)

  if (centralTime <= earlyBirdEnd) {
    return {
      ...DEADLINES.EARLY_BIRD,
      type: 'EARLY_BIRD'
    }
  } else if (centralTime >= standardStart && centralTime <= standardEnd) {
    return {
      ...DEADLINES.STANDARD,
      type: 'STANDARD'
    }
  } else if (centralTime >= lateStart && centralTime <= lateEnd) {
    return {
      ...DEADLINES.LATE,
      type: 'LATE'
    }
  } else {
    // After late deadline
    return {
      ...DEADLINES.LATE,
      type: 'LATE',
      expired: true
    }
  }
}

// Get only Early Bird packages with simplified names
const getEarlyBirdPackages = (packages) => {
  return packages
    .filter(pkg => pkg.name.toLowerCase().includes('early bird'))
    .map(pkg => {
      // Extract category from the full name
      const fullName = pkg.name
      let simpleName = pkg.category
      let categoryKey = ''
      
      // Clean up the name and set proper category key for filtering
      if (fullName.includes('Kids')) {
        simpleName = 'Kids'
        categoryKey = 'kids'
      } else if (fullName.includes('Elderly')) {
        simpleName = 'Elderly 75+'
        categoryKey = 'elderly'
      } else if (fullName.includes('Singles')) {
        simpleName = 'Adult'
        categoryKey = 'adult'
      } else if (fullName.includes('Couples')) {
        simpleName = 'Couple'
        categoryKey = 'couple'
      } else if (fullName.includes('Non-Registered')) {
        simpleName = 'Non-Registered'
        categoryKey = 'non-registered'
      }
      
      return {
        id: pkg.id.toString(),
        name: simpleName,
        originalName: pkg.name,
        category: categoryKey, // Use the mapped category key
        displayCategory: pkg.category,
        price: pkg.price,
        description: simpleName,
        features: pkg.items.split(',').map(item => item.trim()),
        popular: pkg.category.includes('Couple') || pkg.name.includes('Cultural'),
      }
    })
}

const categoryLabels = {
  kids: 'Kids',
  adult: 'Adult',
  couple: 'Couple',
  elderly: 'Elderly 75+',
  'non-registered': 'Non-Registered Elites'
}

// Mobile Filters Component - Only Categories
const MobileFilters = ({ 
  selectedCategory, 
  setSelectedCategory, 
  filteredCount,
  totalCount
}) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="lg:hidden mb-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between"
        >
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-blue-500" />
            <span className="font-semibold text-gray-900 text-base">Filter by Category</span>
            <span className="text-base text-gray-500 ml-2">
              ({filteredCount} of {totalCount})
            </span>
          </div>
          <ChevronDown className={`h-5 w-5 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {isOpen && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 mt-2">
          <div>
            <label className="block text-base font-medium text-gray-700 mb-2">Category</label>
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
            >
              <option value="all">All Categories</option>
              {Object.entries(categoryLabels).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
          </div>

          {selectedCategory !== 'all' && (
            <div className="pt-3 mt-3 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <span className="text-base font-medium text-gray-700">Active Filter</span>
                <button
                  onClick={() => setSelectedCategory('all')}
                  className="text-base text-blue-600 hover:text-blue-700"
                >
                  Clear
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// Sidebar Filters Component - Only Categories (Desktop)
const SidebarFilters = ({ 
  selectedCategory, 
  setSelectedCategory, 
  filteredCount,
  totalCount
}) => {
  return (
    <div className="hidden lg:block bg-white rounded-2xl shadow-sm border border-gray-200 p-6 h-fit sticky top-24">
      <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-200">
        <Filter className="h-5 w-5 text-blue-500" />
        <h3 className="text-lg font-semibold text-gray-900">Categories</h3>
        <div className="ml-auto text-base text-gray-500">
          {filteredCount} of {totalCount}
        </div>
      </div>

      <div className="space-y-2">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`w-full text-left px-3 py-2 rounded-lg transition-colors text-base ${
            selectedCategory === 'all' 
              ? 'bg-blue-100 text-blue-800 border border-blue-300' 
              : 'text-gray-700 hover:bg-gray-100 border border-transparent'
          }`}
        >
          All Categories
        </button>
        {Object.entries(categoryLabels).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setSelectedCategory(key)}
            className={`w-full text-left px-3 py-2 rounded-lg transition-colors text-base ${
              selectedCategory === key 
                ? 'bg-blue-100 text-blue-800 border border-blue-300' 
                : 'text-gray-700 hover:bg-gray-100 border border-transparent'
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  )
}

export default function ConventionPage() {
  const { addToCart, cartItems } = useCart()
  const router = useRouter()
  const [packages, setPackages] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedPackage, setSelectedPackage] = useState(null)
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('all')

  // Get current pricing period
  const currentDeadline = getCurrentDeadline()

  // Fetch packages from database
  useEffect(() => {
    fetchPackages()
  }, [])

  const fetchPackages = async () => {
    try {
      const res = await fetch('/api/packages')
      const data = await res.json()
      setPackages(data)
    } catch (error) {
      console.error('Failed to fetch packages:', error)
    } finally {
      setLoading(false)
    }
  }

  // Get only Early Bird packages with simplified names
  const conventionPackages = useMemo(() => {
    if (!packages.length) return []
    return getEarlyBirdPackages(packages)
  }, [packages])

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
    // For couple packages, we store that it's a couple package but quantity is always 1
    // The tshirtSizes array will have 2 sizes for the couple
    addToCart({
      id: pkg.id,
      name: pkg.name,
      category: pkg.category,
      price: pkg.price,
      quantity: quantity,
      tshirtSizes: tshirtSizes,
      isCouple: pkg.category === 'couple'
    })
    setIsPopupOpen(false)
    setSelectedPackage(null)
  }

  const handleGoToCheckout = () => {
    // Navigate to cart page with information step pre-selected
    router.push('/cart?step=information')
  }

  const handleClosePopup = () => {
    setIsPopupOpen(false)
    setSelectedPackage(null)
  }

  // Filter packages by category only
  const filteredPackages = useMemo(() => {
    if (selectedCategory === 'all') {
      return conventionPackages
    }
    return conventionPackages.filter(pkg => pkg.category === selectedCategory)
  }, [conventionPackages, selectedCategory])

  // Format deadline message
  const getDeadlineMessage = () => {
    if (currentDeadline.type === 'EARLY_BIRD') {
      return `Early Bird prices end on ${currentDeadline.end}`
    } else if (currentDeadline.type === 'STANDARD') {
      return `Standard prices valid until ${currentDeadline.end}`
    } else if (currentDeadline.type === 'LATE') {
      return `Late registration ends on ${currentDeadline.end}`
    }
    return ''
  }

  if (loading) {
    return (
      <main className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-blue-50">
        <Header />
        <section className="flex-grow py-8">
          <div className="container mx-auto px-4 text-center">
            <div className="text-gray-600">Loading packages...</div>
          </div>
        </section>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <Header />
      
      {/* Add to Cart Popup */}
      {selectedPackage && (
        <AddToCartPopup
          pkg={selectedPackage}
          isOpen={isPopupOpen}
          onClose={handleClosePopup}
          onConfirm={handleConfirmAddToCart}
          onGoToCheckout={handleGoToCheckout}
          currentQuantity={getCurrentQuantity(selectedPackage.id)}
          deadline={currentDeadline}
        />
      )}
      
      <section className="flex-grow py-8">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-base font-medium mb-4">
              <Calendar className="h-4 w-4" />
              August 15-17, 2026
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              BMCA 2026 Convention
            </h1>
            <p className="text-xl text-gray-600 mb-4 max-w-3xl mx-auto">
              Join us for an unforgettable experience filled with culture, celebration, and community. 
              Choose the perfect package that suits your needs.
            </p>
            
            {/* Deadline Banner */}
            <div className="max-w-3xl mx-auto mb-6">
              <div className={`p-4 rounded-xl ${
                currentDeadline.type === 'EARLY_BIRD' ? 'bg-green-50 border border-green-200' :
                currentDeadline.type === 'STANDARD' ? 'bg-orange-50 border border-orange-200' :
                'bg-red-50 border border-red-200'
              }`}>
                <div className="flex items-center gap-3">
                  <Clock className={`h-6 w-6 ${
                    currentDeadline.type === 'EARLY_BIRD' ? 'text-green-600' :
                    currentDeadline.type === 'STANDARD' ? 'text-orange-600' :
                    'text-red-600'
                  }`} />
                  <div className="text-left">
                    <p className={`font-semibold ${
                      currentDeadline.type === 'EARLY_BIRD' ? 'text-green-800' :
                      currentDeadline.type === 'STANDARD' ? 'text-orange-800' :
                      'text-red-800'
                    }`}>
                      {currentDeadline.label} Pricing Active
                    </p>
                    <p className={`text-sm ${
                      currentDeadline.type === 'EARLY_BIRD' ? 'text-green-600' :
                      currentDeadline.type === 'STANDARD' ? 'text-orange-600' :
                      'text-red-600'
                    }`}>
                      {getDeadlineMessage()} (Central US/Canada Time)
                    </p>
                    {currentDeadline.description && (
                      <p className="text-sm mt-1 text-gray-600">
                        {currentDeadline.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-4 text-base text-gray-500">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>Convention Center, Los Angeles</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>500+ Expected Attendees</span>
              </div>
            </div>
          </div>

          {/* Hotel Booking Section */}
          <div className="mb-8">
            <HotelBooking />
          </div>

          {/* Mobile Filters - Only Categories */}
          <MobileFilters
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            filteredCount={filteredPackages.length}
            totalCount={conventionPackages.length}
          />

          {/* Main Content with Sidebar */}
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Sidebar Filters (Desktop) - Only Categories */}
            <div className="hidden lg:block lg:w-64 flex-shrink-0">
              <SidebarFilters
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                filteredCount={filteredPackages.length}
                totalCount={conventionPackages.length}
              />
            </div>

            {/* Packages Grid - All in one grid */}
            <div className="flex-1">
              {/* Results Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Early Bird Packages
                  </h2>
                  <p className="text-gray-600 text-base mt-1">
                    Showing <span className="font-semibold text-blue-600">{filteredPackages.length}</span> packages
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

              {/* Single Grid for All Packages */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPackages.map((pkg) => {
                  const currentQuantity = getCurrentQuantity(pkg.id)
                  return (
                    <Card
                      key={pkg.id}
                      className={`flex flex-col hover:shadow-lg transition-all duration-300 overflow-hidden border ${
                        pkg.popular 
                          ? 'border-blue-300 shadow-md' 
                          : 'border-gray-200 hover:border-blue-200'
                      } ${currentQuantity > 0 ? 'ring-1 ring-green-200 border-green-300' : ''}`}
                    >
                      {/* Popular Badge */}
                      {pkg.popular && (
                        <div className="absolute top-3 right-3 z-10">
                          <Badge className="bg-gradient-to-r from-blue-600 to-blue-800 text-white flex items-center gap-1 text-sm">
                            <Star className="h-3 w-3 fill-current" />
                            Popular
                          </Badge>
                        </div>
                      )}

                      {/* Deadline Badge */}
                      <div className="absolute top-3 left-3 z-10">
                        <Badge className={`${
                          currentDeadline.type === 'EARLY_BIRD' ? 'bg-green-500' :
                          currentDeadline.type === 'STANDARD' ? 'bg-orange-500' :
                          'bg-red-500'
                        } text-white flex items-center gap-1 text-sm`}>
                          <Clock className="h-3 w-3" />
                          Early Bird
                        </Badge>
                      </div>

                      {/* Cart Indicator */}
                      {currentQuantity > 0 && (
                        <div className="absolute top-3 left-3 z-10 mt-8">
                          <Badge className="bg-green-500 text-white flex items-center gap-1 text-sm">
                            <ShoppingCart className="h-3 w-3" />
                            {currentQuantity}
                          </Badge>
                        </div>
                      )}
                      
                      <CardHeader className="relative p-5 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
                        <CardTitle className="text-xl text-center">{pkg.name}</CardTitle>
                        <CardDescription className="text-white/90 text-center text-base">{pkg.description}</CardDescription>
                      </CardHeader>
                      
                      <CardContent className="flex-grow p-5">
                        {/* Price with Early Bird indicator */}
                        <div className="text-center mb-5">
                          <div className="inline-block bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded-full mb-2">
                            Early Bird Price
                          </div>
                          <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                            ${pkg.price}
                          </span>
                          <p className="text-sm text-gray-500 mt-1">per person</p>
                          {pkg.category === 'couple' && (
                            <p className="text-xs text-blue-600 mt-1">Includes 2 shirts</p>
                          )}
                        </div>

                        {/* Features */}
                        <div className="mb-5">
                          <div className="grid grid-cols-2 gap-3">
                            {pkg.features.slice(0, 8).map((feature, idx) => (
                              <div key={idx} className="flex items-start gap-2">
                                <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                <span className="text-sm text-gray-700 leading-relaxed">{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </CardContent>

                      {/* Add to Cart Button */}
                      <div className="p-5 pt-0">
                        <Button
                          onClick={() => handleAddToCartClick(pkg)}
                          className={`w-full text-base font-semibold transition-all ${
                            currentQuantity > 0
                              ? 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700'
                              : 'bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900'
                          } text-white shadow-md hover:shadow-lg py-3`}
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

              {/* No Results Message */}
              {filteredPackages.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-4xl mb-3">😔</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">No packages found</h3>
                  <p className="text-gray-600 text-lg mb-4">Try adjusting your category filter.</p>
                  <Button
                    onClick={() => setSelectedCategory('all')}
                    className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white text-base"
                  >
                    Clear Filter
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}