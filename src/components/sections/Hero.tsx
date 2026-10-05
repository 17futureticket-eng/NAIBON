"use client";

import Link from "next/link";

export default function Hero() {
  return (
    <section
      id="hero"
      aria-label="Hero"
      style={{
        height: "100svh",           /* svh = small viewport height, accounts for mobile browser chrome */
        minHeight: "520px",
        maxHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background — uses object-position via CSS so mobile sees the right crop */}
      <div aria-hidden="true" className="hero-bg" />

      {/* Left-edge gradient — text side readable, right side stays clear */}
      <div aria-hidden="true" style={{
        position: "absolute", inset: 0, zIndex: 1,
        background: "linear-gradient(100deg, rgba(4,6,18,0.82) 0%, rgba(4,6,18,0.52) 30%, rgba(4,6,18,0.06) 55%, transparent 70%)",
      }} />

      {/* Bottom vignette */}
      <div aria-hidden="true" style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: "40%", zIndex: 1,
        background: "linear-gradient(to top, rgba(4,6,18,0.60) 0%, transparent 100%)",
        pointerEvents: "none",
      }} />

      {/* Glow orb — scaled down on mobile via CSS */}
      <div aria-hidden="true" className="hero-orb-1" />

      {/* ── Content pinned bottom-left ── */}
      <div className="container-wide hero-content" style={{
        position: "relative", zIndex: 2,
        marginTop: "auto",
      }}>
        <div className="hero-inner">

          {/* Headline */}
          <h1 className="animate-fade-up hero-headline" style={{ animationDelay: "0.05s", margin: 0 }}>
            A stock exchange{" "}
            <em className="hero-em">for AI agents.</em>
          </h1>

          {/* Sub-copy */}
          <p className="animate-fade-up hero-sub" style={{ animationDelay: "0.18s", margin: 0 }}>
            Real calls. Real revenue. Paid on-chain to the people who own it.
          </p>

          {/* CTAs */}
          <div className="animate-fade-up hero-ctas" style={{ animationDelay: "0.28s" }}>
            <Link href="/markets" className="btn hero-cta-primary">
              Open the app →
            </Link>
            <Link href="#how-it-works" className="btn hero-cta-ghost">
              How it works
            </Link>
          </div>

          {/* Trust tags */}
          <div className="animate-fade-up hero-tags" style={{ animationDelay: "0.4s" }}>
            {["TEE Attested", "Non-Custodial", "Permissionless", "On-chain"].map((t) => (
              <span key={t} className="hero-tag">{t}</span>
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
        /* ── Background — desktop: landscape crop, mobile: portrait-friendly crop ── */
        .hero-bg {
          position: absolute; inset: 0; z-index: 0;
          background-image: url('/luma-x-banner.jpg');
          background-size: cover;
          background-position: 60% center;   /* desktop: show right-centre of image */
          background-repeat: no-repeat;
        }
        @media (max-width: 640px) {
          .hero-bg {
            background-position: 55% 20%;    /* mobile: pull up so subject visible */
            background-size: 200%;            /* zoom out to show more of the image */
          }
        }
        @media (max-width: 480px) {
          .hero-bg {
            background-size: 220%;
            background-position: 50% 15%;
          }
        }

        /* ── Content layout ── */
        .hero-content {
          padding-bottom: clamp(2rem, 5vh, 4.5rem);
          padding-top: var(--nav-h);
        }
        .hero-inner {
          max-width: 420px;
          display: flex; flex-direction: column;
          gap: 1.125rem;
        }
        @media (max-width: 640px) {
          .hero-inner { max-width: 100%; gap: 1rem; }
        }

        /* ── Headline ── */
        .hero-headline {
          font-family: var(--font-fraunces), Georgia, serif;
          font-weight: 700;
          font-size: clamp(1.75rem, 6vw, 3.25rem);
          line-height: 1.06;
          letter-spacing: -0.03em;
          color: #ffffff;
        }
        .hero-em {
          font-style: italic;
          font-weight: 400;
          color: rgba(155,198,255,0.92);
        }

        /* ── Sub copy ── */
        .hero-sub {
          font-family: var(--font-sans);
          font-size: clamp(0.875rem, 2.5vw, 0.9375rem);
          line-height: 1.6;
          color: rgba(195,218,255,0.68);
          font-weight: 400;
          max-width: 320px;
        }
        @media (max-width: 640px) {
          .hero-sub { max-width: 100%; }
        }

        /* ── CTAs ── */
        .hero-ctas {
          display: flex; gap: 0.625rem; flex-wrap: wrap;
        }
        .hero-cta-primary {
          font-size: 0.9375rem !important; font-weight: 700 !important;
          padding: 0.8125rem 1.625rem !important; border-radius: 7px !important;
          background: rgba(255,255,255,0.96) !important; color: #0A0E1A !important;
          border: none !important; box-shadow: 0 4px 20px rgba(0,0,0,0.25) !important;
          letter-spacing: -0.01em !important; min-height: 44px;
        }
        .hero-cta-ghost {
          font-size: 0.9375rem !important; font-weight: 500 !important;
          padding: 0.8125rem 1.375rem !important; border-radius: 7px !important;
          background: rgba(255,255,255,0.07) !important;
          color: rgba(255,255,255,0.85) !important;
          border: 1.5px solid rgba(255,255,255,0.22) !important;
          backdrop-filter: blur(8px); min-height: 44px;
        }
        @media (max-width: 400px) {
          .hero-ctas { flex-direction: column; }
          .hero-cta-primary,
          .hero-cta-ghost { width: 100%; justify-content: center; text-align: center; }
        }

        /* ── Trust tags ── */
        .hero-tags {
          display: flex; flex-wrap: wrap; gap: 0.3rem;
        }
        .hero-tag {
          display: inline-flex; align-items: center;
          padding: 0.2rem 0.5rem;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.10);
          border-radius: 3px;
          font-family: var(--font-mono);
          font-size: 0.4625rem;
          letter-spacing: 0.11em;
          text-transform: uppercase;
          color: rgba(165,200,255,0.5);
        }

        /* ── Glow orb ── */
        .hero-orb-1 {
          position: absolute;
          width: 500px; height: 500px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(30,111,255,0.12) 0%, transparent 70%);
          filter: blur(100px);
          pointer-events: none; z-index: 1;
          bottom: -100px; left: -80px;
          animation: orb-drift 20s ease-in-out infinite alternate;
        }
        @media (max-width: 640px) {
          .hero-orb-1 { width: 280px; height: 280px; bottom: -60px; left: -40px; }
        }
        @keyframes orb-drift {
          0%   { transform: translate(0,0) scale(1); }
          100% { transform: translate(24px,-16px) scale(1.06); }
        }
      `}</style>
    </section>
  );
}
