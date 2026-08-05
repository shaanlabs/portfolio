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
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-text-primary mb-4">
              Project <span className="gradient-text">Catalog</span>
            </h2>
            <div className="w-16 h-1 bg-[image:var(--gradient-accent)] mx-auto rounded-full mb-4" />
            <p className="text-text-secondary max-w-2xl mx-auto">
              All {pinned.length + other.length} public repositories from GitHub, live and searchable.
              Featured projects are pinned at the top.
            </p>
          </div>
        </ScrollReveal>

        {/* Search and Filters */}
        <ScrollReveal delay={0.1}>
          <div className="mb-8 space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 glass-card-static rounded-xl
                             text-text-primary placeholder:text-text-muted text-sm
                             focus:outline-none focus:border-accent/50 focus:shadow-[var(--shadow-glow)]
                             transition-all duration-300"
                />
              </div>

              {/* Filter toggle (mobile) */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="sm:hidden flex items-center justify-center gap-2 px-4 py-3
                           glass-card-static rounded-xl text-text-secondary
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
                  className="px-4 py-3 glass-card-static rounded-xl
                             text-text-secondary text-sm cursor-pointer
                             focus:outline-none focus:border-accent/50 transition-all duration-300
                             appearance-none"
                  style={{ backgroundImage: 'none' }}
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
                  className="px-4 py-3 glass-card-static rounded-xl
                             text-text-secondary text-sm cursor-pointer
                             focus:outline-none focus:border-accent/50 transition-all duration-300
                             appearance-none"
                  style={{ backgroundImage: 'none' }}
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
                    className="flex-1 px-4 py-3 glass-card-static rounded-xl
                               text-text-secondary text-sm appearance-none"
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
                    className="flex-1 px-4 py-3 glass-card-static rounded-xl
                               text-text-secondary text-sm appearance-none"
                  >
                    <option value="updated">Updated</option>
                    <option value="stars">Stars</option>
                    <option value="name">Name</option>
                  </select>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Results count + forks toggle */}
            <div className="flex items-center justify-between text-sm text-text-muted">
              <span>
                Showing {totalCount} project{totalCount !== 1 ? 's' : ''}
              </span>
              <button
                onClick={() => setShowForks(!showForks)}
                className="flex items-center gap-1.5 hover:text-accent transition-colors duration-300"
              >
                <GitFork className="w-3.5 h-3.5" />
                {showForks ? 'Hide' : 'Show'} forked projects ({forked.length})
              </button>
            </div>
          </div>
        </ScrollReveal>

        {/* Pinned/Featured projects */}
        {filteredPinned.length > 0 && (
          <div className="mb-12">
            <h3 className="font-heading text-lg font-semibold text-text-secondary mb-6 flex items-center gap-2">
              <span className="gradient-text">★</span> Featured Projects
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPinned.map((repo, i) => (
                <ScrollReveal key={repo.id} delay={i * 0.08}>
                  <ProjectCard
                    repo={repo}
                    onClick={() => setSelectedRepo(repo)}
                    featured
                  />
                </ScrollReveal>
              ))}
            </div>
          </div>
        )}

        {/* Other projects */}
        {filteredOther.length > 0 && (
          <div className="mb-12">
            {filteredPinned.length > 0 && (
              <h3 className="font-heading text-lg font-semibold text-text-secondary mb-6">
                All Projects
              </h3>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredOther.map((repo, i) => (
                <ScrollReveal key={repo.id} delay={Math.min(i * 0.05, 0.3)}>
                  <ProjectCard
                    repo={repo}
                    onClick={() => setSelectedRepo(repo)}
                  />
                </ScrollReveal>
              ))}
            </div>
          </div>
        )}

        {/* Static projects (from resume, not on GitHub) */}
        {staticProjects.length > 0 && (
          <div className="mb-12">
            <h3 className="font-heading text-lg font-semibold text-text-secondary mb-6">
              Other Notable Work
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {staticProjects.map((project, i) => (
                <ScrollReveal key={project.name} delay={i * 0.08}>
                  <div className="glass-card holo-shimmer rounded-2xl p-6">
                    <h4 className="font-heading text-lg font-bold text-text-primary mb-2">
                      {project.name}
                    </h4>
                    <p className="text-text-secondary text-sm leading-relaxed mb-4">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.stack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 text-xs font-mono glass-card-static
                                     text-text-muted rounded-md"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <p className="mt-4 text-xs text-text-muted italic">
                      Private repository — details from resume
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        )}

        {/* Forked projects */}
        <AnimatePresence>
          {showForks && filteredForked.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <h3 className="font-heading text-lg font-semibold text-text-secondary mb-6 flex items-center gap-2">
                <GitFork className="w-4 h-4" /> Forked Projects
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredForked.map((repo) => (
                  <ProjectCard
                    key={repo.id}
                    repo={repo}
                    onClick={() => setSelectedRepo(repo)}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Empty state */}
        {allFiltered.length === 0 && !showForks && (
          <div className="text-center py-16">
            <p className="text-text-muted text-lg mb-2">No projects found</p>
            <p className="text-text-muted text-sm">
              Try adjusting your search or filter criteria
            </p>
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
