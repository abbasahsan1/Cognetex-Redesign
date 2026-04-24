import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AppLayout } from './components/AppLayout';
import { RouteFallback } from './components/RouteFallback';
import { ErrorBoundary } from './components/ErrorBoundary';
import { ScrollToTop } from './components/ScrollToTop';


const Home = React.lazy(() => import('./pages/Home').then((module) => ({ default: module.Home })));
const Approach = React.lazy(() => import('./pages/Approach').then((module) => ({ default: module.Approach })));
const AIServices = React.lazy(() => import('./pages/AIServices').then((module) => ({ default: module.AIServices })));
const Contact = React.lazy(() => import('./pages/Contact').then((module) => ({ default: module.Contact })));
const Team = React.lazy(() => import('./pages/Team').then((module) => ({ default: module.Team })));
const Careers = React.lazy(() => import('./pages/Careers').then((module) => ({ default: module.Careers })));
const NotFound = React.lazy(() => import('./pages/NotFound').then((module) => ({ default: module.NotFound })));
const Admin = React.lazy(() => import('./pages/Admin').then((module) => ({ default: module.Admin })));
const Courses = React.lazy(() => import('./pages/Courses').then((module) => ({ default: module.Courses })));
const ServiceDetail = React.lazy(() => import('./pages/ServiceDetail').then((module) => ({ default: module.ServiceDetail })));


const ProjectDetail = React.lazy(() => import('./pages/ProjectDetail').then((module) => ({ default: module.ProjectDetail })));
const EmployeeDetail = React.lazy(() => import('./pages/EmployeeDetail').then((module) => ({ default: module.EmployeeDetail })));
const CourseDetail = React.lazy(() => import('./pages/CourseDetail').then((module) => ({ default: module.CourseDetail })));


function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <ErrorBoundary>

          <Suspense fallback={<RouteFallback />}>
            <Routes>
              <Route element={<AppLayout />}>
                <Route index element={<Home />} />
                <Route path="/approach" element={<Approach />} />
                <Route path="/ai-services" element={<AIServices />} />
                <Route path="/services/:id" element={<ServiceDetail />} />
                <Route path="/projects/:id" element={<ProjectDetail />} />
                <Route path="/team" element={<Team />} />
                <Route path="/team/:id" element={<EmployeeDetail />} />
                <Route path="/careers" element={<Careers />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/courses/:id" element={<CourseDetail />} />

                <Route path="/contact" element={<Contact />} />

                <Route path="/ghq" element={<Admin />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </BrowserRouter>
    </HelmetProvider>
  );
}


export default App;