import ScrollReveal from './ScrollReveal';

const FOOTER_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Blog', href: '#blog' },
  { label: 'Contact', href: '#contact' },
];

const SOCIAL_LINKS = [
  { label: 'GitHub', href: 'https://github.com/shaanlabs' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/shaanif-ahmed-765934233/' },
  { label: 'Email', href: 'mailto:shaaniffaqui@gmail.com' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--border)] bg-[var(--bg-alt)]">
      {/* ASCII Art Banner */}
      <div className="overflow-hidden border-b border-[var(--border)]">
        <div className="marquee-wrapper">
          <div className="marquee-track py-2">
            {Array(6).fill(0).map((_, i) => (
              <span key={i} className="px-8 font-mono text-xs text-[var(--border)] select-none whitespace-nowrap uppercase tracking-widest">
                ◼ SHAANIF AHMED ◼ BACKEND ENGINEER ◼ DATA SCIENTIST ◼ FREELANCER ◼ OPEN TO WORK ◼
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Brand */}
          <div>
            <div className="font-display text-5xl text-[var(--accent)] mb-3 tracking-wider">SA.</div>
            <p className="font-mono text-xs text-[var(--text-muted)] leading-relaxed max-w-[220px]">
              Backend engineer. Data nerd. Freelancer. Karnataka, India. Building things that work.
            </p>
            <div className="flex items-center gap-2 mt-4">
              <div className="status-dot" />
              <span className="font-mono text-xs text-[var(--success)]">Open to work</span>
            </div>
          </div>

          {/* Links */}
          <div>
            <div className="font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-widest mb-4">Navigate</div>
            <div className="flex flex-col gap-2">
              {FOOTER_LINKS.map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  className="font-mono text-xs text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors w-fit underline-accent"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Social */}
          <div>
            <div className="font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-widest mb-4">Connect</div>
            <div className="flex flex-col gap-2">
              {SOCIAL_LINKS.map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  target={link.href.startsWith('mailto') ? '_self' : '_blank'}
                  rel="noopener noreferrer"
                  className="font-mono text-xs text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors w-fit flex items-center gap-2 group"
                >
                  <span className="text-[var(--text-muted)] group-hover:text-[var(--accent)] transition-colors">→</span>
                  {link.label}
                </a>
              ))}
              <a
                href="/Shaanif_Ahmed_Resume.docx"
                download
                className="font-mono text-xs text-[var(--accent)] hover:text-[var(--accent-hover)] transition-colors w-fit flex items-center gap-2 mt-2"
              >
                ↓ Download CV
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[var(--border)] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="font-mono text-xs text-[var(--text-muted)]">
            © {year} Shaanif Ahmed. All rights reserved.
          </div>
          <div className="font-mono text-xs text-[var(--text-muted)] flex items-center gap-2">
            Made with
            <span className="text-[var(--accent-secondary)] animate-text-flash">♥</span>
            & too much ☕ · Built with Next.js
          </div>
          <div className="font-mono text-xs text-[var(--text-muted)]">
            <span className="text-[var(--accent)]">v2.0</span> — Gen Z Edition
          </div>
        </div>
      </div>
    </footer>
  );
}
