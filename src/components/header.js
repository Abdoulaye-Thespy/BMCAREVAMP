"use client"

import { useState, useEffect } from "react"
import { Mail, Phone, ShoppingCart, Menu, Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isDarkTheme, setIsDarkTheme] = useState(false)
  const [isSticky, setIsSticky] = useState(false)

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme)
    document.documentElement.classList.toggle('dark')
  }

  const handleImageError = (e) => {
    const target = e.target
    target.style.display = 'none'
    if (target.nextElementSibling) {
      target.nextElementSibling.classList.remove('hidden')
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      // Check if we've scrolled past the first navbar (48px height)
      const scrollTop = window.scrollY || document.documentElement.scrollTop
      setIsSticky(scrollTop > 48) // 48px is the height of the first navbar (h-12)
    }

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll)
    
    // Check initial position
    handleScroll()

    // Cleanup
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className="w-full">
      {/* Top Bar - Scrolls away */}
      <div className="bg-[#181D27] text-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-12">
            {/* Left side - Theme Toggle */}
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleTheme}
                className="flex items-center gap-2 text-white hover:bg-white/10 transition-colors"
                aria-label={isDarkTheme ? "Switch to light theme" : "Switch to dark theme"}
              >
                {isDarkTheme ? (
                  <>
                    <Sun className="h-4 w-4" />
                    <span className="text-sm">Light Mode</span>
                  </>
                ) : (
                  <>
                    <Moon className="h-4 w-4" />
                    <span className="text-sm">Dark Mode</span>
                  </>
                )}
              </Button>
            </div>

            {/* Right side - Contact info */}
            <div className="flex items-center gap-6">
              <a
                href="mailto:info@bafutmongusa.org"
                className="flex items-center gap-2 text-sm hover:text-white/80 transition-colors"
              >
                <Mail className="h-4 w-4" />
                <span className="hidden sm:inline">info@bafutmongusa.org</span>
              </a>
              <a
                href="tel:+15550000000"
                className="flex items-center gap-2 text-sm hover:text-white/80 transition-colors"
              >
                <Phone className="h-4 w-4" />
                <span className="hidden sm:inline">+1 (555) 000-0000</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation - Becomes sticky when first navbar scrolls away */}
      <div className={`${isSticky ? 'fixed top-0 left-0 right-0 z-50' : 'relative'} bg-white border-b shadow-sm transition-all duration-300`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Left Column - Logo + Navigation */}
            <div className="flex items-center gap-8">
              {/* Logo */}
              <div className="flex items-center">
                <img 
                  src="/logo.png" 
                  alt="BMCA Logo" 
                  className="h-12 w-auto"
                  onError={handleImageError}
                />
                {/* Fallback logo */}
                <div className="hidden h-12 w-12 items-center justify-center rounded-full bg-gray-200">
                  <span className="text-sm font-bold text-gray-600">BMCA</span>
                </div>
              </div>

              {/* Desktop Navigation */}
              <NavigationMenu className="hidden lg:flex">
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuLink 
                      href="/"
                      className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium text-[#F5A623] hover:bg-accent hover:text-[#F5A623]/80 focus:bg-accent focus:text-[#F5A623]/80"
                    >
                      Home
                    </NavigationMenuLink>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <NavigationMenuLink 
                      href="/about"
                      className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium text-gray-700 hover:bg-accent hover:text-[#F5A623] focus:bg-accent focus:text-[#F5A623]"
                    >
                      About
                    </NavigationMenuLink>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <NavigationMenuLink 
                      href="/convention"
                      className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium text-gray-700 hover:bg-accent hover:text-[#F5A623] focus:bg-accent focus:text-[#F5A623]"
                    >
                      Convention
                    </NavigationMenuLink>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="text-sm font-medium text-gray-700 hover:text-[#F5A623] data-[state=open]:text-[#F5A623]">
                      Programs
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                        <li>
                          <NavigationMenuLink asChild>
                            <a
                              href="/programs/education"
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            >
                              <div className="text-sm font-medium leading-none">Education</div>
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                Educational initiatives and learning programs
                              </p>
                            </a>
                          </NavigationMenuLink>
                        </li>
                        <li>
                          <NavigationMenuLink asChild>
                            <a
                              href="/programs/water"
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            >
                              <div className="text-sm font-medium leading-none">Water</div>
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                Clean water access and sanitation projects
                              </p>
                            </a>
                          </NavigationMenuLink>
                        </li>
                        <li>
                          <NavigationMenuLink asChild>
                            <a
                              href="/programs/culture-art"
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            >
                              <div className="text-sm font-medium leading-none">Culture & Arts</div>
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                Preserving and promoting cultural heritage
                              </p>
                            </a>
                          </NavigationMenuLink>
                        </li>
                        <li>
                          <NavigationMenuLink asChild>
                            <a
                              href="/programs/health"
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            >
                              <div className="text-sm font-medium leading-none">Health & Fitness</div>
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                Healthcare services and wellness programs
                              </p>
                            </a>
                          </NavigationMenuLink>
                        </li>
                        <li>
                          <NavigationMenuLink asChild>
                            <a
                              href="/kiteuh"
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            >
                              <div className="text-sm font-medium leading-none">Kiteuh Mutual Assurance</div>
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                Subscription program for members support
                              </p>
                            </a>
                          </NavigationMenuLink>
                        </li>
                        <li>
                          <NavigationMenuLink asChild>
                            <a
                              href="/programs/infrastructure"
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            >
                              <div className="text-sm font-medium leading-none">Infrastructure</div>
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                Community development and infrastructure projects
                              </p>
                            </a>
                          </NavigationMenuLink>
                        </li>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="text-sm font-medium text-gray-700 hover:text-[#F5A623] data-[state=open]:text-[#F5A623]">
                      Resources
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                        <li>
                          <NavigationMenuLink asChild>
                            <a
                              href="/resources/annual-reports"
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            >
                              <div className="text-sm font-medium leading-none">Annual Reports</div>
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                View our yearly impact and financials
                              </p>
                            </a>
                          </NavigationMenuLink>
                        </li>
                        <li>
                          <NavigationMenuLink asChild>
                            <a
                              href="/resources/documents"
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            >
                              <div className="text-sm font-medium leading-none">Documents & Forms</div>
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                Download important documents
                              </p>
                            </a>
                          </NavigationMenuLink>
                        </li>
                        <li>
                          <NavigationMenuLink asChild>
                            <a
                              href="/resources/media-kit"
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            >
                              <div className="text-sm font-medium leading-none">Media Kit</div>
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                Logos, photos, and press materials
                              </p>
                            </a>
                          </NavigationMenuLink>
                        </li>
                        <li>
                          <NavigationMenuLink asChild>
                            <a
                              href="/resources/newsletter"
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            >
                              <div className="text-sm font-medium leading-none">Newsletter Archive</div>
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                Read past newsletters and updates
                              </p>
                            </a>
                          </NavigationMenuLink>
                        </li>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <NavigationMenuLink 
                      href="/contact"
                      className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium text-gray-700 hover:bg-accent hover:text-[#F5A623] focus:bg-accent focus:text-[#F5A623]"
                    >
                      Contact
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>

            {/* Right Column - Actions */}
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="hidden lg:flex">
                <ShoppingCart className="h-5 w-5" />
                <span className="sr-only">Shopping Cart</span>
              </Button>

              <a
                href="/login"
                className="hidden text-sm font-medium text-[#F5A623] transition-colors hover:text-[#F5A623]/80 lg:inline-block"
              >
                Log in
              </a>

              <Button size="default" className="hidden bg-[#F5A623] text-white hover:bg-[#F5A623]/90 lg:inline-flex">
                Donate Now
              </Button>

              {/* Mobile Menu */}
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="lg:hidden"
                    onClick={() => setMobileMenuOpen(true)}
                  >
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                  <SheetHeader>
                    <SheetTitle>Menu</SheetTitle>
                  </SheetHeader>
                  <nav className="flex flex-col gap-4 mt-8">
                    {/* Theme Toggle in Mobile Menu */}
                    <div className="flex items-center justify-between py-2 border-b pb-4">
                      <span className="text-lg font-medium">Theme</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={toggleTheme}
                        className="flex items-center gap-2"
                      >
                        {isDarkTheme ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                        <span>{isDarkTheme ? "Light Mode" : "Dark Mode"}</span>
                      </Button>
                    </div>

                    <a
                      href="/"
                      className="text-lg font-medium text-[#F5A623] hover:text-[#F5A623]/80 transition-colors py-2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Home
                    </a>
                    <a
                      href="/about"
                      className="text-lg font-medium text-gray-700 hover:text-[#F5A623] transition-colors py-2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      About
                    </a>
                    <a
                      href="/convention"
                      className="text-lg font-medium text-gray-700 hover:text-[#F5A623] transition-colors py-2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Convention
                    </a>

                    <div className="space-y-2 py-2">
                      <div className="text-lg font-medium text-muted-foreground">Programs</div>
                      <div className="pl-4 space-y-2">
                        <a
                          href="/programs/education"
                          className="block text-base hover:text-[#F5A623] transition-colors py-2"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Education
                        </a>
                        <a
                          href="/programs/water"
                          className="block text-base hover:text-[#F5A623] transition-colors py-2"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Water
                        </a>
                        <a
                          href="/programs/culture-arts"
                          className="block text-base hover:text-[#F5A623] transition-colors py-2"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Culture & Arts
                        </a>
                        <a
                          href="/programs/health-fitness"
                          className="block text-base hover:text-[#F5A623] transition-colors py-2"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Health & Fitness
                        </a>
                        <a
                          href="/programs/kiteuh"
                          className="block text-base hover:text-[#F5A623] transition-colors py-2"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Kiteuh Mutual Assurance
                        </a>
                        <a
                          href="/programs/infrastructure"
                          className="block text-base hover:text-[#F5A623] transition-colors py-2"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Infrastructure
                        </a>
                      </div>
                    </div>

                    <div className="space-y-2 py-2">
                      <div className="text-lg font-medium text-muted-foreground">Resources</div>
                      <div className="pl-4 space-y-2">
                        <a
                          href="/resources/annual-reports"
                          className="block text-base hover:text-[#F5A623] transition-colors py-2"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Annual Reports
                        </a>
                        <a
                          href="/resources/documents"
                          className="block text-base hover:text-[#F5A623] transition-colors py-2"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Documents & Forms
                        </a>
                        <a
                          href="/resources/media-kit"
                          className="block text-base hover:text-[#F5A623] transition-colors py-2"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Media Kit
                        </a>
                        <a
                          href="/resources/newsletter"
                          className="block text-base hover:text-[#F5A623] transition-colors py-2"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Newsletter Archive
                        </a>
                      </div>
                    </div>

                    <a
                      href="/contact"
                      className="text-lg font-medium text-gray-700 hover:text-[#F5A623] transition-colors py-2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Contact
                    </a>

                    <div className="pt-4 space-y-2 border-t">
                      <a href="/login" className="block" onClick={() => setMobileMenuOpen(false)}>
                        <Button variant="outline" className="w-full bg-transparent">
                          Log in
                        </Button>
                      </a>
                      <a href="/donate" className="block" onClick={() => setMobileMenuOpen(false)}>
                        <Button className="w-full bg-[#F5A623] hover:bg-[#F5A623]/90 text-white">
                          Donate Now
                        </Button>
                      </a>
                    </div>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}