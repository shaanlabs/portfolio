'use client';

import Link from 'next/link';
import { Home, ArrowLeft } from 'lucide-react';
import DotGrid from '@/components/DotGrid';
import CursorGlow from '@/components/CursorGlow';
import MagneticButton from '@/components/MagneticButton';
import TiltCard from '@/components/TiltCard';

export default function NotFound() {
  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden bg-background">
      <CursorGlow />
      <DotGrid />
      
      {/* Floating orbs for 404 void effect */}
      <div className="orb orb-indigo w-[400px] h-[400px] top-[20%] left-[20%] opacity-30" />
      <div className="orb orb-cyan w-[300px] h-[300px] bottom-[20%] right-[20%] opacity-20" />
      
      <div className="relative z-10 w-full max-w-2xl mx-auto px-4 text-center">
        <TiltCard maxTilt={5}>
          <div className="glass-card holo-shimmer rounded-3xl p-12 sm:p-16 border border-glass-border">
            <h1 className="font-heading text-8xl sm:text-9xl font-bold tracking-tighter mb-4">
              <span className="gradient-text">404</span>
            </h1>
            
            <div className="w-16 h-1 bg-[image:var(--gradient-accent)] mx-auto rounded-full mb-8" />
            
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-text-primary mb-4">
              Lost in the <span className="text-accent">Void</span>
            </h2>
            
            <p className="text-text-secondary text-lg mb-10 max-w-md mx-auto leading-relaxed">
              The page you're looking for has drifted into the digital ether. 
              Let's get you back to safe harbor.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <MagneticButton>
                <Link 
                  href="/"
                  className="btn-glow inline-flex items-center gap-2 px-8 py-4 rounded-full text-white font-semibold"
                >
                  <Home className="w-4 h-4" />
                  Return Home
                </Link>
              </MagneticButton>
              
              <MagneticButton strength={10}>
                <button
                  onClick={() => window.history.back()}
                  className="glass-card-static inline-flex items-center gap-2 px-8 py-4 text-text-primary font-semibold rounded-full transition-all duration-300 hover:border-border-hover hover:shadow-[var(--shadow-glow)]"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Go Back
                </button>
              </MagneticButton>
            </div>
          </div>
        </TiltCard>
      </div>
    </div>
  );
}
