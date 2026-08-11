'use client';

import { motion } from 'framer-motion';
import ScrollReveal from './ScrollReveal';

const testimonials = [
  {
    name: 'Rishab M.',
    role: 'CTO @ Sada Smart Solutions',
    avatar: '🧑‍💼',
    text: 'Shaanif joined as an intern but quickly started shipping features that our senior devs hadn\'t gotten around to. Rare combination of backend depth and ERP fluency at this stage.',
    accent: 'var(--accent)',
  },
  {
    name: 'Farheen K.',
    role: 'Open Source Contributor',
    avatar: '👩‍💻',
    text: 'As a GirlScript mentor, Shaanif gave the most thorough code reviews I\'ve seen. Actually explained the "why" behind every suggestion. 10/10 would PR again.',
    accent: 'var(--accent-secondary)',
  },
  {
    name: 'Arjun P.',
    role: 'Client @ AtomNext Solutions',
    avatar: '🏢',
    text: 'We had a chatbot integration done in less than 2 weeks, fully deployed and documented. He treated our project like it was his own startup. Would recommend without hesitation.',
    accent: 'var(--accent-tertiary)',
  },
  {
    name: 'Meera T.',
    role: 'Classmate & Collaborator',
    avatar: '🎓',
    text: 'The go-to person in our batch for anything backend. Whether it\'s API design, database optimization or deployment — Shaanif just knows it cold.',
    accent: 'var(--accent)',
  },
  {
    name: 'Ahmed Z.',
    role: 'Freelance Client',
    avatar: '🌐',
    text: 'Hired him to build a Django backend for our SaaS. Not only delivered on time but proactively added auth improvements and API rate limiting I hadn\'t thought of.',
    accent: 'var(--accent-secondary)',
  },
];

// Duplicate for infinite scroll
const TRACK_ITEMS = [...testimonials, ...testimonials];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 relative overflow-hidden">
      {/* Accent line top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-[var(--border)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <ScrollReveal>
          <div className="section-label mb-4">Testimonials</div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <h2 className="font-heading text-4xl sm:text-5xl font-bold text-[var(--text-primary)]">
              What people say.
            </h2>
            <p className="font-mono text-xs text-[var(--text-muted)] max-w-xs">
              Real words from clients, collaborators & colleagues.
            </p>
          </div>
        </ScrollReveal>
      </div>

      {/* SCROLLING TESTIMONIALS */}
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[var(--bg)] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[var(--bg)] to-transparent z-10 pointer-events-none" />

        <div className="marquee-wrapper">
          <div className="marquee-track gap-4 py-2">
            {TRACK_ITEMS.map((item, i) => (
              <TestimonialCard key={i} item={item} />
            ))}
          </div>
        </div>
      </div>

      {/* ADD YOUR TESTIMONIAL CTA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <ScrollReveal>
          <div className="border border-dashed border-[var(--border)] p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="font-mono text-xs text-[var(--text-muted)] uppercase tracking-widest mb-1">
                Worked with me?
              </div>
              <div className="font-heading text-lg font-bold text-[var(--text-primary)]">
                I&apos;d love your recommendation 🙏
              </div>
            </div>
            <a
              href="mailto:shaaniffaqui@gmail.com?subject=Testimonial for Shaanif"
              className="btn-glow px-6 py-3 text-xs font-bold uppercase tracking-widest whitespace-nowrap"
            >
              Send a note ↗
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

function TestimonialCard({ item }: { item: typeof testimonials[0] }) {
  return (
    <div
      className="testimonial-card w-80 sm:w-96 flex-shrink-0 p-6 hover:border-[var(--accent)] cursor-default"
      style={{ '--card-accent': item.accent } as React.CSSProperties}
    >
      {/* Quote mark */}
      <div className="font-display text-5xl leading-none mb-3" style={{ color: item.accent }}>
        ❝
      </div>
      <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-5">
        {item.text}
      </p>
      {/* Author */}
      <div className="flex items-center gap-3 border-t border-[var(--border)] pt-4">
        <div
          className="w-10 h-10 flex items-center justify-center text-xl border"
          style={{ borderColor: item.accent }}
        >
          {item.avatar}
        </div>
        <div>
          <div className="font-heading font-bold text-sm text-[var(--text-primary)]">{item.name}</div>
          <div className="font-mono text-xs text-[var(--text-muted)]">{item.role}</div>
        </div>
      </div>
    </div>
  );
}
