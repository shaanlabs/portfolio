'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Code2, Database, Cloud, Globe, Wrench, Cpu, BrainCircuit,
} from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const SKILL_MARQUEE_1 = [
  'Python', 'JavaScript', 'TypeScript', 'SQL', 'Java', 'FastAPI', 'Django', 'Flask',
  'Node.js', 'React', 'Next.js', 'PostgreSQL', 'MySQL', 'MariaDB', 'MongoDB',
  'Docker', 'Nginx', 'AWS', 'Linux', 'Git', 'Postman', 'ERPNext', 'Frappe', 'Odoo',
  'TensorFlow', 'PyTorch', 'HuggingFace', 'Pandas', 'NumPy', 'Scikit-learn',
  'Python', 'JavaScript', 'TypeScript', 'SQL', 'Java', 'FastAPI', 'Django', 'Flask',
  'Node.js', 'React', 'Next.js', 'PostgreSQL', 'MySQL', 'MariaDB', 'MongoDB',
  'Docker', 'Nginx', 'AWS', 'Linux', 'Git', 'Postman', 'ERPNext', 'Frappe', 'Odoo',
  'TensorFlow', 'PyTorch', 'HuggingFace', 'Pandas', 'NumPy', 'Scikit-learn',
];

const skillCategories = [
  {
    name: 'Languages',
    icon: Code2,
    color: '#DFFF00',
    skills: ['Python', 'SQL', 'JavaScript', 'Core Java'],
    level: 90,
  },
  {
    name: 'ERP & Business',
    icon: Cpu,
    color: '#FF2D55',
    skills: ['ERPNext', 'Odoo', 'Frappe', 'HRMS', 'CRM'],
    level: 85,
  },
  {
    name: 'Databases',
    icon: Database,
    color: '#00FF88',
    skills: ['PostgreSQL', 'MySQL', 'MariaDB', 'SQLite'],
    level: 80,
  },
  {
    name: 'Cloud & DevOps',
    icon: Cloud,
    color: '#DFFF00',
    skills: ['AWS', 'Docker', 'Nginx', 'Linux'],
    level: 70,
  },
  {
    name: 'Web Dev',
    icon: Globe,
    color: '#FF2D55',
    skills: ['FastAPI', 'Django', 'Flask', 'Node.js', 'React', 'Next.js'],
    level: 88,
  },
  {
    name: 'Tools',
    icon: Wrench,
    color: '#00FF88',
    skills: ['Git', 'Postman', 'VS Code', 'Google Colab', 'Cursor'],
    level: 95,
  },
  {
    name: 'Gen AI',
    icon: BrainCircuit,
    color: '#DFFF00',
    skills: ['HuggingFace', 'Ollama', 'TensorFlow', 'Pandas', 'NumPy'],
    level: 72,
  },
];

export default function Skills() {
  return (
    <section id="skills" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="section-label mb-4">Tech Stack</div>
          <h2 className="font-heading text-4xl sm:text-5xl font-bold text-[var(--text-primary)] mb-12">
            What I work with.
          </h2>
        </ScrollReveal>

        {/* SKILLS MARQUEE */}
        <ScrollReveal delay={0.05}>
          <div className="border border-[var(--border)] overflow-hidden mb-12">
            <div className="marquee-wrapper py-4 bg-[var(--surface)]">
              <div className="marquee-track">
                {SKILL_MARQUEE_1.map((skill, i) => (
                  <span key={i} className="px-5 font-mono text-sm font-semibold text-[var(--text-secondary)] uppercase tracking-wider whitespace-nowrap hover:text-[var(--accent)] cursor-default transition-colors">
                    {skill}
                    <span className="text-[var(--border)] mx-4">■</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* SKILL CARDS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {skillCategories.map((cat, index) => {
            const Icon = cat.icon;
            return (
              <ScrollReveal key={cat.name} delay={index * 0.06}>
                <SkillCard cat={cat} Icon={Icon} />
              </ScrollReveal>
            );
          })}

          {/* "I'm always learning" card */}
          <ScrollReveal delay={skillCategories.length * 0.06}>
            <div className="bento-card p-6 border-dashed flex flex-col items-center justify-center text-center min-h-[200px] hover:border-[var(--accent)] transition-colors">
              <div className="text-3xl mb-3 animate-float">🚀</div>
              <div className="font-heading font-bold text-sm text-[var(--text-primary)] mb-2">Always Learning</div>
              <div className="font-mono text-xs text-[var(--text-muted)]">
                Currently exploring Rust, LLMs & distributed systems
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

function SkillCard({ cat, Icon }: { cat: typeof skillCategories[0]; Icon: React.ElementType }) {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="bento-card p-5 hover:border-[var(--accent)] group cursor-default">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 flex items-center justify-center border border-[var(--border)] group-hover:border-current transition-colors"
            style={{ color: cat.color }}
          >
            <Icon className="w-4 h-4" />
          </div>
          <h3 className="font-mono text-xs font-bold text-[var(--text-primary)] uppercase tracking-wide">
            {cat.name}
          </h3>
        </div>
        <span className="font-mono text-xs" style={{ color: cat.color }}>{cat.level}%</span>
      </div>

      {/* Skill Bar */}
      <div className="skill-bar mb-4">
        <motion.div
          className="skill-bar-fill"
          style={{ background: cat.color }}
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: cat.level / 100 } : { scaleX: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
        />
      </div>

      {/* Skills */}
      <div className="flex flex-wrap gap-1.5">
        {cat.skills.map(skill => (
          <span key={skill} className="tag-chip text-[10px] hover:border-[var(--accent)] hover:text-[var(--accent)]">
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

import React from 'react';
