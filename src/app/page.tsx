'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight, Code, Monitor, Cpu, Zap, Users, Trophy, ChevronRight, Mail, Phone, MessageCircle, ArrowUpRight, Send, CheckCircle2, UserCheck, Sparkles, Globe } from 'lucide-react'
import { motion } from 'framer-motion'
import { ApplicationForm } from '@/components/application-form'

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" stroke="none" className={className}>
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
)

const GithubIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" stroke="none" className={className}>
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
)

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" stroke="none" className={className}>
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
)

export default function Home() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.history.scrollRestoration = 'manual'
      window.scrollTo(0, 0)
    }
  }, [])
  const steps = [
    { num: '01', title: 'Submit Application', desc: 'Fill out your details & position preferences in our portal.', icon: Send },
    { num: '02', title: 'Screening & Review', desc: 'Our board evaluates applications for skill alignment & drive.', icon: CheckCircle2 },
    { num: '03', title: 'Interactive Interview', desc: 'Shortlisted candidates meet the board for a quick interview.', icon: UserCheck },
    { num: '04', title: 'Onboarding & Lead', desc: 'Selected candidates are welcomed into the official IT Board.', icon: Sparkles },
  ]

  const clubs = [
    {
      name: 'League of Coders',
      desc: 'Competitive programming & algorithmic problem solving.',
      icon: Code,
      roles: ['Head (Filled)', 'Vice President (Open)'],
      color: 'from-blue-500/20 to-cyan-500/10',
    },
    {
      name: 'Web Dev Club',
      desc: 'Building modern applications & web experiences.',
      icon: Monitor,
      roles: ['Head (Filled)', 'Vice President (Open)'],
      color: 'from-purple-500/20 to-pink-500/10',
    },
    {
      name: 'AI Minds',
      desc: 'Pushing boundaries in AI & Machine Learning.',
      icon: Cpu,
      roles: ['Head (Open)', 'Vice President (Open)'],
      color: 'from-primary/20 to-amber-500/10',
      featured: true,
    },
    {
      name: 'Central Board',
      desc: 'Cross-functional leadership, technical strategy, & operations.',
      icon: Zap,
      roles: [
        'PR & Outreach Lead (Senior)',
        'Industry Relations Lead (Senior)',
        'Design & Media Coordinator (Senior)',
        'Technical Strategy Lead (Junior)',
        'Technical Coordinator (Junior)',
        'Events & Operations Coordinator (Junior)',
        'Community Engagement Coordinator (Junior)'
      ],
      color: 'from-emerald-500/20 to-teal-500/10',
      fullWidth: true,
    },
  ]

  return (
    <div className="min-h-screen">

      {/* ════════════════ HERO ════════════════ */}
      <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden w-full max-w-full py-16 sm:py-24">
        {/* Animated gradient orbs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[320px] sm:w-[600px] h-[320px] sm:h-[600px] rounded-full bg-primary/[0.09] blur-[100px] sm:blur-[160px] animate-pulse pointer-events-none" />
        <div className="absolute bottom-10 right-0 w-[250px] sm:w-[450px] h-[250px] sm:h-[450px] rounded-full bg-amber-500/[0.06] blur-[100px] sm:blur-[160px] pointer-events-none" />

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 pt-16 sm:pt-24 pb-12 sm:pb-20 w-full overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-6 sm:space-y-8"
          >


            {/* Headline */}
            <div>
              <h1 className="text-[clamp(2.2rem,8.5vw,7.5rem)] leading-[1.1] text-white tracking-normal font-normal break-words max-w-full" style={{ fontFamily: 'var(--font-cursive), cursive' }}>
                Information Technology
                <br />
                <span className="text-primary">Board</span>
              </h1>
              <p className="text-white/40 text-base sm:text-lg md:text-xl max-w-lg mx-auto mt-4 sm:mt-6 font-medium leading-relaxed" style={{ fontFamily: 'var(--font-sans)' }}>
                Join the premier technical body shaping innovation, leadership, and collaboration at CMRCET.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 px-4 sm:px-0">
              <Link href="#apply" className="btn-primary flex items-center justify-center gap-2 group text-sm w-full sm:w-auto">
                Apply Now <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="#clubs" className="btn-ghost flex items-center justify-center text-sm w-full sm:w-auto">
                Explore Clubs
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent pointer-events-none" />
      </section>

      {/* ════════════════ ABOUT ════════════════ */}
      <section id="about" className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-32 scroll-mt-20">
        <div className="grid md:grid-cols-5 gap-8 items-start">
          <div className="md:col-span-3">
            <p className="text-primary text-[11px] font-bold uppercase tracking-[0.2em] mb-5">About Us</p>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-8 leading-[1.05] tracking-tight">
              Shaping the<br />Tech Ecosystem
            </h2>
            <p className="text-white/40 text-lg leading-relaxed mb-6">
              The IT Board is the premier technical body of CMRCET, dedicated to fostering innovation,
              technical excellence, and leadership. We oversee the major technical clubs
              on campus to build a cohesive and impactful ecosystem.
            </p>
            <p className="text-white/40 text-lg leading-relaxed">
              Our mission is to bridge academia and industry through hands-on
              experience, networking, and the resources to excel in tech.
            </p>
          </div>
          <div className="md:col-span-2 space-y-4">
            <div className="glass-card p-8 border-primary/20 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-500" />
              <div className="relative z-10 space-y-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                  <Zap className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-[10px] text-primary font-bold uppercase tracking-[0.2em] mb-1">Our Mission</p>
                  <h3 className="text-xl font-bold text-white leading-snug">Empowering Student Leaders & Tech Innovators</h3>
                </div>
                <p className="text-white/40 text-sm leading-relaxed">
                  Connecting students with real-world technical projects, industry mentorship, and collaborative growth across specialized domains.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="glass-card p-6 flex flex-col justify-between">
                <p className="text-3xl font-black text-white">3</p>
                <p className="text-white/30 text-xs font-bold uppercase tracking-wider mt-2">Core Clubs</p>
              </div>
              <div className="glass-card p-6 flex flex-col justify-between">
                <p className="text-3xl font-black text-primary glow-text">16</p>
                <p className="text-white/30 text-xs font-bold uppercase tracking-wider mt-2">Students</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════ CLUBS ════════════════ */}
      <section id="clubs" className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-32 scroll-mt-20">
        <div className="text-center mb-10 sm:mb-16">
          <p className="text-primary text-[11px] font-bold uppercase tracking-[0.2em] mb-3 sm:mb-5">Our Clubs</p>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-black text-white tracking-tight">Board Structure</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {clubs.map((club) => (
            <motion.div
              key={club.name}
              whileHover={{ y: -4 }}
              className={`glass-card p-8 flex flex-col h-full group relative overflow-hidden ${club.featured ? 'border-primary/20' : ''} ${club.fullWidth ? 'md:col-span-3' : ''}`}
            >
              {/* Gradient accent */}
              <div className={`absolute inset-0 bg-gradient-to-br ${club.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-white mb-2">{club.name}</h3>
                <p className="text-white/40 text-sm mb-8">{club.desc}</p>

                <div className="pt-5 border-t border-white/5">
                  <p className="text-[10px] font-bold text-white/25 uppercase tracking-[0.15em] mb-3">Open Positions</p>
                  <ul className="space-y-2.5">
                    {club.roles.map((role) => (
                      <li key={role} className="flex items-center gap-2 text-sm text-white/60 group-hover:text-white/80 transition-colors">
                        <ChevronRight className="w-3 h-3 text-primary flex-shrink-0" />
                        {role}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ════════════════ PROCESS ════════════════ */}
      <section id="process" className="py-16 sm:py-32 scroll-mt-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-12 sm:mb-20">
            <p className="text-primary text-[11px] font-bold uppercase tracking-[0.2em] mb-3 sm:mb-5">How It Works</p>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-black text-white tracking-tight">Selection Process</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 relative">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="glass-card p-7 flex flex-col justify-between group relative overflow-hidden border-white/10 hover:border-primary/30 transition-all duration-300"
              >
                {/* Accent glow on hover */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/25 transition-all duration-500" />
                
                <div className="relative z-10 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-black text-primary glow-text">
                      {step.num}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">{step.title}</h3>
                    <p className="text-white/40 text-xs sm:text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </div>

                <div className="pt-4 mt-6 border-t border-white/5 flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-white/30 group-hover:text-primary transition-colors">
                  <span>Step {i + 1} of 4</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-primary" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════ APPLY ════════════════ */}
      <section id="apply" className="py-16 sm:py-32 scroll-mt-20 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/[0.03] blur-[150px]" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-10 sm:mb-16">
            <p className="text-primary text-[11px] font-bold uppercase tracking-[0.2em] mb-3 sm:mb-5">Join Us</p>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-black text-white mb-3 sm:mb-4 tracking-tight">Apply Now</h2>
            <p className="text-white/40 text-sm sm:text-base max-w-xl mx-auto px-2">Fill in your details, upload your resume, and answer all required questions.</p>
          </div>
          <div className="glass-card p-4 sm:p-8 md:p-12">
            <ApplicationForm />
          </div>
        </div>
      </section>

      {/* ════════════════ CONTACT ════════════════ */}
      <section id="contact" className="py-16 sm:py-32 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-16">
            <p className="text-primary text-[11px] font-bold uppercase tracking-[0.2em] mb-3 sm:mb-5">Get In Touch</p>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-black text-white tracking-tight">Contact</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5 items-stretch max-w-5xl mx-auto">
            {/* Featured Image Card */}
            <div className="glass-card overflow-hidden group relative h-[400px] sm:h-[310px] border-white/10">
              <img 
                src="/board-banner.jpeg" 
                alt="IT Board Leadership" 
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700" 
              />
            </div>

            {/* Contact Info */}
            <div className="glass-card p-5 sm:p-6 flex flex-col justify-between h-auto min-h-[290px] sm:h-[310px]">
              <div>
                <h3 className="text-xl font-black text-white mb-0.5">Pitta Shankumar</h3>
                <p className="text-primary text-[11px] font-bold uppercase tracking-[0.15em] mb-4">Head of IT Board</p>

                <div className="space-y-2.5">
                  {[
                    { icon: Globe, label: 'Website', value: 'shankumar.me', href: 'https://shankumar.me' },
                    { icon: Mail, label: 'Email', value: 'shankumarpitta714@gmail.com', href: 'mailto:shankumarpitta714@gmail.com' },
                    { icon: MessageCircle, label: 'WhatsApp', value: '+91 93906 73485', href: 'https://wa.me/919390673485' },
                    { icon: Phone, label: 'Call', value: '+91 81259 83384', href: 'tel:+918125983384' },
                  ].map((item) => (
                    <a key={item.label} href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="flex items-center gap-3 group">
                      <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-white/40 group-hover:border-primary/30 group-hover:bg-primary/10 group-hover:text-primary transition-all shrink-0">
                        <item.icon className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[9px] font-bold text-white/25 uppercase tracking-widest leading-none">{item.label}</p>
                        <p className="text-xs text-white/60 font-medium group-hover:text-white transition-colors truncate mt-0.5">{item.value}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Socials */}
            <div className="glass-card p-6 flex flex-col justify-between h-[290px] sm:h-[310px]">
              <div>
                <p className="text-[10px] font-bold text-white/25 uppercase tracking-[0.15em] mb-4">Connect on Socials</p>
                <div className="flex flex-col gap-2.5">
                  {[
                    { icon: LinkedinIcon, name: 'LinkedIn', href: 'https://www.linkedin.com/in/shankumar7/' },
                    { icon: GithubIcon, name: 'GitHub', href: 'https://github.com/shankumar7' },
                    { icon: InstagramIcon, name: 'Instagram', href: 'https://www.instagram.com/shankumar_7/' },
                  ].map((social) => (
                    <a key={social.name} href={social.href} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:border-primary/20 hover:bg-primary/[0.03] transition-all group">
                      <div className="flex items-center gap-3">
                        <social.icon className="w-4 h-4 text-white/30 group-hover:text-primary transition-colors" />
                        <span className="text-white/60 font-semibold group-hover:text-white transition-colors text-xs">{social.name}</span>
                      </div>
                      <ArrowUpRight className="w-3.5 h-3.5 text-white/10 group-hover:text-primary transition-colors" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
