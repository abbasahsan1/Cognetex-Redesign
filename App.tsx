import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppLayout } from './components/AppLayout';
import { RouteFallback } from './components/RouteFallback';
import { ErrorBoundary } from './components/ErrorBoundary';

const Home = React.lazy(() => import('./pages/Home').then((module) => ({ default: module.Home })));
const Approach = React.lazy(() => import('./pages/Approach').then((module) => ({ default: module.Approach })));
const AISolutions = React.lazy(() => import('./pages/AISolutions').then((module) => ({ default: module.AISolutions })));
const AIServices = React.lazy(() => import('./pages/AIServices').then((module) => ({ default: module.AIServices })));
const TechStack = React.lazy(() => import('./pages/TechStack').then((module) => ({ default: module.TechStack })));
const Contact = React.lazy(() => import('./pages/Contact').then((module) => ({ default: module.Contact })));
const Team = React.lazy(() => import('./pages/Team').then((module) => ({ default: module.Team })));
const NotFound = React.lazy(() => import('./pages/NotFound').then((module) => ({ default: module.NotFound })));
const Admin = React.lazy(() => import('./pages/Admin').then((module) => ({ default: module.Admin })));

function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route element={<AppLayout />}>
              <Route index element={<Home />} />
              <Route path="/approach" element={<Approach />} />
              <Route path="/solutions" element={<AISolutions />} />
              <Route path="/ai-services" element={<AIServices />} />
              <Route path="/tech-stack" element={<TechStack />} />
              <Route path="/team" element={<Team />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/ghq" element={<Admin />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;