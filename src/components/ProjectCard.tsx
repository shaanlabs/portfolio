'use client';

import { motion } from 'framer-motion';
import { Star, GitFork, Clock, ExternalLink } from 'lucide-react';
import { ProcessedRepo } from '@/lib/types';
import { getLanguageColor, formatDate } from '@/lib/github';
import TiltCard from './TiltCard';

interface ProjectCardProps {
  repo: ProcessedRepo;
  onClick: () => void;
  featured?: boolean;
}

export default function ProjectCard({
  repo,
  onClick,
  featured = false,
}: ProjectCardProps) {
  return (
    <TiltCard maxTilt={6} className="h-full">
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2 }}
        onClick={onClick}
        className={`group cursor-pointer glass-card holo-shimmer rounded-2xl
                    p-6 h-full flex flex-col
                    ${featured
                      ? 'border-accent/30 hover:border-accent/60 hover:shadow-[0_0_30px_rgba(99,102,241,0.15)]'
                      : ''
                    }`}
      >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            {featured && (
              <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider
                             bg-accent/15 text-accent rounded-md border border-accent/20">
                Featured
              </span>
            )}
            {repo.fork && (
              <span className="px-2 py-0.5 text-[10px] font-mono
                             bg-text-muted/10 text-text-muted rounded-md">
                Fork
              </span>
            )}
          </div>
          <h3 className="font-heading text-lg font-bold text-text-primary mt-1.5
                         group-hover:text-accent transition-colors duration-300 truncate">
            {repo.name}
          </h3>
        </div>
        <ExternalLink className="w-4 h-4 text-text-muted opacity-0 group-hover:opacity-100
                                 transition-all duration-300 flex-shrink-0 mt-1.5
                                 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </div>

      {/* Description */}
      <p className="text-text-secondary text-sm leading-relaxed mb-4 line-clamp-3 flex-1">
        {repo.description || 'No description available'}
      </p>

      {/* Topics */}
      {repo.topics && repo.topics.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {repo.topics.slice(0, 4).map((topic) => (
            <span
              key={topic}
              className="px-2 py-0.5 text-[11px] font-mono glass-card-static
                         text-accent-secondary rounded-md"
            >
              {topic}
            </span>
          ))}
          {repo.topics.length > 4 && (
            <span className="px-2 py-0.5 text-[11px] text-text-muted">
              +{repo.topics.length - 4}
            </span>
          )}
        </div>
      )}

      {/* Footer stats */}
      <div className="flex items-center gap-4 text-xs text-text-muted pt-3 border-t border-border/50">
        {/* Language */}
        {repo.language && (
          <div className="flex items-center gap-1.5">
            <span
              className="w-2.5 h-2.5 rounded-full ring-2 ring-white/10"
              style={{ backgroundColor: getLanguageColor(repo.language) }}
            />
            <span>{repo.language}</span>
          </div>
        )}

        {/* Stars */}
        {repo.stargazers_count > 0 && (
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3" />
            <span>{repo.stargazers_count}</span>
          </div>
        )}

        {/* Forks */}
        {repo.forks_count > 0 && (
          <div className="flex items-center gap-1">
            <GitFork className="w-3 h-3" />
            <span>{repo.forks_count}</span>
          </div>
        )}

        {/* Updated */}
        <div className="flex items-center gap-1 ml-auto">
          <Clock className="w-3 h-3" />
          <span>{formatDate(repo.updated_at)}</span>
        </div>
      </div>
    </motion.div>
    </TiltCard>
  );
}
