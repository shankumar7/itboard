import { ApplicationForm } from '@/components/application-form'

export default function ApplyPage() {
  return (
    <div className="min-h-screen pt-32 pb-20 relative overflow-hidden">
      <div className="aurora-bg" />
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-foreground">
            Application Portal
          </h1>
          <p className="text-lg text-muted-foreground font-medium">
            Fill out the form below to apply for a position on the IT Board. Please ensure all details are accurate.
          </p>
        </div>
        <ApplicationForm />
      </div>
    </div>
  )
}
