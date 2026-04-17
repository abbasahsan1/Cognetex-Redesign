import React from 'react';
import { Hero } from '../components/Hero';
import { TechMarquee } from '../components/TechMarquee';
import { Services } from '../components/Services';
import { CoursesSection } from '../components/CoursesSection';
import { Projects } from '../components/Projects';
import { Team } from '../components/Team';
import { ArrowRight } from 'lucide-react';
import { GlobalPresence } from '../components/GlobalPresence';

export const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <section className="py-10 md:py-14 bg-paper border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-8 mb-6 md:mb-8">
            <div>
              <p className="section-eyebrow mb-2">01. Choose Your Path</p>
              <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-foreground">
                BUILT FOR LEADERS,<br />OPERATORS, AND BUILDERS
              </h2>
            </div>
            <p className="section-lead max-w-xl text-base md:text-lg">
              Jump directly to the part that matters most to you—business outcomes, technical capabilities,
              delivery team, or upskilling resources.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-[1px] md:bg-border md:border md:border-border">
            {[
              { href: '#projects', label: 'Business Leaders', sub: 'See measurable ROI and outcomes' },
              { href: '#services', label: 'Technical Teams', sub: 'Review architecture and capabilities' },
              { href: '#team', label: 'Decision Committees', sub: 'Evaluate delivery leadership' },
              { href: '#courses', label: 'Learners', sub: 'Explore practical training tracks' },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="group border border-border md:border-none bg-background p-5 md:p-6 hover:border-signal transition-colors"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <p className="text-base font-bold text-foreground tracking-tight">{item.label}</p>
                  <ArrowRight className="w-4 h-4 text-muted group-hover:text-signal transition-colors" />
                </div>
                <p className="text-sm text-muted leading-relaxed">{item.sub}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <Projects />
      <Services />
      <TechMarquee />
      <GlobalPresence />
      <Team />
      <CoursesSection />
    </>
  );
};
