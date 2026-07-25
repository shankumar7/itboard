'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import { LayoutDashboard, LogOut } from 'lucide-react'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  return (
    <div className="flex min-h-screen bg-background mt-[-80px] pt-20">
      {/* Sidebar */}
      <aside className="w-64 bg-white/50 backdrop-blur-xl border-r border-border/50 sticky top-20 h-[calc(100vh-80px)] hidden md:block">
        <div className="p-6">
          <h2 className="text-xl font-bold bg-gradient-to-r from-primary to-indigo-600 bg-clip-text text-transparent mb-8">
            Admin Portal
          </h2>
          <nav className="space-y-2">
            <Link
              href="/admins"
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-colors ${
                pathname === '/admins' ? 'bg-primary/10 text-primary font-medium' : 'text-muted-foreground hover:bg-black/5'
              }`}
            >
              <LayoutDashboard className="w-5 h-5" />
              Dashboard
            </Link>
          </nav>
        </div>
        <div className="absolute bottom-0 w-full p-6 border-t border-border/50">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 px-4 py-3 rounded-2xl text-red-600 hover:bg-red-50 transition-colors font-medium"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 overflow-auto bg-slate-50/50">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  )
}

