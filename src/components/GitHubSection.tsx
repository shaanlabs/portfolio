import { fetchGitHubStats, fetchLanguageBreakdown, fetchRecentActivity } from '@/lib/github';
import GitHubStatsSection from './GitHubStats';
import LanguageChart from './LanguageChart';
import ActivityFeed from './ActivityFeed';
import ContributionHeatmap from './ContributionHeatmap';
import ScrollReveal from './ScrollReveal';
import GitHubIcon from './icons/GitHubIcon';

export default async function GitHubSection() {
  const [stats, languages, events] = await Promise.all([
    fetchGitHubStats(),
    fetchLanguageBreakdown(),
    fetchRecentActivity(),
  ]);

  return (
    <section className="py-24 relative aurora-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-text-primary mb-4">
              <GitHubIcon className="inline-block w-8 h-8 mr-2 text-text-primary" />
              GitHub <span className="gradient-text">Activity</span>
            </h2>
            <div className="w-16 h-1 bg-[image:var(--gradient-accent)] mx-auto rounded-full" />
          </div>
        </ScrollReveal>

        <div className="space-y-6">
          <GitHubStatsSection stats={stats} />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <LanguageChart languages={languages} />
            </div>
            <div className="lg:col-span-1">
              <ContributionHeatmap events={events} />
            </div>
            <div className="lg:col-span-1">
              <ActivityFeed events={events} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
