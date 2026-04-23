import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getContent } from '../repositories/contentRepository';
import { IProject } from '../types';
import { PageSEO } from '../components/PageSEO';
import { Schema, getCaseStudySchema } from '../components/Schema';
import { Button } from '../components/Button';
import { ArrowLeft, BarChart3 } from 'lucide-react';
import { Card } from '../components/GlassCard';

export const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<IProject | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      const content = await getContent();
      const found = content.projects.find((p) => p.id === id);
      setProject(found || null);
      setLoading(false);
    };
    fetchProject();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-muted font-mono animate-pulse">RETRIEVING_CASE_STUDY...</div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
        <h1 className="text-4xl font-bold mb-4">CASE_STUDY_NOT_FOUND</h1>
        <Button onClick={() => navigate('/')}>Back to Home</Button>
      </div>
    );
  }

  return (
    <>
      <PageSEO 
        title={project.seoTitle || `${project.title} | Case Study`} 
        description={project.seoDescription || project.challenge}
        canonical={`/projects/${project.id}`}
      />
      <Schema data={getCaseStudySchema(project)} />
      <section className="pt-32 pb-20 bg-background border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="mb-8 -ml-4">
            <ArrowLeft className="w-4 h-4 mr-2" /> BACK
          </Button>

          <div className="max-w-4xl">
            <span className="flex items-center gap-2 text-signal font-mono text-xs uppercase tracking-widest mb-4">
              <span className="w-8 h-[1px] bg-signal"></span>
              Case Study: {project.clientSector}
            </span>
            <h1 className="text-4xl md:text-7xl font-bold text-foreground mb-12 tracking-tighter uppercase leading-[0.9]">
              {project.title}
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-12">
            <div className="lg:col-span-8 space-y-12">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-widest text-muted mb-4 border-l-2 border-primary pl-4">The Challenge</h3>
                <p className="text-xl text-foreground leading-relaxed">
                  {project.challenge}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-bold uppercase tracking-widest text-muted mb-4 border-l-2 border-primary pl-4">Our Solution</h3>
                <p className="text-xl text-muted leading-relaxed">
                  {project.solution}
                </p>
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="sticky top-32 space-y-6">
                <Card className="bg-paper border-border">
                  <div className="flex items-center gap-2 mb-6 text-primary">
                    <BarChart3 className="w-5 h-5" />
                    <h3 className="font-bold uppercase tracking-wider text-sm">Key Impact Stats</h3>
                  </div>
                  <div className="space-y-6">
                    {project.stats.map((stat, idx) => (
                      <div key={idx} className="border-b border-border pb-4 last:border-0 last:pb-0">
                        <p className="text-3xl font-bold font-mono text-foreground">{stat.value}</p>
                        <p className="text-xs text-muted uppercase tracking-widest">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                </Card>
                <div className="p-8 border border-dashed border-border text-center">
                  <p className="text-sm text-muted mb-6 font-mono uppercase tracking-tight">Need similar outcomes?</p>
                  <Button fullWidth onClick={() => navigate('/contact')}>Start Discussion</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
