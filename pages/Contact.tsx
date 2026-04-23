import React from 'react';
import { ContactForm } from '../components/ContactForm';
import { PageSEO } from '../components/PageSEO';

export const Contact: React.FC = () => {
  return (
    <>
      <PageSEO 
        title="Contact Us" 
        description="Ready to build? Contact Cognetex to discuss your AI or software project. We help enterprise organizations turn operational noise into signal."
      />
      <ContactForm />
    </>
  );
};
