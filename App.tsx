import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TechMarquee } from './components/TechMarquee';
import { Services } from './components/Services';
import { Projects } from './components/Projects';
import { Team } from './components/Team';
import { ContactForm } from './components/ContactForm';
import { Footer } from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-signal selection:text-white font-sans">
      <Navbar />
      <main>
        <Hero />
        <TechMarquee />
        <Services />
        <Projects />
        <Team />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}

export default App;