import React from 'react';
import { Hero } from '../components/Hero';
import { TechMarquee } from '../components/TechMarquee';
import { Services } from '../components/Services';
import { CoursesSection } from '../components/CoursesSection';
import { Projects } from '../components/Projects';
import { Team } from '../components/Team';
import { ArrowRight } from 'lucide-react';
import { GlobalPresence } from '../components/GlobalPresence';
import { PageSEO } from '../components/PageSEO';
import { Schema, getOrganizationSchema } from '../components/Schema';
import { ComplianceSection } from '../components/ComplianceSection';


import { useContent } from '../hooks/useContent';

export const Home: React.FC = () => {
  const { siteConfig } = useContent();

  return (
    <>
      <PageSEO 
        title={siteConfig.defaultSeoTitle} 
        description={siteConfig.defaultSeoDescription}
      />
      <Schema data={getOrganizationSchema()} />
      <Hero />
      <section className="py-10 md:py-14 bg-paper border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-8 mb-6 md:mb-8">
            <div>
              <p className="section-eyebrow mb-2">01. Choose Your Path</p>
              <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-foreground">
                {siteConfig.heroTitle}
              </h2>

            </div>
            <p className="section-lead max-w-xl text-base md:text-lg">
              {siteConfig.heroLead}
            </p>
          </div>


          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[
              { href: '#projects', label: 'Business Leaders', sub: 'See measurable ROI and outcomes' },
              { href: '#services', label: 'Technical Teams', sub: 'Review architecture and capabilities' },
              { href: '#team', label: 'Decision Committees', sub: 'Evaluate delivery leadership' },
              { href: '#courses', label: 'Learners', sub: 'Explore practical training tracks' },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="group p-8 bg-paper border border-border hover:border-signal transition-all duration-300 flex flex-col justify-between"


              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <p className="text-lg font-bold text-foreground tracking-tight">{item.label}</p>
                    <ArrowRight className="w-5 h-5 text-muted group-hover:text-signal transition-transform group-hover:translate-x-1" />
                  </div>
                  <p className="text-sm text-muted leading-relaxed">{item.sub}</p>
                </div>
              </a>
            ))}
          </div>

        </div>
      </section>

      <Projects />
      <ComplianceSection />
      <Services />

      <TechMarquee />
      <GlobalPresence />
      <Team />
      <CoursesSection />
    </>
  );
};
