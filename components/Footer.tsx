import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from './Logo';
import { Linkedin, Twitter, Github } from 'lucide-react';
import { useContent } from '../hooks/useContent';

export const Footer: React.FC = () => {
  const { siteConfig } = useContent();
  const socials = siteConfig?.socials;

  return (
    <footer className="bg-paper text-foreground border-t border-border pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-16">
          <div className="md:col-span-12 lg:col-span-5">
            <div className="mb-8">
              <Logo className="h-16 w-auto text-foreground" />
            </div>
            <p className="text-muted text-sm max-w-xs leading-relaxed">
              Rethinking how thinking works. Precise, autonomous, and scalable systems for the modern enterprise.
            </p>
          </div>
          
          <div className="md:col-span-6 lg:col-span-3">
            <h4 className="font-mono text-xs text-signal uppercase tracking-wider mb-6">Directory</h4>
            <ul className="space-y-3 text-sm text-muted">
              <li>
                <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/approach" className="hover:text-foreground transition-colors">Approach</Link>
              </li>
              <li>
                <Link to="/ai-services" className="hover:text-foreground transition-colors">AI Services</Link>
              </li>
              <li>
                <Link to="/team" className="hover:text-foreground transition-colors">Our Team</Link>
              </li>
              <li>
                <Link to="/careers" className="hover:text-foreground transition-colors">Careers</Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-6 lg:col-span-4">
             <h4 className="font-mono text-xs text-signal uppercase tracking-wider mb-6">Connect</h4>
             <div className="flex gap-4">
               <a 
                 href={socials?.linkedin || 'https://linkedin.com/company/cognetex'} 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="w-10 h-10 border border-border flex items-center justify-center hover:bg-foreground hover:text-background transition-colors"
                 aria-label="LinkedIn"
               >
                 <Linkedin size={20} strokeWidth={1.5} />
               </a>
               <a 
                 href={socials?.twitter || 'https://twitter.com/cognetex'} 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="w-10 h-10 border border-border flex items-center justify-center hover:bg-foreground hover:text-background transition-colors"
                 aria-label="Twitter"
               >
                 <Twitter size={20} strokeWidth={1.5} />
               </a>
               <a 
                 href={socials?.github || 'https://github.com/cognetex'} 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="w-10 h-10 border border-border flex items-center justify-center hover:bg-foreground hover:text-background transition-colors"
                 aria-label="GitHub"
               >
                 <Github size={20} strokeWidth={1.5} />
               </a>
             </div>

          </div>


        </div>
        
        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-mono text-muted uppercase">
          <p>© {new Date().getFullYear()} Cognetex Inc. Systems Active.</p>
          <div className="flex gap-6">
            <span className="cursor-pointer hover:text-foreground">Privacy Protocol</span>
            <span className="cursor-pointer hover:text-foreground">Terms of Execution</span>
          </div>
        </div>
      </div>
    </footer>
  );
};