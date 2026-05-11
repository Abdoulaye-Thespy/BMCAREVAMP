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

// Confirmation Popup Component with T-shirt sizes
const AddToCartPopup = ({ pkg, isOpen, onClose, onConfirm, onGoToCheckout, currentQuantity = 0, deadline }) => {
  const [quantity, setQuantity] = useState(1)
  const [tshirtSizes, setTshirtSizes] = useState([])
  const [allSizesSelected, setAllSizesSelected] = useState(false)

  // Calculate number of t-shirts needed based on package type and quantity
  const getTshirtCount = () => {
    if (pkg.category === 'couple') {
      return quantity * 2
    }
    return quantity
  }

  const tshirtCount = getTshirtCount()

  useEffect(() => {
    setTshirtSizes(Array(tshirtCount).fill(''))
  }, [tshirtCount, isOpen])

  useEffect(() => {
    if (currentQuantity > 0) {
      setQuantity(currentQuantity + 1)
    } else {
      setQuantity(1)
    }
  }, [currentQuantity, isOpen])

  useEffect(() => {
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
      onConfirm(pkg, quantity, tshirtSizes)
      onGoToCheckout()
    }
  }

  const increment = () => setQuantity(prev => prev > 10 ? 10 : prev + 1)
  const decrement = () => setQuantity(prev => prev > 1 ? prev - 1 : 1)

  const updateTshirtSize = (index, size) => {
    const newSizes = [...tshirtSizes]
    newSizes[index] = size
    setTshirtSizes(newSizes)
  }

  const getPersonLabel = (index) => {
    if (pkg.category !== 'couple') return `Person ${index + 1}`

    const packageNumber = Math.floor(index / 2) + 1
    const personInPackage = index % 2 === 0 ? 'Person 1' : 'Person 2'
    return `Package ${packageNumber} - ${personInPackage}`
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-auto max-h-[90vh] overflow-y-auto">
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
            <button onClick={onClose} className="text-white hover:text-blue-200 transition-colors">
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div className="p-6">
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

          <div className="mb-6 p-3 bg-blue-50 rounded-lg">
            <div className="flex items-center gap-2 text-blue-800">
              <Clock className="h-5 w-5" />
              <span className="font-semibold">{deadline?.label || 'Standard'} Pricing</span>
            </div>
            <p className="text-sm text-blue-600 mt-1">
              {deadline?.description}
            </p>
          </div>

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
                      className={`flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base ${tshirtSizes[index] ? 'border-gray-300' : 'border-red-300 bg-red-50'
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
            disabled={!allSizesSelected}
            className={`flex-1 text-base ${allSizesSelected
                ? 'bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white shadow-lg hover:shadow-xl'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
          >
            {currentQuantity > 0 ? 'Update Cart' : 'Add to Cart'}
          </Button>
          <Button
            onClick={handleGoToCheckout}
            disabled={!allSizesSelected}
            className={`flex-1 text-base flex items-center justify-center gap-2 ${allSizesSelected
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
  const centralTime = new Date(now.toLocaleString('en-US', { timeZone: 'America/Chicago' }))

  const earlyBirdEnd = new Date(DEADLINES.EARLY_BIRD.end)
  const standardStart = new Date(DEADLINES.STANDARD.start)
  const standardEnd = new Date(DEADLINES.STANDARD.end)
  const lateStart = new Date(DEADLINES.LATE.start)
  const lateEnd = new Date(DEADLINES.LATE.end)

  if (centralTime <= earlyBirdEnd) {
    return { ...DEADLINES.EARLY_BIRD, type: 'EARLY_BIRD' }
  } else if (centralTime >= standardStart && centralTime <= standardEnd) {
    return { ...DEADLINES.STANDARD, type: 'STANDARD' }
  } else if (centralTime >= lateStart && centralTime <= lateEnd) {
    return { ...DEADLINES.LATE, type: 'LATE' }
  } else {
    return { ...DEADLINES.LATE, type: 'LATE', expired: true }
  }
}

// Filter packages based on deadline type
const filterByDeadline = (packages, deadlineType) => {
  if (deadlineType === 'EARLY_BIRD') {
    return packages.filter(pkg => pkg.originalName?.toLowerCase().includes('early bird'))
  } else if (deadlineType === 'STANDARD') {
    return packages.filter(pkg => pkg.originalName?.toLowerCase().includes('standard'))
  } else if (deadlineType === 'LATE') {
    return packages.filter(pkg => pkg.originalName?.toLowerCase().includes('late'))
  }
  return packages
}

// Get packages with proper category mapping
const getPackagesWithCategories = (packages, deadlineType) => {
  // First filter by deadline for non-other packages, but EXCLUDE guest packages
  const nonGuestPackages = packages.filter(pkg => {
    const name = pkg.name?.toLowerCase() || ''
    return !name.includes('guest') && pkg.category !== 'Guest Package'
  })
  
  const filteredForDeadline = filterByDeadline(nonGuestPackages, deadlineType)
  
  return nonGuestPackages.map(pkg => {
    const fullName = pkg.name?.toLowerCase() || ''
    let categoryKey = ''
    let simpleName = pkg.name

    // Check if this package belongs to the current deadline for main categories
    const isForCurrentDeadline = deadlineType === 'EARLY_BIRD' 
      ? fullName.includes('early bird')
      : deadlineType === 'STANDARD'
      ? fullName.includes('standard')
      : deadlineType === 'LATE'
      ? fullName.includes('late')
      : true

    // Map package names to categories
    if (fullName.includes('kid')) {
      categoryKey = 'kids'
      simpleName = 'Kids'
    } else if (fullName.includes('elderly') || fullName.includes('75+')) {
      categoryKey = 'elderly'
      simpleName = 'Elderly 75+'
    } else if (fullName.includes('couple')) {
      categoryKey = 'couple'
      simpleName = 'Couple'
    } else if (fullName.includes('non-registered')) {
      categoryKey = 'non-registered'
      simpleName = 'Non-Registered Elites'
    } else if (fullName.includes('adult') || fullName.includes('single')) {
      categoryKey = 'adult'
      simpleName = 'Adult'
    } else {
      categoryKey = 'other'
      simpleName = pkg.name
    }

    // For main categories (not 'other'), only show if they match the current deadline
    // For 'other' category, always show regardless of deadline
    const shouldShow = categoryKey === 'other' || isForCurrentDeadline

    return {
      id: pkg.id.toString(),
      name: simpleName,
      originalName: pkg.name,
      category: categoryKey,
      displayCategory: pkg.category,
      price: pkg.price,
      description: simpleName,
      features: Array.isArray(pkg.items) ? pkg.items : (pkg.items ? pkg.items.split(',').map(item => item.trim()) : []),
      popular: pkg.category === 'couple' || fullName.includes('cultural'),
      shouldShow
    }
  }).filter(pkg => pkg.shouldShow)
}

const categoryLabels = {
  kids: 'Kids',
  adult: 'Adult',
  couple: 'Couple',
  elderly: 'Elderly 75+',
  'non-registered': 'Non-Registered Elites',
  other: 'Other Packages'
}

const categoryOrder = ['kids', 'adult', 'couple', 'elderly', 'non-registered', 'other']

// Sidebar Filters Component
const SidebarFilters = ({
  selectedCategory,
  setSelectedCategory,
  filteredCount,
  totalCount
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <>
      {/* Mobile Filter Button */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="w-full flex items-center justify-between bg-white rounded-xl shadow-sm border border-gray-200 p-4"
        >
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-blue-500" />
            <span className="font-semibold text-gray-900">Filter Categories</span>
            <span className="text-sm text-gray-500">({filteredCount} of {totalCount})</span>
          </div>
          <ChevronDown className={`h-5 w-5 text-gray-500 transition-transform ${isMobileMenuOpen ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Mobile Filter Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden mb-6 bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="space-y-2">
            <button
              onClick={() => {
                setSelectedCategory('all')
                setIsMobileMenuOpen(false)
              }}
              className={`w-full text-left px-3 py-2 rounded-lg transition-colors text-base ${selectedCategory === 'all'
                  ? 'bg-blue-100 text-blue-800 border border-blue-300'
                  : 'text-gray-700 hover:bg-gray-100 border border-transparent'
                }`}
            >
              All Categories
            </button>
            {categoryOrder.map(key => (
              <button
                key={key}
                onClick={() => {
                  setSelectedCategory(key)
                  setIsMobileMenuOpen(false)
                }}
                className={`w-full text-left px-3 py-2 rounded-lg transition-colors text-base ${selectedCategory === key
                    ? 'bg-blue-100 text-blue-800 border border-blue-300'
                    : 'text-gray-700 hover:bg-gray-100 border border-transparent'
                  }`}
              >
                {categoryLabels[key]}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
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
            className={`w-full text-left px-3 py-2 rounded-lg transition-colors text-base ${selectedCategory === 'all'
                ? 'bg-blue-100 text-blue-800 border border-blue-300'
                : 'text-gray-700 hover:bg-gray-100 border border-transparent'
              }`}
          >
            All Categories
          </button>
          {categoryOrder.map(key => (
            <button
              key={key}
              onClick={() => setSelectedCategory(key)}
              className={`w-full text-left px-3 py-2 rounded-lg transition-colors text-base ${selectedCategory === key
                  ? 'bg-blue-100 text-blue-800 border border-blue-300'
                  : 'text-gray-700 hover:bg-gray-100 border border-transparent'
                }`}
            >
              {categoryLabels[key]}
            </button>
          ))}
        </div>
      </div>
    </>
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

  // Get all packages with proper categories and deadline filtering (guest packages excluded)
  const conventionPackages = useMemo(() => {
    if (!packages.length) return []
    return getPackagesWithCategories(packages, currentDeadline.type)
  }, [packages, currentDeadline.type])

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
    router.push('/cart?step=information')
  }

  const handleClosePopup = () => {
    setIsPopupOpen(false)
    setSelectedPackage(null)
  }

  // Filter packages by category
  const filteredPackages = useMemo(() => {
    if (selectedCategory === 'all') {
      return conventionPackages
    }
    return conventionPackages.filter(pkg => pkg.category === selectedCategory)
  }, [conventionPackages, selectedCategory])

  // Separate main packages (kids, adult, couple, elderly, non-registered) from other packages
  const mainCategories = ['kids', 'adult', 'couple', 'elderly', 'non-registered']
  const mainPackages = conventionPackages.filter(pkg => mainCategories.includes(pkg.category))
  const otherPackages = conventionPackages.filter(pkg => pkg.category === 'other')

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
              July 30th to August 2nd, 2026
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              BMCA 2026 Convention
            </h1>
            <p className="text-xl text-gray-600 mb-4 max-w-3xl mx-auto">
              Join us for an unforgettable experience filled with culture, celebration, and community.
              Choose the perfect package that suits your needs.
            </p>

            {/* Two Column Layout for Info and Flyer */}
            <div className="max-w-5xl mx-auto mb-8 grid md:grid-cols-2 gap-6 items-center">
              <div className="text-left space-y-4">
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-blue-100">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Event Details</h2>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-blue-100 p-2 rounded-lg">
                        <Calendar className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Dates</p>
                        <p className="text-gray-600">July 30th to August 2nd, 2026</p>
                        <p className="text-sm text-gray-500">4 days of cultural celebration</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="bg-blue-100 p-2 rounded-lg">
                        <MapPin className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Location</p>
                        <p className="text-gray-600">Great Lakes Region, USA</p>
                        <p className="text-sm text-blue-600 mt-1 flex items-center gap-1">
                          <span className="font-medium">Nearest Airport:</span> Detroit Metropolitan Airport (DTW)
                        </p>
                        <p className="text-xs text-gray-500 mt-1">Approximately 30-45 minutes drive</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="bg-blue-100 p-2 rounded-lg">
                        <Users className="h-5 w-5 text-blue-600" />
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
                      Join us for our 26th Annual Convention
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-4 border-blue-100 hover:border-blue-300 transition-all duration-300">
                  <img
                    src="/conventionflyer.png"
                    alt="BMCA 26th Convention Flyer - Strength in Unity - Great Lakes 2021 (2026)"
                    className="w-full h-auto object-cover"
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-blue-600 to-blue-800 text-white text-xs px-3 py-1 rounded-full shadow-lg">
                  26th Anniversary
                </div>
              </div>
            </div>

            {/* Deadline Banner */}
            <div className="max-w-3xl mx-auto mb-6">
              <div className={`p-4 rounded-xl ${currentDeadline.type === 'EARLY_BIRD' ? 'bg-green-50 border border-green-200' :
                  currentDeadline.type === 'STANDARD' ? 'bg-orange-50 border border-orange-200' :
                    'bg-red-50 border border-red-200'
                }`}>
                <div className="flex items-center gap-3">
                  <Clock className={`h-6 w-6 ${currentDeadline.type === 'EARLY_BIRD' ? 'text-green-600' :
                      currentDeadline.type === 'STANDARD' ? 'text-orange-600' :
                        'text-red-600'
                    }`} />
                  <div className="text-left">
                    <p className={`font-semibold ${currentDeadline.type === 'EARLY_BIRD' ? 'text-green-800' :
                        currentDeadline.type === 'STANDARD' ? 'text-orange-800' :
                          'text-red-800'
                      }`}>
                      {currentDeadline.label} Pricing Active
                    </p>
                    <p className={`text-sm ${currentDeadline.type === 'EARLY_BIRD' ? 'text-green-600' :
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
          </div>

          {/* Hotel Booking Section */}
          <div className="mb-8">
            <HotelBooking />
          </div>

          {/* Main Content with Sidebar */}
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Sidebar Filters */}
            <div className="lg:w-64 flex-shrink-0">
              <SidebarFilters
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                filteredCount={filteredPackages.length}
                totalCount={conventionPackages.length}
              />
            </div>

            {/* Packages Grid */}
            <div className="flex-1">
              {/* Cart Summary */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {selectedCategory === 'all' ? 'All Packages' : categoryLabels[selectedCategory]}
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

              {/* When showing a specific category */}
              {selectedCategory !== 'all' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredPackages.map((pkg) => {
                    const currentQuantity = getCurrentQuantity(pkg.id)
                    return (
                      <Card
                        key={pkg.id}
                        className={`flex flex-col hover:shadow-lg transition-all duration-300 overflow-hidden border ${pkg.popular
                            ? 'border-blue-300 shadow-md'
                            : 'border-gray-200 hover:border-blue-200'
                          } ${currentQuantity > 0 ? 'ring-1 ring-green-200 border-green-300' : ''}`}
                      >
                        {pkg.popular && (
                          <div className="absolute top-3 right-3 z-10">
                            <Badge className="bg-gradient-to-r from-blue-600 to-blue-800 text-white flex items-center gap-1 text-sm">
                              <Star className="h-3 w-3 fill-current" />
                              Popular
                            </Badge>
                          </div>
                        )}

                        {pkg.category !== 'other' && (
                          <div className="absolute top-3 left-3 z-10">
                            <Badge className={`${currentDeadline.type === 'EARLY_BIRD' ? 'bg-green-500' :
                                currentDeadline.type === 'STANDARD' ? 'bg-orange-500' :
                                  'bg-red-500'
                              } text-white flex items-center gap-1 text-sm`}>
                              <Clock className="h-3 w-3" />
                              {currentDeadline.label}
                            </Badge>
                          </div>
                        )}

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
                          <div className="text-center mb-5">
                            <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                              ${pkg.price}
                            </span>
                            <p className="text-sm text-gray-500 mt-1">per person</p>
                            {pkg.category === 'couple' && (
                              <p className="text-xs text-blue-600 mt-1">Includes 2 shirts</p>
                            )}
                          </div>

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

                        <div className="p-5 pt-0">
                          <Button
                            onClick={() => handleAddToCartClick(pkg)}
                            className={`w-full text-base font-semibold transition-all ${currentQuantity > 0
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
              )}

              {/* When showing all categories - Main Categories grouped, Others separate */}
              {selectedCategory === 'all' && (
                <>
                  {/* Main Categories Section (Kids, Adult, Couple, Elderly, Non-Registered) */}
                  <div className="mb-8">
                    <div className="mb-4 pb-2 border-b-2 border-blue-200">
                      <h3 className="text-xl font-bold text-gray-800">
                        Convention Registration Packages
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {currentDeadline.label} Pricing - Valid until {currentDeadline.end}
                      </p>
                    </div>
                    
                    {/* Display all main packages in a single grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {mainPackages.map((pkg) => {
                        const currentQuantity = getCurrentQuantity(pkg.id)
                        return (
                          <Card
                            key={pkg.id}
                            className={`flex flex-col hover:shadow-lg transition-all duration-300 overflow-hidden border ${pkg.popular
                                ? 'border-blue-300 shadow-md'
                                : 'border-gray-200 hover:border-blue-200'
                              } ${currentQuantity > 0 ? 'ring-1 ring-green-200 border-green-300' : ''}`}
                          >
                            {pkg.popular && (
                              <div className="absolute top-3 right-3 z-10">
                                <Badge className="bg-gradient-to-r from-blue-600 to-blue-800 text-white flex items-center gap-1 text-sm">
                                  <Star className="h-3 w-3 fill-current" />
                                  Popular
                                </Badge>
                              </div>
                            )}

                            <div className="absolute top-3 left-3 z-10">
                              <Badge className={`${currentDeadline.type === 'EARLY_BIRD' ? 'bg-green-500' :
                                  currentDeadline.type === 'STANDARD' ? 'bg-orange-500' :
                                    'bg-red-500'
                                } text-white flex items-center gap-1 text-sm`}>
                                <Clock className="h-3 w-3" />
                                {currentDeadline.label}
                              </Badge>
                            </div>

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
                              <div className="text-center mb-5">
                                <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                                  ${pkg.price}
                                </span>
                                <p className="text-sm text-gray-500 mt-1">per person</p>
                                {pkg.category === 'couple' && (
                                  <p className="text-xs text-blue-600 mt-1">Includes 2 shirts</p>
                                )}
                              </div>

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

                            <div className="p-5 pt-0">
                              <Button
                                onClick={() => handleAddToCartClick(pkg)}
                                className={`w-full text-base font-semibold transition-all ${currentQuantity > 0
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
                  </div>

                  {/* Other Packages Section - Only shown if there are other packages */}
                  {otherPackages.length > 0 && (
                    <div className="mt-12">
                      <div className="mb-4 pb-2 border-b-2 border-gray-300">
                        <h3 className="text-xl font-bold text-gray-800">
                          Other Packages
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                          Special packages available year-round
                        </p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {otherPackages.map((pkg) => {
                          const currentQuantity = getCurrentQuantity(pkg.id)
                          return (
                            <Card
                              key={pkg.id}
                              className={`flex flex-col hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-200 hover:border-blue-200 ${currentQuantity > 0 ? 'ring-1 ring-green-200 border-green-300' : ''}`}
                            >
                              {pkg.popular && (
                                <div className="absolute top-3 right-3 z-10">
                                  <Badge className="bg-gradient-to-r from-blue-600 to-blue-800 text-white flex items-center gap-1 text-sm">
                                    <Star className="h-3 w-3 fill-current" />
                                    Popular
                                  </Badge>
                                </div>
                              )}

                              {currentQuantity > 0 && (
                                <div className="absolute top-3 left-3 z-10">
                                  <Badge className="bg-green-500 text-white flex items-center gap-1 text-sm">
                                    <ShoppingCart className="h-3 w-3" />
                                    {currentQuantity}
                                  </Badge>
                                </div>
                              )}

                              <CardHeader className="relative p-5 bg-gradient-to-r from-gray-600 to-gray-700 text-white">
                                <CardTitle className="text-xl text-center">{pkg.name}</CardTitle>
                                <CardDescription className="text-white/90 text-center text-base">{pkg.description}</CardDescription>
                              </CardHeader>

                              <CardContent className="flex-grow p-5">
                                <div className="text-center mb-5">
                                  <span className="text-3xl font-bold text-gray-800">
                                    ${pkg.price}
                                  </span>
                                  <p className="text-sm text-gray-500 mt-1">per person</p>
                                </div>

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

                              <div className="p-5 pt-0">
                                <Button
                                  onClick={() => handleAddToCartClick(pkg)}
                                  className={`w-full text-base font-semibold transition-all ${currentQuantity > 0
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
                    </div>
                  )}
                </>
              )}

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