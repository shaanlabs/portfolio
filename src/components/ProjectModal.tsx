'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Star, GitFork, Clock, AlertTriangle } from 'lucide-react';
import GitHubIcon from './icons/GitHubIcon';
import { ProcessedRepo } from '@/lib/types';
import { getLanguageColor, formatDate } from '@/lib/github';

interface ProjectModalProps {
  repo: ProcessedRepo | null;
  onClose: () => void;
}

export default function ProjectModal({ repo, onClose }: ProjectModalProps) {
  const [iframeError, setIframeError] = useState(false);
  const [readmeExcerpt, setReadmeExcerpt] = useState<string>('');
  const [loadingReadme, setLoadingReadme] = useState(false);

  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (repo) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';

      setLoadingReadme(true);
      setReadmeExcerpt('');
      setIframeError(false);

      fetch(`https://api.github.com/repos/shaanlabs/${repo.name}/readme`, {
        headers: { Accept: 'application/vnd.github.v3.raw' },
      })
        .then((res) => (res.ok ? res.text() : ''))
        .then((content) => {
          const lines = content
            .split('\n')
            .filter(
              (l) =>
                l.trim() &&
                !l.startsWith('#') &&
                !l.startsWith('!') &&
                !l.startsWith('---') &&
                !l.startsWith('|')
            );
          const excerpt = lines.slice(0, 3).join(' ');
          const words = excerpt.split(/\s+/).slice(0, 40);
          setReadmeExcerpt(
            words.join(' ') + (words.length >= 40 ? '...' : '')
          );
        })
        .catch(() => setReadmeExcerpt(''))
        .finally(() => setLoadingReadme(false));
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [repo, handleEscape]);

  const demoUrl = repo?.demoUrl;
  const showIframe = demoUrl && !iframeError;

  return (
    <AnimatePresence>
      {repo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-lg"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="relative w-full max-w-3xl max-h-[85vh] glass
                       rounded-2xl overflow-hidden shadow-2xl flex flex-col
                       border border-glass-border"
            style={{ boxShadow: 'var(--shadow-lg), var(--shadow-glow)' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div className="flex items-center gap-3 min-w-0">
                {repo.language && (
                  <span
                    className="w-3 h-3 rounded-full flex-shrink-0 ring-2 ring-white/10"
                    style={{ backgroundColor: getLanguageColor(repo.language) }}
                  />
                )}
                <h2 className="font-heading text-xl font-bold text-text-primary truncate">
                  {repo.name}
                </h2>
                {repo.isPinned && (
                  <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase
                                   bg-accent/15 text-accent rounded-md flex-shrink-0
                                   border border-accent/20">
                    Featured
                  </span>
                )}
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-lg flex items-center justify-center
                           text-text-muted hover:text-text-primary hover:bg-surface-hover
                           transition-colors flex-shrink-0 ml-4"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {repo.description && (
                <p className="text-text-secondary leading-relaxed">
                  {repo.description}
                </p>
              )}

              {/* Stats row */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-text-muted">
                {repo.language && (
                  <div className="flex items-center gap-1.5">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{
                        backgroundColor: getLanguageColor(repo.language),
                      }}
                    />
                    {repo.language}
                  </div>
                )}
                <div className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5" />
                  {repo.stargazers_count} stars
                </div>
                <div className="flex items-center gap-1">
                  <GitFork className="w-3.5 h-3.5" />
                  {repo.forks_count} forks
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  Updated {formatDate(repo.updated_at)}
                </div>
              </div>

              {/* Topics */}
              {repo.topics && repo.topics.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {repo.topics.map((topic) => (
                    <span
                      key={topic}
                      className="px-3 py-1 text-xs font-mono glass-card-static
                                 text-accent-secondary rounded-lg"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              )}

              {/* Demo iframe or fallback */}
              {showIframe ? (
                <div>
                  <div className="relative rounded-xl overflow-hidden border border-border glass-card-static">
                    <iframe
                      src={demoUrl}
                      className="w-full h-[400px]"
                      title={`${repo.name} live demo`}
                      sandbox="allow-scripts allow-same-origin"
                      onError={() => setIframeError(true)}
                    />
                  </div>
                  <a
                    href={demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 mt-3 text-sm
                               text-accent hover:underline"
                  >
                    Open full demo in new tab
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              ) : demoUrl && iframeError ? (
                <div className="rounded-xl border border-border p-6 glass-card-static text-center">
                  <AlertTriangle className="w-8 h-8 text-accent mx-auto mb-2" />
                  <p className="text-text-secondary text-sm mb-3">
                    Live preview couldn&apos;t be embedded (blocked by the site).
                  </p>
                  <a
                    href={demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-glow inline-flex items-center gap-2 px-4 py-2
                               rounded-lg text-sm text-white"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Open Demo Externally
                  </a>
                </div>
              ) : null}

              {/* README excerpt */}
              {loadingReadme ? (
                <div className="rounded-xl border border-border p-6 glass-card-static">
                  <div className="h-4 w-3/4 bg-border rounded animate-pulse mb-3" />
                  <div className="h-4 w-1/2 bg-border rounded animate-pulse" />
                </div>
              ) : readmeExcerpt ? (
                <div className="rounded-xl border border-border p-6 glass-card-static">
                  <h4 className="font-heading text-sm font-semibold text-text-muted uppercase tracking-wider mb-3">
                    README
                  </h4>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {readmeExcerpt}
                  </p>
                  <a
                    href={`${repo.html_url}#readme`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 mt-3 text-sm
                               text-accent hover:underline"
                  >
                    Read more on GitHub
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              ) : null}
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-border flex flex-wrap gap-3">
              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-glow inline-flex items-center gap-2 px-5 py-2.5
                           rounded-full text-sm text-white"
              >
                <GitHubIcon className="w-4 h-4" />
                View on GitHub
              </a>
              {demoUrl && (
                <a
                  href={demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-card-static inline-flex items-center gap-2 px-5 py-2.5
                             text-text-primary font-semibold rounded-full text-sm
                             transition-all duration-300 hover:border-border-hover"
                >
                  <ExternalLink className="w-4 h-4" />
                  Live Demo
                </a>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
