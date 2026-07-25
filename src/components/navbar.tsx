'use client'

import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import { usePathname } from 'next/navigation'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  if (pathname?.startsWith('/admins')) {
    return null
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="h-[1px] bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      
      <nav className="bg-[#0d0d0d]/90 backdrop-blur-2xl border-b border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between gap-2">
          {/* Logo cluster */}
          <Link href="/" className="flex items-center gap-2 sm:gap-4 group min-w-0">
            <div className="flex items-center -space-x-1.5 sm:-space-x-2 flex-shrink-0">
              <img 
                src="/cmr-logo.jpg" 
                alt="CMR College" 
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover ring-2 ring-[#0d0d0d] relative z-30" 
              />
              <img 
                src="/council-logo.jpg" 
                alt="Student Council" 
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover ring-2 ring-[#0d0d0d] relative z-20" 
              />
              <img 
                src="/it-board-logo.jpg" 
                alt="IT Board" 
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover ring-2 ring-[#0d0d0d] relative z-10" 
              />
            </div>
            <div className="min-w-0">
              <p className="text-white font-black text-sm sm:text-base tracking-tight leading-none truncate">IT Board</p>
              <p className="text-white/30 text-[9px] sm:text-[10px] font-medium tracking-wider uppercase mt-0.5 hidden xs:block">CMRCET</p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {['About', 'Clubs', 'Process', 'Contact'].map((item) => (
              <Link
                key={item}
                href={`/#${item.toLowerCase()}`}
                className="px-4 py-2 text-[13px] font-medium text-white/50 hover:text-white transition-colors rounded-lg hover:bg-white/[0.04]"
              >
                {item}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:block">
            <Link href="/#apply" className="btn-primary text-xs">
              Apply Now
            </Link>
          </div>

          {/* Mobile button */}
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            aria-label="Toggle menu"
            className="md:hidden text-white bg-white/10 hover:bg-white/20 p-2.5 rounded-xl border border-white/10 transition-colors flex-shrink-0 flex items-center justify-center"
          >
            {isOpen ? <X className="w-5 h-5 text-primary" /> : <Menu className="w-5 h-5 text-white" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden bg-[#0d0d0d]/98 backdrop-blur-2xl border-b border-white/5"
          >
            <div className="px-6 py-6 flex flex-col gap-1">
              {['About', 'Clubs', 'Process', 'Contact'].map((item) => (
                <Link
                  key={item}
                  href={`/#${item.toLowerCase()}`}
                  onClick={() => setIsOpen(false)}
                  className="text-white/60 hover:text-white text-base font-medium py-3 px-4 rounded-lg hover:bg-white/5 transition-colors"
                >
                  {item}
                </Link>
              ))}
              <Link href="/#apply" onClick={() => setIsOpen(false)} className="btn-primary text-center mt-4">
                Apply Now
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
