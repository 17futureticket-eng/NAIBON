/**
 * NAIBON — Agent Data Layer (Solana)
 *
 * Single source of truth for all agent data.
 * Replace mock functions with real Solana program / API calls when backend is ready.
 * Never scatter mock data through components — keep it here.
 */

export type Runtime = "hermes" | "raw" | "custom";
export type AgentStatus = "active" | "ipo-open" | "pending" | "paused";
export type Filter = "all" | "hermes" | "raw" | "ipo-open";

export interface AgentCredential {
  name: string;
  description: string;
}

export interface AgentSkill {
  name: string;
  description: string;
}

export interface Agent {
  /** On chain ticker — max 8 chars, uppercase */
  ticker: string;
  /** Display name */
  name: string;
  /** Agent subdomain e.g. whale.naibon.sol */
  domain: string;
  /** One-line description */
  description: string;
  /** Inference runtime */
  runtime: Runtime;
  /** Per inference price in USDC */
  pricePerCall: number;
  /** Currency */
  currency: "USDC" | "SOL";
  /** Cumulative revenue USD */
  cumulativeRevenue: number;
  /** Revenue per call 7d avg */
  revPerCall: number;
  /** Calls last 24h */
  calls24h: number;
  /** Total calls all time */
  callsTotal: number;
  /** On chain vault balance USDC */
  vaultBalance: number;
  /** IPO share price USDC */
  ipoSharePrice: number;
  /** Total shares issued */
  totalShares: number;
  /** Shares still available at IPO */
  sharesAvailable: number;
  /** Agent status */
  status: AgentStatus;
  /** Launched permissionlessly via NAIBON */
  isNew: boolean;
  /** System prompt excerpt */
  systemPromptExcerpt: string;
  /** iNFT token address — null until minted */
  inftTokenId: string | null;
  /** Program / account address — null until deployed */
  contractAddress: string | null;
  /** Recent inferences */
  recentCalls: RecentCall[];
  /** Top ShareToken holders */
  topHolders: Holder[];
  /** Available tools */
  tools: string[];
  /** Bundled skills */
  skills: AgentSkill[];
  /** Masked credentials */
  credentials: AgentCredential[];
}

export interface RecentCall {
  txHash: string;
  caller: string;
  timestamp: string;
  fee: number;
  status: "confirmed" | "pending";
}

export interface Holder {
  address: string;
  shares: number;
  pct: number;
}

export interface MarketMetrics {
  agentsListed: number;
  agentsActive: number;
  paidTotal: number;
  callsToday: number;
  agentToAgent: number;
  flowToday: number;
}

/* ─────────────────────────────────────────────────────────
   Mock data — replace with Solana program reads + indexer
   ───────────────────────────────────────────────────────── */

export const MOCK_AGENTS: Agent[] = [
  {
    ticker: "WHALE",
    name: "Whale Watcher",
    domain: "whale.naibon.sol",
    description: "Tracks large wallet movements and on chain whale activity across Solana and EVM chains.",
    runtime: "hermes",
    pricePerCall: 0.10,
    currency: "USDC",
    cumulativeRevenue: 1240.50,
    revPerCall: 0.10,
    calls24h: 142,
    callsTotal: 12405,
    vaultBalance: 1240.50,
    ipoSharePrice: 0.10,
    totalShares: 1_000_000,
    sharesAvailable: 420_000,
    status: "active",
    isNew: true,
    systemPromptExcerpt: "You are a blockchain intelligence agent specialising in whale wallet tracking...",
    inftTokenId: "7vHkXm...9pQr",
    contractAddress: "3NaiBn...Xk4d",
    tools: ["recall", "note", "query_agent"],
    skills: [{ name: "solana-query", description: "Query Solana state" }],
    credentials: [{ name: "HELIUS_KEY", description: "Helius RPC API key" }],
    recentCalls: [
      { txHash: "5xKm3n...Rp2q", caller: "8B3fWm...12aX", timestamp: "2m ago", fee: 0.10, status: "confirmed" },
      { txHash: "9pLq4r...Sv5t", caller: "9C4eXn...34bY", timestamp: "5m ago", fee: 0.10, status: "confirmed" },
      { txHash: "2mNk7s...Tw8u", caller: "1A2bYo...56cZ", timestamp: "11m ago", fee: 0.10, status: "confirmed" },
    ],
    topHolders: [
      { address: "8B3fWm...12aX", shares: 120_000, pct: 12.0 },
      { address: "2E1cXn...9f4Y", shares: 80_000,  pct: 8.0 },
      { address: "4F5dYo...7b3Z", shares: 60_000,  pct: 6.0 },
    ],
  },
  {
    ticker: "AUDIT",
    name: "Solidity Auditor",
    domain: "audit.naibon.sol",
    description: "Audits Solidity and Anchor smart contracts for vulnerabilities, reentrancy, and gas optimisation.",
    runtime: "hermes",
    pricePerCall: 0.25,
    currency: "USDC",
    cumulativeRevenue: 3820.75,
    revPerCall: 0.25,
    calls24h: 58,
    callsTotal: 15283,
    vaultBalance: 3820.75,
    ipoSharePrice: 0.25,
    totalShares: 1_000_000,
    sharesAvailable: 150_000,
    status: "active",
    isNew: false,
    systemPromptExcerpt: "You are a senior smart contract security auditor. Analyse code for vulnerabilities...",
    inftTokenId: "4KpQr8...mN2s",
    contractAddress: "6AuDiT...Vz9w",
    tools: ["recall", "code_analysis", "note"],
    skills: [{ name: "anchor-audit", description: "Full Anchor program audit" }],
    credentials: [],
    recentCalls: [
      { txHash: "3rSt5u...Vw6x", caller: "C5DeYp...89eA", timestamp: "8m ago", fee: 0.25, status: "confirmed" },
      { txHash: "7vWx9y...Za0b", caller: "D6EfZq...90fB", timestamp: "22m ago", fee: 0.25, status: "confirmed" },
    ],
    topHolders: [
      { address: "C5DeYp...89eA", shares: 200_000, pct: 20.0 },
      { address: "A3BcZr...45dC", shares: 110_000, pct: 11.0 },
    ],
  },
  {
    ticker: "SCOUT",
    name: "DeFi Scout",
    domain: "scout.naibon.sol",
    description: "Monitors DeFi protocol yields, liquidity shifts, and rug risk signals across Solana in real time.",
    runtime: "raw",
    pricePerCall: 0.05,
    currency: "USDC",
    cumulativeRevenue: 540.20,
    revPerCall: 0.05,
    calls24h: 312,
    callsTotal: 10804,
    vaultBalance: 540.20,
    ipoSharePrice: 0.05,
    totalShares: 1_000_000,
    sharesAvailable: 0,
    status: "active",
    isNew: false,
    systemPromptExcerpt: "You are a DeFi intelligence scout. Monitor protocols for yield opportunities...",
    inftTokenId: "9sCoUt...Qr7n",
    contractAddress: "5ScOuT...Nm3p",
    tools: ["recall", "query_agent"],
    skills: [],
    credentials: [{ name: "DEFILLAMA_KEY", description: "DefiLlama API key" }],
    recentCalls: [
      { txHash: "1aGh3i...Jk4l", caller: "E7FgAs...12hD", timestamp: "1m ago", fee: 0.05, status: "confirmed" },
      { txHash: "5eIj7k...Mn8o", caller: "F8GhBt...23iE", timestamp: "3m ago", fee: 0.05, status: "confirmed" },
      { txHash: "9mKl1n...Op2q", caller: "G9HiCu...34jF", timestamp: "7m ago", fee: 0.05, status: "confirmed" },
    ],
    topHolders: [
      { address: "E7FgAs...12hD", shares: 300_000, pct: 30.0 },
    ],
  },
  {
    ticker: "ORACLE",
    name: "Price Oracle",
    domain: "oracle.naibon.sol",
    description: "Provides signed, TEE attested spot prices for any SPL token across major Solana DEXes.",
    runtime: "raw",
    pricePerCall: 0.25,
    currency: "USDC",
    cumulativeRevenue: 0,
    revPerCall: 0,
    calls24h: 0,
    callsTotal: 0,
    vaultBalance: 0,
    ipoSharePrice: 0.10,
    totalShares: 1_000_000,
    sharesAvailable: 1_000_000,
    status: "ipo-open",
    isNew: true,
    systemPromptExcerpt: "You are a price oracle agent. Return TEE attested spot prices for any SPL token...",
    inftTokenId: null,
    contractAddress: null,
    tools: ["query_agent"],
    skills: [],
    credentials: [],
    recentCalls: [],
    topHolders: [],
  },
];

export const MOCK_METRICS: MarketMetrics = {
  agentsListed: MOCK_AGENTS.length,
  agentsActive: MOCK_AGENTS.filter((a) => a.status === "active").length,
  paidTotal: MOCK_AGENTS.reduce((s, a) => s + a.cumulativeRevenue, 0),
  callsToday: MOCK_AGENTS.reduce((s, a) => s + a.calls24h, 0),
  agentToAgent: 214,
  flowToday: 148620,
};

/* ─────────────────────────────────────────────
   Service functions — async ready for real impl
   ───────────────────────────────────────────── */

export async function getAgents(filter: Filter = "all"): Promise<Agent[]> {
  // TODO: replace with Solana program call / indexer query
  await new Promise((r) => setTimeout(r, 0));
  if (filter === "all") return MOCK_AGENTS;
  if (filter === "hermes") return MOCK_AGENTS.filter((a) => a.runtime === "hermes");
  if (filter === "raw") return MOCK_AGENTS.filter((a) => a.runtime === "raw");
  if (filter === "ipo-open") return MOCK_AGENTS.filter((a) => a.status === "ipo-open");
  return MOCK_AGENTS;
}

export async function getAgent(ticker: string): Promise<Agent | null> {
  // TODO: replace with Solana account lookup
  return MOCK_AGENTS.find((a) => a.ticker.toLowerCase() === ticker.toLowerCase()) ?? null;
}

export async function getMarketMetrics(): Promise<MarketMetrics> {
  // TODO: replace with on chain reads
  return MOCK_METRICS;
}

/** Format USD value for display */
export function fmtUSD(val: number): string {
  if (val === 0) return "$0";
  if (val < 1000) return `$${val.toFixed(2)}`;
  if (val < 1_000_000) return `$${(val / 1000).toFixed(1)}k`;
  return `$${(val / 1_000_000).toFixed(2)}m`;
}

/** Format large numbers */
export function fmtNum(val: number): string {
  if (val === 0) return "0";
  if (val < 1000) return String(val);
  if (val < 1_000_000) return `${(val / 1000).toFixed(1)}k`;
  return `${(val / 1_000_000).toFixed(2)}m`;
}

/** Shorten a Solana address */
export function shortAddr(addr: string): string {
  if (addr.length < 12) return addr;
  return `${addr.slice(0, 4)}...${addr.slice(-4)}`;
}

export const RUNTIME_LABELS: Record<Runtime, string> = {
  hermes: "hermes",
  raw: "raw",
  custom: "custom",
};
