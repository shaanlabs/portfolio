'use client';

import { motion } from 'framer-motion';
import ScrollReveal from './ScrollReveal';

const STACK_MARQUEE = [
  'Python', 'Node.js', 'FastAPI', 'Django', 'React', 'TypeScript', 'PostgreSQL',
  'Docker', 'AWS', 'ERPNext', 'TensorFlow', 'Git', 'Linux', 'Nginx', 'Redis',
  'Python', 'Node.js', 'FastAPI', 'Django', 'React', 'TypeScript', 'PostgreSQL',
  'Docker', 'AWS', 'ERPNext', 'TensorFlow', 'Git', 'Linux', 'Nginx', 'Redis',
];

const FUN_FACTS = [
  '64+ public repos',
  'BCA CGPA: 8.64',
  'Co-founded a startup',
  'Mentored open-source contributors',
  'Deployed to production',
  'Coffee-powered developer',
];

export default function About() {
  return (
    <section id="about" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section label */}
        <ScrollReveal>
          <div className="section-label mb-10">About Me</div>
        </ScrollReveal>

        {/* BENTO GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 auto-rows-auto">

          {/* Card 1 — Avatar + quick stats (spans 2 cols x 2 rows) */}
          <ScrollReveal delay={0}>
            <div className="bento-card sm:col-span-2 lg:col-span-2 lg:row-span-2 p-6 flex flex-col">
              <div className="flex items-start gap-4 mb-6">
                <div className="relative w-20 h-20 flex-shrink-0 border-2 border-[var(--accent)]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://avatars.githubusercontent.com/u/170077104?v=4"
                    alt="Shaanif Ahmed"
                    className="w-full h-full object-cover grayscale"
                  />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-xl text-[var(--text-primary)]">Shaanif Ahmed</h3>
                  <p className="font-mono text-xs text-[var(--accent)] mt-1">@shaanlabs</p>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="status-dot" />
                    <span className="font-mono text-xs text-[var(--success)]">Open to work</span>
                  </div>
                </div>
              </div>
              <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-4">
                I&apos;m a backend-focused developer from Karnataka, India. I build things that <span className="text-[var(--text-primary)] font-semibold">actually work</span> — REST APIs, SaaS platforms, ERP systems, and AI-powered tools.
              </p>
              <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-6">
                In early 2025, I co-founded <span className="text-[var(--accent)] font-semibold">AtomNext Solutions</span>, owning end-to-end client delivery from discovery to deployment. I stepped away in mid-2026 to focus on a full-time engineering role — bringing startup grit and a bias for shipping.
              </p>
              {/* Quick stats grid */}
              <div className="grid grid-cols-2 gap-2 mt-auto">
                {[
                  { label: 'Public Repos', value: '64+' },
                  { label: 'Years Exp', value: '1yr' },
                  { label: 'BCA CGPA', value: '8.64' },
                  { label: 'Projects Live', value: '8+' },
                ].map(stat => (
                  <div key={stat.label} className="bg-[var(--surface-hover)] border border-[var(--border)] p-3">
                    <div className="font-display text-2xl text-[var(--accent)]">{stat.value}</div>
                    <div className="font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-widest">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Card 2 — Location + Time */}
          <ScrollReveal delay={0.05}>
            <div className="bento-card p-5 flex flex-col justify-between h-full min-h-[140px]">
              <div>
                <div className="font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-widest mb-2">📍 Location</div>
                <div className="font-heading font-bold text-lg text-[var(--text-primary)]">Karnataka, India</div>
                <div className="font-mono text-xs text-[var(--text-secondary)] mt-1">UTC +5:30</div>
              </div>
              <div className="font-mono text-xs text-[var(--accent)] mt-4">
                <LiveClock />
              </div>
            </div>
          </ScrollReveal>

          {/* Card 3 — Status */}
          <ScrollReveal delay={0.08}>
            <div className="bento-card p-5 border-[var(--accent)] bg-[var(--accent)] h-full min-h-[140px] flex flex-col justify-between">
              <div className="font-mono text-[10px] text-black/60 uppercase tracking-widest mb-2">Status</div>
              <div>
                <div className="font-display text-4xl text-black leading-none">HIRE</div>
                <div className="font-display text-4xl text-black leading-none">ME.</div>
              </div>
              <div className="font-mono text-[10px] text-black/70 mt-3">Actively seeking backend / data roles</div>
            </div>
          </ScrollReveal>

          {/* Card 4 — Fun GIF-like animated card */}
          <ScrollReveal delay={0.1}>
            <div className="bento-card p-5 flex flex-col items-center justify-center h-full min-h-[140px] relative overflow-hidden">
              <div className="font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-widest mb-3 self-start">// currently coding</div>
              {/* Animated "GIF-like" terminal */}
              <AnimatedTerminalGif />
            </div>
          </ScrollReveal>

          {/* Card 5 — Fun fact cycling */}
          <ScrollReveal delay={0.12}>
            <div className="bento-card p-5 flex flex-col h-full min-h-[140px]">
              <div className="font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-widest mb-3">Fun Facts</div>
              <FunFactCycler facts={FUN_FACTS} />
            </div>
          </ScrollReveal>

          {/* Card 6 — Education */}
          <ScrollReveal delay={0.14}>
            <div className="bento-card sm:col-span-2 p-5 flex flex-col h-full min-h-[140px]">
              <div className="font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-widest mb-3">🎓 Education</div>
              <div className="font-heading font-bold text-sm text-[var(--text-primary)]">Bachelor&apos;s of Computer Application</div>
              <div className="text-xs text-[var(--text-secondary)] mt-1">Anjuman Institute of Management & Computer Application, Bhatkal</div>
              <div className="flex items-center gap-3 mt-3">
                <span className="tag-chip">CGPA 8.64</span>
                <span className="tag-chip">2023–2026</span>
                <span className="tag-chip">BCA</span>
              </div>
            </div>
          </ScrollReveal>

        </div>

        {/* TECH STACK MARQUEE */}
        <ScrollReveal delay={0.2}>
          <div className="mt-6 border border-[var(--border)] overflow-hidden">
            <div className="border-b border-[var(--border)] px-4 py-2">
              <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-widest">Tech Stack</span>
            </div>
            <div className="marquee-wrapper py-3">
              <div className="marquee-track">
                {STACK_MARQUEE.map((tech, i) => (
                  <span key={i} className="px-6 font-mono text-xs text-[var(--text-secondary)] uppercase tracking-wider whitespace-nowrap">
                    {tech} <span className="text-[var(--accent)] mx-3">·</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ─── Live Clock ─── */
function LiveClock() {
  const [time, setTime] = React.useState('');
  React.useEffect(() => {
    const update = () => setTime(new Date().toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata', hour12: false }));
    update();
    const t = setInterval(update, 1000);
    return () => clearInterval(t);
  }, []);
  return <span>{time}</span>;
}

/* ─── Animated "GIF-like" terminal ─── */
function AnimatedTerminalGif() {
  const lines = [
    '$ python app.py',
    '> Server running :8000',
    '$ git commit -m "ship it"',
    '> [main] feature done',
    '$ docker build .',
    '> Successfully built ✓',
  ];
  const [lineIdx, setLineIdx] = React.useState(0);

  React.useEffect(() => {
    const t = setInterval(() => {
      setLineIdx(prev => (prev + 1) % lines.length);
    }, 1200);
    return () => clearInterval(t);
  }, [lines.length]);

  return (
    <div className="w-full bg-black border border-[var(--border)] p-3 font-mono text-xs">
      <div className="text-[var(--text-muted)] mb-1">shaanif@portfolio:~</div>
      <motion.div
        key={lineIdx}
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        className={lineIdx % 2 === 0 ? 'text-[var(--accent)]' : 'text-[var(--accent-tertiary)]'}
      >
        {lines[lineIdx]}
      </motion.div>
    </div>
  );
}

/* ─── Fun Fact Cycler ─── */
function FunFactCycler({ facts }: { facts: string[] }) {
  const [idx, setIdx] = React.useState(0);
  const [visible, setVisible] = React.useState(true);

  React.useEffect(() => {
    const t = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIdx(prev => (prev + 1) % facts.length);
        setVisible(true);
      }, 250);
    }, 2000);
    return () => clearInterval(t);
  }, [facts.length]);

  return (
    <div className="flex-1 flex items-center">
      <div
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(6px)',
          transition: 'all 0.25s ease',
        }}
        className="font-heading text-base font-bold text-[var(--text-primary)]"
      >
        {facts[idx]}
      </div>
    </div>
  );
}

import React from 'react';
