'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, Mail, Github, Linkedin, ExternalLink } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const SOCIALS = [
  {
    label: 'GitHub',
    handle: '@shaanlabs',
    url: 'https://github.com/shaanlabs',
    icon: Github,
    accent: 'var(--text-primary)',
    desc: '64+ public repos',
  },
  {
    label: 'LinkedIn',
    handle: 'shaanif-ahmed',
    url: 'https://www.linkedin.com/in/shaanif-ahmed-765934233/',
    icon: Linkedin,
    accent: 'var(--accent)',
    desc: 'Let\'s connect professionally',
  },
  {
    label: 'Email',
    handle: 'shaaniffaqui@gmail.com',
    url: 'mailto:shaaniffaqui@gmail.com',
    icon: Mail,
    accent: 'var(--accent-secondary)',
    desc: 'Always checking this',
  },
];

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText('shaaniffaqui@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="py-24 relative">
      {/* Top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-[var(--border)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="section-label mb-4">Contact</div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* LEFT — Heading + email */}
          <ScrollReveal>
            <div>
              <h2 className="font-display text-[clamp(3rem,8vw,6rem)] leading-[0.9] text-[var(--text-primary)] mb-6">
                LET&apos;S<br />
                <span className="text-[var(--accent)]">BUILD</span><br />
                SOMETHING.
              </h2>
              <p className="font-body text-[var(--text-secondary)] text-base leading-relaxed mb-8 max-w-md">
                Whether it&apos;s a full-time role, a freelance project, or just a "hey, let&apos;s chat"
                — I&apos;m always down. My inbox is open.
              </p>

              {/* Email copy box */}
              <div className="border border-[var(--border)] hover:border-[var(--accent)] transition-colors group">
                <div className="border-b border-[var(--border)] px-4 py-2">
                  <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-widest">Primary contact</span>
                </div>
                <div className="flex items-center justify-between p-4 gap-4">
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-[var(--accent)] flex-shrink-0" />
                    <span className="font-mono text-sm text-[var(--text-primary)] break-all">
                      shaaniffaqui@gmail.com
                    </span>
                  </div>
                  <button
                    onClick={copyEmail}
                    className="flex items-center gap-1.5 px-3 py-1.5 border border-[var(--border)] 
                               font-mono text-xs text-[var(--text-secondary)] hover:border-[var(--accent)] 
                               hover:text-[var(--accent)] transition-all duration-200 flex-shrink-0"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3 h-3" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        Copy
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Status */}
              <div className="flex items-center gap-3 mt-6">
                <div className="status-dot" />
                <span className="font-mono text-xs text-[var(--success)]">
                  Available for full-time roles & freelance
                </span>
              </div>
            </div>
          </ScrollReveal>

          {/* RIGHT — Social links + contact form */}
          <ScrollReveal delay={0.1}>
            <div className="space-y-3">
              {SOCIALS.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.url}
                    target={social.url.startsWith('mailto') ? '_self' : '_blank'}
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-5 border border-[var(--border)] 
                               hover:border-[var(--accent)] group transition-all duration-200
                               hover:bg-[var(--surface-hover)]"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 flex items-center justify-center border border-[var(--border)] group-hover:border-[var(--accent)] transition-colors">
                        <Icon className="w-4 h-4 text-[var(--text-secondary)] group-hover:text-[var(--accent)] transition-colors" />
                      </div>
                      <div>
                        <div className="font-heading font-bold text-sm text-[var(--text-primary)]">{social.label}</div>
                        <div className="font-mono text-xs text-[var(--text-muted)]">{social.handle}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-[10px] text-[var(--text-muted)] hidden sm:block">{social.desc}</span>
                      <ExternalLink className="w-3.5 h-3.5 text-[var(--text-muted)] group-hover:text-[var(--accent)] transition-colors" />
                    </div>
                  </a>
                );
              })}

              {/* Quick contact form */}
              <div className="border border-[var(--border)] mt-6">
                <div className="border-b border-[var(--border)] px-5 py-3 flex items-center justify-between">
                  <span className="font-mono text-xs text-[var(--text-muted)] uppercase tracking-widest">Quick Message</span>
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[var(--accent-secondary)]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[var(--accent)]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[var(--accent-tertiary)]" />
                  </div>
                </div>
                <form
                  action="https://formspree.io/f/xwpkrpnp"
                  method="POST"
                  className="p-5 space-y-3"
                >
                  <input
                    type="text"
                    name="name"
                    placeholder="Your name"
                    required
                    className="w-full bg-[var(--surface-hover)] border border-[var(--border)] px-4 py-3
                               font-mono text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)]
                               focus:outline-none focus:border-[var(--accent)] transition-colors"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="your@email.com"
                    required
                    className="w-full bg-[var(--surface-hover)] border border-[var(--border)] px-4 py-3
                               font-mono text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)]
                               focus:outline-none focus:border-[var(--accent)] transition-colors"
                  />
                  <textarea
                    name="message"
                    placeholder="What's on your mind?"
                    rows={3}
                    required
                    className="w-full bg-[var(--surface-hover)] border border-[var(--border)] px-4 py-3
                               font-mono text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)]
                               focus:outline-none focus:border-[var(--accent)] transition-colors resize-none"
                  />
                  <button
                    type="submit"
                    className="btn-glow w-full py-3 text-xs font-bold uppercase tracking-widest"
                  >
                    Send Message →
                  </button>
                </form>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
