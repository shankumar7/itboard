'use client'

import { submitApplicationAction } from '@/app/actions/submit-application'

import { useState, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { createClient } from '@/utils/supabase/client'
import { toast } from 'sonner'
import { Loader2, UploadCloud } from 'lucide-react'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup, SelectLabel, SelectSeparator } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Card, CardContent } from '@/components/ui/card'

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_FILE_TYPES = ['application/pdf'];

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  roll_number: z.string().min(5, 'Invalid roll number'),
  college_email: z.string().email('Invalid email'),
  phone: z.string().min(10, 'Invalid phone number'),
  year: z.enum(['Second Year', 'Third Year']),
  branch: z.string().min(1, 'Branch is required'),
  cgpa: z.string().min(1, 'CGPA is required'),
  backlogs: z.enum(['Yes', 'No']),
  backlog_subjects: z.string().optional(),
  attendance: z.string().min(1, 'Attendance is required'),
  club: z.string().optional(),
  role: z.string().min(1, 'Role is required'),
  
  // URLs
  github: z.string().url('Invalid URL').optional().or(z.literal('')),
  linkedin: z.string().url('Invalid URL').optional().or(z.literal('')),
  portfolio: z.string().url('Invalid URL').optional().or(z.literal('')),
  
  // General Answers
  hackathons: z.string().optional(),
  why_join: z.string().min(10, 'Please provide more details'),
  why_choose_you: z.string().min(10, 'Please provide more details'),
  
  // Role specific (all optional, but we can validate conditionally)
  vision: z.string().optional(),
  future_initiatives: z.string().optional(),
  conflict_handling: z.string().optional(),
  leadership_style: z.string().optional(),
  linkedin_announcement: z.string().optional(),
  improve_outreach: z.string().optional(),
  improve_technical_quality: z.string().optional(),
  tech_project: z.string().optional(),
  github_experience: z.string().optional(),
  plan_workshop: z.string().optional(),
  increase_participation: z.string().optional(),
  design_portfolio: z.string().optional(),
  design_tools: z.string().optional(),
}).refine((data) => {
  if (data.backlogs === 'Yes' && (!data.backlog_subjects || data.backlog_subjects.trim() === '')) {
    return false;
  }
  return true;
}, {
  message: "Backlog subjects are required if you have backlogs",
  path: ["backlog_subjects"],
});

type FormValues = z.infer<typeof formSchema>;

const SENIOR_ROLES = [
  'Head – AI Minds',
  'Vice President – AI Minds',
  'PR & Outreach Lead',
  'Industry Relations & Sponsorship Lead',
  'Design & Media Coordinator'
];

const JUNIOR_ROLES = [
  'Vice President – League of Coders',
  'Vice President – Web Development Club',
  'Technical Coordinator',
  'Events & Operations Coordinator',
  'Community Engagement Coordinator',
  'Technical Strategy Lead'
];

const FILLED_ROLES = [
  'Advisor',
  'General Secretary',
  'Head – League of Coders',
  'Head – Web Development Club'
];

const ALL_BRANCHES = ['CSE', 'CSM', 'CSD', 'ECE', 'EEE/MECH/CIVIL'];
const SKILLS = [
  'Leadership', 'Programming', 'Web Development', 'AI/ML', 
  'Public Speaking', 'Event Management', 'Graphic Design', 
  'Video Editing', 'Communication', 'Problem Solving', 
  'Team Management', 'Social Media'
];

export function ApplicationForm() {
  const supabase = createClient()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const { register, handleSubmit, watch, control, formState: { errors }, setValue } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: 'onSubmit',
    defaultValues: {
      name: '',
      roll_number: '',
      college_email: '',
      phone: '',
      cgpa: '',
      attendance: '',
      backlogs: 'No',
      backlog_subjects: '',
      github: '',
      linkedin: '',
      portfolio: '',
      club: 'Central Board',
      hackathons: '',
      why_join: '',
      why_choose_you: '',
    }
  })

  const watchRole = watch('role')
  const watchBacklogs = watch('backlogs')
  const watchBranch = watch('branch')
  const watchRollNumber = watch('roll_number')

  useEffect(() => {
    if (watchRollNumber) {
      const cleanRoll = watchRollNumber.trim().toLowerCase()
      setValue('college_email', `${cleanRoll}@cmrcet.ac.in`)
    }
  }, [watchRollNumber, setValue])

  const isSeniorRole = SENIOR_ROLES.includes(watchRole)
  const availableBranches = isSeniorRole ? ALL_BRANCHES.filter(b => b !== 'CSE') : ALL_BRANCHES

  // Update branch if it becomes invalid due to role change
  if (isSeniorRole && watchBranch === 'CSE') {
    setValue('branch', '')
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        toast.error("File size must be less than 5MB")
        setResumeFile(null)
        e.target.value = ''
        return
      }
      if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
        toast.error("Only PDF files are allowed")
        setResumeFile(null)
        e.target.value = ''
        return
      }
      setResumeFile(file)
    }
  }

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true)
    try {
      // Prepare JSON answers
      const answers = {
        hackathons: data.hackathons,
        why_join: data.why_join,
        why_choose_you: data.why_choose_you,
        // Optional role specific
        vision: data.vision,
        future_initiatives: data.future_initiatives,
        conflict_handling: data.conflict_handling,
        leadership_style: data.leadership_style,
        linkedin_announcement: data.linkedin_announcement,
        improve_outreach: data.improve_outreach,
        improve_technical_quality: data.improve_technical_quality,
        tech_project: data.tech_project,
        github_experience: data.github_experience,
        plan_workshop: data.plan_workshop,
        increase_participation: data.increase_participation,
        design_portfolio: data.design_portfolio,
        design_tools: data.design_tools
      }

      // Save via server action (bypasses RLS policy restriction securely)
      const res = await submitApplicationAction({
        name: data.name,
        roll_number: data.roll_number,
        college_email: data.college_email,
        phone: data.phone,
        year: data.year,
        branch: data.branch,
        cgpa: data.cgpa,
        backlogs: data.backlogs === 'Yes',
        backlog_subjects: data.backlog_subjects,
        attendance: data.attendance,
        club: data.club || 'Central Board',
        role: data.role,
        github: data.github,
        linkedin: data.linkedin,
        portfolio: data.portfolio,
        answers: answers
      })

      if (!res.success) throw new Error(res.error || "Application save failed")

      setIsSubmitted(true)
      toast.success("Application submitted successfully!")
    } catch (err: any) {
      toast.error(err.message || "Something went wrong")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="text-center py-12 px-4 space-y-6">
        <div className="w-20 h-20 bg-green-500/20 text-green-400 border border-green-500/30 rounded-full flex items-center justify-center mx-auto">
          <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div>
          <h2 className="text-2xl sm:text-3xl font-black mb-2 text-white">Application Submitted! 🎉</h2>
          <p className="text-sm text-white/50 max-w-md mx-auto">
            Thank you for applying to the IT Board CMRCET. A confirmation email has been dispatched to your inbox.
          </p>
        </div>

        {/* Mandatory Instagram Step */}
        <div className="glass-card p-6 border-amber-500/30 bg-amber-500/[0.05] rounded-2xl max-w-md mx-auto text-left space-y-3">
          <p className="text-primary font-extrabold text-xs uppercase tracking-widest">
            ⚠️ Mandatory Final Step
          </p>
          <p className="text-white/80 text-xs sm:text-sm leading-relaxed">
            Ensure you are following both official Instagram handles to receive interview updates:
          </p>
          <div className="flex flex-col gap-2 pt-1">
            <a 
              href="https://www.instagram.com/itboard_cmrcet/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-black font-extrabold text-xs hover:opacity-90 transition-opacity"
            >
              📸 Follow @itboard_cmrcet ↗
            </a>
            <a 
              href="https://www.instagram.com/student_council_cmrcet/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/10 transition-colors"
            >
              📸 Follow @student_council_cmrcet ↗
            </a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
      
      {/* Instagram Requirement Banner */}
      <div className="glass-card p-5 border-amber-500/30 bg-amber-500/[0.05] rounded-2xl space-y-3">
        <p className="text-primary font-extrabold text-xs uppercase tracking-widest">
          ⚠️ Mandatory Action for Applicants
        </p>
        <p className="text-white/80 text-xs sm:text-sm leading-relaxed">
          It is mandatory for all applicants to follow both official Instagram pages to stay updated on shortlists & interview schedules:
        </p>
        <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
          <a 
            href="https://www.instagram.com/itboard_cmrcet/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-primary text-black font-extrabold text-xs hover:opacity-90 transition-opacity"
          >
            📸 Follow @itboard_cmrcet ↗
          </a>
          <a 
            href="https://www.instagram.com/student_council_cmrcet/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/10 transition-colors"
          >
            📸 Follow @student_council_cmrcet ↗
          </a>
        </div>
      </div>
      
      {/* Section 1: Personal Info */}
      <div className="space-y-6">
        <h3 className="text-2xl font-bold border-b pb-2">Personal Information</h3>
        <div className="space-y-6">
          <div className="space-y-2">
            <Label>Full Name *</Label>
            <Input className="premium-input" {...register('name')} placeholder="John Doe" />
            {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
          </div>
          <div className="space-y-2">
            <Label>Roll Number *</Label>
            <Input className="premium-input" {...register('roll_number')} placeholder="22BQ1A..." />
            {errors.roll_number && <p className="text-sm text-destructive">{errors.roll_number.message}</p>}
          </div>
          <div className="space-y-2">
            <Label>College Email *</Label>
            <Input className="premium-input" type="email" {...register('college_email')} placeholder="student@college.edu" />
            {errors.college_email && <p className="text-sm text-destructive">{errors.college_email.message}</p>}
          </div>
          <div className="space-y-2">
            <Label>Phone Number *</Label>
            <Input className="premium-input" {...register('phone')} placeholder="9876543210" />
            {errors.phone && <p className="text-sm text-destructive">{errors.phone.message}</p>}
          </div>
        </div>
      </div>

      {/* Section 2: Academic Info */}
      <div className="space-y-6">
        <h3 className="text-2xl font-bold border-b pb-2">Academic Information</h3>
        <div className="space-y-6">
          <div className="space-y-2">
            <Label>Year *</Label>
            <Controller
              name="year"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="premium-input"><SelectValue placeholder="Select Year" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Second Year">Second Year</SelectItem>
                    <SelectItem value="Third Year">Third Year</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.year && <p className="text-sm text-destructive">{errors.year.message}</p>}
          </div>

          <div className="space-y-2">
            <Label>Role Applying For *</Label>
            <Controller
              name="role"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="premium-input"><SelectValue placeholder="Select Role" /></SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Senior Positions (Open)</SelectLabel>
                      {SENIOR_ROLES.map(role => (
                        <SelectItem key={role} value={role}>{role}</SelectItem>
                      ))}
                    </SelectGroup>
                    <SelectSeparator />
                    <SelectGroup>
                      <SelectLabel>Junior Positions (Open)</SelectLabel>
                      {JUNIOR_ROLES.map(role => (
                        <SelectItem key={role} value={role}>{role}</SelectItem>
                      ))}
                    </SelectGroup>
                    <SelectSeparator />
                    <SelectGroup>
                      <SelectLabel>Filled Positions</SelectLabel>
                      {FILLED_ROLES.map(role => (
                        <SelectItem key={role} value={role} disabled>{role} (Filled)</SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.role && <p className="text-sm text-destructive">{errors.role.message}</p>}
          </div>

          <div className="space-y-2">
            <Label>Branch *</Label>
            <Controller
              name="branch"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="premium-input"><SelectValue placeholder="Select Branch" /></SelectTrigger>
                  <SelectContent>
                    {availableBranches.map(b => (
                      <SelectItem key={b} value={b}>{b}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {isSeniorRole && (
              <p className="text-xs text-orange-600 font-medium bg-orange-50 p-2 rounded-md">
                Senior positions are no longer available for CSE students.
              </p>
            )}
            {errors.branch && <p className="text-sm text-destructive">{errors.branch.message}</p>}
          </div>



          <div className="space-y-2">
            <Label>Do you currently have backlogs? *</Label>
            <Controller
              name="backlogs"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="premium-input"><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Yes">Yes</SelectItem>
                    <SelectItem value="No">No</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          <div className="space-y-2">
            <Label>Current CGPA * {watchBacklogs === 'Yes' && '(Enter NA if applicable)'}</Label>
            <Input className="premium-input" {...register('cgpa')} placeholder="e.g. 8.5 or NA" />
            {errors.cgpa && <p className="text-sm text-destructive">{errors.cgpa.message}</p>}
          </div>

          <div className="space-y-2">
            <Label>Average Attendance *</Label>
            <Input className="premium-input" {...register('attendance')} placeholder="e.g. 87%" />
            {errors.attendance && <p className="text-sm text-destructive">{errors.attendance.message}</p>}
          </div>
        </div>

        {watchBacklogs === 'Yes' && (
          <div className="space-y-2 mt-4">
            <Label>Mention Backlog Subjects *</Label>
            <Textarea className="premium-input" {...register('backlog_subjects')} placeholder="List your backlog subjects" />
            {errors.backlog_subjects && <p className="text-sm text-destructive">{errors.backlog_subjects.message}</p>}
          </div>
        )}
      </div>

      {/* Section 3: Links */}
      <div className="space-y-6">
        <h3 className="text-2xl font-bold border-b pb-2">Profiles & Links</h3>
        <div className="space-y-6">
          <div className="space-y-2">
            <Label>GitHub URL</Label>
            <Input className="premium-input" {...register('github')} placeholder="https://github.com/..." />
            {errors.github && <p className="text-sm text-destructive">{errors.github.message}</p>}
          </div>
          <div className="space-y-2">
            <Label>LinkedIn URL</Label>
            <Input className="premium-input" {...register('linkedin')} placeholder="https://linkedin.com/in/..." />
            {errors.linkedin && <p className="text-sm text-destructive">{errors.linkedin.message}</p>}
          </div>
          <div className="space-y-2">
            <Label>Portfolio URL</Label>
            <Input className="premium-input" {...register('portfolio')} placeholder="https://..." />
            {errors.portfolio && <p className="text-sm text-destructive">{errors.portfolio.message}</p>}
          </div>
        </div>
      </div>

      {/* Section 4: General Questions */}
      <div className="space-y-6">
        <h3 className="text-2xl font-bold border-b pb-2">General Questions</h3>
        <div className="space-y-6">
          <div className="space-y-2">
            <Label>Why do you want to join the IT Board? *</Label>
            <Textarea className="premium-input min-h-[100px]" {...register('why_join')} />
            {errors.why_join && <p className="text-sm text-destructive">{errors.why_join.message}</p>}
          </div>
          
          <div className="space-y-2">
            <Label>Why should we choose you? *</Label>
            <Textarea className="premium-input min-h-[100px]" {...register('why_choose_you')} />
            {errors.why_choose_you && <p className="text-sm text-destructive">{errors.why_choose_you.message}</p>}
          </div>

          <div className="space-y-2">
            <Label>Hackathons (If any)</Label>
            <Textarea className="premium-input" {...register('hackathons')} placeholder="List hackathons participated in or won" />
          </div>
        </div>
      </div>





      <button
        type="submit"
        disabled={isSubmitting}
        className="premium-btn w-full py-4 text-lg font-bold bg-primary text-white flex items-center justify-center gap-2 hover:bg-primary/90 disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-6 h-6 animate-spin" />
            Submitting...
          </>
        ) : (
          'Submit Application'
        )}
      </button>

    </form>
  )
}
