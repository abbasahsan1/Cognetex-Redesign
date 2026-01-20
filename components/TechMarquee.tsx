import React from 'react';

const technologies = [
  'React', 'TypeScript', 'Next.js', 'Node.js', 'Rust', 'Python', 
  'TensorFlow', 'PyTorch', 'AWS', 'GCP', 'Docker', 
  'K8s', 'GraphQL', 'Postgres', 'Redis', 'Kafka'
];

export const TechMarquee: React.FC = () => {
  return (
    <section className="bg-paper border-b border-border">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 border-l border-border">
            {technologies.map((tech, idx) => (
              <div 
                key={idx} 
                className="aspect-square border-r border-b border-border flex flex-col items-center justify-center hover:bg-primary hover:text-white transition-colors cursor-default group"
              >
                <span className="text-[10px] font-mono text-muted group-hover:text-white/50 mb-1 opacity-50">{idx < 9 ? `0${idx+1}` : idx+1}</span>
                <span className="font-bold text-sm tracking-tight">{tech}</span>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};