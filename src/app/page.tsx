import { Suspense } from 'react';
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
import Certificates from '@/components/Certificates';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export const revalidate = 3600; // ISR: revalidate every hour

export default async function Home() {
  const { pinned, other, forked } = await getProcessedRepos();
  const allRepos = [...pinned, ...other];

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <div className="section-separator" />
        <About />
        <Experience />
        <div className="section-separator" />
        <GitHubSection />
        <div className="section-separator" />
        <Projects pinned={pinned} other={other} forked={forked} />
        <FunZone allRepos={allRepos} />
        <div className="section-separator" />
        <Skills />
        <Education />
        <Certificates />
        <div className="section-separator" />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
