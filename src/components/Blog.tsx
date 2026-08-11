'use client';

import { motion } from 'framer-motion';
import ScrollReveal from './ScrollReveal';

const BLOG_POSTS = [
  {
    id: 1,
    emoji: '🐍',
    tag: 'Python',
    title: 'Why FastAPI is the backend framework you\'ve been missing',
    excerpt: 'From type hints to automatic OpenAPI docs — here\'s why I switched from Flask and never looked back.',
    date: 'Coming Soon',
    readTime: '~6 min read',
    accent: 'var(--accent)',
    status: 'coming-soon',
  },
  {
    id: 2,
    emoji: '🏭',
    tag: 'ERP',
    title: 'Customizing ERPNext without losing your mind',
    excerpt: 'A field guide to Frappe hooks, custom doctypes, and surviving your first ERP project in production.',
    date: 'Coming Soon',
    readTime: '~8 min read',
    accent: 'var(--accent-secondary)',
    status: 'coming-soon',
  },
  {
    id: 3,
    emoji: '🤖',
    tag: 'AI',
    title: 'Running LLMs locally with Ollama — the practical guide',
    excerpt: 'No GPU? No problem. Here\'s how to run Llama 3 on your laptop and build an actual useful tool.',
    date: 'Coming Soon',
    readTime: '~5 min read',
    accent: 'var(--accent-tertiary)',
    status: 'coming-soon',
  },
  {
    id: 4,
    emoji: '🐳',
    tag: 'DevOps',
    title: 'Docker for backend devs: what they don\'t tell you',
    excerpt: 'Volume mounts, multi-stage builds, and the docker-compose patterns that actually save time.',
    date: 'Coming Soon',
    readTime: '~7 min read',
    accent: 'var(--accent)',
    status: 'coming-soon',
  },
];

export default function Blog() {
  return (
    <section id="blog" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="section-label mb-4">Blog</div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <h2 className="font-heading text-4xl sm:text-5xl font-bold text-[var(--text-primary)]">
              Thoughts & write-ups.
            </h2>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-[var(--accent-secondary)] rounded-full animate-text-flash" />
              <span className="font-mono text-xs text-[var(--text-muted)] uppercase tracking-widest">
                Posts dropping soon
              </span>
            </div>
          </div>
        </ScrollReveal>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
          {BLOG_POSTS.map((post, index) => (
            <ScrollReveal key={post.id} delay={index * 0.07}>
              <BlogCard post={post} />
            </ScrollReveal>
          ))}
        </div>

        {/* Subscribe / Notify CTA */}
        <ScrollReveal delay={0.3}>
          <div className="mt-8 border border-[var(--accent)] p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="font-display text-2xl text-[var(--accent)] mb-1">GET NOTIFIED</div>
              <div className="font-mono text-xs text-[var(--text-muted)]">
                I&apos;ll ping you when posts go live. No spam, just content.
              </div>
            </div>
            <a
              href="mailto:shaaniffaqui@gmail.com?subject=Notify me when blog posts go live!"
              className="btn-glow px-6 py-3 text-xs font-bold uppercase tracking-widest whitespace-nowrap"
            >
              Notify me →
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

function BlogCard({ post }: { post: typeof BLOG_POSTS[0] }) {
  return (
    <div className="blog-card group cursor-pointer">
      {/* Top accent bar */}
      <div className="h-1" style={{ background: post.accent }} />
      <div className="p-6">
        {/* Tag + emoji */}
        <div className="flex items-center justify-between mb-4">
          <span
            className="font-mono text-[10px] font-bold uppercase tracking-widest px-2 py-1"
            style={{ background: post.accent, color: '#000' }}
          >
            {post.tag}
          </span>
          <span className="text-2xl">{post.emoji}</span>
        </div>

        {/* Title */}
        <h3 className="font-heading font-bold text-lg text-[var(--text-primary)] mb-3 group-hover:text-[var(--accent)] transition-colors leading-tight">
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-5">
          {post.excerpt}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-[var(--border)] pt-4">
          <div className="flex items-center gap-2">
            <span
              className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-wider px-2 py-1 border"
              style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-secondary)] animate-text-flash" />
              Coming Soon
            </span>
          </div>
          <span className="font-mono text-[10px] text-[var(--text-muted)]">{post.readTime}</span>
        </div>
      </div>
    </div>
  );
}
