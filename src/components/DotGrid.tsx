'use client';

import { useRef, useEffect } from 'react';

export default function DotGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let time = 0;
    let mouseX = -1000;
    let mouseY = -1000;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    const draw = () => {
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      const spacing = 28;
      const cols = Math.ceil(rect.width / spacing);
      const rows = Math.ceil(rect.height / spacing);

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * spacing + spacing / 2;
          const y = j * spacing + spacing / 2;

          // Wave animation
          const dist = Math.sqrt(
            Math.pow(x - rect.width / 2, 2) + Math.pow(y - rect.height / 2, 2)
          );
          const wave = Math.sin(dist * 0.004 - time * 0.6) * 0.5 + 0.5;

          // Mouse proximity effect
          const mouseDist = Math.sqrt(
            Math.pow(x - mouseX, 2) + Math.pow(y - mouseY, 2)
          );
          const mouseEffect = Math.max(0, 1 - mouseDist / 150);

          const baseAlpha = 0.03 + wave * 0.05;
          const alpha = baseAlpha + mouseEffect * 0.25;
          const size = 1 + mouseEffect * 1.5;

          // Color shifts based on position
          const hue = 230 + Math.sin(dist * 0.003 + time * 0.3) * 30;
          const saturation = 70 + mouseEffect * 30;
          const lightness = 65 + mouseEffect * 20;

          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha})`;
          ctx.fill();
        }
      }

      time += 0.016;
      animationId = requestAnimationFrame(draw);
    };

    resize();
    draw();

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', resize);
    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.5 }}
    />
  );
}
