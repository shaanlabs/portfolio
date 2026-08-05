import { GraduationCap, Award } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

export default function Education() {
  return (
    <section id="education" className="py-24 relative aurora-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-text-primary mb-4">
              <span className="gradient-text">Education</span>
            </h2>
            <div className="w-16 h-1 bg-[image:var(--gradient-accent)] mx-auto rounded-full" />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="max-w-2xl mx-auto">
            <div className="glass-card holo-shimmer rounded-2xl p-8">
              <div className="flex items-start gap-5">
                <div
                  className="w-14 h-14 rounded-2xl glass-card-static
                              flex items-center justify-center flex-shrink-0"
                  style={{ boxShadow: '0 0 24px rgba(99, 102, 241, 0.15)' }}
                >
                  <GraduationCap className="w-7 h-7 text-accent" />
                </div>
                <div className="flex-1">
                  <h3 className="font-heading text-xl font-bold text-text-primary mb-1">
                    Bachelor of Computer Application (BCA)
                  </h3>
                  <p className="text-accent-secondary font-medium mb-2">
                    Anjuman Institute of Management and Computer Application
                  </p>
                  <p className="text-text-muted text-sm mb-4">
                    Bhatkal, Karnataka — Oct 2023 – July 2026
                  </p>
                  <div
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl
                                glass-card-static"
                    style={{ boxShadow: '0 0 16px rgba(99, 102, 241, 0.1)' }}
                  >
                    <Award className="w-4 h-4 text-accent" />
                    <span className="font-mono text-sm font-bold gradient-text">
                      CGPA 8.64
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
