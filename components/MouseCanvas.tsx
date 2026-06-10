import React, { useEffect, useRef } from 'react';

const MouseCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Track precise mouse position
  const mousePos = useRef({ x: -100, y: -100 });
  // Track smoothed position for the outer ring
  const smoothedPos = useRef({ x: -100, y: -100 });
  const isClicking = useRef(false);
  
  // Track radius for smooth animation on click
  const radiusObj = useRef({ current: 16 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    // Set initial position immediately on first mouse move to avoid flying in from corner
    let firstMove = true;

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (firstMove) {
        smoothedPos.current = { x: e.clientX, y: e.clientY };
        firstMove = false;
      }
    };

    const handleMouseDown = () => { isClicking.current = true; };
    const handleMouseUp = () => { isClicking.current = false; };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (!firstMove) {
        // Lerp position for outer circle (smooth following)
        smoothedPos.current.x += (mousePos.current.x - smoothedPos.current.x) * 0.3;
        smoothedPos.current.y += (mousePos.current.y - smoothedPos.current.y) * 0.3;
      }

      // Lerp radius
      const targetRadius = isClicking.current ? 12 : 16;
      radiusObj.current.current += (targetRadius - radiusObj.current.current) * 0.3;

      const { x, y } = mousePos.current;
      const sx = smoothedPos.current.x;
      const sy = smoothedPos.current.y;
      const r = radiusObj.current.current;

      const primaryColor = 'rgba(216, 180, 254, 0.9)'; // Light purple inner dot
      const ringColor = 'rgba(216, 180, 254, 0.5)';    // Light purple outer ring

      // Outer Circle (Smoothed position)
      ctx.beginPath();
      ctx.arc(sx, sy, r, 0, Math.PI * 2);
      ctx.strokeStyle = ringColor;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Inner Dot (Exact position)
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fillStyle = primaryColor;
      ctx.fill();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-[9999]"
    />
  );
};

export default MouseCanvas;