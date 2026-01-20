import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppLayout } from './components/AppLayout';
import { Home } from './pages/Home';
import { Approach } from './pages/Approach';
import { AISolutions } from './pages/AISolutions';
import { AIServices } from './pages/AIServices';
import { TechStack } from './pages/TechStack';
import { Contact } from './pages/Contact';
import { NotFound } from './pages/NotFound';
import { Team } from './pages/Team';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="/approach" element={<Approach />} />
          <Route path="/solutions" element={<AISolutions />} />
          <Route path="/ai-services" element={<AIServices />} />
          <Route path="/tech-stack" element={<TechStack />} />
          <Route path="/team" element={<Team />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;