import React from 'react';
import { motion } from 'framer-motion';
import { Music } from 'lucide-react';

// 定義導航項目，使用 view id 而非 url
const links = [
  { name: '首頁', view: 'home' },
  { name: '關於', view: 'about' },
  { name: '我的工坊', view: 'workshop' },
  { name: 'GitHub倉庫', view: 'projects' }
];

interface HeaderProps {
  currentView: string;
  onNavigate: (view: string) => void;
  onMusicClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, onNavigate, onMusicClick }) => {
  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 w-full z-40 flex flex-col md:flex-row justify-between items-center px-6 py-4 backdrop-blur-sm bg-[#0b0f17]/60 border-b border-white/5 gap-4 md:gap-0"
    >
      {/* Logo 點擊切回首頁 */}
      <button 
        className="text-[#00bfff] font-['Orbitron'] font-bold text-xl tracking-widest cursor-pointer hover:opacity-80 transition-opacity bg-transparent border-none p-0" 
        onClick={() => onNavigate('home')}
      >
        BARIAN<span className="text-[#ff00ff]">.MOE</span>
      </button>
      
      <div className="flex items-center gap-8">
        <nav className="flex flex-wrap justify-center items-center gap-6">
          {links.map((link) => {
            const isActive = currentView === link.view;
            return (
              <button
                key={link.name}
                onClick={() => onNavigate(link.view)}
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
    </motion.header>
  );
};

export default Header;