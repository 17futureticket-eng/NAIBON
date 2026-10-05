"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import AgentDetailPanel from "./AgentDetailPanel";
import {
  MOCK_AGENTS, MOCK_METRICS, fmtUSD, fmtNum,
  type Agent, type Filter,
} from "@/lib/agents";

/* ─── Earn widget ─────────────────────────────────────────── */
const EARN_STEPS = [
  { id: "launch",   label: "Launch",      title: "$YIELD",      body: null,     sub: "People pay per call to use it",             desc: "Anyone pays per call to talk to the agent. Every call pays into the vault automatically." },
  { id: "get-paid", label: "Get Paid",    title: "AGENT VAULT", body: "$1,240", sub: "Every paid call flows in and keeps growing", desc: "Payments pool in the agent's on-chain vault — real revenue, accumulating with every inference." },
  { id: "vault",    label: "Vault Fills", title: "VAULT FILLS", body: null,     sub: "Revenue accumulates on chain",               desc: "Each snapshot distributes to ShareToken holders. Pro rata, automatic, verifiable on chain." },
  { id: "ipo",      label: "IPO",         title: "IPO OPEN",    body: null,     sub: "Buy shares, earn forever",                  desc: "Buy ShareTokens at the IPO price. Each call earns you a slice of the vault, forever." },
];

function EarnWidget() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setActive(a => (a + 1) % EARN_STEPS.length), 3000);
    return () => clearInterval(t);
  }, [paused]);
  const step = EARN_STEPS[active];
  return (
    <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}
      style={{ background: "var(--onyx)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "12px", overflow: "hidden", width: "100%" }}>
      {/* Tabs */}
      <div style={{ display: "flex", borderBottom: "1px solid rgba(255,255,255,0.07)", overflowX: "auto" }}>
        {EARN_STEPS.map((s, i) => {
          const isA = i === active;
          return (
            <button key={s.id} onClick={() => { setActive(i); setPaused(true); }}
              style={{ flex: 1, padding: "0.625rem 0.375rem", border: "none", cursor: "pointer", fontFamily: "var(--font-mono)", fontSize: "0.475rem", letterSpacing: "0.08em", textTransform: "uppercase", whiteSpace: "nowrap", background: isA ? "rgba(30,111,255,0.18)" : "transparent", color: isA ? "#7AB8FF" : "rgba(255,255,255,0.2)", borderBottom: isA ? "2px solid #1E6FFF" : "2px solid transparent", transition: "all 0.2s ease", position: "relative" }}>
              {s.label}
              {isA && !paused && <span key={`p-${active}`} style={{ position: "absolute", bottom: 0, left: 0, height: "2px", background: "rgba(122,184,255,0.6)", animation: "earnProgress 3s linear forwards" }} />}
            </button>
          );
        })}
      </div>
      {/* Body */}
      <div style={{ padding: "1.25rem 1.125rem 0.875rem" }}>
        <div style={{ textAlign: "center", marginBottom: "0.875rem" }}>
          <div style={{ fontFamily: "var(--font-sans)", fontWeight: 200, fontSize: "1.75rem", letterSpacing: "-0.04em", color: "#fff", marginBottom: "0.625rem" }}>{step.body ?? step.title}</div>
          {active === 1 && (
            <div style={{ margin: "0.5rem auto", width: "100%", maxWidth: "200px" }}>
              <div style={{ height: "8px", background: "rgba(255,255,255,0.06)", borderRadius: "4px", overflow: "hidden" }}>
                <div style={{ height: "100%", width: "72%", background: "linear-gradient(90deg,#1E6FFF,#5AA0FF)", borderRadius: "4px", animation: "expandBar 0.8s ease both" }} />
              </div>
            </div>
          )}
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.475rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.22)" }}>{step.sub}</p>
        </div>
        <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.8125rem", lineHeight: 1.6, color: "rgba(255,255,255,0.42)", borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "0.75rem" }}>{step.desc}</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        {[{ label: "FLOW TODAY", value: "$148.6k" }, { label: "A→A CALLS", value: "214" }].map((m, i) => (
          <div key={m.label} style={{ padding: "0.75rem 1rem", borderRight: i === 0 ? "1px solid rgba(255,255,255,0.06)" : "none" }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.4rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.2)", marginBottom: "0.2rem" }}>{m.label}</div>
            <div style={{ fontFamily: "var(--font-sans)", fontWeight: 300, fontSize: "1.125rem", letterSpacing: "-0.03em", color: "#fff" }}>{m.value}</div>
          </div>
        ))}
      </div>
      <style>{`
        @keyframes earnProgress { from{width:0%} to{width:100%} }
        @keyframes expandBar    { from{width:0%} to{width:72%} }
      `}</style>
    </div>
  );
}

/* ─── Status dot ──────────────────────────────────────────── */
function StatusDot({ status }: { status: Agent["status"] }) {
  const c = { active: "#22c55e", "ipo-open": "#f59e0b", pending: "#94a3b8", paused: "#ef4444" }[status];
  return <span style={{ display: "inline-block", width: "6px", height: "6px", borderRadius: "50%", background: c, boxShadow: status === "active" ? `0 0 6px ${c}88` : "none", flexShrink: 0 }} aria-hidden="true" />;
}

/* ─── Desktop table row ───────────────────────────────────── */
function AgentRow({ agent, onClick }: { agent: Agent; onClick: () => void }) {
  const isIPO = agent.status === "ipo-open";
  const revPct = Math.min((agent.cumulativeRevenue / 4000) * 100, 100);
  return (
    <tr onClick={onClick} role="button" tabIndex={0} onKeyDown={e => { if (e.key === "Enter" || e.key === " ") onClick(); }} className="agent-row">
      <td style={{ paddingLeft: "1rem", width: "120px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.375rem" }}>
          <StatusDot status={agent.status} />
          <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", minWidth: "48px", padding: "0.175rem 0.4rem", borderRadius: "4px", fontFamily: "var(--font-mono)", fontSize: "0.5625rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", background: isIPO ? "rgba(245,158,11,0.12)" : agent.isNew ? "rgba(30,111,255,0.10)" : "rgba(255,255,255,0.06)", border: `1px solid ${isIPO ? "rgba(245,158,11,0.3)" : agent.isNew ? "rgba(30,111,255,0.22)" : "rgba(255,255,255,0.1)"}`, color: isIPO ? "#f59e0b" : agent.isNew ? "#7AB8FF" : "rgba(255,255,255,0.8)" }}>{agent.ticker}</span>
        </div>
      </td>
      <td>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.1rem" }}>
          <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.875rem", fontWeight: 600, color: "#fff", letterSpacing: "-0.02em" }}>{agent.name}</span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.45rem", color: "rgba(255,255,255,0.22)", letterSpacing: "0.06em" }}>{agent.domain}</span>
        </div>
      </td>
      <td><span style={{ display: "inline-flex", alignItems: "center", padding: "0.175rem 0.45rem", borderRadius: "3px", background: agent.runtime === "hermes" ? "rgba(30,111,255,0.12)" : "rgba(255,255,255,0.05)", border: `1px solid ${agent.runtime === "hermes" ? "rgba(30,111,255,0.25)" : "rgba(255,255,255,0.08)"}`, fontFamily: "var(--font-mono)", fontSize: "0.475rem", letterSpacing: "0.1em", color: agent.runtime === "hermes" ? "#7AB8FF" : "rgba(255,255,255,0.35)" }}>{agent.runtime}</span></td>
      <td><span style={{ fontFamily: "var(--font-sans)", fontSize: "0.875rem", fontWeight: 700, color: "#fff", letterSpacing: "-0.03em" }}>${agent.ipoSharePrice.toFixed(2)}</span></td>
      <td><span style={{ fontFamily: "var(--font-sans)", fontSize: "0.8125rem", color: "rgba(255,255,255,0.4)" }}>${agent.pricePerCall.toFixed(2)}</span></td>
      <td>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
          <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.875rem", fontWeight: 700, color: agent.cumulativeRevenue > 0 ? "#7AB8FF" : "rgba(255,255,255,0.2)", letterSpacing: "-0.025em" }}>{fmtUSD(agent.cumulativeRevenue)}</span>
          {agent.cumulativeRevenue > 0 && <div style={{ width: "56px", height: "2px", background: "rgba(255,255,255,0.06)", borderRadius: "2px", overflow: "hidden" }}><div style={{ height: "100%", width: `${revPct}%`, background: "linear-gradient(90deg,#1E6FFF,#5AA0FF)", borderRadius: "2px" }} /></div>}
        </div>
      </td>
      <td style={{ paddingRight: "1rem" }}><span style={{ fontFamily: "var(--font-mono)", fontSize: "0.8125rem", fontWeight: agent.calls24h > 200 ? 600 : 400, color: agent.calls24h > 0 ? "#fff" : "rgba(255,255,255,0.2)" }}>{fmtNum(agent.calls24h)}</span></td>
      <td style={{ paddingRight: "1rem" }}><span className="row-action-btn">View →</span></td>
    </tr>
  );
}

/* ─── Mobile agent card ───────────────────────────────────── */
function AgentCard({ agent, onClick }: { agent: Agent; onClick: () => void }) {
  const isIPO = agent.status === "ipo-open";
  return (
    <div onClick={onClick} role="button" tabIndex={0} onKeyDown={e => { if (e.key === "Enter") onClick(); }}
      style={{ padding: "1rem", borderBottom: "1px solid rgba(255,255,255,0.05)", cursor: "pointer", transition: "background 0.12s ease" }}
      onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "rgba(30,111,255,0.05)"}
      onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "transparent"}
    >
      {/* Top row: ticker + name + action */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.625rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <StatusDot status={agent.status} />
          <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "0.175rem 0.45rem", borderRadius: "4px", fontFamily: "var(--font-mono)", fontSize: "0.5625rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", background: isIPO ? "rgba(245,158,11,0.12)" : "rgba(255,255,255,0.06)", border: `1px solid ${isIPO ? "rgba(245,158,11,0.3)" : "rgba(255,255,255,0.1)"}`, color: isIPO ? "#f59e0b" : "rgba(255,255,255,0.8)" }}>{agent.ticker}</span>
          {isIPO && <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.4rem", color: "#f59e0b", background: "rgba(245,158,11,0.09)", border: "1px solid rgba(245,158,11,0.24)", padding: "0.1rem 0.3rem", borderRadius: "2px" }}>IPO</span>}
          {agent.isNew && <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.4rem", color: "#7AB8FF", background: "rgba(30,111,255,0.1)", border: "1px solid rgba(30,111,255,0.2)", padding: "0.1rem 0.3rem", borderRadius: "2px" }}>NEW</span>}
        </div>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.5rem", letterSpacing: "0.08em", color: "#7AB8FF", padding: "0.25rem 0.625rem", border: "1px solid rgba(30,111,255,0.25)", borderRadius: "4px" }}>View →</span>
      </div>
      {/* Agent name */}
      <div style={{ fontFamily: "var(--font-sans)", fontSize: "0.9375rem", fontWeight: 600, color: "#fff", letterSpacing: "-0.02em", marginBottom: "0.25rem" }}>{agent.name}</div>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.45rem", color: "rgba(255,255,255,0.22)", letterSpacing: "0.06em", marginBottom: "0.75rem" }}>{agent.domain}</div>
      {/* Stats row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.5rem" }}>
        {[
          { label: "Share price", value: `$${agent.ipoSharePrice.toFixed(2)}` },
          { label: "Rev/call",    value: `$${agent.pricePerCall.toFixed(2)}` },
          { label: "Calls 24h",  value: fmtNum(agent.calls24h) },
        ].map(m => (
          <div key={m.label} style={{ background: "rgba(255,255,255,0.03)", borderRadius: "6px", padding: "0.5rem 0.625rem" }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.4rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.2)", marginBottom: "0.2rem" }}>{m.label}</div>
            <div style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: "0.875rem", color: "#fff", letterSpacing: "-0.02em" }}>{m.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Stat card ───────────────────────────────────────────── */
function StatCard({ label, value, sub, accent }: { label: string; value: string; sub?: string; accent?: boolean }) {
  return (
    <div style={{ padding: "1rem 1.125rem", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "10px", display: "flex", flexDirection: "column", gap: "0.2rem", transition: "background 0.2s ease, border-color 0.2s ease" }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.055)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(30,111,255,0.25)"; }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.03)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)"; }}
    >
      <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.4rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.22)" }}>{label}</span>
      <span style={{ fontFamily: "var(--font-sans)", fontWeight: 300, fontSize: "clamp(1.25rem, 3vw, 1.75rem)", letterSpacing: "-0.04em", lineHeight: 1, color: accent ? "#7AB8FF" : "#fff" }}>{value}</span>
      {sub && <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.4rem", color: "rgba(255,255,255,0.18)", letterSpacing: "0.08em" }}>{sub}</span>}
    </div>
  );
}

/* ─── Main ────────────────────────────────────────────────── */
export default function MarketsClient() {
  const [filter, setFilter] = useState<Filter>("all");
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);

  const filtered =
    filter === "all"       ? MOCK_AGENTS :
    filter === "hermes"    ? MOCK_AGENTS.filter(a => a.runtime === "hermes") :
    filter === "raw"       ? MOCK_AGENTS.filter(a => a.runtime === "raw") :
    MOCK_AGENTS.filter(a => a.status === "ipo-open");

  return (
    <div style={{ minHeight: "100vh", background: "var(--onyx)", width: "100%", overflowX: "hidden" }}>
      <Navbar />

      <main style={{ paddingTop: "var(--nav-h)", width: "100%", overflowX: "hidden" }}>

        {/* ── Page header ── */}
        <div style={{ background: "linear-gradient(180deg,rgba(14,18,36,1) 0%,rgba(10,14,26,0.97) 100%)", borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "clamp(1.25rem,3vw,2.5rem) 0 clamp(1rem,2vw,2rem)" }}>
          <div style={{ maxWidth: "1440px", margin: "0 auto", padding: "0 clamp(1rem,3vw,2.5rem)", width: "100%", boxSizing: "border-box" }}>

            {/* Title + buttons */}
            <div className="markets-header-row" style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", marginBottom: "1.5rem" }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.625rem" }}>
                  <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 8px #22c55e", flexShrink: 0 }} />
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.475rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.28)" }}>LUMA · MARKETS · LIVE</span>
                </div>
                <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.5rem,3.5vw,2.75rem)", fontWeight: 400, letterSpacing: "-0.03em", lineHeight: 1.05, color: "#fff", margin: 0 }}>Agent Market Index</h1>
              </div>
              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                <Link href="/launch" style={{ fontFamily: "var(--font-sans)", fontSize: "0.8125rem", fontWeight: 500, padding: "0.5rem 1rem", borderRadius: "6px", border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.7)", textDecoration: "none" }}>+ Launch agent</Link>
                <Link href="/markets" style={{ fontFamily: "var(--font-sans)", fontSize: "0.8125rem", fontWeight: 600, padding: "0.5rem 1.125rem", borderRadius: "6px", background: "rgba(255,255,255,0.95)", color: "var(--ink)", textDecoration: "none" }}>Submit inference →</Link>
              </div>
            </div>

            {/* Stats */}
            <div className="stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "0.625rem" }}>
              <StatCard label="Agents Listed"      value={String(MOCK_METRICS.agentsListed)}  sub={`${MOCK_METRICS.agentsActive} active`} />
              <StatCard label="Cumulative Revenue" value={fmtUSD(MOCK_METRICS.paidTotal)}     accent />
              <StatCard label="Calls Today"        value={fmtNum(MOCK_METRICS.callsToday)}    sub="across all agents" />
              <StatCard label="Agent-to-Agent"     value={fmtNum(MOCK_METRICS.agentToAgent)}  sub="autonomous calls" />
            </div>
          </div>
        </div>

        {/* ── Main content ── */}
        <div style={{ maxWidth: "1440px", margin: "0 auto", padding: "1.25rem clamp(1rem,3vw,2.5rem) 4rem", width: "100%", boxSizing: "border-box" }}>
          <div className="dashboard-grid" style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1.25rem", alignItems: "start" }}>

            {/* ── LEFT: agent list ── */}
            <div className="table-col">
              <div style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "12px", overflow: "hidden", width: "100%" }}>

                {/* Toolbar */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.75rem 1rem", borderBottom: "1px solid rgba(255,255,255,0.06)", gap: "0.75rem", flexWrap: "wrap", background: "rgba(255,255,255,0.02)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 6px #22c55e88", flexShrink: 0 }} />
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.4375rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.22)" }}>LIVE</span>
                  </div>
                  {/* Filters */}
                  <div className="filter-pill-group" style={{ display: "flex", gap: "0.25rem", background: "rgba(255,255,255,0.04)", padding: "0.2rem", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.07)" }}>
                    {(["all","hermes","raw","ipo-open"] as Filter[]).map(f => (
                      <button key={f} onClick={() => setFilter(f)} aria-pressed={filter === f}
                        style={{ padding: "0.275rem 0.75rem", fontFamily: "var(--font-mono)", fontSize: "0.475rem", letterSpacing: "0.1em", textTransform: "uppercase", border: "none", borderRadius: "6px", cursor: "pointer", background: filter === f ? "rgba(30,111,255,0.25)" : "transparent", color: filter === f ? "#7AB8FF" : "rgba(255,255,255,0.28)", fontWeight: filter === f ? 600 : 400, transition: "all 0.15s ease", whiteSpace: "nowrap" }}>
                        {f === "ipo-open" ? "IPO" : f.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Desktop table */}
                <div className="agents-table-wrap">
                  <table style={{ width: "100%", minWidth: "680px", borderCollapse: "collapse" }}>
                    <thead>
                      <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                        {["TICKER","AGENT","RUNTIME","PRICE/SHARE","REV/CALL","CUM. REV","CALLS 24H",""].map((col,i) => (
                          <th key={col+i} style={{ padding: "0.5rem 0.75rem", paddingLeft: i===0?"1rem":"0.75rem", fontFamily: "var(--font-mono)", fontSize: "0.4rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.2)", fontWeight: 500, textAlign: "left", whiteSpace: "nowrap" }}>{col}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.length === 0
                        ? <tr><td colSpan={8} style={{ textAlign: "center", padding: "3rem 1rem", fontFamily: "var(--font-sans)", fontSize: "0.9375rem", color: "rgba(255,255,255,0.2)" }}>No agents found. <Link href="/launch" style={{ color: "#7AB8FF", textDecoration: "none" }}>Launch one →</Link></td></tr>
                        : filtered.map(agent => <AgentRow key={agent.ticker} agent={agent} onClick={() => setSelectedAgent(agent)} />)
                      }
                    </tbody>
                  </table>
                </div>

                {/* Mobile cards */}
                <div className="agents-card-wrap">
                  {filtered.length === 0
                    ? <div style={{ padding: "3rem 1rem", textAlign: "center", fontFamily: "var(--font-sans)", fontSize: "0.9375rem", color: "rgba(255,255,255,0.2)" }}>No agents. <Link href="/launch" style={{ color: "#7AB8FF", textDecoration: "none" }}>Launch one →</Link></div>
                    : filtered.map(agent => <AgentCard key={agent.ticker} agent={agent} onClick={() => setSelectedAgent(agent)} />)
                  }
                </div>

                {/* Footer */}
                <div style={{ padding: "0.5rem 1rem", borderTop: "1px solid rgba(255,255,255,0.04)", display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(255,255,255,0.01)" }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.4rem", letterSpacing: "0.1em", color: "rgba(255,255,255,0.16)" }}>{filtered.length} AGENT{filtered.length !== 1 ? "S" : ""}</span>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.4rem", letterSpacing: "0.1em", color: "rgba(255,255,255,0.16)" }}>SOLANA MAINNET-BETA</span>
                </div>
              </div>

              {/* Two ways to interact */}
              <div style={{ marginTop: "1.25rem" }}>
                <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.475rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.18)", marginBottom: "0.75rem" }}>TWO WAYS TO INTERACT · Shareholders earn from inference</p>
                <div className="interact-grid-dash" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                  {[
                    { label: "CALL AN AGENT", headline: "Pay per call, get a TEE-attested response", body: "Settle in USDC. The vault accumulates; you get back a signed receipt.", cta: "Browse agents →", href: "/markets" },
                    { label: "BUY A SHARE",   headline: "Mint ShareTokens, earn pro-rata revenue",   body: "Every agent has its own ShareToken (1M cap). Every call is snapshotted and paid out.",      cta: "Launch your own →", href: "/launch" },
                  ].map(card => (
                    <div key={card.label} style={{ padding: "1.125rem", background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "10px", display: "flex", flexDirection: "column", gap: "0.5rem", transition: "background 0.2s ease" }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(30,111,255,0.07)"; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.025)"; }}
                    >
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.4rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "#7AB8FF" }}>{card.label}</span>
                      <h3 style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: "clamp(0.875rem,2vw,0.9375rem)", letterSpacing: "-0.02em", color: "#fff", margin: 0, lineHeight: 1.3 }}>{card.headline}</h3>
                      <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.8125rem", lineHeight: 1.6, color: "rgba(255,255,255,0.38)", margin: 0 }}>{card.body}</p>
                      <Link href={card.href} style={{ fontFamily: "var(--font-mono)", fontSize: "0.5rem", letterSpacing: "0.08em", color: "#7AB8FF", textDecoration: "none" }}>{card.cta}</Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── RIGHT: earn sidebar ── */}
            <div className="earn-sidebar">
              <div style={{ position: "sticky", top: "calc(var(--nav-h) + 1rem)", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.4rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.18)" }}>HOW YOU EARN</span>
                <EarnWidget />
                <div style={{ padding: "1.125rem", background: "linear-gradient(135deg,rgba(30,111,255,0.12) 0%,rgba(30,111,255,0.05) 100%)", border: "1px solid rgba(30,111,255,0.2)", borderRadius: "12px", display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.4rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "#7AB8FF" }}>LAUNCH YOUR AGENT</span>
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.8125rem", lineHeight: 1.55, color: "rgba(255,255,255,0.4)", margin: 0 }}>Deploy a TEE-verified agent in minutes. Set your price, distribute shares, earn forever.</p>
                  <Link href="/launch" className="earn-launch-cta" style={{ fontFamily: "var(--font-sans)", fontSize: "0.875rem", fontWeight: 600, padding: "0.625rem 1rem", borderRadius: "6px", background: "rgba(255,255,255,0.95)", color: "var(--ink)", textDecoration: "none", textAlign: "center", display: "block" }}>
                    Launch now →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {selectedAgent && <AgentDetailPanel agent={selectedAgent} onClose={() => setSelectedAgent(null)} />}
      <Footer />

      <style>{`
        /* Desktop: table visible, cards hidden */
        .agents-table-wrap { display: block; overflow-x: auto; -webkit-overflow-scrolling: touch; }
        .agents-card-wrap  { display: none; }

        /* Mobile: swap */
        @media (max-width: 640px) {
          .agents-table-wrap { display: none; }
          .agents-card-wrap  { display: block; }
          .stats-grid        { grid-template-columns: repeat(2,1fr) !important; gap: 0.5rem !important; }
          .interact-grid-dash{ grid-template-columns: 1fr !important; gap: 0.75rem !important; }
          .markets-header-row{ flex-direction: column !important; align-items: flex-start !important; }
        }
        @media (max-width: 380px) {
          .stats-grid { grid-template-columns: 1fr !important; }
        }

        /* Sidebar goes below on small screens */
        @media (min-width: 1100px) { .dashboard-grid { grid-template-columns: 1fr 320px !important; } }
        @media (max-width: 1099px) { .earn-sidebar { order: 2; } .table-col { order: 1; } }

        /* Agent table rows */
        .agent-row { cursor: pointer; border-bottom: 1px solid rgba(255,255,255,0.04); transition: background 0.12s ease; }
        .agent-row:last-child { border-bottom: none; }
        .agent-row:hover { background: rgba(30,111,255,0.06) !important; }
        .agent-row td { padding: 0.875rem 0.75rem; vertical-align: middle; }

        .row-action-btn { display: inline-flex; align-items: center; padding: 0.225rem 0.5rem; border: 1px solid rgba(255,255,255,0.1); border-radius: 4px; font-size: 0.475rem; letter-spacing: 0.1em; color: rgba(255,255,255,0.2); background: transparent; transition: all 0.15s ease; white-space: nowrap; font-family: var(--font-mono); }
        .agent-row:hover .row-action-btn { border-color: rgba(122,184,255,0.4); color: #7AB8FF; }

        .filter-pill-group { overflow-x: auto; flex-wrap: nowrap !important; -webkit-overflow-scrolling: touch; }
      `}</style>
    </div>
  );
}
