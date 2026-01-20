import React from 'react';
import { aiServices } from '../data/content';
import { Card } from './GlassCard';
import { ArrowRight } from 'lucide-react';

export const AIServicesSection: React.FC = () => {
  return (
    <section className="py-20 md:py-28 bg-background border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 md:mb-16">
          <div>
            <span className="font-mono text-xs text-signal uppercase tracking-wider mb-2 block">03. Our AI Services</span>
            <h2 className="text-4xl md:text-6xl font-bold text-foreground tracking-tight">
              OUR AI
              <br />
              SERVICES
            </h2>
          </div>
          <p className="text-muted text-lg max-w-xl leading-relaxed">
            Modular service lines that help you deploy AI faster, safer, and with long-term scalability in mind.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {aiServices.map((service, idx) => (
            <Card key={service.id} className="h-full flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <span className="font-mono text-xs text-muted">AI_0{idx + 1}</span>
                <ArrowRight size={16} className="text-signal" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3 tracking-tight">
                {service.title}
              </h3>
              <p className="text-sm text-muted leading-relaxed mb-6">
                {service.description}
              </p>
              <div className="mt-auto">
                <div className="h-px w-full bg-border mb-4" />
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
