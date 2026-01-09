'use client'

import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-8">
        <Link href="/" className="text-2xl font-bold text-emerald-600 transition-colors hover:text-emerald-700">
          Inspirely
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <Link
            href="/write"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Write
          </Link>
          <Link
            href="/stories"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Stories
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            About
          </Link>
          
          <div className="flex items-center gap-4">
            <Link
              href="/signin"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Sign in
            </Link>
            <Link
              href="/signup"
              className="rounded-full bg-emerald-600 px-6 py-2 text-sm font-medium text-white transition-all hover:scale-105 hover:bg-emerald-700"
            >
              Get started
            </Link>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (<X className="h-6 w-6 text-foreground" />) : (<Menu className="h-6 w-6 text-foreground" />)}
        </button>
      </div>

      {isMenuOpen && (
        <div className="border-t border-border bg-background md:hidden">
          <div className="px-6 py-4 space-y-4">
            <Link
              href="/write"
              className="block text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              onClick={() => setIsMenuOpen(false)}
            >
              Write
            </Link>
            <Link
              href="/stories"
              className="block text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              onClick={() => setIsMenuOpen(false)}
            >
              Stories
            </Link>
            <Link
              href="/about"
              className="block text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <div className="flex items-center gap-4 pt-4 border-t border-border">
              <Link
                href="/signin"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign in
              </Link>
              <Link
                href="/signup"
                className="rounded-full bg-emerald-600 px-6 py-2 text-sm font-medium text-white transition-all hover:bg-emerald-700"
                onClick={() => setIsMenuOpen(false)}
              >
                Get started
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
