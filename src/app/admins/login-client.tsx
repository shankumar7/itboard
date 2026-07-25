'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { Loader2, ShieldCheck, Lock, KeyRound } from 'lucide-react'

export function LoginClient() {
  const [pin, setPin] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Check PIN (Default admin PIN: 7147 or 1234)
    if (pin.trim() !== '7147' && pin.trim() !== '1234') {
      setIsLoading(false)
      toast.error('Incorrect Security PIN')
      setPin('')
      return
    }

    // Authenticate into Supabase with admin credentials
    const { error } = await supabase.auth.signInWithPassword({
      email: 'admin@itboard.edu',
      password: 'AdminPassword123!',
    })

    setIsLoading(false)

    if (error) {
      toast.error('Authentication failed: ' + error.message)
    } else {
      toast.success('Access Granted')
      router.refresh()
    }
  }

  return (
    <div className="w-full max-w-sm px-4 my-auto">
      <div className="glass-card p-8 sm:p-10 w-full text-center relative border-white/10 shadow-2xl">
        <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mx-auto mb-6 shadow-[0_0_30px_rgba(245,197,24,0.15)]">
          <KeyRound className="w-7 h-7" />
        </div>
        
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-1">Admin Access</h1>
        <p className="text-white/40 text-xs uppercase tracking-widest mb-8 font-medium">Enter Security PIN</p>
        
        <form onSubmit={handleLogin} className="space-y-6 text-left">
          <div className="space-y-2">
            <Label className="text-white/60 text-xs uppercase tracking-wider font-bold text-center block">Security PIN</Label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <Input 
                className="premium-input pl-10 h-12 text-center font-mono text-xl tracking-[0.4em] placeholder:tracking-normal placeholder:font-sans placeholder:text-sm"
                type="password" 
                maxLength={6}
                required
                autoFocus
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="Enter PIN"
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isLoading || !pin}
            className="btn-primary w-full py-3.5 flex justify-center items-center gap-2 text-xs tracking-widest font-bold"
          >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'UNLOCK DASHBOARD'}
          </button>
        </form>
      </div>
    </div>
  )
}
