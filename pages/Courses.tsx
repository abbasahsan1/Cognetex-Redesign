import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card } from '../components/GlassCard';
import { Button } from '../components/Button';
import { useContent } from '../hooks/useContent';
import { PageSEO } from '../components/PageSEO';
import { Clock, Monitor, Tag, ArrowRight } from 'lucide-react';
import { DottedSurface } from '../components/ui/dotted-surface';

export const Courses: React.FC = () => {
  const navigate = useNavigate();
  const { courses } = useContent();

  return (
    <>
      <PageSEO 
        title="Training Programs" 
        description="Master Agentic AI and enterprise engineering with Cognetex. Expert-led courses designed for the next generation of builders."
      />
      
      {/* Header Section */}
      <section className="pt-24 md:pt-48 pb-20 bg-background border-b border-border overflow-hidden relative">
        <DottedSurface className="opacity-20 translate-y-12" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl">
            <span className="section-eyebrow mb-4 inline-block">03. Education Collective</span>
            <h1 className="text-5xl md:text-8xl font-bold text-foreground tracking-tighter uppercase leading-none mb-8">
              MASTER THE <br />
              <span className="text-signal">FRONTIER</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted leading-relaxed max-w-2xl font-medium">
              We specialize in turning senior engineers into AI architects. Our curricula are derived from 
              live enterprise deployments, not theoretical abstractions.
            </p>
          </div>
        </div>
      </section>

      {/* Course Grid Section */}
      <section className="py-24 bg-paper border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            {courses.map((course) => (
              <Link 
                key={course.id} 
                to={`/courses/${course.id}`} 
                className="group block"
              >
                <Card className="h-full flex flex-col p-10 md:p-12 border border-border group-hover:border-signal transition-all duration-500 bg-background relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8">
                    <ArrowRight className="w-6 h-6 text-muted group-hover:text-signal group-hover:translate-x-2 transition-all" />
                  </div>
                  
                  <div className="mb-10">
                    <span className="px-3 py-1 bg-signal/10 border border-signal/20 text-signal text-[10px] font-mono font-bold uppercase tracking-widest mb-6 inline-block">
                      {course.badge}
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold text-foreground uppercase tracking-tight leading-none mb-3">
                      {course.title}
                    </h2>
                    <p className="text-sm font-mono text-signal uppercase tracking-widest font-bold">
                      {course.subtitle}
                    </p>
                  </div>

                  <p className="text-lg text-muted leading-relaxed mb-12 max-w-xl">
                    {course.description}
                  </p>

                  <div className="mt-auto pt-10 border-t border-border grid grid-cols-2 gap-8">
                    <div className="space-y-1">
                      <p className="text-[10px] font-mono text-muted uppercase">Duration</p>
                      <div className="flex items-center gap-2">
                        <Clock className="w-3 h-3 text-signal" />
                        <p className="text-sm font-bold uppercase tracking-tight">{course.duration}</p>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-mono text-muted uppercase">Price</p>
                      <div className="flex items-center gap-2">
                        <Tag className="w-3 h-3 text-signal" />
                        <p className="text-sm font-bold uppercase tracking-tight text-foreground">{course.price}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-paper border border-border p-12 md:p-20 text-center relative overflow-hidden">
             <div className="relative z-10 max-w-3xl mx-auto space-y-8">
                <h3 className="text-3xl md:text-5xl font-bold text-foreground uppercase tracking-tight">
                  Custom Enterprise <br />
                  <span className="text-signal">Up-Skilling</span>
                </h3>
                <p className="text-lg text-muted leading-relaxed">
                  Looking to train your entire engineering department on Agentic workflows or RAG architectures? 
                  We offer custom on-site workshops and curriculum development for enterprise teams.
                </p>
                <div className="pt-4">
                  <Button size="lg" onClick={() => navigate('/contact')}>
                    Request Team Training
                  </Button>
                </div>
             </div>
          </div>
        </div>
      </section>
    </>
  );
};
