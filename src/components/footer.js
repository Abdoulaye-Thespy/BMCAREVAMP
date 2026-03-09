import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="w-full border-t bg-slate-900 text-white">
      <div className="container px-4 py-12 md:px-6 md:py-16">
        <div className="grid gap-8 md:grid-cols-4">
          {/* About Column */}
          <div>
            <Link href="/" className="mb-4 flex items-center gap-2">
              <img
                src="/logo.png"
                alt="BMCA Logo"
                className="h-8 w-auto"
              />
              <span className="text-lg font-semibold">BMCA</span>
            </Link>
            <p className="text-pretty text-sm text-white/80">
              The Bafut Manjong Cultural Association, BMCA – is a group of Bafut people and its affiliates based in the United States of America.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-[#E67D00]">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-white/80 transition-colors hover:text-[#E67D00]">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/convention" className="text-white/80 transition-colors hover:text-[#E67D00]">
                  Convention
                </Link>
              </li>
              <li>
                <Link href="/programs" className="text-white/80 transition-colors hover:text-[#E67D00]">
                  Our Programs
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-white/80 transition-colors hover:text-[#E67D00]">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-[#E67D00]">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/news" className="text-white/80 transition-colors hover:text-[#E67D00]">
                  News & Updates
                </Link>
              </li>
              <li>
                <Link href="/reports" className="text-white/80 transition-colors hover:text-[#E67D00]">
                  Annual Reports
                </Link>
              </li>
              <li>
                <Link href="/donate" className="text-white/80 transition-colors hover:text-[#E67D00]">
                  Donate
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-[#E67D00]">Stay Connected</h3>
            <p className="mb-4 text-sm text-white/80">Subscribe to our newsletter for updates</p>
            <div className="mb-4 flex gap-2">
              <Input
                type="email"
                placeholder="Your email"
                className="bg-white/10 text-white placeholder:text-white/60"
              />
              <Button className="bg-[#E67D00] hover:bg-[#E67D00]/90">Subscribe</Button>
            </div>
            <div className="flex gap-3">
              <Button variant="ghost" size="icon" className="h-9 w-9 text-white hover:bg-white/10 hover:text-[#E67D00]" asChild>
                <Link href="https://facebook.com/bmca" target="_blank" rel="noopener noreferrer">
                  <Facebook className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="ghost" size="icon" className="h-9 w-9 text-white hover:bg-white/10 hover:text-[#E67D00]" asChild>
                <Link href="https://twitter.com/bmca" target="_blank" rel="noopener noreferrer">
                  <Twitter className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="ghost" size="icon" className="h-9 w-9 text-white hover:bg-white/10 hover:text-[#E67D00]" asChild>
                <Link href="https://instagram.com/bmca" target="_blank" rel="noopener noreferrer">
                  <Instagram className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="ghost" size="icon" className="h-9 w-9 text-white hover:bg-white/10 hover:text-[#E67D00]" asChild>
                <Link href="https://linkedin.com/company/bmca" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8 text-center text-sm text-white/60">
          <p>&copy; {new Date().getFullYear()} BMCA Foundation. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}