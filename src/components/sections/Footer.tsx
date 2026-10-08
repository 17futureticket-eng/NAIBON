"use client";

import Link from "next/link";
import Image from "next/image";

const FOOTER_LINKS = {
  Product: [
    { label: "Markets",          href: "/markets" },
    { label: "Launch Agent",     href: "/launch" },
    { label: "Submit Inference", href: "/markets" },
  ],
  Legal: [
    { label: "Terms",        href: "/terms" },
    { label: "Privacy",      href: "/privacy" },
    { label: "Disclaimer",   href: "/disclaimer" },
  ],
};

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{ background: "var(--ivory-dark)", borderTop: "1px solid var(--ink-10)" }} aria-label="Site footer">
      <div className="container-wide section-pad-sm">

        {/* Top grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "2rem 2rem" }} className="footer-grid">

          {/* Brand */}
          <div className="footer-brand" style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", textDecoration: "none" }} aria-label="LUMA home">
              <Image
                src="/luma-logo-01.jpg"
                alt="LUMA logo"
                width={32}
                height={32}
                style={{ display: "block", flexShrink: 0, borderRadius: "6px" }}
              />
              <span style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "0.9375rem", letterSpacing: "-0.03em", color: "var(--ink)" }}>
                LUMA
              </span>
            </Link>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.875rem", color: "var(--ink-60)", lineHeight: 1.55, maxWidth: "200px" }}>
              A stock exchange for AI agents.
            </p>
            {/* X / Twitter */}
            <Link
              href="https://x.com/luma_protocol"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LUMA on X"
              style={{
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                width: "36px", height: "36px", borderRadius: "8px",
                background: "#000", color: "#fff",
                textDecoration: "none", transition: "opacity 0.15s ease",
                width: "fit-content", padding: "0 0.625rem",
              }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.opacity = "0.8"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.opacity = "1"}
            >
              <svg width="16" height="16" viewBox="0 0 1200 1227" fill="currentColor" aria-hidden="true">
                <path d="M714.163 519.284 1160.89 0h-105.86L667.137 450.887 357.328 0H0l468.492 681.821L0 1226.37h105.866l409.625-476.152 327.181 476.152H1200L714.137 519.284h.026ZM569.165 687.828l-47.468-67.894-377.686-540.24h162.604l304.797 435.991 47.468 67.894 396.2 566.721H892.476L569.165 687.854v-.026Z"/>
              </svg>
            </Link>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([group, links]) => (
            <div key={group} style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <h3 style={{ fontFamily: "var(--font-mono)", fontSize: "0.5rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--ink-30)" }}>
                {group}
              </h3>
              <ul style={{ display: "flex", flexDirection: "column", gap: "0.5rem", listStyle: "none" }}>
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      target={"external" in link && link.external ? "_blank" : undefined}
                      rel={"external" in link && link.external ? "noopener noreferrer" : undefined}
                      style={{ fontFamily: "var(--font-sans)", fontSize: "0.875rem", color: "var(--ink-60)", textDecoration: "none", transition: "color 0.15s ease" }}
                      onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "var(--ink)")}
                      onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "var(--ink-60)")}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{ marginTop: "2.5rem", paddingTop: "1.25rem", borderTop: "1px solid var(--ink-10)", display: "flex", flexDirection: "column", gap: "0.375rem" }} className="footer-bottom">
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.5rem", letterSpacing: "0.08em", color: "var(--ink-30)", lineHeight: 1.7 }}>
            © {year} LUMA Protocol. Experimental software — use at your own risk. Nothing here constitutes financial advice.
          </p>
        </div>
      </div>

      <style>{`
        @media (min-width: 480px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
          .footer-brand { grid-column: 1 / -1 !important; }
        }
        @media (min-width: 768px) {
          .footer-grid { grid-template-columns: 2fr 1fr 1fr 1fr !important; }
          .footer-brand { grid-column: auto !important; }
          .footer-bottom { flex-direction: row !important; align-items: center !important; justify-content: space-between !important; }
        }
      `}</style>
    </footer>
  );
}
