import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, MotionConfig } from 'framer-motion';
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
  const [isLowPerformance, setIsLowPerformance] = useState(false);

  const [lenis, setLenis] = useState<Lenis | null>(null);

  // 自動效能檢測
  useEffect(() => {
    // 1. 基於硬體資訊的初步判斷
    const hardwareConcurrency = navigator.hardwareConcurrency || 8;
    const deviceMemory = (navigator as any).deviceMemory || 8;
    
    if (hardwareConcurrency <= 4 || deviceMemory <= 4) {
      setIsLowPerformance(true);
      return;
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsLowPerformance(true);
      return;
    }

    // 2. 基於 FPS 的動態判斷
    let frameCount = 0;
    let startTime = performance.now();
    let initialTime = startTime;
    let animationFrameId: number;

    const measureFPS = (currentTime: number) => {
      frameCount++;
      const elapsed = currentTime - startTime;
      
      if (elapsed >= 1000) { 
        const fps = (frameCount * 1000) / elapsed;
        if (fps < 45) { // FPS 低於 45 視為低效能設備
          setIsLowPerformance(true);
        }
        
        // 測量 2 秒後停止，避免持續佔用資源
        if (currentTime - initialTime > 2000) {
          return;
        }
        
        frameCount = 0;
        startTime = currentTime;
      }
      animationFrameId = requestAnimationFrame(measureFPS);
    };

    animationFrameId = requestAnimationFrame(measureFPS);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

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

  // 根據效能模式切換游標顯示狀態
  useEffect(() => {
    if (isLowPerformance) {
      document.body.classList.remove('hide-cursor');
      document.body.classList.add('low-performance');
    } else {
      document.body.classList.add('hide-cursor');
      document.body.classList.remove('low-performance');
    }
  }, [isLowPerformance]);

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
    <MotionConfig reducedMotion={isLowPerformance ? "always" : "user"}>
      {/* 移除 overflow 以確保 position: sticky 正常運作 (移至 body 處理 x 軸 overflow) */}
      <div className="relative min-h-screen text-white scanlines">
        {/* 視覺層 (固定背景) */}
        <Background isLowPerformance={isLowPerformance} />
        {!isLowPerformance && <MouseCanvas />}
        
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
          isLowPerformance={isLowPerformance}
          onTogglePerformance={() => setIsLowPerformance(!isLowPerformance)}
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
    </MotionConfig>
  );
};

export default App;