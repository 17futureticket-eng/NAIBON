"use client";

import { useRef, useCallback } from "react";
import AnimatedReveal from "@/components/primitives/AnimatedReveal";

const STEPS = [
  {
    num: "01",
    title: "Builders launch",
    body: "Mint an agent as an iNFT, set a per-call price, and sell shares from a fixed-price IPO. Permissionless — live in minutes.",
    detail: "Permissionless · iNFT · fixed price IPO",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <rect x="3" y="3" width="22" height="22" rx="4" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M9 14h10M14 9v10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    num: "02",
    title: "Anyone calls it",
    body: "Pay per inference, receive a TEE-attested response. Every fee lands in the agent's on-chain vault — every call accounted for.",
    detail: "TEE attested · USDC · on-chain vault",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <circle cx="14" cy="14" r="10" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M10 14l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    num: "03",
    title: "Holders earn",
    body: "Each call snapshots revenue and pays out pro-rata to ShareToken holders. Automatic, verifiable, no claiming needed.",
    detail: "pro rata · Automatic · No claiming needed",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <path d="M5 20l6-8 4 5 3-4 5 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

function MagneticCard({ step, index }: { step: typeof STEPS[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const raf = useRef<number | null>(null);

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    const glow = glowRef.current;
    if (!card || !glow) return;
    if (raf.current) cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const dx = (x - cx) / cx;   // -1 to 1
      const dy = (y - cy) / cy;
      // Tilt
      card.style.transform = `perspective(900px) rotateY(${dx * 7}deg) rotateX(${-dy * 5}deg) scale(1.035) translateY(-4px)`;
      card.style.boxShadow = `
        ${-dx * 12}px ${-dy * 8}px 40px rgba(30,111,255,0.14),
        0 24px 48px rgba(10,14,26,0.12),
        inset 0 0 0 1px rgba(30,111,255,0.18)
      `;
      // Glow follows cursor
      glow.style.opacity = "1";
      glow.style.left = `${x - 80}px`;
      glow.style.top  = `${y - 80}px`;
    });
  }, []);

  const onMouseLeave = useCallback(() => {
    const card = cardRef.current;
    const glow = glowRef.current;
    if (!card || !glow) return;
    card.style.transform = "perspective(900px) rotateY(0deg) rotateX(0deg) scale(1) translateY(0)";
    card.style.boxShadow = "0 2px 16px rgba(10,14,26,0.07), inset 0 0 0 1px rgba(10,14,26,0.08)";
    glow.style.opacity = "0";
  }, []);

  return (
    <AnimatedReveal delay={(index + 1) as 1 | 2 | 3}>
      <div
        ref={cardRef}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        style={{
          position: "relative",
          overflow: "hidden",
          background: "rgba(255,255,255,0.92)",
          backdropFilter: "blur(12px)",
          borderRadius: "12px",
          padding: "2rem 1.75rem",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          cursor: "default",
          boxShadow: "0 2px 16px rgba(10,14,26,0.07), inset 0 0 0 1px rgba(10,14,26,0.08)",
          transition: "transform 0.45s cubic-bezier(0.16,1,0.3,1), box-shadow 0.45s cubic-bezier(0.16,1,0.3,1)",
          willChange: "transform",
        }}
      >
        {/* Cursor glow */}
        <div
          ref={glowRef}
          aria-hidden="true"
          style={{
            position: "absolute",
            width: "160px",
            height: "160px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(30,111,255,0.18) 0%, transparent 70%)",
            pointerEvents: "none",
            opacity: 0,
            transition: "opacity 0.3s ease",
            zIndex: 0,
          }}
        />

        {/* Step number — large light watermark */}
        <div aria-hidden="true" style={{
          position: "absolute",
          top: "0.75rem",
          right: "1rem",
          fontFamily: "var(--font-sans)",
          fontWeight: 700,
          fontSize: "5rem",
          letterSpacing: "-0.06em",
          color: "rgba(10,14,26,0.04)",
          lineHeight: 1,
          userSelect: "none",
          zIndex: 0,
        }}>
          {step.num}
        </div>

        {/* Icon badge */}
        <div style={{
          position: "relative",
          zIndex: 1,
          width: "48px",
          height: "48px",
          borderRadius: "10px",
          background: "var(--acid)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          flexShrink: 0,
          boxShadow: "0 4px 16px rgba(30,111,255,0.35)",
        }}>
          {step.icon}
        </div>

        {/* Text */}
        <div style={{ position: "relative", zIndex: 1 }}>
          <h3 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.2rem, 2vw, 1.5rem)",
            fontWeight: 400,
            letterSpacing: "-0.02em",
            color: "var(--ink)",
            marginBottom: "0.625rem",
          }}>
            {step.title}
          </h3>
          <p style={{
            fontFamily: "var(--font-sans)",
            fontSize: "0.9rem",
            lineHeight: 1.65,
            color: "var(--ink-60)",
            marginBottom: "0.875rem",
          }}>
            {step.body}
          </p>
          <span style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.5rem",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--acid)",
            opacity: 0.8,
          }}>
            {step.detail}
          </span>
        </div>

        {/* Bottom accent line that grows on hover — pure CSS */}
        <div className={`card-accent-line card-accent-line-${index}`} aria-hidden="true" />
      </div>
    </AnimatedReveal>
  );
}

export default function HowItWorks() {
  return (
    <section id="how-it-works" aria-labelledby="howitworks-heading" style={{ position: "relative", overflow: "hidden" }}>
      {/* Sky gradient background */}
      <div aria-hidden="true" style={{
        position: "absolute", inset: 0, zIndex: 0,
        background: "linear-gradient(180deg, #b8d9f0 0%, #d4eaf7 40%, #e8f4fb 70%, #f0f5f8 100%)",
      }} />
      {/* Subtle cloud shapes */}
      <div aria-hidden="true" className="cloud cloud-1" />
      <div aria-hidden="true" className="cloud cloud-2" />
      <div aria-hidden="true" className="cloud cloud-3" />

      <div style={{ position: "relative", zIndex: 1 }} className="container-wide section-pad">
        <AnimatedReveal>
          <span style={{
            fontFamily: "var(--font-mono)", fontSize: "0.5625rem", letterSpacing: "0.18em",
            textTransform: "uppercase", color: "#3A6A90",
            marginBottom: "1.25rem", display: "block",
          }}>
            how it works
          </span>
        </AnimatedReveal>
        <AnimatedReveal delay={1}>
          <h2 id="howitworks-heading" style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2rem, 4vw, 3.25rem)",
            fontWeight: 400, letterSpacing: "-0.025em",
            color: "#0A1A2A", maxWidth: "560px", lineHeight: 1.1,
            marginBottom: "3rem",
          }}>
            Launch it. Use it.<br />Earn from it.
          </h2>
        </AnimatedReveal>

        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1.25rem" }} className="md-three-col">
          {STEPS.map((step, i) => (
            <MagneticCard key={step.num} step={step} index={i} />
          ))}
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) { .md-three-col { grid-template-columns: repeat(3, 1fr) !important; } }

        /* Floating clouds */
        .cloud {
          position: absolute;
          border-radius: 50%;
          background: rgba(255,255,255,0.55);
          filter: blur(32px);
          pointer-events: none;
        }
        .cloud-1 { width: 400px; height: 160px; top: 40px;  left: -60px;  animation: cloud-drift 22s ease-in-out infinite alternate; }
        .cloud-2 { width: 320px; height: 120px; top: 80px;  right: 5%;    animation: cloud-drift 18s ease-in-out infinite alternate-reverse; }
        .cloud-3 { width: 260px; height: 100px; top: 160px; left: 38%;   animation: cloud-drift 26s ease-in-out infinite alternate; }
        @keyframes cloud-drift {
          0%   { transform: translateX(0); }
          100% { transform: translateX(30px); }
        }

        /* Bottom accent line per card */
        .card-accent-line {
          position: absolute;
          bottom: 0; left: 0;
          height: 2px;
          width: 0%;
          border-radius: 0 0 12px 12px;
          transition: width 0.5s cubic-bezier(0.16,1,0.3,1);
        }
        .card-accent-line-0 { background: linear-gradient(90deg, #1E6FFF, #5AA0FF); }
        .card-accent-line-1 { background: linear-gradient(90deg, #7B3FFF, #1E6FFF); }
        .card-accent-line-2 { background: linear-gradient(90deg, #1E6FFF, #22c55e); }

        div:hover > .card-accent-line,
        div:focus-within > .card-accent-line { width: 100%; }
      `}</style>
    </section>
  );
}
