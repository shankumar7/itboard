import Link from 'next/link'
import { ArrowRight, CheckCircle2 } from 'lucide-react'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20 lg:pt-48 lg:pb-32">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-white/50 -z-10" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] -z-10 opacity-20" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-foreground mb-6">
            Join the <span className="bg-gradient-to-r from-primary to-indigo-600 bg-clip-text text-transparent">IT Board</span>
          </h1>
          <p className="mt-4 max-w-2xl text-xl text-muted-foreground mx-auto mb-10">
            Lead the future of technical communities through innovation, leadership, and collaboration.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="/apply" 
              className="clay-btn bg-primary text-primary-foreground px-8 py-4 rounded-full font-semibold text-lg flex items-center gap-2 hover:bg-primary/90 w-full sm:w-auto"
            >
              Apply Now
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link 
              href="#positions" 
              className="clay-btn bg-white text-foreground px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-50 w-full sm:w-auto"
            >
              View Positions
            </Link>
          </div>
        </div>
      </section>

      {/* Board Structure & Filled Positions */}
      <section className="py-20 bg-white" id="positions">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold mb-4">Board Structure</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The IT Board oversees three major technical clubs, fostering a culture of continuous learning and development.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {['League of Coders', 'Web Development Club', 'AI Minds'].map((club) => (
              <div key={club} className="clay-card p-8 text-center bg-card">
                <h3 className="text-xl font-bold text-foreground mb-2">{club}</h3>
              </div>
            ))}
          </div>

          <div className="bg-blue-50 rounded-3xl p-8 mb-20 border border-blue-100 shadow-sm">
            <h3 className="text-2xl font-bold text-blue-900 mb-6">Already Filled Positions</h3>
            <p className="text-blue-800 mb-6 bg-blue-100/50 inline-block px-4 py-2 rounded-lg font-medium">
              The Head positions for League of Coders and Web Development Club have already been filled.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-border/50">
                <div className="text-sm font-semibold text-primary mb-1">Advisor</div>
                <div className="text-lg font-bold">Filled</div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-border/50">
                <div className="text-sm font-semibold text-primary mb-1">General Secretary</div>
                <div className="text-lg font-bold">Filled</div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-border/50">
                <div className="text-sm font-semibold text-primary mb-1">Head - League of Coders</div>
                <div className="text-sm text-muted-foreground mb-2">Filled by:</div>
                <div className="text-lg font-bold">Nikhil</div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-border/50">
                <div className="text-sm font-semibold text-primary mb-1">Head - Web Development Club</div>
                <div className="text-sm text-muted-foreground mb-2">Filled by:</div>
                <div className="text-lg font-bold">Rohit</div>
              </div>
            </div>
          </div>

          {/* Open Positions */}
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                Senior Positions
                <span className="text-sm font-normal bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full">3rd Year</span>
              </h3>
              <ul className="space-y-4">
                {[
                  'Head - AI Minds',
                  'Vice President - AI Minds',
                  'PR & Outreach Lead',
                  'Industry Relations & Sponsorship Lead',
                  'Technical Strategy Lead'
                ].map((pos) => (
                  <li key={pos} className="flex items-center gap-3 clay-card p-4 bg-white">
                    <CheckCircle2 className="text-primary w-5 h-5 flex-shrink-0" />
                    <span className="font-medium text-foreground/90">{pos}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                Junior Positions
                <span className="text-sm font-normal bg-blue-100 text-blue-700 px-3 py-1 rounded-full">2nd Year</span>
              </h3>
              <ul className="space-y-4">
                {[
                  'Vice President - League of Coders',
                  'Vice President - Web Development Club',
                  'Technical Coordinator',
                  'Events & Operations Coordinator',
                  'Community Engagement Coordinator',
                  'Design & Media Coordinator'
                ].map((pos) => (
                  <li key={pos} className="flex items-center gap-3 clay-card p-4 bg-white">
                    <CheckCircle2 className="text-primary w-5 h-5 flex-shrink-0" />
                    <span className="font-medium text-foreground/90">{pos}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
        </div>
      </section>
    </div>
  )
}
