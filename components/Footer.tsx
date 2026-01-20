import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-primary text-white border-t border-white/10 pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-16">
          <div className="md:col-span-5">
            <div className="flex items-center gap-2 mb-6">
               <div className="w-4 h-4 bg-white"></div>
               <span className="font-mono font-bold tracking-tight">COGNETEX</span>
            </div>
            <p className="text-gray-400 text-sm max-w-xs leading-relaxed">
              Engineering the intelligence of tomorrow. Precise, autonomous, and scalable systems for the modern enterprise.
            </p>
          </div>
          
          <div className="md:col-span-3">
            <h4 className="font-mono text-xs text-signal uppercase tracking-wider mb-6">Directory</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="hover:text-white cursor-pointer transition-colors">Services</li>
              <li className="hover:text-white cursor-pointer transition-colors">Work</li>
              <li className="hover:text-white cursor-pointer transition-colors">Team</li>
            </ul>
          </div>

          <div className="md:col-span-4">
             <h4 className="font-mono text-xs text-signal uppercase tracking-wider mb-6">Connect</h4>
             <div className="flex gap-4">
                <a href="#" className="w-10 h-10 border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-colors font-mono text-xs">LI</a>
                <a href="#" className="w-10 h-10 border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-colors font-mono text-xs">TW</a>
                <a href="#" className="w-10 h-10 border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-colors font-mono text-xs">GH</a>
             </div>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-mono text-gray-500 uppercase">
          <p>© {new Date().getFullYear()} Cognetex Inc. Systems Active.</p>
          <div className="flex gap-6">
            <span className="cursor-pointer hover:text-white">Privacy Protocol</span>
            <span className="cursor-pointer hover:text-white">Terms of Execution</span>
          </div>
        </div>
      </div>
    </footer>
  );
};