import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getContent } from '../repositories/contentRepository';
import { ICourse, ITeamMember } from '../types';
import { PageSEO } from '../components/PageSEO';
import { Button } from '../components/Button';
import { ArrowLeft, Clock, Monitor, Tag, CheckCircle, User } from 'lucide-react';
import { Card } from '../components/GlassCard';
import { CloudinaryImage } from '../components/CloudinaryImage';


export const CourseDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [course, setCourse] = useState<ICourse | null>(null);
  const [instructor, setInstructor] = useState<ITeamMember | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const content = await getContent();
      const foundCourse = content.courses.find((c) => c.id === id);
      setCourse(foundCourse || null);
      
      if (foundCourse?.instructorId) {
        const foundInstructor = content.team.find(t => t.id === foundCourse.instructorId);
        setInstructor(foundInstructor || null);
      }
      
      setLoading(false);
    };
    fetchData();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-muted font-mono animate-pulse text-[10px] uppercase">Loading Course Engineering...</div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4 text-center">
        <h1 className="text-4xl font-bold mb-4 uppercase text-muted">404</h1>
        <p className="text-sm font-mono mb-8 uppercase tracking-widest">Syllabus Node Not Found</p>
        <Button onClick={() => navigate('/')}>Return to Learning Path</Button>
      </div>
    );
  }

  return (
    <>
      <PageSEO 
        title={course.seoTitle || `${course.title} | ${course.subtitle}`} 
        description={course.seoDescription || course.description}
        canonical={`/courses/${course.id}`}
      />
      
      <section className="pt-32 pb-20 md:pt-48 md:pb-32 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="mb-12 -ml-4 hover:text-signal transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Collective
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            {/* Left: Course Overview */}
            <div className="lg:col-span-7 space-y-12">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <span className="px-3 py-1 bg-signal/10 border border-signal/20 text-signal text-[10px] font-mono font-bold uppercase tracking-widest">
                    {course.badge}
                  </span>
                  <span className="text-muted font-mono text-[10px] uppercase tracking-widest">
                    Course_ID: {course.id}
                  </span>
                </div>
                <h1 className="text-4xl md:text-6xl font-bold text-foreground tracking-tight uppercase leading-none mb-4">
                  {course.title}
                </h1>
                <p className="text-xl md:text-2xl text-signal font-mono font-bold uppercase tracking-tight">
                  {course.subtitle}
                </p>
              </div>

              <div className="max-w-2xl">
                <div className="w-12 h-1 bg-signal mb-8" />
                <p className="text-lg md:text-xl text-foreground leading-relaxed">
                  {course.description}
                </p>
              </div>

              {course.syllabus && course.syllabus.length > 0 && (
                <div className="pt-12 border-t border-border">
                  <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-muted mb-10">Curriculum Structure</h2>
                  <div className="space-y-4">
                    {course.syllabus.map((module, idx) => (
                      <div key={idx} className="flex items-start gap-4 p-5 bg-paper border border-border group hover:border-signal/50 transition-colors">
                        <span className="text-signal font-mono text-xs pt-1">0{idx + 1}.</span>
                        <p className="text-foreground font-bold uppercase tracking-tight">{module}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right: Enrollment Technicals */}
            <div className="lg:col-span-5">
              <div className="sticky top-32 space-y-8">
                <Card className="p-8 border-2 border-border">
                  <div className="space-y-8">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-mono text-muted uppercase">Access_Tier</p>
                      <p className="text-3xl font-bold text-foreground font-mono">{course.price}</p>
                    </div>

                    <div className="space-y-4 border-y border-border py-8">
                      <div className="flex items-center gap-4">
                        <Clock className="w-5 h-5 text-signal" />
                        <div>
                          <p className="text-[10px] font-mono text-muted uppercase">Duration</p>
                          <p className="text-sm font-bold uppercase tracking-tight">{course.duration}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <Monitor className="w-5 h-5 text-signal" />
                        <div>
                          <p className="text-[10px] font-mono text-muted uppercase">Medium</p>
                          <p className="text-sm font-bold uppercase tracking-tight">{course.medium}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <Tag className="w-5 h-5 text-signal" />
                        <div>
                          <p className="text-[10px] font-mono text-muted uppercase">Framework</p>
                          <p className="text-sm font-bold uppercase tracking-tight">Enterprise_Grade</p>
                        </div>
                      </div>
                    </div>

                    <Button fullWidth size="lg" onClick={() => window.alert('Enrollment API Mock Initiated...')}>
                      ENROLL IN COURSE
                    </Button>
                    <p className="text-[10px] font-mono text-center text-muted uppercase">
                      Instant Access Upon Verification
                    </p>
                  </div>
                </Card>

                {instructor && (
                  <Link to={`/team/${instructor.id}`} className="block group">
                    <Card className="p-6 border border-border group-hover:border-signal/50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 border border-border overflow-hidden bg-paper">
                          <CloudinaryImage 
                            publicId={instructor.image} 
                            alt={instructor.name} 
                            className="w-full h-full object-cover" 
                          />
                        </div>

                        <div>
                          <p className="text-[10px] font-mono text-muted uppercase mb-1 flex items-center gap-1">
                            <User className="w-3 h-3" /> Instructor
                          </p>
                          <p className="text-sm font-bold uppercase tracking-tight text-foreground group-hover:text-signal transition-colors">
                            {instructor.name}
                          </p>
                          <p className="text-[10px] text-signal font-mono uppercase">{instructor.role}</p>
                        </div>
                      </div>
                    </Card>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
