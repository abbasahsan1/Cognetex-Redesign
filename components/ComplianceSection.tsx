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
    <section className="py-12 border-b border-border bg-background/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          <div className="flex-shrink-0 text-center lg:text-left">
            <p className="text-[10px] font-mono text-signal uppercase tracking-[0.2em] mb-1">
              03. Trust & Security
            </p>
            <h2 className="text-xl font-bold text-foreground tracking-tight uppercase">
              Global Standards
            </h2>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-10 md:gap-16">
            {complianceItems.map((item) => (
              <div 
                key={item.name} 
                className="flex flex-col items-center gap-3"
              >
                <div className="w-12 h-12 flex items-center justify-center p-1">
                  <img 
                    src={item.src} 
                    alt={item.alt} 
                    className="max-w-full max-h-full dark:invert"
                  />
                </div>
                <span className="text-[9px] font-mono text-muted uppercase tracking-widest">
                  {item.name}
                </span>
              </div>

            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
