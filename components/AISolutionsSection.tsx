import React from 'react';
import { Card } from './GlassCard';
import { useContent } from '../hooks/useContent';
import { SectionHeading } from './SectionHeading';

export const AISolutionsSection: React.FC = () => {
  const { aiSolutionPillars } = useContent();
  return (
    <section className="py-20 md:py-28 bg-background border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-14 items-start mb-12 md:mb-16">
          <SectionHeading
            className="lg:col-span-6"
            eyebrow="02. AI Solutions"
            titleClassName="md:text-6xl"
            title={
              <>
                AI SOLUTIONS
                <br />
                FOR MODERN BUSINESSES
              </>
            }
          />
          <div className="lg:col-span-6">
            <p className="section-lead mb-6">
              Modern organizations need AI systems that go beyond prototypes. We design production-grade solutions that integrate with your existing stack, prioritize data privacy, and produce measurable outcomes.
            </p>
            <p className="section-lead">
              From strategy to deployment, our teams deliver scalable AI that improves operational speed, customer satisfaction, and decision accuracy.
            </p>
          </div>
        </div>

        <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-8 -mx-4 px-4 md:grid md:grid-cols-2 md:gap-6 md:pb-0 md:mx-0 md:px-0 scrollbar-thin">
          {aiSolutionPillars.map((pillar) => (
            <Card key={pillar.id} className="h-full min-w-[85vw] sm:min-w-[400px] md:min-w-0 snap-center group hover:border-signal transition-colors duration-300">
              <div className="flex items-center justify-between mb-8">
                <div className="h-px w-24 bg-border group-hover:bg-primary transition-colors" />
                <div className="w-2 h-2 rounded-full border border-signal group-hover:bg-signal transition-colors" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4 tracking-tight group-hover:text-primary transition-colors">
                {pillar.title}
              </h3>
              <p className="text-sm text-muted leading-relaxed max-w-sm">
                {pillar.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
