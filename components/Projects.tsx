import React from 'react';
import { projects } from '../data/content';
import { Card } from './GlassCard';
import { ArrowUpRight } from 'lucide-react';

export const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-24 bg-paper border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 border-l-4 border-primary pl-6">
          <span className="font-mono text-xs text-muted uppercase tracking-wider mb-2 block">02. Case Studies</span>
          <h2 className="text-4xl font-bold text-foreground tracking-tight">
            PROVEN<br/>ROI
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project, idx) => (
            <Card key={project.id} className="group hover:border-black transition-colors duration-300">
              <div className="flex justify-between items-start mb-8">
                <div className="inline-block px-2 py-1 bg-background border border-border text-xs font-mono text-muted uppercase">
                  {project.clientSector}
                </div>
                <ArrowUpRight className="text-muted group-hover:text-signal transition-colors" />
              </div>

              <h3 className="text-3xl font-bold text-foreground mb-6 leading-none">
                {project.title}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h4 className="text-[10px] font-bold text-muted uppercase tracking-widest mb-2 border-b border-border pb-1">Challenge</h4>
                  <p className="text-sm text-foreground/80 leading-relaxed">{project.challenge}</p>
                </div>
                <div>
                  <h4 className="text-[10px] font-bold text-muted uppercase tracking-widest mb-2 border-b border-border pb-1">Solution</h4>
                  <p className="text-sm text-foreground/80 leading-relaxed">{project.solution}</p>
                </div>
              </div>

              <div className="bg-background border border-border p-4 grid grid-cols-3 gap-4">
                {project.stats.map((stat, sIdx) => (
                  <div key={sIdx} className="text-center">
                    <p className="text-xl md:text-2xl font-bold text-primary mb-1 font-mono">{stat.value}</p>
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