import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

interface PageSEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogType?: string;
  ogImage?: string;
}

export const PageSEO: React.FC<PageSEOProps> = ({
  title,
  description,
  canonical,
  ogType = 'website',
  ogImage = 'https://res.cloudinary.com/duxaktggz/image/upload/v1/cognetex/og-image.jpg', // Default OG image
}) => {
  const { pathname } = useLocation();
  const siteTitle = 'Cognetex | AI & Software Development Agency';
  const fullTitle = title ? `${title} | Cognetex` : siteTitle;
  const defaultDescription = 'Cognetex is a premier AI & Software Development agency specializing in autonomous agents, scalable web applications, and enterprise data solutions.';
  const metaDescription = description || defaultDescription;
  const siteUrl = 'https://cognetex.com'; 
  const fullCanonical = `${siteUrl}${canonical || pathname}`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      <link rel="canonical" href={fullCanonical} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={fullCanonical} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
};
