import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';

export const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="py-24 md:py-32 bg-background border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="font-mono text-xs text-signal uppercase tracking-wider mb-4">404 — Signal Lost</p>
        <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">Page Not Found</h1>
        <p className="text-muted text-lg max-w-2xl mx-auto mb-8">
          The page you requested is outside of the current operational grid. Return to the main console.
        </p>
        <Button size="lg" onClick={() => navigate('/')}>Return Home</Button>
      </div>
    </section>
  );
};
