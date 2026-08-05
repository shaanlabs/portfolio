'use client';

import { GitHubEvent } from '@/lib/github';
import ScrollReveal from './ScrollReveal';
import TiltCard from './TiltCard';
import { useMemo } from 'react';

export default function ContributionHeatmap({ events }: { events: GitHubEvent[] }) {
  // Generate a 14 weeks x 7 days grid representing the last 98 days
  const grid = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Create map of counts per date string "YYYY-MM-DD"
    const eventCounts: Record<string, number> = {};
    events.forEach(e => {
      const d = e.created_at.split('T')[0];
      eventCounts[d] = (eventCounts[d] || 0) + 1;
    });

    const weeks = [];
    let currentDay = new Date(today);
    // Rewind 97 days
    currentDay.setDate(today.getDate() - 97);

    for (let w = 0; w < 14; w++) {
      const days = [];
      for (let d = 0; d < 7; d++) {
        const dateStr = currentDay.toISOString().split('T')[0];
        const count = eventCounts[dateStr] || 0;
        days.push({
          date: dateStr,
          count
        });
        currentDay.setDate(currentDay.getDate() + 1);
      }
      weeks.push(days);
    }
    return weeks;
  }, [events]);

  const getColorClass = (count: number) => {
    if (count === 0) return 'bg-border/20';
    if (count === 1) return 'bg-accent/30';
    if (count === 2) return 'bg-accent/60';
    if (count >= 3) return 'bg-accent';
    return 'bg-border/20';
  };

  return (
    <ScrollReveal delay={0.4}>
      <TiltCard maxTilt={3}>
        <div className="glass-card holo-shimmer rounded-2xl p-6 h-full flex flex-col justify-between">
          <h3 className="font-heading text-lg font-bold text-text-primary mb-4">
            Recent <span className="gradient-text">Contributions</span>
          </h3>
          
          <div className="flex-1 flex flex-col justify-end">
            <div className="flex gap-1.5 items-end overflow-x-auto pb-2 scrollbar-hide">
              {grid.map((week, i) => (
                <div key={i} className="flex flex-col gap-1.5">
                  {week.map(day => (
                    <div 
                      key={day.date}
                      title={`${day.count} contributions on ${day.date}`}
                      className={`w-3.5 h-3.5 rounded-sm ${getColorClass(day.count)} transition-all duration-300 hover:scale-125 hover:shadow-[0_0_10px_rgba(99,102,241,0.5)] cursor-default`}
                    />
                  ))}
                </div>
              ))}
            </div>
            
            <div className="flex items-center justify-between mt-4 text-xs text-text-muted">
              <span>Last 98 days</span>
              <div className="flex items-center gap-1.5">
                <span>Less</span>
                <div className="flex gap-1">
                  <div className="w-2.5 h-2.5 rounded-sm bg-border/20" />
                  <div className="w-2.5 h-2.5 rounded-sm bg-accent/30" />
                  <div className="w-2.5 h-2.5 rounded-sm bg-accent/60" />
                  <div className="w-2.5 h-2.5 rounded-sm bg-accent" />
                </div>
                <span>More</span>
              </div>
            </div>
          </div>
        </div>
      </TiltCard>
    </ScrollReveal>
  );
}
