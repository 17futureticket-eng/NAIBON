"use client";

import AnimatedReveal from "@/components/primitives/AnimatedReveal";
import Divider from "@/components/primitives/Divider";

const STEPS = [
  {
    num: "01",
    numLabel: "01",
    title: "Builders launch",
    body: "Mint an agent as an iNFT, set a per call price, and sell shares from your treasury at a fixed price IPO. Permissionless live in minutes, and you keep earning as it's used.",
    detail: "Permissionless · iNFT · fixed price IPO",
  },
  {
    num: "02",
    numLabel: "02",
    title: "Anyone calls it",
    body: "A user pays per inference and gets a TEE attested response. The fee lands in the agent's on chain vault every call accounted for, on chain.",
    detail: "TEE attested · USDC or ETH · on chain vault",
  },
  {
    num: "03",
    numLabel: "03",
    title: "Holders earn",
    body: "Each call is snapshotted and paid out to shareholders by weight. Revenue in, revenue distributed pro rata, automatic, verifiable.",
    detail: "pro rata · Automatic · No claiming needed",
  },
];

function CloudsBg() {
  return (
    <svg viewBox="0 0 640 400" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover">
      <defs>
        <linearGradient id="skyGrad3" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#70B8E0" />
          <stop offset="60%" stopColor="#9ACCE8" />
          <stop offset="100%" stopColor="#C0E0F0" />
        </linearGradient>
      </defs>
      <rect width="640" height="400" fill="url(#skyGrad3)" />
      {[
        { cx: 80, cy: 60, r: 50 }, { cx: 130, cy: 40, r: 60 }, { cx: 190, cy: 58, r: 44 },
        { cx: 260, cy: 42, r: 56 }, { cx: 320, cy: 62, r: 42 }, { cx: 380, cy: 44, r: 58 },
        { cx: 440, cy: 60, r: 46 }, { cx: 510, cy: 38, r: 62 }, { cx: 570, cy: 58, r: 44 },
        { cx: 50, cy: 140, r: 44 }, { cx: 100, cy: 122, r: 52 }, { cx: 160, cy: 138, r: 40 },
        { cx: 230, cy: 124, r: 50 }, { cx: 300, cy: 142, r: 38 }, { cx: 370, cy: 128, r: 48 },
        { cx: 440, cy: 140, r: 42 }, { cx: 510, cy: 122, r: 54 }, { cx: 590, cy: 138, r: 40 },
        { cx: 30, cy: 220, r: 40 }, { cx: 90, cy: 205, r: 48 }, { cx: 150, cy: 218, r: 36 },
        { cx: 220, cy: 208, r: 44 }, { cx: 290, cy: 222, r: 38 }, { cx: 360, cy: 208, r: 46 },
        { cx: 430, cy: 220, r: 40 }, { cx: 500, cy: 206, r: 50 }, { cx: 570, cy: 218, r: 38 },
      ].map((c, i) => (
        <circle key={i} cx={c.cx} cy={c.cy} r={c.r} fill="rgba(255,255,255,0.72)" />
      ))}
    </svg>
  );
}

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      aria-labelledby="howitworks-heading"
    >
      {/* Sky / clouds background section */}
      <div style={{ position: "relative", overflow: "hidden", minHeight: "360px" }}>
        <CloudsBg />
        <div style={{ position: "relative", zIndex: 1 }} className="container-wide section-pad-sm">
          <AnimatedReveal>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.5625rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#3A6A90", marginBottom: "1.25rem", display: "block" }}>
              how it works
            </span>
          </AnimatedReveal>
          <AnimatedReveal delay={1}>
            <h2 id="howitworks-heading" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3.25rem)", fontWeight: 400, letterSpacing: "-0.025em", color: "#0A1A2A", maxWidth: "560px", lineHeight: 1.1 }}>
              Launch it. Use it. Earn from it.
            </h2>
          </AnimatedReveal>

          {/* Step cards */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1rem", marginTop: "2.5rem" }} className="md-three-col">
            {STEPS.map((step, i) => (
              <AnimatedReveal key={step.num} delay={(i + 1) as 1 | 2 | 3}>
                <div style={{ background: "rgba(255,255,255,0.9)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.6)", borderRadius: "6px", padding: "1.5rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  <div style={{ width: "32px", height: "32px", background: "var(--acid)", borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-mono)", fontSize: "0.75rem", fontWeight: 600, color: "var(--ink)" }}>
                    {step.numLabel}
                  </div>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.25rem, 2vw, 1.5rem)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--ink)" }}>
                    {step.title}
                  </h3>
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.9rem", lineHeight: 1.6, color: "var(--ink-60)" }}>
                    {step.body}
                  </p>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.5625rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ink-30)" }}>
                    {step.detail}
                  </span>
                </div>
              </AnimatedReveal>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) { .md-three-col { grid-template-columns: repeat(3, 1fr) !important; } }
      `}</style>
    </section>
  );
}
