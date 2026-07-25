'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'

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
    <div className="flex flex-col min-h-screen items-center justify-center p-4 bg-background">
      <div className="bg-white p-8 w-full max-w-md rounded-lg border border-border shadow-sm">
        <h1 className="text-3xl font-bold text-center mb-2 text-primary silver-shadow-text">Admin Login</h1>
        <p className="text-center text-muted-foreground mb-8 text-sm uppercase tracking-widest">IT Board Portal</p>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <Label className="font-bold text-xs uppercase tracking-wider text-muted-foreground">Email</Label>
            <Input 
              className="premium-input"
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@itboard.edu"
            />
          </div>
          <div className="space-y-2">
            <Label className="font-bold text-xs uppercase tracking-wider text-muted-foreground">Password</Label>
            <Input 
              className="premium-input"
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>
          <button 
            type="submit" 
            disabled={isLoading}
            className="premium-btn w-full py-3 flex justify-center items-center gap-2 mt-4"
          >
            {isLoading && <Loader2 className="w-5 h-5 animate-spin" />}
            Sign In
          </button>
        </form>
      </div>
    </div>
  )
}
