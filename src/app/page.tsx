import { getProcessedRepos } from '@/lib/github';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import GitHubSection from '@/components/GitHubSection';
import FunZone from '@/components/FunZone';
import Skills from '@/components/Skills';
import Education from '@/components/Education';
import Testimonials from '@/components/Testimonials';
import Blog from '@/components/Blog';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export const revalidate = 3600;

export default async function Home() {
  const { pinned, other, forked } = await getProcessedRepos();
  const allRepos = [...pinned, ...other];

  return (
    <>
      <Navbar />
      <main>
        <Hero />

        {/* ─── About ─── */}
        <div className="section-separator" />
        <About />

        {/* ─── Experience ─── */}
        <div className="section-separator" />
        <Experience />

        {/* ─── GitHub Stats ─── */}
        <div className="section-separator" />
        <GitHubSection />

        {/* ─── Projects ─── */}
        <div className="section-separator" />
        <Projects pinned={pinned} other={other} forked={forked} />

        {/* ─── Fun Zone ─── */}
        <FunZone allRepos={allRepos} />

        {/* ─── Skills ─── */}
        <div className="section-separator" />
        <Skills />

        {/* ─── Testimonials ─── */}
        <div className="section-separator" />
        <Testimonials />

        {/* ─── Blog ─── */}
        <div className="section-separator" />
        <Blog />

        {/* ─── Education ─── */}
        <div className="section-separator" />
        <Education />

        {/* ─── Contact ─── */}
        <div className="section-separator" />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
