import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Button } from './Button';
import { useThemePreference } from '../hooks/useThemePreference';

const navLinks = [
  { name: 'HOME', to: '/', end: true },
  { name: 'APPROACH', to: '/approach' },
  { name: 'AI SOLUTIONS', to: '/solutions' },
  { name: 'AI SERVICES', to: '/ai-services' },
  { name: 'TECH STACK', to: '/tech-stack' },
  { name: 'OUR TEAM', to: '/team' },
  { name: 'CAREERS', to: '/careers' },
];

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigate = useNavigate();
  const { theme, toggleTheme } = useThemePreference();
  const isDark = theme === 'dark';

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
                className="px-3 py-2 border border-border text-xs font-mono font-medium tracking-wide text-muted hover:text-signal hover:border-signal transition-all duration-200"
                aria-label="Toggle dark mode"
              >
                {isDark ? 'LHT' : 'DRK'}
              </button>
              <Button size="sm" variant="primary" onClick={handleContactClick}>
                INITIATE PROJECT
              </Button>
            </div>

            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden text-primary hover:text-signal p-2"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Modal */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[100] md:hidden" id="mobile-menu">
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
                className="mt-2 flex items-center gap-2 text-sm font-mono text-muted hover:text-signal transition-colors"
              >
                {isDark ? 'LHT MODE' : 'DRK MODE'}
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