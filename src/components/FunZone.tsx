'use client';

import { useState, useCallback } from 'react';
import { Shuffle, Gamepad2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Terminal from './Terminal';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';
import ScrollReveal from './ScrollReveal';
import { ProcessedRepo } from '@/lib/types';

interface FunZoneProps {
  allRepos: ProcessedRepo[];
}

export default function FunZone({ allRepos }: FunZoneProps) {
  const [randomRepo, setRandomRepo] = useState<ProcessedRepo | null>(null);
  const [isFlipping, setIsFlipping] = useState(false);
  const [selectedRepo, setSelectedRepo] = useState<ProcessedRepo | null>(null);

  const shuffleProject = useCallback(() => {
    if (allRepos.length === 0) return;
    setIsFlipping(true);
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * allRepos.length);
      setRandomRepo(allRepos[randomIndex]);
      setIsFlipping(false);
    }, 400);
  }, [allRepos]);

  return (
    <section className="py-24 relative aurora-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-text-primary mb-4">
              <Gamepad2 className="inline-block w-8 h-8 mr-2 text-accent" />
              Fun <span className="gradient-text">Zone</span>
            </h2>
            <div className="w-16 h-1 bg-[image:var(--gradient-accent)] mx-auto rounded-full mb-4" />
            <p className="text-text-secondary max-w-xl mx-auto">
              A little corner for exploration. Try the terminal or discover a random project.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Terminal */}
          <ScrollReveal delay={0.1}>
            <Terminal />
          </ScrollReveal>

          {/* Random Project */}
          <ScrollReveal delay={0.2}>
            <div className="text-center">
              <button
                onClick={shuffleProject}
                disabled={isFlipping}
                className="btn-glow inline-flex items-center gap-2 px-7 py-3.5 mb-6
                           rounded-full text-white font-semibold text-sm
                           disabled:opacity-50"
              >
                <Shuffle className={`w-4 h-4 ${isFlipping ? 'animate-spin' : ''}`} />
                {randomRepo ? 'Shuffle Again' : 'Random Project'}
              </button>

              <AnimatePresence mode="wait">
                {randomRepo && (
                  <motion.div
                    key={randomRepo.id}
                    initial={{ rotateY: 90, opacity: 0 }}
                    animate={{ rotateY: 0, opacity: 1 }}
                    exit={{ rotateY: -90, opacity: 0 }}
                    transition={{ duration: 0.35 }}
                    className="max-w-sm mx-auto"
                    style={{ perspective: '1000px' }}
                  >
                    <ProjectCard
                      repo={randomRepo}
                      onClick={() => setSelectedRepo(randomRepo)}
                      index={0}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {!randomRepo && (
                <div className="max-w-sm mx-auto glass-card rounded-2xl
                                border-dashed p-12 text-center">
                  <Shuffle className="w-10 h-10 text-text-muted mx-auto mb-3 opacity-30" />
                  <p className="text-text-muted text-sm">
                    Hit the button to discover a random project from the catalog!
                  </p>
                </div>
              )}
            </div>
          </ScrollReveal>
        </div>

        <ProjectModal
          repo={selectedRepo}
          onClose={() => setSelectedRepo(null)}
        />
      </div>
    </section>
  );
}
