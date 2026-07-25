'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'

export default function LoginPage() {
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
      router.push('/admins')
      router.refresh()
    }
  }

  return (
    <div className="flex flex-col min-h-screen items-center justify-center p-4">
      <div className="clay-card p-8 bg-white w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-2">Admin Login</h1>
        <p className="text-center text-muted-foreground mb-8">IT Board Recruitment Portal</p>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <Label>Email</Label>
            <Input 
              className="clay-input"
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@itboard.edu"
            />
          </div>
          <div className="space-y-2">
            <Label>Password</Label>
            <Input 
              className="clay-input"
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
            className="clay-btn w-full bg-primary text-primary-foreground py-3 font-semibold flex justify-center items-center gap-2 mt-4 hover:bg-primary/90"
          >
            {isLoading && <Loader2 className="w-5 h-5 animate-spin" />}
            Sign In
          </button>
        </form>
      </div>
    </div>
  )
}
