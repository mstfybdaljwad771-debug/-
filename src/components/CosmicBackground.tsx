import React, { useEffect, useRef } from 'react';

interface CosmicBackgroundProps {
  isWarping?: boolean;
  warpIntensity?: number;
  hasVideoBackground?: boolean;
}

interface Star {
  x: number;
  y: number;
  z: number;
  size: number;
  color: string;
  twinkleSpeed: number;
  twinklePhase: number;
}

export const CosmicBackground: React.FC<CosmicBackgroundProps> = ({
  isWarping = false,
  warpIntensity = 1,
  hasVideoBackground = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const starsRef = useRef<Star[]>([]);
  const animationFrameId = useRef<number | null>(null);
  const mousePos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const trailRef = useRef<{ x: number; y: number; alpha: number; color: string }[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initStars();
    };

    window.addEventListener('resize', handleResize);

    const colors = ['#ffffff', '#f472b6', '#c084fc', '#e879f9', '#ffd6e7'];

    const initStars = () => {
      const count = Math.min(Math.floor((width * height) / 10000), 85);
      const stars: Star[] = [];
      for (let i = 0; i < count; i++) {
        stars.push({
          x: (Math.random() - 0.5) * width * 2,
          y: (Math.random() - 0.5) * height * 2,
          z: Math.random() * 1000 + 10,
          size: Math.random() * 1.6 + 0.5,
          color: colors[Math.floor(Math.random() * colors.length)],
          twinkleSpeed: Math.random() * 0.02 + 0.01,
          twinklePhase: Math.random() * Math.PI * 2,
        });
      }
      starsRef.current = stars;
    };

    initStars();

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (Math.random() > 0.7) {
        trailRef.current.push({
          x: e.clientX,
          y: e.clientY,
          alpha: 0.7,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        mousePos.current = { x: touch.clientX, y: touch.clientY };
        if (Math.random() > 0.7) {
          trailRef.current.push({
            x: touch.clientX,
            y: touch.clientY,
            alpha: 0.7,
            color: colors[Math.floor(Math.random() * colors.length)],
          });
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    let time = 0;

    const render = () => {
      time += 0.016;

      // If fixed video background is active, clear with transparency so the video shines through
      if (hasVideoBackground) {
        if (isWarping) {
          ctx.fillStyle = 'rgba(5, 2, 10, 0.4)';
          ctx.fillRect(0, 0, width, height);
        } else {
          ctx.clearRect(0, 0, width, height);
        }
      } else {
        if (isWarping) {
          ctx.fillStyle = 'rgba(5, 2, 10, 0.25)';
        } else {
          ctx.fillStyle = '#05020a';
        }
        ctx.fillRect(0, 0, width, height);
      }

      const cx = width / 2;
      const cy = height / 2;

      // Render Stars (Ultra-fast, zero-shadowBlur 60fps)
      const stars = starsRef.current;
      const warpSpeed = isWarping ? 35 * warpIntensity : 0.6;

      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];

        star.z -= warpSpeed;
        if (star.z <= 10) {
          star.z = 1000;
          star.x = (Math.random() - 0.5) * width * 2;
          star.y = (Math.random() - 0.5) * height * 2;
        }

        const k = 400 / star.z;
        const px = star.x * k + cx;
        const py = star.y * k + cy;

        if (px >= 0 && px <= width && py >= 0 && py <= height) {
          if (isWarping) {
            // Draw warp streaks towards center
            const prevK = 400 / (star.z + warpSpeed * 3);
            const prevPx = star.x * prevK + cx;
            const prevPy = star.y * prevK + cy;

            ctx.beginPath();
            ctx.moveTo(prevPx, prevPy);
            ctx.lineTo(px, py);
            ctx.strokeStyle = star.color;
            ctx.lineWidth = Math.min(star.size * k * 1.5, 3);
            ctx.stroke();
          } else {
            // Normal twinkling stars
            star.twinklePhase += star.twinkleSpeed;
            const twinkle = 0.5 + 0.5 * Math.sin(star.twinklePhase);
            const radius = star.size * (0.8 + 0.4 * twinkle);

            ctx.beginPath();
            ctx.arc(px, py, radius, 0, Math.PI * 2);
            ctx.fillStyle = star.color;
            ctx.fill();
          }
        }
      }

      // Draw mouse/touch stardust trails (lightweight without shadowBlur)
      if (!isWarping && trailRef.current.length > 0) {
        for (let i = trailRef.current.length - 1; i >= 0; i--) {
          const p = trailRef.current[i];
          p.alpha -= 0.03;
          if (p.alpha <= 0) {
            trailRef.current.splice(i, 1);
            continue;
          }
          ctx.beginPath();
          ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.alpha;
          ctx.fill();
          ctx.globalAlpha = 1;
        }
      }

      animationFrameId.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [isWarping, warpIntensity, hasVideoBackground]);

  return (
    <canvas
      ref={canvasRef}
      id="cosmic-canvas"
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
};
