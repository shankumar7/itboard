'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function Footer() {
  const pathname = usePathname()

  if (pathname?.startsWith('/admins')) {
    return null
  }
  return (
    <footer className="border-t border-white/5 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/30 text-sm">
            © {new Date().getFullYear()} IT Board · CMR College of Engineering & Technology
          </p>
          <div className="flex gap-8">
            <Link href="/#about" className="text-white/30 hover:text-white/60 text-sm transition-colors">About</Link>
            <Link href="/#clubs" className="text-white/30 hover:text-white/60 text-sm transition-colors">Clubs</Link>
            <Link href="/#contact" className="text-white/30 hover:text-white/60 text-sm transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
