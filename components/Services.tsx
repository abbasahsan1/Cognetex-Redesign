import React from 'react';
import { services } from '../data/content';
import { Card } from './GlassCard';
import { ArrowRight } from 'lucide-react';

export const Services: React.FC = () => {
  return (
    <section id="services" className="py-24 bg-background border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-border pb-8">
          <div className="max-w-2xl">
            <span className="font-mono text-xs text-signal uppercase tracking-wider mb-2 block">01. Capabilities</span>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">
              TECHNICAL<br/>DEEP DIVE
            </h2>
          </div>
          <p className="text-muted text-lg max-w-md font-medium mt-6 md:mt-0">
            Architecting systems that drive competitive advantage through autonomy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
          {services.map((service, idx) => (
            <Card key={service.id} hoverEffect className={`border-r-0 border-b-0 ${idx === 0 ? 'border-l border-t' : 'border-t md:border-l'} lg:border-l`}>
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