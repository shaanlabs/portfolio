import ScrollReveal from './ScrollReveal';

export default function About() {
  return (
    <section id="about" className="py-24 relative aurora-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-text-primary mb-4">
              About <span className="gradient-text">Me</span>
            </h2>
            <div className="w-16 h-1 bg-[image:var(--gradient-accent)] mx-auto rounded-full mb-8" />

            <div className="glass-card rounded-2xl p-8 sm:p-10 text-left space-y-6">
              <p className="text-text-secondary text-lg leading-relaxed">
                I&apos;m a backend-focused developer from Karnataka, India, with hands-on
                experience shipping production systems — from REST APIs and SaaS platforms
                to ERPNext modules and AI-powered automation tools.
              </p>
              <p className="text-text-secondary text-lg leading-relaxed">
                In early 2025, I co-founded{' '}
                <span className="text-accent font-medium">AtomNext Solutions</span>,
                where I owned client delivery end-to-end — discovery, architecture,
                deployment, and support — for AI chatbot integrations and digital
                transformation projects. I stepped away in mid-2026 to focus on a
                full-time engineering role, bringing entrepreneurial grit and a bias
                for shipping to my next team.
              </p>
              <p className="text-text-secondary text-lg leading-relaxed">
                I work across{' '}
                <span className="text-accent-secondary font-medium">
                  Python, JavaScript/Node.js, and SQL
                </span>{' '}
                stacks, and I&apos;m comfortable anywhere from Django/FastAPI backends to
                Frappe/ERPNext customizations. I&apos;m looking for a team that values
                clean code, real impact, and building things that work.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
