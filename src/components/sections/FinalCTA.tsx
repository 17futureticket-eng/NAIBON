"use client";

import Link from "next/link";
import AnimatedReveal from "@/components/primitives/AnimatedReveal";

function FloralBg() {
  return (
    <svg
      viewBox="0 0 1200 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="absolute inset-0 w-full h-full"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="floralBg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8090C0" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#5060A0" stopOpacity="0.25" />
        </linearGradient>
      </defs>
      <rect width="1200" height="320" fill="url(#floralBg)" />
      {/* Abstract floral petals same palette as incentive section */}
      {[
        { x: 120, y: 160, r: 52, c: "#7090C8" },
        { x: 260, y: 100, r: 44, c: "#8098C0" },
        { x: 380, y: 200, r: 58, c: "#6080B8" },
        { x: 520, y: 80,  r: 48, c: "#7888C0" },
        { x: 660, y: 180, r: 54, c: "#6878B8" },
        { x: 800, y: 90,  r: 46, c: "#8090C8" },
        { x: 940, y: 170, r: 56, c: "#7080C0" },
        { x: 1080, y: 110, r: 50, c: "#6888B8" },
        { x: 60,  y: 260, r: 38, c: "#8898C8" },
        { x: 1140, y: 260, r: 40, c: "#7090C0" },
      ].map((p, i) => (
        <g key={i}>
          {Array.from({ length: 6 }).map((_, j) => {
            const a = (j * Math.PI * 2) / 6 + i * 0.3;
            return (
              <ellipse
                key={j}
                cx={p.x + Math.cos(a) * p.r * 0.62}
                cy={p.y + Math.sin(a) * p.r * 0.62}
                rx={p.r * 0.52} ry={p.r * 0.28}
                transform={`rotate(${j * 60 + i * 15},${p.x + Math.cos(a) * p.r * 0.62},${p.y + Math.sin(a) * p.r * 0.62})`}
                fill={p.c} opacity="0.45"
              />
            );
          })}
          <circle cx={p.x} cy={p.y} r={p.r * 0.22} fill="rgba(255,255,255,0.06)" />
        </g>
      ))}
    </svg>
  );
}

export default function FinalCTA() {
  return (
    <section
      id="cta"
      aria-labelledby="cta-heading"
      style={{ background: "var(--ivory)", position: "relative", overflow: "hidden" }}
    >
      {/* Floral top border strip */}
      <div style={{ position: "relative", height: "120px", background: "var(--ivory-dark)", overflow: "hidden" }}>
        <FloralBg />
      </div>

      {/* CTA body */}
      <div
        className="container-narrow section-pad"
        style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "2rem" }}
      >
        <AnimatedReveal>
          <h2
            id="cta-heading"
            className="t-display-sm"
            style={{ maxWidth: "540px" }}
          >
            Find an agent worth owning.
          </h2>
        </AnimatedReveal>

        <AnimatedReveal delay={1}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", justifyContent: "center" }}>
            <Link href="/markets" className="btn btn-primary">
              open the app →
            </Link>
            <Link href="/launch" className="btn btn-ghost">
              launch your own
            </Link>
          </div>
        </AnimatedReveal>
      </div>
    </section>
  );
}
