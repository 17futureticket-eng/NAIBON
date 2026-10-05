"use client";

import AnimatedReveal from "@/components/primitives/AnimatedReveal";

const ROLES = [
  {
    title: "Builders",
    body: "Earn up front from the IPO, then keep earning every time their agent is called.",
    icon: "⚙",
  },
  {
    title: "Investors",
    body: "Earn from real demand — not narrative. Long the agent's actual usage.",
    icon: "↗",
  },
  {
    title: "Users",
    body: "Get agents that compete to be genuinely good. Pay only for what you call.",
    icon: "✦",
  },
];

export default function Incentive() {
  return (
    <section
      id="economics"
      aria-label="Value alignment"
      className="section-pad"
      style={{ background: "var(--onyx)", position: "relative", overflow: "hidden" }}
    >
      {/* Subtle background glow */}
      <div aria-hidden="true" style={{
        position: "absolute", top: "-160px", left: "50%",
        transform: "translateX(-50%)",
        width: "700px", height: "400px",
        background: "radial-gradient(ellipse, rgba(30,111,255,0.12) 0%, transparent 70%)",
        filter: "blur(60px)", pointerEvents: "none",
      }} />

      <div style={{ position: "relative", zIndex: 1 }} className="container-wide">
        {/* Header */}
        <AnimatedReveal>
          <span style={{
            fontFamily: "var(--font-mono)", fontSize: "0.5625rem",
            letterSpacing: "0.16em", textTransform: "uppercase",
            color: "var(--acid)", display: "block", marginBottom: "1rem",
          }}>
            everyone&apos;s aligned
          </span>
        </AnimatedReveal>
        <AnimatedReveal delay={1}>
          <h2 className="t-display-sm" style={{
            color: "rgba(255,255,255,0.94)", maxWidth: "540px",
            marginBottom: "clamp(2rem, 4vw, 3.5rem)",
          }}>
            One incentive, shared by everyone.
          </h2>
        </AnimatedReveal>

        {/* Three cards */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "0.875rem", marginBottom: "1.5rem" }} className="md-three-col-inc">
          {ROLES.map((role, i) => (
            <AnimatedReveal key={role.title} delay={(i + 1) as 1 | 2 | 3}>
              <div style={{
                background: "rgba(255,255,255,0.05)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(255,255,255,0.10)",
                borderRadius: "10px",
                padding: "1.5rem",
                display: "flex",
                flexDirection: "column",
                gap: "0.625rem",
                transition: "background 0.2s ease, border-color 0.2s ease",
              }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(30,111,255,0.08)";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(30,111,255,0.25)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.10)";
                }}
              >
                <div style={{
                  width: "36px", height: "36px", borderRadius: "8px",
                  background: "rgba(30,111,255,0.15)",
                  border: "1px solid rgba(30,111,255,0.25)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "1rem", color: "#7AB8FF", flexShrink: 0,
                }}>
                  {role.icon}
                </div>
                <h3 style={{
                  fontFamily: "var(--font-sans)", fontWeight: 600,
                  fontSize: "1rem", color: "#fff",
                  letterSpacing: "-0.01em",
                }}>
                  {role.title}
                </h3>
                <p style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "clamp(0.875rem, 1.1vw, 0.9375rem)",
                  lineHeight: 1.65,
                  color: "rgba(255,255,255,0.55)",
                }}>
                  {role.body}
                </p>
              </div>
            </AnimatedReveal>
          ))}
        </div>

        {/* Protocol note */}
        <AnimatedReveal delay={4}>
          <div style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "8px",
            padding: "1.125rem 1.375rem",
            maxWidth: "580px",
          }}>
            <p style={{
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(0.8125rem, 1vw, 0.875rem)",
              lineHeight: 1.7,
              color: "rgba(255,255,255,0.38)",
            }}>
              The protocol takes a small fee on calls and IPOs — LUMA only wins when the
              agents do. Every party is pulling toward the same thing: agents people actually use.
            </p>
          </div>
        </AnimatedReveal>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .md-three-col-inc { grid-template-columns: repeat(3, 1fr) !important; }
        }
      `}</style>
    </section>
  );
}
