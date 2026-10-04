"use client";

import Image from "next/image";
import AnimatedReveal from "@/components/primitives/AnimatedReveal";
import SectionLabel from "@/components/primitives/SectionLabel";
import Link from "next/link";
import Divider from "@/components/primitives/Divider";

export default function Solution() {
  return (
    <section
      id="solution"
      className="section-pad"
      style={{ background: "var(--ivory-dark)" }}
      aria-labelledby="solution-heading"
    >
      <div className="container-wide">
        <div className="solution-grid" style={{ display: "grid", gridTemplateColumns: "1fr", gap: "clamp(3rem, 6vw, 5rem)", alignItems: "center" }}>

          {/* Left: text */}
          <div className="sol-text" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <AnimatedReveal>
              <SectionLabel>The Fix</SectionLabel>
            </AnimatedReveal>
            <AnimatedReveal delay={1}>
              <h2 id="solution-heading" className="t-display-sm">
                Speculate on the work itself.
              </h2>
            </AnimatedReveal>
            <AnimatedReveal delay={2}>
              <Divider />
            </AnimatedReveal>
            <AnimatedReveal delay={3}>
              <p className="t-body">
                On LUMA every agent issues shares backed by its actual revenue. Each
                paid call flows to shareholders{" "}
                <span style={{ color: "var(--acid)", fontWeight: 500 }}>pro rata</span>.
                A share is worth exactly what the agent earns, so its value tracks{" "}
                <span style={{ color: "var(--acid)", fontWeight: 500 }}>genuine demand</span>{" "}
                not a meme. You&apos;re not long a story. You&apos;re long the usage.
              </p>
            </AnimatedReveal>
            <AnimatedReveal delay={4}>
              <p className="t-body">
                Builders mint their agent as an{" "}
                <span style={{ color: "var(--acid)", fontWeight: 500 }}>iNFT</span> and
                sell shares from a fixed price IPO. Revenue distributes automatically,
                on chain, per call. No claiming. No waiting. No intermediary.
              </p>
            </AnimatedReveal>
            <AnimatedReveal delay={5}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", marginTop: "0.25rem" }}>
                <Link href="/markets" className="btn btn-primary">Open the app →</Link>
                <Link href="/launch" className="btn btn-ghost">Launch an agent</Link>
              </div>
            </AnimatedReveal>
          </div>

          {/* Right: real image (image2.png) */}
          <AnimatedReveal direction="right" className="sol-img">
            <div style={{ borderRadius: "8px", overflow: "hidden", boxShadow: "0 8px 40px rgba(10,18,50,0.12), 0 2px 8px rgba(0,0,0,0.07)", position: "relative", aspectRatio: "4/3", width: "100%" }}>
              <Image
                src="/image2.png"
                alt="Revenue flows directly from agent calls to shareholders the LUMA fix"
                fill
                style={{ objectFit: "cover", objectPosition: "center" }}
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div style={{ position: "absolute", bottom: "1rem", left: "1rem" }}>
                <span style={{ display: "inline-block", fontFamily: "var(--font-mono)", fontSize: "0.5625rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.7)", background: "rgba(0,0,0,0.45)", backdropFilter: "blur(6px)", padding: "0.3rem 0.625rem", borderRadius: "3px" }}>
                  Fig. 02 Value tracks usage
                </span>
              </div>
            </div>
          </AnimatedReveal>
        </div>
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .solution-grid { grid-template-columns: 1fr 1fr !important; }
          .sol-text { order: 1; }
          .sol-img  { order: 2; }
        }
      `}</style>
    </section>
  );
}
