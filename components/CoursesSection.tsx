import React from 'react';
import { Card } from './GlassCard';
import { Button } from './Button';
import { useContent } from '../hooks/useContent';
import { SectionHeading } from './SectionHeading';

export const CoursesSection: React.FC = () => {
  const { courses } = useContent();
  return (
    <section id="courses" className="py-20 md:py-28 bg-paper border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12 md:mb-16">
          <SectionHeading
            className="max-w-2xl"
            eyebrow="04. Training Programs"
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
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {courses.map((course, idx) => (
            <Card key={course.id} hoverEffect className="h-full flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <span className="text-[10px] font-mono uppercase border border-border px-2 py-1 bg-background">
                  {course.badge}
                </span>
                <span className="font-mono text-xs text-muted">CRS_0{idx + 1}</span>
              </div>

              <h3 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight mb-2">
                {course.title}
              </h3>
              <p className="text-sm font-mono text-signal mb-4">// {course.subtitle}</p>
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
    </section>
  );
};
