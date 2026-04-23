import React from 'react';
import { Card } from './GlassCard';
import { useContent } from '../hooks/useContent';
import { SectionHeading } from './SectionHeading';

export const ApproachSection: React.FC = () => {
  const { uniqueApproach } = useContent();
  return (
    <section className="py-20 md:py-28 bg-background border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12 md:mb-16">
          <SectionHeading
            className="max-w-2xl"
            eyebrow="01. Our Unique Approach"
            titleClassName="md:text-6xl"
            title={
              <>
                BUILT AROUND
                <br />
                YOUR MISSION
              </>
            }
          />
          <p className="section-lead max-w-xl font-medium">
            Every client is different so we deliver personalized, high-impact technology strategies designed to drive measurable success and long-term value.
          </p>
        </div>

        <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-8 -mx-4 px-4 md:grid md:grid-cols-2 xl:grid-cols-4 md:gap-6 md:pb-0 md:mx-0 md:px-0 scrollbar-thin">
          {uniqueApproach.map((item, idx) => (
            <Card key={item.id} className="h-full min-w-[85vw] sm:min-w-[320px] md:min-w-0 snap-center group hover:border-signal transition-colors duration-300">
              <div className="flex items-center justify-between mb-8">
                <div className="w-10 h-10 border border-border group-hover:border-primary flex items-center justify-center font-mono text-xs text-muted group-hover:text-signal transition-all duration-300">
                  {String(idx + 1).padStart(2, '0')}
                </div>
                <div className="h-px flex-grow ml-4 bg-border group-hover:bg-primary transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4 tracking-tight group-hover:text-primary transition-colors">
                {item.title}
              </h3>
              <p className="text-sm text-muted leading-relaxed">
                {item.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
