import React, { useEffect, useRef } from 'react';

// 更新為 GitHub Raw 連結
const BACKGROUND_IMAGE_URL = 'https://raw.githubusercontent.com/Barian0517/barian-s-selfweb/refs/heads/main/462574261_560443646700220_2712531227742454466_n.jpg';

interface BackgroundProps {
  isLowPerformance?: boolean;
}

const Background: React.FC<BackgroundProps> = ({ isLowPerformance = false }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // 電流粒子效果
  useEffect(() => {
    if (isLowPerformance) return; // 停用以節省效能

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const particles: { x: number; y: number; vx: number; vy: number }[] = [];
    const particleCount = 40; // 降低粒子數量
    const connectionDistance = 150;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5
      });
    }

    let animationFrameId: number;
    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      for (let i = 0; i < particleCount; i++) {
        let p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 191, 255, 0.5)';
        ctx.fill();

        for (let j = i + 1; j < particleCount; j++) {
          let p2 = particles[j];
          let dx = p.x - p2.x;
          let dy = p.y - p2.y;
          let distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            const alpha = 1 - distance / connectionDistance;
            ctx.strokeStyle = `rgba(0, 191, 255, ${alpha * 0.4})`;
            ctx.lineWidth = 1;
            ctx.stroke();
            
            if (Math.random() > 0.98) {
               ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.8})`;
               ctx.lineWidth = 2;
               ctx.stroke();
            }
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('resize', handleResize);
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [isLowPerformance]);

  return (
    <div className="fixed inset-0 w-full h-full -z-10">
      {/* Background Image */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-top bg-no-repeat transition-opacity duration-700"
        style={{
          backgroundImage: `url('${BACKGROUND_IMAGE_URL}')`
        }}
      />
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-[#0b0f17]/40" />

      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 191, 255, 0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0, 191, 255, 0.1) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />
      
      {/* Electric Canvas Layer */}
      {!isLowPerformance && (
        <canvas 
          ref={canvasRef} 
          className="absolute inset-0 w-full h-full pointer-events-none mix-blend-screen opacity-60"
        />
      )}

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0b0f17_90%)] pointer-events-none" />
    </div>
  );
};

export default Background;