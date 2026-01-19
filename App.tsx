import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Background from './components/Background';
import MouseCanvas from './components/MouseCanvas';
import Header from './components/Header';
import ProfileCard from './components/ProfileCard';
import About from './components/About';
import Projects from './components/Projects';
import Workshop from './components/Workshop';
import MiniGame from './components/MiniGame';
import MusicPlayer from './components/MusicPlayer';

const App: React.FC = () => {
  // 預設顯示首頁，不再讀取 hash
  const [currentView, setCurrentView] = useState('home');
  const [showMusicPlayer, setShowMusicPlayer] = useState(false);

  // 純 JS 導航處理函式
  const handleNavigate = (view: string) => {
    setCurrentView(view);
    // 切換頁面時平滑滾動到頂部
    window.scrollTo({ top: 0, behavior: 'smooth' });
    console.log('切換到'+view);
  };

  return (
    // 使用 overflow-x-hidden 允許垂直滾動，同時保留 scanlines 效果
    <div className="relative min-h-screen text-white overflow-x-hidden scanlines">
      {/* 視覺層 (固定背景) */}
      <Background />
      <MouseCanvas />
      
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
          {currentView === 'workshop' && (
             <Workshop key="workshop" />
          )}
        </AnimatePresence>
      </main>
      
      {/* 互動層 */}
      <MiniGame />
    </div>
  );
};

export default App;