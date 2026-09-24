"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import AgentDetailPanel from "./AgentDetailPanel";
import {
  MOCK_AGENTS,
  MOCK_METRICS,
  fmtUSD,
  fmtNum,
  type Agent,
  type Filter,
} from "@/lib/agents";

/* ─────────────────────────────────────────
   How You Earn auto-cycling widget
───────────────────────────────────────── */
const EARN_STEPS = [
  {
    id: "launch",
    label: "Launch",
    title: "$YIELD",
    sub: "People pay per call to use it",
    desc: "Anyone can pay per call to talk to the agent. Every call pays into the vault automatically.",
    body: null,
  },
  {
    id: "get-paid",
    label: "Get Paid",
    title: "AGENT VAULT",
    sub: "Every paid call flows in and keeps growing",
    desc: "Those payments pool in the agent's on chain vault. Real revenue, accumulating with every inference.",
    body: "$1,240",
  },
  {
    id: "vault",
    label: "Vault Fills",
    title: "VAULT FILLS",
    sub: "Revenue accumulates on chain",
    desc: "Each snapshot distributes to ShareToken holders. pro rata, automatic, verifiable on chain.",
    body: null,
  },
  {
    id: "ipo",
    label: "IPO",
    title: "IPO OPEN",
    sub: "Buy shares, earn forever",
    desc: "Buy ShareTokens at the IPO price. Each call earns you a slice of the vault, forever.",
    body: null,
  },
];

function EarnWidget() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setActive((a) => (a + 1) % EARN_STEPS.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [paused]);

  const step = EARN_STEPS[active];

  return (
    <div
      style={{ border: "1px solid var(--ink-10)", borderRadius: "8px", overflow: "hidden", background: "var(--ivory)" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div style={{ display: "flex", borderBottom: "1px solid var(--ink-10)", overflowX: "auto" }}>
        {EARN_STEPS.map((s, i) => {
          const isActive = i === active;
          const isDone = i < active;
          return (
            <button
              key={s.id}
              onClick={() => { setActive(i); setPaused(true); }}
              aria-pressed={isActive}
              style={{
                display: "flex", alignItems: "center", gap: "0.375rem",
                padding: "0.625rem 0.875rem",
                fontFamily: "var(--font-mono)", fontSize: "0.5625rem",
                letterSpacing: "0.1em", textTransform: "lowercase",
                background: isActive ? "linear-gradient(145deg, #2E7FFF 0%, #1558E0 100%)" : "transparent",
                color: isActive ? "#fff" : isDone ? "var(--ink-60)" : "var(--ink-30)",
                border: "none", cursor: "pointer",
                borderRight: "1px solid var(--ink-10)",
                whiteSpace: "nowrap",
                transition: "background 0.25s ease, color 0.25s ease",
                position: "relative",
              }}
            >
              <span style={{
                width: "18px", height: "18px", borderRadius: "3px",
                background: isActive ? "rgba(255,255,255,0.18)" : isDone ? "rgba(30,111,255,0.15)" : "var(--ink-06)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "0.5rem", fontWeight: 700,
                color: isActive ? "#fff" : isDone ? "var(--acid)" : "var(--ink-30)",
                flexShrink: 0,
                border: isActive ? "1px solid rgba(255,255,255,0.25)" : "none",
              }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              {s.label}
              {isActive && !paused && (
                <span key={`bar-${active}`} style={{
                  position: "absolute", bottom: 0, left: 0,
                  height: "2px", background: "rgba(255,255,255,0.55)",
                  animation: "earnProgress 3s linear forwards",
                }} />
              )}
            </button>
          );
        })}
      </div>

      <div style={{ padding: "1.375rem 1.375rem 1rem" }}>
        <div style={{ textAlign: "center", marginBottom: "1rem" }}>
          <div style={{ fontFamily: "var(--font-sans)", fontWeight: 300, fontSize: "1.875rem", letterSpacing: "-0.04em", color: "var(--ink)", marginBottom: "0.625rem", transition: "opacity 0.3s ease" }}>
            {step.body ?? step.title}
          </div>

          {active === 0 && (
            <div style={{ display: "flex", gap: "0.375rem", justifyContent: "center", marginBottom: "0.625rem" }}>
              {["+$1.00", "+$1.00", "+$1.00"].map((v, i) => (
                <span key={i} style={{ padding: "0.2rem 0.625rem", borderRadius: "100px", background: "rgba(30,111,255,0.10)", border: "1px solid rgba(30,111,255,0.28)", fontFamily: "var(--font-mono)", fontSize: "0.625rem", color: "var(--acid)", fontWeight: 600, animation: `fadeSlideUp 0.4s ease ${i * 0.12}s both` }}>{v}</span>
              ))}
            </div>
          )}
          {active === 1 && (
            <div style={{ margin: "0.75rem auto", width: "100%", maxWidth: "220px" }}>
              <div style={{ height: "14px", background: "var(--ink-06)", borderRadius: "4px", overflow: "hidden" }}>
                <div style={{ height: "100%", width: "72%", background: "linear-gradient(90deg, #1E6FFF 0%, #3D8BFF 100%)", borderRadius: "4px", boxShadow: "0 0 12px rgba(30,111,255,0.4)", animation: "expandBar 0.8s ease both" }} />
              </div>
            </div>
          )}
          {active === 2 && (
            <div style={{ display: "flex", gap: "0.5rem", justifyContent: "center", marginBottom: "0.625rem" }}>
              {["Snapshot #1,241", "Snapshot #1,242", "Snapshot #1,243"].map((v, i) => (
                <span key={i} style={{ padding: "0.2rem 0.5rem", borderRadius: "3px", background: "var(--ink-06)", border: "1px solid var(--ink-10)", fontFamily: "var(--font-mono)", fontSize: "0.5rem", color: "var(--ink-60)", letterSpacing: "0.06em", animation: `fadeSlideUp 0.4s ease ${i * 0.1}s both` }}>{v}</span>
              ))}
            </div>
          )}
          {active === 3 && (
            <div style={{ display: "flex", gap: "0.5rem", justifyContent: "center", alignItems: "center", marginBottom: "0.625rem" }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.625rem", color: "var(--ink-30)", letterSpacing: "0.1em" }}>SHARE PRICE</span>
              <span style={{ fontFamily: "var(--font-sans)", fontWeight: 500, fontSize: "1rem", color: "var(--ink)", letterSpacing: "-0.02em" }}>$0.10 USDC</span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.5625rem", color: "var(--acid)", background: "rgba(30,111,255,0.08)", border: "1px solid rgba(30,111,255,0.2)", padding: "0.15rem 0.4rem", borderRadius: "3px" }}>OPEN</span>
            </div>
          )}

          <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.5625rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ink-30)" }}>{step.sub}</p>
        </div>

        <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.875rem", lineHeight: 1.65, color: "var(--ink-60)", borderTop: "1px solid var(--ink-06)", paddingTop: "0.875rem" }}>{step.desc}</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", borderTop: "1px solid var(--ink-10)" }}>
        <div style={{ padding: "0.875rem 1rem", borderRight: "1px solid var(--ink-10)" }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.4375rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ink-30)", marginBottom: "0.25rem" }}>FLOW TODAY</div>
          <div style={{ fontFamily: "var(--font-sans)", fontWeight: 300, fontSize: "1.25rem", letterSpacing: "-0.03em", color: "var(--ink)" }}>$148.6k</div>
        </div>
        <div style={{ padding: "0.875rem 1rem" }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.4375rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ink-30)", marginBottom: "0.25rem" }}>A TO A CALLS</div>
          <div style={{ fontFamily: "var(--font-sans)", fontWeight: 300, fontSize: "1.25rem", letterSpacing: "-0.03em", color: "var(--ink)" }}>214{" "}<span style={{ fontFamily: "var(--font-mono)", fontSize: "0.5625rem", color: "var(--ink-30)" }}>/ 3,841 tot</span></div>
        </div>
      </div>

      <style>{`
        @keyframes earnProgress { from { width: 0%; } to { width: 100%; } }
        @keyframes fadeSlideUp { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes expandBar { from { width: 0%; } to { width: 72%; } }
      `}</style>
    </div>
  );
}

/* ─────────────────────────────────────────
   Status dot
───────────────────────────────────────── */
function StatusDot({ status }: { status: Agent["status"] }) {
  const colors: Record<Agent["status"], string> = {
    "active": "#22c55e",
    "ipo-open": "#f59e0b",
    "pending": "#94a3b8",
    "paused": "#ef4444",
  };
  return (
    <span style={{
      display: "inline-block", width: "6px", height: "6px",
      borderRadius: "50%", background: colors[status],
      boxShadow: status === "active" ? `0 0 6px ${colors[status]}66` : "none",
      flexShrink: 0,
    }} aria-hidden="true" />
  );
}

/* ─────────────────────────────────────────
   Dashboard agent row
───────────────────────────────────────── */
function AgentRow({ agent, onClick }: { agent: Agent; onClick: () => void }) {
  const isIPO = agent.status === "ipo-open";
  const revenueMax = 4000;
  const revPct = Math.min((agent.cumulativeRevenue / revenueMax) * 100, 100);

  return (
    <tr
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") onClick(); }}
      className="agent-row"
    >
      {/* Ticker */}
      <td style={{ paddingLeft: "1.25rem", width: "120px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
          <StatusDot status={agent.status} />
          <span style={{
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            minWidth: "52px", padding: "0.2rem 0.45rem", borderRadius: "4px",
            fontFamily: "var(--font-mono)", fontSize: "0.625rem", fontWeight: 700,
            letterSpacing: "0.1em", textTransform: "uppercase",
            background: isIPO
              ? "rgba(245,158,11,0.12)"
              : agent.isNew
              ? "rgba(30,111,255,0.10)"
              : "rgba(10,14,26,0.06)",
            border: `1px solid ${isIPO ? "rgba(245,158,11,0.3)" : agent.isNew ? "rgba(30,111,255,0.22)" : "rgba(10,14,26,0.12)"}`,
            color: isIPO ? "#92620a" : agent.isNew ? "#1E6FFF" : "var(--ink)",
          }}>
            {agent.ticker}
          </span>
          {agent.isNew && (
            <span style={{
              fontFamily: "var(--font-mono)", fontSize: "0.4rem", letterSpacing: "0.12em",
              textTransform: "uppercase", color: "#1E6FFF",
              background: "rgba(30,111,255,0.08)", border: "1px solid rgba(30,111,255,0.16)",
              padding: "0.1rem 0.3rem", borderRadius: "2px",
            }}>NEW</span>
          )}
          {isIPO && (
            <span style={{
              fontFamily: "var(--font-mono)", fontSize: "0.4rem", letterSpacing: "0.12em",
              textTransform: "uppercase", color: "#92620a",
              background: "rgba(245,158,11,0.09)", border: "1px solid rgba(245,158,11,0.24)",
              padding: "0.1rem 0.3rem", borderRadius: "2px",
            }}>IPO</span>
          )}
        </div>
      </td>

      {/* Agent name + domain */}
      <td style={{ minWidth: "180px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.15rem" }}>
          <span style={{
            fontFamily: "var(--font-sans)", fontSize: "0.9375rem", fontWeight: 600,
            color: "var(--ink)", letterSpacing: "-0.02em", lineHeight: 1.2,
          }}>
            {agent.name}
          </span>
          <span style={{
            fontFamily: "var(--font-mono)", fontSize: "0.475rem",
            color: "var(--ink-30)", letterSpacing: "0.06em",
          }}>
            {agent.domain}
          </span>
        </div>
      </td>

      {/* Runtime */}
      <td style={{ width: "90px" }}>
        <span style={{
          display: "inline-flex", alignItems: "center", padding: "0.2rem 0.5rem",
          borderRadius: "3px",
          background: agent.runtime === "hermes" ? "rgba(30,111,255,0.07)" : "rgba(10,14,26,0.05)",
          border: `1px solid ${agent.runtime === "hermes" ? "rgba(30,111,255,0.18)" : "rgba(10,14,26,0.1)"}`,
          fontFamily: "var(--font-mono)", fontSize: "0.5rem", letterSpacing: "0.1em",
          color: agent.runtime === "hermes" ? "#1E6FFF" : "var(--ink-60)",
        }}>
          {agent.runtime}
        </span>
      </td>

      {/* Price / Share */}
      <td style={{ width: "110px" }}>
        <span style={{
          fontFamily: "var(--font-sans)", fontSize: "0.9375rem", fontWeight: 700,
          color: "var(--ink)", letterSpacing: "-0.03em",
        }}>
          ${agent.ipoSharePrice.toFixed(2)}
        </span>
      </td>

      {/* Rev / Call */}
      <td style={{ width: "100px" }}>
        <span style={{
          fontFamily: "var(--font-sans)", fontSize: "0.875rem",
          color: "var(--ink-60)", letterSpacing: "-0.01em",
        }}>
          ${agent.pricePerCall.toFixed(2)}
        </span>
      </td>

      {/* Cumulative Revenue + bar */}
      <td style={{ width: "160px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
          <span style={{
            fontFamily: "var(--font-sans)", fontSize: "0.9375rem", fontWeight: 700,
            color: agent.cumulativeRevenue > 0 ? "var(--ink)" : "var(--ink-30)",
            letterSpacing: "-0.025em",
          }}>
            {fmtUSD(agent.cumulativeRevenue)}
          </span>
          {agent.cumulativeRevenue > 0 && (
            <div style={{ width: "64px", height: "3px", background: "var(--ink-06)", borderRadius: "2px", overflow: "hidden" }}>
              <div style={{
                height: "100%",
                width: `${revPct}%`,
                background: "linear-gradient(90deg, #1E6FFF 0%, #5AA0FF 100%)",
                borderRadius: "2px",
              }} />
            </div>
          )}
        </div>
      </td>

      {/* Calls 24h */}
      <td style={{ width: "100px", paddingRight: "1.25rem" }}>
        <div style={{ display: "flex", flex: "column", alignItems: "flex-start", gap: "0.15rem" }}>
          <span style={{
            fontFamily: "var(--font-mono)", fontSize: "0.875rem",
            fontWeight: agent.calls24h > 200 ? 600 : 400,
            color: agent.calls24h > 0 ? "var(--ink)" : "var(--ink-30)",
            letterSpacing: "-0.01em",
          }}>
            {fmtNum(agent.calls24h)}
          </span>
        </div>
      </td>

      {/* Action */}
      <td style={{ paddingRight: "1.25rem", width: "90px" }}>
        <span className="row-action-btn">
          View →
        </span>
      </td>
    </tr>
  );
}

/* ─────────────────────────────────────────
   Summary stat card
───────────────────────────────────────── */
function StatCard({ label, value, sub, accent }: { label: string; value: string; sub?: string; accent?: boolean }) {
  return (
    <div style={{
      padding: "1rem 1.25rem",
      background: "var(--ivory)",
      border: "1px solid var(--ink-10)",
      borderRadius: "8px",
      display: "flex",
      flexDirection: "column",
      gap: "0.25rem",
    }}>
      <span style={{
        fontFamily: "var(--font-mono)", fontSize: "0.4375rem",
        letterSpacing: "0.14em", textTransform: "uppercase",
        color: "var(--ink-30)",
      }}>{label}</span>
      <span style={{
        fontFamily: "var(--font-sans)", fontWeight: 300,
        fontSize: "1.625rem", letterSpacing: "-0.04em", lineHeight: 1,
        color: accent ? "#1E6FFF" : "var(--ink)",
      }}>{value}</span>
      {sub && <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.4375rem", color: "var(--ink-30)", letterSpacing: "0.08em" }}>{sub}</span>}
    </div>
  );
}

/* ─────────────────────────────────────────
   Main page
───────────────────────────────────────── */
export default function MarketsClient() {
  const [filter, setFilter] = useState<Filter>("all");
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);

  const filtered =
    filter === "all" ? MOCK_AGENTS
    : filter === "hermes" ? MOCK_AGENTS.filter((a) => a.runtime === "hermes")
    : filter === "raw" ? MOCK_AGENTS.filter((a) => a.runtime === "raw")
    : MOCK_AGENTS.filter((a) => a.status === "ipo-open");

  return (
    <div style={{ minHeight: "100vh", background: "#F0F2F5" }}>
      <Navbar />

      <main style={{ paddingTop: "var(--nav-h)" }}>
        <div style={{ maxWidth: "1440px", margin: "0 auto", padding: "0 clamp(1rem, 3vw, 2.5rem)" }}>

          {/* ── Page header ── */}
          <div style={{ padding: "2rem 0 1.5rem", display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }} className="markets-page-header">
            <div>
              <span style={{
                fontFamily: "var(--font-mono)", fontSize: "0.5rem", letterSpacing: "0.18em",
                textTransform: "uppercase", color: "var(--ink-30)", display: "block", marginBottom: "0.375rem",
              }}>
                LUMA · MARKETS
              </span>
              <h1 style={{
                fontFamily: "var(--font-display)", fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                fontWeight: 400, letterSpacing: "-0.03em", lineHeight: 1.05,
                color: "var(--ink)", margin: 0,
              }}>
                Agent Market Index
              </h1>
            </div>
            <div style={{ display: "flex", gap: "0.625rem", flexWrap: "wrap" }} className="header-btns">
              <Link href="/launch" className="btn btn-ghost" style={{ fontSize: "0.8125rem", padding: "0.5rem 1rem" }}>
                + Launch agent
              </Link>
              <Link href="/markets" className="btn btn-primary" style={{ fontSize: "0.8125rem", padding: "0.5rem 1.125rem" }}>
                Submit inference →
              </Link>
            </div>
          </div>

          {/* ── Stats row ── */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0.75rem", marginBottom: "1.5rem" }} className="stats-grid">
            <StatCard label="Agents Listed" value={String(MOCK_METRICS.agentsListed)} sub={`${MOCK_METRICS.agentsActive} active`} />
            <StatCard label="Cumulative Revenue" value={fmtUSD(MOCK_METRICS.paidTotal)} accent />
            <StatCard label="Calls Today" value={fmtNum(MOCK_METRICS.callsToday)} sub="across all agents" />
            <StatCard label="Agent-to-Agent" value={fmtNum(MOCK_METRICS.agentToAgent)} sub="autonomous calls" />
          </div>

          {/* ── Main grid: table + sidebar ── */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1.25rem", alignItems: "start" }} className="dashboard-grid">

            {/* ── LEFT: Agent table dashboard ── */}
            <div className="table-col">
              <div style={{
                background: "var(--ivory)",
                border: "1px solid var(--ink-10)",
                borderRadius: "10px",
                overflow: "hidden",
                boxShadow: "0 1px 3px rgba(10,14,26,0.06), 0 4px 16px rgba(10,14,26,0.04)",
              }}>
                {/* Table toolbar */}
                <div style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "0.75rem 1.25rem",
                  background: "linear-gradient(to bottom, rgba(10,14,26,0.05) 0%, rgba(10,14,26,0.02) 100%)",
                  borderBottom: "1px solid var(--ink-10)",
                  gap: "1rem", flexWrap: "wrap",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
                    {/* Live dot */}
                    <span style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem" }}>
                      <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 6px #22c55e66", display: "inline-block" }} />
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.4375rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ink-30)" }}>LIVE</span>
                    </span>
                    <span style={{ width: "1px", height: "12px", background: "var(--ink-10)", display: "inline-block" }} />
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.5rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ink-30)" }}>
                      THE AGENTS ·{" "}
                      <span style={{ color: "var(--acid)" }}>NEW</span> = launched via{" "}
                      <Link href="/launch" style={{ color: "var(--acid)", textDecoration: "none" }}>LUMA</Link>
                    </span>
                  </div>

                  {/* Filter tabs */}
                  <div className="filter-pill-group" style={{ display: "flex", gap: "0.25rem", background: "rgba(10,14,26,0.04)", padding: "0.2rem", borderRadius: "6px", border: "1px solid var(--ink-10)", flexWrap: "wrap" }}>
                    {(["all", "hermes", "raw", "ipo-open"] as Filter[]).map((f) => (
                      <button
                        key={f}
                        onClick={() => setFilter(f)}
                        aria-pressed={filter === f}
                        style={{
                          padding: "0.25rem 0.75rem",
                          fontFamily: "var(--font-mono)", fontSize: "0.5rem",
                          letterSpacing: "0.1em", textTransform: "uppercase",
                          border: "none", borderRadius: "4px", cursor: "pointer",
                          background: filter === f ? "var(--ivory)" : "transparent",
                          color: filter === f ? "var(--ink)" : "var(--ink-30)",
                          fontWeight: filter === f ? 600 : 400,
                          boxShadow: filter === f ? "0 1px 3px rgba(10,14,26,0.1)" : "none",
                          transition: "all 0.15s ease",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {f === "ipo-open" ? "IPO OPEN" : f.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Table */}
                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", minWidth: "760px", borderCollapse: "collapse" }}>
                    <thead>
                      <tr style={{ background: "rgba(10,14,26,0.035)", borderBottom: "1px solid var(--ink-10)" }}>
                        {[
                          { label: "TICKER",        pl: "1.25rem" },
                          { label: "AGENT",         pl: undefined },
                          { label: "RUNTIME",       pl: undefined },
                          { label: "PRICE / SHARE", pl: undefined },
                          { label: "REV / CALL",    pl: undefined },
                          { label: "CUM. REVENUE",  pl: undefined },
                          { label: "CALLS 24H",     pl: undefined },
                          { label: "",              pl: undefined },
                        ].map((col) => (
                          <th key={col.label} style={{
                            paddingTop: "0.625rem", paddingBottom: "0.625rem",
                            paddingLeft: col.pl ?? "0.75rem",
                            paddingRight: "0.75rem",
                            fontFamily: "var(--font-mono)", fontSize: "0.4375rem",
                            letterSpacing: "0.14em", textTransform: "uppercase",
                            color: "var(--ink-30)", fontWeight: 500,
                            textAlign: "left", whiteSpace: "nowrap",
                          }}>
                            {col.label}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.length === 0 ? (
                        <tr>
                          <td colSpan={8} style={{ textAlign: "center", padding: "3.5rem 1rem", fontFamily: "var(--font-sans)", fontSize: "0.9375rem", color: "var(--ink-30)" }}>
                            No agents found.{" "}
                            <Link href="/launch" style={{ color: "var(--acid)", textDecoration: "none" }}>Launch one →</Link>
                          </td>
                        </tr>
                      ) : (
                        filtered.map((agent) => (
                          <AgentRow key={agent.ticker} agent={agent} onClick={() => setSelectedAgent(agent)} />
                        ))
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Table footer */}
                <div style={{
                  padding: "0.625rem 1.25rem",
                  borderTop: "1px solid var(--ink-06)",
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  background: "rgba(10,14,26,0.02)",
                }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.4375rem", letterSpacing: "0.1em", color: "var(--ink-30)" }}>
                    {filtered.length} AGENT{filtered.length !== 1 ? "S" : ""} · CLICK ANY ROW FOR VAULT, HOLDERS & RECENT CALLS
                  </span>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.4375rem", letterSpacing: "0.1em", color: "var(--ink-30)" }}>
                    SOLANA MAINNET-BETA
                  </span>
                </div>
              </div>

              {/* ── Two ways to interact ── */}
              <div style={{ marginTop: "1.25rem" }}>
                <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.5rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ink-30)", marginBottom: "0.75rem" }}>
                  TWO WAYS TO INTERACT · Shareholders earn from inference
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }} className="interact-grid-dash">
                  {[
                    {
                      icon: <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"><circle cx="6" cy="6" r="5" stroke="#1E6FFF" strokeWidth="1.2"/><circle cx="6" cy="6" r="2" fill="#1E6FFF"/></svg>,
                      label: "CALL AN AGENT",
                      headline: "Pay per call, get a TEE attested response",
                      body: "Settle in USDC. The vault accumulates; the agent runs; you get back a signed receipt.",
                      cta: "Browse agents →",
                      href: "/markets",
                    },
                    {
                      icon: <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"><rect x="1" y="1" width="10" height="10" rx="1.5" stroke="#1E6FFF" strokeWidth="1.2"/><path d="M4 6H8M6 4V8" stroke="#1E6FFF" strokeWidth="1.2" strokeLinecap="round"/></svg>,
                      label: "BUY A SHARE",
                      headline: "Mint ShareTokens and earn pro rata revenue",
                      body: "Every agent has its own ShareToken (1M cap). Every call into the vault is snapshotted and paid out to holders.",
                      cta: "Launch your own →",
                      href: "/launch",
                    },
                  ].map((card) => (
                    <div key={card.label} style={{
                      padding: "1.125rem 1.25rem",
                      background: "var(--ivory)",
                      border: "1px solid var(--ink-10)",
                      borderRadius: "8px",
                      display: "flex", flexDirection: "column", gap: "0.5rem",
                    }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        {card.icon}
                        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.4375rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#1E6FFF" }}>{card.label}</span>
                      </div>
                      <h3 style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: "0.9375rem", letterSpacing: "-0.02em", color: "var(--ink)", margin: 0, lineHeight: 1.3 }}>{card.headline}</h3>
                      <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.8125rem", lineHeight: 1.6, color: "var(--ink-60)", margin: 0 }}>{card.body}</p>
                      <Link href={card.href} style={{ fontFamily: "var(--font-mono)", fontSize: "0.625rem", letterSpacing: "0.08em", color: "#1E6FFF", textDecoration: "none", marginTop: "0.25rem" }}>{card.cta}</Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── RIGHT: Earn widget ── */}
            <div className="earn-sidebar">
              <div style={{ position: "sticky", top: "calc(var(--nav-h) + 1.25rem)", display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.4375rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--ink-30)" }}>HOW YOU EARN FROM AN AGENT</span>
                <EarnWidget />

                {/* Mini launch CTA */}
                <div style={{
                  padding: "1rem 1.25rem",
                  background: "linear-gradient(135deg, rgba(30,111,255,0.07) 0%, rgba(30,111,255,0.03) 100%)",
                  border: "1px solid rgba(30,111,255,0.18)",
                  borderRadius: "8px",
                  display: "flex", flexDirection: "column", gap: "0.625rem",
                }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.4375rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#1E6FFF" }}>LAUNCH YOUR AGENT</span>
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.8125rem", lineHeight: 1.55, color: "var(--ink-60)", margin: 0 }}>
                    Deploy a TEE-verified agent in minutes. Set your price, distribute shares, earn forever.
                  </p>
                  <Link href="/launch" className="btn btn-primary" style={{ fontSize: "0.8125rem", justifyContent: "center", textAlign: "center" }}>
                    Launch now →
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div style={{ paddingBottom: "3rem" }} />
        </div>
      </main>

      {selectedAgent && <AgentDetailPanel agent={selectedAgent} onClose={() => setSelectedAgent(null)} />}

      <Footer />

      <style>{`
        /* dashboard layout */
        @media (min-width: 1100px) {
          .dashboard-grid { grid-template-columns: 1fr 340px !important; }
        }
        /* hide earn widget sidebar on mobile — show below table instead */
        @media (max-width: 1099px) {
          .earn-sidebar { order: 2; }
          .table-col    { order: 1; }
        }
        @media (max-width: 639px) {
          .interact-grid-dash { grid-template-columns: 1fr !important; }
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 400px) {
          .stats-grid { grid-template-columns: 1fr !important; }
        }

        /* agent table rows */
        .agent-row {
          cursor: pointer;
          border-bottom: 1px solid rgba(10,14,26,0.05);
          transition: background 0.12s ease;
        }
        .agent-row:last-child { border-bottom: none; }
        .agent-row:hover { background: rgba(30,111,255,0.04) !important; }
        .agent-row td {
          padding-top: 0.875rem;
          padding-bottom: 0.875rem;
          padding-left: 0.75rem;
          padding-right: 0.75rem;
          vertical-align: middle;
        }

        /* row action button */
        .row-action-btn {
          display: inline-flex;
          align-items: center;
          padding: 0.225rem 0.6rem;
          border: 1px solid var(--ink-10);
          border-radius: 4px;
          font-size: 0.5rem;
          letter-spacing: 0.1em;
          color: var(--ink-30);
          background: transparent;
          transition: border-color 0.15s ease, color 0.15s ease;
          white-space: nowrap;
          font-family: var(--font-mono);
        }
        .agent-row:hover .row-action-btn {
          border-color: rgba(30,111,255,0.4);
          color: #1E6FFF;
        }

        /* page header mobile */
        @media (max-width: 480px) {
          .markets-page-header { flex-direction: column !important; align-items: flex-start !important; }
          .markets-page-header .header-btns { width: 100%; }
          .markets-page-header .header-btns a { flex: 1; justify-content: center; }
        }

        /* filter tabs scroll on very small screens */
        @media (max-width: 420px) {
          .filter-pill-group { overflow-x: auto; flex-wrap: nowrap !important; }
        }
      `}</style>
    </div>
  );
}
