"use client";

import AnimatedReveal from "@/components/primitives/AnimatedReveal";

function FlowersBg() {
  return (
    <svg viewBox="0 0 1100 400" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover">
      <defs>
        <linearGradient id="darkFloral" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0A1828" />
          <stop offset="100%" stopColor="#141C2C" />
        </linearGradient>
      </defs>
      <rect width="1100" height="400" fill="url(#darkFloral)" />
      {/* Stylized petals */}
      {[
        { x: 80, y: 200, color: "#4060A0" }, { x: 180, y: 150, color: "#3050A8" },
        { x: 280, y: 220, color: "#5070B0" }, { x: 820, y: 180, color: "#4060A8" },
        { x: 920, y: 140, color: "#3858A0" }, { x: 1020, y: 210, color: "#5068B8" },
        { x: 550, y: 100, color: "#4868A8" }, { x: 150, y: 300, color: "#3858B0" },
        { x: 960, y: 300, color: "#4060B0" },
      ].map((p, i) => (
        <g key={i}>
          {Array.from({ length: 6 }).map((_, j) => {
            const a = (j * Math.PI * 2) / 6;
            const r = 48 + (i % 3) * 12;
            return (
              <ellipse key={j}
                cx={p.x + Math.cos(a) * r * 0.65}
                cy={p.y + Math.sin(a) * r * 0.65}
                rx={r * 0.5} ry={r * 0.3}
                transform={`rotate(${j * 60 + i * 15}, ${p.x + Math.cos(a) * r * 0.65}, ${p.y + Math.sin(a) * r * 0.65})`}
                fill={p.color} opacity="0.5"
              />
            );
          })}
          <circle cx={p.x} cy={p.y} r="10" fill="rgba(255,255,255,0.08)" />
        </g>
      ))}
    </svg>
  );
}

const ROLES = [
  {
    title: "Builders",
    body: "Earn up front from the IPO, then keep earning every time their agent is called.",
  },
  {
    title: "Investors",
    body: "Earn from real demand instead of narrative long the agent's actual usage.",
  },
  {
    title: "Users",
    body: "Get agents that compete to be genuinely good, paid only for what they call.",
  },
];

export default function Incentive() {
  return (
    <section
      id="economics"
      aria-label="Value alignment"
      style={{ position: "relative", overflow: "hidden" }}
    >
      <FlowersBg />
      <div style={{ position: "relative", zIndex: 1 }} className="container-wide section-pad">
        {/* Header */}
        <AnimatedReveal>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.5625rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--acid)", display: "block", marginBottom: "1.25rem" }}>
            everyone&apos;s aligned
          </span>
        </AnimatedReveal>
        <AnimatedReveal delay={1}>
          <h2
            className="t-display-sm"
            style={{ color: "rgba(255,255,255,0.92)", maxWidth: "580px", marginBottom: "clamp(2.5rem, 5vw, 4rem)" }}
          >
            One incentive, shared by everyone.
          </h2>
        </AnimatedReveal>

        {/* Three cards */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1rem", marginBottom: "1.5rem" }} className="md-three-col-inc">
          {ROLES.map((role, i) => (
            <AnimatedReveal key={role.title} delay={(i + 1) as 1 | 2 | 3}>
              <div style={{ background: "rgba(255,255,255,0.08)", backdropFilter: "blur(6px)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "6px", padding: "1.5rem" }}>
                <h3 style={{ fontFamily: "var(--font-sans)", fontWeight: 500, fontSize: "1rem", color: "var(--acid)", marginBottom: "0.75rem" }}>
                  {role.title}
                </h3>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.9375rem", lineHeight: 1.65, color: "rgba(255,255,255,0.65)" }}>
                  {role.body}
                </p>
              </div>
            </AnimatedReveal>
          ))}
        </div>

        {/* Protocol note */}
        <AnimatedReveal delay={4}>
          <div style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "4px", padding: "1.25rem 1.5rem", maxWidth: "600px" }}>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.9rem", lineHeight: 1.65, color: "rgba(255,255,255,0.5)" }}>
              The protocol takes a small fee on calls and IPOs so LUMA only wins when the
              agents do. Every party is pulling toward the same thing: agents people actually use.
            </p>
          </div>
        </AnimatedReveal>
      </div>

      <style>{`
        @media (min-width: 768px) { .md-three-col-inc { grid-template-columns: repeat(3, 1fr) !important; } }
      `}</style>
    </section>
  );
}
