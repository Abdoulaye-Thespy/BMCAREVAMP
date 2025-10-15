import { Mail, Phone, ShoppingCart, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="bg-[#2C3E50] text-white">
        <div className="container flex h-14 items-center justify-end gap-6 px-4 md:px-6">
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            <div className="flex flex-col">
              <span className="text-xs font-medium">Email Address</span>
              <span className="text-xs text-white/80">info@bafutmongusa.org</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4" />
            <div className="flex flex-col">
              <span className="text-xs font-medium">Phone Number</span>
              <span className="text-xs text-white/80">+1 (555) 000-0000</span>
            </div>
          </div>
        </div>
      </div>

      <div className="border-b bg-white">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-200">
              <span className="text-sm font-bold text-gray-600">LOGO</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden items-center gap-8 md:flex">
            <a href="#home" className="text-sm font-medium text-primary transition-colors hover:text-primary/80">
              Home
            </a>
            <a href="#about" className="text-sm font-medium text-foreground transition-colors hover:text-primary">
              About
            </a>
            <a href="#convention" className="text-sm font-medium text-foreground transition-colors hover:text-primary">
              Convention
            </a>
            <a
              href="#resources"
              className="flex items-center gap-1 text-sm font-medium text-foreground transition-colors hover:text-primary"
            >
              Resources
              <ChevronDown className="h-4 w-4" />
            </a>
            <a href="#contact" className="text-sm font-medium text-foreground transition-colors hover:text-primary">
              Contact
            </a>
          </nav>

          {/* Right side actions */}
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <ShoppingCart className="h-5 w-5" />
            </Button>
            <a href="#login" className="text-sm font-medium text-foreground transition-colors hover:text-primary">
              Log in
            </a>
            <Button size="default" className="bg-primary text-primary-foreground hover:bg-primary/90">
              Donate Now
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
