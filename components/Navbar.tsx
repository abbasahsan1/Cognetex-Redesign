import React, { useEffect, useState } from 'react';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Button } from './Button';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'HOME', to: '/', end: true },
    { name: 'APPROACH', to: '/approach' },
    { name: 'AI SOLUTIONS', to: '/solutions' },
    { name: 'AI SERVICES', to: '/ai-services' },
    { name: 'TECH STACK', to: '/tech-stack' },
    { name: 'OUR TEAM', to: '/team' },
  ];

  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldDark = stored ? stored === 'dark' : prefersDark;
    setIsDark(shouldDark);
    document.documentElement.classList.toggle('dark', shouldDark);
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
  };

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  const handleContactClick = () => {
    navigate('/contact');
    setMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-paper border-b border-primary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link to="/" onClick={handleNavClick} className="flex items-center gap-2 cursor-pointer">
              <div className="w-5 h-5 bg-primary flex items-center justify-center">
                <span className="text-on-primary text-[10px] font-bold">C</span>
              </div>
              <span className="text-sm font-mono font-bold tracking-tight text-primary">
                COGNETEX
              </span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center">
              {navLinks.map((link, idx) => (
                <div key={link.name} className="flex items-center">
                  <NavLink
                    to={link.to}
                    end={link.end}
                    onClick={handleNavClick}
                    className={({ isActive }) =>
                      `text-xs font-mono font-medium transition-colors px-6 ${
                        isActive ? 'text-signal' : 'text-muted hover:text-signal'
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                  {idx !== navLinks.length - 1 && (
                    <span className="text-border h-4 border-r border-border mx-2"></span>
                  )}
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="hidden md:flex items-center gap-3 pl-6 border-l border-border h-full">
              <button
                onClick={toggleTheme}
                className="w-9 h-9 border border-border flex items-center justify-center hover:bg-primary hover:text-on-primary transition-colors"
                aria-label="Toggle dark mode"
              >
                {isDark ? <Sun size={16} /> : <Moon size={16} />}
              </button>
              <Button size="sm" variant="primary" onClick={handleContactClick}>
                INITIATE PROJECT
              </Button>
            </div>

            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden text-primary hover:text-signal p-2"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Toggle menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Modal */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[100] md:hidden">
          <div className="absolute inset-0 bg-primary/20 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-full max-w-xs bg-paper border-l border-primary shadow-hard p-0 flex flex-col">
            <div className="flex justify-between items-center p-6 border-b border-border">
              <span className="font-mono font-bold">MENU</span>
              <button onClick={() => setMobileMenuOpen(false)} className="text-primary hover:text-signal">
                <X size={24} />
              </button>
            </div>
            <div className="flex flex-col p-6 gap-6 flex-grow">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.to}
                  end={link.end}
                  onClick={handleNavClick}
                  className="text-2xl font-bold text-left text-primary hover:text-signal font-sans tracking-tight"
                >
                  {link.name}
                </NavLink>
              ))}
              <button
                onClick={toggleTheme}
                className="mt-2 flex items-center gap-2 text-sm font-mono text-muted hover:text-signal"
              >
                {isDark ? 'LIGHT MODE' : 'DARK MODE'}
                {isDark ? <Sun size={14} /> : <Moon size={14} />}
              </button>
            </div>
            <div className="p-6 border-t border-border mb-safe">
              <Button fullWidth onClick={handleContactClick}>
                INITIATE PROJECT
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};