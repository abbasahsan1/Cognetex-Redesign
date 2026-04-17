import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from './Button';
import { useNavigate } from 'react-router-dom';
import { BackgroundPaths } from './ui/background-paths';

export const Hero: React.FC = () => {
  const navigate = useNavigate();
  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-screen pt-16">
      <BackgroundPaths title="Cognetex Intelligence">
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 border-x border-border bg-background/30 backdrop-blur-[1px]">
          <div className="w-full min-h-[calc(100vh-4rem)] flex flex-col justify-center items-center text-center py-12 md:py-20">
          <h1 className="text-5xl sm:text-6xl md:text-8xl font-bold tracking-tighter text-foreground mb-6 md:mb-8 leading-[0.9]">
            INTELLIGENCE,<br/>
            <span className="text-muted">ENGINEERED.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted mb-8 md:mb-12 max-w-xl font-medium leading-relaxed">
            We don't hide behind shiny effects. We build autonomous systems and scalable architecture that drives enterprise value.
          </p>
          
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <Button size="lg" onClick={() => scrollTo('#services')}>
              EXPLORE SOLUTIONS <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <Button variant="outline" size="lg" onClick={() => navigate('/contact')}>
              TECHNICAL CONSULT
            </Button>
          </div>
        </div>
      </div>
      </BackgroundPaths>
    </section>
  );
};