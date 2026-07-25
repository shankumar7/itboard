import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-white border-t border-border mt-20">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex flex-col items-center md:items-start">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-indigo-600 bg-clip-text text-transparent">
                IT Board
              </span>
            </Link>
            <p className="mt-2 text-sm text-muted-foreground">
              Academic Year 2026-27
            </p>
          </div>
          
          <div className="flex gap-6 text-sm text-muted-foreground">
            <Link href="/about" className="hover:text-primary transition-colors">About</Link>
            <Link href="/selection-process" className="hover:text-primary transition-colors">Selection Process</Link>
            <Link href="/contact" className="hover:text-primary transition-colors">Contact</Link>
          </div>
          
          <div className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} IT Board. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  )
}
