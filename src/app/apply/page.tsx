import { ApplicationForm } from "@/components/application-form"

export default function ApplyPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold mb-4">Application Form</h1>
        <p className="text-muted-foreground text-lg">
          Join the IT Board. Please fill out the form below carefully.
        </p>
      </div>
      
      <div className="clay-card p-6 sm:p-10 bg-white">
        <ApplicationForm />
      </div>
    </div>
  )
}
