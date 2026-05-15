import React from 'react';
import { useContent } from '../hooks/useContent';

export const ComplianceSection: React.FC = () => {
  const { trustLogos } = useContent();

  return (
    <section className="bg-background border-b border-border">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6 md:gap-x-20">
          <div className="text-[10px] font-mono text-muted uppercase tracking-[0.2em] w-full text-center mb-2 lg:w-auto lg:mb-0 lg:mr-8 border-r-0 lg:border-r border-border lg:pr-8">
            Security Standards
          </div>
          {trustLogos.map((item) => (
            <div 
              key={item.id || item.name} 
              className="flex flex-col items-center gap-2"
            >
              <div className="w-10 h-10 flex items-center justify-center">
                <img 
                  src={item.src} 
                  alt={item.alt} 
                  className="max-w-full max-h-full dark:invert"
                />

              </div>
              <span className="text-[9px] font-mono text-muted/60 uppercase tracking-widest hidden sm:block">
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
