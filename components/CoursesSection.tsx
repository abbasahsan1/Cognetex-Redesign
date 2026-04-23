import React from 'react';
import { Card } from './GlassCard';
import { Button } from './Button';
import { useContent } from '../hooks/useContent';
import { SectionHeading } from './SectionHeading';
import { DottedSurface } from './ui/dotted-surface';

export const CoursesSection: React.FC = () => {
  const { courses } = useContent();
  return (
    <section id="courses" className="py-20 md:py-28 bg-background border-b border-border overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12 md:mb-16">
          <SectionHeading
            className="max-w-2xl"
            eyebrow="05. Training Programs"
            titleClassName="md:text-6xl"


            title={
              <>
                EXPLORE OUR MOST
                <br />
                IN-DEMAND COURSES
              </>
            }
          />
          <p className="section-lead max-w-xl">
            Upgrade your skills with our carefully curated training programs designed for real-world application.
            Each course is structured to help you learn, apply, and grow confidently in the tech industry.
          </p>
          <div className="lg:hidden font-mono text-[10px] text-muted animate-pulse">
            <span className="mr-2">←</span> SWIPE <span className="ml-2">→</span>
          </div>
        </div>

        <div className="relative overflow-hidden border border-border bg-background p-2 sm:p-3 md:p-4">
          <DottedSurface className="opacity-42 [mask-image:radial-gradient(circle_at_center,black_30%,transparent_80%)]" />
          <div className="relative z-10 flex overflow-x-auto snap-x snap-mandatory gap-4 pb-8 -mx-4 px-4 md:grid md:grid-cols-2 md:gap-8 md:pb-0 md:mx-0 md:px-0 scrollbar-thin">
            {courses.map((course, idx) => (
              <Card 
                key={course.id} 
                className="min-w-[85vw] sm:min-w-[360px] md:min-w-0 snap-center h-full flex flex-col border border-border shadow-none group hover:border-signal transition-colors duration-300"
              >
              <div className="mb-6 h-1 w-full" />

              <h3 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight mb-2">
                {course.title}
              </h3>
              <p className="text-sm font-mono text-signal mb-4">{course.subtitle}</p>
              <p className="text-sm text-muted leading-relaxed mb-8">
                {course.description}
              </p>

              <div className="mt-auto flex flex-col sm:flex-row gap-3">
                <Button variant="outline" size="sm" className="flex-1">
                  LEARN MORE
                </Button>
                <Button size="sm" className="flex-1">
                  ENROLL NOW
                </Button>
              </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
