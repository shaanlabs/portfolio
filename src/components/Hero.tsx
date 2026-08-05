'use client';

import { motion } from 'framer-motion';
import { ArrowDown, Download, Sparkles } from 'lucide-react';
import GitHubIcon from './icons/GitHubIcon';
import LinkedInIcon from './icons/LinkedInIcon';
import DotGrid from './DotGrid';
import Typewriter from './Typewriter';
import AnimatedCounter from './AnimatedCounter';
import MagneticButton from './MagneticButton';

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Aurora gradient background */}
      <div className="absolute inset-0 bg-[image:var(--gradient-hero)]" />

      {/* Floating orbs */}
      <div className="orb orb-indigo w-[500px] h-[500px] top-[-150px] right-[-100px] opacity-40" />
      <div className="orb orb-cyan w-[400px] h-[400px] bottom-[-100px] left-[-80px] opacity-30" />
      <div className="orb orb-purple w-[300px] h-[300px] top-[40%] left-[60%] opacity-20" />

      {/* Interactive dot grid */}
      <DotGrid />

      {/* Fade to background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 w-full">
        <div className="max-w-3xl">
          {/* Open to work badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="glass-card-static inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full mb-8">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-success" />
              </span>
              <span className="text-sm font-medium text-success">
                Open to Work — Seeking Backend / Full-Stack Roles
              </span>
            </div>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-heading text-4xl sm:text-5xl lg:text-7xl font-bold
                       text-text-primary leading-tight mb-6 min-h-[3em] sm:min-h-[2.5em] lg:min-h-0"
          >
            Hi, I&apos;m{' '}
            <Typewriter text="Shaanif Ahmed" delay={1500} className="gradient-text inline-block" />
          </motion.h1>

          {/* Role */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-mono text-lg sm:text-xl text-accent flex items-center gap-2 mb-4"
          >
            <Sparkles className="w-5 h-5" />
            Backend &amp; Full-Stack Developer
          </motion.p>

          {/* Summary */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-text-secondary text-base sm:text-lg leading-relaxed
                       max-w-2xl mb-10"
          >
            I build reliable backend systems, REST APIs, and SaaS platforms with
            Python, Node.js, and modern frameworks. Co-founded an AI startup,
            shipped ERP customizations for real clients, and I&apos;m looking for
            a team to build with next.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap gap-4"
          >
            <MagneticButton>
              <a
                href="#projects"
                className="btn-glow inline-flex items-center gap-2 px-7 py-3.5
                           rounded-full text-white font-semibold text-sm"
              >
                View Projects
                <ArrowDown className="w-4 h-4" />
              </a>
            </MagneticButton>
            
            <MagneticButton strength={10}>
              <a
                href="/Shaanif_Ahmed_Resume.docx"
                download
                className="glass-card-static inline-flex items-center gap-2 px-7 py-3.5
                           text-text-primary font-semibold rounded-full text-sm
                           transition-all duration-300 hover:border-border-hover
                           hover:shadow-lg"
              >
                <Download className="w-4 h-4" />
                Download Resume
              </a>
            </MagneticButton>

            <MagneticButton strength={10}>
              <a
                href="https://github.com/shaanlabs"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card-static inline-flex items-center gap-2 px-6 py-3.5
                           text-text-primary font-semibold rounded-full text-sm
                           transition-all duration-300 hover:border-border-hover"
              >
                <GitHubIcon className="w-4 h-4" />
                GitHub
              </a>
            </MagneticButton>

            <MagneticButton strength={10}>
              <a
                href="https://www.linkedin.com/in/shaanif-ahmed-765934233/"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card-static inline-flex items-center gap-2 px-6 py-3.5
                           text-text-primary font-semibold rounded-full text-sm
                           transition-all duration-300 hover:border-border-hover"
              >
                <LinkedInIcon className="w-4 h-4" />
                LinkedIn
              </a>
            </MagneticButton>
          </motion.div>

          {/* GitHub Activity Strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-16 flex flex-wrap items-center gap-4 sm:gap-6 text-text-muted text-sm font-mono"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span>
                <AnimatedCounter value={63} suffix="+" duration={2} /> Public Repos
              </span>
            </div>
            <div className="hidden sm:block h-4 w-px bg-border" />
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-accent-secondary" />
              <span>Python • JavaScript • TypeScript</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          className="glass-card-static w-10 h-10 rounded-full flex items-center justify-center"
        >
          <ArrowDown className="w-4 h-4 text-text-muted" />
        </motion.div>
      </motion.div>
    </section>
  );
}
