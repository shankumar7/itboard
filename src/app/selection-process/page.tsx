import { CheckCircle2 } from 'lucide-react'

export default function SelectionProcess() {
  const steps = [
    { title: "Application Submission", desc: "Submit your details, resume, and role-specific answers through this portal." },
    { title: "Shortlisting", desc: "Applications are reviewed based on experience, skills, and alignment with the club's vision." },
    { title: "Interview Round", desc: "Shortlisted candidates will be called for a technical and HR interview." },
    { title: "Final Selection", desc: "The new board members are announced and onboarded." }
  ]

  return (
    <div className="container mx-auto px-4 py-20 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8 text-center">Selection Process</h1>
      <div className="space-y-6">
        {steps.map((step, index) => (
          <div key={index} className="clay-card p-6 bg-white flex gap-6 items-start">
            <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 font-bold text-xl">
              {index + 1}
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">{step.title}</h3>
              <p className="text-muted-foreground">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
