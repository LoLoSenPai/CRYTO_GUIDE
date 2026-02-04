"use client";

import { useEffect, useMemo, useState } from "react";

const colors = ["#5CE0D8", "#FFD27D", "#7DA6FF", "#FF9EC2", "#A7F3D0"];

export default function Celebration({
  show,
  message,
  onDone
}: {
  show: boolean;
  message?: string;
  onDone: () => void;
}) {
  const particles = useMemo(
    () =>
      Array.from({ length: 14 }).map((_, index) => ({
        id: index,
        left: 10 + (index % 7) * 12,
        delay: (index % 5) * 0.08,
        duration: 0.9 + (index % 4) * 0.15,
        color: colors[index % colors.length]
      })),
    []
  );

  useEffect(() => {
    if (!show) return;
    const timer = window.setTimeout(() => onDone(), 1800);
    return () => window.clearTimeout(timer);
  }, [show, onDone]);

  if (!show) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 flex items-start justify-center pt-16">
      <div className="glass relative w-[92%] max-w-md overflow-hidden rounded-3xl px-6 py-4 shadow-glow">
        <p className="text-sm text-sand-200">{message ?? "Bravo !"}</p>
        <div className="absolute inset-0">
          {particles.map((particle) => (
            <span
              key={particle.id}
              className="confetti"
              style={{
                left: `${particle.left}%`,
                animationDelay: `${particle.delay}s`,
                animationDuration: `${particle.duration}s`,
                backgroundColor: particle.color
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
