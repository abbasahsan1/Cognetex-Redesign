import React from 'react';
import { AIServicesSection } from '../components/AIServicesSection';
import { AISolutionsSection } from '../components/AISolutionsSection';
import { AITechStackSection } from '../components/AITechStackSection';
import { PageSEO } from '../components/PageSEO';
import { DottedSurface } from '../components/ui/dotted-surface';

export const AIServices: React.FC = () => {
  return (
    <>
      <PageSEO 
        title="AI Engineering & Services" 
        description="Comprehensive AI solutions for enterprise. From strategy and readiness to agentic automation and predictive analytics."
      />
      
      {/* High-End Editorial Hero */}
      <section className="pt-32 md:pt-48 pb-20 bg-background border-b border-border relative overflow-hidden">
        <DottedSurface className="opacity-20 translate-y-20" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl">
            <span className="section-eyebrow">02. Capabilities</span>
            <h1 className="section-title">
              INTELLIGENT <br />
              <span className="text-signal">INFRASTRUCTURE</span>
            </h1>
            <p className="section-lead mt-10 max-w-2xl">
              From RAG architectures to Agentic workflows, we deploy production-grade AI that transforms 
              operational complexity into competitive advantage.
            </p>
          </div>
        </div>
      </section>

      <AIServicesSection />
      <AISolutionsSection />
      <AITechStackSection />
    </>
  );
};
