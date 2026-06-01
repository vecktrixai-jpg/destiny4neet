"use client";

import { useCallback, useRef } from "react";
import { useMousePosition } from "@/hooks/use-mouse-position";
import { cn } from "@/lib/utils";

function calculateCardRotation({
  currentX,
  currentY,
  centerX,
  centerY,
  maxRotationX,
  maxRotationY,
}: {
  currentX: number;
  currentY: number;
  centerX: number;
  centerY: number;
  maxRotationX: number;
  maxRotationY: number;
}) {
  const deltaX = currentX - centerX;
  const deltaY = currentY - centerY;
  const maxDistance = Math.sqrt(centerX ** 2 + centerY ** 2);
  const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);
  const rotationFactor = distance / maxDistance;
  const rotationY = ((-deltaX / centerX) * maxRotationY * rotationFactor).toFixed(2);
  const rotationX = ((deltaY / centerY) * maxRotationX * rotationFactor).toFixed(2);
  return { rotationX, rotationY };
}

export function FeatureCard({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const resetRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const update = useCallback(({ x, y }: { x: number; y: number }) => {
    if (!containerRef.current) return;
    const { width, height } = containerRef.current.getBoundingClientRect();
    const { rotationX, rotationY } = calculateCardRotation({
      centerX: width / 2,
      centerY: height / 2,
      currentX: x,
      currentY: y,
      maxRotationX: 4,
      maxRotationY: 6,
    });
    containerRef.current.style.setProperty("--x", `${rotationX}deg`);
    containerRef.current.style.setProperty("--y", `${rotationY}deg`);
  }, []);

  useMousePosition(containerRef, update);

  return (
    <div
      ref={containerRef}
      className={cn(
        "p-8 rounded-2xl bg-white shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-slate-100",
        "hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.1)] hover:border-blue-200 transition-all ease-linear will-change-transform relative z-0 overflow-hidden group"
      )}
      style={{
        transform: "perspective(400px) rotateX(var(--x, 0deg)) rotateY(var(--y, 0deg))",
        transitionDuration: "50ms",
      }}
      onMouseEnter={() => {
        resetRef.current = setTimeout(() => {
          if (!containerRef.current) return;
          containerRef.current.style.transitionDuration = "0ms";
        }, 300);
      }}
      onMouseLeave={() => {
        if (resetRef.current) clearTimeout(resetRef.current);
        if (!containerRef.current) return;
        containerRef.current.style.transitionDuration = "400ms";
        containerRef.current.style.setProperty("--x", "0deg");
        containerRef.current.style.setProperty("--y", "0deg");
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      
      <div className="relative w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mb-6 pointer-events-none shadow-sm border border-blue-100 group-hover:scale-110 group-hover:bg-blue-600 transition-all duration-300">
        <span className="material-symbols-outlined text-blue-600 text-2xl group-hover:text-white transition-colors duration-300">
          {icon}
        </span>
      </div>
      
      <h4 className="relative font-bold text-xl text-slate-900 mb-3 pointer-events-none group-hover:text-blue-700 transition-colors duration-300">
        {title}
      </h4>
      
      <p className="relative text-slate-600 text-sm leading-relaxed pointer-events-none">
        {description}
      </p>
      
      <div className="absolute bottom-0 left-0 h-1 w-0 bg-blue-600 group-hover:w-full transition-all duration-500 ease-out" />
    </div>
  );
}
