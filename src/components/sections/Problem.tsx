"use client";

import Image from "next/image";
import AnimatedReveal from "@/components/primitives/AnimatedReveal";
import SectionLabel from "@/components/primitives/SectionLabel";
import Divider from "@/components/primitives/Divider";

export default function Problem() {
  return (
    <section
      id="problem"
      className="section-pad"
      style={{ background: "var(--ivory)" }}
      aria-labelledby="problem-heading"
    >
      <div className="container-wide">
        <div className="problem-grid" style={{ display: "grid", gridTemplateColumns: "1fr", gap: "clamp(3rem, 6vw, 5rem)", alignItems: "center" }}>

          {/* Left: real image (image1.png) */}
          <AnimatedReveal direction="left">
            <div style={{ borderRadius: "8px", overflow: "hidden", boxShadow: "0 8px 40px rgba(10,18,50,0.12), 0 2px 8px rgba(0,0,0,0.07)", position: "relative", aspectRatio: "4/3", width: "100%" }}>
              <Image
                src="/image1.png"
                alt="Token price disconnected from agent usage the core problem NAIBON solves"
                fill
                style={{ objectFit: "cover", objectPosition: "center" }}
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Overlay label */}
              <div style={{ position: "absolute", bottom: "1rem", left: "1rem" }}>
                <span style={{ display: "inline-block", fontFamily: "var(--font-mono)", fontSize: "0.5625rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.7)", background: "rgba(0,0,0,0.45)", backdropFilter: "blur(6px)", padding: "0.3rem 0.625rem", borderRadius: "3px" }}>
                  Fig. 01 Token price vs agent usage
                </span>
              </div>
            </div>
          </AnimatedReveal>

          {/* Right: editorial text */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <AnimatedReveal delay={1}>
              <SectionLabel>The Problem</SectionLabel>
            </AnimatedReveal>
            <AnimatedReveal delay={2}>
              <h2 id="problem-heading" className="t-display-sm">
                A token&apos;s price has nothing to do with whether the agent is any good.
              </h2>
            </AnimatedReveal>
            <AnimatedReveal delay={3}>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                <Divider />
                <p className="t-body">
                  When an agent ships as an ERC-20 token, the price moves on narrative,
                  liquidity games, and speculation. It moons while the agent sits{" "}
                  <span style={{ color: "var(--acid)", fontWeight: 500 }}>unused</span> or
                  the agent is genuinely excellent and its token goes nowhere.
                </p>
                <p className="t-body">
                  Holders aren&apos;t buying the work; they&apos;re buying a ticker and
                  hoping the story holds. There&apos;s no mechanism connecting what the
                  agent <em>does</em> to what the token is{" "}
                  <span style={{ color: "var(--acid)", fontWeight: 500 }}>worth.</span>
                </p>
                <p className="t-body">
                  Builders get one shot at narrative at launch. After that, whether the
                  agent serves a thousand calls a day or zero, the token price is someone
                  else&apos;s game.
                </p>
              </div>
            </AnimatedReveal>
            <AnimatedReveal delay={4}>
              <blockquote style={{ borderLeft: "2px solid var(--acid)", paddingLeft: "1.25rem" }}>
                <p style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: "clamp(1.125rem, 2vw, 1.35rem)", color: "var(--ink)", lineHeight: 1.5, letterSpacing: "-0.01em" }}>
                  &ldquo;They&apos;re not long the usage. They&apos;re long a story.&rdquo;
                </p>
              </blockquote>
            </AnimatedReveal>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 1024px) { .problem-grid { grid-template-columns: 1fr 1fr !important; } }
      `}</style>
    </section>
  );
}
