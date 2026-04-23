import React from 'react';
import { AIServicesSection } from '../components/AIServicesSection';
import { PageSEO } from '../components/PageSEO';

export const AIServices: React.FC = () => {
  return (
    <>
      <PageSEO 
        title="AI Services" 
        description="Comprehensive AI solutions for enterprise. From strategy and readiness to agentic automation and predictive analytics."
      />
      <AIServicesSection />
    </>
  );
};
