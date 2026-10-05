"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import ManifestPreviewPanel from "./ManifestPreviewPanel";
import {
  EMPTY_DRAFT, TEMPLATES, buildManifest, checkTicker, mintAgent,
  saveDraft, loadDraft, clearDraft,
  type AgentDraft, type LaunchStep, type WalletTxStatus, type LaunchResult,
} from "@/lib/launch";

/* ─── Step bar ─── */
function StepBar({ step }: { step: LaunchStep }) {
  const steps = [
    { num: 1 as LaunchStep, label: "Identity",     icon: "01" },
    { num: 2 as LaunchStep, label: "Review & Mint", icon: "02" },
    { num: 3 as LaunchStep, label: "Go Live",       icon: "03" },
  ];
  return (
    <div style={{ display: "flex", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
      {steps.map((s, i) => {
        const isActive = s.num === step;
        const isDone   = s.num < step;
        return (
          <div key={s.num} style={{
            flex: 1, display: "flex", alignItems: "center", gap: "0.625rem",
            padding: "1rem 1.25rem",
            borderRight: i < 2 ? "1px solid rgba(255,255,255,0.07)" : "none",
            background: isActive ? "rgba(30,111,255,0.08)" : "transparent",
            borderBottom: isActive ? "2px solid #1E6FFF" : "2px solid transparent",
            transition: "all 0.2s ease",
          }}>
            <span style={{
              width: "26px", height: "26px", borderRadius: "6px", flexShrink: 0,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "var(--font-mono)", fontSize: "0.5625rem", fontWeight: 700,
              background: isActive ? "#1E6FFF" : isDone ? "rgba(30,111,255,0.2)" : "rgba(255,255,255,0.05)",
              color: isActive ? "#fff" : isDone ? "#7AB8FF" : "rgba(255,255,255,0.2)",
              border: isDone ? "1px solid rgba(30,111,255,0.3)" : "none",
            }}>
              {isDone ? "✓" : s.icon}
            </span>
            <span style={{
              fontFamily: "var(--font-mono)", fontSize: "0.5625rem", letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: isActive ? "#7AB8FF" : isDone ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.2)",
            }} className="step-label">
              {s.label}
            </span>
          </div>
        );
      })}
      <style>{`
        @media (max-width: 480px) { .step-label { display: none; } }
      `}</style>
    </div>
  );
}

/* ─── Shared field styles ─── */
const fieldLabel: React.CSSProperties = {
  fontFamily: "var(--font-mono)", fontSize: "0.5rem", letterSpacing: "0.16em",
  textTransform: "uppercase", color: "rgba(255,255,255,0.3)",
  display: "block", marginBottom: "0.5rem",
};
const fieldHint: React.CSSProperties = {
  fontFamily: "var(--font-mono)", fontSize: "0.5rem", letterSpacing: "0.08em",
  color: "rgba(255,255,255,0.2)", marginTop: "0.375rem",
};
const inputBase: React.CSSProperties = {
  width: "100%", background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.1)", borderRadius: "6px",
  padding: "0.75rem 1rem", fontFamily: "var(--font-mono)", fontSize: "0.875rem",
  color: "#fff", outline: "none", transition: "border-color 0.2s ease",
};

/* ─── Step 1 ─── */
function Step1({ draft, setDraft, onNext }: {
  draft: AgentDraft; setDraft: (d: AgentDraft) => void; onNext: () => void;
}) {
  const [tickerMsg, setTickerMsg] = useState("");
  const [tickerOk, setTickerOk]   = useState<boolean | null>(null);
  const [checking, setChecking]   = useState(false);
  const [descCount, setDescCount] = useState(draft.description.length);
  const [credName, setCredName]   = useState("");
  const [credVal, setCredVal]     = useState("");
  const [skillsOpen, setSkillsOpen] = useState(false);

  const upd = (patch: Partial<AgentDraft>) => {
    const next = { ...draft, ...patch };
    setDraft(next); saveDraft(next);
  };

  useEffect(() => {
    if (!draft.ticker) { setTickerMsg(""); setTickerOk(null); return; }
    const t = setTimeout(async () => {
      setChecking(true);
      const res = await checkTicker(draft.ticker);
      setTickerMsg(res.message); setTickerOk(res.available); setChecking(false);
    }, 450);
    return () => clearTimeout(t);
  }, [draft.ticker]);

  const addCred = () => {
    if (!credName.trim()) return;
    upd({ credentials: [...draft.credentials, { id: Date.now().toString(), name: credName.trim(), value: credVal }] });
    setCredName(""); setCredVal("");
  };
  const removeCred = (id: string) => upd({ credentials: draft.credentials.filter((c) => c.id !== id) });

  const canAdvance = tickerOk === true && draft.description.trim().length > 0 && parseFloat(draft.pricePerCall) > 0;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <div>
        <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "clamp(1.75rem,4vw,2.75rem)", letterSpacing: "-0.03em", color: "#fff", marginBottom: "0.5rem" }}>
          Name your agent
        </h1>
        <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.9rem", color: "rgba(255,255,255,0.4)", lineHeight: 1.65 }}>
          Ticker becomes the ENS subname under{" "}
          <span style={{ fontFamily: "var(--font-mono)", color: "rgba(255,255,255,0.65)" }}>luma.sol</span>
          {" "}and the ERC-20 share symbol. Permanent.
        </p>
      </div>

      {/* Templates */}
      <div>
        <label style={fieldLabel}>Quick start · optional</label>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
          {TEMPLATES.map((t) => (
            <button key={t.id} onClick={() => upd({ ticker: t.ticker, name: t.label, description: t.description, systemPrompt: t.systemPrompt, credentials: t.credentials })}
              style={{
                padding: "0.375rem 0.875rem", borderRadius: "6px", cursor: "pointer",
                fontFamily: "var(--font-mono)", fontSize: "0.5625rem", letterSpacing: "0.08em",
                background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)",
                color: "rgba(255,255,255,0.55)", transition: "all 0.15s ease",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(30,111,255,0.4)"; (e.currentTarget as HTMLElement).style.color = "#7AB8FF"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)"; (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.55)"; }}
            >{t.label}</button>
          ))}
        </div>
      </div>

      {/* Ticker */}
      <div>
        <label style={fieldLabel} htmlFor="ticker">Ticker · max 8 chars</label>
        <div style={{ position: "relative" }}>
          <input id="ticker"
            style={{ ...inputBase, fontWeight: 700, fontSize: "1.125rem", letterSpacing: "0.1em", textTransform: "uppercase", paddingRight: "7rem",
              borderColor: tickerOk === true ? "rgba(30,111,255,0.5)" : tickerOk === false ? "rgba(220,80,60,0.5)" : "rgba(255,255,255,0.1)",
            }}
            maxLength={8} placeholder="AGENT"
            value={draft.ticker}
            onChange={(e) => upd({ ticker: e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "") })}
            autoComplete="off" spellCheck={false}
          />
          <span style={{ position: "absolute", right: "1rem", top: "50%", transform: "translateY(-50%)", fontFamily: "var(--font-mono)", fontSize: "0.625rem", color: "rgba(255,255,255,0.2)", pointerEvents: "none" }}>.luma.sol</span>
        </div>
        <div style={{ ...fieldHint, marginTop: "0.375rem", color: tickerOk === true ? "#7AB8FF" : tickerOk === false ? "#D06050" : "rgba(255,255,255,0.2)" }}>
          {checking ? "checking…" : tickerMsg || (draft.ticker ? "" : "e.g. WHALE")}
        </div>
      </div>

      {/* Description */}
      <div>
        <label style={fieldLabel} htmlFor="desc">One-line description · shown on markets</label>
        <input id="desc" style={inputBase} placeholder="e.g. Tracks whale wallets on EVM chains"
          maxLength={200} value={draft.description}
          onChange={(e) => { upd({ description: e.target.value }); setDescCount(e.target.value.length); }}
        />
        <div style={fieldHint}>{descCount}/200</div>
      </div>

      {/* Price */}
      <div>
        <label style={fieldLabel} htmlFor="price">Per-call price</label>
        <div style={{ position: "relative" }}>
          <span style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", fontFamily: "var(--font-mono)", fontSize: "0.875rem", color: "rgba(255,255,255,0.3)", pointerEvents: "none" }}>$</span>
          <input id="price" style={{ ...inputBase, paddingLeft: "1.75rem", paddingRight: "4.5rem" }}
            type="number" min="0.01" step="0.01"
            value={draft.pricePerCall}
            onChange={(e) => upd({ pricePerCall: e.target.value })}
          />
          <span style={{ position: "absolute", right: "1rem", top: "50%", transform: "translateY(-50%)", fontFamily: "var(--font-mono)", fontSize: "0.625rem", color: "rgba(255,255,255,0.2)", pointerEvents: "none" }}>USDC</span>
        </div>
        <p style={fieldHint}>
          You receive{" "}
          <span style={{ color: "#7AB8FF" }}>${parseFloat(draft.pricePerCall || "0").toFixed(2)}</span>
          {" "}per call · hermes runtime on 0G compute · Intel TDX
        </p>
      </div>

      {/* Runtime */}
      <div>
        <label style={fieldLabel}>Runtime</label>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          {(["hermes", "raw"] as const).map((r) => (
            <button key={r} onClick={() => upd({ runtime: r })}
              style={{
                padding: "0.625rem 1.375rem", borderRadius: "6px", cursor: "pointer",
                fontFamily: "var(--font-mono)", fontSize: "0.6875rem", letterSpacing: "0.1em",
                transition: "all 0.15s ease",
                background: draft.runtime === r ? "#1E6FFF" : "rgba(255,255,255,0.04)",
                color: draft.runtime === r ? "#fff" : "rgba(255,255,255,0.4)",
                border: `1px solid ${draft.runtime === r ? "#1E6FFF" : "rgba(255,255,255,0.1)"}`,
              }}
            >{r}</button>
          ))}
        </div>
      </div>

      {/* System prompt */}
      <div>
        <label style={fieldLabel} htmlFor="prompt">System prompt · this is the agent</label>
        <textarea id="prompt"
          style={{ ...inputBase, resize: "vertical", minHeight: "140px", lineHeight: 1.7, fontSize: "0.8125rem" }}
          placeholder={"Describe the agent's role, expertise, and tools.\nHermes evolves from here."}
          value={draft.systemPrompt}
          onChange={(e) => upd({ systemPrompt: e.target.value })}
          rows={6}
        />
        <div style={fieldHint}>{draft.systemPrompt.length} chars</div>
      </div>

      {/* Credentials */}
      <div>
        <label style={fieldLabel}>Tool credentials · optional</label>
        <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.8125rem", color: "rgba(255,255,255,0.3)", lineHeight: 1.6, marginBottom: "0.75rem" }}>
          API keys your agent needs. Saved to 1Claw cloud HSM — never placed in model context.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "0.75rem" }}>
          {draft.credentials.map((c) => (
            <div key={c.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.625rem 0.875rem", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "6px" }}>
              <div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.6875rem", color: "rgba(255,255,255,0.7)", letterSpacing: "0.06em" }}>{c.name}</div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.5rem", color: "rgba(255,255,255,0.2)", marginTop: "2px" }}>●●●●●●●●</div>
              </div>
              <button onClick={() => removeCred(c.id)} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "var(--font-mono)", fontSize: "0.5rem", color: "rgba(255,255,255,0.2)", letterSpacing: "0.1em" }}>REMOVE</button>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          <input style={{ ...inputBase, flex: "1 1 130px", fontSize: "0.8125rem" }} placeholder="KEY_NAME"
            value={credName} onChange={(e) => setCredName(e.target.value.toUpperCase().replace(/\s/g, "_"))} />
          <input style={{ ...inputBase, flex: "2 1 200px", fontSize: "0.8125rem" }} placeholder="sk-…" type="password"
            value={credVal} onChange={(e) => setCredVal(e.target.value)} />
          <button onClick={addCred} disabled={!credName.trim()}
            style={{ padding: "0.625rem 1rem", borderRadius: "6px", cursor: credName.trim() ? "pointer" : "not-allowed", fontFamily: "var(--font-mono)", fontSize: "0.625rem", letterSpacing: "0.08em", background: "rgba(30,111,255,0.15)", border: "1px solid rgba(30,111,255,0.25)", color: credName.trim() ? "#7AB8FF" : "rgba(255,255,255,0.2)", whiteSpace: "nowrap", opacity: credName.trim() ? 1 : 0.5, transition: "all 0.15s ease" }}>
            + add
          </button>
        </div>
      </div>

      {/* Skills collapsible */}
      <div>
        <button onClick={() => setSkillsOpen((o) => !o)}
          style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "6px", padding: "0.75rem 1rem", cursor: "pointer" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.5rem", letterSpacing: "0.1em", color: "rgba(255,255,255,0.4)" }}>Skills · bundled into manifest</span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.4375rem", letterSpacing: "0.12em", color: "#7AB8FF", background: "rgba(30,111,255,0.12)", border: "1px solid rgba(30,111,255,0.2)", padding: "0.1rem 0.4rem", borderRadius: "3px" }}>{draft.skills.length} SKILLS</span>
          </div>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.4375rem", letterSpacing: "0.12em", color: "rgba(255,255,255,0.2)" }}>{skillsOpen ? "▲" : "▼"}</span>
        </button>
        {skillsOpen && (
          <div style={{ border: "1px solid rgba(255,255,255,0.08)", borderTop: "none", padding: "1rem", borderRadius: "0 0 6px 6px", background: "rgba(255,255,255,0.02)" }}>
            <p style={fieldHint}>Hermes generates skills automatically from the system prompt at mint time.</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "1.25rem", borderTop: "1px solid rgba(255,255,255,0.07)", flexWrap: "wrap", gap: "0.75rem" }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.4375rem", letterSpacing: "0.08em", color: "rgba(255,255,255,0.2)" }}>auto-saved · hash recomputes on every edit</span>
        <div style={{ display: "flex", gap: "0.625rem", alignItems: "center" }}>
          <Link href="/markets" style={{ padding: "0.625rem 1.125rem", borderRadius: "6px", fontFamily: "var(--font-sans)", fontSize: "0.8125rem", fontWeight: 500, border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.5)", textDecoration: "none", transition: "all 0.15s ease" }}>cancel</Link>
          <button onClick={onNext} disabled={!canAdvance}
            style={{ padding: "0.625rem 1.5rem", borderRadius: "6px", fontFamily: "var(--font-sans)", fontSize: "0.875rem", fontWeight: 700, background: canAdvance ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.08)", color: canAdvance ? "var(--ink)" : "rgba(255,255,255,0.2)", border: "none", cursor: canAdvance ? "pointer" : "not-allowed", opacity: canAdvance ? 1 : 0.6, transition: "all 0.2s ease" }}>
            Review + mint →
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Step 2 ─── */
function Step2({ draft, onBack, onMint, txStatus }: {
  draft: AgentDraft; onBack: () => void; onMint: () => void; txStatus: WalletTxStatus;
}) {
  const isProcessing = txStatus === "confirm" || txStatus === "pending";
  const txLabel: Record<WalletTxStatus, string> = {
    idle: "Mint agent →", connecting: "Connecting…", confirm: "Confirm in wallet…",
    pending: "Pending…", confirmed: "Confirmed ✓", failed: "Failed — retry",
  };
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <div>
        <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "clamp(1.5rem,3vw,2.25rem)", letterSpacing: "-0.025em", color: "#fff", marginBottom: "0.5rem" }}>
          Review before minting
        </h2>
        <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.9rem", color: "rgba(255,255,255,0.4)", lineHeight: 1.6 }}>
          Once minted, ticker and domain are permanent.
        </p>
      </div>

      {/* Review table */}
      <div style={{ border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px", overflow: "hidden" }}>
        {[
          { k: "Ticker",      v: `${draft.ticker}.luma.sol` },
          { k: "Description", v: draft.description },
          { k: "Price",       v: `$${parseFloat(draft.pricePerCall).toFixed(2)} USDC per call` },
          { k: "Runtime",     v: draft.runtime },
          { k: "Credentials", v: draft.credentials.length > 0 ? `${draft.credentials.length} key(s) → 1Claw HSM` : "none" },
          { k: "Skills",      v: draft.skills.length > 0 ? draft.skills.map((s) => s.name).join(", ") : "hermes auto-generates" },
          { k: "Prompt",      v: draft.systemPrompt ? `${draft.systemPrompt.slice(0, 120)}…` : "none" },
        ].map((row, i, arr) => (
          <div key={row.k} style={{ display: "grid", gridTemplateColumns: "120px 1fr", padding: "0.875rem 1.25rem", borderBottom: i < arr.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none", alignItems: "start", background: i % 2 === 0 ? "rgba(255,255,255,0.01)" : "transparent" }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.5rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)" }}>{row.k}</span>
            <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.875rem", color: "rgba(255,255,255,0.75)", lineHeight: 1.5, wordBreak: "break-word" }}>{row.v}</span>
          </div>
        ))}
      </div>

      {/* Warning */}
      <div style={{ background: "rgba(30,111,255,0.08)", border: "1px solid rgba(30,111,255,0.18)", borderRadius: "8px", padding: "1rem 1.25rem" }}>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.5rem", letterSpacing: "0.08em", color: "rgba(122,184,255,0.65)", lineHeight: 1.9 }}>
          Minting will: (1) deploy your agent iNFT on-chain, (2) register the ENS subname, (3) open the IPO.
          Gas fees apply. Ticker is permanent once minted.
        </p>
      </div>

      {/* TX pending */}
      {txStatus === "pending" && (
        <div style={{ display: "flex", alignItems: "center", gap: "0.875rem", padding: "1rem 1.25rem", border: "1px solid rgba(30,111,255,0.2)", borderRadius: "8px", background: "rgba(30,111,255,0.06)" }}>
          <div style={{ width: "10px", height: "10px", borderRadius: "50%", border: "2px solid #7AB8FF", borderTopColor: "transparent", animation: "spin 0.8s linear infinite", flexShrink: 0 }} />
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.5625rem", letterSpacing: "0.1em", color: "rgba(122,184,255,0.7)" }}>Transaction submitted · waiting for confirmation…</span>
        </div>
      )}

      <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
        <button onClick={onBack} disabled={isProcessing}
          style={{ padding: "0.75rem 1.375rem", borderRadius: "6px", fontFamily: "var(--font-sans)", fontSize: "0.875rem", fontWeight: 500, border: "1px solid rgba(255,255,255,0.1)", background: "transparent", color: "rgba(255,255,255,0.55)", cursor: isProcessing ? "not-allowed" : "pointer", opacity: isProcessing ? 0.4 : 1, transition: "all 0.15s ease" }}>
          ← Back
        </button>
        <button onClick={onMint} disabled={isProcessing || txStatus === "confirmed"}
          style={{ flex: 1, padding: "0.75rem 1.5rem", borderRadius: "6px", fontFamily: "var(--font-sans)", fontSize: "0.9375rem", fontWeight: 700, background: isProcessing || txStatus === "confirmed" ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.95)", color: isProcessing || txStatus === "confirmed" ? "rgba(255,255,255,0.3)" : "var(--ink)", border: "none", cursor: isProcessing || txStatus === "confirmed" ? "not-allowed" : "pointer", transition: "all 0.2s ease" }}>
          {txLabel[txStatus]}
        </button>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

/* ─── Step 3 ─── */
function Step3({ result, onReset }: { result: LaunchResult; draft: AgentDraft; onReset: () => void }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      {/* Success */}
      <div style={{ textAlign: "center", padding: "2.5rem 1rem" }}>
        <div style={{
          width: "64px", height: "64px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(30,111,255,0.25) 0%, rgba(30,111,255,0.05) 100%)",
          border: "1.5px solid rgba(30,111,255,0.4)",
          display: "flex", alignItems: "center", justifyContent: "center",
          margin: "0 auto 1.5rem",
          boxShadow: "0 0 32px rgba(30,111,255,0.2)",
        }}>
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
            <path d="M6 14L11 19L22 8" stroke="#7AB8FF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "clamp(1.75rem,4vw,2.75rem)", letterSpacing: "-0.03em", color: "#fff", marginBottom: "0.75rem" }}>
          {result.ticker} is live.
        </h2>
        <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.9375rem", color: "rgba(255,255,255,0.4)", lineHeight: 1.65, maxWidth: "420px", margin: "0 auto" }}>
          Your agent is deployed, the ENS is reserved, and the IPO is open. Share it with the world.
        </p>
      </div>

      {/* Result table */}
      <div style={{ border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px", overflow: "hidden" }}>
        {[
          { k: "Ticker",       v: result.ticker },
          { k: "Domain",       v: result.ens },
          { k: "iNFT Token ID",v: result.inftTokenId },
          { k: "Contract",     v: result.contractAddress },
          { k: "TX Hash",      v: result.txHash },
          { k: "Network",      v: result.network },
          { k: "Share price",  v: result.sharePrice },
        ].map((row, i, arr) => (
          <div key={row.k} style={{ display: "grid", gridTemplateColumns: "120px 1fr", padding: "0.875rem 1.25rem", borderBottom: i < arr.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none", alignItems: "center", background: i % 2 === 0 ? "rgba(255,255,255,0.01)" : "transparent" }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.5rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)" }}>{row.k}</span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6875rem", color: "rgba(122,184,255,0.85)", wordBreak: "break-all" }}>{row.v}</span>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
        <Link href="/markets" style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "0.875rem", borderRadius: "6px", fontFamily: "var(--font-sans)", fontSize: "0.9375rem", fontWeight: 700, background: "rgba(255,255,255,0.95)", color: "var(--ink)", textDecoration: "none" }}>
          View in markets →
        </Link>
        <button onClick={onReset} style={{ flex: 1, padding: "0.875rem", borderRadius: "6px", fontFamily: "var(--font-sans)", fontSize: "0.9375rem", fontWeight: 500, border: "1px solid rgba(255,255,255,0.12)", background: "transparent", color: "rgba(255,255,255,0.55)", cursor: "pointer" }}>
          Launch another
        </button>
      </div>
    </div>
  );
}

/* ─── Main ─── */
export default function LaunchClient() {
  const [step, setStep]             = useState<LaunchStep>(1);
  const [draft, setDraftState]      = useState<AgentDraft>(EMPTY_DRAFT);
  const [txStatus, setTxStatus]     = useState<WalletTxStatus>("idle");
  const [launchResult, setResult]   = useState<LaunchResult | null>(null);

  useEffect(() => { const s = loadDraft(); if (s) setDraftState(s); }, []);

  const setDraft = useCallback((d: AgentDraft) => { setDraftState(d); saveDraft(d); }, []);

  const manifest = buildManifest(draft);
  const manifestValid = !!draft.ticker && parseFloat(draft.pricePerCall) > 0;

  const handleMint = async () => {
    setTxStatus("connecting");
    try {
      const result = await mintAgent(draft, setTxStatus);
      setResult(result); clearDraft(); setStep(3);
    } catch { setTxStatus("failed"); }
  };

  const handleReset = () => { setDraftState(EMPTY_DRAFT); setTxStatus("idle"); setResult(null); setStep(1); };

  return (
    <div style={{ minHeight: "100vh", background: "var(--onyx)" }}>
      <Navbar />
      <main style={{ paddingTop: "var(--nav-h)" }}>

        {/* Dark page header */}
        <div style={{ background: "linear-gradient(180deg, rgba(14,18,36,1) 0%, rgba(10,14,26,0.97) 100%)", borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "2rem 0 0" }}>
          <div className="container-wide">
            <div style={{ marginBottom: "1.5rem" }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.5rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", display: "block", marginBottom: "0.5rem" }}>
                LUMA · LAUNCH
              </span>
              <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "clamp(1.5rem,3vw,2.25rem)", letterSpacing: "-0.03em", color: "#fff", margin: 0 }}>
                Deploy your agent
              </h1>
            </div>
            {/* Step bar lives inside the dark header */}
            <div style={{ border: "1px solid rgba(255,255,255,0.07)", borderBottom: "none", borderRadius: "8px 8px 0 0", overflow: "hidden" }}>
              <StepBar step={step} />
            </div>
          </div>
        </div>

        {/* Two-col form area */}
        <div className="container-wide" style={{ paddingTop: 0, paddingBottom: "4rem" }}>
          <div style={{
            border: "1px solid rgba(255,255,255,0.07)",
            borderTop: "none",
            borderRadius: "0 0 8px 8px",
            display: "grid", gridTemplateColumns: "1fr",
            background: "rgba(255,255,255,0.015)",
          }} className="launch-grid">

            {/* Form */}
            <div style={{ padding: "2.5rem clamp(1.25rem, 3vw, 3rem)" }} className="launch-form">
              {step === 1 && <Step1 draft={draft} setDraft={setDraft} onNext={() => setStep(2)} />}
              {step === 2 && <Step2 draft={draft} onBack={() => setStep(1)} onMint={handleMint} txStatus={txStatus} />}
              {step === 3 && launchResult && <Step3 result={launchResult} draft={draft} onReset={handleReset} />}
            </div>

            {/* Manifest preview */}
            {step !== 3 && (
              <div style={{ padding: "2.5rem 2rem", borderLeft: "1px solid rgba(255,255,255,0.06)" }} className="launch-manifest">
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.4375rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.2)", display: "block", marginBottom: "0.75rem" }}>Live manifest preview</span>
                <ManifestPreviewPanel manifest={manifest} valid={manifestValid} />
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />

      <style>{`
        @media (min-width: 1024px) {
          .launch-grid { grid-template-columns: 1fr 360px !important; }
          .launch-form { padding: 3rem 3.5rem !important; }
        }
        @media (max-width: 1023px) {
          .launch-manifest { border-top: 1px solid rgba(255,255,255,0.06) !important; border-left: none !important; }
        }
        @media (max-width: 640px) {
          .launch-form { padding: 1.5rem 1.25rem !important; }
        }

        /* Override field-input for dark bg */
        .launch-form .field-input,
        .launch-form .field-textarea {
          background: rgba(255,255,255,0.04) !important;
          border-color: rgba(255,255,255,0.1) !important;
          color: #fff !important;
        }
        .launch-form .field-input:focus,
        .launch-form .field-textarea:focus {
          border-color: rgba(30,111,255,0.5) !important;
        }
        .launch-form .field-input::placeholder,
        .launch-form .field-textarea::placeholder {
          color: rgba(255,255,255,0.2) !important;
        }
        .launch-form .field-label { color: rgba(255,255,255,0.3) !important; }
        .launch-form .field-hint  { color: rgba(255,255,255,0.2) !important; }
      `}</style>
    </div>
  );
}
