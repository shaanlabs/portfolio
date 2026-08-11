'use client';

import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { ProcessedRepo } from '@/lib/types';

interface ProjectCardProps {
  repo: ProcessedRepo;
  onClick: () => void;
  index: number;
  featured?: boolean;
}

export default function ProjectCard({
  repo,
  onClick,
  index,
  featured = false,
}: ProjectCardProps) {
  // Format the index (e.g. 01, 02)
  const displayIndex = String(index + 1).padStart(2, '0');

  // Guess / determine role & status
  const role = repo.language === 'Python' || repo.language === 'Jupyter Notebook' 
    ? 'Backend / Data Engineer' 
    : 'Full-Stack Developer';
  const status = repo.stargazers_count > 0 ? 'Live / Active' : 'Production';

  return (
    <article className="h-full">
      <div
        onClick={onClick}
        className="group cursor-pointer flex h-full flex-col border border-[var(--border)] hover:border-[var(--accent)] p-5 transition-all duration-300 relative"
      >
        {/* Card Header Info */}
        <div className="flex items-baseline justify-between gap-4 mb-4">
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-xs text-[var(--accent)]">{displayIndex}</span>
            <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--text-muted)]">
              {repo.language || 'Repository'}
            </span>
          </div>
          {featured && (
            <span className="font-mono text-[9px] uppercase bg-[var(--accent)] text-black px-1.5 py-0.5 font-bold">
              Featured
            </span>
          )}
        </div>

        {/* Project Title */}
        <h3 className="font-heading text-2xl font-bold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors leading-tight">
          {repo.name}
        </h3>

        {/* Editorial Project Cover Frame */}
        <div className="aspect-[16/10] my-4 border border-[var(--border)] relative overflow-hidden bg-[var(--bg-alt)]">
          {/* Subtle grid accent inside cover */}
          <div className="absolute inset-0 grid-bg opacity-10" />
          <div className="absolute inset-0 flex flex-col justify-between p-4">
            <div className="flex items-baseline justify-between">
              <span className="font-mono text-[10px] text-[var(--accent)]">{displayIndex}</span>
              <span className="font-mono text-[9px] uppercase text-[var(--text-muted)] tracking-wider">
                {repo.topics?.[0] || 'Source Code'}
              </span>
            </div>

            {/* Simulated Project Mark Logo */}
            <div className="self-center font-display text-4xl text-[var(--text-muted)] group-hover:text-[var(--accent)] group-hover:scale-110 transition-all duration-300">
              {repo.name.slice(0, 2).toUpperCase()}
            </div>

            {/* Meta Table at bottom of cover */}
            <div className="grid grid-cols-3 gap-2 border-t border-[var(--border)] pt-3 text-[9px] font-mono">
              <div>
                <span className="text-[var(--text-muted)] block uppercase">Year</span>
                <span className="text-[var(--text-secondary)] mt-0.5 block">{new Date(repo.updated_at).getFullYear()}</span>
              </div>
              <div className="truncate">
                <span className="text-[var(--text-muted)] block uppercase">Role</span>
                <span className="text-[var(--text-secondary)] mt-0.5 block truncate">{role}</span>
              </div>
              <div>
                <span className="text-[var(--text-muted)] block uppercase">Status</span>
                <span className="text-[var(--text-secondary)] mt-0.5 block">{status}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-4 flex-1 line-clamp-3">
          {repo.description || 'No description available for this project. View code on GitHub to learn more.'}
        </p>

        {/* Stack chips */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {repo.language && <span className="tag-chip text-[9px]">{repo.language}</span>}
          {repo.topics?.slice(0, 2).map((topic) => (
            <span key={topic} className="tag-chip text-[9px]">{topic}</span>
          ))}
        </div>

        {/* Link Sweep Line */}
        <div className="mt-auto pt-3 border-t border-[var(--border)] flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors underline-accent">
            View Details
          </span>
          <span className="font-mono text-xs text-[var(--text-muted)] group-hover:text-[var(--accent)] group-hover:translate-x-1 transition-transform">
            →
          </span>
        </div>
      </div>
    </article>
  );
}
