import React from 'react';
import { Hero } from '../components/Hero';
import { TechMarquee } from '../components/TechMarquee';
import { Services } from '../components/Services';
import { CoursesSection } from '../components/CoursesSection';
import { Projects } from '../components/Projects';
import { Team } from '../components/Team';

export const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <TechMarquee />
      <Services />
      <CoursesSection />
      <Projects />
      <Team />
    </>
  );
};
