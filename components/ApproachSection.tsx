import React from 'react';
import { uniqueApproach } from '../data/content';
import { Card } from './GlassCard';

export const ApproachSection: React.FC = () => {
  return (
    <section className="py-20 md:py-28 bg-background border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12 md:mb-16">
          <div className="max-w-2xl">
            <span className="font-mono text-xs text-signal uppercase tracking-wider mb-2 block">01. Our Unique Approach</span>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground tracking-tight">
              BUILT AROUND
              <br />
              YOUR MISSION
            </h1>
          </div>
          <p className="text-muted text-lg max-w-xl font-medium leading-relaxed">
            Every client is different so we deliver personalized, high-impact technology strategies designed to drive measurable success and long-term value.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {uniqueApproach.map((item, idx) => (
            <Card key={item.id} className="h-full">
              <div className="flex items-center justify-between mb-6">
                <span className="font-mono text-xs text-muted">AP_0{idx + 1}</span>
                <div className="w-8 h-8 border border-border flex items-center justify-center font-mono text-xs text-muted">
                  {idx + 1}
                </div>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3 tracking-tight">
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
