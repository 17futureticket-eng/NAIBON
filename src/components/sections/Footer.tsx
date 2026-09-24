"use client";

import Link from "next/link";
import Image from "next/image";

interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

const FOOTER_LINKS: Record<string, FooterLink[]> = {
  Product: [
    { label: "Markets", href: "/markets" },
    { label: "Launch Agent", href: "/launch" },
    { label: "Cap Tables", href: "/markets" },
    { label: "Submit Inference", href: "/markets" },
  ],
  Developers: [
    { label: "Docs", href: "#" },
    { label: "GitHub", href: "#", external: true },
    { label: "SDK", href: "#" },
    { label: "Changelog", href: "#" },
  ],
  Community: [
    { label: "X / Twitter", href: "#", external: true },
    { label: "Discord", href: "#", external: true },
    { label: "Forum", href: "#", external: true },
    { label: "Blog", href: "#" },
  ],
  Legal: [
    { label: "Terms", href: "#" },
    { label: "Privacy", href: "#" },
    { label: "Disclaimer", href: "#" },
    { label: "Audit Reports", href: "#", external: true },
  ],
};

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{ background: "var(--ivory-dark)", borderTop: "1px solid var(--ink-10)" }}
      aria-label="Site footer"
    >
      <div className="container-wide section-pad-sm">
        {/* Top grid */}
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2.5rem 2rem" }}
          className="footer-grid"
        >
          {/* Brand */}
          <div style={{ gridColumn: "1 / -1", display: "flex", flexDirection: "column", gap: "0.875rem" }} className="footer-brand">
            <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", textDecoration: "none" }} aria-label="NAIBON home">
              <Image src="/logo.png" alt="NAIBON logo" width={30} height={30} style={{ display: "block", flexShrink: 0 }} />
              <span style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "0.9375rem", letterSpacing: "-0.03em", color: "var(--ink)" }}>NAIBON</span>
            </Link>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.875rem", color: "var(--ink-60)", lineHeight: 1.55, maxWidth: "220px" }}>
              a stock exchange for ai agents
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([group, links]) => (
            <div key={group} style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
              <h3 style={{ fontFamily: "var(--font-mono)", fontSize: "0.5625rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ink-30)" }}>{group}</h3>
              <ul style={{ display: "flex", flexDirection: "column", gap: "0.625rem", listStyle: "none" }}>
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
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
        <div style={{ marginTop: "3rem", paddingTop: "1.5rem", borderTop: "1px solid var(--ink-10)", display: "flex", flexDirection: "column", gap: "0.5rem" }} className="footer-bottom">
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "0.5rem" }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.5625rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--ink-30)" }}>
              naibon a stock exchange for ai agents
            </span>
            <span style={{ display: "flex", gap: "1.5rem" }}>
              {[{ l: "app", h: "/markets" }, { l: "docs", h: "#" }, { l: "github", h: "#" }].map((item) => (
                <Link key={item.l} href={item.h} style={{ fontFamily: "var(--font-mono)", fontSize: "0.5625rem", letterSpacing: "0.1em", color: "var(--ink-30)", textDecoration: "none", transition: "color 0.15s ease" }}
                  onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "var(--ink)")}
                  onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "var(--ink-30)")}
                >{item.l}</Link>
              ))}
            </span>
          </div>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.5rem", letterSpacing: "0.08em", color: "var(--ink-30)", maxWidth: "560px", lineHeight: 1.7 }}>
            © {year} NAIBON Protocol. Experimental software use at your own risk. Nothing here constitutes financial advice.
          </p>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .footer-grid { grid-template-columns: 1fr 1fr 1fr 1fr 1fr !important; }
          .footer-brand { grid-column: 1 / 2 !important; }
          .footer-bottom { flex-direction: row !important; align-items: center !important; justify-content: space-between !important; }
        }
      `}</style>
    </footer>
  );
}
