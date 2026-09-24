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
      {/* Background video */}
      <video
        autoPlay muted loop playsInline aria-hidden="true"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", zIndex: 0 }}
      >
        <source src="/hero.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay */}
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, zIndex: 1, background: "linear-gradient(160deg, rgba(5,8,20,0.82) 0%, rgba(8,14,32,0.52) 55%, rgba(5,8,20,0.80) 100%)" }} />

      {/* Bottom vignette */}
      <div aria-hidden="true" style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "42%", zIndex: 2, background: "linear-gradient(to top, rgba(6,14,40,0.65) 0%, transparent 100%)", pointerEvents: "none" }} />

      {/* ── Main content ── */}
      <div
        className="container-wide"
        style={{ position: "relative", zIndex: 3, flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", paddingTop: "clamp(1rem, 3vh, 2rem)", paddingBottom: "clamp(1rem, 2vh, 1.5rem)" }}
      >
        <div style={{ maxWidth: "660px", display: "flex", flexDirection: "column", gap: "clamp(0.875rem, 2vh, 1.375rem)" }}>

          {/* Eyebrow redesigned: clean text label, no pill, no dot */}
          <div className="animate-fade-up" style={{ animationDelay: "0.06s" }}>
            <span style={{
              display: "inline-block",
              fontFamily: "var(--font-mono)",
              fontSize: "0.625rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "rgba(100,160,255,0.7)",
              borderBottom: "1px solid rgba(100,160,255,0.25)",
              paddingBottom: "0.25rem",
            }}>
              The Stock Exchange for AI Agents
            </span>
          </div>

          {/* Headline */}
          <h1
            className="animate-fade-up"
            style={{
              animationDelay: "0.14s",
              fontFamily: "var(--font-display)",
              fontWeight: 400,
              fontSize: "clamp(2.5rem, 6.5vw, 5.75rem)",
              lineHeight: 0.95,
              letterSpacing: "-0.03em",
              color: "rgba(255,255,255,0.97)",
              textShadow: "0 2px 32px rgba(0,0,0,0.4)",
            }}
          >
            Own the agent.
            <br />
            Not the{" "}
            <em style={{ fontStyle: "italic", color: "#7AB8FF" }}>token.</em>
          </h1>

          {/* Sub-copy */}
          <p
            className="animate-fade-up"
            style={{
              animationDelay: "0.24s",
              maxWidth: "460px",
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(0.875rem, 1.35vw, 1rem)",
              lineHeight: 1.72,
              color: "rgba(170,200,255,0.65)",
            }}
          >
            AI agents today get monetized like memecoins their price floats on hype,
            disconnected from actual usage. NAIBON ties an agent&apos;s value to the one
            thing that matters: how much it&apos;s really used. Real calls, real revenue,
            paid to the people who own it.
          </p>

          {/* CTAs */}
          <div className="animate-fade-up" style={{ animationDelay: "0.32s", display: "flex", flexWrap: "wrap", gap: "0.625rem" }}>
            <Link href="/markets" className="btn btn-primary" style={{ fontSize: "0.875rem", padding: "0.75rem 1.5rem", borderRadius: "8px" }}>
              Open the app →
            </Link>
            <Link href="#how-it-works" className="btn btn-ghost-onyx" style={{ fontSize: "0.875rem", padding: "0.75rem 1.375rem", borderRadius: "8px" }}>
              How it works
            </Link>
          </div>

          {/* Trust tags plain, no dots, no dashes */}
          <div className="animate-fade-up" style={{ animationDelay: "0.40s", display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {["TEE Attested", "Non Custodial", "Permissionless", "on chain Settlement"].map((t) => (
              <span
                key={t}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  padding: "0.25rem 0.75rem",
                  background: "rgba(255,255,255,0.055)",
                  border: "1px solid rgba(255,255,255,0.10)",
                  borderRadius: "4px",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.5rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "rgba(160,195,255,0.5)",
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar scroll hint only, CA is in navbar */}
      <div style={{ position: "relative", zIndex: 3, borderTop: "1px solid rgba(255,255,255,0.06)", flexShrink: 0 }}>
        <div className="container-wide" style={{ paddingTop: "0.625rem", paddingBottom: "0.625rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.5rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.2)" }}>
            Scroll to explore
          </span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.5rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.2)" }}>
            v1.0.0
          </span>
        </div>
      </div>
    </section>
  );
}
