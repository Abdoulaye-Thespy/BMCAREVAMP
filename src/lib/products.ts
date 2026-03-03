export interface Product {
  id: string
  name: string
  description: string
  priceInCents: number
  images?: string[]
}

// Update this array with your actual products
export const PRODUCTS: Product[] = [
  {
    id: 'basic-package',
    name: 'Basic Package',
    description: 'Get started with our basic package',
    priceInCents: 2999, // $29.99
  },
  {
    id: 'pro-package',
    name: 'Pro Package',
    description: 'Upgrade to our pro package for more features',
    priceInCents: 7999, // $79.99
  },
  {
    id: 'enterprise-package',
    name: 'Enterprise Package',
    description: 'Full-featured enterprise package',
    priceInCents: 29999, // $299.99
  },
]
