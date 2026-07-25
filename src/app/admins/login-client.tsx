'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { Loader2, ShieldCheck, Lock, Mail } from 'lucide-react'

export function LoginClient() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    setIsLoading(false)

    if (error) {
      toast.error(error.message)
    } else {
      toast.success('Logged in successfully')
      router.refresh()
    }
  }

  return (
    <div className="w-full max-w-md px-4 my-auto">
      <div className="glass-card p-8 sm:p-10 w-full text-center relative border-white/10 shadow-2xl">
        <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mx-auto mb-6 shadow-[0_0_30px_rgba(245,197,24,0.15)]">
          <ShieldCheck className="w-7 h-7" />
        </div>
        
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-1">Admin Portal</h1>
        <p className="text-white/40 text-xs uppercase tracking-widest mb-8 font-medium">IT Board CMRCET</p>
        
        <form onSubmit={handleLogin} className="space-y-5 text-left">
          <div className="space-y-2">
            <Label className="text-white/60 text-xs uppercase tracking-wider font-bold">Admin Email</Label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <Input 
                className="premium-input pl-10 h-11 text-sm"
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@itboard.edu"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label className="text-white/60 text-xs uppercase tracking-wider font-bold">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <Input 
                className="premium-input pl-10 h-11 text-sm"
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="btn-primary w-full py-3 flex justify-center items-center gap-2 mt-6 text-sm tracking-wider font-bold"
          >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'SIGN IN'}
          </button>
        </form>
      </div>
    </div>
  )
}
