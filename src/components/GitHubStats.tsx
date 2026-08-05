import { GitHubStats } from '@/lib/github';
import AnimatedCounter from './AnimatedCounter';
import { Star, GitFork, BookOpen } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import TiltCard from './TiltCard';

export default function GitHubStatsSection({ stats }: { stats: GitHubStats }) {
  const statItems = [
    {
      label: 'Total Repositories',
      value: stats.totalRepos,
      icon: BookOpen,
      color: 'text-accent',
      glow: 'rgba(99, 102, 241, 0.15)',
    },
    {
      label: 'Total Stars',
      value: stats.totalStars,
      icon: Star,
      color: 'text-amber-400',
      glow: 'rgba(251, 191, 36, 0.15)',
    },
    {
      label: 'Total Forks',
      value: stats.totalForks,
      icon: GitFork,
      color: 'text-emerald-400',
      glow: 'rgba(52, 211, 153, 0.15)',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {statItems.map((item, i) => {
        const Icon = item.icon;
        return (
          <ScrollReveal key={item.label} delay={i * 0.1}>
            <TiltCard maxTilt={5}>
              <div className="glass-card holo-shimmer rounded-2xl p-6 flex items-center gap-5">
                <div
                  className="w-14 h-14 rounded-2xl glass-card-static flex items-center justify-center"
                  style={{ boxShadow: `0 0 20px ${item.glow}` }}
                >
                  <Icon className={`w-7 h-7 ${item.color}`} />
                </div>
                <div>
                  <div className="font-mono text-3xl font-bold text-text-primary mb-1">
                    <AnimatedCounter value={item.value} />
                  </div>
                  <p className="text-sm text-text-muted font-medium uppercase tracking-wider">
                    {item.label}
                  </p>
                </div>
              </div>
            </TiltCard>
          </ScrollReveal>
        );
      })}
    </div>
  );
}
