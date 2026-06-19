import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import GlitchText from './GlitchText';

const About: React.FC = () => {
  // 使用 MotionValue 直接儲存目標旋轉角度 (Degrees)
  const rotateXTarget = useMotionValue(0);
  const rotateYTarget = useMotionValue(0);

  // 使用 Spring 讓數值變化平滑，消除手抖或感測器雜訊
  const springConfig = { damping: 20, stiffness: 150 };
  const rotateXSpring = useSpring(rotateXTarget, springConfig);
  const rotateYSpring = useSpring(rotateYTarget, springConfig);

  useEffect(() => {
    // --- 電腦端：滑鼠跟隨邏輯 ---
    const handleMouseMove = (e: MouseEvent) => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      // 計算滑鼠在螢幕中的相對位置 (-0.5 到 0.5)
      const normalizedX = (e.clientX / width) - 0.5;
      const normalizedY = (e.clientY / height) - 0.5;

      // 將位置轉換為角度
      rotateYTarget.set(normalizedX * 20); 
      rotateXTarget.set(normalizedY * -20); 
    };

    // --- 手機端：陀螺儀跟隨邏輯 ---
    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma === null || e.beta === null) return;

      const maxTilt = 20;

      // Gamma (左右傾斜)
      const gamma = Math.min(Math.max(e.gamma, -maxTilt), maxTilt);
      rotateYTarget.set(gamma * -0.5); 
      
      // Beta (前後傾斜)
      // 基準點 45 度
      const beta = Math.min(Math.max(e.beta - 45, -maxTilt), maxTilt);
      rotateXTarget.set(beta * 0.5);
    };

    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', handleOrientation);
    }
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('deviceorientation', handleOrientation);
    };
  }, [rotateXTarget, rotateYTarget]);

  return (
    <div id="about-page" className="min-h-screen flex items-center justify-center p-4 pt-24 relative z-10 perspective-1000 select-none">
      <div style={{ perspective: '1200px' }} className="w-full max-w-3xl flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.5 }}
          style={{
            rotateX: rotateXSpring,
            rotateY: rotateYSpring,
            transformStyle: "preserve-3d"
          }}
          className="w-full bg-[#1a2233]/80 backdrop-blur-xl border border-[#00bfff]/30 rounded-2xl p-8 md:p-12 relative overflow-hidden shadow-[0_0_30px_rgba(0,191,255,0.15)]"
        >
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-[#ff00ff]/50 rounded-tr-2xl pointer-events-none" style={{ transform: "translateZ(10px)" }} />
        <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-[#00bfff]/50 rounded-bl-2xl pointer-events-none" style={{ transform: "translateZ(10px)" }} />
        <div className="absolute -right-10 top-1/2 w-40 h-40 bg-[#ff00ff]/10 blur-3xl rounded-full pointer-events-none" style={{ transform: "translateZ(-10px)" }} />
        
        <div style={{ transform: "translateZ(30px)" }}>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 font-['Orbitron'] tracking-wider border-b border-white/10 pb-4">
            <GlitchText text="關於我" />
            <span className="text-[#00bfff] text-lg ml-4 font-['Rajdhani'] opacity-70">/ ABOUT ME</span>
          </h2>
  
          <div className="space-y-6 text-gray-200 font-['Zen_Maru_Gothic'] text-lg leading-relaxed">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="p-4 bg-white/5 rounded-lg border-l-4 border-[#00bfff]"
            >
              <p>
                我是 <strong className="text-[#00bfff]">幽影櫻</strong>，一個喜歡資訊與遊戲的人。
              </p>
            </motion.div>
  
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <p className="mb-2">
                有在架設 <span className="text-[#ff00ff]">Minecraft 伺服器</span>、研究各種資訊相關知識。
              </p>
              <p>
                也了解過 AI、Docker、虛擬機（PVE）、YOLOv8、Linux CT 使用。
              </p>
            </motion.div>
  
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="p-4 bg-white/5 rounded-lg border-r-4 border-[#ff00ff] text-right"
            >
              <p>
                最近主要投入在 <span className="text-[#ff00ff] font-bold">root  EDL 與 解鎖bootloader</span> 相關的技術研究。
              </p>
            </motion.div>
          </div>
          
          {/* Tech Stats Decoration */}
          <div className="mt-10 pt-6 border-t border-white/10 flex justify-between text-xs font-['Rajdhani'] text-[#00bfff]/60">
              <span>SYS.STATUS: ONLINE</span>
              <span>LOCATION: TAIWAN</span>
              <span>ROLE: ADMIN</span>
          </div>
        </div>
      </motion.div>
      </div>
    </div>
  );
};

export default About;