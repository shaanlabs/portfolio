'use client';

import { Briefcase, Users, Rocket } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const experiences = [
  {
    role: 'Co-Founder',
    company: 'AtomNext Solutions',
    period: 'Jan 2025 – Jun 2026',
    location: 'Karnataka, India',
    icon: Rocket,
    gradientFrom: 'from-indigo-500',
    gradientTo: 'to-purple-500',
    accentColor: 'text-accent',
    glowColor: 'rgba(99, 102, 241, 0.15)',
    bullets: [
      'Chatbot integration & AI-driven automation for multiple clients',
      'End-to-end delivery: client discovery → architecture → deployment → support',
      'Stepped away to pursue a dedicated full-time engineering role — bringing entrepreneurial ownership to the next team',
    ],
  },
  {
    role: 'Mentor & Open Source Contributor',
    company: 'GirlScript Summer of Code',
    period: 'Aug 2025 – Oct 2025',
    location: 'Remote',
    icon: Users,
    gradientFrom: 'from-cyan-500',
    gradientTo: 'to-teal-500',
    accentColor: 'text-accent-secondary',
    glowColor: 'rgba(6, 182, 212, 0.15)',
    bullets: [
      'Guided contributors through code reviews and project structuring',
      'Ran structured mentorship sessions for community-driven open-source contributions',
    ],
  },
  {
    role: 'Intern',
    company: 'Sada Smart Solutions LLP',
    period: 'May 2025 – Nov 2025',
    location: 'Bhatkal, Karnataka (On-site)',
    icon: Briefcase,
    gradientFrom: 'from-violet-500',
    gradientTo: 'to-fuchsia-500',
    accentColor: 'text-accent-tertiary',
    glowColor: 'rgba(168, 85, 247, 0.15)',
    bullets: [
      'Built backend logic + REST APIs for a SaaS gym management platform (Node.js)',
      'On-page/off-page SEO optimization for client products',
      'Customized ERPNext & Frappe modules for workflow automation',
    ],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="py-24 relative aurora-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-text-primary mb-4">
              Work <span className="gradient-text">Experience</span>
            </h2>
            <div className="w-16 h-1 bg-[image:var(--gradient-accent)] mx-auto rounded-full" />
          </div>
        </ScrollReveal>

        <div className="relative max-w-3xl mx-auto">
          {/* Timeline line — gradient */}
          <div
            className="absolute left-8 top-0 bottom-0 w-px hidden sm:block"
            style={{
              background: 'linear-gradient(180deg, var(--accent), var(--accent-secondary), var(--accent-tertiary))',
              opacity: 0.3,
            }}
          />

          <div className="space-y-12">
            {experiences.map((exp, index) => {
              const Icon = exp.icon;
              return (
                <ScrollReveal key={index} delay={index * 0.15}>
                  <div className="relative flex gap-6 sm:gap-8">
                    {/* Timeline dot */}
                    <div className="hidden sm:flex flex-shrink-0 w-16 justify-center">
                      <div
                        className="w-11 h-11 rounded-xl glass-card-static
                                    flex items-center justify-center z-10"
                        style={{ boxShadow: `0 0 20px ${exp.glowColor}` }}
                      >
                        <Icon className={`w-5 h-5 ${exp.accentColor}`} />
                      </div>
                    </div>

                    {/* Content */}
                    <div
                      className="flex-1 glass-card holo-shimmer rounded-2xl p-6 sm:p-8"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-2 mb-4">
                        <div>
                          <h3 className="font-heading text-xl font-bold text-text-primary">
                            {exp.role}
                          </h3>
                          <p className={`font-medium ${exp.accentColor}`}>
                            {exp.company}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-text-muted font-mono">
                            {exp.period}
                          </p>
                          <p className="text-sm text-text-muted">
                            {exp.location}
                          </p>
                        </div>
                      </div>
                      <ul className="space-y-3">
                        {exp.bullets.map((bullet, i) => (
                          <li
                            key={i}
                            className="flex gap-3 text-text-secondary text-sm leading-relaxed"
                          >
                            <span className={`mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-accent`} />
                            {bullet}
                          </li>
                        ))}
                      </ul>
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
