'use client';

import { useState, useMemo } from 'react';
import { Search, Filter, ChevronDown, GitFork } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProcessedRepo, StaticProject } from '@/lib/types';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';
import ScrollReveal from './ScrollReveal';
import featuredData from '@/data/featured.json';

interface ProjectsProps {
  pinned: ProcessedRepo[];
  other: ProcessedRepo[];
  forked: ProcessedRepo[];
}

type SortKey = 'updated' | 'stars' | 'name';

export default function Projects({ pinned, other, forked }: ProjectsProps) {
  const [search, setSearch] = useState('');
  const [languageFilter, setLanguageFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<SortKey>('updated');
  const [showForks, setShowForks] = useState(false);
  const [selectedRepo, setSelectedRepo] = useState<ProcessedRepo | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const staticProjects = (featuredData as { staticProjects: StaticProject[] }).staticProjects;

  const languages = useMemo(() => {
    const langs = new Set<string>();
    [...pinned, ...other, ...forked].forEach((r) => {
      if (r.language) langs.add(r.language);
    });
    return Array.from(langs).sort();
  }, [pinned, other, forked]);

  const filterAndSort = (repos: ProcessedRepo[]) => {
    let filtered = repos.filter((r) => {
      const matchesSearch =
        !search ||
        r.name.toLowerCase().includes(search.toLowerCase()) ||
        (r.description?.toLowerCase().includes(search.toLowerCase()) ?? false);
      const matchesLang =
        languageFilter === 'all' || r.language === languageFilter;
      return matchesSearch && matchesLang;
    });

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'stars':
          return b.stargazers_count - a.stargazers_count;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'updated':
        default:
          return (
            new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
          );
      }
    });

    return filtered;
  };

  const filteredPinned = filterAndSort(pinned);
  const filteredOther = filterAndSort(other);
  const filteredForked = filterAndSort(forked);
  const allFiltered = [...filteredPinned, ...filteredOther];
  const totalCount = allFiltered.length + (showForks ? filteredForked.length : 0);

  return (
    <section id="projects" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <div className="section-label mb-4">Work & Projects</div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <div>
              <h2 className="font-heading text-4xl sm:text-5xl font-bold text-[var(--text-primary)]">
                Selected Work
              </h2>
              <p className="text-[var(--text-secondary)] text-sm mt-2 max-w-md">
                A showcase of key products, automations, and tools I&apos;ve built.
              </p>
            </div>
            <div className="font-mono text-xs text-[var(--text-muted)]">
              Showing {totalCount} projects
            </div>
          </div>
        </ScrollReveal>

        {/* Search and Filters */}
        <ScrollReveal delay={0.1}>
          <div className="mb-10 space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-[var(--surface-hover)] border border-[var(--border)]
                             text-[var(--text-primary)] placeholder:text-[var(--text-muted)] text-sm
                             focus:outline-none focus:border-[var(--accent)] transition-all duration-300"
                />
              </div>

              {/* Filter toggle (mobile) */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="sm:hidden flex items-center justify-center gap-2 px-4 py-3
                           border border-[var(--border)] text-[var(--text-secondary)]
                           text-sm transition-all duration-200"
              >
                <Filter className="w-4 h-4" />
                Filters
                <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </button>

              {/* Desktop filters */}
              <div className="hidden sm:flex items-center gap-3">
                <select
                  value={languageFilter}
                  onChange={(e) => setLanguageFilter(e.target.value)}
                  className="px-4 py-3 bg-[var(--surface-hover)] border border-[var(--border)]
                             text-[var(--text-secondary)] text-sm cursor-pointer focus:outline-none focus:border-[var(--accent)]"
                >
                  <option value="all">All Languages</option>
                  {languages.map((lang) => (
                    <option key={lang} value={lang}>
                      {lang}
                    </option>
                  ))}
                </select>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortKey)}
                  className="px-4 py-3 bg-[var(--surface-hover)] border border-[var(--border)]
                             text-[var(--text-secondary)] text-sm cursor-pointer focus:outline-none focus:border-[var(--accent)]"
                >
                  <option value="updated">Recently Updated</option>
                  <option value="stars">Most Stars</option>
                  <option value="name">Name (A–Z)</option>
                </select>
              </div>
            </div>

            {/* Mobile filters dropdown */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="sm:hidden flex gap-3 overflow-hidden"
                >
                  <select
                    value={languageFilter}
                    onChange={(e) => setLanguageFilter(e.target.value)}
                    className="flex-1 px-4 py-3 bg-[var(--surface-hover)] border border-[var(--border)] text-[var(--text-secondary)] text-sm"
                  >
                    <option value="all">All Languages</option>
                    {languages.map((lang) => (
                      <option key={lang} value={lang}>
                        {lang}
                      </option>
                    ))}
                  </select>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortKey)}
                    className="flex-1 px-4 py-3 bg-[var(--surface-hover)] border border-[var(--border)] text-[var(--text-secondary)] text-sm"
                  >
                    <option value="updated">Updated</option>
                    <option value="stars">Stars</option>
                    <option value="name">Name</option>
                  </select>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </ScrollReveal>

        {/* Pinned/Featured projects (Rawahah Selected Work Card Grid Style) */}
        {filteredPinned.length > 0 && (
          <div className="mb-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredPinned.map((repo, i) => (
                <ScrollReveal key={repo.id} delay={i * 0.08}>
                  <ProjectCard
                    repo={repo}
                    onClick={() => setSelectedRepo(repo)}
                    index={i}
                    featured
                  />
                </ScrollReveal>
              ))}
            </div>
          </div>
        )}

        {/* Other projects & static projects (Rawahah's Clean Table List View) */}
        {(filteredOther.length > 0 || staticProjects.length > 0) && (
          <div className="mb-16">
            <ScrollReveal>
              <div className="border-t border-[var(--border)] pt-12 mb-6">
                <h3 className="font-heading text-xl font-bold text-[var(--text-primary)]">
                  Other Projects &amp; Work
                </h3>
                <p className="text-[var(--text-secondary)] text-sm mt-1">
                  A list of repositories, custom SaaS platforms and automation work.
                </p>
              </div>
            </ScrollReveal>

            <ul className="divide-y divide-[var(--border)] border-y border-[var(--border)]">
              {/* GitHub Other Projects */}
              {filteredOther.map((repo, i) => (
                <ScrollReveal key={repo.id} delay={Math.min(i * 0.04, 0.2)}>
                  <li
                    onClick={() => setSelectedRepo(repo)}
                    className="group grid grid-cols-1 md:grid-cols-12 gap-3 py-5 transition-colors duration-200 cursor-pointer hover:text-[var(--accent)]"
                  >
                    <div className="min-w-0 md:col-span-5">
                      <h4 className="font-heading text-lg font-bold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors leading-tight">
                        {repo.name}
                      </h4>
                      <p className="text-xs text-[var(--text-secondary)] mt-1 truncate">
                        {repo.description || 'View source code on GitHub'}
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 md:col-span-6 md:justify-between text-xs font-mono text-[var(--text-muted)]">
                      <span className="tag-chip text-[10px]">{repo.language || 'Repository'}</span>
                      <span>{new Date(repo.updated_at).getFullYear()}</span>
                    </div>
                    <span className="hidden md:block md:col-span-1 justify-self-end font-mono text-sm text-[var(--accent)] opacity-40 group-hover:translate-x-1 group-hover:opacity-100 transition-all">
                      /
                    </span>
                  </li>
                </ScrollReveal>
              ))}

              {/* Resume Static Projects */}
              {staticProjects.map((project, i) => (
                <ScrollReveal key={project.name} delay={Math.min(i * 0.04, 0.2)}>
                  <li
                    className="group grid grid-cols-1 md:grid-cols-12 gap-3 py-5 hover:bg-[var(--surface-hover)] border-l-2 border-transparent hover:border-[var(--accent)] px-2 transition-all"
                  >
                    <div className="min-w-0 md:col-span-5">
                      <h4 className="font-heading text-lg font-bold text-[var(--text-primary)] leading-tight">
                        {project.name}
                      </h4>
                      <p className="text-xs text-[var(--text-secondary)] mt-1">
                        {project.description}
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 md:col-span-6 md:justify-between text-xs font-mono text-[var(--text-muted)]">
                      <div className="flex gap-1.5 flex-wrap">
                        {project.stack.slice(0, 3).map(tech => (
                          <span key={tech} className="tag-chip text-[9px]">{tech}</span>
                        ))}
                      </div>
                      <span>Resume Archive</span>
                    </div>
                    <span className="hidden md:block md:col-span-1 justify-self-end font-mono text-xs text-[var(--text-muted)]">
                      Private
                    </span>
                  </li>
                </ScrollReveal>
              ))}
            </ul>
          </div>
        )}

        {/* Forks Toggle */}
        {forked.length > 0 && (
          <div className="flex justify-end text-sm text-[var(--text-muted)] mb-8">
            <button
              onClick={() => setShowForks(!showForks)}
              className="flex items-center gap-1.5 hover:text-[var(--accent)] transition-colors"
            >
              <GitFork className="w-3.5 h-3.5" />
              {showForks ? 'Hide' : 'Show'} forked repos ({forked.length})
            </button>
          </div>
        )}

        {/* Forked projects grid */}
        <AnimatePresence>
          {showForks && filteredForked.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-16 overflow-hidden"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredForked.map((repo, i) => (
                  <ProjectCard
                    key={repo.id}
                    repo={repo}
                    onClick={() => setSelectedRepo(repo)}
                    index={i}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Empty state */}
        {allFiltered.length === 0 && !showForks && (
          <div className="text-center py-16 font-mono text-xs text-[var(--text-muted)] border border-dashed border-[var(--border)]">
            No projects matched search criteria.
          </div>
        )}

        {/* Project Modal */}
        <ProjectModal
          repo={selectedRepo}
          onClose={() => setSelectedRepo(null)}
        />
      </div>
    </section>
  );
}
