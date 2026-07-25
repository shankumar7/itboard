'use client'

import { useState, useMemo } from 'react'
import { createClient } from '@/utils/supabase/client'
import { toast } from 'sonner'
import { 
  Users, UserCheck, Clock, XCircle, Search, Download, 
  ExternalLink, FileText, ChevronRight, UserCircle
} from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet'
import { Textarea } from '@/components/ui/textarea'

// Define the type based on Supabase schema
type Application = {
  id: string
  created_at: string
  name: string
  roll_number: string
  college_email: string
  personal_email: string
  phone: string
  year: string
  branch: string
  cgpa: string
  backlogs: boolean
  backlog_subjects: string | null
  attendance: string
  club: string
  role: string
  github: string | null
  linkedin: string | null
  portfolio: string | null
  resume_url: string
  answers: any
  status: string
  notes: string | null
}

export function AdminDashboard({ initialApplications }: { initialApplications: Application[] }) {
  const [applications, setApplications] = useState<Application[]>(initialApplications)
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState('All')
  const [filterBranch, setFilterBranch] = useState('All')
  const [filterClub, setFilterClub] = useState('All')
  
  const [selectedApp, setSelectedApp] = useState<Application | null>(null)
  const [notes, setNotes] = useState('')
  const [isUpdating, setIsUpdating] = useState(false)
  
  const supabase = createClient()

  // Computed Stats
  const stats = useMemo(() => {
    return {
      total: applications.length,
      pending: applications.filter(a => a.status === 'Pending').length,
      shortlisted: applications.filter(a => a.status === 'Shortlisted').length,
      rejected: applications.filter(a => a.status === 'Rejected').length,
      senior: applications.filter(a => ['Head - AI Minds', 'Vice President - AI Minds', 'PR & Outreach Lead', 'Industry Relations & Sponsorship Lead', 'Technical Strategy Lead'].includes(a.role)).length,
      junior: applications.filter(a => ['Vice President - League of Coders', 'Vice President - Web Development Club', 'Technical Coordinator', 'Events & Operations Coordinator', 'Community Engagement Coordinator', 'Design & Media Coordinator'].includes(a.role)).length,
    }
  }, [applications])

  // Filtered Applications
  const filteredApps = useMemo(() => {
    return applications.filter(app => {
      const matchesSearch = app.name.toLowerCase().includes(search.toLowerCase()) || 
                            app.roll_number.toLowerCase().includes(search.toLowerCase())
      const matchesStatus = filterStatus === 'All' || app.status === filterStatus
      const matchesBranch = filterBranch === 'All' || app.branch === filterBranch
      const matchesClub = filterClub === 'All' || app.club === filterClub
      return matchesSearch && matchesStatus && matchesBranch && matchesClub
    })
  }, [applications, search, filterStatus, filterBranch, filterClub])

  const handleUpdateStatus = async (status: string) => {
    if (!selectedApp) return
    setIsUpdating(true)
    const { error } = await supabase
      .from('applications')
      .update({ status, notes })
      .eq('id', selectedApp.id)
    
    setIsUpdating(false)
    if (error) {
      toast.error(error.message)
    } else {
      toast.success(`Application updated to ${status}`)
      setApplications(prev => prev.map(a => a.id === selectedApp.id ? { ...a, status, notes } : a))
      setSelectedApp({ ...selectedApp, status, notes })
    }
  }

  const handleExportCSV = () => {
    if (filteredApps.length === 0) {
      toast.error("No applications to export")
      return
    }
    
    // Convert to CSV
    const headers = ['Name', 'Roll Number', 'Branch', 'Year', 'Role', 'Club', 'CGPA', 'Status', 'Email', 'Phone']
    const csvContent = [
      headers.join(','),
      ...filteredApps.map(app => 
        [
          `"${app.name}"`, 
          `"${app.roll_number}"`, 
          `"${app.branch}"`, 
          `"${app.year}"`,
          `"${app.role}"`,
          `"${app.club}"`,
          `"${app.cgpa}"`,
          `"${app.status}"`,
          `"${app.college_email}"`,
          `"${app.phone}"`
        ].join(',')
      )
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'it_board_applications.csv')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="space-y-8 pb-10">
      
      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="premium-card bg-white p-4 text-center">
          <Users className="w-8 h-8 mx-auto text-primary mb-2 opacity-80" />
          <div className="text-2xl font-bold">{stats.total}</div>
          <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Total</div>
        </div>
        <div className="premium-card bg-white p-4 text-center">
          <Clock className="w-8 h-8 mx-auto text-yellow-500 mb-2 opacity-80" />
          <div className="text-2xl font-bold">{stats.pending}</div>
          <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Pending</div>
        </div>
        <div className="premium-card bg-white p-4 text-center">
          <UserCheck className="w-8 h-8 mx-auto text-green-500 mb-2 opacity-80" />
          <div className="text-2xl font-bold">{stats.shortlisted}</div>
          <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Shortlisted</div>
        </div>
        <div className="premium-card bg-white p-4 text-center">
          <XCircle className="w-8 h-8 mx-auto text-red-500 mb-2 opacity-80" />
          <div className="text-2xl font-bold">{stats.rejected}</div>
          <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Rejected</div>
        </div>
        <div className="premium-card bg-white p-4 text-center">
          <UserCircle className="w-8 h-8 mx-auto text-accent mb-2 opacity-80" />
          <div className="text-2xl font-bold">{stats.senior}</div>
          <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Senior</div>
        </div>
        <div className="premium-card bg-white p-4 text-center">
          <UserCircle className="w-8 h-8 mx-auto text-muted-foreground mb-2 opacity-80" />
          <div className="text-2xl font-bold">{stats.junior}</div>
          <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Junior</div>
        </div>
      </div>

      {/* Filters & Actions */}
      <div className="premium-card bg-white p-6 flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto flex-1">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              className="premium-input pl-9" 
              placeholder="Search Name or Roll No..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          
          <Select value={filterStatus} onValueChange={(val) => setFilterStatus(val || 'All')}>
            <SelectTrigger className="premium-input w-full md:w-40"><SelectValue placeholder="Status" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Statuses</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Shortlisted">Shortlisted</SelectItem>
              <SelectItem value="Interview Scheduled">Interview Scheduled</SelectItem>
              <SelectItem value="Selected">Selected</SelectItem>
              <SelectItem value="Rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={filterBranch} onValueChange={(val) => setFilterBranch(val || 'All')}>
            <SelectTrigger className="premium-input w-full md:w-40"><SelectValue placeholder="Branch" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Branches</SelectItem>
              <SelectItem value="CSE">CSE</SelectItem>
              <SelectItem value="CSM">CSM</SelectItem>
              <SelectItem value="CSD">CSD</SelectItem>
              <SelectItem value="ECE">ECE</SelectItem>
              <SelectItem value="EEE/MECH/CIVIL">EEE/MECH/CIVIL</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filterClub} onValueChange={(val) => setFilterClub(val || 'All')}>
            <SelectTrigger className="premium-input w-full md:w-48"><SelectValue placeholder="Club" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Clubs</SelectItem>
              <SelectItem value="League of Coders">League of Coders</SelectItem>
              <SelectItem value="Web Development Club">Web Development Club</SelectItem>
              <SelectItem value="AI Minds">AI Minds</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <button 
          onClick={handleExportCSV}
          className="premium-btn bg-accent text-white px-6 py-2.5 flex items-center gap-2 font-medium hover:bg-accent/90 w-full md:w-auto"
        >
          <Download className="w-4 h-4" /> Export CSV
        </button>
      </div>

      {/* Data Table */}
      <div className="premium-card bg-white overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-secondary/20">
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Roll Number</TableHead>
                <TableHead>Branch</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>CGPA</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredApps.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    No applications found matching your criteria.
                  </TableCell>
                </TableRow>
              ) : (
                filteredApps.map((app) => (
                  <TableRow key={app.id} className="hover:bg-secondary/20 transition-colors">
                    <TableCell className="font-medium">{app.name}</TableCell>
                    <TableCell>{app.roll_number}</TableCell>
                    <TableCell>
                      <span className="bg-secondary/50 text-slate-700 px-2 py-1 rounded-md text-xs font-medium">
                        {app.branch}
                      </span>
                    </TableCell>
                    <TableCell className="max-w-[200px] truncate">{app.role}</TableCell>
                    <TableCell>{app.cgpa}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${
                        app.status === 'Pending' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                        app.status === 'Shortlisted' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                        app.status === 'Interview Scheduled' ? 'bg-indigo-50 text-indigo-700 border-indigo-200' :
                        app.status === 'Selected' ? 'bg-green-50 text-green-700 border-green-200' :
                        'bg-red-50 text-red-700 border-red-200'
                      }`}>
                        {app.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <button 
                        onClick={() => { setSelectedApp(app); setNotes(app.notes || ''); }}
                        className="text-primary hover:text-primary/80 font-medium text-sm flex items-center justify-end gap-1 w-full"
                      >
                        View <ChevronRight className="w-4 h-4" />
                      </button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Sheet / Drawer for Details */}
      <Sheet open={!!selectedApp} onOpenChange={(open) => !open && setSelectedApp(null)}>
        <SheetContent className="sm:max-w-xl overflow-y-auto w-[90vw]">
          <SheetHeader className="mb-6">
            <SheetTitle className="text-2xl">{selectedApp?.name}</SheetTitle>
            <SheetDescription>
              {selectedApp?.roll_number} • {selectedApp?.branch} • {selectedApp?.year}
            </SheetDescription>
          </SheetHeader>
          
          {selectedApp && (
            <div className="space-y-8 pb-20">
              
              {/* Actions & Status */}
              <div className="bg-secondary/30 p-4 rounded-xl border border-border/50 space-y-4">
                <h4 className="font-semibold flex items-center gap-2"><UserCheck className="w-4 h-4" /> Admin Actions</h4>
                <div className="flex flex-wrap gap-2">
                  <button 
                    disabled={isUpdating}
                    onClick={() => handleUpdateStatus('Shortlisted')}
                    className="bg-blue-100 text-blue-700 hover:bg-blue-200 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
                  >Shortlist</button>
                  <button 
                    disabled={isUpdating}
                    onClick={() => handleUpdateStatus('Interview Scheduled')}
                    className="bg-indigo-100 text-indigo-700 hover:bg-indigo-200 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
                  >Interview</button>
                  <button 
                    disabled={isUpdating}
                    onClick={() => handleUpdateStatus('Selected')}
                    className="bg-green-100 text-green-700 hover:bg-green-200 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
                  >Select</button>
                  <button 
                    disabled={isUpdating}
                    onClick={() => handleUpdateStatus('Rejected')}
                    className="bg-red-100 text-red-700 hover:bg-red-200 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
                  >Reject</button>
                  <button 
                    disabled={isUpdating}
                    onClick={() => handleUpdateStatus('Pending')}
                    className="bg-yellow-100 text-yellow-700 hover:bg-yellow-200 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
                  >Pending</button>
                </div>
                
                <div className="space-y-2 mt-4 pt-4 border-t border-border/50">
                  <label className="text-sm font-medium">Admin Notes</label>
                  <Textarea 
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Add private notes about this candidate..."
                    className="bg-white"
                  />
                  <button 
                    disabled={isUpdating}
                    onClick={() => handleUpdateStatus(selectedApp.status)}
                    className="premium-btn bg-secondary text-slate-800 px-4 py-2 text-sm font-medium hover:bg-slate-300 w-full"
                  >
                    Save Notes
                  </button>
                </div>
              </div>

              {/* Core Details */}
              <div className="grid grid-cols-2 gap-y-4 gap-x-6 text-sm">
                <div>
                  <div className="text-muted-foreground mb-1">Email</div>
                  <div className="font-medium truncate" title={selectedApp.college_email}>{selectedApp.college_email}</div>
                  <div className="font-medium truncate" title={selectedApp.personal_email}>{selectedApp.personal_email}</div>
                </div>
                <div>
                  <div className="text-muted-foreground mb-1">Phone</div>
                  <div className="font-medium">{selectedApp.phone}</div>
                </div>
                <div>
                  <div className="text-muted-foreground mb-1">Club & Role</div>
                  <div className="font-medium">{selectedApp.club}</div>
                  <div className="font-medium text-primary">{selectedApp.role}</div>
                </div>
                <div>
                  <div className="text-muted-foreground mb-1">Academics</div>
                  <div className="font-medium">CGPA: {selectedApp.cgpa}</div>
                  <div className="font-medium">Attendance: {selectedApp.attendance}</div>
                  <div className="font-medium text-red-600">
                    {selectedApp.backlogs ? `Backlogs: ${selectedApp.backlog_subjects}` : 'No Backlogs'}
                  </div>
                </div>
              </div>

              {/* Links */}
              <div className="flex flex-wrap gap-4 pt-4 border-t border-border/50">
                <a href={selectedApp.resume_url} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg hover:bg-blue-100">
                  <FileText className="w-4 h-4" /> View Resume
                </a>
                {selectedApp.github && (
                  <a href={selectedApp.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm font-medium text-slate-700 bg-secondary/50 px-3 py-1.5 rounded-lg hover:bg-secondary">
                    <ExternalLink className="w-4 h-4" /> GitHub
                  </a>
                )}
                {selectedApp.linkedin && (
                  <a href={selectedApp.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm font-medium text-blue-700 bg-blue-50 px-3 py-1.5 rounded-lg hover:bg-blue-100">
                    <ExternalLink className="w-4 h-4" /> LinkedIn
                  </a>
                )}
                {selectedApp.portfolio && (
                  <a href={selectedApp.portfolio} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm font-medium text-indigo-700 bg-indigo-50 px-3 py-1.5 rounded-lg hover:bg-indigo-100">
                    <ExternalLink className="w-4 h-4" /> Portfolio
                  </a>
                )}
              </div>

              {/* Answers */}
              <div className="space-y-6 pt-4 border-t border-border/50">
                <h4 className="font-semibold text-lg">Application Answers</h4>
                
                <div className="space-y-4">
                  <div>
                    <div className="text-sm font-medium text-primary mb-1">Skills</div>
                    <div className="flex flex-wrap gap-2">
                      {selectedApp.answers?.skills?.map((skill: string) => (
                        <span key={skill} className="bg-secondary/50 px-2 py-1 rounded-md text-xs font-medium text-slate-700">{skill}</span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-sm font-medium text-primary mb-1">Hours per week</div>
                    <div className="text-sm">{selectedApp.answers?.hours_per_week}</div>
                  </div>
                  
                  {Object.entries(selectedApp.answers || {}).map(([key, value]) => {
                    if (['skills', 'hours_per_week'].includes(key) || !value) return null;
                    const label = key.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
                    return (
                      <div key={key} className="bg-secondary/30 p-4 rounded-xl">
                        <div className="text-sm font-medium text-primary mb-2">{label}</div>
                        <div className="text-sm whitespace-pre-wrap leading-relaxed">{value as string}</div>
                      </div>
                    )
                  })}
                </div>
              </div>
              
            </div>
          )}
        </SheetContent>
      </Sheet>

    </div>
  )
}
