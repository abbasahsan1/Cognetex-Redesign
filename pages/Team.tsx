import React from 'react';
import { Team as TeamSection } from '../components/Team';
import { PageSEO } from '../components/PageSEO';
import { DottedSurface } from '../components/ui/dotted-surface';

export const Team: React.FC = () => {
  return (
    <>
      <PageSEO 
        title="Our Team" 
        description="Meet the expert team behind Cognetex. We are a collective of software engineers, AI researchers, and product designers."
      />
      
      {/* High-End Editorial Hero */}
      <section className="pt-32 md:pt-48 pb-20 bg-background border-b border-border relative overflow-hidden">
        <DottedSurface className="opacity-20 translate-y-20" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl">
            <span className="section-eyebrow">04. The Collective</span>
            <h1 className="section-title">
              ARCHITECTS OF <br />
              <span className="text-signal">AUTONOMY</span>
            </h1>
            <p className="section-lead mt-10 max-w-2xl">
              Our team consists of veteran engineers and researchers who have built and scaled systems 
              for the world's most demanding enterprises.
            </p>
          </div>
        </div>
      </section>

      <TeamSection />
      
      {/* Editorial Quote Section */}
      <section className="py-24 bg-paper border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground italic leading-tight">
              "We don't hire employees; we recruit owners. Every person at Cognetex is 
              directly responsible for client outcomes."
            </h2>
            <div className="w-12 h-1 bg-signal mx-auto mt-8" />
            <p className="font-mono text-xs uppercase tracking-widest mt-6 text-muted font-bold">Leadership Mandate_2024</p>
          </div>
        </div>
      </section>
    </>
  );
};
