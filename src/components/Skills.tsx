'use client';

import {
  Code2,
  Database,
  Cloud,
  Globe,
  Wrench,
  Cpu,
  BrainCircuit,
} from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import TiltCard from './TiltCard';

const skillCategories = [
  {
    name: 'Languages',
    icon: Code2,
    accentColor: 'text-blue-400',
    glowColor: 'rgba(96, 165, 250, 0.15)',
    skills: ['Python', 'SQL', 'Core Java', 'JavaScript'],
  },
  {
    name: 'ERP & Business Apps',
    icon: Cpu,
    accentColor: 'text-accent',
    glowColor: 'rgba(99, 102, 241, 0.15)',
    skills: ['ERPNext', 'Odoo', 'Frappe', 'HRMS', 'CRM'],
  },
  {
    name: 'Databases',
    icon: Database,
    accentColor: 'text-emerald-400',
    glowColor: 'rgba(52, 211, 153, 0.15)',
    skills: ['PostgreSQL', 'MySQL', 'MariaDB', 'SQLite'],
  },
  {
    name: 'Cloud & DevOps',
    icon: Cloud,
    accentColor: 'text-violet-400',
    glowColor: 'rgba(167, 139, 250, 0.15)',
    skills: ['AWS', 'Docker', 'Nginx'],
  },
  {
    name: 'Web Development',
    icon: Globe,
    accentColor: 'text-accent-secondary',
    glowColor: 'rgba(34, 211, 238, 0.15)',
    skills: ['FastAPI', 'Django', 'Flask', 'Node.js', 'HTML', 'CSS', 'Vercel', 'cPanel', 'SEO'],
  },
  {
    name: 'Tools',
    icon: Wrench,
    accentColor: 'text-amber-400',
    glowColor: 'rgba(251, 191, 36, 0.15)',
    skills: ['Git', 'Postman', 'VS Code', 'Google Colab', 'Cursor'],
  },
  {
    name: 'Gen AI',
    icon: BrainCircuit,
    accentColor: 'text-accent-tertiary',
    glowColor: 'rgba(192, 132, 252, 0.15)',
    skills: ['HuggingFace', 'Ollama'],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-text-primary mb-4">
              Technical <span className="gradient-text">Skills</span>
            </h2>
            <div className="w-16 h-1 bg-[image:var(--gradient-accent)] mx-auto rounded-full" />
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {skillCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <ScrollReveal key={category.name} delay={index * 0.08}>
                <TiltCard maxTilt={5} className="h-full">
                  <div className="glass-card holo-shimmer rounded-2xl p-6 h-full">
                    <div className="flex items-center gap-3 mb-5">
                      <div
                        className="w-11 h-11 rounded-xl glass-card-static
                                    flex items-center justify-center"
                        style={{ boxShadow: `0 0 16px ${category.glowColor}` }}
                      >
                        <Icon className={`w-5 h-5 ${category.accentColor}`} />
                      </div>
                      <h3 className="font-heading text-base font-bold text-text-primary">
                        {category.name}
                      </h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1.5 text-xs font-mono
                                     glass-card-static rounded-lg
                                     text-text-secondary
                                     hover:text-accent hover:border-border-hover
                                     hover:scale-105 transition-all duration-300 cursor-default"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </TiltCard>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
