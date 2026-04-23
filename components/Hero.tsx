import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from './Button';
import { useNavigate } from 'react-router-dom';
import { BackgroundPaths } from './ui/background-paths';
import { useContent } from '../hooks/useContent';

export const Hero: React.FC = () => {

  const { siteConfig } = useContent();
  const navigate = useNavigate();
  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-screen pt-16 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(139,92,246,0.15),transparent_70%)] pointer-events-none" />
      <BackgroundPaths title={siteConfig.heroSubTitle}>
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 bg-background/30 backdrop-blur-[1px]">
          <div className="w-full min-h-[calc(100vh-4rem)] flex flex-col justify-center items-center text-center py-12 md:py-20">
          <h1 className="text-5xl sm:text-6xl md:text-8xl font-bold tracking-tighter text-foreground mb-6 md:mb-8 leading-[0.9] uppercase">
            {siteConfig.heroSubTitle.split(' ').slice(0, 2).join(' ')}<br/>
            <span className="text-signal">{siteConfig.heroSubTitle.split(' ').slice(2).join(' ')}</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted mb-8 md:mb-12 max-w-xl font-medium leading-relaxed">
            We build autonomous systems and scalable architecture that drives enterprise value.
          </p>

          
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <Button size="lg" onClick={() => scrollTo('#services')}>
              Explore Solutions <ArrowRight className="ml-2 w-4 h-4" />
            </Button>

            <Button variant="outline" size="lg" onClick={() => navigate('/contact')}>
              Technical Consult
            </Button>

          </div>
        </div>
      </div>
      </BackgroundPaths>
    </section>
  );
};