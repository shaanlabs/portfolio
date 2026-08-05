import { Download, Mail, Heart } from 'lucide-react';
import GitHubIcon from './icons/GitHubIcon';
import LinkedInIcon from './icons/LinkedInIcon';

export default function Footer() {
  return (
    <footer className="py-12 border-t border-border relative">
      {/* Subtle gradient line at top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-[image:var(--gradient-accent)] opacity-30" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Left — Brand */}
          <div className="flex items-center gap-4">
            <span className="font-heading text-xl font-bold">
              <span className="gradient-text">SA</span>
              <span className="text-accent">.</span>
            </span>
            <span className="h-4 w-px bg-border" />
            <p className="text-text-muted text-sm">
              © {new Date().getFullYear()} Shaanif Ahmed
            </p>
          </div>

          {/* Center — Links */}
          <div className="flex items-center gap-3">
            <a
              href="mailto:shaaniffakki@gmail.com"
              className="w-9 h-9 rounded-lg flex items-center justify-center
                         text-text-muted hover:text-accent hover:bg-[var(--glass-bg)]
                         transition-all duration-300"
              aria-label="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
            <a
              href="https://github.com/shaanlabs"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-lg flex items-center justify-center
                         text-text-muted hover:text-accent hover:bg-[var(--glass-bg)]
                         transition-all duration-300"
              aria-label="GitHub"
            >
              <GitHubIcon className="w-4 h-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/shaanif-ahmed-765934233/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-lg flex items-center justify-center
                         text-text-muted hover:text-accent hover:bg-[var(--glass-bg)]
                         transition-all duration-300"
              aria-label="LinkedIn"
            >
              <LinkedInIcon className="w-4 h-4" />
            </a>
            <span className="h-4 w-px bg-border" />
            <a
              href="/Shaanif_Ahmed_Resume.docx"
              download
              className="btn-glow inline-flex items-center gap-1.5 px-3 py-1.5
                         rounded-lg text-xs text-white"
            >
              <Download className="w-3 h-3" />
              Resume
            </a>
          </div>

          {/* Right — Built with */}
          <p className="text-text-muted text-xs flex items-center gap-1">
            Built with <Heart className="w-3 h-3 text-error" /> using Next.js
          </p>
        </div>
      </div>
    </footer>
  );
}
