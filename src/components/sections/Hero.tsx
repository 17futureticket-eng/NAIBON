"use client";

import Link from "next/link";

export default function Hero() {
  return (
    <section
      id="hero"
      aria-label="Hero"
      style={{
        height: "100vh",
        minHeight: "620px",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background image — full bleed */}
      <div aria-hidden="true" style={{
        position: "absolute", inset: 0, zIndex: 0,
        backgroundImage: "url('/luma-x-banner.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center top",
      }} />

      {/* Left-to-right dark fade — text side readable, image side clear */}
      <div aria-hidden="true" style={{
        position: "absolute", inset: 0, zIndex: 1,
        background: "linear-gradient(105deg, rgba(4,6,18,0.92) 0%, rgba(4,6,18,0.65) 38%, rgba(4,6,18,0.08) 65%, transparent 100%)",
      }} />

      {/* Bottom vignette */}
      <div aria-hidden="true" style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: "50%", zIndex: 1,
        background: "linear-gradient(to top, rgba(4,6,18,0.7) 0%, transparent 100%)",
        pointerEvents: "none",
      }} />

      {/* Ambient glow */}
      <div aria-hidden="true" className="hero-orb hero-orb-1" />

      {/* ── Content — bottom-left ── */}
      <div className="container-wide" style={{
        position: "relative", zIndex: 2,
        marginTop: "auto",
        paddingBottom: "clamp(3rem, 6vh, 5.5rem)",
        paddingTop: "var(--nav-h)",
      }}>
        <div style={{ maxWidth: "560px", display: "flex", flexDirection: "column", gap: "1.75rem" }}>

          {/* ── Headline — Fraunces, editorial and bold ── */}
          <div className="animate-fade-up" style={{ animationDelay: "0.05s" }}>
            <h1 style={{
              fontFamily: "var(--font-fraunces), Georgia, serif",
              fontWeight: 700,
              fontSize: "clamp(2.75rem, 5.5vw, 5rem)",
              lineHeight: 1.02,
              letterSpacing: "-0.03em",
              color: "#ffffff",
              margin: 0,
            }}>
              A stock exchange
              <br />
              <em style={{
                fontStyle: "italic",
                fontWeight: 400,
                color: "rgba(160,200,255,0.9)",
              }}>
                for AI agents.
              </em>
            </h1>
          </div>

          {/* ── Sub-copy — Inter, clean and readable ── */}
          <p className="animate-fade-up" style={{
            animationDelay: "0.18s",
            fontFamily: "var(--font-sans)",
            fontSize: "clamp(1rem, 1.3vw, 1.125rem)",
            lineHeight: 1.72,
            color: "rgba(195,218,255,0.72)",
            fontWeight: 400,
            maxWidth: "420px",
            margin: 0,
          }}>
            Every agent on LUMA issues shares backed by real inference revenue.
            Call one, own a slice, and earn from every request — automatically,
            on-chain, no intermediary.
          </p>

          {/* ── CTAs ── */}
          <div className="animate-fade-up" style={{ animationDelay: "0.3s", display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            <Link href="/markets" className="btn" style={{
              fontSize: "0.9375rem", fontWeight: 700,
              padding: "0.875rem 2rem", borderRadius: "8px",
              background: "rgba(255,255,255,0.97)", color: "#0A0E1A",
              border: "none", boxShadow: "0 4px 24px rgba(0,0,0,0.28)",
              letterSpacing: "-0.01em",
            }}>
              Open the app →
            </Link>
            <Link href="#how-it-works" className="btn" style={{
              fontSize: "0.9375rem", fontWeight: 500,
              padding: "0.875rem 1.625rem", borderRadius: "8px",
              background: "rgba(255,255,255,0.07)",
              color: "rgba(255,255,255,0.85)",
              border: "1.5px solid rgba(255,255,255,0.25)",
              backdropFilter: "blur(10px)",
              letterSpacing: "-0.01em",
            }}>
              How it works
            </Link>
          </div>

          {/* ── Trust tags ── */}
          <div className="animate-fade-up" style={{ animationDelay: "0.44s", display: "flex", flexWrap: "wrap", gap: "0.375rem" }}>
            {["TEE Attested", "Non-Custodial", "Permissionless", "On-chain"].map((t) => (
              <span key={t} style={{
                display: "inline-flex", alignItems: "center",
                padding: "0.25rem 0.625rem",
                background: "rgba(255,255,255,0.055)",
                border: "1px solid rgba(255,255,255,0.10)",
                borderRadius: "3px",
                fontFamily: "var(--font-mono)",
                fontSize: "0.4875rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "rgba(170,205,255,0.5)",
              }}>
                {t}
              </span>
            ))}
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ position: "relative", zIndex: 2, borderTop: "1px solid rgba(255,255,255,0.07)", flexShrink: 0 }}>
        <div className="container-wide" style={{ paddingTop: "0.5rem", paddingBottom: "0.5rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.4875rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.18)" }}>
            Scroll to explore
          </span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.4875rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.18)" }}>
            v1.0.0
          </span>
        </div>
      </div>

      <style>{`
        .hero-orb {
          position: absolute; border-radius: 50%;
          filter: blur(120px); pointer-events: none; z-index: 1;
          animation: orb-drift 20s ease-in-out infinite alternate;
        }
        .hero-orb-1 {
          width: 650px; height: 650px;
          background: radial-gradient(circle, rgba(30,111,255,0.13) 0%, transparent 70%);
          bottom: -140px; left: -120px;
        }
        @keyframes orb-drift {
          0%   { transform: translate(0, 0) scale(1); }
          100% { transform: translate(35px, -25px) scale(1.07); }
        }
      `}</style>
    </section>
  );
}
