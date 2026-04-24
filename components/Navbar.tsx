import React, { useState } from 'react';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Button } from './Button';
import { useThemePreference } from '../hooks/useThemePreference';
import { Logo } from './Logo';

const navLinks = [
  { name: 'HOME', to: '/', end: true },
  { name: 'APPROACH', to: '/approach' },
  { name: 'AI SERVICES', to: '/ai-services' },
  { name: 'COURSES', to: '/courses' },
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
            <Link to="/" onClick={handleNavClick} className="flex items-center cursor-pointer py-1">
              <Logo className="h-9 w-auto text-primary" />
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
                      `text-xs font-sans font-semibold tracking-wide transition-colors px-6 ${
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
                className="p-2 border border-border text-muted hover:text-signal hover:border-signal transition-all duration-200"
                aria-label="Toggle dark mode"
              >
                {isDark ? <Sun size={14} /> : <Moon size={14} />}
              </button>
              <Button size="sm" variant="primary" onClick={handleContactClick}>
                Initiate Project
              </Button>
            </div>


            {/* Mobile Menu Toggle */}
            <div className="flex md:hidden items-center gap-2">
              <button
                onClick={toggleTheme}
                className="p-2 text-muted hover:text-signal transition-colors"
                aria-label="Toggle dark mode"
              >
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              <button 
                className="text-primary hover:text-signal p-2"
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Open menu"
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-menu"
              >
                <Menu size={24} />
              </button>
            </div>

          </div>
        </div>
      </nav>

      {/* Mobile Menu Modal */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[100] md:hidden" id="mobile-menu">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-xl" onClick={() => setMobileMenuOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-[85%] max-w-sm bg-paper border-l border-primary shadow-2xl p-0 flex flex-col animate-in slide-in-from-right duration-300">
            <div className="flex justify-between items-center p-8 border-b border-border">
              <div className="flex flex-col">
                <span className="font-mono text-[10px] font-bold text-signal uppercase tracking-[0.2em]">Navigation</span>
                <span className="font-mono text-xs font-bold uppercase">Ingress_Node_V4</span>
              </div>
              <button 
                onClick={() => setMobileMenuOpen(false)} 
                className="w-10 h-10 border border-border flex items-center justify-center hover:text-signal hover:border-signal transition-colors"
              >
                <X size={18} />
              </button>
            </div>
            
            <div className="flex flex-col p-8 gap-8 flex-grow">
              {navLinks.map((link, idx) => (
                <NavLink
                  key={link.name}
                  to={link.to}
                  end={link.end}
                  onClick={handleNavClick}
                  className={({ isActive }) => 
                    `text-4xl font-bold text-left tracking-tighter uppercase leading-none transition-all ${
                      isActive ? 'text-signal underline decoration-2 underline-offset-8' : 'text-primary'
                    }`
                  }
                >
                  <span className="text-[10px] font-mono text-muted mr-4">0{idx + 1}.</span>
                  {link.name}
                </NavLink>
              ))}
              
              <div className="mt-4 pt-8 border-t border-border space-y-6">
                <button
                  onClick={toggleTheme}
                  className="flex items-center gap-4 text-xs font-mono font-bold text-muted hover:text-signal transition-colors uppercase tracking-widest"
                >
                  <div className="w-8 h-8 border border-border flex items-center justify-center">
                    {isDark ? <Sun size={12} /> : <Moon size={12} />}
                  </div>
                  <span>Appearance: {theme}</span>
                </button>
              </div>
            </div>

            <div className="p-8 border-t border-border bg-background/50">
              <Button fullWidth size="lg" onClick={handleContactClick} className="h-16 tracking-widest font-bold">
                INITIATE PROJECT
              </Button>
              <p className="text-[10px] font-mono text-center text-muted uppercase mt-4 tracking-widest">
                Cognetex Collective © 2024
              </p>
            </div>
          </div>
        </div>
      )}

    </>
  );
};