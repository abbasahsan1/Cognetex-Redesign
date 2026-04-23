import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/GlassCard';
import { Button } from '../components/Button';
import { CloudinaryImage } from '../components/CloudinaryImage';
import { useContent } from '../hooks/useContent';

const highlights = [
  {
    id: 'delivery',
    label: 'Projects Delivered',
    value: '120+',
  },
  {
    id: 'experience',
    label: 'Combined Years',
    value: '35+',
  },
  {
    id: 'coverage',
    label: 'Industries Served',
    value: '9',
  },
];

export const Team: React.FC = () => {
  const navigate = useNavigate();
  const { team } = useContent();

  return (
    <>
      <section className="pt-24 md:pt-32 pb-16 bg-background border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-14 items-end">
            <div className="lg:col-span-6">
              <span className="section-eyebrow mb-2">02. Our Team</span>
              <h1 className="section-title md:text-6xl">
                ENGINEERS BEHIND
                <br />
                THE SIGNAL
              </h1>
            </div>
            <div className="lg:col-span-6">
              <p className="section-lead">
                We’re a cross-disciplinary team of engineers, researchers, and product strategists focused on
                building dependable systems that scale. Every engagement is led by senior talent with hands-on
                implementation experience.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10 md:mt-12">
            {highlights.map((item) => (
              <div key={item.id} className="border border-border bg-paper p-6">
                <p className="text-3xl font-bold text-foreground font-mono mb-2">{item.value}</p>
                <p className="text-xs text-muted uppercase tracking-widest">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-paper border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 md:mb-12">
            <div>
              <span className="section-eyebrow mb-2">Core Team</span>
              <h2 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight">PEOPLE OF COGNETEX</h2>
            </div>
            <p className="section-lead max-w-xl text-base md:text-lg">
              Senior specialists responsible for strategy, delivery, and engineering execution.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member) => (
              <Card key={member.id} className="h-full flex flex-col group hover:border-primary transition-colors duration-300">
                <div className="relative aspect-[4/5] mb-6 overflow-hidden">
                  <CloudinaryImage
                    publicId={member.image}
                    alt={member.name}
                    loading="lazy"
                    width={400}
                    height={500}
                    className="w-full h-full object-cover transition-all duration-500"
                  />
                </div>
                <div className="border-l-2 border-primary pl-4">
                  <p className="text-foreground font-bold text-lg uppercase tracking-tight">{member.name}</p>
                  <p className="text-signal text-xs font-mono mb-2">{member.role}</p>
                  <p className="text-xs text-muted leading-relaxed">{member.bio}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border border-border bg-paper p-8 md:p-12 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <span className="section-eyebrow mb-2">Work With Us</span>
              <h3 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
                READY TO BUILD
                <br />
                WITH SENIOR TALENT?
              </h3>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="outline" size="lg" onClick={() => navigate('/approach')}>
                SEE OUR APPROACH
              </Button>
              <Button size="lg" onClick={() => navigate('/contact')}>
                START A PROJECT
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
