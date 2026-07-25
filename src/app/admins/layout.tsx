'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import { LayoutDashboard, LogOut, Shield, ChevronLeft } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user)
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setUser(null)
    router.refresh()
  }

  // If not logged in, render clean full-screen layout without sidebar
  if (!user && !loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col justify-center items-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/[0.04] rounded-full blur-[140px] pointer-events-none" />
        <Link href="/" className="absolute top-6 left-6 text-xs text-white/40 hover:text-white flex items-center gap-1.5 transition-colors">
          <ChevronLeft className="w-4 h-4" /> Back to Main Site
        </Link>
        {children}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col">
      {/* Top Navbar Header for Admin */}
      <header className="border-b border-white/10 bg-[#0d0d0d]/90 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shadow-[0_0_20px_rgba(245,197,24,0.15)]">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-base font-black text-white tracking-tight leading-none">Admin Portal</h1>
              <p className="text-[10px] text-white/40 uppercase tracking-widest font-medium mt-1">IT Board CMRCET</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link 
              href="/" 
              className="text-xs text-white/50 hover:text-white flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-white/5 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" /> Main Site
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-rose-400 hover:bg-rose-500/10 border border-rose-500/20 hover:border-rose-500/40 transition-all"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-6 md:p-10 max-w-7xl mx-auto w-full">
        {children}
      </main>
    </div>
  )
}

