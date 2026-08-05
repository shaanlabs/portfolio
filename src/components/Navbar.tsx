'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Download } from 'lucide-react';
import GitHubIcon from './icons/GitHubIcon';
import ThemeToggle from './ThemeToggle';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
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

  const handleNavClick = () => setIsMobileOpen(false);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500
          ${isScrolled ? 'glass shadow-lg' : 'bg-transparent'}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-18">
            {/* Logo */}
            <a
              href="#"
              className="font-heading text-xl font-bold text-text-primary
                         hover:text-accent transition-colors duration-300 flex items-center gap-1"
            >
              <span className="gradient-text text-2xl">SA</span>
              <span className="text-accent">.</span>
            </a>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 text-sm font-medium text-text-secondary
                             hover:text-accent transition-all duration-300 rounded-xl
                             hover:bg-[var(--glass-bg)] relative group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5
                                   bg-[image:var(--gradient-accent)] rounded-full
                                   group-hover:w-4/5 transition-all duration-300" />
                </a>
              ))}
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-3">
              <a
                href="https://github.com/shaanlabs"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl flex items-center justify-center
                           glass-card-static
                           text-text-secondary hover:text-accent
                           transition-all duration-300"
                aria-label="GitHub"
              >
                <GitHubIcon className="w-[18px] h-[18px]" />
              </a>
              <ThemeToggle />
              <ResumeButton />
            </div>

            {/* Mobile: Theme + Hamburger */}
            <div className="flex md:hidden items-center gap-2">
              <ThemeToggle />
              <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className="w-10 h-10 rounded-xl flex items-center justify-center
                           glass-card-static text-text-secondary
                           transition-all duration-300"
                aria-label="Toggle menu"
              >
                {isMobileOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 pt-16 md:hidden"
          >
            <div
              className="absolute inset-0 bg-background/60 backdrop-blur-xl"
              onClick={handleNavClick}
            />
            <div className="relative glass mx-4 mt-2 rounded-2xl p-6 shadow-lg border border-glass-border">
              <div className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={handleNavClick}
                    className="px-4 py-3 text-base font-medium text-text-secondary
                               hover:text-accent hover:bg-[var(--glass-bg)] rounded-xl
                               transition-all duration-300"
                  >
                    {link.label}
                  </a>
                ))}
                <div className="h-px bg-border my-2" />
                <div className="flex gap-3 px-4">
                  <a
                    href="https://github.com/shaanlabs"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-3
                               glass-card-static rounded-xl text-text-secondary hover:text-accent
                               transition-all duration-300"
                  >
                    <GitHubIcon className="w-4 h-4" />
                    GitHub
                  </a>
                  <div className="flex-1">
                    <ResumeButton fullWidth />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function ResumeButton({ fullWidth = false }: { fullWidth?: boolean }) {
  const [resumeExists, setResumeExists] = useState(true);

  return resumeExists ? (
    <a
      href="/Shaanif_Ahmed_Resume.docx"
      download
      className={`btn-glow inline-flex items-center justify-center gap-2 px-5 py-2.5
                  rounded-full text-sm text-white
                  ${fullWidth ? 'w-full' : ''}`}
      onError={() => setResumeExists(false)}
    >
      <Download className="w-4 h-4" />
      Resume
    </a>
  ) : (
    <a
      href="mailto:shaaniffakki@gmail.com"
      className={`inline-flex items-center justify-center gap-2 px-5 py-2.5
                  bg-accent/20 text-accent font-semibold rounded-full text-sm
                  transition-all duration-300 hover:bg-accent/30
                  ${fullWidth ? 'w-full' : ''}`}
    >
      Email for Resume
    </a>
  );
}
