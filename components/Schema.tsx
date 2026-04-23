import React from 'react';

interface SchemaProps {
  data: object;
}

export const Schema: React.FC<SchemaProps> = ({ data }) => {
  return (
    <script type="application/ld+json">
      {JSON.stringify(data)}
    </script>
  );
};

export const getOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Cognetex",
  "url": "https://cognetex.com",
  "logo": "https://cognetex.com/logo.png",
  "sameAs": [
    "https://linkedin.com/company/cognetex",
    "https://twitter.com/cognetex"
  ],
  "description": "Cognetex is a premier AI & Software Development agency specializing in autonomous agents, scalable web applications, and enterprise data solutions."
});

export const getServiceSchema = (service: any) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "name": service.title,
  "description": service.description,
  "provider": {
    "@type": "Organization",
    "name": "Cognetex"
  },
  "areaServed": "Worldwide",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "AI Development Services",
    "itemListElement": service.capabilities.map((cap: string) => ({
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": cap
      }
    }))
  }
});

export const getCaseStudySchema = (project: any) => ({
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  "name": project.title,
  "description": project.challenge,
  "about": project.solution,
  "author": {
    "@type": "Organization",
    "name": "Cognetex"
  }
});
