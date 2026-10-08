"use client";

import Link from "next/link";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";

interface Section {
  heading: string;
  body: string | string[];
}

interface LegalPageProps {
  title: string;
  subtitle: string;
  lastUpdated: string;
  sections: Section[];
}

export default function LegalPage({ title, subtitle, lastUpdated, sections }: LegalPageProps) {
  return (
    <div style={{ minHeight: "100vh", background: "var(--ivory)", width: "100%", overflowX: "hidden" }}>
      <Navbar />

      <main style={{ paddingTop: "var(--nav-h)" }}>
        {/* Header */}
        <div style={{ background: "var(--ivory-dark)", borderBottom: "1px solid var(--ink-10)", padding: "clamp(2.5rem,6vw,4.5rem) 0" }}>
          <div className="container-narrow">
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
              <Link href="/" style={{ fontFamily: "var(--font-mono)", fontSize: "0.5rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ink-30)", textDecoration: "none", transition: "color 0.15s ease" }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "var(--ink)"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "var(--ink-30)"}
              >LUMA</Link>
              <span style={{ color: "var(--ink-30)", fontFamily: "var(--font-mono)", fontSize: "0.5rem" }}>/</span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.5rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ink-60)" }}>{title}</span>
            </div>
            <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "clamp(2rem, 4vw, 3rem)", letterSpacing: "-0.03em", lineHeight: 1.05, color: "var(--ink)", marginBottom: "0.75rem" }}>
              {title}
            </h1>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.9375rem", color: "var(--ink-60)", lineHeight: 1.6, maxWidth: "540px", marginBottom: "1rem" }}>
              {subtitle}
            </p>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.5rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--ink-30)" }}>
              Last updated: {lastUpdated}
            </span>
          </div>
        </div>

        {/* Body */}
        <div className="container-narrow" style={{ padding: "clamp(2.5rem,6vw,4.5rem) clamp(1.25rem,4vw,5rem)" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "3rem", maxWidth: "680px" }}>
            {sections.map((s, i) => (
              <div key={i}>
                <h2 style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: "1rem", letterSpacing: "-0.01em", color: "var(--ink)", marginBottom: "0.875rem", display: "flex", alignItems: "center", gap: "0.625rem" }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.5rem", letterSpacing: "0.1em", color: "var(--ink-30)", minWidth: "1.5rem" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {s.heading}
                </h2>
                <div style={{ paddingLeft: "2.125rem", borderLeft: "1.5px solid var(--ink-10)", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  {Array.isArray(s.body)
                    ? s.body.map((para, j) => (
                        <p key={j} style={{ fontFamily: "var(--font-sans)", fontSize: "0.9375rem", lineHeight: 1.75, color: "var(--ink-60)" }}>{para}</p>
                      ))
                    : <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.9375rem", lineHeight: 1.75, color: "var(--ink-60)" }}>{s.body}</p>
                  }
                </div>
              </div>
            ))}
          </div>

          {/* Footer nav */}
          <div style={{ marginTop: "4rem", paddingTop: "2rem", borderTop: "1px solid var(--ink-10)", display: "flex", flexWrap: "wrap", gap: "1.5rem" }}>
            {[
              { label: "Terms of Service", href: "/terms" },
              { label: "Privacy Policy",   href: "/privacy" },
              { label: "Disclaimer",       href: "/disclaimer" },
            ].map(link => (
              <Link key={link.href} href={link.href}
                style={{ fontFamily: "var(--font-mono)", fontSize: "0.5625rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ink-30)", textDecoration: "none", transition: "color 0.15s ease" }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "var(--ink)"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "var(--ink-30)"}
              >{link.label}</Link>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
