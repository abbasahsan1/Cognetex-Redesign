import React from 'react';

const technologies = [
  'React', 'TypeScript', 'Next.js', 'Node.js', 'Rust', 'Python', 
  'TensorFlow', 'PyTorch', 'AWS', 'GCP', 'Docker', 
  'K8s', 'GraphQL', 'Postgres', 'Redis', 'Kafka'
];

export const TechMarquee: React.FC = () => {
  return (
    <section className="bg-paper border-b border-border overflow-hidden">
      <div className="container mx-auto">
        {/* 
          Mobile: grid-rows-2 with horizontal scroll (grid-flow-col)
          Desktop: Standard vertical grid (grid-flow-row)
        */}
        <div className="grid grid-rows-2 grid-flow-col auto-cols-[140px] md:grid-rows-auto md:grid-flow-row md:grid-cols-4 lg:grid-cols-8 md:auto-cols-auto overflow-x-auto md:overflow-visible border-l border-border scrollbar-thin">
            {technologies.map((tech, idx) => (
              <div 
                key={idx} 
                className="aspect-square border-r border-b border-border flex flex-col items-center justify-center hover:bg-primary hover:text-on-primary transition-colors cursor-default group relative bg-paper"
              >
                <span className="text-[10px] font-mono text-muted group-hover:text-on-primary/50 mb-1 opacity-50 absolute top-2 left-2">
                  {idx < 9 ? `0${idx+1}` : idx+1}
                </span>
                <span className="font-bold text-sm tracking-tight">{tech}</span>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};