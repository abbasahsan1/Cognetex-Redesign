import React from 'react';
import { Card } from './GlassCard';
import { useContent } from '../hooks/useContent';
import { SectionHeading } from './SectionHeading';

export const AITechStackSection: React.FC = () => {
  const { aiTechStack } = useContent();
  return (
    <section className="py-20 md:py-28 bg-background border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 md:mb-16">
          <SectionHeading
            eyebrow="04. AI Technology Stack"
            titleClassName="md:text-6xl"
            title={
              <>
                AI TECHNOLOGY
                <br />
                STACK
              </>
            }
          />
          <p className="section-lead max-w-xl">
            We select tooling based on business requirements, performance needs, and security constraints—never hype.
          </p>
        </div>

        <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-8 -mx-4 px-4 md:grid md:grid-cols-2 xl:grid-cols-3 md:gap-6 md:pb-0 md:mx-0 md:px-0 scrollbar-thin">
          {aiTechStack.map((category) => (
            <Card key={category.id} className="h-full min-w-[85vw] sm:min-w-[350px] md:min-w-0 snap-center group hover:border-signal transition-colors duration-300">
              <div className="flex items-center justify-between mb-8 text-foreground">
                <div className="h-px w-20 bg-border group-hover:bg-primary transition-colors" />
                <div className="text-[10px] font-mono tracking-tighter opacity-50 uppercase">Stack_Layer</div>
              </div>
              <h3 className="text-xl font-bold mb-4 tracking-tight group-hover:text-primary transition-colors">
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.items.map((item) => (
                  <span
                    key={item}
                    className="text-[10px] font-mono border border-border px-2 py-1 bg-background text-foreground group-hover:border-signal transition-colors uppercase"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
