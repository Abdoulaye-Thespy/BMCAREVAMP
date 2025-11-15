'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useCart } from '@/context/cart-context'
import { useState } from 'react'
import { Check } from 'lucide-react'

const conventionPackages = [
  {
    id: 'kids-cost',
    name: 'Kids Package',
    category: 'kids',
    price: 25,
    description: 'Perfect for children and youth',
    features: ['Convention Cost', 'T-Shirt', 'BBQ', 'Soft Drinks', 'Soccer Activity'],
    icon: '👶'
  },
  {
    id: 'kids-cultural',
    name: 'Kids + Cultural Night',
    category: 'kids',
    price: 35,
    description: 'Kids package with cultural night access',
    features: ['Convention Cost', 'Cultural Night', 'T-Shirt', 'BBQ', 'Soft Drinks', 'Soccer'],
    icon: '🎭'
  },
  {
    id: 'kids-gala',
    name: 'Kids + Gala Night',
    category: 'kids',
    price: 40,
    description: 'Kids package with gala night access',
    features: ['Convention Cost', 'Gala Night', 'T-Shirt', 'BBQ', 'Drinks', 'Soccer'],
    icon: '✨'
  },
  {
    id: 'adult-cost',
    name: 'Adult Package',
    category: 'adult',
    price: 50,
    description: 'Standard adult convention package',
    features: ['Convention Cost', 'T-Shirt', 'BBQ', 'Drinks', 'All Day Access'],
    icon: '👤'
  },
  {
    id: 'adult-cultural',
    name: 'Adult + Cultural Night',
    category: 'adult',
    price: 65,
    description: 'Adult package with cultural night',
    features: ['Convention Cost', 'Cultural Night', 'T-Shirt', 'BBQ', 'Drinks', 'All Day Access'],
    icon: '🎭'
  },
  {
    id: 'adult-gala',
    name: 'Adult + Gala Night',
    category: 'adult',
    price: 75,
    description: 'Adult package with gala night',
    features: ['Convention Cost', 'Gala Night', 'T-Shirt', 'BBQ', 'Drinks', 'Premium Seating'],
    icon: '✨'
  },
  {
    id: 'couple-cost',
    name: 'Couple Package',
    category: 'couple',
    price: 85,
    description: 'For two people',
    features: ['Convention Cost (x2)', 'T-Shirts (x2)', 'BBQ', 'Drinks', 'Couple Seating'],
    icon: '💑'
  },
  {
    id: 'couple-cultural',
    name: 'Couple + Cultural Night',
    category: 'couple',
    price: 110,
    description: 'Couple package with cultural night',
    features: ['Convention Cost (x2)', 'Cultural Night (x2)', 'T-Shirts (x2)', 'BBQ', 'Drinks', 'Premium Seating'],
    icon: '💃'
  },
  {
    id: 'couple-gala',
    name: 'Couple + Gala Night',
    category: 'couple',
    price: 130,
    description: 'Couple package with gala night',
    features: ['Convention Cost (x2)', 'Gala Night (x2)', 'T-Shirts (x2)', 'BBQ', 'Premium Drinks', 'VIP Seating'],
    icon: '🎉'
  },
  {
    id: 'elderly-cost',
    name: 'Elderly Package',
    category: 'elderly',
    price: 30,
    description: 'Special rate for seniors',
    features: ['Convention Cost', 'T-Shirt', 'BBQ', 'Soft Drinks', 'Reserved Seating'],
    icon: '👴'
  },
  {
    id: 'elderly-cultural',
    name: 'Elderly + Cultural Night',
    category: 'elderly',
    price: 45,
    description: 'Elderly package with cultural night',
    features: ['Convention Cost', 'Cultural Night', 'T-Shirt', 'BBQ', 'Soft Drinks', 'Reserved Seating'],
    icon: '🎵'
  },
  {
    id: 'elderly-gala',
    name: 'Elderly + Gala Night',
    category: 'elderly',
    price: 55,
    description: 'Elderly package with gala night',
    features: ['Convention Cost', 'Gala Night', 'T-Shirt', 'BBQ', 'Drinks', 'VIP Reserved Seating'],
    icon: '🌟'
  },
  {
    id: 'non-registered-cost',
    name: 'Non-Registered Member Package',
    category: 'non-registered',
    price: 60,
    description: 'For non-registered community members',
    features: ['Convention Cost', 'T-Shirt', 'BBQ', 'Drinks', 'Full Access'],
    icon: '🆕'
  },
  {
    id: 'non-registered-cultural',
    name: 'Non-Registered + Cultural Night',
    category: 'non-registered',
    price: 80,
    description: 'Non-registered with cultural night',
    features: ['Convention Cost', 'Cultural Night', 'T-Shirt', 'BBQ', 'Drinks', 'Full Access'],
    icon: '🎪'
  },
  {
    id: 'non-registered-gala',
    name: 'Non-Registered + Gala Night',
    category: 'non-registered',
    price: 95,
    description: 'Non-registered with gala night',
    features: ['Convention Cost', 'Gala Night', 'T-Shirt', 'BBQ', 'Premium Drinks', 'Premium Seating'],
    icon: '🏆'
  }
]

const categoryLabels = {
  kids: 'Kids Packages',
  adult: 'Adult Packages',
  couple: 'Couple Packages',
  elderly: 'Elderly Packages',
  'non-registered': 'Non-Registered Member Packages'
}

export default function ConventionPage() {
  const { addToCart } = useCart()
  const [addedItem, setAddedItem] = useState(null)

  const handleAddToCart = (pkg) => {
    addToCart({
      id: pkg.id,
      name: pkg.name,
      category: pkg.category,
      price: pkg.price,
      quantity: 1
    })
    setAddedItem(pkg.id)
    setTimeout(() => setAddedItem(null), 2000)
  }

  const groupedPackages = conventionPackages.reduce((acc, pkg) => {
    if (!acc[pkg.category]) acc[pkg.category] = []
    acc[pkg.category].push(pkg)
    return acc
  }, {})

  const categoryOrder = ['kids', 'adult', 'couple', 'elderly', 'non-registered']

  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      
      <section className="flex-grow bg-gradient-to-b from-orange-50 to-white py-12">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Annual Convention 2025
            </h1>
            <p className="text-xl text-gray-600 mb-4 max-w-2xl mx-auto">
              Enjoy the convention by choosing one of the following packages. All payments are non-refundable.
            </p>
          </div>

          {/* Packages by Category */}
          {categoryOrder.map((category) => (
            groupedPackages[category] && (
              <div key={category} className="mb-16">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                  {categoryLabels[category]}
                </h2>
                
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  {groupedPackages[category].map((pkg) => (
                    <Card
                      key={pkg.id}
                      className="flex flex-col hover:shadow-lg transition-shadow overflow-hidden border-2 border-gray-200"
                    >
                      <CardHeader className="bg-[#F5A623] text-white pb-4">
                        <div className="text-4xl mb-2">{pkg.icon}</div>
                        <CardTitle className="text-xl">{pkg.name}</CardTitle>
                        <CardDescription className="text-white/90">{pkg.description}</CardDescription>
                      </CardHeader>
                      
                      <CardContent className="flex-grow pt-6">
                        {/* Price */}
                        <div className="mb-6">
                          <span className="text-3xl font-bold text-[#F5A623]">
                            ${pkg.price}
                          </span>
                          <p className="text-sm text-gray-500 mt-1">per person</p>
                        </div>

                        {/* Features */}
                        <div className="space-y-3 mb-6">
                          {pkg.features.map((feature, idx) => (
                            <div key={idx} className="flex items-start gap-2">
                              <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-gray-700">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>

                      {/* Add to Cart Button */}
                      <div className="p-6 pt-0">
                        <Button
                          onClick={() => handleAddToCart(pkg)}
                          className="w-full bg-[#F5A623] text-white hover:bg-[#F5A623]/90 transition-all"
                        >
                          {addedItem === pkg.id ? '✓ Added to Cart' : 'Add to Cart'}
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )
          ))}

          {/* Continue Shopping CTA */}
          <div className="text-center mt-12 pt-8 border-t border-gray-200">
            <p className="text-gray-600 mb-4">Ready to complete your selection?</p>
            <Button
              size="lg"
              className="bg-[#F5A623] text-white hover:bg-[#F5A623]/90"
              onClick={() => window.location.href = '/cart'}
            >
              View Cart & Checkout
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
