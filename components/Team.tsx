import React from 'react';
import { useContent } from '../hooks/useContent';
import { SectionHeading } from './SectionHeading';
import { CloudinaryImage } from './CloudinaryImage';

export const Team: React.FC = () => {
  const { team } = useContent();
  return (
    <section id="team" className="py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12 md:mb-16">
          <SectionHeading
            eyebrow="04. The Engineers"
            titleClassName="md:text-4xl"
            title={
              <>
                HUMAN<br />CAPITAL
              </>
            }
          />
          {/* Mobile Swipe Hint */}
          <div className="md:hidden font-mono text-[10px] text-muted animate-pulse">
            <span className="mr-2">←</span> SWIPE <span className="ml-2">→</span>
          </div>
        </div>

        <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-thin">
          {team.map((member) => (
            <div key={member.id} className="group min-w-[85vw] sm:min-w-[320px] md:min-w-[360px] lg:min-w-[320px] snap-center">
              <div className="relative aspect-[4/5] mb-4 overflow-hidden border border-border bg-paper group-hover:border-primary transition-colors duration-300">
                <CloudinaryImage
                  publicId={member.image}
                  alt={member.name}
                  loading="lazy"
                  width={400}
                  height={500}
                  className="w-full h-full object-cover filter grayscale contrast-125 group-hover:grayscale-0 transition-all duration-500"
                />
              </div>
              <div className="border-l-2 border-primary pl-4">
                <p className="text-foreground font-bold text-lg uppercase tracking-tight">{member.name}</p>
                <p className="text-signal text-xs font-mono mb-2">{member.role}</p>
                <p className="text-xs text-muted leading-relaxed max-w-[280px] md:max-w-[200px]">
                  {member.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};