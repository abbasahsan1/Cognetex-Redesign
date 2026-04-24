import React from 'react';
import { Card } from './GlassCard';
import { useContent } from '../hooks/useContent';
import { SectionHeading } from './SectionHeading';
import { usePiano } from '../hooks/usePiano';

export const AITechStackSection: React.FC = () => {
  const { aiTechStack } = useContent();
  const { playTune } = usePiano();

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

        <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-6">
          {aiTechStack.map((category, idx) => (
            <Card 
              key={category.id} 
              onClick={() => playTune(idx + 10)} // Offset to different tunes
              className="h-full group hover:border-signal transition-colors duration-300 p-4 md:p-8 cursor-pointer"
            >
              <div className="flex items-center justify-between mb-4 md:mb-8 text-foreground">
                <div className="h-px w-8 md:w-20 bg-border group-hover:bg-primary transition-colors" />
                <div className="text-[9px] md:text-[10px] font-mono tracking-tighter opacity-50 uppercase">Stack_Layer</div>
              </div>
              <h3 className="text-sm md:text-xl font-bold mb-3 md:mb-4 tracking-tight group-hover:text-primary transition-colors uppercase">
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-1 md:gap-2">
                {category.items.map((item) => (
                  <span
                    key={item}
                    className="text-[8px] md:text-[10px] font-mono border border-border px-1.5 py-0.5 md:px-2 md:py-1 bg-background text-foreground group-hover:border-signal transition-colors uppercase"
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
