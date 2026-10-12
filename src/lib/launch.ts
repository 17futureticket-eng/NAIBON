/**
 * LUMA Launch Agent Data Layer (EVM / ERC-20)
 *
 * Manages draft state, manifest computation, and the mint/deploy flow.
 * Replace mock functions with real wallet/contract calls when ready.
 */

import type { Runtime, AgentSkill, AgentCredential } from "./agents";

export type LaunchStep = 1 | 2 | 3;

export type WalletTxStatus =
  | "idle"
  | "connecting"
  | "confirm"    // waiting for user to confirm in wallet
  | "pending"    // tx submitted, waiting for on-chain confirmation
  | "confirmed"  // tx mined
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
  /** Per-call price */
  pricePerCall: string;
  /** Currency */
  currency: "USDC" | "ETH";
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

const DRAFT_KEY = "luma:launch:draft";

export function saveDraft(draft: AgentDraft): void {
  if (typeof window === "undefined") return;
  try { localStorage.setItem(DRAFT_KEY, JSON.stringify(draft)); } catch { /* storage unavailable */ }
}

export function loadDraft(): AgentDraft | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(DRAFT_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as AgentDraft;
  } catch { return null; }
}

export function clearDraft(): void {
  if (typeof window === "undefined") return;
  try { localStorage.removeItem(DRAFT_KEY); } catch { /* ignore */ }
}

/* ─────────────────────────────────────────────
   Manifest computation
   ───────────────────────────────────────────── */

const RUNTIME_BACKEND: Record<Runtime, string> = {
  hermes: "EVM · Intel TDX",
  raw:    "custom compute",
  custom: "custom compute",
};

export function buildManifest(draft: AgentDraft): ManifestPreview {
  const ens = draft.ticker
    ? `${draft.ticker.toLowerCase()}.luma.eth`
    : " ";

  const priceDisplay = draft.pricePerCall
    ? `$${parseFloat(draft.pricePerCall || "0").toFixed(2)} ${draft.currency} / call`
    : " ";

  const secretsDisplay = draft.credentials.length > 0
    ? `${draft.credentials.length} key(s) → secure HSM`
    : "0 key(s) → secure HSM";

  const tools = draft.runtime === "hermes"
    ? ["recall", "note", "query_agent", ...draft.credentials.map((c) => c.name.toLowerCase())]
    : ["query_agent"];

  const skills = draft.skills.map((s) => s.name);

  return {
    ticker:       draft.ticker ? `${draft.ticker.toUpperCase()}.luma.eth` : " ",
    price:        priceDisplay,
    runtime:      draft.runtime,
    backend:      RUNTIME_BACKEND[draft.runtime],
    secrets:      secretsDisplay,
    tools,
    skills,
    manifestHash: "[at mint time]",
    inftTokenId:  "[at mint time]",
    ensRecord:    draft.ticker ? "reserved" : " ",
  };
}

/* ─────────────────────────────────────────────
   Ticker validation
   ───────────────────────────────────────────── */

export interface TickerCheck {
  available: boolean;
  message: string;
}

/**
 * Check if a ticker is available on chain.
 * TODO: replace with ENS subdomain resolution + ERC-20 registry lookup.
 */
export async function checkTicker(ticker: string): Promise<TickerCheck> {
  if (!ticker || ticker.length < 2) {
    return { available: false, message: "" };
  }
  if (!/^[A-Z0-9]{2,8}$/.test(ticker.toUpperCase())) {
    return { available: false, message: "Ticker must be 2–8 alphanumeric chars" };
  }

  // Simulate network delay
  await new Promise((r) => setTimeout(r, 400));

  // Mock: AUDIT is taken, everything else available
  if (ticker.toUpperCase() === "AUDIT") {
    return { available: false, message: "Ticker already registered" };
  }

  return {
    available: true,
    message: `✓ available · resolves to Base mainnet`,
  };
}

/* ─────────────────────────────────────────────
   Mint simulation
   TODO: replace with wagmi / ethers.js contract call
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

  return {
    ticker:          draft.ticker.toUpperCase(),
    ens:             `${draft.ticker.toLowerCase()}.luma.eth`,
    inftTokenId:     `0x${Math.random().toString(16).slice(2, 10).toUpperCase()}...${Math.random().toString(16).slice(2, 6).toUpperCase()}`,
    contractAddress: `0x${Math.random().toString(16).slice(2, 10).toUpperCase()}...${Math.random().toString(16).slice(2, 6)}`,
    txHash:          `0x${Math.random().toString(16).slice(2, 12)}...${Math.random().toString(16).slice(2, 8)}`,
    network:         "Base mainnet",
    sharePrice:      `$${parseFloat(draft.pricePerCall).toFixed(2)} USDC`,
  };
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
    label: "brief — research & DD",
    ticker: "BRIEF",
    description: "Deep research and due-diligence agent for on-chain projects.",
    systemPrompt:
      "You are a research and due-diligence agent. When given a token address or project name, gather on-chain metrics, team history, tokenomics, and produce a structured DD report.",
    credentials: [],
  },
  {
    id: "yield",
    label: "yield — DeFi scout",
    ticker: "YIELD",
    description: "Monitors DeFi protocol yields and identifies optimal liquidity positions.",
    systemPrompt:
      "You are a DeFi yield scout. Monitor liquidity pools, lending protocols, and yield aggregators to identify the highest risk-adjusted returns for a given asset.",
    credentials: [{ id: "1", name: "DEFILLAMA_KEY", value: "" }],
  },
];
