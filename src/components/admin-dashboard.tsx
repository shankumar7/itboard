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
    <div className="space-y-8 pb-10 text-white">
      
      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="glass-card p-5 text-center border-white/10">
          <Users className="w-7 h-7 mx-auto text-primary mb-2 opacity-90" />
          <div className="text-3xl font-black text-white">{stats.total}</div>
          <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest mt-1">Total</div>
        </div>
        <div className="glass-card p-5 text-center border-white/10">
          <Clock className="w-7 h-7 mx-auto text-amber-400 mb-2 opacity-90" />
          <div className="text-3xl font-black text-amber-400">{stats.pending}</div>
          <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest mt-1">Pending</div>
        </div>
        <div className="glass-card p-5 text-center border-white/10">
          <UserCheck className="w-7 h-7 mx-auto text-emerald-400 mb-2 opacity-90" />
          <div className="text-3xl font-black text-emerald-400">{stats.shortlisted}</div>
          <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest mt-1">Shortlisted</div>
        </div>
        <div className="glass-card p-5 text-center border-white/10">
          <XCircle className="w-7 h-7 mx-auto text-rose-400 mb-2 opacity-90" />
          <div className="text-3xl font-black text-rose-400">{stats.rejected}</div>
          <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest mt-1">Rejected</div>
        </div>
        <div className="glass-card p-5 text-center border-white/10">
          <UserCircle className="w-7 h-7 mx-auto text-primary mb-2 opacity-90" />
          <div className="text-3xl font-black text-white">{stats.senior}</div>
          <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest mt-1">Senior</div>
        </div>
        <div className="glass-card p-5 text-center border-white/10">
          <UserCircle className="w-7 h-7 mx-auto text-white/40 mb-2 opacity-80" />
          <div className="text-3xl font-black text-white/70">{stats.junior}</div>
          <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest mt-1">Junior</div>
        </div>
      </div>

      {/* Filters & Actions */}
      <div className="glass-card p-6 border-white/10 flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto flex-1">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <Input 
              className="premium-input pl-10" 
              placeholder="Search Name or Roll No..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          
          <Select value={filterStatus} onValueChange={(val) => setFilterStatus(val || 'All')}>
            <SelectTrigger className="premium-input w-full md:w-44"><SelectValue placeholder="Status" /></SelectTrigger>
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
            <SelectTrigger className="premium-input w-full md:w-44"><SelectValue placeholder="Branch" /></SelectTrigger>
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
            <SelectTrigger className="premium-input w-full md:w-52"><SelectValue placeholder="Club" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Clubs</SelectItem>
              <SelectItem value="League of Coders">League of Coders</SelectItem>
              <SelectItem value="Web Development Club">Web Development Club</SelectItem>
              <SelectItem value="AI Minds">AI Minds</SelectItem>
              <SelectItem value="Central Board">Central Board</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <button 
          onClick={handleExportCSV}
          className="btn-primary text-xs px-6 py-3 flex items-center justify-center gap-2 font-bold w-full md:w-auto shrink-0"
        >
          <Download className="w-4 h-4" /> EXPORT CSV
        </button>
      </div>

      {/* Data Table */}
      <div className="glass-card overflow-hidden border-white/10">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-white/[0.04]">
              <TableRow className="border-b border-white/10">
                <TableHead className="text-white/40 text-xs uppercase font-bold tracking-wider py-4">Name</TableHead>
                <TableHead className="text-white/40 text-xs uppercase font-bold tracking-wider py-4">Roll Number</TableHead>
                <TableHead className="text-white/40 text-xs uppercase font-bold tracking-wider py-4">Branch</TableHead>
                <TableHead className="text-white/40 text-xs uppercase font-bold tracking-wider py-4">Role</TableHead>
                <TableHead className="text-white/40 text-xs uppercase font-bold tracking-wider py-4">CGPA</TableHead>
                <TableHead className="text-white/40 text-xs uppercase font-bold tracking-wider py-4">Status</TableHead>
                <TableHead className="text-white/40 text-xs uppercase font-bold tracking-wider py-4 text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredApps.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-12 text-white/30 text-sm">
                    No applications found matching your criteria.
                  </TableCell>
                </TableRow>
              ) : (
                filteredApps.map((app) => (
                  <TableRow key={app.id} className="border-b border-white/[0.06] hover:bg-white/[0.04] transition-colors">
                    <TableCell className="font-bold text-white py-4">{app.name}</TableCell>
                    <TableCell className="text-white/70 font-mono text-xs">{app.roll_number}</TableCell>
                    <TableCell>
                      <span className="bg-white/10 text-white/80 px-2.5 py-1 rounded-md text-xs font-semibold border border-white/10">
                        {app.branch}
                      </span>
                    </TableCell>
                    <TableCell className="max-w-[200px] truncate text-white/80 font-medium">{app.role}</TableCell>
                    <TableCell className="text-white/80 font-medium">{app.cgpa}</TableCell>
                    <TableCell>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold border inline-block ${
                        app.status === 'Pending' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                        app.status === 'Shortlisted' ? 'bg-sky-500/10 text-sky-400 border-sky-500/20' :
                        app.status === 'Interview Scheduled' ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' :
                        app.status === 'Selected' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                        'bg-rose-500/10 text-rose-400 border-rose-500/20'
                      }`}>
                        {app.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <button 
                        onClick={() => { setSelectedApp(app); setNotes(app.notes || ''); }}
                        className="text-primary hover:text-primary/80 font-bold text-xs uppercase tracking-wider inline-flex items-center gap-1 transition-colors"
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
        <SheetContent className="sm:max-w-xl overflow-y-auto w-[90vw] bg-[#121212] border-l border-white/10 text-white">
          <SheetHeader className="mb-6">
            <SheetTitle className="text-2xl font-black text-white">{selectedApp?.name}</SheetTitle>
            <SheetDescription className="text-white/50 text-xs">
              {selectedApp?.roll_number} • {selectedApp?.branch} • {selectedApp?.year}
            </SheetDescription>
          </SheetHeader>
          
          {selectedApp && (
            <div className="space-y-8 pb-20">
              
              {/* Actions & Status */}
              <div className="glass-card p-5 border-white/10 space-y-4">
                <h4 className="font-bold text-sm text-white flex items-center gap-2 uppercase tracking-wider"><UserCheck className="w-4 h-4 text-primary" /> Admin Actions</h4>
                <div className="flex flex-wrap gap-2">
                  <button 
                    disabled={isUpdating}
                    onClick={() => handleUpdateStatus('Shortlisted')}
                    className="bg-sky-500/15 text-sky-400 border border-sky-500/30 hover:bg-sky-500/25 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all"
                  >Shortlist</button>
                  <button 
                    disabled={isUpdating}
                    onClick={() => handleUpdateStatus('Interview Scheduled')}
                    className="bg-indigo-500/15 text-indigo-400 border border-indigo-500/30 hover:bg-indigo-500/25 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all"
                  >Interview</button>
                  <button 
                    disabled={isUpdating}
                    onClick={() => handleUpdateStatus('Selected')}
                    className="bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/25 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all"
                  >Select</button>
                  <button 
                    disabled={isUpdating}
                    onClick={() => handleUpdateStatus('Rejected')}
                    className="bg-rose-500/15 text-rose-400 border border-rose-500/30 hover:bg-rose-500/25 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all"
                  >Reject</button>
                  <button 
                    disabled={isUpdating}
                    onClick={() => handleUpdateStatus('Pending')}
                    className="bg-amber-500/15 text-amber-400 border border-amber-500/30 hover:bg-amber-500/25 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all"
                  >Pending</button>
                </div>
                
                <div className="space-y-2 mt-4 pt-4 border-t border-white/10">
                  <label className="text-xs font-bold uppercase tracking-wider text-white/50">Admin Private Notes</label>
                  <Textarea 
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Add private notes about this candidate..."
                    className="premium-input min-h-[80px]"
                  />
                  <button 
                    disabled={isUpdating}
                    onClick={() => handleUpdateStatus(selectedApp.status)}
                    className="btn-ghost w-full py-2.5 text-xs font-bold uppercase tracking-wider mt-2"
                  >
                    Save Notes
                  </button>
                </div>
              </div>

              {/* Core Details */}
              <div className="grid grid-cols-2 gap-y-5 gap-x-6 text-sm">
                <div>
                  <div className="text-white/40 text-xs font-bold uppercase tracking-wider mb-1">Email</div>
                  <div className="font-semibold text-white truncate" title={selectedApp.college_email}>{selectedApp.college_email}</div>
                  {selectedApp.personal_email && <div className="text-white/60 text-xs truncate" title={selectedApp.personal_email}>{selectedApp.personal_email}</div>}
                </div>
                <div>
                  <div className="text-white/40 text-xs font-bold uppercase tracking-wider mb-1">Phone</div>
                  <div className="font-semibold text-white">{selectedApp.phone}</div>
                </div>
                <div>
                  <div className="text-white/40 text-xs font-bold uppercase tracking-wider mb-1">Club & Role</div>
                  <div className="font-semibold text-white">{selectedApp.club}</div>
                  <div className="font-bold text-primary">{selectedApp.role}</div>
                </div>
                <div>
                  <div className="text-white/40 text-xs font-bold uppercase tracking-wider mb-1">Academics</div>
                  <div className="font-semibold text-white">CGPA: {selectedApp.cgpa}</div>
                  <div className="text-white/70 text-xs">Attendance: {selectedApp.attendance}</div>
                  <div className="text-xs font-bold text-rose-400 mt-0.5">
                    {selectedApp.backlogs ? `Backlogs: ${selectedApp.backlog_subjects}` : 'No Backlogs'}
                  </div>
                </div>
              </div>

              {/* Links */}
              <div className="flex flex-wrap gap-3 pt-4 border-t border-white/10">
                <a href={selectedApp.resume_url} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-xs font-bold text-primary bg-primary/10 border border-primary/20 px-4 py-2 rounded-xl hover:bg-primary/20 transition-all">
                  <FileText className="w-4 h-4" /> View Resume
                </a>
                {selectedApp.github && (
                  <a href={selectedApp.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-xs font-medium text-white/70 bg-white/5 border border-white/10 px-4 py-2 rounded-xl hover:bg-white/10 transition-all">
                    <ExternalLink className="w-4 h-4" /> GitHub
                  </a>
                )}
                {selectedApp.linkedin && (
                  <a href={selectedApp.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-xs font-medium text-white/70 bg-white/5 border border-white/10 px-4 py-2 rounded-xl hover:bg-white/10 transition-all">
                    <ExternalLink className="w-4 h-4" /> LinkedIn
                  </a>
                )}
                {selectedApp.portfolio && (
                  <a href={selectedApp.portfolio} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-xs font-medium text-white/70 bg-white/5 border border-white/10 px-4 py-2 rounded-xl hover:bg-white/10 transition-all">
                    <ExternalLink className="w-4 h-4" /> Portfolio
                  </a>
                )}
              </div>

              {/* Answers */}
              <div className="space-y-6 pt-4 border-t border-white/10">
                <h4 className="font-bold text-base text-white uppercase tracking-wider">Application Answers</h4>
                
                <div className="space-y-4">
                  {Object.entries(selectedApp.answers || {}).map(([key, value]) => {
                    if (!value) return null;
                    const label = key.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
                    return (
                      <div key={key} className="glass-card p-4 border-white/10">
                        <div className="text-xs font-bold text-primary uppercase tracking-wider mb-1.5">{label}</div>
                        <div className="text-sm text-white/80 whitespace-pre-wrap leading-relaxed">{value as string}</div>
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
