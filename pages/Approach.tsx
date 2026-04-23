import React from 'react';
import { ApproachSection } from '../components/ApproachSection';
import { PageSEO } from '../components/PageSEO';

export const Approach: React.FC = () => {
  return (
    <>
      <PageSEO 
        title="Our Approach" 
        description="Learn about our unique approach to AI development and software engineering. We focus on client-centric design and high-impact delivery."
      />
      <ApproachSection />
    </>
  );
};
