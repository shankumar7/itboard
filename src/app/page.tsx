'use client'

import Link from 'next/link'
import { ArrowRight, Code, Monitor, Cpu, ChevronRight, CheckCircle2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { ApplicationForm } from '@/components/application-form'
import { ContactSection } from '@/components/contact'

export default function Home() {
  const steps = [
    { title: "Application Submission", desc: "Submit your details, resume, and role-specific answers through this portal." },
    { title: "Shortlisting", desc: "Applications are reviewed based on experience, skills, and alignment with the club's vision." },
    { title: "Interview Round", desc: "Shortlisted candidates will be called for a technical and HR interview." },
    { title: "Final Selection", desc: "The new board members are announced and onboarded." }
  ]

  return (
    <main className="min-h-screen pt-32 pb-20 overflow-hidden relative selection:bg-primary selection:text-primary-foreground">
      {/* Aurora Background */}
      <div className="aurora-bg" />

      {/* Hero Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 text-center pt-10 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto space-y-8"
        >
          <div className="inline-block">
            <span className="px-4 py-1.5 rounded-md text-xs font-bold text-primary border border-primary uppercase tracking-widest mb-6 bg-white/50 backdrop-blur-md shadow-sm">
              Academic Year 2026-27
            </span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-foreground leading-[1] silver-shadow-text uppercase">
            Lead the <br className="hidden md:block" /> Future.
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-medium leading-relaxed">
            Join the IT Board and shape the ecosystem of innovation, leadership, and collaboration. Applications are now open for all core positions.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-8">
            <Link 
              href="#apply" 
              className="premium-btn px-8 py-4 text-lg w-full sm:w-auto flex items-center justify-center gap-2 group"
            >
              Apply Now 
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              href="#roles" 
              className="bg-white text-foreground border border-border rounded-md hover:border-primary transition-colors px-8 py-4 text-lg w-full sm:w-auto flex items-center justify-center font-medium shadow-sm"
            >
              View Positions
            </Link>
          </div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="container mx-auto px-4 py-24 max-w-4xl scroll-mt-20">
        <h2 className="text-4xl font-bold mb-8 silver-shadow-text">About IT Board</h2>
        <div className="p-8 bg-white text-lg text-muted-foreground leading-relaxed space-y-6 border border-border rounded-xl shadow-sm">
          <p>
            The IT Board is the premier technical body of the college, dedicated to fostering innovation, 
            technical excellence, and leadership among students. We oversee and guide the major technical clubs 
            on campus to ensure a cohesive and impactful technical ecosystem.
          </p>
          <p>
            Our mission is to bridge the gap between academia and industry by providing students with hands-on 
            experience, networking opportunities, and the resources needed to excel in the ever-evolving tech landscape.
          </p>
        </div>
      </section>

      {/* Roles Section */}
      <section id="roles" className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl py-24 scroll-mt-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight mb-4 silver-shadow-text">Board Structure</h2>
          <p className="text-muted-foreground font-medium max-w-2xl mx-auto">
            Discover where you fit into our ecosystem of specialized technical clubs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* League of Coders */}
          <div className="p-8 group flex flex-col h-full bg-white border border-border rounded-xl shadow-sm hover:border-primary transition-colors">
            <div className="w-12 h-12 rounded-lg bg-secondary text-primary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              <Code className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold mb-2">League of Coders</h3>
            <p className="text-muted-foreground text-sm mb-6 flex-grow">
              Fostering competitive programming and algorithmic problem solving.
            </p>
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Open Positions</h4>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm font-medium"><ChevronRight className="w-4 h-4 text-primary" /> Vice President</li>
                <li className="flex items-center gap-2 text-sm font-medium"><ChevronRight className="w-4 h-4 text-primary" /> Technical Coordinator</li>
                <li className="flex items-center gap-2 text-sm font-medium"><ChevronRight className="w-4 h-4 text-primary" /> Events Coordinator</li>
              </ul>
            </div>
          </div>

          {/* Web Development Club */}
          <div className="p-8 group flex flex-col h-full bg-white border border-border rounded-xl shadow-sm hover:border-primary transition-colors">
            <div className="w-12 h-12 rounded-lg bg-secondary text-primary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              <Monitor className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Web Dev Club</h3>
            <p className="text-muted-foreground text-sm mb-6 flex-grow">
              Building robust applications and modern web experiences.
            </p>
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Open Positions</h4>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm font-medium"><ChevronRight className="w-4 h-4 text-primary" /> Vice President</li>
                <li className="flex items-center gap-2 text-sm font-medium"><ChevronRight className="w-4 h-4 text-primary" /> Technical Coordinator</li>
                <li className="flex items-center gap-2 text-sm font-medium"><ChevronRight className="w-4 h-4 text-primary" /> Community Engagement</li>
              </ul>
            </div>
          </div>

          {/* AI Minds */}
          <div className="p-8 group flex flex-col h-full bg-primary text-primary-foreground border border-primary rounded-xl shadow-sm">
            <div className="w-12 h-12 rounded-lg bg-white text-primary flex items-center justify-center mb-6">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold mb-2">AI Minds</h3>
            <p className="text-primary-foreground/80 text-sm mb-6 flex-grow">
              Pushing boundaries in Artificial Intelligence and Machine Learning.
            </p>
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-primary-foreground/60 uppercase tracking-wider">Open Positions</h4>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm font-medium"><ChevronRight className="w-4 h-4 text-white" /> Head</li>
                <li className="flex items-center gap-2 text-sm font-medium"><ChevronRight className="w-4 h-4 text-white" /> Vice President</li>
                <li className="flex items-center gap-2 text-sm font-medium"><ChevronRight className="w-4 h-4 text-white" /> Technical Coordinator</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Selection Process Section */}
      <section id="process" className="container mx-auto px-4 py-24 max-w-4xl scroll-mt-20">
        <h2 className="text-4xl font-bold mb-12 text-center silver-shadow-text">Selection Process</h2>
        <div className="space-y-6">
          {steps.map((step, index) => (
            <div key={index} className="p-6 bg-white flex gap-6 items-start border border-border rounded-xl shadow-sm hover:border-primary transition-colors">
              <div className="w-12 h-12 rounded-lg bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 font-bold text-xl">
                {index + 1}
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Apply Section */}
      <section id="apply" className="py-24 bg-secondary/30 scroll-mt-20">
        <ApplicationForm />
      </section>

      {/* Contact Section */}
      <section id="contact" className="scroll-mt-20">
        <ContactSection />
      </section>
    </main>
  )
}
