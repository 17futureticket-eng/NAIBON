"use client";

import Link from "next/link";

export default function Hero() {
  return (
    <section
      id="hero"
      aria-label="Hero"
      style={{
        height: "100vh",
        minHeight: "540px",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
        paddingTop: "var(--header-h)",
      }}
    >
      {/* Background image */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 0,
          backgroundImage: "url('/luma-x-banner.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Dark overlay — heavier so text is always legible */}
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, zIndex: 1, background: "linear-gradient(160deg, rgba(5,8,20,0.88) 0%, rgba(8,14,32,0.62) 50%, rgba(5,8,20,0.85) 100%)" }} />

      {/* Bottom vignette */}
      <div aria-hidden="true" style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "42%", zIndex: 2, background: "linear-gradient(to top, rgba(6,14,40,0.70) 0%, transparent 100%)", pointerEvents: "none" }} />

      {/* Ambient glow orbs */}
      <div aria-hidden="true" className="hero-orb hero-orb-1" />
      <div aria-hidden="true" className="hero-orb hero-orb-2" />

      {/* ── Main content ── */}
      <div
        className="container-wide"
        style={{ position: "relative", zIndex: 3, flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", paddingTop: "clamp(1rem, 3vh, 2rem)", paddingBottom: "clamp(1rem, 2vh, 1.5rem)" }}
      >
        <div style={{ maxWidth: "620px", display: "flex", flexDirection: "column", gap: "clamp(1.25rem, 2.5vh, 2rem)" }}>

          {/* Sub-copy — large, clear, white */}
          <p
            className="animate-fade-up"
            style={{
              animationDelay: "0.1s",
              maxWidth: "520px",
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(1rem, 1.5vw, 1.2rem)",
              lineHeight: 1.75,
              color: "rgba(220,235,255,0.92)",
              fontWeight: 400,
            }}
          >
            AI agents today get monetized like memecoins — price floats on hype,
            disconnected from actual usage. LUMA ties an agent&apos;s value to the one
            thing that matters: how much it&apos;s really used. Real calls. Real revenue.
            Paid to the people who own it.
          </p>

          {/* CTAs — bold, prominent */}
          <div className="animate-fade-up" style={{ animationDelay: "0.22s", display: "flex", flexWrap: "wrap", gap: "0.875rem" }}>
            <Link
              href="/markets"
              className="btn"
              style={{
                fontSize: "1rem",
                fontWeight: 700,
                padding: "0.875rem 2rem",
                borderRadius: "8px",
                background: "rgba(255,255,255,0.95)",
                color: "var(--ink)",
                border: "none",
                boxShadow: "0 4px 24px rgba(0,0,0,0.25)",
                letterSpacing: "-0.01em",
              }}
            >
              Open the app →
            </Link>
            <Link
              href="#how-it-works"
              className="btn"
              style={{
                fontSize: "1rem",
                fontWeight: 500,
                padding: "0.875rem 1.75rem",
                borderRadius: "8px",
                background: "rgba(255,255,255,0.10)",
                color: "rgba(255,255,255,0.92)",
                border: "1.5px solid rgba(255,255,255,0.35)",
                backdropFilter: "blur(8px)",
                letterSpacing: "-0.01em",
              }}
            >
              How it works
            </Link>
          </div>

          {/* Trust tags */}
          <div className="animate-fade-up" style={{ animationDelay: "0.34s", display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {["TEE Attested", "Non Custodial", "Permissionless", "On-chain Settlement"].map((t) => (
              <span
                key={t}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  padding: "0.3rem 0.875rem",
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.18)",
                  borderRadius: "4px",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.5625rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "rgba(200,220,255,0.75)",
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ position: "relative", zIndex: 3, borderTop: "1px solid rgba(255,255,255,0.08)", flexShrink: 0 }}>
        <div className="container-wide" style={{ paddingTop: "0.625rem", paddingBottom: "0.625rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.5rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)" }}>
            Scroll to explore
          </span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.5rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)" }}>
            v1.0.0
          </span>
        </div>
      </div>

      <style>{`
        .hero-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(90px);
          pointer-events: none;
          z-index: 1;
          animation: orb-drift 12s ease-in-out infinite alternate;
        }
        .hero-orb-1 {
          width: 520px; height: 520px;
          background: radial-gradient(circle, rgba(30,111,255,0.22) 0%, transparent 70%);
          top: -100px; left: -80px;
          animation-delay: 0s;
        }
        .hero-orb-2 {
          width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(100,60,255,0.16) 0%, transparent 70%);
          bottom: 60px; right: 5%;
          animation-delay: -5s;
        }
        @keyframes orb-drift {
          0%   { transform: translate(0, 0) scale(1); }
          100% { transform: translate(40px, 30px) scale(1.08); }
        }
      `}</style>
    </section>
  );
}
