import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from './Button';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'SERVICES', href: '#services' },
    { name: 'WORK', href: '#projects' },
    { name: 'TEAM', href: '#team' },
  ];

  const scrollToSection = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-paper border-b border-primary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollToSection('#hero')}>
              <div className="w-5 h-5 bg-primary flex items-center justify-center">
                <span className="text-white text-[10px] font-bold">C</span>
              </div>
              <span className="text-sm font-mono font-bold tracking-tight text-primary">
                COGNETEX
              </span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center">
              {navLinks.map((link, idx) => (
                <div key={link.name} className="flex items-center">
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-xs font-mono font-medium text-muted hover:text-signal transition-colors px-6"
                  >
                    {link.name}
                  </button>
                  {idx !== navLinks.length - 1 && (
                    <span className="text-border h-4 border-r border-border mx-2"></span>
                  )}
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="hidden md:block pl-6 border-l border-border h-full flex items-center">
              <Button size="sm" variant="primary" onClick={() => scrollToSection('#contact')}>
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
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.href)}
                  className="text-2xl font-bold text-left text-primary hover:text-signal font-sans tracking-tight"
                >
                  {link.name}
                </button>
              ))}
            </div>
            <div className="p-6 border-t border-border mb-safe">
              <Button fullWidth onClick={() => scrollToSection('#contact')}>
                INITIATE PROJECT
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};