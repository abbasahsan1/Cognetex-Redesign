import React from 'react';
import { ApproachSection } from '../components/ApproachSection';
import { PageSEO } from '../components/PageSEO';
import { DottedSurface } from '../components/ui/dotted-surface';

export const Approach: React.FC = () => {
  return (
    <>
      <PageSEO 
        title="Our Approach" 
        description="Learn about our unique approach to AI development and software engineering. We focus on client-centric design and high-impact delivery."
      />
      
      {/* High-End Editorial Hero */}
      <section className="pt-32 md:pt-48 pb-20 bg-background border-b border-border relative overflow-hidden">
        <DottedSurface className="opacity-20 translate-y-20" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl">
            <span className="section-eyebrow">01. Strategy & Execution</span>
            <h1 className="section-title">
              THE SCIENCE OF <br />
              <span className="text-signal">DELIVERY</span>
            </h1>
            <p className="section-lead mt-10 max-w-2xl">
              We don't just build models; we architect systems. Our approach combines rigorous engineering 
              with a deep understanding of enterprise operational requirements.
            </p>
          </div>
        </div>
      </section>

      <ApproachSection />
    </>
  );
};
