import React, { useRef, useState } from 'react';
import { useContent } from '../hooks/useContent';
import { SectionHeading } from './SectionHeading';
import { CloudinaryImage } from './CloudinaryImage';
import { Card } from './GlassCard';

export const Team: React.FC = () => {
  const { team } = useContent();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const progress = (scrollLeft / (scrollWidth - clientWidth)) * 100;
      setScrollProgress(progress);
    }
  };

  return (
    <section id="team" className="py-24 bg-background overflow-hidden border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12 md:mb-16">
          <SectionHeading
            eyebrow="05. Human Capital"
            titleClassName="md:text-4xl"
            title={
              <>
                HUMAN<br />CAPITAL
              </>
            }
          />
          {/* Mobile Swipe Hint */}
          <div className="hidden md:block font-mono text-[10px] text-muted uppercase tracking-widest">
            Slide to navigate <span className="text-signal ml-2">→</span>
          </div>
        </div>

        <div 
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-12 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-none"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {team.map((member) => (
            <Card 
              key={member.id} 
              className="min-w-[85vw] sm:min-w-[320px] md:min-w-[400px] snap-center group hover:border-signal transition-colors duration-300 h-full flex flex-col"
            >
              <div className="relative aspect-[4/5] mb-6 overflow-hidden">
                <CloudinaryImage
                  publicId={member.image}
                  alt={member.name}
                  loading="lazy"
                  width={400}
                  height={500}
                  className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                />
              </div>
              <div className="border-l-2 border-primary pl-4">
                <p className="text-foreground font-bold text-lg uppercase tracking-tight">{member.name}</p>
                <p className="text-signal text-xs font-mono mb-2">{member.role}</p>
                <p className="text-xs text-muted leading-relaxed">
                  {member.bio}
                </p>
              </div>
            </Card>
          ))}
        </div>

        {/* Custom Signal Progress Track */}
        <div className="mt-8 h-[2px] w-full bg-border relative overflow-hidden hidden md:block">
          <div 
            className="absolute h-full bg-signal transition-all duration-150 ease-out"
            style={{ 
              width: `${Math.max(10, 100 / (team.length || 1))}%`,
              left: `${scrollProgress * (1 - (1 / (team.length || 1)))}%`
            }}
          />
          <div className="absolute inset-0 flex justify-between pointer-events-none">
            {Array.from({ length: team.length + 1 }).map((_, i) => (
              <div key={i} className="w-[1px] h-full bg-background/20" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};