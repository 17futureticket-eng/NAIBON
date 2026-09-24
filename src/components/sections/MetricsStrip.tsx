"use client";

import { useEffect, useRef, useState } from "react";

interface Metric {
  raw: number;
  prefix?: string;
  suffix?: string;
  label: string;
  sub: string;
  decimals?: number;
}

const METRICS: Metric[] = [
  { raw: 24,        prefix: "",   suffix: "",   label: "Agents Listed",   sub: "12 active",            decimals: 0 },
  { raw: 148620,    prefix: "$",  suffix: "",   label: "Paid Total",      sub: "cumulative revenue",   decimals: 0 },
  { raw: 3841,      prefix: "",   suffix: "",   label: "Calls Today",     sub: "inference requests",   decimals: 0 },
  { raw: 214,       prefix: "",   suffix: "",   label: "Agent to Agent",  sub: "a→a routing",          decimals: 0 },
  { raw: 0.10,      prefix: "$",  suffix: "",   label: "Per Call",        sub: "avg revenue model",    decimals: 2 },
];

function formatVal(raw: number, prefix = "", suffix = "", decimals = 0): string {
  if (decimals > 0) return `${prefix}${raw.toFixed(decimals)}${suffix}`;
  if (raw >= 1_000_000) return `${prefix}${(raw / 1_000_000).toFixed(1)}M${suffix}`;
  if (raw >= 1_000) return `${prefix}${(raw / 1_000).toFixed(1)}k${suffix}`;
  return `${prefix}${raw}${suffix}`;
}

function MetricCell({ metric, index }: { metric: Metric; index: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const fired = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !fired.current) {
        fired.current = true;
        const start = performance.now();
        const duration = 1200 + index * 120;
        const step = () => {
          const elapsed = performance.now() - start;
          const progress = Math.min(elapsed / duration, 1);
          const ease = 1 - Math.pow(1 - progress, 3);
          setCount(Math.round(ease * metric.raw * 100) / 100);
          if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      }
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [index, metric.raw]);

  return (
    <div
      ref={ref}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "1.75rem 1.5rem",
        borderRight: "1px solid var(--ink-10)",
        background: "rgba(255,255,255,0.6)",
        backdropFilter: "blur(4px)",
        transition: "background 0.2s ease",
      }}
      onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(30,111,255,0.04)")}
      onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.6)")}
    >
      <div style={{ marginBottom: "0.75rem" }}>
        <div
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 300,
            fontSize: "clamp(1.75rem, 3vw, 2.75rem)",
            letterSpacing: "-0.04em",
            lineHeight: 1,
            color: "var(--ink)",
          }}
        >
          {formatVal(count, metric.prefix, metric.suffix, metric.decimals ?? 0)}
        </div>
      </div>
      <div>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.5625rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ink)", fontWeight: 500 }}>
          {metric.label}
        </div>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.5rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ink-30)", marginTop: "0.25rem" }}>
          {metric.sub}
        </div>
      </div>
    </div>
  );
}

export default function MetricsStrip() {
  return (
    <section
      id="metrics"
      aria-label="Protocol metrics"
      style={{ background: "var(--ivory)", borderBottom: "1px solid var(--ink-10)" }}
    >
      <div className="container-wide">
        <div
          style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", borderTop: "1px solid var(--ink-10)" }}
          className="md-five-col"
        >
          {METRICS.map((m, i) => (
            <MetricCell key={m.label} metric={m} index={i} />
          ))}
        </div>
      </div>

      <style>{`
        @media (min-width: 640px)  { .md-five-col { grid-template-columns: repeat(3, 1fr) !important; } }
        @media (min-width: 900px)  { .md-five-col { grid-template-columns: repeat(5, 1fr) !important; } }
      `}</style>
    </section>
  );
}
