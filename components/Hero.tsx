import React, { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from './Button';
import { useNavigate } from 'react-router-dom';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

const TerminalLine = ({ text, delay }: { text: string; delay: number }) => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  if (!visible) return null;
  return <div className="font-mono text-xs md:text-sm text-green-500 mb-1 break-all">{'>  '}{text}</div>;
};

export const Hero: React.FC = () => {
  const navigate = useNavigate();
  const prefersReducedMotion = usePrefersReducedMotion();
  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-screen flex flex-col pt-16 bg-grid-pattern bg-grid">
      <div className="flex-grow flex flex-col md:flex-row container mx-auto px-4 sm:px-6 lg:px-8 border-x border-border bg-background/50 backdrop-blur-[2px]">
        
        {/* Left Content */}
        <div className="w-full md:w-2/3 flex flex-col justify-center py-12 md:py-20 md:pr-12">
          <div className="mb-6 md:mb-8 section-caption text-signal">
            System Status: Nominal
          </div>
          
          <h1 className="text-5xl sm:text-6xl md:text-8xl font-bold tracking-tighter text-foreground mb-6 md:mb-8 leading-[0.9]">
            INTELLIGENCE,<br/>
            <span className="text-muted">ENGINEERED.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted mb-8 md:mb-12 max-w-xl font-medium leading-relaxed">
            We don't hide behind shiny effects. We build autonomous systems and scalable architecture that drives enterprise value.
          </p>
          
          <div className="flex flex-col sm:flex-row items-stretch sm:items-start gap-4">
            <Button size="lg" onClick={() => scrollTo('#services')}>
              EXPLORE SOLUTIONS <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <Button variant="outline" size="lg" onClick={() => navigate('/contact')}>
              TECHNICAL CONSULT
            </Button>
          </div>
        </div>

        {/* Right Terminal */}
        <div className="w-full md:w-1/3 min-w-0 border-t md:border-t-0 md:border-l border-border bg-foreground text-background relative flex flex-col min-h-[420px] md:min-h-[520px] mt-8 md:mt-0 overflow-hidden">
          <div className="p-3 border-b border-background/20 flex justify-between items-center bg-background/5">
            <div className="flex gap-2">
              <div className="w-2.5 h-2.5 bg-red-500 rounded-full opacity-50"></div>
              <div className="w-2.5 h-2.5 bg-yellow-500 rounded-full opacity-50"></div>
              <div className="w-2.5 h-2.5 bg-green-500 rounded-full opacity-50"></div>
            </div>
            <div className="text-[10px] font-mono text-background/60">TERM_01</div>
          </div>
          <div className="p-4 md:p-6 font-mono overflow-auto flex-grow min-h-0 relative">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none"></div>
            {prefersReducedMotion ? (
              <>
                <div className="font-mono text-xs md:text-sm text-green-500 mb-1 break-all">&gt;  Initializing core systems...</div>
                <div className="font-mono text-xs md:text-sm text-green-500 mb-1 break-all">&gt;  Loading neural modules [v4.2.0]...</div>
                <div className="font-mono text-xs md:text-sm text-green-500 mb-1 break-all">&gt;  Connecting to vector database...</div>
                <div className="font-mono text-xs md:text-sm text-green-500 mb-1 break-all">&gt;  Connection established (12ms).</div>
                <div className="font-mono text-xs md:text-sm text-green-500 mb-1 break-all">&gt;  Optimizing RAG pipeline...</div>
                <div className="font-mono text-xs md:text-sm text-green-500 mb-1 break-all">&gt;  Deploying autonomous agents...</div>
                <div className="font-mono text-xs md:text-sm text-green-500 mb-1 break-all">&gt;  System ready. Awaiting input.</div>
              </>
            ) : (
              <>
                <TerminalLine text="Initializing core systems..." delay={500} />
                <TerminalLine text="Loading neural modules [v4.2.0]..." delay={1200} />
                <TerminalLine text="Connecting to vector database..." delay={2000} />
                <TerminalLine text="Connection established (12ms)." delay={2800} />
                <TerminalLine text="Optimizing RAG pipeline..." delay={3500} />
                <TerminalLine text="Deploying autonomous agents..." delay={4500} />
                <TerminalLine text="System ready. Awaiting input." delay={5500} />
                <div className="animate-pulse inline-block w-2 h-4 bg-green-500 mt-1 ml-2 align-middle"></div>
              </>
            )}
          </div>
          
          {/* Decorative Footer of Terminal */}
          <div className="p-4 border-t border-background/20 text-background/60 text-[10px] font-mono">
            <div className="flex gap-4">
              <div className="flex-1 overflow-hidden">
                <div className="uppercase mb-1">Memory</div>
                <div className="w-full bg-background/10 h-1"><div className="w-[42%] bg-green-500 h-full"></div></div>
              </div>
              <div className="flex-1 overflow-hidden">
                <div className="uppercase mb-1">Latency</div>
                <div className="text-background">12ms</div>
              </div>
            </div>
          </div>
        </div>

      </div>
      
      {/* Scroll indicator */}
      <div className="hidden md:flex absolute bottom-0 left-0 right-0 border-t border-border bg-paper py-3">
         <div className="container mx-auto px-4 text-xs font-mono text-muted flex justify-between">
            <span>SCROLL_DOWN</span>
            <span>[ PAGE 01 / 05 ]</span>
         </div>
      </div>
    </section>
  );
};