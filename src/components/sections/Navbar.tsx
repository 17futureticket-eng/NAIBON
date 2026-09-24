"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { CONTRACT_ADDRESS } from "@/lib/config";

const NAV_LINKS = [
  { label: "Markets", href: "/markets" },
  { label: "Launch Agent", href: "/launch" },
  { label: "Docs", href: "#" },
  { label: "GitHub", href: "#" },
];

function ContractChip() {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard?.writeText(CONTRACT_ADDRESS).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={copy}
      aria-label={copied ? "Copied!" : "Copy contract address"}
      title={CONTRACT_ADDRESS}
      style={{
        display: "inline-flex", alignItems: "center", gap: "0.375rem",
        padding: "0.3125rem 0.75rem", borderRadius: "6px",
        background: "transparent",
        border: "1px solid var(--ink-10)",
        cursor: "pointer", transition: "border-color 0.2s ease, background 0.2s ease",
        outline: "none", whiteSpace: "nowrap",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.background = "var(--ink-06)";
        (e.currentTarget as HTMLElement).style.borderColor = "var(--ink-30)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.background = "transparent";
        (e.currentTarget as HTMLElement).style.borderColor = "var(--ink-10)";
      }}
    >
      <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.5625rem", letterSpacing: "0.06em", color: "var(--ink-60)" }}>CA:</span>
      <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.5625rem", letterSpacing: "0.04em", color: "var(--ink)" }}>{CONTRACT_ADDRESS}</span>
      <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden="true" style={{ color: copied ? "var(--acid)" : "var(--ink-30)", flexShrink: 0 }}>
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

function LogoMark({ size = 30 }: { size?: number }) {
  return <Image src="/logo.png" alt="LUMA logo" width={size} height={size} style={{ display: "block", flexShrink: 0 }} priority />;
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const handleScroll = useCallback(() => { setScrolled(window.scrollY > 16); }, []);
  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
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

  return (
    <>
      <nav
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
          height: "var(--nav-h)",
          background: scrolled ? "rgba(242,244,248,0.97)" : "rgba(242,244,248,0.92)",
          borderBottom: "1px solid var(--ink-10)",
          backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)",
          transition: "background 0.3s ease",
        }}
        aria-label="Main navigation"
      >
        <div style={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          padding: "0 clamp(1rem, 4vw, 3.5rem)",
          maxWidth: "1440px",
          margin: "0 auto",
          width: "100%",
          gap: "2.5rem",
        }}>

          {/* Logo — flush left, no auto-margin pushing it */}
          <Link href="/" aria-label="LUMA home" style={{ display: "flex", alignItems: "center", gap: "0.5rem", textDecoration: "none", flexShrink: 0, marginRight: "0.5rem" }}>
            <LogoMark size={32} />
            <span style={{
              fontFamily: "var(--font-logo)",
              fontWeight: 700,
              fontSize: "1.25rem",
              letterSpacing: "-0.06em",
              color: "var(--ink)",
              lineHeight: 1,
            }}>
              LUMA
            </span>
          </Link>

          {/* Desktop nav links — left-aligned, no flex:1 centering */}
          <div className="nav-links-desktop" style={{ display: "flex", alignItems: "center", gap: "0.125rem" }}>
            {NAV_LINKS.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  style={{
                    fontFamily: "var(--font-sans)", fontSize: "0.8125rem", fontWeight: 500,
                    letterSpacing: "-0.01em",
                    color: active ? "var(--ink)" : "var(--ink-60)",
                    textDecoration: "none",
                    padding: "0.375rem 0.75rem", borderRadius: "6px",
                    background: active ? "var(--ink-06)" : "transparent",
                    transition: "color 0.15s ease, background 0.15s ease",
                    whiteSpace: "nowrap",
                  }}
                  onMouseEnter={(e) => { if (!active) (e.currentTarget as HTMLElement).style.color = "var(--ink)"; }}
                  onMouseLeave={(e) => { if (!active) (e.currentTarget as HTMLElement).style.color = "var(--ink-60)"; }}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Spacer — pushes right section to far right */}
          <div style={{ flex: 1 }} />

          {/* Desktop right — CA chip + CTA only, no wallet */}
          <div className="nav-right-desktop" style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexShrink: 0 }}>
            <ContractChip />
            <Link href="/markets" className="btn btn-nav">Open the app →</Link>
          </div>

          {/* Mobile right */}
          <div className="nav-right-mobile" style={{ display: "none", alignItems: "center", gap: "0.5rem", marginLeft: "auto" }}>
            <Link href="/markets" className="btn btn-nav" style={{ fontSize: "0.75rem", padding: "0.375rem 0.75rem" }}>App →</Link>
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
                  background: "var(--ink)", borderRadius: "1px",
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
          <Link href="/" onClick={() => setMenuOpen(false)} style={{ display: "flex", alignItems: "center", gap: "0.5rem", textDecoration: "none" }}>
            <LogoMark size={28} />
            <span style={{
              fontFamily: "var(--font-logo)",
              fontWeight: 700,
              fontSize: "1.25rem",
              letterSpacing: "-0.06em",
              color: "var(--ink)",
              lineHeight: 1,
            }}>
              LUMA
            </span>
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
          {/* Full CA on mobile */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.625rem 0.875rem", background: "var(--ink-06)", borderRadius: "6px", border: "1px solid var(--ink-10)", gap: "0.5rem", overflow: "hidden" }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.5rem", letterSpacing: "0.06em", color: "var(--ink-60)", flexShrink: 0 }}>CA</span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.475rem", letterSpacing: "0.03em", color: "var(--ink)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{CONTRACT_ADDRESS}</span>
            <button
              onClick={() => navigator.clipboard?.writeText(CONTRACT_ADDRESS).catch(() => {})}
              aria-label="Copy CA"
              style={{ background: "none", border: "none", cursor: "pointer", padding: "2px", color: "var(--ink-60)", flexShrink: 0 }}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <rect x="4" y="4" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.2" />
                <path d="M2 8V2H8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
            </button>
          </div>
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
