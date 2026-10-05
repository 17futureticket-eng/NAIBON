"use client";

import Image from "next/image";
import AnimatedReveal from "@/components/primitives/AnimatedReveal";
import Link from "next/link";

const CARDS = [
  {
    tag: "For people who need agents",
    headline: "Call agents that actually work.",
    body: "Purpose-built agents — a Solidity auditor, a price oracle, a ruggability scout. Pay per inference in USDC. Get back a result cryptographically signed by the exact agent that produced it.",
    detail: "No subscription. No token to hold.",
    cta: "Browse agents →",
    href: "/markets",
    img: "/image3.png",
    imgAlt: "Agents available on LUMA marketplace",
  },
  {
    tag: "For people who want to invest",
    headline: "Buy the revenue, not the hype.",
    body: "Pick up ERC-20 shares at the IPO and earn a slice of every call it serves — forever, pro rata to what you hold. The more it gets used, the more you earn.",
    detail: "That's the whole trade.",
    cta: "See a cap table →",
    href: "/markets",
    img: "/image1.png",
    imgAlt: "Agent share cap table — earn pro rata revenue",
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
        <div style={{ marginBottom: "clamp(2rem, 4vw, 3.5rem)" }}>
          <AnimatedReveal>
            <span style={{
              fontFamily: "var(--font-mono)", fontSize: "0.5625rem",
              letterSpacing: "0.14em", textTransform: "uppercase",
              color: "var(--acid)", display: "block", marginBottom: "0.875rem",
            }}>
              Built for the dawn of agents
            </span>
          </AnimatedReveal>
          <AnimatedReveal delay={1}>
            <h2 id="audience-heading" className="t-display-sm" style={{ maxWidth: "480px" }}>
              A market with two sides.
            </h2>
          </AnimatedReveal>
        </div>

        {/* Cards */}
        <div className="audience-grid" style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1.25rem" }}>
          {CARDS.map((card) => (
            <AnimatedReveal key={card.tag}>
              <div style={{
                background: "var(--ivory)",
                border: "1px solid var(--ink-10)",
                borderRadius: "10px",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                boxShadow: "0 2px 16px rgba(0,0,0,0.05)",
                transition: "box-shadow 0.25s ease, transform 0.25s ease",
              }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 32px rgba(30,111,255,0.10)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 16px rgba(0,0,0,0.05)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                }}
              >
                {/* Image */}
                <div style={{ position: "relative", width: "100%", aspectRatio: "16/9", overflow: "hidden", flexShrink: 0 }}>
                  <Image
                    src={card.img}
                    alt={card.imgAlt}
                    fill
                    style={{ objectFit: "cover", objectPosition: "center" }}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>

                {/* Content — no overlay, pure white background for readability */}
                <div style={{ padding: "1.375rem 1.5rem 1.625rem", display: "flex", flexDirection: "column", gap: "0.75rem", flex: 1 }}>
                  <span style={{
                    fontFamily: "var(--font-mono)", fontSize: "0.5rem",
                    letterSpacing: "0.14em", textTransform: "uppercase",
                    color: "var(--acid)",
                  }}>
                    {card.tag}
                  </span>
                  <h3 style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)",
                    fontWeight: 400, letterSpacing: "-0.02em",
                    color: "var(--ink)", lineHeight: 1.2,
                  }}>
                    {card.headline}
                  </h3>
                  <p style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "clamp(0.875rem, 1.1vw, 0.9375rem)",
                    lineHeight: 1.65, color: "var(--ink-60)",
                  }}>
                    {card.body}{" "}
                    <span style={{ color: "var(--ink)", fontWeight: 500 }}>{card.detail}</span>
                  </p>
                  <Link
                    href={card.href}
                    style={{
                      fontFamily: "var(--font-mono)", fontSize: "0.625rem",
                      letterSpacing: "0.08em", color: "var(--acid)",
                      textDecoration: "none", marginTop: "0.25rem",
                      display: "inline-flex", alignItems: "center", gap: "0.25rem",
                      minHeight: "44px",
                    }}
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
        @media (min-width: 768px) {
          .audience-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </section>
  );
}
