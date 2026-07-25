'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/5">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <div className="w-9 h-9 rounded-full overflow-hidden bg-white/10 flex items-center justify-center p-0.5">
              <Image src="/cmr-logo.svg" alt="CMR" width={28} height={28} className="object-contain" />
            </div>
            <div className="w-9 h-9 rounded-full overflow-hidden bg-white/10 flex items-center justify-center p-0.5">
              <Image src="/student-council-logo.svg" alt="Council" width={28} height={28} className="object-contain" />
            </div>
            <div className="w-9 h-9 rounded-full overflow-hidden bg-white/10 flex items-center justify-center p-0.5">
              <Image src="/it-board-logo.jpg" alt="IT Board" width={28} height={28} className="object-contain" />
            </div>
          </div>
          <span className="text-white font-bold text-lg tracking-tight hidden sm:block">
            IT Board
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/#about" className="text-white/60 hover:text-white text-sm font-medium transition-colors">About</Link>
          <Link href="/#clubs" className="text-white/60 hover:text-white text-sm font-medium transition-colors">Clubs</Link>
          <Link href="/#process" className="text-white/60 hover:text-white text-sm font-medium transition-colors">Process</Link>
          <Link href="/#contact" className="text-white/60 hover:text-white text-sm font-medium transition-colors">Contact</Link>
        </div>

        {/* CTA */}
        <div className="hidden md:block">
          <Link href="/#apply" className="btn-primary">
            Apply Now
          </Link>
        </div>

        {/* Mobile */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white p-2">
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden bg-[#0a0a0a]/95 backdrop-blur-xl border-t border-white/5"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              <Link href="/#about" onClick={() => setIsOpen(false)} className="text-white/70 hover:text-white text-base font-medium py-2">About</Link>
              <Link href="/#clubs" onClick={() => setIsOpen(false)} className="text-white/70 hover:text-white text-base font-medium py-2">Clubs</Link>
              <Link href="/#process" onClick={() => setIsOpen(false)} className="text-white/70 hover:text-white text-base font-medium py-2">Process</Link>
              <Link href="/#contact" onClick={() => setIsOpen(false)} className="text-white/70 hover:text-white text-base font-medium py-2">Contact</Link>
              <Link href="/#apply" onClick={() => setIsOpen(false)} className="btn-primary text-center mt-2">Apply Now</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
