import React from 'react';
import { GlobePulse } from './ui/cobe-globe-pulse';
import { DottedSurface } from './ui/dotted-surface';
import { SectionHeading } from './SectionHeading';

export const GlobalPresence: React.FC = () => {
  return (
    <section className="py-24 bg-background border-b border-border overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1300px]">
        <div className="relative w-full border border-border bg-background p-8 md:p-12 lg:p-16 flex flex-col lg:flex-row items-center justify-between gap-12 overflow-hidden shadow-hard">
          <DottedSurface className="opacity-30" />
          
          <div className="relative z-20 lg:w-5/12 text-left">
            <SectionHeading
              eyebrow="Global Reach"
              titleClassName="text-4xl md:text-5xl lg:text-6xl leading-none"
              title={
                <>
                  DELIVERY ACROSS
                  <br />
                  TIME ZONES
                </>
              }
            />
            <p className="text-base md:text-lg mt-8 max-w-xl text-foreground/70 leading-relaxed">
              From product strategy to implementation, we support distributed teams with follow-the-sun execution
              and reliable engineering delivery worldwide.
            </p>
          </div>

          <div className="relative z-10 lg:w-7/12 flex items-center justify-center">
            <div className="relative w-full max-w-[300px] sm:max-w-[450px] lg:max-w-[600px] xl:max-w-[700px] aspect-square flex items-center justify-center">
              <GlobePulse
                className="w-full h-full"
                speed={0.0018}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
