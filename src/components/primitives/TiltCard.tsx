"use client";

import { useRef, useCallback, ReactNode } from "react";

interface TiltCardProps {
  children: ReactNode;
  /** Max tilt in degrees — default 10 */
  maxTilt?: number;
  /** Scale on hover — default 1.03 */
  scale?: number;
  /** Border radius — default "12px" */
  radius?: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function TiltCard({
  children,
  maxTilt = 10,
  scale = 1.03,
  radius = "12px",
  className,
  style,
}: TiltCardProps) {
  const cardRef  = useRef<HTMLDivElement>(null);
  const glowRef  = useRef<HTMLDivElement>(null);
  const rafRef   = useRef<number>(0);

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    const glow = glowRef.current;
    if (!card || !glow) return;

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width  / 2;
      const cy = rect.height / 2;
      const dx = (x - cx) / cx;   // -1 to +1
      const dy = (y - cy) / cy;

      const rotX = -dy * maxTilt;
      const rotY =  dx * maxTilt;

      card.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(${scale})`;
      card.style.boxShadow = `
        ${-dx * 18}px ${-dy * 12}px 40px rgba(0,0,0,0.18),
        ${-dx *  8}px ${-dy *  6}px 80px rgba(30,111,255,0.12),
        inset 0 0 0 1px rgba(255,255,255,0.18)
      `;

      // Glassy sheen follows cursor
      glow.style.opacity    = "1";
      glow.style.left       = `${x - 120}px`;
      glow.style.top        = `${y - 120}px`;
    });
  }, [maxTilt, scale]);

  const onLeave = useCallback(() => {
    const card = cardRef.current;
    const glow = glowRef.current;
    if (!card || !glow) return;
    card.style.transform  = "perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)";
    card.style.boxShadow  = "0 8px 40px rgba(10,18,50,0.12), 0 2px 8px rgba(0,0,0,0.07)";
    glow.style.opacity    = "0";
  }, []);

  return (
    <div
      ref={cardRef}
      className={className}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        position: "relative",
        overflow: "hidden",
        borderRadius: radius,
        isolation: "isolate",
        transformStyle: "preserve-3d",
        willChange: "transform",
        transition: "transform 0.45s cubic-bezier(0.16,1,0.3,1), box-shadow 0.45s cubic-bezier(0.16,1,0.3,1)",
        boxShadow: "0 8px 40px rgba(10,18,50,0.12), 0 2px 8px rgba(0,0,0,0.07)",
        cursor: "default",
        ...style,
      }}
    >
      {/* Glassy cursor-following sheen */}
      <div
        ref={glowRef}
        aria-hidden="true"
        style={{
          position: "absolute",
          width:  "240px",
          height: "240px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.06) 40%, transparent 70%)",
          pointerEvents: "none",
          opacity: 0,
          transition: "opacity 0.3s ease",
          zIndex: 10,
          mixBlendMode: "screen",
        }}
      />

      {/* Glass border shimmer */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: radius,
          pointerEvents: "none",
          zIndex: 10,
          background: "linear-gradient(135deg, rgba(255,255,255,0.14) 0%, transparent 50%, rgba(255,255,255,0.06) 100%)",
        }}
      />

      {children}
    </div>
  );
}
