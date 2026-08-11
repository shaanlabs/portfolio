'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Download } from 'lucide-react';
import GitHubIcon from './icons/GitHubIcon';
import ThemeToggle from './ThemeToggle';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Blog', href: '#blog' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
          ${isScrolled
            ? 'bg-[var(--bg)] border-b border-[var(--border)]'
            : 'bg-transparent border-b border-transparent'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <a
              href="#"
              className="font-display text-2xl text-[var(--text-primary)] tracking-wider flex items-center gap-0.5 group"
            >
              <span className="text-[var(--accent)] group-hover:tracking-widest transition-all duration-300">SA</span>
              <span className="text-[var(--accent-secondary)]">.</span>
            </a>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-0">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 font-mono text-xs text-[var(--text-secondary)] uppercase tracking-widest
                             hover:text-[var(--accent)] transition-colors duration-200 relative group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5
                                   bg-[var(--accent)] group-hover:w-full transition-all duration-300" />
                </a>
              ))}
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-2">
              <a
                href="https://github.com/shaanlabs"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center border border-[var(--border)]
                           text-[var(--text-secondary)] hover:text-[var(--accent)]
                           hover:border-[var(--accent)] transition-all duration-200"
                aria-label="GitHub"
              >
                <GitHubIcon className="w-4 h-4" />
              </a>
              <ThemeToggle />
              <a
                href="/Shaanif_Ahmed_Resume.docx"
                download
                className="btn-glow inline-flex items-center gap-2 px-5 py-2 text-xs font-bold uppercase tracking-widest rounded-none"
              >
                <Download className="w-3.5 h-3.5" />
                Hire Me
              </a>
            </div>

            {/* Mobile */}
            <div className="flex md:hidden items-center gap-2">
              <ThemeToggle />
              <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className="w-9 h-9 flex items-center justify-center border border-[var(--border)]
                           text-[var(--text-secondary)] transition-all duration-200"
                aria-label="Toggle menu"
              >
                {isMobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-40 pt-16 md:hidden"
          >
            <div
              className="absolute inset-0 bg-[var(--bg)]/90 backdrop-blur-sm"
              onClick={() => setIsMobileOpen(false)}
            />
            <div className="relative bg-[var(--bg)] border border-[var(--border)] mx-4 mt-2 p-6">
              <div className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileOpen(false)}
                    className="px-3 py-3 font-mono text-sm text-[var(--text-secondary)] uppercase tracking-widest
                               hover:text-[var(--accent)] hover:bg-[var(--surface)] transition-all duration-200
                               border-l-2 border-transparent hover:border-[var(--accent)]"
                  >
                    {link.label}
                  </a>
                ))}
                <div className="h-px bg-[var(--border)] my-3" />
                <a
                  href="/Shaanif_Ahmed_Resume.docx"
                  download
                  className="btn-glow flex items-center justify-center gap-2 py-3 text-xs font-bold uppercase tracking-widest"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download CV
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
