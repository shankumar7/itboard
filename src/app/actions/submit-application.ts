'use server'

import { createClient } from '@supabase/supabase-js'
import { sendConfirmationEmail } from '@/utils/send-email'

export async function submitApplicationAction(data: {
  name: string
  roll_number: string
  college_email: string
  phone: string
  year: string
  branch: string
  cgpa: string
  backlogs: boolean
  backlog_subjects?: string | null
  attendance: string
  club: string
  role: string
  github?: string | null
  linkedin?: string | null
  portfolio?: string | null
  answers: any
}) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    
    const adminSupabase = createClient(supabaseUrl, serviceRoleKey)

    const { error } = await adminSupabase.from('applications').insert({
      name: data.name,
      roll_number: data.roll_number,
      college_email: data.college_email,
      personal_email: data.college_email,
      phone: data.phone,
      year: data.year,
      branch: data.branch,
      cgpa: data.cgpa,
      backlogs: data.backlogs,
      backlog_subjects: data.backlog_subjects || null,
      attendance: data.attendance,
      club: data.club,
      role: data.role,
      github: data.github || null,
      linkedin: data.linkedin || null,
      portfolio: data.portfolio || null,
      resume_url: 'NA',
      answers: data.answers || {},
      status: 'Pending'
    })

    if (error) {
      console.error('Supabase application submit error:', error)
      return { success: false, error: error.message }
    }

    // Trigger confirmation email (awaited so Vercel serverless function completes transmission)
    try {
      await sendConfirmationEmail({
        name: data.name,
        roll_number: data.roll_number,
        college_email: data.college_email,
        role: data.role,
        club: data.club,
      })
    } catch (emailErr) {
      console.error('Confirmation email delivery error:', emailErr)
    }

    return { success: true }
  } catch (err: any) {
    console.error('Server action submission error:', err)
    return { success: false, error: err.message || 'Failed to submit application' }
  }
}
