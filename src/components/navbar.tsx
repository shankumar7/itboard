'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useState, useEffect } from 'react'

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Positions', href: '/#positions' },
  { name: 'Process', href: '/selection-process' },
  { name: 'Contact', href: '/contact' },
]

export function Navbar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <nav className={cn(
        "pointer-events-auto transition-all duration-500 ease-in-out",
        "bg-white/70 backdrop-blur-xl border border-white/20 shadow-premium",
        "rounded-full px-6 py-3",
        scrolled ? "w-full max-w-4xl" : "w-full max-w-5xl"
      )}>
        <div className="flex items-center justify-between">
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-xl font-bold tracking-tight text-foreground">
                IT Board
              </span>
            </Link>
          </div>
          
          {/* Desktop Nav */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || (link.href.includes('#') && pathname === '/')
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="relative px-4 py-2 text-sm font-medium transition-colors"
                  >
                    <span className={cn("relative z-10", isActive ? "text-primary" : "text-foreground/70 hover:text-foreground")}>
                      {link.name}
                    </span>
                    {isActive && pathname !== '/' && (
                      <motion.div
                        layoutId="nav-pill"
                        className="absolute inset-0 bg-primary/10 rounded-full -z-0"
                        initial={false}
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                  </Link>
                )
              })}
              <div className="pl-4 border-l border-border/50 ml-2">
                <Link
                  href="/apply"
                  className="premium-btn bg-primary text-primary-foreground px-6 py-2.5 rounded-full font-medium text-sm inline-block"
                >
                  Apply Now
                </Link>
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-full text-foreground hover:bg-black/5 focus:outline-none"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden overflow-hidden"
            >
              <div className="pt-4 pb-2 space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      'block px-4 py-3 rounded-2xl text-base font-medium transition-colors',
                      pathname === link.href ? 'text-primary bg-primary/10' : 'text-foreground/70 hover:text-foreground hover:bg-black/5'
                    )}
                  >
                    {link.name}
                  </Link>
                ))}
                <div className="pt-2">
                  <Link
                    href="/apply"
                    onClick={() => setIsOpen(false)}
                    className="block w-full text-center premium-btn bg-primary text-primary-foreground px-6 py-4 rounded-2xl font-medium"
                  >
                    Apply Now
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </div>
  )
}

