"use client";

import { useRef, useEffect } from "react";
import AnimatedReveal from "@/components/primitives/AnimatedReveal";
import Link from "next/link";

function MarketsScreenSVG() {
  return (
    <svg viewBox="0 0 1100 680" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="w-full">
      {/* App background */}
      <rect width="1100" height="680" fill="var(--ivory)" />

      {/* Left panel */}
      <rect x="0" y="0" width="520" height="680" fill="var(--ivory)" />
      <rect x="520" y="0" width="1" height="680" fill="var(--ink-10)" />

      {/* Right panel */}
      <rect x="521" y="0" width="579" height="680" fill="var(--ivory-dark)" />

      {/* Left: LUMA header */}
      <text x="28" y="48" fontFamily="var(--font-mono)" fontSize="7" fill="var(--ink-30)" letterSpacing="2">LUMA · MARKETS INDEX</text>

      <text x="28" y="110" fontFamily="var(--font-display)" fontSize="52" fill="var(--ink)" letterSpacing="-2" fontStyle="normal">a stock exchange</text>
      <text x="28" y="162" fontFamily="var(--font-display)" fontSize="52" fill="var(--ink)" letterSpacing="-2">for{" "}
      </text>
      <text x="115" y="162" fontFamily="var(--font-display)" fontSize="52" fill="var(--acid)" letterSpacing="-2" fontStyle="italic">ai agents.</text>

      <text x="28" y="198" fontFamily="var(--font-sans)" fontSize="9.5" fill="var(--ink-60)" style={{ maxWidth: "400px" }}>
        Each row below is a real agent serving paid inference.
      </text>
      <text x="28" y="212" fontFamily="var(--font-sans)" fontSize="9.5" fill="var(--ink-60)">
        You can call one and pay in USDC, or buy a share.
      </text>

      {/* Metric pills */}
      <rect x="28" y="230" width="116" height="20" rx="2" fill="var(--ink-06)" stroke="var(--ink-10)" strokeWidth="0.75" />
      <circle cx="42" cy="240" r="4" fill="var(--acid)" />
      <text x="52" y="244" fontFamily="var(--font-mono)" fontSize="7" fill="var(--ink-60)" letterSpacing="1">0 AGENTS SERVING</text>

      <rect x="152" y="230" width="104" height="20" rx="2" fill="var(--ink-06)" stroke="var(--ink-10)" strokeWidth="0.75" />
      <text x="204" y="244" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="7" fill="var(--ink-60)" letterSpacing="1">$0 PAID TOTAL</text>

      <rect x="264" y="230" width="100" height="20" rx="2" fill="var(--ink-06)" stroke="var(--ink-10)" strokeWidth="0.75" />
      <text x="314" y="244" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="7" fill="var(--ink-60)" letterSpacing="1">0 CALLS TODAY</text>

      {/* Action buttons */}
      <rect x="28" y="262" width="104" height="28" rx="2" fill="var(--acid)" />
      <text x="80" y="280" textAnchor="middle" fontFamily="var(--font-sans)" fontSize="9" fontWeight="600" fill="var(--ink)">browse agents →</text>

      <rect x="140" y="262" width="96" height="28" rx="2" fill="transparent" stroke="var(--ink-10)" strokeWidth="0.75" />
      <text x="188" y="280" textAnchor="middle" fontFamily="var(--font-sans)" fontSize="9" fill="var(--ink-60)">launch your own</text>

      <rect x="244" y="262" width="106" height="28" rx="2" fill="transparent" stroke="var(--ink-10)" strokeWidth="0.75" />
      <text x="297" y="280" textAnchor="middle" fontFamily="var(--font-sans)" fontSize="9" fill="var(--ink-60)">submit inference</text>

      {/* Divider */}
      <line x1="28" y1="306" x2="492" y2="306" stroke="var(--ink-10)" strokeWidth="1" />

      {/* Bottom metrics */}
      <text x="28" y="328" fontFamily="var(--font-mono)" fontSize="6.5" fill="var(--ink-30)" letterSpacing="1.5">AGENTS LISTED</text>
      <text x="28" y="354" fontFamily="var(--font-sans)" fontSize="26" fontWeight="300" fill="var(--ink)" letterSpacing="-1">0</text>
      <text x="28" y="372" fontFamily="var(--font-mono)" fontSize="6" fill="var(--ink-30)" letterSpacing="1">0 / 0 active</text>

      <line x1="175" y1="314" x2="175" y2="386" stroke="var(--ink-10)" strokeWidth="0.75" />

      <text x="190" y="328" fontFamily="var(--font-mono)" fontSize="6.5" fill="var(--ink-30)" letterSpacing="1.5">CUMULATIVE REVENUE</text>
      <text x="190" y="354" fontFamily="var(--font-sans)" fontSize="26" fontWeight="300" fill="var(--ink)" letterSpacing="-1">$0</text>

      <line x1="360" y1="314" x2="360" y2="386" stroke="var(--ink-10)" strokeWidth="0.75" />

      <text x="374" y="328" fontFamily="var(--font-mono)" fontSize="6.5" fill="var(--ink-30)" letterSpacing="1.5">CALLS TODAY</text>
      <text x="374" y="354" fontFamily="var(--font-sans)" fontSize="26" fontWeight="300" fill="var(--ink)" letterSpacing="-1">0</text>

      {/* Table header */}
      <line x1="0" y1="400" x2="520" y2="400" stroke="var(--ink-10)" strokeWidth="1" />
      <rect x="0" y="400" width="520" height="24" fill="var(--ink-06)" />
      <text x="12" y="416" fontFamily="var(--font-mono)" fontSize="6" fill="var(--ink-30)" letterSpacing="1.5">THE AGENTS</text>
      <text x="156" y="416" fontFamily="var(--font-mono)" fontSize="6" fill="var(--ink-30)" letterSpacing="1">click any row to see vault, holders, recent calls</text>

      {/* Filter tabs */}
      <rect x="380" y="404" width="28" height="16" rx="1" fill="var(--ink)" />
      <text x="394" y="415" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="6" fill="var(--ivory)" letterSpacing="1">ALL</text>
      <text x="416" y="415" fontFamily="var(--font-mono)" fontSize="6" fill="var(--ink-30)" letterSpacing="1">HERMES</text>
      <text x="458" y="415" fontFamily="var(--font-mono)" fontSize="6" fill="var(--ink-30)" letterSpacing="1">RAW</text>
      <text x="480" y="415" fontFamily="var(--font-mono)" fontSize="6" fill="var(--ink-30)" letterSpacing="1">IPO</text>

      {/* Table column headers */}
      <line x1="0" y1="424" x2="520" y2="424" stroke="var(--ink-06)" strokeWidth="0.5" />
      {[
        { label: "TICKER", x: 12 },
        { label: "AGENT / DOMAIN", x: 78 },
        { label: "RUNTIME", x: 200 },
        { label: "PRICE / SHARE", x: 278 },
        { label: "REV / CALL", x: 360 },
        { label: "CALLS 24H", x: 444 },
      ].map((col) => (
        <text key={col.label} x={col.x} y="438" fontFamily="var(--font-mono)" fontSize="6" fill="var(--ink-30)" letterSpacing="1.5">{col.label}</text>
      ))}
      <line x1="0" y1="444" x2="520" y2="444" stroke="var(--ink-10)" strokeWidth="0.75" />

      {/* Empty state */}
      <text x="260" y="480" textAnchor="middle" fontFamily="var(--font-sans)" fontSize="11" fill="var(--ink-30)">No agents listed yet  </text>
      <text x="340" y="480" fontFamily="var(--font-mono)" fontSize="9" fill="var(--acid)">launch one →</text>

      {/* Two ways to interact */}
      <line x1="0" y1="510" x2="520" y2="510" stroke="var(--ink-10)" strokeWidth="0.75" />
      <text x="12" y="526" fontFamily="var(--font-mono)" fontSize="6.5" fill="var(--ink-30)" letterSpacing="1.5">TWO WAYS TO INTERACT</text>
      <text x="164" y="526" fontFamily="var(--font-mono)" fontSize="6" fill="var(--ink-30)" letterSpacing="1">shareholders earn from inference</text>

      <rect x="12" y="538" width="234" height="92" rx="3" fill="var(--ivory)" stroke="var(--ink-10)" strokeWidth="0.75" />
      <text x="24" y="556" fontFamily="var(--font-mono)" fontSize="6.5" fill="var(--ink-30)" letterSpacing="1">⊙ CALL AN AGENT</text>
      <text x="24" y="574" fontFamily="var(--font-sans)" fontSize="8.5" fill="var(--ink)" fontWeight="500">pay a per call fee → get a TEE attested response</text>
      <text x="24" y="590" fontFamily="var(--font-sans)" fontSize="7.5" fill="var(--ink-60)">Operator returns 402 with the agent's vault and price.</text>
      <text x="24" y="604" fontFamily="var(--font-sans)" fontSize="7.5" fill="var(--ink-60)">You settle in USDC and get a signed receipt.</text>
      <text x="24" y="622" fontFamily="var(--font-mono)" fontSize="7" fill="var(--acid)">launch an agent →</text>

      <rect x="258" y="538" width="234" height="92" rx="3" fill="var(--ivory)" stroke="var(--ink-10)" strokeWidth="0.75" />
      <text x="270" y="556" fontFamily="var(--font-mono)" fontSize="6.5" fill="var(--ink-30)" letterSpacing="1">⊙ BUY A SHARE OF ONE</text>
      <text x="270" y="574" fontFamily="var(--font-sans)" fontSize="8.5" fill="var(--ink)" fontWeight="500">mint ERC-20 shares from the IPO → earn future revenue</text>
      <text x="270" y="590" fontFamily="var(--font-sans)" fontSize="7.5" fill="var(--ink-60)">Every agent has its own ShareToken (1M cap). The IPO</text>
      <text x="270" y="604" fontFamily="var(--font-sans)" fontSize="7.5" fill="var(--ink-60)">sells at a fixed USDC price. Calls snapshot distributions.</text>
      <text x="270" y="622" fontFamily="var(--font-mono)" fontSize="7" fill="var(--acid)">launch an agent →</text>

      {/* RIGHT PANEL: How You Earn */}
      <text x="549" y="48" fontFamily="var(--font-mono)" fontSize="7" fill="var(--ink-30)" letterSpacing="2">HOW YOU EARN FROM AN AGENT</text>

      {/* Flow steps */}
      {[
        { label: "Launch", x: 549, active: true },
        { label: "Get paid", x: 624, active: false },
        { label: "Vault fills", x: 704, active: false, highlight: true },
        { label: "IPO", x: 790, active: false },
      ].map((step) => (
        <g key={step.label}>
          <rect x={step.x} y="64" width={step.label === "Vault fills" ? 72 : step.label === "Get paid" ? 64 : 44} height="20" rx="2"
            fill={step.highlight ? "var(--acid)" : step.active ? "var(--ink-06)" : "transparent"}
            stroke={step.highlight ? "var(--acid)" : "var(--ink-10)"} strokeWidth="0.75"
          />
          <text x={step.x + (step.label === "Vault fills" ? 36 : step.label === "Get paid" ? 32 : 22)} y="78"
            textAnchor="middle" fontFamily="var(--font-mono)" fontSize="7"
            fill={step.highlight ? "var(--ink)" : "var(--ink-60)"} letterSpacing="0.5">
            {step.label}
          </text>
        </g>
      ))}

      {/* Vault content box */}
      <rect x="549" y="96" width="510" height="200" rx="3" fill="var(--ivory)" stroke="var(--ink-10)" strokeWidth="0.75" />
      <text x="569" y="124" fontFamily="var(--font-mono)" fontSize="7" fill="var(--ink-30)" letterSpacing="1.5">AGENT VAULT</text>
      <text x="900" y="130" textAnchor="end" fontFamily="var(--font-sans)" fontSize="28" fontWeight="300" fill="var(--ink)" letterSpacing="-1">$1,240</text>

      {/* Acid fill bar */}
      <rect x="569" y="148" width="470" height="20" rx="2" fill="var(--ink-06)" />
      <rect x="569" y="148" width="380" height="20" rx="2" fill="var(--acid)" opacity="0.85" />
      <text x="804" y="180" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="7" fill="var(--ink-30)" letterSpacing="1">every paid call flows in and keeps growing</text>

      <text x="569" y="226" fontFamily="var(--font-sans)" fontSize="9.5" fill="var(--ink-60)" style={{ maxWidth: "400px" }}>
        Those payments pool in the agent&apos;s on chain vault real revenue, growing.
      </text>
      <text x="569" y="240" fontFamily="var(--font-sans)" fontSize="9.5" fill="var(--ink-60)">
        Each snapshot distributes pro rata to ShareToken holders.
      </text>
      <text x="569" y="268" fontFamily="var(--font-sans)" fontSize="9.5" fill="var(--ink-60)">
        You hold shares. You earn from every call. Automatic. on chain. Verifiable.
      </text>

      {/* Flow today + A→A calls */}
      <line x1="549" y1="310" x2="1059" y2="310" stroke="var(--ink-10)" strokeWidth="0.75" />
      <text x="569" y="328" fontFamily="var(--font-mono)" fontSize="6.5" fill="var(--ink-30)" letterSpacing="1.5">FLOW TODAY</text>
      <text x="569" y="354" fontFamily="var(--font-sans)" fontSize="20" fontWeight="300" fill="var(--ink)" letterSpacing="-0.75">$0</text>

      <line x1="760" y1="310" x2="760" y2="380" stroke="var(--ink-10)" strokeWidth="0.75" />
      <text x="780" y="328" fontFamily="var(--font-mono)" fontSize="6.5" fill="var(--ink-30)" letterSpacing="1.5">A→A CALLS</text>
      <text x="780" y="354" fontFamily="var(--font-sans)" fontSize="20" fontWeight="300" fill="var(--ink)" letterSpacing="-0.75">0</text>
      <text x="820" y="354" fontFamily="var(--font-mono)" fontSize="9" fill="var(--ink-30)">/ 0 tot</text>

      {/* Revenue $+ pills */}
      <rect x="590" y="400" width="60" height="24" rx="12" fill="rgba(30,111,255,0.12)" stroke="rgba(30,111,255,0.35)" strokeWidth="0.75" />
      <text x="620" y="416" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fill="var(--ink)" fontWeight="500">+$1.00</text>

      <rect x="670" y="400" width="60" height="24" rx="12" fill="rgba(30,111,255,0.12)" stroke="rgba(30,111,255,0.35)" strokeWidth="0.75" />
      <text x="700" y="416" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fill="var(--ink)" fontWeight="500">+$1.00</text>

      <rect x="750" y="400" width="60" height="24" rx="12" fill="rgba(30,111,255,0.12)" stroke="rgba(30,111,255,0.35)" strokeWidth="0.75" />
      <text x="780" y="416" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fill="var(--ink)" fontWeight="500">+$1.00</text>

      <text x="804" y="448" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8" fill="var(--ink-30)" letterSpacing="1">people pay per call to use it</text>
      <text x="804" y="468" textAnchor="middle" fontFamily="var(--font-sans)" fontSize="9.5" fill="var(--ink-60)">Anyone can pay per call to talk to it. Every call pays the agent.</text>
    </svg>
  );
}

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
    const onLeave = () => { el.style.transform = "perspective(1400px) rotateY(0deg) rotateX(0deg)"; };

    window.addEventListener("mousemove", onMove, { passive: true });
    el.addEventListener("mouseleave", onLeave);
    return () => { window.removeEventListener("mousemove", onMove); el.removeEventListener("mouseleave", onLeave); };
  }, []);

  return (
    <section id="product" className="section-pad" style={{ background: "var(--ivory-dark)" }} aria-labelledby="product-heading">
      <div className="container-wide">
        <div style={{ display: "flex", flexDirection: "column", gap: "clamp(0.5rem, 1vw, 0.75rem)", marginBottom: "2.5rem" }}>
          <AnimatedReveal>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.5625rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ink-30)" }}>the application</span>
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
            style={{ transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1)", willChange: "transform", boxShadow: "0 24px 64px rgba(0,0,0,0.1), 0 4px 16px rgba(0,0,0,0.05)" }}
          >
            <div className="browser-chrome">
              <span className="browser-dot" /><span className="browser-dot" /><span className="browser-dot" />
              <div style={{ flex: 1, margin: "0 0.75rem", height: "16px", background: "var(--ink-06)", borderRadius: "2px", maxWidth: "240px", display: "flex", alignItems: "center", paddingLeft: "0.5rem" }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.5rem", letterSpacing: "0.08em", color: "var(--ink-30)" }}>app.luma.xyz/markets</span>
              </div>
            </div>
            <MarketsScreenSVG />
          </div>
        </AnimatedReveal>

        <AnimatedReveal delay={2}>
          <p style={{ marginTop: "1rem", textAlign: "center", fontFamily: "var(--font-mono)", fontSize: "0.5625rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--ink-30)" }}>
            LUMA Markets · Agent Exchange · Every payment settles on chain
          </p>
        </AnimatedReveal>
      </div>

      <style>{`
        @media (min-width: 640px) { .sm-row-between { flex-direction: row !important; align-items: flex-end !important; justify-content: space-between !important; } }
      `}</style>
    </section>
  );
}
