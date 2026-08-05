'use client';

import { LanguageStat } from '@/lib/github';
import ScrollReveal from './ScrollReveal';
import TiltCard from './TiltCard';

export default function LanguageChart({ languages }: { languages: LanguageStat[] }) {
  // Take top 5 for the chart
  const topLangs = languages.slice(0, 5);
  const othersPercentage = languages.slice(5).reduce((acc, lang) => acc + lang.percentage, 0);
  
  if (othersPercentage > 0) {
    topLangs.push({
      name: 'Other',
      count: 0, // not used in UI directly
      color: '#8b98a5',
      percentage: othersPercentage,
    });
  }

  // Compute CSS gradient for the donut chart
  let currentPercentage = 0;
  const gradientStops = topLangs.map(lang => {
    const start = currentPercentage;
    const end = currentPercentage + lang.percentage;
    currentPercentage = end;
    return `${lang.color} ${start}% ${end}%`;
  }).join(', ');

  return (
    <ScrollReveal delay={0.2}>
      <TiltCard maxTilt={3}>
        <div className="glass-card holo-shimmer rounded-2xl p-8 h-full flex flex-col justify-center items-center">
          <h3 className="font-heading text-lg font-bold text-text-primary mb-8 self-start">
            Language <span className="gradient-text">Breakdown</span>
          </h3>
          
          <div className="flex flex-col sm:flex-row items-center gap-10 w-full justify-center">
            {/* CSS Donut Chart */}
            <div 
              className="relative w-40 h-40 rounded-full flex-shrink-0"
              style={{
                background: `conic-gradient(${gradientStops})`,
                boxShadow: '0 0 30px rgba(255,255,255,0.05)'
              }}
            >
              <div className="absolute inset-4 rounded-full glass-card-static flex items-center justify-center">
                <span className="font-mono text-sm text-text-muted">Top 5</span>
              </div>
            </div>

            {/* Legend */}
            <div className="flex flex-col gap-3 flex-1 w-full max-w-[200px]">
              {topLangs.map(lang => (
                <div key={lang.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: lang.color }}
                    />
                    <span className="text-text-secondary">{lang.name}</span>
                  </div>
                  <span className="font-mono text-text-muted">{lang.percentage}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </TiltCard>
    </ScrollReveal>
  );
}
