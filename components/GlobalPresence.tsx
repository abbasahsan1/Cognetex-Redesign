import React, { Suspense, lazy } from 'react';
import { SectionHeading } from './SectionHeading';

const GlobePulse = lazy(() => import('./ui/cobe-globe-pulse').then(m => ({ default: m.GlobePulse })));
const DottedSurface = lazy(() => import('./ui/dotted-surface').then(m => ({ default: m.DottedSurface })));

export const GlobalPresence: React.FC = () => {
  return (
    <section className="py-24 bg-background border-b border-border overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1300px]">
        <div className="relative w-full border border-border bg-background p-8 md:p-12 lg:p-16 flex flex-col lg:flex-row items-center justify-between gap-12 overflow-hidden shadow-hard">
          <Suspense fallback={null}>
            <DottedSurface className="opacity-30" />
          </Suspense>
          
          <div className="relative z-20 lg:w-5/12 text-left">
            <SectionHeading
              eyebrow="Global Reach"
              titleClassName="text-4xl md:text-5xl lg:text-6xl leading-none"
              title={
                <>
                  Delivery Across
                  <br />
                  Time Zones
                </>

              }
            />
            <p className="text-base md:text-lg mt-8 max-w-xl text-foreground/70 leading-relaxed">
              From product strategy to implementation, we support distributed teams with follow-the-sun execution
              and reliable engineering delivery worldwide.
            </p>
          </div>

          <div className="relative z-10 lg:w-7/12 flex items-center justify-center w-full min-h-[300px] md:min-h-0">
            <div className="relative w-full aspect-square max-w-[300px] sm:max-w-[450px] lg:max-w-[600px] flex items-center justify-center">
              <Suspense fallback={<div className="w-48 h-48 bg-paper/50 animate-pulse rounded-full" />}>
                <GlobePulse
                  className="w-full h-full"
                  speed={0.0018}
                />
              </Suspense>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
