'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function Footer() {
  const pathname = usePathname()

  if (pathname?.startsWith('/admins')) {
    return null
  }

  return (
    <footer className="border-t border-white/5 bg-[#050505] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14 space-y-8">

        {/* Top Footer Row */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">

          {/* Logo & Brand */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="flex items-center -space-x-2">
              <img src="/cmr-logo.jpg" alt="CMR College" className="w-8 h-8 rounded-full object-cover ring-2 ring-[#050505]" />
              <img src="/council-logo.jpg" alt="Student Council" className="w-8 h-8 rounded-full object-cover ring-2 ring-[#050505]" />
              <img src="/it-board-logo.jpg" alt="IT Board" className="w-8 h-8 rounded-full object-cover ring-2 ring-[#050505]" />
            </div>
            <div>
              <p className="font-bold text-white text-sm tracking-tight"> Board of IT</p>
              <p className="text-white/30 text-[10px] uppercase tracking-widest font-medium">CMR College of Engineering and Technology.</p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap justify-center gap-6 sm:gap-8 text-xs font-semibold text-white/50">
            <Link href="/#about" className="hover:text-white transition-colors">About</Link>
            <Link href="/#clubs" className="hover:text-white transition-colors">Clubs</Link>
            <Link href="/#process" className="hover:text-white transition-colors">Process</Link>
            <Link href="/#apply" className="hover:text-white transition-colors">Apply</Link>
            <Link href="/#contact" className="hover:text-white transition-colors">Contact</Link>
          </div>
        </div>

        {/* Bottom Copyright Row */}
        <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-3 text-center sm:text-left text-xs text-white/30 font-medium">
          <p>© {new Date().getFullYear()} IT Board • CMR College of Engineering & Technology</p>
          <p className="text-white/20 text-[11px]">Built with Passion & Excellence</p>
        </div>

      </div>
    </footer>
  )
}
