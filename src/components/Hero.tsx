'use client';

import { motion } from 'framer-motion';
import { ArrowDown, Download } from 'lucide-react';
import GitHubIcon from './icons/GitHubIcon';
import LinkedInIcon from './icons/LinkedInIcon';
import DotGrid from './DotGrid';
import AnimatedCounter from './AnimatedCounter';

const ROLES = ['Backend Engineer', 'Data Scientist', 'Freelancer', 'ERP Developer', 'Full-Stack Builder'];

const MARQUEE_ITEMS = [
  '★ OPEN TO WORK', '■ BACKEND ENGINEER', '★ DATA SCIENTIST', '■ PYTHON', '★ FREELANCER',
  '■ NODE.JS', '★ FASTAPI', '■ DOCKER', '★ POSTGRESQL', '■ ERPNEXT', '★ FULL-STACK',
  '■ OPEN TO WORK', '★ BACKEND ENGINEER', '■ DATA SCIENTIST', '★ PYTHON', '■ FREELANCER',
  '★ NODE.JS', '■ FASTAPI', '★ DOCKER', '■ POSTGRESQL', '★ ERPNEXT', '■ FULL-STACK',
];

const BOTTOM_MARQUEE = [
  'Python', 'JavaScript', 'TypeScript', 'Node.js', 'FastAPI', 'Django', 'Flask',
  'PostgreSQL', 'MySQL', 'Docker', 'AWS', 'ERPNext', 'Frappe', 'React', 'Next.js',
  'HuggingFace', 'TensorFlow', 'Pandas', 'NumPy', 'Git', 'Linux', 'Nginx', 'Redis',
  'Python', 'JavaScript', 'TypeScript', 'Node.js', 'FastAPI', 'Django', 'Flask',
  'PostgreSQL', 'MySQL', 'Docker', 'AWS', 'ERPNext', 'Frappe', 'React', 'Next.js',
];

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 grid-bg pointer-events-none" />
      {/* Gradient fade */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background pointer-events-none" />

      {/* Dot Grid */}
      <DotGrid />

      {/* TOP MARQUEE */}
      <div className="relative z-20 w-full border-b border-[var(--border)] overflow-hidden bg-[var(--accent)] mt-16">
        <div className="marquee-track py-2">
          {MARQUEE_ITEMS.map((item, i) => (
            <span key={i} className="px-6 text-black font-mono font-bold text-xs tracking-widest uppercase whitespace-nowrap">
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* MAIN HERO CONTENT */}
      <div className="relative z-10 flex-1 flex items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center w-full">
          
          {/* LEFT — Typography */}
          <div>
            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="status-dot" />
              <span className="font-mono text-xs text-[var(--success)] tracking-widest uppercase">
                Available for work — Based in Karnataka, India
              </span>
            </motion.div>

            {/* HUGE NAME */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative mb-4"
            >
              <h1
                className="font-display text-[clamp(4rem,14vw,10rem)] leading-[0.88] tracking-tight text-[var(--text-primary)] select-none glitch"
                data-text="SHAANIF"
              >
                SHAANIF
              </h1>
              <h1
                className="font-display text-[clamp(4rem,14vw,10rem)] leading-[0.88] tracking-tight text-[var(--accent)] select-none"
              >
                AHMED.
              </h1>
            </motion.div>

            {/* Animated role */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mb-8"
            >
              <RoleCycler roles={ROLES} />
            </motion.div>

            {/* Bio */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-[var(--text-secondary)] text-base leading-relaxed max-w-md mb-10 font-body"
            >
              Fresh grad. <mark>64+ repos</mark> shipped. Built SaaS platforms,
              AI chatbots, ERP systems & data pipelines. Co-founded a startup.
              Now looking for a team to build the next big thing with.
            </motion.p>

            {/* CTA Row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-wrap gap-3 mb-10"
            >
              <a
                href="#projects"
                className="btn-glow inline-flex items-center gap-2 px-6 py-3 text-sm font-bold uppercase tracking-wider rounded-none"
              >
                View Work ↗
              </a>
              <a
                href="/Shaanif_Ahmed_Resume.docx"
                download
                className="btn-outline inline-flex items-center gap-2 px-6 py-3 text-sm font-bold uppercase tracking-wider rounded-none"
              >
                <Download className="w-4 h-4" />
                Grab CV
              </a>
              <a
                href="https://github.com/shaanlabs"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline inline-flex items-center gap-2 px-4 py-3 text-sm font-bold rounded-none"
              >
                <GitHubIcon className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/shaanif-ahmed-765934233/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline inline-flex items-center gap-2 px-4 py-3 text-sm font-bold rounded-none"
              >
                <LinkedInIcon className="w-4 h-4" />
              </a>
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-wrap gap-6"
            >
              {[
                { label: 'Public Repos', value: 64, suffix: '+' },
                { label: 'Year Exp', value: 1, suffix: 'yr' },
                { label: 'Projects Live', value: 8, suffix: '+' },
              ].map((stat) => (
                <div key={stat.label} className="border-l-2 border-[var(--accent)] pl-3">
                  <div className="font-display text-3xl text-[var(--text-primary)] leading-none">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} duration={2} />
                  </div>
                  <div className="font-mono text-xs text-[var(--text-muted)] uppercase tracking-widest mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT — Avatar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2, type: 'spring' }}
            className="flex flex-col items-center gap-6 lg:items-end"
          >
            <div className="relative">
              {/* Spinning border */}
              <div
                className="absolute -inset-4 rounded-none animate-spin-slow opacity-60"
                style={{
                  background: 'conic-gradient(from 0deg, #DFFF00, transparent, #FF2D55, transparent, #00FF88, transparent, #DFFF00)',
                }}
              />
              {/* Avatar */}
              <div className="relative w-64 h-64 lg:w-80 lg:h-80 border-2 border-[var(--accent)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://avatars.githubusercontent.com/u/170077104?v=4"
                  alt="Shaanif Ahmed"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                />
                {/* Corner accents */}
                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[var(--accent-secondary)] -translate-y-2 translate-x-2" />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[var(--accent-tertiary)] translate-y-2 -translate-x-2" />
                {/* Overlay label */}
                <div className="absolute bottom-0 left-0 right-0 bg-[var(--accent)] p-2 text-center">
                  <span className="font-mono text-xs font-bold text-black uppercase tracking-widest">
                    shaanlabs @ github
                  </span>
                </div>
              </div>
            </div>

            {/* Tech GIF-style animated badge */}
            <div className="border border-[var(--border)] p-4 bg-[var(--surface)] w-64 lg:w-80">
              <div className="font-mono text-xs text-[var(--text-muted)] mb-2">// currently</div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[var(--success)] rounded-full animate-ping-slow" />
                <span className="text-sm font-semibold text-[var(--text-primary)]">
                  Open to opportunities
                </span>
              </div>
              <div className="mt-3 flex gap-2 flex-wrap">
                {['Backend', 'Data Sci', 'ERP', 'Freelance'].map(tag => (
                  <span key={tag} className="tag-chip text-[10px]">{tag}</span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* BOTTOM TECH MARQUEE */}
      <div className="relative z-20 w-full border-t border-[var(--border)] overflow-hidden">
        <div className="marquee-track-reverse py-3">
          {BOTTOM_MARQUEE.map((item, i) => (
            <span key={i} className="px-4 text-[var(--text-muted)] font-mono text-xs uppercase tracking-widest whitespace-nowrap">
              {item} <span className="text-[var(--border)] mx-2">•</span>
            </span>
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
      >
        <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-widest">scroll</span>
        <ArrowDown className="w-4 h-4 text-[var(--text-muted)] animate-scroll-down" />
      </motion.div>
    </section>
  );
}

/* ─── Role Cycler ─── */
function RoleCycler({ roles }: { roles: string[] }) {
  return <RoleCyclerClient roles={roles} />;
}

function RoleCyclerClient({ roles }: { roles: string[] }) {
  const [idx, setIdx] = React.useState(0);
  const [visible, setVisible] = React.useState(true);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIdx(prev => (prev + 1) % roles.length);
        setVisible(true);
      }, 300);
    }, 2500);
    return () => clearInterval(interval);
  }, [roles.length]);

  return (
    <div className="font-mono text-base text-[var(--text-secondary)] flex items-center gap-2 h-6">
      <span className="text-[var(--accent)]">~/</span>
      <span
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(8px)',
          transition: 'all 0.3s ease',
        }}
      >
        {roles[idx]}
      </span>
      <span className="animate-text-flash text-[var(--accent)]">_</span>
    </div>
  );
}

// Need React import for hooks in the cycler
import React from 'react';
