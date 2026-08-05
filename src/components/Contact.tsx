'use client';

import { useState } from 'react';
import { Mail, Phone, Eye } from 'lucide-react';
import GitHubIcon from './icons/GitHubIcon';
import LinkedInIcon from './icons/LinkedInIcon';
import ScrollReveal from './ScrollReveal';

export default function Contact() {
  const [showPhone, setShowPhone] = useState(false);

  return (
    <section id="contact" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-text-primary mb-4">
              Let&apos;s <span className="gradient-text">Connect</span>
            </h2>
            <div className="w-16 h-1 bg-[image:var(--gradient-accent)] mx-auto rounded-full mb-4" />
            <p className="text-text-secondary max-w-xl mx-auto text-lg">
              I&apos;m actively looking for backend and full-stack roles.
              Reach out via the form below or connect directly.
            </p>
          </div>
        </ScrollReveal>

        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <ScrollReveal delay={0.1}>
            <div className="space-y-4">
              <h3 className="font-heading text-xl font-bold text-text-primary mb-6">
                Connect Directly
              </h3>
              {/* Email */}
            <a
              href="mailto:shaaniffakki@gmail.com"
              className="glass-card holo-shimmer rounded-2xl p-6 flex items-center gap-4 group"
            >
              <div
                className="w-12 h-12 rounded-xl glass-card-static
                            flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                style={{ boxShadow: '0 0 16px rgba(99, 102, 241, 0.15)' }}
              >
                <Mail className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-text-muted text-xs uppercase tracking-wider mb-0.5">
                  Email
                </p>
                <p className="text-text-primary font-medium text-sm">
                  shaaniffakki@gmail.com
                </p>
              </div>
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/shaanif-ahmed-765934233/"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card holo-shimmer rounded-2xl p-6 flex items-center gap-4 group"
            >
              <div
                className="w-12 h-12 rounded-xl glass-card-static
                            flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                style={{ boxShadow: '0 0 16px rgba(34, 211, 238, 0.15)' }}
              >
                <LinkedInIcon className="w-5 h-5 text-accent-secondary" />
              </div>
              <div>
                <p className="text-text-muted text-xs uppercase tracking-wider mb-0.5">
                  LinkedIn
                </p>
                <p className="text-text-primary font-medium text-sm">
                  Shaanif Ahmed
                </p>
              </div>
            </a>

            {/* GitHub */}
            <a
              href="https://github.com/shaanlabs"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card holo-shimmer rounded-2xl p-6 flex items-center gap-4 group"
            >
              <div
                className="w-12 h-12 rounded-xl glass-card-static
                            flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                style={{ boxShadow: '0 0 16px rgba(192, 132, 252, 0.15)' }}
              >
                <GitHubIcon className="w-5 h-5 text-accent-tertiary" />
              </div>
              <div>
                <p className="text-text-muted text-xs uppercase tracking-wider mb-0.5">
                  GitHub
                </p>
                <p className="text-text-primary font-medium text-sm">
                  shaanlabs
                </p>
              </div>
            </a>

            {/* Phone (click to reveal) */}
            <button
              onClick={() => setShowPhone(!showPhone)}
              className="glass-card holo-shimmer rounded-2xl p-6 flex items-center gap-4 group text-left"
            >
              <div
                className="w-12 h-12 rounded-xl glass-card-static
                            flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                style={{ boxShadow: '0 0 16px rgba(52, 211, 153, 0.15)' }}
              >
                <Phone className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <p className="text-text-muted text-xs uppercase tracking-wider mb-0.5">
                  Phone
                </p>
                {showPhone ? (
                  <p className="text-text-primary font-medium text-sm font-mono">
                    +91 7019874600
                  </p>
                ) : (
                  <p className="text-text-secondary text-sm flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5" />
                    Click to reveal
                  </p>
                )}
              </div>
            </button>
          </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="glass-card rounded-3xl p-8 border border-glass-border">
              <h3 className="font-heading text-xl font-bold text-text-primary mb-6">
                Send a Message
              </h3>
              
              {/* Replace action with your Formspree endpoint */}
              <form action="https://formspree.io/f/maewyedd" method="POST" className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="name" className="text-sm font-medium text-text-secondary ml-1">Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name" 
                      required
                      placeholder="John Doe"
                      className="w-full px-4 py-3 glass-card-static rounded-xl text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:border-accent/50 focus:shadow-[0_0_15px_rgba(99,102,241,0.15)] transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="email" className="text-sm font-medium text-text-secondary ml-1">Email</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      required
                      placeholder="john@example.com"
                      className="w-full px-4 py-3 glass-card-static rounded-xl text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:border-accent/50 focus:shadow-[0_0_15px_rgba(99,102,241,0.15)] transition-all"
                    />
                  </div>
                </div>
                
                <div className="space-y-1.5">
                  <label htmlFor="message" className="text-sm font-medium text-text-secondary ml-1">Message</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    required
                    rows={4}
                    placeholder="Tell me about your project..."
                    className="w-full px-4 py-3 glass-card-static rounded-xl text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:border-accent/50 focus:shadow-[0_0_15px_rgba(99,102,241,0.15)] transition-all resize-none"
                  />
                </div>
                
                <button 
                  type="submit"
                  className="btn-glow w-full py-4 rounded-xl text-white font-semibold flex items-center justify-center gap-2 mt-2"
                >
                  <Mail className="w-5 h-5" />
                  Send Message
                </button>
              </form>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
