'use client';

import { GitHubEvent, formatDate } from '@/lib/github';
import ScrollReveal from './ScrollReveal';
import TiltCard from './TiltCard';
import { GitCommit, Star, GitPullRequest, GitFork, AlertCircle } from 'lucide-react';
import GitHubIcon from './icons/GitHubIcon';

function getEventIcon(type: string) {
  switch (type) {
    case 'PushEvent': return <GitCommit className="w-4 h-4 text-accent" />;
    case 'WatchEvent': return <Star className="w-4 h-4 text-amber-400" />;
    case 'PullRequestEvent': return <GitPullRequest className="w-4 h-4 text-emerald-400" />;
    case 'ForkEvent': return <GitFork className="w-4 h-4 text-purple-400" />;
    case 'IssuesEvent': return <AlertCircle className="w-4 h-4 text-error" />;
    default: return <GitHubIcon className="w-4 h-4 text-text-muted" />;
  }
}

function getEventDescription(event: GitHubEvent) {
  const repoName = event.repo.name.split('/')[1] || event.repo.name;
  switch (event.type) {
    case 'PushEvent': return `Pushed to ${repoName}`;
    case 'WatchEvent': return `Starred ${repoName}`;
    case 'PullRequestEvent': return `Opened PR on ${repoName}`;
    case 'ForkEvent': return `Forked ${repoName}`;
    case 'IssuesEvent': return `Opened issue on ${repoName}`;
    default: return `Activity on ${repoName}`;
  }
}

export default function ActivityFeed({ events }: { events: GitHubEvent[] }) {
  const displayEvents = events.slice(0, 5); // Show top 5 recent events

  return (
    <ScrollReveal delay={0.3}>
      <TiltCard maxTilt={3}>
        <div className="glass-card holo-shimmer rounded-2xl p-6 h-full">
          <h3 className="font-heading text-lg font-bold text-text-primary mb-6 flex items-center justify-between">
            <span>Recent <span className="gradient-text">Activity</span></span>
            <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
          </h3>
          
          <div className="space-y-4">
            {displayEvents.length > 0 ? (
              displayEvents.map((event) => (
                <div key={event.id} className="flex gap-4 p-3 rounded-xl glass-card-static hover:border-border-hover transition-colors">
                  <div className="mt-0.5">
                    {getEventIcon(event.type)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-text-primary">
                      {getEventDescription(event)}
                    </p>
                    <p className="text-xs text-text-muted mt-1 font-mono">
                      {formatDate(event.created_at)}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-text-muted text-sm italic p-4 text-center glass-card-static rounded-xl">
                No recent public activity.
              </p>
            )}
          </div>
        </div>
      </TiltCard>
    </ScrollReveal>
  );
}
