import React from 'react';
import { ContactForm } from '../components/ContactForm';
import { PageSEO } from '../components/PageSEO';
import { DottedSurface } from '../components/ui/dotted-surface';

export const Contact: React.FC = () => {
  return (
    <>
      <PageSEO 
        title="Initiate Project" 
        description="Ready to build? Contact Cognetex to discuss your AI or software project. We help enterprise organizations turn operational noise into signal."
      />
      
      {/* High-End Editorial Hero */}
      <section className="pt-32 md:pt-48 pb-20 bg-background border-b border-border relative overflow-hidden">
        <DottedSurface className="opacity-20 translate-y-20" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl">
            <span className="section-eyebrow">06. Ingress</span>
            <h1 className="section-title">
              INITIATE <br />
              <span className="text-signal">PROJECT</span>
            </h1>
            <p className="section-lead mt-10 max-w-2xl">
              Our intake protocol is designed to maximize clarity and alignment. 
              Share your challenge, and we'll translate it into a deliverable strategy.
            </p>
          </div>
        </div>
      </section>

      <ContactForm />
    </>
  );
};
