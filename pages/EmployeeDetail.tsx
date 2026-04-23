import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getContent } from '../repositories/contentRepository';
import { ITeamMember } from '../types';
import { PageSEO } from '../components/PageSEO';
import { Button } from '../components/Button';
import { ArrowLeft, Linkedin, Github, Twitter, Briefcase, Award } from 'lucide-react';
import { Card } from '../components/GlassCard';
import { CloudinaryImage } from '../components/CloudinaryImage';

export const EmployeeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [member, setMember] = useState<ITeamMember | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMember = async () => {
      const content = await getContent();
      const found = content.team.find((m) => m.id === id);
      setMember(found || null);
      setLoading(false);
    };
    fetchMember();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-muted font-mono animate-pulse text-[10px] uppercase">Loading Profile...</div>
      </div>
    );
  }

  if (!member) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4 text-center">
        <h1 className="text-4xl font-bold mb-4 uppercase text-muted">404</h1>
        <p className="text-sm font-mono mb-8 uppercase tracking-widest">Profile Not Found</p>
        <Button onClick={() => navigate('/')}>Return to Home</Button>
      </div>
    );
  }

  return (
    <>
      <PageSEO 
        title={member.seoTitle || `${member.name} | ${member.role} Profile`} 
        description={member.seoDescription || member.bio}
        canonical={`/team/${member.id}`}
      />
      
      <section className="pt-32 pb-20 md:pt-48 md:pb-32 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="mb-12 -ml-4 hover:text-signal transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Team
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            {/* Left: Professional Portrait & Links */}
            <div className="lg:col-span-4">
              <div className="sticky top-32 space-y-8">
                <div className="relative aspect-[4/5] border border-border bg-paper shadow-sm">
                  <CloudinaryImage 
                    publicId={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h1 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight leading-none mb-4">
                      {member.name}
                    </h1>
                    <p className="text-signal font-mono text-sm font-bold uppercase tracking-widest">
                      {member.role}
                    </p>
                  </div>

                  {member.socials && (
                    <div className="pt-6 border-t border-border space-y-4">
                      <p className="text-[10px] font-mono text-muted uppercase tracking-widest">Connect</p>
                      <div className="flex flex-col gap-3">
                        {member.socials.linkedin && (
                          <a 
                            href={member.socials.linkedin} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="flex items-center gap-3 text-sm font-medium text-foreground hover:text-signal transition-colors group"
                          >
                            <div className="p-2 border border-border group-hover:border-signal/50 bg-paper transition-colors">
                              <Linkedin className="w-4 h-4" />
                            </div>
                            <span>LinkedIn Profile</span>
                          </a>
                        )}
                        {member.socials.github && (
                          <a 
                            href={member.socials.github} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="flex items-center gap-3 text-sm font-medium text-foreground hover:text-signal transition-colors group"
                          >
                            <div className="p-2 border border-border group-hover:border-signal/50 bg-paper transition-colors">
                              <Github className="w-4 h-4" />
                            </div>
                            <span>GitHub Portfolio</span>
                          </a>
                        )}
                      </div>
                    </div>
                  )}

                </div>
              </div>
            </div>

            {/* Right: Biography and Details */}
            <div className="lg:col-span-8 space-y-20">
              {/* Bio Section */}
              <div className="max-w-3xl">
                <div className="w-12 h-1 bg-signal mb-8" />
                <p className="text-xl md:text-3xl text-foreground leading-relaxed font-medium">
                  {member.bio}
                </p>
              </div>

              {/* Experience Timeline */}
              {member.experience && member.experience.length > 0 && (
                <div className="pt-12 border-t border-border">
                  <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-muted mb-12">Professional History</h2>
                  <div className="space-y-12">
                    {member.experience.map((exp, idx) => (
                      <div key={idx} className="flex flex-col md:flex-row md:items-start gap-2 md:gap-12">
                        <div className="w-32 flex-shrink-0">
                          <p className="text-xs font-mono text-signal font-bold uppercase tracking-widest">{exp.period}</p>
                        </div>
                        <div>
                          <h3 className="text-xl md:text-2xl font-bold text-foreground leading-none mb-1">{exp.role}</h3>
                          <p className="text-muted font-medium">{exp.company}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Expertise Section */}
              {member.expertise && member.expertise.length > 0 && (
                <div className="pt-12 border-t border-border">
                  <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-muted mb-12">Key Capabilities</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-border border border-border">
                    {member.expertise.map((item, idx) => (
                      <div key={idx} className="bg-background p-8 hover:bg-paper transition-colors">
                        <p className="text-lg font-bold text-foreground uppercase tracking-tight">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};



