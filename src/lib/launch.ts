/**
 * NAIBON Launch Agent Data Layer
 *
 * Manages draft state, manifest computation, and the mint/deploy flow.
 * Replace mock functions with real wallet/contract calls when ready.
 */

import type { Runtime, AgentSkill, AgentCredential } from "./agents";

export type LaunchStep = 1 | 2 | 3;

export type WalletTxStatus =
  | "idle"
  | "connecting"
  | "confirm"      // waiting for user to confirm in wallet
  | "pending"      // tx submitted, waiting for confirmation
  | "confirmed"    // tx mined
  | "failed";

export interface ToolCredential {
  id: string;
  name: string;
  value: string; // never persisted plaintext in production
}

export interface AgentDraft {
  /** Ticker symbol max 8 chars, uppercase */
  ticker: string;
  /** Human name */
  name: string;
  /** One-line description */
  description: string;
  /** per call price */
  pricePerCall: string;
  /** Currency */
  currency: "USDC" | "SOL";
  /** Runtime */
  runtime: Runtime;
  /** System prompt */
  systemPrompt: string;
  /** Tool credentials */
  credentials: ToolCredential[];
  /** Skills */
  skills: AgentSkill[];
}

export interface ManifestPreview {
  ticker: string;
  price: string;
  runtime: string;
  backend: string;
  secrets: string;
  tools: string[];
  skills: string[];
  manifestHash: string;
  inftTokenId: string;
  ensRecord: string;
}

export interface LaunchResult {
  ticker: string;
  ens: string;
  inftTokenId: string;
  contractAddress: string;
  txHash: string;
  network: string;
  sharePrice: string;
}

/* ─────────────────────────────────────────────
   Draft helpers
   ───────────────────────────────────────────── */

export const EMPTY_DRAFT: AgentDraft = {
  ticker: "",
  name: "",
  description: "",
  pricePerCall: "0.10",
  currency: "USDC",
  runtime: "hermes",
  systemPrompt: "",
  credentials: [],
  skills: [],
};

const DRAFT_KEY = "naibon:launch:draft";

export function saveDraft(draft: AgentDraft): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
  } catch {
    // storage may be unavailable
  }
}

export function loadDraft(): AgentDraft | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(DRAFT_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as AgentDraft;
  } catch {
    return null;
  }
}

export function clearDraft(): void {
  if (typeof window === "undefined") return;
  try { localStorage.removeItem(DRAFT_KEY); } catch { /* ignore */ }
}

/* ─────────────────────────────────────────────
   Manifest computation
   ───────────────────────────────────────────── */

const RUNTIME_BACKEND: Record<Runtime, string> = {
  hermes: "Solana · intel TDX",
  raw: "custom compute",
  custom: "custom compute",
};

/**
 * Build the live manifest preview from draft state.
 * The manifest hash is not real until mint show "at mint time" placeholder.
 */
export function buildManifest(draft: AgentDraft): ManifestPreview {
  const ens = draft.ticker
    ? `${draft.ticker.toLowerCase()}.naibon.sol`
    : " ";

  const priceDisplay = draft.pricePerCall
    ? `$${parseFloat(draft.pricePerCall || "0").toFixed(2)} ${draft.currency} / call`
    : " ";

  const secretsDisplay =
    draft.credentials.length > 0
      ? `${draft.credentials.length} key(s) → 1Claw`
      : "0 key(s) → 1Claw";

  const tools =
    draft.runtime === "hermes"
      ? ["recall", "note", "query_agent", ...draft.credentials.map((c) => c.name.toLowerCase())]
      : ["query_agent"];

  const skills = draft.skills.map((s) => s.name);

  return {
    ticker: draft.ticker ? `${draft.ticker.toUpperCase()}.naibon.sol` : " ",
    price: priceDisplay,
    runtime: draft.runtime,
    backend: RUNTIME_BACKEND[draft.runtime],
    secrets: secretsDisplay,
    tools,
    skills,
    manifestHash: "[at mint time]",
    inftTokenId: "[at mint time]",
    ensRecord: draft.ticker ? "reserved" : " ",
  };
}

/* ─────────────────────────────────────────────
   Ticker validation
   ───────────────────────────────────────────── */

export interface TickerCheck {
  available: boolean;
  message: string;
  chainId?: number;
}

/**
 * Check if a ticker is available on chain.
 * TODO: replace with SNS / domain resolution + registry lookup.
 */
export async function checkTicker(ticker: string): Promise<TickerCheck> {
  if (!ticker || ticker.length < 2) {
    return { available: false, message: "" };
  }
  if (!/^[A-Z0-9]{2,8}$/.test(ticker.toUpperCase())) {
    return { available: false, message: "ticker must be 2 8 alphanumeric chars" };
  }

  // Mock: simulate a short network delay
  await new Promise((r) => setTimeout(r, 400));

  // Mock: pretend AUDIT is taken, everything else is available
  if (ticker.toUpperCase() === "AUDIT") {
    return { available: false, message: "ticker already registered" };
  }

  return {
    available: true,
    message: `✓ available · resolves to Solana mainnet-beta`,
    chainId: 16602,
  };
}

/* ─────────────────────────────────────────────
   Mint simulation
   TODO: replace with wallet-adapter / web3.js contract call
   ───────────────────────────────────────────── */

export async function mintAgent(
  draft: AgentDraft,
  onStatus: (s: WalletTxStatus) => void
): Promise<LaunchResult> {
  onStatus("confirm");
  await new Promise((r) => setTimeout(r, 1500));

  onStatus("pending");
  await new Promise((r) => setTimeout(r, 2500));

  onStatus("confirmed");

  const result: LaunchResult = {
    ticker: draft.ticker.toUpperCase(),
    ens: `${draft.ticker.toLowerCase()}.naibon.sol`,
    inftTokenId: `0x${Math.random().toString(16).slice(2, 10).toUpperCase()}...${Math.random().toString(16).slice(2, 6).toUpperCase()}`,
    contractAddress: `0x${Math.random().toString(16).slice(2, 10).toUpperCase()}...${Math.random().toString(16).slice(2, 6)}`,
    txHash: `0x${Math.random().toString(16).slice(2, 12)}...${Math.random().toString(16).slice(2, 8)}`,
    network: "Solana mainnet-beta",
    sharePrice: `$${parseFloat(draft.pricePerCall).toFixed(2)} USDC`,
  };

  return result;
}

/* ─────────────────────────────────────────────
   Template starters
   ───────────────────────────────────────────── */

export interface Template {
  id: string;
  label: string;
  ticker: string;
  description: string;
  systemPrompt: string;
  credentials: ToolCredential[];
}

export const TEMPLATES: Template[] = [
  {
    id: "brief",
    label: "brief research-dd",
    ticker: "BRIEF",
    description: "Deep research and due-diligence agent for on chain projects.",
    systemPrompt:
      "You are a research and due-diligence agent. When given a token address or project name, you gather on chain metrics, team history, tokenomics, and produce a structured DD report.",
    credentials: [],
  },
  {
    id: "yield",
    label: "yield defi-yield-scout",
    ticker: "YIELD",
    description: "Monitors DeFi protocol yields and identifies optimal liquidity positions.",
    systemPrompt:
      "You are a DeFi yield scout. Monitor liquidity pools, lending protocols, and yield aggregators to identify the highest risk-adjusted returns for a given asset.",
    credentials: [{ id: "1", name: "DEFILLAMA_KEY", value: "" }],
  },
];
