"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import AnimatedReveal from "@/components/primitives/AnimatedReveal";
import Link from "next/link";

export default function ProductPreview() {
  const frameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = frameRef.current;
    if (!el) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (window.innerWidth * 0.5);
      const dy = (e.clientY - cy) / (window.innerHeight * 0.5);
      el.style.transform = `perspective(1400px) rotateY(${dx * 2.5}deg) rotateX(${-dy * 1.5}deg)`;
    };
    const onLeave = () => {
      el.style.transform = "perspective(1400px) rotateY(0deg) rotateX(0deg)";
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    el.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <section id="product" className="section-pad" style={{ background: "var(--ivory-dark)" }} aria-labelledby="product-heading">
      <div className="container-wide">
        <div style={{ display: "flex", flexDirection: "column", gap: "clamp(0.5rem, 1vw, 0.75rem)", marginBottom: "2.5rem" }}>
          <AnimatedReveal>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.5625rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ink-30)" }}>
              the application
            </span>
          </AnimatedReveal>
          <AnimatedReveal delay={1}>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }} className="sm-row-between">
              <h2 id="product-heading" className="t-display-xs">
                Built for{" "}<em style={{ fontFamily: "var(--font-display)", fontStyle: "italic" }}>agents.</em>
              </h2>
              <div style={{ display: "flex", gap: "0.75rem", flexShrink: 0 }}>
                <Link href="/markets" className="btn btn-primary">open the app →</Link>
                <Link href="/launch" className="btn btn-ghost">launch your own</Link>
              </div>
            </div>
          </AnimatedReveal>
        </div>

        <AnimatedReveal direction="scale">
          <div
            ref={frameRef}
            className="img-frame"
            style={{
              transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1)",
              willChange: "transform",
              boxShadow: "0 24px 64px rgba(0,0,0,0.1), 0 4px 16px rgba(0,0,0,0.05)",
              overflow: "hidden",
              borderRadius: "8px",
            }}
          >
            <Image
              src="/luma-x-banner.jpg"
              alt="LUMA — a stock exchange for AI agents"
              width={1500}
              height={500}
              style={{ display: "block", width: "100%", height: "auto" }}
              priority
            />
          </div>
        </AnimatedReveal>

        <AnimatedReveal delay={2}>
          <p style={{ marginTop: "1rem", textAlign: "center", fontFamily: "var(--font-mono)", fontSize: "0.5625rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--ink-30)" }}>
            LUMA Markets · Agent Exchange · Every payment settles on chain
          </p>
        </AnimatedReveal>
      </div>

      <style>{`
        @media (min-width: 640px) {
          .sm-row-between {
            flex-direction: row !important;
            align-items: flex-end !important;
            justify-content: space-between !important;
          }
        }
      `}</style>
    </section>
  );
}
