import { Suspense } from "react"
import { CartProvider } from "@/context/cart-context"
import AuthProvider from "@/components/auth-provider"  // Create this client component
import "./globals.css"

export const metadata = {
  title: "BMCA - Building Bafut Communities",
  description: "Empowering communities in Bafut through meals, volunteers, and sustainable impact",
  generator: "v0.app",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <CartProvider>
            <Suspense fallback={null}>{children}</Suspense>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}