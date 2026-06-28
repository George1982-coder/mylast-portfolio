"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useSpotlight } from "./MouseSpotlight";

type GlowCardProps = {
  children: ReactNode;
  className?: string;
  variant?: "light" | "dark";
};

function distanceToRect(x: number, y: number, rect: DOMRect) {
  const dx = Math.max(rect.left - x, 0, x - rect.right);
  const dy = Math.max(rect.top - y, 0, y - rect.bottom);
  return Math.hypot(dx, dy);
}

export function GlowCard({
  children,
  className = "",
  variant = "dark",
}: GlowCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { x, y, active } = useSpotlight();
  const [mounted, setMounted] = useState(false);
  const [proximity, setProximity] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !active || !cardRef.current) {
      setProximity(0);
      return;
    }

    const rect = cardRef.current.getBoundingClientRect();
    const distance = distanceToRect(x, y, rect);
    const maxDistance = variant === "light" ? 180 : 160;
    const nextProximity = Math.max(0, 1 - distance / maxDistance);

    setProximity(nextProximity);
  }, [mounted, x, y, active, variant]);

  const glow = mounted && isHovered ? 1 : proximity;
  const isLit = mounted && glow > 0.08;

  const borderColor =
    variant === "light"
      ? "transparent"
      : `rgba(56, 189, 248, ${0.2 + glow * 0.65})`;

  const shadowColor =
    variant === "light"
      ? `rgba(56, 189, 248, ${glow * 0.28})`
      : `rgba(56, 189, 248, ${glow * 0.35})`;

  const backgroundTint =
    variant === "dark" && isLit
      ? `rgba(15, 23, 42, ${glow * 0.35})`
      : undefined;

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`rounded-2xl transition-[box-shadow,border-color,background-color] duration-300 ease-out ${className}`}
      style={{
        borderWidth: variant === "dark" && isLit ? 1 : 0,
        borderStyle: "solid",
        borderColor: isLit ? borderColor : "transparent",
        boxShadow: isLit
          ? `0 0 ${12 + glow * 28}px ${shadowColor}, inset 0 0 ${glow * 18}px rgba(56, 189, 248, ${variant === "dark" ? glow * 0.06 : glow * 0.05})`
          : undefined,
        backgroundColor: backgroundTint,
      }}
    >
      {children}
    </div>
  );
}
