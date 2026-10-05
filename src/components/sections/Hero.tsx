"use client";

import Link from "next/link";

export default function Hero() {
  return (
    <section
      id="hero"
      aria-label="Hero"
      style={{
        height: "100vh",
        minHeight: "580px",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background — full bleed, image shows completely */}
      <div aria-hidden="true" style={{
        position: "absolute", inset: 0, zIndex: 0,
        backgroundImage: "url('/luma-x-banner.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center top",
      }} />

      {/* Very narrow left-edge fade — just enough to read text */}
      <div aria-hidden="true" style={{
        position: "absolute", inset: 0, zIndex: 1,
        background: "linear-gradient(100deg, rgba(4,6,18,0.80) 0%, rgba(4,6,18,0.50) 28%, rgba(4,6,18,0.05) 50%, transparent 65%)",
      }} />

      {/* Bottom strip — lifts CTAs off image */}
      <div aria-hidden="true" style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: "35%", zIndex: 1,
        background: "linear-gradient(to top, rgba(4,6,18,0.55) 0%, transparent 100%)",
        pointerEvents: "none",
      }} />

      {/* Ambient glow orb */}
      <div aria-hidden="true" className="hero-orb-1" />

      {/* ── Content — bottom-left, compact ── */}
      <div className="container-wide" style={{
        position: "relative", zIndex: 2,
        marginTop: "auto",
        paddingBottom: "clamp(2.5rem, 5vh, 4.5rem)",
        paddingTop: "var(--nav-h)",
      }}>
        <div style={{ maxWidth: "400px", display: "flex", flexDirection: "column", gap: "1.25rem" }}>

          {/* Headline — compact, two lines max */}
          <h1 className="animate-fade-up" style={{
            animationDelay: "0.05s",
            fontFamily: "var(--font-fraunces), Georgia, serif",
            fontWeight: 700,
            fontSize: "clamp(2rem, 3.8vw, 3.25rem)",
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            color: "#ffffff",
            margin: 0,
          }}>
            A stock exchange{" "}
            <em style={{ fontStyle: "italic", fontWeight: 400, color: "rgba(155,198,255,0.92)" }}>
              for AI agents.
            </em>
          </h1>

          {/* One-liner sub — short, doesn't pile up */}
          <p className="animate-fade-up" style={{
            animationDelay: "0.18s",
            fontFamily: "var(--font-sans)",
            fontSize: "clamp(0.875rem, 1.1vw, 0.9375rem)",
            lineHeight: 1.6,
            color: "rgba(195,218,255,0.65)",
            fontWeight: 400,
            maxWidth: "340px",
            margin: 0,
          }}>
            Real calls. Real revenue. Paid on-chain to the people who own it.
          </p>

          {/* CTAs */}
          <div className="animate-fade-up" style={{ animationDelay: "0.28s", display: "flex", gap: "0.625rem", flexWrap: "wrap" }}>
            <Link href="/markets" className="btn" style={{
              fontSize: "0.875rem", fontWeight: 700,
              padding: "0.75rem 1.625rem", borderRadius: "7px",
              background: "rgba(255,255,255,0.96)", color: "#0A0E1A",
              border: "none", boxShadow: "0 4px 20px rgba(0,0,0,0.25)",
              letterSpacing: "-0.01em",
            }}>
              Open the app →
            </Link>
            <Link href="#how-it-works" className="btn" style={{
              fontSize: "0.875rem", fontWeight: 500,
              padding: "0.75rem 1.375rem", borderRadius: "7px",
              background: "rgba(255,255,255,0.06)",
              color: "rgba(255,255,255,0.82)",
              border: "1.5px solid rgba(255,255,255,0.22)",
              backdropFilter: "blur(8px)",
              letterSpacing: "-0.01em",
            }}>
              How it works
            </Link>
          </div>

          {/* Trust tags */}
          <div className="animate-fade-up" style={{ animationDelay: "0.4s", display: "flex", flexWrap: "wrap", gap: "0.3rem" }}>
            {["TEE Attested", "Non-Custodial", "Permissionless", "On-chain"].map((t) => (
              <span key={t} style={{
                display: "inline-flex", alignItems: "center",
                padding: "0.2rem 0.5rem",
                background: "rgba(255,255,255,0.045)",
                border: "1px solid rgba(255,255,255,0.09)",
                borderRadius: "3px",
                fontFamily: "var(--font-mono)",
                fontSize: "0.4625rem",
                letterSpacing: "0.11em",
                textTransform: "uppercase",
                color: "rgba(165,200,255,0.45)",
              }}>{t}</span>
            ))}
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ position: "relative", zIndex: 2, borderTop: "1px solid rgba(255,255,255,0.06)", flexShrink: 0 }}>
        <div className="container-wide" style={{ paddingTop: "0.5rem", paddingBottom: "0.5rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.4625rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.16)" }}>Scroll to explore</span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.4625rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.16)" }}>v1.0.0</span>
        </div>
      </div>

      <style>{`
        .hero-orb-1 {
          position: absolute;
          width: 500px; height: 500px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(30,111,255,0.12) 0%, transparent 70%);
          filter: blur(100px);
          pointer-events: none;
          z-index: 1;
          bottom: -100px; left: -80px;
          animation: orb-drift 20s ease-in-out infinite alternate;
        }
        @keyframes orb-drift {
          0%   { transform: translate(0,0) scale(1); }
          100% { transform: translate(30px,-20px) scale(1.06); }
        }
      `}</style>
    </section>
  );
}
