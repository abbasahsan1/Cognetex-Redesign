import React from 'react';
import { Card } from './GlassCard';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useContent } from '../hooks/useContent';
import { SectionHeading } from './SectionHeading';

const DottedSurface = React.lazy(() => import('./ui/dotted-surface').then(m => ({ default: m.DottedSurface })));

export const Projects: React.FC = () => {
  const { projects } = useContent();
  return (
    <section id="projects" className="relative py-16 md:py-24 bg-background border-b border-border overflow-hidden">
      <React.Suspense fallback={null}>
        <DottedSurface className="opacity-40" />
      </React.Suspense>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex justify-between items-end mb-12 md:mb-16">

          <SectionHeading
            eyebrow="02. Case Studies"
            eyebrowClassName="text-muted"
            title={
              <>
                Proven<br />ROI
              </>
            }

          />
          {/* Mobile Swipe Hint */}
          <div className="md:hidden font-mono text-[10px] text-muted animate-pulse mb-1">
            <span className="mr-2">←</span> SWIPE <span className="ml-2">→</span>
          </div>
        </div>

        {/* 
          Mobile: Horizontal scroll (Carousel)
          Desktop: Grid
        */}
        <div className="relative overflow-hidden border border-border bg-background/50 backdrop-blur-sm p-2 sm:p-3 md:p-4">
          <div className="relative z-10 flex overflow-x-auto snap-x snap-mandatory gap-4 pb-8 -mx-4 px-4 md:grid md:grid-cols-1 lg:grid-cols-2 md:gap-8 md:pb-0 md:mx-0 md:px-0 scrollbar-thin">
            {projects.map((project, idx) => (
              <Link 
                key={project.id} 
                to={`/projects/${project.id}`}
                className="min-w-[85vw] sm:min-w-[400px] md:min-w-0 snap-center h-full"
              >
                <Card 
                  className="group hover:border-signal transition-colors duration-300 h-full flex flex-col"
                >
                <div className="flex justify-between items-start mb-6 md:mb-8">
                  <div className="inline-block px-2 py-1 bg-background border border-border text-xs font-mono text-muted uppercase">
                    {project.clientSector}
                  </div>
                  <ArrowUpRight className="text-muted group-hover:text-signal transition-colors" />
                </div>

                <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4 md:mb-6 leading-none">
                  {project.title}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-6 md:mb-8 flex-grow">
                  <div>
                    <h4 className="text-[10px] font-bold text-muted uppercase tracking-widest mb-2 border-b border-border pb-1">Challenge</h4>
                    <p className="text-sm text-foreground/80 leading-relaxed">{project.challenge}</p>
                  </div>
                  <div>
                    <h4 className="text-[10px] font-bold text-muted uppercase tracking-widest mb-2 border-b border-border pb-1">Solution</h4>
                    <p className="text-sm text-foreground/80 leading-relaxed">{project.solution}</p>
                  </div>
                </div>

                <div className="bg-paper border border-border p-6 grid grid-cols-3 gap-4 md:gap-8 mt-auto">

                  {project.stats.map((stat, sIdx) => (
                    <div key={sIdx} className="text-center group/stat">
                      <p className="text-xl md:text-3xl font-bold text-foreground mb-1 font-mono tracking-tighter transition-colors group-hover/stat:text-signal">{stat.value}</p>
                      <p className="text-[9px] text-muted uppercase tracking-[0.2em] font-semibold">{stat.label}</p>
                    </div>
                  ))}
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