import React from 'react';
import { Card } from './GlassCard';
import { ArrowRight } from 'lucide-react';
import { useContent } from '../hooks/useContent';
import { SectionHeading } from './SectionHeading';

export const AIServicesSection: React.FC = () => {
  const { aiServices } = useContent();
  return (
    <section className="py-20 md:py-28 bg-background border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 md:mb-16">
          <SectionHeading
            eyebrow="03. Our AI Services"
            titleClassName="md:text-6xl"
            title={
              <>
                OUR AI
                <br />
                SERVICES
              </>
            }
          />
          <p className="section-lead max-w-xl">
            Modular service lines that help you deploy AI faster, safer, and with long-term scalability in mind.
          </p>
        </div>

        <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-8 -mx-4 px-4 md:grid md:grid-cols-2 xl:grid-cols-3 md:gap-6 md:pb-0 md:mx-0 md:px-0 scrollbar-thin">
          {aiServices.map((service) => (
            <Card key={service.id} className="h-full flex flex-col min-w-[85vw] sm:min-w-[350px] md:min-w-0 snap-center group hover:border-signal transition-colors duration-300">
              <div className="flex items-center justify-between mb-8">
                <div className="p-2 border border-border group-hover:border-primary transition-colors">
                  <ArrowRight size={16} className="text-signal group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3 tracking-tight">
                {service.title}
              </h3>
              <p className="text-sm text-muted leading-relaxed mb-6">
                {service.description}
              </p>
              <div className="mt-auto">
                <div className="h-px w-full bg-border md:group-hover:bg-primary transition-colors mb-4" />
                <ul className="space-y-2">
                  {service.outcomes.map((outcome, oIdx) => (
                    <li key={oIdx} className="flex items-center gap-2 text-xs font-mono text-foreground">
                      <span className="w-2 h-2 bg-signal" />
                      {outcome}
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
