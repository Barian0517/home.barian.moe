import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, ChevronDown } from 'lucide-react';

// 定義導航項目，使用 view id 而非 url
const links = [
  { name: '首頁', view: 'home' },
  { name: '關於', view: 'about' },
  { name: '經歷', view: 'experience' },
  { name: '作品集', view: 'workshop' },
  { name: 'GitHub倉庫', view: 'projects' }
];

interface HeaderProps {
  currentView: string;
  onNavigate: (view: string) => void;
  onMusicClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, onNavigate, onMusicClick }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const currentLink = links.find(l => l.view === currentView) || links[0];

  const handleNavClick = (view: string) => {
    onNavigate(view);
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 w-full z-40 px-6 py-4 backdrop-blur-md bg-[#0b0f17]/80 border-b border-white/5"
    >
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        {/* Logo */}
        <button 
          className="text-[#00bfff] font-['Orbitron'] font-bold text-xl tracking-widest cursor-pointer hover:opacity-80 transition-opacity bg-transparent border-none p-0" 
          onClick={() => handleNavClick('home')}
        >
          BARIAN<span className="text-[#ff00ff]">.MOE</span>
        </button>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <nav className="flex justify-center items-center gap-6">
            {links.map((link) => {
              const isActive = currentView === link.view;
              return (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link.view)}
                  className={`relative transition-colors font-['Rajdhani'] font-bold text-lg group bg-transparent border-none cursor-pointer p-0 ${isActive ? 'text-[#00bfff]' : 'text-gray-300 hover:text-[#00bfff]'}`}
                >
                  {link.name}
                  <span 
                    className={`absolute -bottom-1 left-0 h-[2px] bg-[#ff00ff] transition-all duration-300 shadow-[0_0_8px_#ff00ff] ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`} 
                  />
                </button>
              );
            })}
          </nav>

          {/* Music Toggle Button */}
          <button 
            onClick={onMusicClick}
            className="w-10 h-10 flex items-center justify-center rounded-full border border-[#00bfff]/30 text-[#00bfff] hover:bg-[#00bfff]/10 hover:shadow-[0_0_10px_#00bfff] transition-all duration-300 flex-shrink-0 bg-transparent cursor-pointer"
            title="Music Player"
          >
            <Music size={20} />
          </button>
        </div>

        {/* Mobile Navigation Controls */}
        <div className="flex md:hidden items-center gap-4">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full text-white font-['Rajdhani'] font-bold transition-colors hover:bg-white/10"
          >
            <span className={isMobileMenuOpen ? "text-[#ff00ff]" : "text-[#00bfff]"}>
              {currentLink.name}
            </span>
            <ChevronDown size={16} className={`transition-transform duration-300 ${isMobileMenuOpen ? "rotate-180 text-[#ff00ff]" : "text-[#00bfff]"}`} />
          </button>
          
          <button 
            onClick={onMusicClick}
            className="w-9 h-9 flex items-center justify-center rounded-full border border-[#00bfff]/30 text-[#00bfff] bg-transparent hover:bg-white/5"
            title="Music Player"
          >
            <Music size={18} />
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden flex flex-col"
          >
            <nav className="flex flex-col items-center gap-4 pt-6 pb-2">
              {links.map((link) => {
                const isActive = currentView === link.view;
                return (
                  <button
                    key={link.name}
                    onClick={() => handleNavClick(link.view)}
                    className={`relative transition-colors font-['Rajdhani'] font-bold text-lg group bg-transparent border-none cursor-pointer p-0 ${isActive ? 'text-[#00bfff]' : 'text-gray-300 hover:text-white'}`}
                  >
                    {link.name}
                  </button>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;