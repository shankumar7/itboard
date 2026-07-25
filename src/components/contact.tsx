import { Mail, Phone, MessageCircle } from 'lucide-react'
import Link from 'next/link'

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" stroke="none" className={className}>
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
  </svg>
)

const GithubIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" stroke="none" className={className}>
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
)

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" stroke="none" className={className}>
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
)

export function ContactSection() {
  return (
    <div className="container mx-auto px-4 py-24 max-w-5xl relative z-10">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold tracking-tight mb-4 text-foreground silver-shadow-text">
          Contact Us
        </h2>
        <p className="text-lg text-muted-foreground font-medium max-w-2xl mx-auto">
          Reach out to the Head of the IT Board for any inquiries, technical discussions, or collaborations.
        </p>
      </div>

      <div className="bg-white p-8 md:p-12 mb-12 rounded-xl border border-border shadow-sm">
        <div className="flex flex-col md:flex-row gap-12 items-center md:items-start justify-between">
          
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-3xl font-bold text-foreground mb-2">Pitta Shankumar</h3>
            <p className="text-primary font-bold mb-8 text-lg uppercase tracking-wider text-xs">Head of Information Technology Board</p>
            
            <div className="space-y-6">
              <a href="mailto:shankumarpitta714@gmail.com" className="flex items-center gap-4 text-muted-foreground hover:text-primary transition-colors group">
                <div className="w-12 h-12 rounded-lg bg-secondary text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                  <Mail className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-bold text-foreground">Email</p>
                  <p className="font-medium">shankumarpitta714@gmail.com</p>
                </div>
              </a>

              <a href="https://wa.me/919390673485" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-muted-foreground hover:text-primary transition-colors group">
                <div className="w-12 h-12 rounded-lg bg-secondary text-primary flex items-center justify-center group-hover:bg-[#25D366] group-hover:text-white transition-all">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-bold text-foreground">WhatsApp</p>
                  <p className="font-medium">+91 93906 73485</p>
                </div>
              </a>

              <a href="tel:+918125983384" className="flex items-center gap-4 text-muted-foreground hover:text-primary transition-colors group">
                <div className="w-12 h-12 rounded-lg bg-secondary text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                  <Phone className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-bold text-foreground">Call</p>
                  <p className="font-medium">+91 81259 83384</p>
                </div>
              </a>
            </div>
          </div>

          <div className="flex-1 w-full md:w-auto bg-secondary/50 rounded-xl p-8 border border-border flex flex-col items-center justify-center">
            <h4 className="text-lg font-bold mb-6 text-foreground uppercase tracking-widest text-xs">Connect on Socials</h4>
            <div className="flex flex-col w-full gap-4">
              <Link 
                href="https://www.linkedin.com/in/shankumar7/" 
                target="_blank"
                className="flex items-center gap-4 p-4 rounded-lg bg-white hover:border-primary transition-all border border-border group"
              >
                <div className="text-primary group-hover:scale-110 transition-transform">
                  <LinkedinIcon className="w-6 h-6" />
                </div>
                <span className="font-semibold text-foreground">LinkedIn</span>
              </Link>
              
              <Link 
                href="https://github.com/shankumar7" 
                target="_blank"
                className="flex items-center gap-4 p-4 rounded-lg bg-white hover:border-primary transition-all border border-border group"
              >
                <div className="text-primary group-hover:scale-110 transition-transform">
                  <GithubIcon className="w-6 h-6" />
                </div>
                <span className="font-semibold text-foreground">GitHub</span>
              </Link>

              <Link 
                href="https://www.instagram.com/shankumar_7/" 
                target="_blank"
                className="flex items-center gap-4 p-4 rounded-lg bg-white hover:border-primary transition-all border border-border group"
              >
                <div className="text-primary group-hover:scale-110 transition-transform">
                  <InstagramIcon className="w-6 h-6" />
                </div>
                <span className="font-semibold text-foreground">Instagram</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
