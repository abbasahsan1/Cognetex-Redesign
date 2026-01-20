import React from 'react';
import { Card } from './GlassCard';
import { useContent } from '../hooks/useContent';
import { SectionHeading } from './SectionHeading';

export const AITechStackSection: React.FC = () => {
  const { aiTechStack } = useContent();
  return (
    <section className="py-20 md:py-28 bg-paper border-b border-border">
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

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {aiTechStack.map((category, idx) => (
            <Card key={category.id} className="h-full">
              <div className="flex items-center justify-between mb-6">
                <span className="font-mono text-xs text-muted">TS_0{idx + 1}</span>
                <div className="h-px w-10 bg-border" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4 tracking-tight">
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.items.map((item) => (
                  <span
                    key={item}
                    className="text-xs font-mono border border-border px-2 py-1 bg-background text-foreground"
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
