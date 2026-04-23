import React from 'react';
import { Card } from './GlassCard';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useContent } from '../hooks/useContent';
import { SectionHeading } from './SectionHeading';
import { getIconByName } from '../utils/iconMap';

const DottedSurface = React.lazy(() => import('./ui/dotted-surface').then(m => ({ default: m.DottedSurface })));

export const Services: React.FC = () => {
  const { services } = useContent();
  return (
    <section id="services" className="py-24 bg-background border-b border-border overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 border-b border-border pb-8">
          <SectionHeading
            className="max-w-2xl"
            eyebrow="03. Capabilities"
            title={
              <>
                TECHNICAL<br />DEEP DIVE
              </>
            }
          />
          <div className="mt-6 md:mt-0">
             <p className="section-lead max-w-md font-medium">
               Architecting systems that drive competitive advantage through autonomy.
             </p>
             {/* Mobile Swipe Hint */}
             <div className="md:hidden font-mono text-[10px] text-muted animate-pulse mt-4">
               <span className="mr-2">←</span> SWIPE <span className="ml-2">→</span>
             </div>
          </div>
        </div>

        {/* 
          Mobile: Flex carousel with borders
          Desktop: Grid with gap-based borders 
        */}
        <div className="relative overflow-hidden border border-border bg-background p-2 sm:p-3 md:p-4">
          <React.Suspense fallback={null}>
            <DottedSurface className="opacity-45 [mask-image:radial-gradient(circle_at_center,black_30%,transparent_80%)]" />
          </React.Suspense>
          <div className="relative z-10 flex overflow-x-auto snap-x snap-mandatory gap-4 pb-8 -mx-4 px-4 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-8 md:pb-0 md:mx-0 md:px-0 scrollbar-thin">
            {services.map((service, idx) => (
              <Link 
                key={service.id} 
                to={`/services/${service.id}`}
                className="min-w-[85vw] sm:min-w-[350px] md:min-w-0 snap-center h-full"
              >
                <Card 
                  className="border border-border mt-1 shadow-none h-full group hover:border-primary transition-colors duration-300"
                >
                <h3 className="text-2xl font-bold text-foreground mb-3 tracking-tight">
                  {service.title}
                </h3>
                
                <p className="text-sm font-mono text-signal mb-6">
                  {service.tagline}
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
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};