import React from 'react';
import { projects } from '../data/content';
import { Card } from './GlassCard';
import { ArrowUpRight } from 'lucide-react';

export const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-16 md:py-24 bg-paper border-b border-border overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12 md:mb-16 border-l-4 border-primary pl-6">
          <div>
            <span className="font-mono text-xs text-muted uppercase tracking-wider mb-2 block">02. Case Studies</span>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">
              PROVEN<br/>ROI
            </h2>
          </div>
          {/* Mobile Swipe Hint */}
          <div className="md:hidden font-mono text-[10px] text-muted animate-pulse mb-1">
            <span className="mr-2">←</span> SWIPE <span className="ml-2">→</span>
          </div>
        </div>

        {/* 
          Mobile: Horizontal scroll (Carousel)
          Desktop: Grid
        */}
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-8 -mx-4 px-4 md:grid md:grid-cols-1 lg:grid-cols-2 md:gap-8 md:pb-0 md:mx-0 md:px-0 scrollbar-thin">
          {projects.map((project, idx) => (
            <Card 
              key={project.id} 
              className="min-w-[85vw] sm:min-w-[400px] md:min-w-0 snap-center group hover:border-primary transition-colors duration-300 h-full flex flex-col"
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

              <div className="bg-background border border-border p-4 grid grid-cols-3 gap-2 md:gap-4 mt-auto">
                {project.stats.map((stat, sIdx) => (
                  <div key={sIdx} className="text-center">
                    <p className="text-lg md:text-2xl font-bold text-primary mb-1 font-mono break-all">{stat.value}</p>
                    <p className="text-[10px] text-muted uppercase tracking-wide">{stat.label}</p>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};