import React from 'react';
import { GlobePulse } from './ui/cobe-globe-pulse';
import { SectionHeading } from './SectionHeading';

export const GlobalPresence: React.FC = () => {
  return (
    <section className="py-20 md:py-24 bg-paper border-b border-border">
      <div className="w-full max-w-[2200px] mx-auto px-4 sm:px-6 lg:px-10 2xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 2xl:gap-20 items-center">
          <div className="lg:col-span-5">
            <SectionHeading
              className="max-w-xl"
              eyebrow="Global Reach"
              title={
                <>
                  DELIVERY ACROSS
                  <br />
                  TIME ZONES
                </>
              }
            />
            <p className="section-lead mt-6 max-w-xl">
              From product strategy to implementation, we support distributed teams with follow-the-sun execution
              and reliable engineering delivery worldwide.
            </p>
          </div>

          <div className="lg:col-span-7 flex justify-center">
            <div className="w-full max-w-[1200px] border border-border bg-background p-4 sm:p-6 md:p-8 2xl:p-10 flex items-center justify-center">
              <div className="w-full max-w-[320px] sm:max-w-[460px] lg:max-w-[700px] xl:max-w-[840px] 2xl:max-w-[980px] aspect-square flex items-center justify-center">
                <GlobePulse
                  className="w-full h-full"
                  speed={0.0018}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
