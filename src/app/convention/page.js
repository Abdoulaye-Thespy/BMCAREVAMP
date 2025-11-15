'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useCart } from '@/context/cart-context'
import { useState, useMemo } from 'react'
import { Check, Filter, Star, Users, Calendar, MapPin, X, Plus, Minus } from 'lucide-react'

// Temporary Badge component (remove this after installing shadcn badge)
const Badge = ({ children, className = '', ...props }) => {
  return (
    <div className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold ${className}`} {...props}>
      {children}
    </div>
  )
}

// Confirmation Popup Component
const AddToCartPopup = ({ pkg, isOpen, onClose, onConfirm }) => {
  const [quantity, setQuantity] = useState(1)

  if (!isOpen) return null

  const totalPrice = pkg.price * quantity

  const handleConfirm = () => {
    onConfirm(pkg, quantity)
    setQuantity(1)
  }

  const increment = () => setQuantity(prev => prev + 1)
  const decrement = () => setQuantity(prev => prev > 1 ? prev - 1 : 1)

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white p-6 rounded-t-2xl">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-bold">Add to Cart</h3>
              <p className="text-orange-100 mt-1">Confirm your selection</p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-orange-200 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Package Info */}
          <div className="flex items-center gap-4 mb-6">
            <div className="text-4xl">{pkg.icon}</div>
            <div>
              <h4 className="font-semibold text-gray-900">{pkg.name}</h4>
              <p className="text-gray-600 text-sm">{pkg.description}</p>
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">Quantity</label>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={decrement}
                  className="w-10 h-10 rounded-full border-2 border-orange-500 text-orange-500 flex items-center justify-center hover:bg-orange-50 transition-colors"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="text-2xl font-bold text-gray-900 w-12 text-center">{quantity}</span>
                <button
                  onClick={increment}
                  className="w-10 h-10 rounded-full border-2 border-orange-500 text-orange-500 flex items-center justify-center hover:bg-orange-50 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-orange-600">${totalPrice}</div>
                <div className="text-sm text-gray-500">${pkg.price} × {quantity}</div>
              </div>
            </div>
          </div>

          {/* Features Preview */}
          <div className="border-t pt-4">
            <h5 className="font-medium text-gray-900 mb-2">Includes:</h5>
            <div className="space-y-2">
              {pkg.features.slice(0, 3).map((feature, idx) => (
                <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                  <Check className="h-4 w-4 text-green-500" />
                  {feature}
                </div>
              ))}
              {pkg.features.length > 3 && (
                <div className="text-sm text-gray-500">
                  + {pkg.features.length - 3} more features
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 p-6 border-t">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1 border-gray-300 hover:bg-gray-50"
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            className="flex-1 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-lg hover:shadow-xl transition-all"
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  )
}

const conventionPackages = [
  {
    id: 'kids-cost',
    name: 'Kids Package',
    category: 'kids',
    price: 25,
    description: 'Perfect for children and youth',
    features: ['Convention Cost', 'T-Shirt', 'BBQ', 'Soft Drinks', 'Soccer Activity'],
    icon: '👶',
    popular: false,
    includes: ['convention']
  },
  {
    id: 'kids-cultural',
    name: 'Kids + Cultural Night',
    category: 'kids',
    price: 35,
    description: 'Kids package with cultural night access',
    features: ['Convention Cost', 'Cultural Night', 'T-Shirt', 'BBQ', 'Soft Drinks', 'Soccer'],
    icon: '🎭',
    popular: true,
    includes: ['convention', 'cultural']
  },
  {
    id: 'kids-gala',
    name: 'Kids + Gala Night',
    category: 'kids',
    price: 40,
    description: 'Kids package with gala night access',
    features: ['Convention Cost', 'Gala Night', 'T-Shirt', 'BBQ', 'Drinks', 'Soccer'],
    icon: '✨',
    popular: false,
    includes: ['convention', 'gala']
  },
  {
    id: 'adult-cost',
    name: 'Adult Package',
    category: 'adult',
    price: 50,
    description: 'Standard adult convention package',
    features: ['Convention Cost', 'T-Shirt', 'BBQ', 'Drinks', 'All Day Access'],
    icon: '👤',
    popular: false,
    includes: ['convention']
  },
  {
    id: 'adult-cultural',
    name: 'Adult + Cultural Night',
    category: 'adult',
    price: 65,
    description: 'Adult package with cultural night',
    features: ['Convention Cost', 'Cultural Night', 'T-Shirt', 'BBQ', 'Drinks', 'All Day Access'],
    icon: '🎭',
    popular: true,
    includes: ['convention', 'cultural']
  },
  {
    id: 'adult-gala',
    name: 'Adult + Gala Night',
    category: 'adult',
    price: 75,
    description: 'Adult package with gala night',
    features: ['Convention Cost', 'Gala Night', 'T-Shirt', 'BBQ', 'Drinks', 'Premium Seating'],
    icon: '✨',
    popular: true,
    includes: ['convention', 'gala']
  },
  {
    id: 'couple-cost',
    name: 'Couple Package',
    category: 'couple',
    price: 85,
    description: 'For two people',
    features: ['Convention Cost (x2)', 'T-Shirts (x2)', 'BBQ', 'Drinks', 'Couple Seating'],
    icon: '💑',
    popular: false,
    includes: ['convention']
  },
  {
    id: 'couple-cultural',
    name: 'Couple + Cultural Night',
    category: 'couple',
    price: 110,
    description: 'Couple package with cultural night',
    features: ['Convention Cost (x2)', 'Cultural Night (x2)', 'T-Shirts (x2)', 'BBQ', 'Drinks', 'Premium Seating'],
    icon: '💃',
    popular: true,
    includes: ['convention', 'cultural']
  },
  {
    id: 'couple-gala',
    name: 'Couple + Gala Night',
    category: 'couple',
    price: 130,
    description: 'Couple package with gala night',
    features: ['Convention Cost (x2)', 'Gala Night (x2)', 'T-Shirts (x2)', 'BBQ', 'Premium Drinks', 'VIP Seating'],
    icon: '🎉',
    popular: false,
    includes: ['convention', 'gala']
  },
  {
    id: 'elderly-cost',
    name: 'Elderly Package',
    category: 'elderly',
    price: 30,
    description: 'Special rate for seniors',
    features: ['Convention Cost', 'T-Shirt', 'BBQ', 'Soft Drinks', 'Reserved Seating'],
    icon: '👴',
    popular: false,
    includes: ['convention']
  },
  {
    id: 'elderly-cultural',
    name: 'Elderly + Cultural Night',
    category: 'elderly',
    price: 45,
    description: 'Elderly package with cultural night',
    features: ['Convention Cost', 'Cultural Night', 'T-Shirt', 'BBQ', 'Soft Drinks', 'Reserved Seating'],
    icon: '🎵',
    popular: false,
    includes: ['convention', 'cultural']
  },
  {
    id: 'elderly-gala',
    name: 'Elderly + Gala Night',
    category: 'elderly',
    price: 55,
    description: 'Elderly package with gala night',
    features: ['Convention Cost', 'Gala Night', 'T-Shirt', 'BBQ', 'Drinks', 'VIP Reserved Seating'],
    icon: '🌟',
    popular: false,
    includes: ['convention', 'gala']
  },
  {
    id: 'non-registered-cost',
    name: 'Non-Registered Member Package',
    category: 'non-registered',
    price: 60,
    description: 'For non-registered community members',
    features: ['Convention Cost', 'T-Shirt', 'BBQ', 'Drinks', 'Full Access'],
    icon: '🆕',
    popular: false,
    includes: ['convention']
  },
  {
    id: 'non-registered-cultural',
    name: 'Non-Registered + Cultural Night',
    category: 'non-registered',
    price: 80,
    description: 'Non-registered with cultural night',
    features: ['Convention Cost', 'Cultural Night', 'T-Shirt', 'BBQ', 'Drinks', 'Full Access'],
    icon: '🎪',
    popular: false,
    includes: ['convention', 'cultural']
  },
  {
    id: 'non-registered-gala',
    name: 'Non-Registered + Gala Night',
    category: 'non-registered',
    price: 95,
    description: 'Non-registered with gala night',
    features: ['Convention Cost', 'Gala Night', 'T-Shirt', 'BBQ', 'Premium Drinks', 'Premium Seating'],
    icon: '🏆',
    popular: false,
    includes: ['convention', 'gala']
  }
]

const categoryLabels = {
  kids: 'Kids Packages',
  adult: 'Adult Packages',
  couple: 'Couple Packages',
  elderly: 'Elderly Packages',
  'non-registered': 'Non-Registered Member Packages'
}

const eventTypes = [
  { id: 'all', label: 'All Packages' },
  { id: 'convention', label: 'Convention Only' },
  { id: 'cultural', label: 'With Cultural Night' },
  { id: 'gala', label: 'With Gala Night' }
]

export default function ConventionPage() {
  const { addToCart } = useCart()
  const [selectedPackage, setSelectedPackage] = useState(null)
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedEventType, setSelectedEventType] = useState('all')
  const [sortBy, setSortBy] = useState('default')

  const handleAddToCartClick = (pkg) => {
    setSelectedPackage(pkg)
    setIsPopupOpen(true)
  }

  const handleConfirmAddToCart = (pkg, quantity) => {
    addToCart({
      id: pkg.id,
      name: pkg.name,
      category: pkg.category,
      price: pkg.price,
      quantity: quantity
    })
    setIsPopupOpen(false)
    setSelectedPackage(null)
  }

  const handleClosePopup = () => {
    setIsPopupOpen(false)
    setSelectedPackage(null)
  }

  // Filter and sort packages
  const filteredAndSortedPackages = useMemo(() => {
    let filtered = conventionPackages

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(pkg => pkg.category === selectedCategory)
    }

    // Filter by event type
    if (selectedEventType !== 'all') {
      filtered = filtered.filter(pkg => pkg.includes.includes(selectedEventType))
    }

    // Sort packages
    switch (sortBy) {
      case 'price-low':
        return filtered.sort((a, b) => a.price - b.price)
      case 'price-high':
        return filtered.sort((a, b) => b.price - a.price)
      case 'popular':
        return filtered.sort((a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0))
      default:
        return filtered
    }
  }, [selectedCategory, selectedEventType, sortBy])

  // Group filtered packages by category
  const groupedPackages = useMemo(() => {
    return filteredAndSortedPackages.reduce((acc, pkg) => {
      if (!acc[pkg.category]) acc[pkg.category] = []
      acc[pkg.category].push(pkg)
      return acc
    }, {})
  }, [filteredAndSortedPackages])

  const categoryOrder = ['kids', 'adult', 'couple', 'elderly', 'non-registered']

  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-br from-orange-50 via-white to-amber-50">
      <Header />
      
      {/* Add to Cart Popup */}
      {selectedPackage && (
        <AddToCartPopup
          pkg={selectedPackage}
          isOpen={isPopupOpen}
          onClose={handleClosePopup}
          onConfirm={handleConfirmAddToCart}
        />
      )}
      
      <section className="flex-grow py-12">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Calendar className="h-4 w-4" />
              August 15-17, 2025
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
              Annual Convention 2025
            </h1>
            <p className="text-xl text-gray-600 mb-6 max-w-3xl mx-auto leading-relaxed">
              Join us for an unforgettable experience filled with culture, celebration, and community. 
              Choose the perfect package that suits your needs.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>Convention Center, Beirut</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>500+ Expected Attendees</span>
              </div>
            </div>
          </div>

          {/* Filters Section */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-12">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="flex items-center gap-2">
                <Filter className="h-5 w-5 text-orange-500" />
                <h3 className="text-lg font-semibold text-gray-900">Filter Packages</h3>
              </div>
              
              <div className="flex flex-wrap gap-4">
                {/* Category Filter */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-700">Category</label>
                  <select 
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  >
                    <option value="all">All Categories</option>
                    <option value="kids">Kids</option>
                    <option value="adult">Adult</option>
                    <option value="couple">Couple</option>
                    <option value="elderly">Elderly</option>
                    <option value="non-registered">Non-Registered</option>
                  </select>
                </div>

                {/* Event Type Filter */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-700">Event Type</label>
                  <select 
                    value={selectedEventType}
                    onChange={(e) => setSelectedEventType(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  >
                    {eventTypes.map(type => (
                      <option key={type.id} value={type.id}>{type.label}</option>
                    ))}
                  </select>
                </div>

                {/* Sort Filter */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-700">Sort By</label>
                  <select 
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  >
                    <option value="default">Default</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="popular">Most Popular</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Active Filters Display */}
            <div className="flex flex-wrap gap-2 mt-4">
              {selectedCategory !== 'all' && (
                <Badge className="bg-orange-100 text-orange-800">
                  Category: {categoryLabels[selectedCategory]}
                </Badge>
              )}
              {selectedEventType !== 'all' && (
                <Badge className="bg-orange-100 text-orange-800">
                  {eventTypes.find(t => t.id === selectedEventType)?.label}
                </Badge>
              )}
              {sortBy !== 'default' && (
                <Badge className="bg-orange-100 text-orange-800">
                  Sorted by {sortBy.replace('-', ' ')}
                </Badge>
              )}
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-8">
            <p className="text-gray-600">
              Showing <span className="font-semibold text-orange-600">{filteredAndSortedPackages.length}</span> packages
            </p>
          </div>

          {/* Packages by Category */}
          {categoryOrder.map((category) => (
            groupedPackages[category] && groupedPackages[category].length > 0 && (
              <div key={category} className="mb-16">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-3">
                    {categoryLabels[category]}
                  </h2>
                  <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-amber-500 mx-auto rounded-full"></div>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {groupedPackages[category].map((pkg) => (
                    <Card
                      key={pkg.id}
                      className={`flex flex-col hover:shadow-xl transition-all duration-300 overflow-hidden border-2 ${
                        pkg.popular 
                          ? 'border-orange-300 shadow-lg ring-2 ring-orange-200' 
                          : 'border-gray-200 hover:border-orange-200'
                      }`}
                    >
                      {pkg.popular && (
                        <div className="absolute top-4 right-4 z-10">
                          <Badge className="bg-gradient-to-r from-orange-500 to-amber-500 text-white flex items-center gap-1">
                            <Star className="h-3 w-3 fill-current" />
                            Popular
                          </Badge>
                        </div>
                      )}
                      
                      <CardHeader className={`relative pb-4 ${
                        pkg.popular 
                          ? 'bg-gradient-to-r from-orange-500 to-amber-500' 
                          : 'bg-gradient-to-r from-orange-600 to-amber-600'
                      } text-white`}>
                        <div className="text-5xl mb-3 text-center">{pkg.icon}</div>
                        <CardTitle className="text-xl text-center">{pkg.name}</CardTitle>
                        <CardDescription className="text-white/90 text-center">{pkg.description}</CardDescription>
                      </CardHeader>
                      
                      <CardContent className="flex-grow pt-6">
                        {/* Price */}
                        <div className="text-center mb-6">
                          <span className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                            ${pkg.price}
                          </span>
                          <p className="text-sm text-gray-500 mt-1">per person</p>
                        </div>

                        {/* Features */}
                        <div className="space-y-3 mb-6">
                          {pkg.features.map((feature, idx) => (
                            <div key={idx} className="flex items-start gap-3">
                              <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                                <Check className="h-3 w-3 text-green-600" />
                              </div>
                              <span className="text-sm text-gray-700 leading-relaxed">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>

                      {/* Add to Cart Button */}
                      <div className="p-6 pt-0">
                        <Button
                          onClick={() => handleAddToCartClick(pkg)}
                          className="w-full py-3 text-base font-semibold bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-lg hover:shadow-xl transition-all"
                        >
                          Add to Cart - ${pkg.price}
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )
          ))}

          {/* No Results Message */}
          {filteredAndSortedPackages.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">😔</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No packages found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your filters to see more options.</p>
              <Button
                onClick={() => {
                  setSelectedCategory('all')
                  setSelectedEventType('all')
                  setSortBy('default')
                }}
                className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white"
              >
                Clear All Filters
              </Button>
            </div>
          )}

          {/* Continue Shopping CTA */}
          {filteredAndSortedPackages.length > 0 && (
            <div className="text-center mt-16 pt-12 border-t border-gray-200">
              <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl p-8 max-w-2xl mx-auto">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Ready to complete your selection?</h3>
                <p className="text-gray-600 mb-6">Review your chosen packages and proceed to checkout.</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-lg hover:shadow-xl transition-all"
                    onClick={() => window.location.href = '/cart'}
                  >
                    View Cart & Checkout
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => {
                      setSelectedCategory('all')
                      setSelectedEventType('all')
                      setSortBy('default')
                    }}
                    className="border-orange-300 text-orange-600 hover:bg-orange-50"
                  >
                    Explore All Packages
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}