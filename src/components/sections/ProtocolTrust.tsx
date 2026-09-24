"use client";

import AnimatedReveal from "@/components/primitives/AnimatedReveal";
import SectionLabel from "@/components/primitives/SectionLabel";
import Divider from "@/components/primitives/Divider";

function StarfieldVisual() {
  const stars = Array.from({ length: 80 }, (_, i) => ({
    x: (i * 173 % 520),
    y: (i * 97 % 380),
    r: i % 5 === 0 ? 2 : i % 3 === 0 ? 1.5 : 0.75,
    opacity: 0.4 + (i % 5) * 0.1,
  }));
  return (
    <svg viewBox="0 0 520 380" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="w-full" style={{ maxWidth: "520px" }}>
      <defs>
        <radialGradient id="starGrad" cx="50%" cy="45%" r="50%">
          <stop offset="0%" stopColor="#1A2840" />
          <stop offset="100%" stopColor="#080C14" />
        </radialGradient>
      </defs>
      <rect width="520" height="380" fill="url(#starGrad)" />
      {/* Stars */}
      {stars.map((s, i) => (
        <circle key={i} cx={s.x} cy={s.y} r={s.r} fill="white" opacity={s.opacity} />
      ))}
      {/* Bright star / burst */}
      <circle cx="190" cy="140" r="3" fill="white" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => {
        const rad = deg * Math.PI / 180;
        const len = i % 2 === 0 ? 28 : 16;
        return (
          <line key={deg}
            x1={190 + Math.cos(rad) * 4}
            y1={140 + Math.sin(rad) * 4}
            x2={190 + Math.cos(rad) * len}
            y2={140 + Math.sin(rad) * len}
            stroke="white" strokeWidth={i % 2 === 0 ? 1.5 : 0.75} opacity={i % 2 === 0 ? 0.9 : 0.5}
          />
        );
      })}
      {/* Pixel cloud at bottom */}
      {Array.from({ length: 20 }).map((_, i) => (
        <rect key={i} x={i * 26} y={300 + (i % 3) * 10 - 5} width={22} height={22 + (i % 4) * 6}
          fill={`rgba(255,255,255,${0.05 + (i % 5) * 0.02})`} />
      ))}
      <text x="26" y="360" fontFamily="var(--font-mono)" fontSize="7" fill="rgba(255,255,255,0.3)" letterSpacing="1.5">VERIFIABLE BY DESIGN</text>
    </svg>
  );
}

const TRUST_POINTS = [
  {
    label: "Trusted Execution Environment",
    body: "Agents run inside a TEE. Each inference is sealed and cryptographically attested you get a signed receipt proving the genuine agent produced the result, untampered.",
  },
  {
    label: "on chain vault every call accounted for",
    body: "Every inference payment flows directly to the agent's on chain vault. No off-chain escrow, no intermediary. The vault is transparent; the distribution is automatic.",
  },
  {
    label: "iNFT model stays private, ownership stays on chain",
    body: "The agent is minted as an iNFT. The model weights never leave the TEE. Ownership is composable, transferable, and verifiable without exposing the underlying model.",
  },
  {
    label: "Permissionless from day one",
    body: "Anyone can launch, call, or invest in an agent. No KYC, no whitelist, no admin key. The protocol treats every participant identically enforced by code.",
  },
];

export default function ProtocolTrust() {
  return (
    <section
      id="trust"
      className="section-pad"
      style={{ background: "var(--ivory)" }}
      aria-labelledby="trust-heading"
    >
      <div className="container-wide">
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "clamp(3rem, 6vw, 5rem)", alignItems: "start" }} className="lg-two-col-t">

          {/* Left: visual */}
          <AnimatedReveal direction="left">
            <div style={{ border: "1px solid var(--ink-10)", borderRadius: "4px", overflow: "hidden" }}>
              <StarfieldVisual />
            </div>
            <div style={{ marginTop: "0.75rem", fontFamily: "var(--font-mono)", fontSize: "0.5625rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--ink-30)" }}>
              verifiable by model · attested by the tee
            </div>
          </AnimatedReveal>

          {/* Right: trust points */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            <AnimatedReveal>
              <SectionLabel>Verifiable by Design</SectionLabel>
            </AnimatedReveal>
            <AnimatedReveal delay={1}>
              <h2 id="trust-heading" className="t-display-xs" style={{ marginTop: "1rem", marginBottom: "2rem" }}>
                Every answer, provably from the real agent.
              </h2>
            </AnimatedReveal>
            {TRUST_POINTS.map((p, i) => (
              <div key={p.label}>
                <Divider />
                <AnimatedReveal delay={(i % 4 + 1) as 1 | 2 | 3 | 4 | 5}>
                  <div style={{ paddingTop: "1.5rem", paddingBottom: "1.5rem", display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
                      <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "var(--acid)", flexShrink: 0 }} aria-hidden="true" />
                      <h3 style={{ fontFamily: "var(--font-sans)", fontWeight: 500, fontSize: "0.9375rem", letterSpacing: "-0.01em", color: "var(--ink)" }}>
                        {p.label}
                      </h3>
                    </div>
                    <p className="t-body" style={{ paddingLeft: "0.875rem", fontSize: "0.9rem" }}>
                      {p.body}
                    </p>
                  </div>
                </AnimatedReveal>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 1024px) { .lg-two-col-t { grid-template-columns: 1fr 1fr !important; } }
      `}</style>
    </section>
  );
}
