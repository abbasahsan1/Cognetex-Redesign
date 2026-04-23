import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

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
            eyebrow="04. Human Capital"
            titleClassName="md:text-4xl"

            title={
              <>
                Human<br />Capital
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
            <Link 
              key={member.id} 
              to={`/team/${member.id}`}
              className="min-w-[85vw] sm:min-w-[320px] md:min-w-[400px] snap-center h-full block cursor-pointer group"
            >
              <Card 
                className="h-full flex flex-col group-hover:border-signal transition-colors transition-all duration-300"
              >
                <div className="relative aspect-[4/5] mb-6 overflow-hidden bg-paper">
                  <CloudinaryImage
                    publicId={member.image}
                    alt={member.name}
                    loading="lazy"
                    width={400}
                    height={500}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"

                  />
                  <div className="absolute inset-0 bg-signal/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="border-l border-signal/30 pl-4">
                  <p className="text-foreground font-bold text-lg uppercase tracking-tight group-hover:text-signal transition-colors">{member.name}</p>
                  <p className="text-signal text-xs font-mono mb-2">{member.role}</p>
                  <p className="text-xs text-muted leading-relaxed line-clamp-3">
                    {member.bio}
                  </p>
                </div>
              </Card>
            </Link>
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