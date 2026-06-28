"use client";

import { useEffect, useRef } from "react";

type Star = {
  x: number;
  y: number;
  radius: number;
  baseOpacity: number;
  phase: number;
  speed: number;
  r: number;
  g: number;
  b: number;
};

function createStars(width: number, height: number): Star[] {
  const area = width * height;
  const count = Math.min(220, Math.max(90, Math.floor(area / 9000)));

  return Array.from({ length: count }, () => {
    const isBlue = Math.random() > 0.72;
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.6 + 0.4,
      baseOpacity: 0.2 + Math.random() * 0.2,
      phase: Math.random() * Math.PI * 2,
      speed: 0.008 + Math.random() * 0.02,
      r: isBlue ? 186 : 255,
      g: isBlue ? 230 : 255,
      b: isBlue ? 253 : 255,
    };
  });
}

export function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let stars: Star[] = [];
    let animationId = 0;
    let width = 0;
    let height = 0;
    let time = 0;
    let reduceMotion = false;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      stars = createStars(width, height);
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      for (const star of stars) {
        const twinkle = reduceMotion
          ? 1
          : 0.55 + 0.45 * Math.sin(time * star.speed + star.phase);
        const opacity = Math.min(0.4, star.baseOpacity * twinkle);

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${star.r}, ${star.g}, ${star.b}, ${opacity})`;
        ctx.fill();
      }

      time += 1;
      animationId = window.requestAnimationFrame(draw);
    };

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    reduceMotion = motionQuery.matches;

    const onMotionChange = (event: MediaQueryListEvent) => {
      reduceMotion = event.matches;
    };

    resize();
    draw();

    window.addEventListener("resize", resize);
    motionQuery.addEventListener("change", onMotionChange);

    return () => {
      window.removeEventListener("resize", resize);
      motionQuery.removeEventListener("change", onMotionChange);
      window.cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[-1] h-full w-full"
    />
  );
}
