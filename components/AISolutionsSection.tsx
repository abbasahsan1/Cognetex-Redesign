import React from 'react';
import { Card } from './GlassCard';
import { useContent } from '../hooks/useContent';
import { SectionHeading } from './SectionHeading';

export const AISolutionsSection: React.FC = () => {
  const { aiSolutionPillars } = useContent();
  return (
    <section className="py-20 md:py-28 bg-paper border-b border-border">
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {aiSolutionPillars.map((pillar, idx) => (
            <Card key={pillar.id} className="h-full">
              <div className="flex items-center justify-between mb-6">
                <span className="font-mono text-xs text-muted">SOL_0{idx + 1}</span>
                <div className="h-px w-16 bg-border" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-3 tracking-tight">
                {pillar.title}
              </h3>
              <p className="text-sm text-muted leading-relaxed">
                {pillar.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
