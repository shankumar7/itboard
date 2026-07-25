'use client'

import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { createClient } from '@/utils/supabase/client'
import { toast } from 'sonner'
import { Loader2, UploadCloud } from 'lucide-react'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Card, CardContent } from '@/components/ui/card'

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_FILE_TYPES = ['application/pdf'];

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  roll_number: z.string().min(5, 'Invalid roll number'),
  college_email: z.string().email('Invalid email'),
  personal_email: z.string().email('Invalid email'),
  phone: z.string().min(10, 'Invalid phone number'),
  year: z.enum(['Second Year', 'Third Year']),
  branch: z.string().min(1, 'Branch is required'),
  cgpa: z.string().min(1, 'CGPA is required'),
  backlogs: z.enum(['Yes', 'No']),
  backlog_subjects: z.string().optional(),
  attendance: z.string().min(1, 'Attendance is required'),
  club: z.enum(['League of Coders', 'Web Development Club', 'AI Minds']),
  role: z.string().min(1, 'Role is required'),
  
  // URLs
  github: z.string().url('Invalid URL').optional().or(z.literal('')),
  linkedin: z.string().url('Invalid URL').optional().or(z.literal('')),
  portfolio: z.string().url('Invalid URL').optional().or(z.literal('')),
  
  // General Answers
  leadership_experience: z.string().min(10, 'Please provide more details'),
  hackathons: z.string().optional(),
  projects: z.string().optional(),
  why_join: z.string().min(10, 'Please provide more details'),
  why_choose_you: z.string().min(10, 'Please provide more details'),
  hours_per_week: z.enum(['2-4', '5-8', '8-12', '12+']),
  skills: z.array(z.string()).min(1, 'Select at least one skill'),
  
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
  'Head - AI Minds',
  'Vice President - AI Minds',
  'PR & Outreach Lead',
  'Industry Relations & Sponsorship Lead',
  'Technical Strategy Lead'
];

const JUNIOR_ROLES = [
  'Vice President - League of Coders',
  'Vice President - Web Development Club',
  'Technical Coordinator',
  'Events & Operations Coordinator',
  'Community Engagement Coordinator',
  'Design & Media Coordinator'
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
    defaultValues: {
      skills: [],
      backlogs: 'No'
    }
  })

  const watchRole = watch('role')
  const watchBacklogs = watch('backlogs')
  const watchBranch = watch('branch')

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
    if (!resumeFile) {
      toast.error("Please upload your resume")
      return
    }

    setIsSubmitting(true)
    try {
      // 1. Upload Resume
      const fileExt = resumeFile.name.split('.').pop()
      const fileName = `${data.roll_number}-${Date.now()}.${fileExt}`
      
      const { data: uploadData, error: uploadError } = await supabase
        .storage
        .from('resumes')
        .upload(fileName, resumeFile, { upsert: true })

      if (uploadError) throw new Error("Resume upload failed: " + uploadError.message)

      // Get public URL
      const { data: urlData } = supabase.storage.from('resumes').getPublicUrl(fileName)
      
      // 2. Prepare JSON answers
      const answers = {
        leadership_experience: data.leadership_experience,
        hackathons: data.hackathons,
        projects: data.projects,
        why_join: data.why_join,
        why_choose_you: data.why_choose_you,
        hours_per_week: data.hours_per_week,
        skills: data.skills,
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

      // 3. Save to Database
      const { error: dbError } = await supabase.from('applications').insert({
        name: data.name,
        roll_number: data.roll_number,
        college_email: data.college_email,
        personal_email: data.personal_email,
        phone: data.phone,
        year: data.year,
        branch: data.branch,
        cgpa: data.cgpa,
        backlogs: data.backlogs === 'Yes',
        backlog_subjects: data.backlog_subjects,
        attendance: data.attendance,
        club: data.club,
        role: data.role,
        github: data.github,
        linkedin: data.linkedin,
        portfolio: data.portfolio,
        resume_url: urlData.publicUrl,
        answers: answers
      })

      if (dbError) throw new Error("Application save failed: " + dbError.message)

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
      <div className="text-center py-16">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-3xl font-bold mb-4">Application Submitted Successfully</h2>
        <p className="text-lg text-muted-foreground">
          Thank you for applying. We'll contact shortlisted candidates for interviews.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
      
      {/* Section 1: Personal Info */}
      <div className="space-y-6">
        <h3 className="text-2xl font-bold border-b pb-2">Personal Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            <Label>Personal Email *</Label>
            <Input className="premium-input" type="email" {...register('personal_email')} placeholder="personal@gmail.com" />
            {errors.personal_email && <p className="text-sm text-destructive">{errors.personal_email.message}</p>}
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    <optgroup label="Senior Positions">
                      {SENIOR_ROLES.map(role => (
                        <SelectItem key={role} value={role}>{role}</SelectItem>
                      ))}
                    </optgroup>
                    <optgroup label="Junior Positions">
                      {JUNIOR_ROLES.map(role => (
                        <SelectItem key={role} value={role}>{role}</SelectItem>
                      ))}
                    </optgroup>
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
            <Label>Club Preference *</Label>
            <Controller
              name="club"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="premium-input"><SelectValue placeholder="Select Club" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="League of Coders">League of Coders</SelectItem>
                    <SelectItem value="Web Development Club">Web Development Club</SelectItem>
                    <SelectItem value="AI Minds">AI Minds</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.club && <p className="text-sm text-destructive">{errors.club.message}</p>}
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
            <Label>Describe one leadership experience *</Label>
            <Textarea className="premium-input min-h-[100px]" {...register('leadership_experience')} />
            {errors.leadership_experience && <p className="text-sm text-destructive">{errors.leadership_experience.message}</p>}
          </div>

          <div className="space-y-2">
            <Label>Hackathons (If any)</Label>
            <Textarea className="premium-input" {...register('hackathons')} placeholder="List hackathons participated in or won" />
          </div>

          <div className="space-y-2">
            <Label>Projects</Label>
            <Textarea className="premium-input" {...register('projects')} placeholder="Briefly describe 1-2 major projects" />
          </div>

          <div className="space-y-2">
            <Label>How many hours per week can you contribute? *</Label>
            <Controller
              name="hours_per_week"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="premium-input w-full md:w-1/3"><SelectValue placeholder="Select Hours" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2-4">2-4 Hours</SelectItem>
                    <SelectItem value="5-8">5-8 Hours</SelectItem>
                    <SelectItem value="8-12">8-12 Hours</SelectItem>
                    <SelectItem value="12+">12+ Hours</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.hours_per_week && <p className="text-sm text-destructive">{errors.hours_per_week.message}</p>}
          </div>

          <div className="space-y-4">
            <Label>Skills *</Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {SKILLS.map((skill) => (
                <div key={skill} className="flex items-center space-x-2">
                  <Controller
                    name="skills"
                    control={control}
                    render={({ field }) => (
                      <Checkbox
                        id={`skill-${skill}`}
                        checked={field.value?.includes(skill)}
                        onCheckedChange={(checked) => {
                          const current = field.value || []
                          const updated = checked
                            ? [...current, skill]
                            : current.filter((val) => val !== skill)
                          field.onChange(updated)
                        }}
                      />
                    )}
                  />
                  <Label htmlFor={`skill-${skill}`} className="font-normal cursor-pointer text-sm">
                    {skill}
                  </Label>
                </div>
              ))}
            </div>
            {errors.skills && <p className="text-sm text-destructive">{errors.skills.message}</p>}
          </div>
        </div>
      </div>

      {/* Section 5: Role Specific Questions */}
      {watchRole && (
        <div className="space-y-6">
          <h3 className="text-2xl font-bold border-b pb-2 text-primary">Role Specific Questions</h3>
          <div className="space-y-6 p-6 bg-blue-50/50 rounded-2xl border border-blue-100">
            
            {(watchRole.includes('Head') || watchRole.includes('Vice President')) && (
              <>
                <div className="space-y-2">
                  <Label>Vision for the club</Label>
                  <Textarea className="premium-input" {...register('vision')} />
                </div>
                <div className="space-y-2">
                  <Label>Future initiatives</Label>
                  <Textarea className="premium-input" {...register('future_initiatives')} />
                </div>
                <div className="space-y-2">
                  <Label>Conflict handling</Label>
                  <Textarea className="premium-input" {...register('conflict_handling')} />
                </div>
                <div className="space-y-2">
                  <Label>Leadership style</Label>
                  <Textarea className="premium-input" {...register('leadership_style')} />
                </div>
              </>
            )}

            {watchRole === 'PR & Outreach Lead' && (
              <>
                <div className="space-y-2">
                  <Label>Write a sample LinkedIn announcement</Label>
                  <Textarea className="premium-input" {...register('linkedin_announcement')} />
                </div>
                <div className="space-y-2">
                  <Label>How will you improve outreach?</Label>
                  <Textarea className="premium-input" {...register('improve_outreach')} />
                </div>
              </>
            )}

            {watchRole === 'Technical Strategy Lead' && (
              <div className="space-y-2">
                <Label>How would you improve the technical quality of club activities?</Label>
                <Textarea className="premium-input" {...register('improve_technical_quality')} />
              </div>
            )}

            {watchRole === 'Technical Coordinator' && (
              <>
                <div className="space-y-2">
                  <Label>Describe one technical project</Label>
                  <Textarea className="premium-input" {...register('tech_project')} />
                </div>
                <div className="space-y-2">
                  <Label>GitHub experience</Label>
                  <Textarea className="premium-input" {...register('github_experience')} />
                </div>
              </>
            )}

            {watchRole === 'Events & Operations Coordinator' && (
              <div className="space-y-2">
                <Label>Plan a technical workshop (Outline the steps)</Label>
                <Textarea className="premium-input min-h-[150px]" {...register('plan_workshop')} />
              </div>
            )}

            {watchRole === 'Community Engagement Coordinator' && (
              <div className="space-y-2">
                <Label>How will you increase participation?</Label>
                <Textarea className="premium-input" {...register('increase_participation')} />
              </div>
            )}

            {watchRole === 'Design & Media Coordinator' && (
              <>
                <div className="space-y-2">
                  <Label>Portfolio Description</Label>
                  <Textarea className="premium-input" {...register('design_portfolio')} />
                </div>
                <div className="space-y-2">
                  <Label>Design tools you are proficient in</Label>
                  <Input className="premium-input" {...register('design_tools')} placeholder="Figma, Photoshop, etc." />
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Section 6: Resume Upload */}
      <div className="space-y-6">
        <h3 className="text-2xl font-bold border-b pb-2">Resume Upload</h3>
        <Card className="premium-card border-dashed border-2 border-primary/30">
          <CardContent className="pt-6 pb-8 text-center flex flex-col items-center">
            <UploadCloud className="w-12 h-12 text-primary mb-4" />
            <Label htmlFor="resume-upload" className="text-lg font-medium cursor-pointer text-primary hover:underline">
              Click to select PDF
            </Label>
            <Input 
              id="resume-upload" 
              type="file" 
              accept=".pdf" 
              className="hidden" 
              onChange={handleFileChange} 
            />
            <p className="text-sm text-muted-foreground mt-2">Maximum 5MB. PDF only.</p>
            {resumeFile && (
              <p className="mt-4 text-sm font-medium text-green-600 bg-green-50 px-3 py-1 rounded-md">
                Selected: {resumeFile.name}
              </p>
            )}
          </CardContent>
        </Card>
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
