import React from 'react';
import { team } from '../data/content';
import { Card } from './GlassCard';

export const Team: React.FC = () => {
  return (
    <section id="team" className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-16">
          <div>
            <span className="font-mono text-xs text-signal uppercase tracking-wider mb-2 block">03. The Engineers</span>
            <h2 className="text-4xl font-bold text-foreground tracking-tight">
              HUMAN<br/>CAPITAL
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member) => (
            <div key={member.id} className="group">
              <div className="relative aspect-[4/5] mb-4 overflow-hidden border border-border bg-white">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-full h-full object-cover filter grayscale contrast-125 group-hover:grayscale-0 transition-all duration-500"
                />
                {/* Overlay Text */}
                <div className="absolute top-2 right-2 text-[10px] font-mono bg-white px-1 border border-black text-black">
                   ID: {member.id.substring(0,3).toUpperCase()}
                </div>
              </div>
              <div className="border-l-2 border-primary pl-4">
                <p className="text-foreground font-bold text-lg uppercase tracking-tight">{member.name}</p>
                <p className="text-signal text-xs font-mono mb-2">{member.role}</p>
                <p className="text-xs text-muted leading-relaxed max-w-[200px]">
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