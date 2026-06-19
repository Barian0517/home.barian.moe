import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';
import Background from './components/Background';
import MouseCanvas from './components/MouseCanvas';
import Header from './components/Header';
import ProfileCard from './components/ProfileCard';
import About from './components/About';
import Projects from './components/Projects';
import Workshop from './components/Workshop';
import Experience from './components/Experience';
import MusicPlayer from './components/MusicPlayer';

const App: React.FC = () => {
  // 預設顯示首頁，不再讀取 hash
  const [currentView, setCurrentView] = useState('home');
  const [showMusicPlayer, setShowMusicPlayer] = useState(false);

  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    const lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
      infinite: false,
    });

    setLenis(lenisInstance);

    function raf(time: number) {
      lenisInstance.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenisInstance.destroy();
    };
  }, []);

  // 純 JS 導航處理函式
  const handleNavigate = (view: string) => {
    setCurrentView(view);
    // 切換頁面時瞬移到頂部，避免與組件退場動畫衝突
    if (lenis) {
      // force immediate scroll
      lenis.scrollTo('top', { immediate: true });
    }
    window.scrollTo({ top: 0 });
    console.log('切換到'+view);
  };

  return (
    // 移除 overflow 以確保 position: sticky 正常運作 (移至 body 處理 x 軸 overflow)
    <div className="relative min-h-screen text-white scanlines">
      {/* 視覺層 (固定背景) */}
      <Background />
      <MouseCanvas />
      
      {/* Experience 專屬背景顏色變換層，獨立於組件生命週期以達平滑過渡 */}
      <motion.div 
        animate={{ opacity: currentView === 'experience' ? 1 : 0 }}
        transition={{ duration: 0.6 }}
        className="fixed inset-0 bg-[#050505] z-0 pointer-events-none"
      />
      
      {/* UI 層 */}
      <Header 
        currentView={currentView} 
        onNavigate={handleNavigate}
        onMusicClick={() => setShowMusicPlayer(!showMusicPlayer)} 
      />
      
      {/* 音樂播放器組件 */}
      <MusicPlayer isOpen={showMusicPlayer} onClose={() => setShowMusicPlayer(false)} />

      <main className="relative z-10">
        <AnimatePresence mode="wait">
          {currentView === 'home' && (
             <ProfileCard key="home" onNavigate={handleNavigate} />
          )}
          {currentView === 'about' && (
             <About key="about" />
          )}
          {currentView === 'projects' && (
             <Projects key="projects" />
          )}
          {currentView === 'experience' && (
             <Experience key="experience" />
          )}
          {currentView === 'workshop' && (
             <Workshop key="workshop" />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default App;