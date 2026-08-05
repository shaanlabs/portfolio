'use client';

import { Award, ExternalLink } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import TiltCard from './TiltCard';

const certificates = [
  {
    name: 'AWS Certified Cloud Practitioner',
    issuer: 'Amazon Web Services',
    date: 'Dec 2024',
    url: '#', // Replace with real URL
    gradient: 'from-amber-500 to-orange-500',
    iconColor: 'text-amber-500',
    glow: 'rgba(245, 158, 11, 0.15)',
  },
  {
    name: 'Meta Back-End Developer Certificate',
    issuer: 'Coursera',
    date: 'Oct 2024',
    url: '#', // Replace with real URL
    gradient: 'from-blue-500 to-cyan-500',
    iconColor: 'text-blue-500',
    glow: 'rgba(59, 130, 246, 0.15)',
  },
  {
    name: 'Python for Data Science',
    issuer: 'IBM',
    date: 'Aug 2024',
    url: '#',
    gradient: 'from-indigo-500 to-purple-500',
    iconColor: 'text-indigo-500',
    glow: 'rgba(99, 102, 241, 0.15)',
  }
];

export default function Certificates() {
  return (
    <section id="certificates" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-text-primary mb-4">
              Licenses & <span className="gradient-text">Certifications</span>
            </h2>
            <div className="w-16 h-1 bg-[image:var(--gradient-accent)] mx-auto rounded-full" />
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert, index) => (
            <ScrollReveal key={cert.name} delay={index * 0.1}>
              <TiltCard maxTilt={5} className="h-full">
                <a 
                  href={cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block h-full glass-card holo-shimmer rounded-2xl p-6 group"
                >
                  <div className="flex items-start gap-4">
                    <div 
                      className="w-12 h-12 rounded-xl glass-card-static flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
                      style={{ boxShadow: `0 0 20px ${cert.glow}` }}
                    >
                      <Award className={`w-6 h-6 ${cert.iconColor}`} />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-heading text-lg font-bold text-text-primary mb-1 truncate group-hover:text-accent transition-colors">
                        {cert.name}
                      </h3>
                      <p className="text-text-secondary font-medium text-sm mb-1">
                        {cert.issuer}
                      </p>
                      <div className="flex items-center justify-between mt-3">
                        <p className="text-text-muted text-xs font-mono">
                          {cert.date}
                        </p>
                        <ExternalLink className="w-4 h-4 text-text-muted opacity-0 group-hover:opacity-100 transition-all transform translate-y-1 group-hover:translate-y-0" />
                      </div>
                    </div>
                  </div>
                </a>
              </TiltCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
