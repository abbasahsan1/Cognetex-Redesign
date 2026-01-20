import React from 'react';
import { Card } from './GlassCard';
import { ArrowRight } from 'lucide-react';
import { useContent } from '../hooks/useContent';
import { SectionHeading } from './SectionHeading';

export const Services: React.FC = () => {
  const { services } = useContent();
  return (
    <section id="services" className="py-24 bg-background border-b border-border overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 border-b border-border pb-8">
          <SectionHeading
            className="max-w-2xl"
            eyebrow="01. Capabilities"
            title={
              <>
                TECHNICAL<br />DEEP DIVE
              </>
            }
          />
          <div className="mt-6 md:mt-0">
             <p className="section-lead max-w-md font-medium">
               Architecting systems that drive competitive advantage through autonomy.
             </p>
             {/* Mobile Swipe Hint */}
             <div className="md:hidden font-mono text-[10px] text-muted animate-pulse mt-4">
               <span className="mr-2">←</span> SWIPE <span className="ml-2">→</span>
             </div>
          </div>
        </div>

        {/* 
          Mobile: Flex carousel with borders
          Desktop: Grid with gap-based borders 
        */}
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-8 -mx-4 px-4 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-[1px] md:pb-0 md:mx-0 md:px-0 md:bg-border md:border md:border-border scrollbar-thin">
          {services.map((service, idx) => (
            <Card 
              key={service.id} 
              hoverEffect 
              className="min-w-[85vw] sm:min-w-[350px] md:min-w-0 snap-center border border-border md:border-none shadow-none h-full"
            >
              <div className="flex justify-between items-start mb-12">
                <span className="font-mono text-xs text-muted">SRV_0{idx + 1}</span>
                <service.icon size={24} className="text-primary" strokeWidth={1.5} />
              </div>
              
              <h3 className="text-2xl font-bold text-foreground mb-3 tracking-tight">
                {service.title}
              </h3>
              
              <p className="text-sm font-mono text-signal mb-6">
                // {service.tagline}
              </p>
              
              <p className="text-muted mb-8 leading-relaxed text-sm">
                {service.description}
              </p>
              
              <div className="mt-auto">
                <div className="h-px w-full bg-border mb-4" />
                <ul className="space-y-2">
                  {service.capabilities.map((cap, cIdx) => (
                    <li key={cIdx} className="flex items-center gap-2 text-xs font-mono text-foreground">
                      <ArrowRight size={12} className="text-signal" />
                      {cap}
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};