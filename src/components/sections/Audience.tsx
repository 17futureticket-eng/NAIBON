"use client";

import Image from "next/image";
import AnimatedReveal from "@/components/primitives/AnimatedReveal";
import Link from "next/link";

const CARDS = [
  {
    tag: "for people who need agents",
    headline: "Call agents that actually work.",
    body: "Fine-tuned, purpose-built agents a Solidity auditor, a price oracle, a ruggability scout. Pay per inference in USDC (or ETH, auto swapped). Get back a result cryptographically signed by the exact agent that produced it.",
    detail: "No subscription. No token to hold.",
    cta: "Browse agents →",
    href: "/markets",
    img: "/image3.png",
    imgAlt: "Agents available on LUMA marketplace call any agent per inference",
  },
  {
    tag: "for people who want to invest in them",
    headline: "Buy the revenue, not the hype.",
    body: "Don't gamble on a memecoin buy a share of an agent's real output. Pick up ERC-20 shares at the IPO and earn a slice of every call it serves, forever, pro rata to what you hold. The more it gets used, the more you earn.",
    detail: "That's the whole trade.",
    cta: "See a cap table →",
    href: "/markets",
    img: "/image1.png",
    imgAlt: "Agent share cap table earn pro rata revenue from every agent call",
  },
];

export default function Audience() {
  return (
    <section
      id="for-whom"
      className="section-pad"
      style={{ background: "var(--ivory)" }}
      aria-labelledby="audience-heading"
    >
      <div className="container-wide">
        {/* Header */}
        <div style={{ marginBottom: "clamp(2.5rem, 5vw, 4rem)" }}>
          <AnimatedReveal>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.5625rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--acid)", display: "block", marginBottom: "1rem" }}>
              Built for the dawn of agents
            </span>
          </AnimatedReveal>
          <AnimatedReveal delay={1}>
            <h2 id="audience-heading" className="t-display-sm" style={{ maxWidth: "520px" }}>
              A market with two sides.
            </h2>
          </AnimatedReveal>
        </div>

        {/* Two cards */}
        <div className="audience-grid" style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1.5rem" }}>
          {CARDS.map((card) => (
            <AnimatedReveal key={card.tag}>
              <div
                style={{
                  background: "var(--ivory)",
                  border: "1px solid var(--ink-10)",
                  borderRadius: "8px",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  boxShadow: "0 2px 16px rgba(0,0,0,0.05)",
                  transition: "box-shadow 0.25s ease, transform 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 32px rgba(30,111,255,0.12)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 16px rgba(0,0,0,0.05)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                }}
              >
                {/* Image real photo */}
                <div style={{ position: "relative", width: "100%", aspectRatio: "16/9", overflow: "hidden", flexShrink: 0 }}>
                  <Image
                    src={card.img}
                    alt={card.imgAlt}
                    fill
                    style={{ objectFit: "cover", objectPosition: "center" }}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  {/* Gradient over image bottom */}
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "40%", background: "linear-gradient(to top, rgba(10,14,26,0.35) 0%, transparent 100%)" }} aria-hidden="true" />
                </div>

                {/* Content */}
                <div style={{ padding: "1.625rem 1.75rem 1.875rem", display: "flex", flexDirection: "column", gap: "0.875rem", flex: 1 }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.5625rem", letterSpacing: "0.12em", textTransform: "lowercase", color: "var(--ink-60)" }}>
                    {card.tag}
                  </span>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.375rem, 2.5vw, 1.875rem)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--ink)", lineHeight: 1.2 }}>
                    {card.headline}
                  </h3>
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.9375rem", lineHeight: 1.65, color: "var(--ink-60)" }}>
                    {card.body}{" "}
                    <span style={{ color: "var(--ink)", fontWeight: 500 }}>{card.detail}</span>
                  </p>
                  <Link
                    href={card.href}
                    style={{ fontFamily: "var(--font-mono)", fontSize: "0.6875rem", letterSpacing: "0.08em", color: "var(--acid)", textDecoration: "none", marginTop: "0.25rem", display: "inline-flex", alignItems: "center", gap: "0.25rem", transition: "opacity 0.15s ease" }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.7")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
                  >
                    {card.cta}
                  </Link>
                </div>
              </div>
            </AnimatedReveal>
          ))}
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) { .audience-grid { grid-template-columns: 1fr 1fr !important; } }
      `}</style>
    </section>
  );
}
