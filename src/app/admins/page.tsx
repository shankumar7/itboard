import { createClient } from '@/utils/supabase/server'
import { AdminDashboard } from '@/components/admin-dashboard'
import { LoginClient } from './login-client'

export const dynamic = 'force-dynamic'

export default async function AdminsPage() {
  const supabase = await createClient()
  
  // Check auth status
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return <LoginClient />
  }

  // Fetch all applications
  const { data: applications, error } = await supabase
    .from('applications')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    return <div className="p-8 text-destructive text-center font-bold">Error fetching data: {error.message}</div>
  }

  return (
    <div className="space-y-8 p-8 max-w-7xl mx-auto pt-32">
      <h1 className="text-3xl font-bold silver-shadow-text">Applications Dashboard</h1>
      <AdminDashboard initialApplications={applications || []} />
    </div>
  )
}
