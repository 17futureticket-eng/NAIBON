"use client";

import { useEffect } from "react";
import Link from "next/link";
import { type Agent, fmtUSD, fmtNum, shortAddr } from "@/lib/agents";

interface Props {
  agent: Agent;
  onClose: () => void;
}

function CopyButton({ value }: { value: string }) {
  const copy = () => navigator.clipboard?.writeText(value).catch(() => {});
  return (
    <button
      onClick={copy}
      aria-label="Copy to clipboard"
      style={{ background: "none", border: "none", cursor: "pointer", padding: "2px", color: "var(--ink-30)", display: "inline-flex", alignItems: "center" }}
      title="Copy"
    >
      <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
        <rect x="4" y="4" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M2 8V2H8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    </button>
  );
}

export default function AgentDetailPanel({ agent, onClose }: Props) {
  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  // Lock scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{ position: "fixed", inset: 0, background: "rgba(14,14,12,0.45)", zIndex: 200, backdropFilter: "blur(2px)" }}
        aria-hidden="true"
      />

      {/* Panel */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label={`${agent.name} details`}
        style={{
          position: "fixed", top: 0, right: 0, bottom: 0,
          width: "min(520px, 100vw)",
          background: "var(--ivory)",
          borderLeft: "1px solid var(--ink-10)",
          zIndex: 201,
          overflow: "auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header */}
        <div style={{ padding: "1.25rem 1.5rem", borderBottom: "1px solid var(--ink-10)", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, background: "var(--ivory)", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <span className={`ticker-badge ${agent.isNew ? "ticker-badge-new" : agent.status === "ipo-open" ? "ticker-badge-ipo" : ""}`} style={{ fontSize: "0.75rem", padding: "0.3rem 0.625rem" }}>
              {agent.ticker}
            </span>
            <div>
              <div style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: "1rem", letterSpacing: "-0.02em", color: "var(--ink)" }}>{agent.name}</div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.5625rem", color: "var(--ink-30)", letterSpacing: "0.06em" }}>{agent.domain}</span>
                <CopyButton value={agent.domain} />
              </div>
            </div>
          </div>
          <button onClick={onClose} aria-label="Close panel" style={{ background: "none", border: "1px solid var(--ink-10)", borderRadius: "2px", cursor: "pointer", padding: "0.375rem 0.625rem", color: "var(--ink-60)", fontFamily: "var(--font-mono)", fontSize: "0.5625rem", letterSpacing: "0.1em" }}>
            ESC ✕
          </button>
        </div>

        {/* Body */}
        <div style={{ flex: 1, overflowY: "auto" }}>
          {/* Description */}
          <div style={{ padding: "1.25rem 1.5rem", borderBottom: "1px solid var(--ink-06)" }}>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.9375rem", lineHeight: 1.65, color: "var(--ink-60)" }}>{agent.description}</p>
          </div>

          {/* Key metrics */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", borderBottom: "1px solid var(--ink-10)" }}>
            {[
              { label: "Vault", val: fmtUSD(agent.vaultBalance) },
              { label: "Calls 24h", val: fmtNum(agent.calls24h) },
              { label: "Per call", val: `$${agent.pricePerCall.toFixed(2)}` },
            ].map((m, i) => (
              <div key={m.label} style={{ padding: "1rem 1.25rem", borderRight: i < 2 ? "1px solid var(--ink-10)" : "none" }}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.4375rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--ink-30)", marginBottom: "0.375rem" }}>{m.label}</div>
                <div style={{ fontFamily: "var(--font-sans)", fontWeight: 300, fontSize: "1.375rem", letterSpacing: "-0.03em", color: "var(--ink)" }}>{m.val}</div>
              </div>
            ))}
          </div>

          {/* Vault fill bar */}
          {agent.vaultBalance > 0 && (
            <div style={{ padding: "1.25rem 1.5rem", borderBottom: "1px solid var(--ink-06)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.5rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--ink-30)" }}>AGENT VAULT</span>
                <span style={{ fontFamily: "var(--font-sans)", fontWeight: 300, fontSize: "1.125rem", letterSpacing: "-0.03em", color: "var(--ink)" }}>{fmtUSD(agent.vaultBalance)}</span>
              </div>
              <div style={{ height: "12px", background: "var(--ink-06)", borderRadius: "2px" }}>
                <div style={{ height: "100%", width: "72%", background: "var(--acid)", borderRadius: "2px" }} />
              </div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.5rem", color: "var(--ink-30)", marginTop: "0.375rem", letterSpacing: "0.08em" }}>every paid call flows in and keeps growing</div>
            </div>
          )}

          {/* Action CTAs */}
          <div style={{ padding: "1.25rem 1.5rem", borderBottom: "1px solid var(--ink-10)", display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            <button className="btn btn-primary" style={{ flex: 1 }}>
              Call this agent →
            </button>
            {agent.status === "ipo-open" || agent.sharesAvailable > 0 ? (
              <button className="btn btn-ghost" style={{ flex: 1 }}>
                Buy a share
              </button>
            ) : null}
          </div>

          {/* AGENT / DOMAIN info */}
          <div style={{ padding: "1.25rem 1.5rem", borderBottom: "1px solid var(--ink-06)" }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.5rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ink-30)", marginBottom: "0.875rem" }}>IDENTITY</div>
            {[
              { k: "Domain", v: agent.domain },
              { k: "Runtime", v: agent.runtime },
              { k: "iNFT Token", v: agent.inftTokenId ?? "pending" },
              { k: "Contract", v: agent.contractAddress ? shortAddr(agent.contractAddress) : "pending" },
              { k: "Share price", v: `$${agent.ipoSharePrice.toFixed(2)} USDC` },
              { k: "Shares avail.", v: agent.sharesAvailable > 0 ? fmtNum(agent.sharesAvailable) : "sold out" },
            ].map((row) => (
              <div key={row.k} style={{ display: "grid", gridTemplateColumns: "110px 1fr", padding: "0.375rem 0", borderBottom: "1px solid var(--ink-06)" }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.5625rem", color: "var(--ink-30)", letterSpacing: "0.08em" }}>{row.k}</span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.5625rem", color: "var(--ink)", letterSpacing: "0.05em", wordBreak: "break-all" }}>{row.v}</span>
              </div>
            ))}
          </div>

          {/* Recent calls */}
          {agent.recentCalls.length > 0 && (
            <div style={{ padding: "1.25rem 1.5rem", borderBottom: "1px solid var(--ink-06)" }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.5rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ink-30)", marginBottom: "0.875rem" }}>RECENT CALLS</div>
              {agent.recentCalls.map((call) => (
                <div key={call.txHash} style={{ display: "grid", gridTemplateColumns: "1fr auto auto", gap: "0.75rem", padding: "0.5rem 0", borderBottom: "1px solid var(--ink-06)", alignItems: "center" }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.5625rem", color: "var(--ink-60)", letterSpacing: "0.05em" }}>{call.txHash}</span>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.5625rem", color: "var(--ink-30)" }}>{call.timestamp}</span>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.5625rem", color: "var(--acid)", fontWeight: 500 }}>+${call.fee.toFixed(2)}</span>
                </div>
              ))}
            </div>
          )}

          {/* Top holders */}
          {agent.topHolders.length > 0 && (
            <div style={{ padding: "1.25rem 1.5rem", borderBottom: "1px solid var(--ink-06)" }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.5rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ink-30)", marginBottom: "0.875rem" }}>TOP HOLDERS</div>
              {agent.topHolders.map((holder) => (
                <div key={holder.address} style={{ display: "grid", gridTemplateColumns: "1fr auto auto", gap: "0.75rem", padding: "0.5rem 0", borderBottom: "1px solid var(--ink-06)", alignItems: "center" }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.5625rem", color: "var(--ink-60)" }}>{holder.address}</span>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.5625rem", color: "var(--ink-30)" }}>{fmtNum(holder.shares)} shares</span>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.5625rem", color: "var(--ink)" }}>{holder.pct.toFixed(1)}%</span>
                </div>
              ))}
            </div>
          )}

          {/* Tools */}
          {agent.tools.length > 0 && (
            <div style={{ padding: "1.25rem 1.5rem", borderBottom: "1px solid var(--ink-06)" }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.5rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ink-30)", marginBottom: "0.75rem" }}>TOOLS</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.375rem" }}>
                {agent.tools.map((t) => <span key={t} className="skill-badge">· {t}</span>)}
              </div>
            </div>
          )}

          {/* Manifest excerpt */}
          <div style={{ padding: "1.25rem 1.5rem" }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.5rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ink-30)", marginBottom: "0.75rem" }}>MANIFEST</div>
            <div className="manifest-panel" style={{ fontSize: "0.625rem" }}>
              <div style={{ padding: "0.625rem 1rem", display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                {[
                  ["ticker", agent.ticker],
                  ["price", `$${agent.pricePerCall.toFixed(2)} USDC / call`],
                  ["runtime", agent.runtime],
                  ["inft_token_id", agent.inftTokenId ?? "[pending]"],
                  ["Domain", agent.domain],
                ].map(([k, v]) => (
                  <div key={k} style={{ display: "grid", gridTemplateColumns: "100px 1fr" }}>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.5625rem", color: "var(--ink-30)" }}>{k}</span>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.5625rem", color: "var(--ink)", wordBreak: "break-all" }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ padding: "1rem 1.5rem", borderTop: "1px solid var(--ink-10)", display: "flex", gap: "0.625rem", background: "var(--ivory-dark)" }}>
          <Link href="/launch" className="btn btn-ghost" style={{ flex: 1, justifyContent: "center", fontSize: "0.8125rem" }}>
            Launch Similar
          </Link>
          <button onClick={onClose} className="btn btn-ghost" style={{ fontSize: "0.8125rem", padding: "0.75rem 1rem" }}>
            Close
          </button>
        </div>
      </aside>
    </>
  );
}
