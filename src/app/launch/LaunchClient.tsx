"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import ManifestPreviewPanel from "./ManifestPreviewPanel";
import {
  EMPTY_DRAFT, TEMPLATES, buildManifest, checkTicker, mintAgent, saveDraft, loadDraft, clearDraft,
  type AgentDraft, type LaunchStep, type WalletTxStatus, type LaunchResult, type ToolCredential,
} from "@/lib/launch";

/* ─── Step indicator ─── */
function StepBar({ step }: { step: LaunchStep }) {
  const steps: { num: LaunchStep; label: string; short: string }[] = [
    { num: 1, label: "IDENTITY",     short: "IDENTITY" },
    { num: 2, label: "REVIEW + MINT", short: "REVIEW" },
    { num: 3, label: "GO LIVE",       short: "GO LIVE" },
  ];
  return (
    <>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", borderBottom: "1px solid var(--ink-10)" }}>
        {steps.map((s) => {
          const isActive = s.num === step;
          const isDone   = s.num < step;
          return (
            <div key={s.num} className={`step-tab ${isActive ? "step-tab-active" : isDone ? "step-tab-done" : ""}`} style={{ padding: "0.875rem 0.75rem", gap: "0.5rem", minWidth: 0 }}>
              <span className={`step-num ${isActive ? "step-num-active" : isDone ? "step-num-done" : "step-num-pending"}`} style={{ flexShrink: 0 }}>
                {String(s.num).padStart(2, "0")}
              </span>
              <span className="step-label-full" style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{s.label}</span>
              <span className="step-label-short" style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{s.short}</span>
            </div>
          );
        })}
      </div>
      <style>{`
        .step-label-short { display: none; }
        @media (max-width: 480px) {
          .step-label-full  { display: none; }
          .step-label-short { display: block; }
          .step-tab { padding: 0.75rem 0.5rem !important; font-size: 0.5rem !important; }
        }
      `}</style>
    </>
  );
}

/* ─── Step 1: Identity ─── */
function Step1({
  draft, setDraft, onNext,
}: {
  draft: AgentDraft;
  setDraft: (d: AgentDraft) => void;
  onNext: () => void;
}) {
  const [tickerMsg, setTickerMsg] = useState("");
  const [tickerOk, setTickerOk] = useState<boolean | null>(null);
  const [checkingTicker, setCheckingTicker] = useState(false);
  const [descCount, setDescCount] = useState(draft.description.length);
  const [credName, setCredName] = useState("");
  const [credVal, setCredVal] = useState("");
  const [skillsOpen, setSkillsOpen] = useState(false);

  const upd = (patch: Partial<AgentDraft>) => {
    const next = { ...draft, ...patch };
    setDraft(next);
    saveDraft(next);
  };

  // Debounced ticker check
  useEffect(() => {
    if (!draft.ticker) { setTickerMsg(""); setTickerOk(null); return; }
    const t = setTimeout(async () => {
      setCheckingTicker(true);
      const res = await checkTicker(draft.ticker);
      setTickerMsg(res.message);
      setTickerOk(res.available);
      setCheckingTicker(false);
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
    <div style={{ display: "flex", flexDirection: "column", gap: "2.25rem" }}>
      {/* Page header */}
      <div>
        <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "clamp(1.75rem,4vw,2.5rem)", letterSpacing: "-0.025em", color: "var(--ink)", marginBottom: "0.5rem" }}>
          name your agent
        </h1>
        <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.9rem", color: "var(--ink-60)", lineHeight: 1.65 }}>
          ticker becomes its ENS subname under{" "}
          <span style={{ fontFamily: "var(--font-mono)", color: "var(--ink)" }}>luma.sol</span>
          {" "}+ the ERC-20 share symbol. permanent.
        </p>
      </div>

      {/* Templates */}
      <div>
        <label className="field-label">START FROM A USEFUL AGENT · OPTIONAL</label>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
          {TEMPLATES.map((t) => (
            <button
              key={t.id}
              className="template-chip"
              onClick={() => {
                upd({
                  ticker: t.ticker,
                  name: t.label,
                  description: t.description,
                  systemPrompt: t.systemPrompt,
                  credentials: t.credentials,
                });
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
        <p className="field-hint" style={{ marginTop: "0.625rem" }}>
          prefills the prompt + a 1Claw credential slot (the key is provisioned to 1Claw at launch, never to the{" "}
          <span style={{ color: "var(--acid)" }}>model</span>).
        </p>
      </div>

      {/* Ticker */}
      <div>
        <label className="field-label" htmlFor="ticker">TICKER · MAX 8 CHARS</label>
        <div style={{ position: "relative" }}>
          <input
            id="ticker"
            className={`field-input ${tickerOk === true ? "field-input-success" : tickerOk === false ? "field-input-error" : ""}`}
            style={{ fontWeight: 600, fontSize: "1.125rem", letterSpacing: "0.06em", textTransform: "uppercase", paddingRight: "8rem" }}
            maxLength={8}
            placeholder="AGENT"
            value={draft.ticker}
            onChange={(e) => upd({ ticker: e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "") })}
            autoComplete="off"
            spellCheck={false}
          />
          <div style={{ position: "absolute", right: "1rem", top: "50%", transform: "translateY(-50%)", fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--ink-30)", pointerEvents: "none" }}>
            .luma.sol
          </div>
        </div>
        <div className="field-hint" style={{ marginTop: "0.375rem", color: tickerOk === true ? "var(--acid)" : tickerOk === false ? "#D06050" : "var(--ink-30)" }}>
          {checkingTicker ? "checking…" : tickerMsg || (draft.ticker ? "" : "pick a short symbol, e.g. WHALE")}
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="field-label" htmlFor="desc">ONE-LINE DESCRIPTION · SHOWN ON MARKETS</label>
        <input
          id="desc"
          className="field-input"
          placeholder="e.g. Tracks whale wallets on EVM chains"
          maxLength={200}
          value={draft.description}
          onChange={(e) => { upd({ description: e.target.value }); setDescCount(e.target.value.length); }}
        />
        <div className="field-hint">{descCount}/200 chars</div>
      </div>

      {/* per call price */}
      <div>
        <label className="field-label" htmlFor="price">per call PRICE</label>
        <div style={{ position: "relative" }}>
          <span style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", fontFamily: "var(--font-mono)", fontSize: "0.875rem", color: "var(--ink-60)", pointerEvents: "none" }}>$</span>
          <input
            id="price"
            className="field-input"
            style={{ paddingLeft: "1.75rem", paddingRight: "4.5rem" }}
            type="number"
            min="0.01"
            step="0.01"
            value={draft.pricePerCall}
            onChange={(e) => upd({ pricePerCall: e.target.value })}
          />
          <div style={{ position: "absolute", right: "1rem", top: "50%", transform: "translateY(-50%)", fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--ink-30)", pointerEvents: "none" }}>USDC</div>
        </div>
        <p className="field-hint">
          you receive{" "}
          <span style={{ color: "var(--acid)", fontWeight: 500 }}>${parseFloat(draft.pricePerCall || "0").toFixed(2)}</span>
          {" "}per call · runtime{" "}
          <span style={{ color: "var(--ink)" }}>hermes</span>
          {" "}on 0G compute · intel TDX (deepseek v3, every reply TEE-signed)
        </p>
      </div>

      {/* Runtime */}
      <div>
        <label className="field-label">RUNTIME</label>
        <div style={{ display: "flex", gap: "0.625rem" }}>
          {(["hermes", "raw"] as const).map((r) => (
            <button
              key={r}
              onClick={() => upd({ runtime: r })}
              style={{
                padding: "0.625rem 1.125rem", borderRadius: "2px",
                fontFamily: "var(--font-mono)", fontSize: "0.6875rem", letterSpacing: "0.1em",
                cursor: "pointer", transition: "all 0.15s ease",
                background: draft.runtime === r ? "var(--ink)" : "transparent",
                color: draft.runtime === r ? "var(--ivory)" : "var(--ink-60)",
                border: `1px solid ${draft.runtime === r ? "var(--ink)" : "var(--ink-10)"}`,
              }}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* System prompt */}
      <div>
        <label className="field-label" htmlFor="prompt">SYSTEM PROMPT · THIS IS THE AGENT</label>
        <textarea
          id="prompt"
          className="field-textarea"
          placeholder={"You are describe the agent's role, expertise, tone, and how it should use its tools.\nHermes grows skills from here."}
          value={draft.systemPrompt}
          onChange={(e) => upd({ systemPrompt: e.target.value })}
          rows={7}
        />
        <div className="field-hint">{draft.systemPrompt.length} chars · seeds the Hermes agent dir; it self improves from here</div>
      </div>

      {/* Tool credentials */}
      <div>
        <label className="field-label">TOOL CREDENTIALS · OPTIONAL</label>
        <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.8125rem", color: "var(--ink-60)", lineHeight: 1.6, marginBottom: "0.75rem" }}>
          API keys your agent&apos;s tools need (e.g. a messari or elevenlabs key). Saved to{" "}
          <span style={{ fontFamily: "var(--font-mono)", color: "var(--ink)" }}>1Claw&apos;s cloud HSM</span>
          {" "}at launch and fetched just in time at the tool layer  {" "}
          <strong style={{ fontWeight: 600 }}>never</strong> placed in the model&apos;s context, the manifest, or receipts.
        </p>
        {draft.credentials.length === 0 && (
          <p className="field-hint" style={{ marginBottom: "0.75rem" }}>none yet add one only if a tool calls a private/paid API.</p>
        )}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "0.75rem" }}>
          {draft.credentials.map((c) => (
            <div key={c.id} className="credential-item">
              <div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.6875rem", color: "var(--ink)", letterSpacing: "0.06em" }}>{c.name}</div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.5625rem", color: "var(--ink-30)", letterSpacing: "0.08em", marginTop: "2px" }}>●●●●●●●●</div>
              </div>
              <button
                onClick={() => removeCred(c.id)}
                style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "var(--font-mono)", fontSize: "0.5625rem", color: "var(--ink-30)", letterSpacing: "0.1em" }}
              >
                REMOVE
              </button>
            </div>
          ))}
        </div>
        {/* Add credential inline form */}
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          <input
            className="field-input"
            style={{ flex: "1 1 140px", fontSize: "0.8125rem" }}
            placeholder="KEY_NAME"
            value={credName}
            onChange={(e) => setCredName(e.target.value.toUpperCase().replace(/\s/g, "_"))}
          />
          <input
            className="field-input"
            style={{ flex: "2 1 200px", fontSize: "0.8125rem" }}
            placeholder="sk-…"
            type="password"
            value={credVal}
            onChange={(e) => setCredVal(e.target.value)}
          />
          <button
            onClick={addCred}
            className="btn btn-ghost"
            style={{ fontSize: "0.75rem", padding: "0.625rem 1rem", whiteSpace: "nowrap" }}
            disabled={!credName.trim()}
          >
            + add credential
          </button>
        </div>
      </div>

      {/* Skills (collapsible) */}
      <div>
        <button
          onClick={() => setSkillsOpen((o) => !o)}
          style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", background: "var(--ivory-dark)", border: "1px solid var(--ink-10)", borderRadius: "2px", padding: "0.75rem 1rem", cursor: "pointer" }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.5625rem", letterSpacing: "0.1em", color: "var(--ink-60)" }}>▶ skills · bundled into manifest</span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.5625rem", letterSpacing: "0.12em", color: "var(--acid)", background: "rgba(30,111,255,0.12)", border: "1px solid rgba(30,111,255,0.25)", padding: "0.1rem 0.4rem", borderRadius: "2px" }}>
              {draft.skills.length} SKILLS
            </span>
          </div>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.5625rem", letterSpacing: "0.12em", color: "var(--ink-30)" }}>
            {skillsOpen ? "COLLAPSE" : "EXPAND"}
          </span>
        </button>
        {skillsOpen && (
          <div style={{ border: "1px solid var(--ink-10)", borderTop: "none", padding: "1rem", borderRadius: "0 0 2px 2px" }}>
            <p className="field-hint">Skills are bundled into the manifest at mint time. Hermes grows them automatically from the system prompt.</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "1rem", borderTop: "1px solid var(--ink-10)", flexWrap: "wrap", gap: "0.625rem" }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.475rem", letterSpacing: "0.08em", color: "var(--ink-30)" }}>
          auto-saved · hash recomputes on every edit
        </span>
        <div style={{ display: "flex", gap: "0.625rem", alignItems: "center", flexWrap: "wrap" }}>
          <Link href="/markets" className="btn btn-ghost" style={{ fontSize: "0.8125rem", padding: "0.625rem 1rem" }}>
            cancel
          </Link>
          <button
            className="btn btn-primary"
            onClick={onNext}
            disabled={!canAdvance}
            style={{ opacity: canAdvance ? 1 : 0.4, cursor: canAdvance ? "pointer" : "not-allowed" }}
          >
            review + mint →
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Step 2: Review + Mint ─── */
function Step2({
  draft, onBack, onMint, txStatus,
}: {
  draft: AgentDraft;
  onBack: () => void;
  onMint: () => void;
  txStatus: WalletTxStatus;
}) {
  const isProcessing = txStatus === "confirm" || txStatus === "pending";

  const txLabel: Record<WalletTxStatus, string> = {
    idle: "mint agent →",
    connecting: "connecting…",
    confirm: "confirm in wallet…",
    pending: "pending…",
    confirmed: "confirmed ✓",
    failed: "failed retry",
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <div>
        <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "clamp(1.5rem,3vw,2.25rem)", letterSpacing: "-0.025em", color: "var(--ink)", marginBottom: "0.5rem" }}>
          review before minting
        </h2>
        <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.9rem", color: "var(--ink-60)", lineHeight: 1.6 }}>
          Once minted, the ticker and domain are permanent. Review everything carefully.
        </p>
      </div>

      {/* Review grid */}
      <div style={{ border: "1px solid var(--ink-10)", borderRadius: "3px", overflow: "hidden" }}>
        {[
          { k: "Ticker", v: `${draft.ticker}.luma.sol` },
          { k: "Description", v: draft.description },
          { k: "per call price", v: `$${parseFloat(draft.pricePerCall).toFixed(2)} USDC` },
          { k: "Runtime", v: draft.runtime },
          { k: "Credentials", v: draft.credentials.length > 0 ? `${draft.credentials.length} key(s) → 1Claw HSM` : "none" },
          { k: "Skills", v: draft.skills.length > 0 ? draft.skills.map((s) => s.name).join(", ") : "hermes auto-generates" },
          { k: "System prompt", v: draft.systemPrompt ? `${draft.systemPrompt.slice(0, 120)}…` : "none" },
        ].map((row, i) => (
          <div key={row.k} style={{ display: "grid", gridTemplateColumns: "140px 1fr", padding: "0.875rem 1.25rem", borderBottom: i < 6 ? "1px solid var(--ink-06)" : "none", alignItems: "start" }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.5625rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ink-30)" }}>{row.k}</span>
            <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.875rem", color: "var(--ink)", lineHeight: 1.5, wordBreak: "break-word" }}>{row.v}</span>
          </div>
        ))}
      </div>

      {/* Warning */}
      <div style={{ background: "rgba(30,111,255,0.07)", border: "1px solid rgba(30,111,255,0.20)", borderRadius: "3px", padding: "1rem 1.25rem" }}>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.5625rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ink-60)", lineHeight: 1.8 }}>
          Minting will: (1) deploy your agent iNFT on chain, (2) register the ENS subname, (3) open the IPO.
          Gas fees apply. The ticker is permanent once minted.
        </p>
      </div>

      {/* Transaction status */}
      {txStatus === "pending" && (
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "1rem 1.25rem", border: "1px solid var(--ink-10)", borderRadius: "3px" }}>
          <div style={{ width: "10px", height: "10px", borderRadius: "50%", border: "2px solid var(--acid)", borderTopColor: "transparent", animation: "spin 0.8s linear infinite" }} />
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.625rem", letterSpacing: "0.1em", color: "var(--ink-60)" }}>transaction submitted · waiting for confirmation…</span>
        </div>
      )}

      {/* Buttons */}
      <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
        <button
          onClick={onBack}
          className="btn btn-ghost"
          disabled={isProcessing}
          style={{ opacity: isProcessing ? 0.4 : 1 }}
        >
          ← back
        </button>
        <button
          onClick={onMint}
          className="btn btn-primary"
          disabled={isProcessing || txStatus === "confirmed"}
          style={{ flex: 1, justifyContent: "center", opacity: txStatus === "confirmed" ? 0.6 : 1 }}
        >
          {txLabel[txStatus]}
        </button>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

/* ─── Step 3: Go Live ─── */
function Step3({ result, draft, onReset }: { result: LaunchResult; draft: AgentDraft; onReset: () => void }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      {/* Success banner */}
      <div style={{ textAlign: "center", padding: "2rem 1rem" }}>
        <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: "rgba(30,111,255,0.15)", border: "2px solid var(--acid)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.25rem" }}>
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
            <path d="M5 11L9 15L17 7" stroke="var(--acid)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "clamp(1.5rem,3vw,2.25rem)", letterSpacing: "-0.025em", color: "var(--ink)", marginBottom: "0.5rem" }}>
          {result.ticker} is live.
        </h2>
        <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.9375rem", color: "var(--ink-60)", lineHeight: 1.65, maxWidth: "400px", margin: "0 auto" }}>
          Your agent is deployed, the ENS is reserved, and the IPO is open. Share it with the world.
        </p>
      </div>

      {/* Result details */}
      <div style={{ border: "1px solid var(--ink-10)", borderRadius: "3px", overflow: "hidden" }}>
        {[
          { k: "Ticker", v: result.ticker },
          { k: "Domain", v: result.ens },
          { k: "iNFT Token ID", v: result.inftTokenId },
          { k: "Contract", v: result.contractAddress },
          { k: "TX Hash", v: result.txHash },
          { k: "Network", v: result.network },
          { k: "Share price", v: result.sharePrice },
        ].map((row, i) => (
          <div key={row.k} style={{ display: "grid", gridTemplateColumns: "130px 1fr", padding: "0.875rem 1.25rem", borderBottom: i < 6 ? "1px solid var(--ink-06)" : "none", alignItems: "center" }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.5625rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ink-30)" }}>{row.k}</span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6875rem", color: "var(--ink)", wordBreak: "break-all" }}>{row.v}</span>
          </div>
        ))}
      </div>

      {/* CTAs */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
        <Link href="/markets" className="btn btn-primary" style={{ flex: 1, justifyContent: "center" }}>
          view in markets →
        </Link>
        <button onClick={onReset} className="btn btn-ghost" style={{ flex: 1, justifyContent: "center" }}>
          launch another
        </button>
      </div>
    </div>
  );
}

/* ─── Main LaunchClient ─── */
export default function LaunchClient() {
  const [step, setStep] = useState<LaunchStep>(1);
  const [draft, setDraftState] = useState<AgentDraft>(EMPTY_DRAFT);
  const [txStatus, setTxStatus] = useState<WalletTxStatus>("idle");
  const [launchResult, setLaunchResult] = useState<LaunchResult | null>(null);

  // Load saved draft on mount
  useEffect(() => {
    const saved = loadDraft();
    if (saved) setDraftState(saved);
  }, []);

  const setDraft = useCallback((d: AgentDraft) => {
    setDraftState(d);
    saveDraft(d);
  }, []);

  const manifest = buildManifest(draft);
  const manifestValid = !!draft.ticker && parseFloat(draft.pricePerCall) > 0;

  const handleMint = async () => {
    setTxStatus("connecting");
    try {
      const result = await mintAgent(draft, setTxStatus);
      setLaunchResult(result);
      clearDraft();
      setStep(3);
    } catch {
      setTxStatus("failed");
    }
  };

  const handleReset = () => {
    setDraftState(EMPTY_DRAFT);
    setTxStatus("idle");
    setLaunchResult(null);
    setStep(1);
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--ivory)" }}>
      <Navbar />
      <main style={{ paddingTop: "var(--nav-h)" }}>
        {/* Step bar */}
        <div className="container-wide" style={{ paddingTop: "1.25rem", paddingBottom: "0" }}>
          <div style={{ border: "1px solid var(--ink-10)", borderRadius: "3px 3px 0 0", overflow: "hidden" }}>
            <StepBar step={step} />
          </div>
        </div>

        {/* Two-column layout */}
        <div className="container-wide" style={{ paddingTop: "0", paddingBottom: "3rem" }}>
          <div style={{ border: "1px solid var(--ink-10)", borderTop: "none", borderRadius: "0 0 3px 3px", display: "grid", gridTemplateColumns: "1fr" }} className="launch-grid">
            {/* Left: form */}
            <div style={{ padding: "2rem 2.5rem 2rem", borderRight: "1px solid var(--ink-10)" }} className="launch-form">
              {step === 1 && <Step1 draft={draft} setDraft={setDraft} onNext={() => setStep(2)} />}
              {step === 2 && <Step2 draft={draft} onBack={() => setStep(1)} onMint={handleMint} txStatus={txStatus} />}
              {step === 3 && launchResult && <Step3 result={launchResult} draft={draft} onReset={handleReset} />}
            </div>

            {/* Right: manifest preview (hidden on step 3) */}
            {step !== 3 && (
              <div style={{ padding: "2rem 2rem 2rem" }} className="launch-manifest">
                <ManifestPreviewPanel manifest={manifest} valid={manifestValid} />
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />

      <style>{`
        @media (min-width: 1024px) {
          .launch-grid { grid-template-columns: 1fr 340px !important; }
          .launch-form { padding: 2.5rem 3rem !important; }
        }
        @media (max-width: 1023px) {
          .launch-manifest { border-top: 1px solid var(--ink-10); }
        }
        @media (max-width: 640px) {
          .launch-form { padding: 1.25rem 1rem !important; }
        }
      `}</style>
    </div>
  );
}
