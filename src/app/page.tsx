'use client'

import Link from 'next/link'
import { ArrowRight, Code, Monitor, Cpu, ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Home() {
  return (
    <main className="min-h-screen pt-32 pb-20 overflow-hidden relative">
      {/* Aurora Background */}
      <div className="aurora-bg" />

      {/* Hero Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 text-center pt-10 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto space-y-8"
        >
          <div className="inline-block">
            <span className="premium-glass px-4 py-1.5 rounded-full text-sm font-semibold text-primary tracking-wide mb-6">
              Academic Year 2026-27
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-foreground leading-[1.1]">
            Lead the future of <br className="hidden md:block" />
            <span className="bg-gradient-to-r from-primary to-indigo-600 bg-clip-text text-transparent">
              technical communities.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-medium leading-relaxed">
            Join the IT Board and shape the ecosystem of innovation, leadership, and collaboration. Applications are now open for all core positions.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <Link 
              href="/apply" 
              className="premium-btn bg-primary text-primary-foreground px-8 py-4 text-lg w-full sm:w-auto flex items-center justify-center gap-2 group"
            >
              Apply Now 
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              href="#positions" 
              className="premium-btn bg-white text-foreground px-8 py-4 text-lg w-full sm:w-auto flex items-center justify-center gap-2 border border-border/50 hover:bg-slate-50"
            >
              View Positions
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Filled Notice */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl mb-24">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="premium-card p-6 bg-blue-50/50 text-center border-blue-100/50"
        >
          <p className="text-blue-800 font-medium text-sm md:text-base">
            <span className="font-bold">Notice:</span> The Head positions for League of Coders and Web Development Club have already been filled for the upcoming academic year.
          </p>
        </motion.div>
      </section>

      {/* Bento Box Structure & Positions */}
      <section id="positions" className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Board Structure & Roles</h2>
          <p className="text-muted-foreground font-medium max-w-2xl mx-auto">
            Discover where you fit into our ecosystem of specialized technical clubs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* League of Coders */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="premium-card p-8 group flex flex-col h-full bg-white/60"
          >
            <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Code className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold mb-2">League of Coders</h3>
            <p className="text-muted-foreground text-sm mb-6 flex-grow">
              Fostering competitive programming and algorithmic problem solving.
            </p>
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Open Positions</h4>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm font-medium"><ChevronRight className="w-4 h-4 text-primary" /> Vice President</li>
                <li className="flex items-center gap-2 text-sm font-medium"><ChevronRight className="w-4 h-4 text-primary" /> Technical Coordinator</li>
                <li className="flex items-center gap-2 text-sm font-medium"><ChevronRight className="w-4 h-4 text-primary" /> Events & Ops Coordinator</li>
                <li className="flex items-center gap-2 text-sm font-medium"><ChevronRight className="w-4 h-4 text-primary" /> Design & Media Coordinator</li>
              </ul>
            </div>
          </motion.div>

          {/* Web Development Club */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="premium-card p-8 group flex flex-col h-full bg-white/60"
          >
            <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Monitor className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Web Dev Club</h3>
            <p className="text-muted-foreground text-sm mb-6 flex-grow">
              Building robust applications and modern web experiences.
            </p>
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Open Positions</h4>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm font-medium"><ChevronRight className="w-4 h-4 text-primary" /> Vice President</li>
                <li className="flex items-center gap-2 text-sm font-medium"><ChevronRight className="w-4 h-4 text-primary" /> Technical Coordinator</li>
                <li className="flex items-center gap-2 text-sm font-medium"><ChevronRight className="w-4 h-4 text-primary" /> Events & Ops Coordinator</li>
                <li className="flex items-center gap-2 text-sm font-medium"><ChevronRight className="w-4 h-4 text-primary" /> Community Engagement</li>
              </ul>
            </div>
          </motion.div>

          {/* AI Minds */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="premium-card p-8 group flex flex-col h-full bg-gradient-to-br from-white/60 to-primary/5 border-primary/20"
          >
            <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold mb-2 text-primary">AI Minds</h3>
            <p className="text-muted-foreground text-sm mb-6 flex-grow">
              Pushing boundaries in Artificial Intelligence and Machine Learning.
            </p>
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Open Positions</h4>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm font-medium text-slate-800"><ChevronRight className="w-4 h-4 text-primary" /> Head</li>
                <li className="flex items-center gap-2 text-sm font-medium text-slate-800"><ChevronRight className="w-4 h-4 text-primary" /> Vice President</li>
                <li className="flex items-center gap-2 text-sm font-medium text-slate-800"><ChevronRight className="w-4 h-4 text-primary" /> Technical Coordinator</li>
                <li className="flex items-center gap-2 text-sm font-medium text-slate-800"><ChevronRight className="w-4 h-4 text-primary" /> Events & Ops Coordinator</li>
                <li className="flex items-center gap-2 text-sm font-medium text-slate-800"><ChevronRight className="w-4 h-4 text-primary" /> Design & Media Coordinator</li>
              </ul>
            </div>
          </motion.div>

          {/* Centralized Lead Roles */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="premium-card p-8 md:col-span-2 lg:col-span-3 bg-white/80 border-slate-200 mt-4"
          >
            <div className="flex flex-col md:flex-row gap-8 items-center justify-between">
              <div className="max-w-xl text-center md:text-left">
                <h3 className="text-2xl font-bold mb-2">Centralized Lead Roles</h3>
                <p className="text-muted-foreground text-sm">
                  These crucial roles sit across all clubs, orchestrating the overarching strategy, outreach, and industry connections for the entire IT Board ecosystem.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full md:w-auto">
                <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl text-center">
                  <div className="font-bold text-primary mb-1">PR & Outreach</div>
                  <div className="text-xs text-muted-foreground font-medium">Lead</div>
                </div>
                <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl text-center">
                  <div className="font-bold text-primary mb-1">Industry Relations</div>
                  <div className="text-xs text-muted-foreground font-medium">Sponsorship Lead</div>
                </div>
                <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl text-center">
                  <div className="font-bold text-primary mb-1">Technical Strategy</div>
                  <div className="text-xs text-muted-foreground font-medium">Lead</div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

    </main>
  )
}
