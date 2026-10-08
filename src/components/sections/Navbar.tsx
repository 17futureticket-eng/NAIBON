"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { CONTRACT_ADDRESS } from "@/lib/config";

// Docs + GitHub removed
const NAV_LINKS = [
  { label: "Markets", href: "/markets" },
  { label: "Launch Agent", href: "/launch" },
];

function ContractChip({ dark }: { dark?: boolean }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard?.writeText(CONTRACT_ADDRESS).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  const textColor = dark ? "rgba(255,255,255,0.55)" : "var(--ink-60)";
  const borderColor = dark ? "rgba(255,255,255,0.15)" : "var(--ink-10)";
  return (
    <button
      onClick={copy}
      aria-label={copied ? "Copied!" : "Copy contract address"}
      title={CONTRACT_ADDRESS}
      style={{
        display: "inline-flex", alignItems: "center", gap: "0.375rem",
        padding: "0.3125rem 0.75rem", borderRadius: "6px",
        background: "transparent",
        border: `1px solid ${borderColor}`,
        cursor: "pointer", transition: "all 0.2s ease",
        outline: "none", whiteSpace: "nowrap",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.background = dark ? "rgba(255,255,255,0.08)" : "var(--ink-06)";
        (e.currentTarget as HTMLElement).style.borderColor = dark ? "rgba(255,255,255,0.3)" : "var(--ink-30)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.background = "transparent";
        (e.currentTarget as HTMLElement).style.borderColor = borderColor;
      }}
    >
      <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.5625rem", letterSpacing: "0.06em", color: textColor }}>CA:</span>
      <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.5625rem", letterSpacing: "0.04em", color: dark ? "rgba(255,255,255,0.8)" : "var(--ink)" }}>{CONTRACT_ADDRESS}</span>
      <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden="true"
        style={{ color: copied ? (dark ? "#7AB8FF" : "var(--acid)") : textColor, flexShrink: 0 }}>
        {copied ? (
          <path d="M2 6L5 9L10 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        ) : (
          <>
            <rect x="4" y="4" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.2" />
            <path d="M2 8V2H8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </>
        )}
      </svg>
    </button>
  );
}

function LogoMark({ size = 52 }: { size?: number }) {
  return (
    <Image
      src="/luma-logo-01.jpg"
      alt="LUMA"
      width={size}
      height={size}
      className="nav-logo-img"
      style={{ display: "block", flexShrink: 0, borderRadius: "10px", boxShadow: "0 2px 12px rgba(0,0,0,0.18)" }}
      priority
    />
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  // On home page: transparent until scrolled. On other pages: always solid.
  const forceOpaque = !isHome;

  const handleScroll = useCallback(() => { setScrolled(window.scrollY > 60); }, []);
  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 1024) setMenuOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  const isActive = (href: string) =>
    href !== "#" && (pathname === href || pathname.startsWith(href + "/"));

  // Dark mode = transparent state on hero
  const dark = !forceOpaque && !scrolled;

  const navBg = forceOpaque
    ? "rgba(242,244,248,0.98)"
    : scrolled
    ? "rgba(10,14,26,0.92)"
    : "transparent";

  const navBorder = forceOpaque
    ? "1px solid var(--ink-10)"
    : scrolled
    ? "1px solid rgba(255,255,255,0.08)"
    : "1px solid transparent";

  return (
    <>
      <nav
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
          height: "var(--nav-h)",
          background: navBg,
          borderBottom: navBorder,
          backdropFilter: (scrolled || forceOpaque) ? "blur(18px)" : "none",
          WebkitBackdropFilter: (scrolled || forceOpaque) ? "blur(18px)" : "none",
          transition: "background 0.5s ease, border-color 0.5s ease, backdrop-filter 0.5s ease",
        }}
        aria-label="Main navigation"
      >
        <div style={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          padding: "0 clamp(0.5rem, 2vw, 1.5rem)",
          maxWidth: "1440px",
          margin: "0 auto",
          width: "100%",
          gap: "1.75rem",
        }}>
          {/* Logo — large, flush left */}
          <Link
            href="/"
            aria-label="LUMA home"
            style={{ display: "flex", alignItems: "center", textDecoration: "none", flexShrink: 0 }}
          >
            <LogoMark size={52} />
          </Link>

          {/* Desktop nav links */}
          <div className="nav-links-desktop" style={{ display: "flex", alignItems: "center", gap: "0.125rem" }}>
            {NAV_LINKS.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  style={{
                    fontFamily: "var(--font-sans)", fontSize: "0.875rem", fontWeight: 500,
                    letterSpacing: "-0.01em",
                    color: dark
                      ? (active ? "#fff" : "rgba(255,255,255,0.65)")
                      : (active ? "var(--ink)" : "var(--ink-60)"),
                    textDecoration: "none",
                    padding: "0.375rem 0.875rem", borderRadius: "6px",
                    background: active
                      ? (dark ? "rgba(255,255,255,0.12)" : "var(--ink-06)")
                      : "transparent",
                    transition: "color 0.2s ease, background 0.2s ease",
                    whiteSpace: "nowrap",
                  }}
                  onMouseEnter={(e) => {
                    if (!active) (e.currentTarget as HTMLElement).style.color = dark ? "#fff" : "var(--ink)";
                    if (!active) (e.currentTarget as HTMLElement).style.background = dark ? "rgba(255,255,255,0.08)" : "var(--ink-06)";
                  }}
                  onMouseLeave={(e) => {
                    if (!active) (e.currentTarget as HTMLElement).style.color = dark ? "rgba(255,255,255,0.65)" : "var(--ink-60)";
                    if (!active) (e.currentTarget as HTMLElement).style.background = "transparent";
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div style={{ flex: 1 }} />

          {/* Desktop right */}
          <div className="nav-right-desktop" style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexShrink: 0 }}>
            {/* X / Twitter */}
            <Link
              href="https://x.com/luma_protocol"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LUMA on X"
              style={{
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                width: "36px", height: "36px", borderRadius: "8px",
                background: dark ? "rgba(255,255,255,0.10)" : "rgba(10,14,26,0.08)",
                color: dark ? "#fff" : "var(--ink)",
                transition: "background 0.2s ease, transform 0.2s ease",
                flexShrink: 0,
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = "#000";
                (e.currentTarget as HTMLElement).style.color = "#fff";
                (e.currentTarget as HTMLElement).style.transform = "scale(1.08)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = dark ? "rgba(255,255,255,0.10)" : "rgba(10,14,26,0.08)";
                (e.currentTarget as HTMLElement).style.color = dark ? "#fff" : "var(--ink)";
                (e.currentTarget as HTMLElement).style.transform = "scale(1)";
              }}
            >
              <svg width="18" height="18" viewBox="0 0 1200 1227" fill="currentColor" aria-hidden="true">
                <path d="M714.163 519.284 1160.89 0h-105.86L667.137 450.887 357.328 0H0l468.492 681.821L0 1226.37h105.866l409.625-476.152 327.181 476.152H1200L714.137 519.284h.026ZM569.165 687.828l-47.468-67.894-377.686-540.24h162.604l304.797 435.991 47.468 67.894 396.2 566.721H892.476L569.165 687.854v-.026Z"/>
              </svg>
            </Link>
            <span className="nav-ca-chip"><ContractChip dark={dark} /></span>
            <Link
              href="/markets"
              className="btn"
              style={{
                fontSize: "0.8125rem",
                fontWeight: 600,
                padding: "0.4375rem 1.125rem",
                borderRadius: "6px",
                background: dark ? "rgba(255,255,255,0.95)" : "var(--ink)",
                color: dark ? "var(--ink)" : "var(--ivory)",
                border: "none",
                transition: "all 0.2s ease",
                letterSpacing: "-0.01em",
              }}
            >
              Open the app →
            </Link>
          </div>

          {/* Mobile right */}
          <div className="nav-right-mobile" style={{ display: "none", alignItems: "center", gap: "0.5rem", marginLeft: "auto" }}>
            <Link href="/markets" style={{
              fontFamily: "var(--font-sans)", fontSize: "0.75rem", fontWeight: 600,
              padding: "0.375rem 0.75rem", borderRadius: "6px",
              background: dark ? "rgba(255,255,255,0.95)" : "var(--ink)",
              color: dark ? "var(--ink)" : "var(--ivory)",
              textDecoration: "none",
            }}>App →</Link>
            <button
              onClick={() => setMenuOpen((o) => !o)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              style={{ background: "none", border: "none", cursor: "pointer", padding: "6px", display: "flex", flexDirection: "column", gap: "5px", flexShrink: 0 }}
            >
              {[0, 1, 2].map((i) => (
                <span key={i} style={{
                  display: "block", width: "20px", height: "1.5px",
                  background: dark ? "rgba(255,255,255,0.85)" : "var(--ink)", borderRadius: "1px",
                  transition: "all 0.28s ease",
                  transform: menuOpen && i === 0 ? "rotate(45deg) translate(4.5px,4.5px)" : menuOpen && i === 2 ? "rotate(-45deg) translate(4.5px,-4.5px)" : "none",
                  opacity: menuOpen && i === 1 ? 0 : 1,
                }} />
              ))}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        style={{
          position: "fixed", inset: 0, zIndex: 200, background: "var(--ivory)",
          display: "flex", flexDirection: "column",
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "auto" : "none",
          transform: menuOpen ? "translateX(0)" : "translateX(18px)",
          transition: "opacity 0.22s ease, transform 0.22s ease",
        }}
      >
        <div style={{ height: "var(--nav-h)", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 1.25rem", borderBottom: "1px solid var(--ink-10)", flexShrink: 0 }}>
          <Link href="/" onClick={() => setMenuOpen(false)} style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
            <LogoMark size={40} />
          </Link>
          <button onClick={() => setMenuOpen(false)} aria-label="Close menu" style={{ background: "none", border: "none", cursor: "pointer", padding: "4px" }}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M3 3L15 15M15 3L3 15" stroke="var(--ink)" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <nav style={{ flex: 1, display: "flex", flexDirection: "column", padding: "1.75rem 1.5rem 0", overflowY: "auto" }}>
          {NAV_LINKS.map((link, i) => (
            <Link
              key={link.label}
              href={link.href}
              style={{
                padding: "1rem 0", fontSize: "1.5rem", fontWeight: 300,
                fontFamily: "var(--font-sans)", letterSpacing: "-0.025em",
                color: "var(--ink)", borderBottom: "1px solid var(--ink-06)",
                textDecoration: "none",
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? "translateY(0)" : "translateY(12px)",
                transition: `opacity 0.3s ease ${i * 0.05 + 0.08}s, transform 0.3s ease ${i * 0.05 + 0.08}s`,
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div style={{ padding: "1.25rem", display: "flex", flexDirection: "column", gap: "0.625rem", borderTop: "1px solid var(--ink-06)" }}>
          <ContractChip />
          <Link
            href="https://x.com/luma_protocol"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex", alignItems: "center", gap: "0.625rem",
              padding: "0.625rem 1rem", borderRadius: "8px",
              background: "#000", color: "#fff",
              textDecoration: "none", transition: "opacity 0.15s ease",
              fontFamily: "var(--font-sans)", fontSize: "0.875rem", fontWeight: 600,
              letterSpacing: "-0.01em",
            }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.opacity = "0.85"}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.opacity = "1"}
          >
            <svg width="16" height="16" viewBox="0 0 1200 1227" fill="currentColor" aria-hidden="true">
              <path d="M714.163 519.284 1160.89 0h-105.86L667.137 450.887 357.328 0H0l468.492 681.821L0 1226.37h105.866l409.625-476.152 327.181 476.152H1200L714.137 519.284h.026ZM569.165 687.828l-47.468-67.894-377.686-540.24h162.604l304.797 435.991 47.468 67.894 396.2 566.721H892.476L569.165 687.854v-.026Z"/>
            </svg>
            @luma_protocol
          </Link>
          <Link href="/markets" className="btn btn-primary" style={{ justifyContent: "center", fontSize: "0.9375rem", padding: "0.875rem" }}>
            Open the app →
          </Link>
        </div>
      </div>

      <style>{`
        @media (max-width: 1023px) {
          .nav-links-desktop { display: none !important; }
          .nav-right-desktop { display: none !important; }
          .nav-right-mobile  { display: flex !important; }
        }
      `}</style>
    </>
  );
}
