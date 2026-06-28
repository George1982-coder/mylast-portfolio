"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

type SpotlightState = {
  x: number;
  y: number;
  active: boolean;
};

const SpotlightContext = createContext<SpotlightState>({
  x: 0,
  y: 0,
  active: false,
});

export function useSpotlight() {
  return useContext(SpotlightContext);
}

function lerp(start: number, end: number, factor: number) {
  return start + (end - start) * factor;
}

export function MouseSpotlight({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [position, setPosition] = useState<SpotlightState>({
    x: 0,
    y: 0,
    active: false,
  });

  const targetRef = useRef({ x: 0, y: 0 });
  const smoothRef = useRef({ x: 0, y: 0 });
  const activeRef = useRef(false);
  const rafRef = useRef<number | null>(null);
  const enabledRef = useRef(true);
  const animatingRef = useRef(false);

  useEffect(() => {
    setMounted(true);

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointerQuery = window.matchMedia("(pointer: fine)");

    const updateEnabled = () => {
      enabledRef.current =
        !motionQuery.matches && finePointerQuery.matches;
    };

    updateEnabled();
    motionQuery.addEventListener("change", updateEnabled);
    finePointerQuery.addEventListener("change", updateEnabled);

    const tick = () => {
      smoothRef.current = {
        x: lerp(smoothRef.current.x, targetRef.current.x, 0.14),
        y: lerp(smoothRef.current.y, targetRef.current.y, 0.14),
      };

      setPosition({
        x: smoothRef.current.x,
        y: smoothRef.current.y,
        active: activeRef.current,
      });

      const dx = targetRef.current.x - smoothRef.current.x;
      const dy = targetRef.current.y - smoothRef.current.y;
      const stillMoving = Math.hypot(dx, dy) > 0.5;

      if (stillMoving || activeRef.current) {
        rafRef.current = window.requestAnimationFrame(tick);
      } else {
        animatingRef.current = false;
        rafRef.current = null;
      }
    };

    const startAnimation = () => {
      if (animatingRef.current) return;
      animatingRef.current = true;
      rafRef.current = window.requestAnimationFrame(tick);
    };

    const onMove = (event: MouseEvent) => {
      if (!enabledRef.current) return;

      targetRef.current = { x: event.clientX, y: event.clientY };
      activeRef.current = true;
      startAnimation();
    };

    const onLeave = () => {
      activeRef.current = false;
      startAnimation();
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      motionQuery.removeEventListener("change", updateEnabled);
      finePointerQuery.removeEventListener("change", updateEnabled);

      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  const spotlightStyle = {
    opacity: position.active ? 1 : 0,
    background: `radial-gradient(700px circle at ${position.x}px ${position.y}px, rgba(56, 189, 248, 0.18), rgba(14, 165, 233, 0.07) 30%, transparent 60%)`,
  };

  const spotlightCoreStyle = {
    opacity: position.active ? 1 : 0,
    background: `radial-gradient(420px circle at ${position.x}px ${position.y}px, rgba(186, 230, 253, 0.12), transparent 55%)`,
  };

  return (
    <SpotlightContext.Provider value={position}>
      <div className="relative isolate min-h-screen">
        <div className="relative z-10">{children}</div>

        {mounted ? (
          <>
            <div
              aria-hidden
              className="pointer-events-none fixed inset-0 z-40 mix-blend-screen transition-opacity duration-500 ease-out"
              style={spotlightStyle}
            />
            <div
              aria-hidden
              className="pointer-events-none fixed inset-0 z-40 mix-blend-soft-light transition-opacity duration-500 ease-out"
              style={spotlightCoreStyle}
            />
          </>
        ) : null}
      </div>
    </SpotlightContext.Provider>
  );
}
