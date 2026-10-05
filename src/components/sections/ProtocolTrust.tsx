"use client";

import Image from "next/image";
import AnimatedReveal from "@/components/primitives/AnimatedReveal";
import SectionLabel from "@/components/primitives/SectionLabel";
import Divider from "@/components/primitives/Divider";

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

          {/* Left: LUMA LOGO-03 image */}
          <AnimatedReveal direction="left">
            <div style={{ border: "1px solid var(--ink-10)", borderRadius: "12px", overflow: "hidden", boxShadow: "0 8px 40px rgba(10,18,50,0.10)" }}>
              <Image
                src="/luma-logo-03.jpg"
                alt="LUMA — verifiable by design, attested by the TEE"
                width={520}
                height={380}
                style={{ display: "block", width: "100%", height: "auto" }}
              />
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
