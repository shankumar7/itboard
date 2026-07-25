import { Mail, MapPin } from 'lucide-react'

export default function Contact() {
  return (
    <div className="container mx-auto px-4 py-20 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8 text-center">Contact Us</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="clay-card p-8 bg-white text-center flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-blue-50 text-primary flex items-center justify-center mb-4">
            <Mail className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold mb-2">Email</h3>
          <p className="text-muted-foreground">contact@itboard.edu</p>
        </div>
        <div className="clay-card p-8 bg-white text-center flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-blue-50 text-primary flex items-center justify-center mb-4">
            <MapPin className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold mb-2">Location</h3>
          <p className="text-muted-foreground">Student Activities Center,<br/>Main Campus</p>
        </div>
      </div>
    </div>
  )
}
