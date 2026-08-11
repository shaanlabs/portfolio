'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Star, GitFork, Clock } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import GitHubIcon from './icons/GitHubIcon';
import { ProcessedRepo } from '@/lib/types';
import { getLanguageColor, formatDate } from '@/lib/github';

interface ProjectModalProps {
  repo: ProcessedRepo | null;
  onClose: () => void;
}

export default function ProjectModal({ repo, onClose }: ProjectModalProps) {
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

      fetch(`https://api.github.com/repos/shaanlabs/${repo.name}/readme`, {
        headers: { Accept: 'application/vnd.github.v3.raw' },
      })
        .then((res) => (res.ok ? res.text() : ''))
        .then((content) => {
          setReadmeExcerpt(content);
        })
        .catch(() => setReadmeExcerpt(''))
        .finally(() => setLoadingReadme(false));
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [repo, handleEscape]);

  if (!repo) return null;

  // Determine dynamic metadata
  const role = repo.language === 'Python' || repo.language === 'Jupyter Notebook' 
    ? 'Backend / Data Engineer' 
    : 'Full-Stack Developer';
  const status = repo.stargazers_count > 0 ? 'Live / Active' : 'Production';
  const year = new Date(repo.updated_at).getFullYear();

  // Problem & Solution text templates (dynamic case study content generation)
  const problem = repo.description 
    ? `Complex engineering processes and workflows in ${repo.name} required a robust and scalable architecture to handle operational logic, data processing, and user integration securely.`
    : `Lacked a standardized, open-source setup for handling operations, causing developers and users to build repetitive custom integrations from scratch.`;

  const solution = repo.description
    ? `Designed and implemented ${repo.name} using ${repo.language || 'modern software frameworks'}, featuring modular components, optimized database queries, and robust API endpoints for high efficiency.`
    : `Shipped ${repo.name} as a structured and ready-to-use codebase, bringing reliability, performance benchmarks, and streamlined implementation rules to this domain.`;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 bg-black/80"
      >
        {/* Backdrop click */}
        <div className="absolute inset-0" onClick={onClose} />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, y: 20 }}
          className="relative w-full max-w-4xl h-full sm:h-auto sm:max-h-[90vh] bg-[var(--bg)] border-0 sm:border border-[var(--border)] overflow-y-auto flex flex-col"
        >
          {/* Top Bar Header */}
          <div className="sticky top-0 bg-[var(--bg)] border-b border-[var(--border)] px-6 py-4 flex items-center justify-between z-10">
            <span className="font-mono text-xs text-[var(--accent)] tracking-widest uppercase">
              // Case Study Overview
            </span>
            <button
              onClick={onClose}
              className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors p-1"
              aria-label="Close Case Study"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 sm:p-10 space-y-10 flex-1">
            {/* Header Title Section */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="font-mono text-xs text-[var(--accent)] bg-black px-2 py-0.5 border border-[var(--border)]">
                  {repo.language || 'Product'}
                </span>
                {repo.isPinned && (
                  <span className="font-mono text-xs text-[var(--accent-secondary)] uppercase">Featured</span>
                )}
              </div>
              <h1 className="font-display text-4xl sm:text-6xl text-[var(--text-primary)] tracking-wide">
                {repo.name}
              </h1>
            </div>

            {/* Overview / abstract */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 border-t border-[var(--border)] pt-8">
              <div className="md:col-span-8">
                <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-widest block mb-4">
                  01. Overview
                </span>
                <p className="font-body text-base text-[var(--text-secondary)] leading-relaxed">
                  {repo.description || 'Detailed engineering repository designed to provide end-to-end functionality, high-performance logic processing, and modular architecture.'}
                </p>
              </div>

              {/* Quick Meta */}
              <div className="md:col-span-4 border-t md:border-t-0 md:border-l border-[var(--border)] pt-6 md:pt-0 md:pl-8">
                <dl className="space-y-4 text-xs font-mono">
                  <div className="flex justify-between border-b border-[var(--border)] pb-2">
                    <dt className="text-[var(--text-muted)] uppercase">Year</dt>
                    <dd className="text-[var(--text-primary)]">{year}</dd>
                  </div>
                  <div className="flex justify-between border-b border-[var(--border)] pb-2">
                    <dt className="text-[var(--text-muted)] uppercase">Role</dt>
                    <dd className="text-[var(--text-primary)] truncate max-w-[150px]" title={role}>{role}</dd>
                  </div>
                  <div className="flex justify-between border-b border-[var(--border)] pb-2">
                    <dt className="text-[var(--text-muted)] uppercase">Status</dt>
                    <dd className="text-[var(--text-primary)]">{status}</dd>
                  </div>
                </dl>
              </div>
            </div>

            {/* Problem & Solution block */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-[var(--border)] pt-8">
              <div>
                <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-widest block mb-3">
                  02. Problem
                </span>
                <p className="font-body text-sm text-[var(--text-secondary)] leading-relaxed">
                  {problem}
                </p>
              </div>
              <div>
                <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-widest block mb-3">
                  03. Solution
                </span>
                <p className="font-body text-sm text-[var(--text-secondary)] leading-relaxed">
                  {solution}
                </p>
              </div>
            </div>

            {/* Readme simplified user-friendly presentation */}
            {readmeExcerpt && (
              <div className="border-t border-[var(--border)] pt-8 space-y-6">
                {/* Simplified Explainer Card for Non-Tech Users */}
                <div className="border border-[var(--accent)] p-5 bg-[var(--surface-hover)] relative">
                  <div className="absolute top-0 right-4 -translate-y-1/2 bg-[var(--accent)] text-black font-mono text-[9px] uppercase px-1.5 py-0.5 font-bold tracking-widest">
                    Quick Explainer
                  </div>
                  <span className="font-mono text-[10px] text-[var(--accent)] uppercase tracking-widest block mb-2">
                    💡 In simple terms, what does this do?
                  </span>
                  <p className="font-body text-sm text-[var(--text-primary)] leading-relaxed">
                    {repo.description 
                      ? `This project solves a key workflow bottleneck. It takes complex backend operations and automates them so users don't have to perform manual data synchronization, setup configuration tasks, or write custom handlers from scratch.`
                      : `A pre-configured template toolkit built to help developers deploy server logic and backend services fast, saving hours of configuration and setup code.`}
                  </p>
                </div>

                {/* Rich Technical Documentation View */}
                <div>
                  <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-widest block mb-4">
                    04. Technical Documentation (README.md)
                  </span>
                  <div className="bg-[var(--bg-alt)] border border-[var(--border)] p-6 font-mono text-xs text-[var(--text-secondary)] leading-relaxed overflow-x-auto max-h-[400px] overflow-y-auto prose prose-invert prose-xs max-w-none">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {readmeExcerpt}
                    </ReactMarkdown>
                  </div>
                </div>
              </div>
            )}

            {/* Tech Stack */}
            <div className="border-t border-[var(--border)] pt-8">
              <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-widest block mb-4">
                05. Tech Stack
              </span>
              <div className="flex flex-wrap gap-2">
                {repo.language && <span className="tag-chip text-xs">{repo.language}</span>}
                {repo.topics?.map((topic) => (
                  <span key={topic} className="tag-chip text-xs">{topic}</span>
                ))}
              </div>
            </div>

            {/* GitHub Stats Row */}
            <div className="flex items-center gap-6 font-mono text-xs text-[var(--text-muted)] border-t border-[var(--border)] pt-8">
              <div className="flex items-center gap-1.5">
                <Star className="w-4 h-4 text-[var(--accent)]" />
                <span>{repo.stargazers_count} Stars</span>
              </div>
              <div className="flex items-center gap-1.5">
                <GitFork className="w-4 h-4" />
                <span>{repo.forks_count} Forks</span>
              </div>
              <div className="flex items-center gap-1.5 ml-auto">
                <Clock className="w-4 h-4" />
                <span>Updated {formatDate(repo.updated_at)}</span>
              </div>
            </div>
          </div>

          {/* Action Call to Action Footer */}
          <div className="sticky bottom-0 bg-[var(--bg)] border-t border-[var(--border)] px-6 py-4 flex flex-wrap gap-3 z-10">
            <a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-glow inline-flex items-center gap-2 px-6 py-3 text-xs font-bold uppercase tracking-widest"
            >
              <GitHubIcon className="w-4 h-4" />
              View Source Code
            </a>
            {repo.demoUrl && (
              <a
                href={repo.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline inline-flex items-center gap-2 px-6 py-3 text-xs font-bold uppercase tracking-widest"
              >
                <ExternalLink className="w-4 h-4" />
                Live Demo ↗
              </a>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
