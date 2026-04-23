import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getContent } from '../repositories/contentRepository';
import { IService } from '../types';
import { PageSEO } from '../components/PageSEO';
import { Schema, getServiceSchema } from '../components/Schema';
import { Button } from '../components/Button';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';

export const ServiceDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [service, setService] = useState<IService | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchService = async () => {
      const content = await getContent();
      const found = content.services.find((s) => s.id === id);
      setService(found || null);
      setLoading(false);
    };
    fetchService();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-muted font-mono animate-pulse">LOADING_SERVICE_MANIFEST...</div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
        <h1 className="text-4xl font-bold mb-4">SERVICE_NOT_FOUND</h1>
        <Button onClick={() => navigate('/ai-services')}>Back to Services</Button>
      </div>
    );
  }

  return (
    <>
      <PageSEO 
        title={service.seoTitle || service.title} 
        description={service.seoDescription || service.description}
        canonical={`/services/${service.id}`}
      />
      <Schema data={getServiceSchema(service)} />
      <section className="pt-32 pb-20 bg-background border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="mb-8 -ml-4">
            <ArrowLeft className="w-4 h-4 mr-2" /> BACK
          </Button>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-7">
              <span className="section-eyebrow mb-4">Service Domain</span>
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 tracking-tighter uppercase">
                {service.title}
              </h1>
              <p className="text-xl text-signal font-mono mb-8">{service.tagline}</p>
              <div className="prose prose-invert max-w-none">
                <p className="text-lg text-muted leading-relaxed mb-8">
                  {service.description}
                </p>
              </div>
            </div>
            
            <div className="lg:col-span-5">
              <div className="bg-paper border border-border p-8 border-l-4 border-l-primary">
                <h3 className="text-sm font-bold uppercase tracking-widest text-muted mb-6 border-b border-border pb-4">
                  Core Capabilities
                </h3>
                <ul className="space-y-4">
                {service.capabilities.map((cap, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-signal shrink-0 mt-0.5" />
                    <span className="text-foreground font-medium">{cap}</span>
                  </li>
                ))}
                </ul>
                <Button className="w-full mt-10" onClick={() => navigate('/contact')}>
                  Discuss this Service
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
