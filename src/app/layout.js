import { Suspense } from "react"
import { CartProvider } from "@/context/cart-context"
import "./globals.css"

export const metadata = {
  title: "BMCA - Building Beirut Communities",
  description: "Empowering communities in Beirut through meals, volunteers, and sustainable impact",
  generator: "v0.app",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Suspense fallback={null}>{children}</Suspense>
        </CartProvider>
      </body>
    </html>
  )
}