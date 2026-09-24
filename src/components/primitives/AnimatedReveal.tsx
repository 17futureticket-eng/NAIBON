"use client";

import { useEffect, useRef } from "react";

type Direction = "up" | "left" | "right" | "scale";

interface AnimatedRevealProps {
  children: React.ReactNode;
  direction?: Direction;
  delay?: number;
  className?: string;
  threshold?: number;
}

const directionClass: Record<Direction, string> = {
  up: "reveal",
  left: "reveal-left",
  right: "reveal-right",
  scale: "reveal-scale",
};

const delayClass: Record<number, string> = {
  0: "",
  1: "reveal-d1",
  2: "reveal-d2",
  3: "reveal-d3",
  4: "reveal-d4",
  5: "reveal-d5",
};

export default function AnimatedReveal({
  children,
  direction = "up",
  delay = 0,
  className = "",
  threshold = 0.15,
}: AnimatedRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          obs.unobserve(el);
        }
      },
      { threshold }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  const dc = delayClass[delay] ?? "";

  return (
    <div
      ref={ref}
      className={`${directionClass[direction]} ${dc} ${className}`}
    >
      {children}
    </div>
  );
}
