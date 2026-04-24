import React from 'react';
import { usePiano } from '../hooks/usePiano';

const technologies = [
  'React', 'TypeScript', 'Next.js', 'Node.js', 'Rust', 'Python', 
  'TensorFlow', 'PyTorch', 'AWS', 'GCP', 'Docker', 
  'K8s', 'GraphQL', 'Postgres', 'Redis', 'Kafka'
];

export const TechMarquee: React.FC = () => {
  const { playTune } = usePiano();

  return (
    <section className="bg-paper border-b border-border overflow-hidden">
      <div className="container mx-auto">
        {/* 
          Mobile: grid-rows-2 with horizontal scroll (grid-flow-col)
          Desktop: Standard vertical grid (grid-flow-row)
        */}
        <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-16 border-l border-border">
            {technologies.map((tech, idx) => (
              <div 
                key={idx} 
                onClick={() => playTune(idx)}
                className="aspect-square border-r border-b border-border flex flex-col items-center justify-center hover:bg-primary hover:text-on-primary transition-colors cursor-pointer group relative bg-paper"
              >
                <span className="text-[8px] font-mono text-muted group-hover:text-on-primary/50 mb-1 opacity-50 absolute top-1.5 left-1.5">
                  {idx < 9 ? `0${idx+1}` : idx+1}
                </span>
                <span className="font-bold text-[10px] md:text-sm tracking-tighter uppercase">{tech}</span>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};