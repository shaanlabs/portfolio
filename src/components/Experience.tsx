'use client';

import { Briefcase, Users, Rocket } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const experiences = [
  {
    role: 'Co-Founder',
    company: 'AtomNext Solutions',
    period: 'Jan 2025 – Jun 2026',
    location: 'Karnataka, India',
    type: 'Startup',
    icon: Rocket,
    accent: 'var(--accent)',
    bullets: [
      'Chatbot integration & AI-driven automation for multiple clients',
      'End-to-end delivery: client discovery → architecture → deployment → support',
      'Stepped away to pursue a full-time engineering role — bringing startup grit and ownership mindset',
    ],
  },
  {
    role: 'Mentor & Open Source Contributor',
    company: 'GirlScript Summer of Code',
    period: 'Aug 2025 – Oct 2025',
    location: 'Remote',
    type: 'Open Source',
    icon: Users,
    accent: 'var(--accent-tertiary)',
    bullets: [
      'Guided contributors through code reviews and project structuring',
      'Ran structured mentorship for community-driven open-source contributions',
    ],
  },
  {
    role: 'Backend Engineer Intern',
    company: 'Sada Smart Solutions LLP',
    period: 'May 2025 – Nov 2025',
    location: 'Bhatkal, Karnataka · On-site',
    type: 'Internship',
    icon: Briefcase,
    accent: 'var(--accent-secondary)',
    bullets: [
      'Built backend logic + REST APIs for a SaaS gym management platform (Node.js)',
      'On-page & off-page SEO optimization for client products',
      'Customized ERPNext & Frappe modules for workflow automation',
    ],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="section-label mb-4">Experience</div>
          <h2 className="font-heading text-4xl sm:text-5xl font-bold text-[var(--text-primary)] mb-12">
            Where I&apos;ve worked.
          </h2>
        </ScrollReveal>

        <div className="relative">
          {/* Timeline vertical line */}
          <div className="absolute left-[22px] top-0 bottom-0 w-px bg-[var(--border)] hidden sm:block" />

          <div className="space-y-6">
            {experiences.map((exp, index) => {
              const Icon = exp.icon;
              return (
                <ScrollReveal key={index} delay={index * 0.1}>
                  <div className="relative flex gap-6 sm:gap-10">
                    {/* Timeline icon */}
                    <div className="hidden sm:flex flex-shrink-0 w-11 h-11 items-center justify-center border-2 z-10 bg-[var(--bg)]"
                      style={{ borderColor: exp.accent }}>
                      <Icon className="w-4 h-4" style={{ color: exp.accent }} />
                    </div>

                    {/* Card */}
                    <div className="flex-1 border border-[var(--border)] hover:border-[var(--accent)] transition-colors group">
                      {/* Top accent */}
                      <div className="h-0.5" style={{ background: exp.accent }} />
                      <div className="p-6">
                        <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                          <div>
                            <h3 className="font-heading text-xl font-bold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
                              {exp.role}
                            </h3>
                            <p className="font-mono text-sm font-semibold mt-0.5" style={{ color: exp.accent }}>
                              {exp.company}
                            </p>
                          </div>
                          <div className="flex flex-col items-end gap-1">
                            <span className="font-mono text-xs text-[var(--text-muted)] bg-[var(--surface)] border border-[var(--border)] px-2 py-1">
                              {exp.period}
                            </span>
                            <span className="font-mono text-[10px] text-[var(--text-muted)]">
                              {exp.location}
                            </span>
                          </div>
                        </div>

                        <ul className="space-y-2">
                          {exp.bullets.map((bullet, i) => (
                            <li key={i} className="flex gap-3 text-[var(--text-secondary)] text-sm leading-relaxed">
                              <span className="mt-2 flex-shrink-0 w-1 h-1" style={{ background: exp.accent }} />
                              {bullet}
                            </li>
                          ))}
                        </ul>

                        <div className="mt-4">
                          <span
                            className="font-mono text-[10px] uppercase tracking-widest px-2 py-1"
                            style={{ background: exp.accent, color: '#000' }}
                          >
                            {exp.type}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
