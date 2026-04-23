import React from 'react';

const complianceItems = [
  { name: 'HIPAA', src: '/logos/HIPAA black.svg', alt: 'HIPAA' },
  { name: 'GDPR', src: '/logos/GDPR black.svg', alt: 'GDPR' },
  { name: 'SOC 2', src: '/logos/AICPA black.svg', alt: 'AICPA SOC 2' },
  { name: 'PCI DSS', src: '/logos/PCI black.svg', alt: 'PCI DSS' },
  { name: 'STAR', src: '/logos/Star Black.svg', alt: 'STAR' },
];

export const ComplianceSection: React.FC = () => {
  return (
    <section className="bg-background border-b border-border">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6 md:gap-x-20">
          <div className="text-[10px] font-mono text-muted uppercase tracking-[0.2em] w-full text-center mb-2 lg:w-auto lg:mb-0 lg:mr-8 border-r-0 lg:border-r border-border lg:pr-8">
            Security Standards
          </div>
          {complianceItems.map((item) => (
            <div 
              key={item.name} 
              className="flex flex-col items-center gap-2"
            >
              <div className="w-10 h-10 flex items-center justify-center">
                <img 
                  src={item.src} 
                  alt={item.alt} 
                  className="max-w-full max-h-full opacity-60 dark:invert grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                />
              </div>
              <span className="text-[9px] font-mono text-muted/60 uppercase tracking-widest hidden sm:block">
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
