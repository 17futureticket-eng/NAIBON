"use client";

import Link from "next/link";

export default function Hero() {
  return (
    <section
      id="hero"
      aria-label="Hero"
      style={{
        height: "100vh",
        minHeight: "600px",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background image — full bleed, no padding eating into it */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute", inset: 0, zIndex: 0,
          backgroundImage: "url('/luma-x-banner.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center top",
        }}
      />

      {/* Subtle dark gradient only at the very bottom-left — keeps most of image visible */}
      <div aria-hidden="true" style={{
        position: "absolute", inset: 0, zIndex: 1,
        background: "linear-gradient(to right, rgba(4,6,16,0.78) 0%, rgba(4,6,16,0.45) 45%, rgba(4,6,16,0.10) 100%)",
      }} />
      <div aria-hidden="true" style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: "55%", zIndex: 1,
        background: "linear-gradient(to top, rgba(4,6,16,0.65) 0%, transparent 100%)",
        pointerEvents: "none",
      }} />

      {/* Ambient glow orbs */}
      <div aria-hidden="true" className="hero-orb hero-orb-1" />

      {/* ── Content pinned to bottom-left ── */}
      <div
        className="container-wide"
        style={{
          position: "relative", zIndex: 2,
          marginTop: "auto",
          paddingBottom: "clamp(3rem, 6vh, 5rem)",
          paddingTop: "var(--nav-h)",
        }}
      >
        <div style={{ maxWidth: "480px", display: "flex", flexDirection: "column", gap: "1.5rem" }}>

          {/* One tight line of copy */}
          <p
            className="animate-fade-up"
            style={{
              animationDelay: "0.1s",
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(0.9375rem, 1.2vw, 1.05rem)",
              lineHeight: 1.65,
              color: "rgba(210,228,255,0.85)",
              fontWeight: 400,
              maxWidth: "400px",
            }}
          >
            A stock exchange for AI agents. Real calls, real revenue — paid
            on-chain to the people who own it.
          </p>

          {/* CTAs */}
          <div className="animate-fade-up" style={{ animationDelay: "0.25s", display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            <Link
              href="/markets"
              className="btn"
              style={{
                fontSize: "0.9375rem",
                fontWeight: 700,
                padding: "0.8125rem 1.875rem",
                borderRadius: "8px",
                background: "rgba(255,255,255,0.96)",
                color: "#0A0E1A",
                border: "none",
                boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
                letterSpacing: "-0.01em",
              }}
            >
              Open the app →
            </Link>
            <Link
              href="#how-it-works"
              className="btn"
              style={{
                fontSize: "0.9375rem",
                fontWeight: 500,
                padding: "0.8125rem 1.625rem",
                borderRadius: "8px",
                background: "rgba(255,255,255,0.08)",
                color: "rgba(255,255,255,0.88)",
                border: "1.5px solid rgba(255,255,255,0.30)",
                backdropFilter: "blur(10px)",
                letterSpacing: "-0.01em",
              }}
            >
              How it works
            </Link>
          </div>

          {/* Trust tags — small, unobtrusive */}
          <div className="animate-fade-up" style={{ animationDelay: "0.4s", display: "flex", flexWrap: "wrap", gap: "0.375rem" }}>
            {["TEE Attested", "Non Custodial", "Permissionless", "On-chain"].map((t) => (
              <span
                key={t}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  padding: "0.25rem 0.625rem",
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: "3px",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.5rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "rgba(180,210,255,0.55)",
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ position: "relative", zIndex: 2, borderTop: "1px solid rgba(255,255,255,0.07)", flexShrink: 0 }}>
        <div className="container-wide" style={{ paddingTop: "0.5rem", paddingBottom: "0.5rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.4875rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.2)" }}>
            Scroll to explore
          </span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.4875rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.2)" }}>
            v1.0.0
          </span>
        </div>
      </div>

      <style>{`
        .hero-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(110px);
          pointer-events: none;
          z-index: 1;
          animation: orb-drift 18s ease-in-out infinite alternate;
        }
        .hero-orb-1 {
          width: 600px; height: 600px;
          background: radial-gradient(circle, rgba(30,111,255,0.15) 0%, transparent 70%);
          bottom: -120px; left: -100px;
          animation-delay: 0s;
        }
        @keyframes orb-drift {
          0%   { transform: translate(0, 0) scale(1); }
          100% { transform: translate(30px, -20px) scale(1.06); }
        }
      `}</style>
    </section>
  );
}
