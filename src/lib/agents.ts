/**
 * LUMA — Agent Data Layer (EVM / ERC-20)
 *
 * Single source of truth for all agent data.
 * Replace mock functions with real EVM contract / API calls when backend is ready.
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
  /** On-chain ticker — max 8 chars, uppercase */
  ticker: string;
  /** Display name */
  name: string;
  /** Agent ENS subdomain e.g. whale.luma.eth */
  domain: string;
  /** One-line description */
  description: string;
  /** Inference runtime */
  runtime: Runtime;
  /** Per inference price in USDC */
  pricePerCall: number;
  /** Currency */
  currency: "USDC" | "ETH";
  /** Cumulative revenue USD */
  cumulativeRevenue: number;
  /** Revenue per call 7d avg */
  revPerCall: number;
  /** Calls last 24h */
  calls24h: number;
  /** Total calls all time */
  callsTotal: number;
  /** On-chain vault balance USDC */
  vaultBalance: number;
  /** IPO share price USDC */
  ipoSharePrice: number;
  /** Total ERC-20 shares issued */
  totalShares: number;
  /** Shares still available at IPO */
  sharesAvailable: number;
  /** Agent status */
  status: AgentStatus;
  /** Launched permissionlessly via LUMA */
  isNew: boolean;
  /** System prompt excerpt */
  systemPromptExcerpt: string;
  /** iNFT token address — null until minted */
  inftTokenId: string | null;
  /** ERC-20 contract address — null until deployed */
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
   Mock data — replace with EVM contract reads + indexer
   ───────────────────────────────────────────────────────── */

export const MOCK_AGENTS: Agent[] = [
  {
    ticker: "WHALE",
    name: "Whale Watcher",
    domain: "whale.luma.eth",
    description: "Tracks large wallet movements and on-chain whale activity across EVM chains.",
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
    inftTokenId: "0x7vHk...9pQr",
    contractAddress: "0x3NaB...Xk4d",
    tools: ["recall", "note", "query_agent"],
    skills: [{ name: "evm-query", description: "Query EVM chain state" }],
    credentials: [{ name: "ALCHEMY_KEY", description: "Alchemy RPC API key" }],
    recentCalls: [
      { txHash: "0x5xKm...Rp2q", caller: "0x8B3f...12aX", timestamp: "2m ago", fee: 0.10, status: "confirmed" },
      { txHash: "0x9pLq...Sv5t", caller: "0x9C4e...34bY", timestamp: "5m ago", fee: 0.10, status: "confirmed" },
      { txHash: "0x2mNk...Tw8u", caller: "0x1A2b...56cZ", timestamp: "11m ago", fee: 0.10, status: "confirmed" },
    ],
    topHolders: [
      { address: "0x8B3f...12aX", shares: 120_000, pct: 12.0 },
      { address: "0x2E1c...9f4Y", shares: 80_000,  pct: 8.0 },
      { address: "0x4F5d...7b3Z", shares: 60_000,  pct: 6.0 },
    ],
  },
  {
    ticker: "AUDIT",
    name: "Solidity Auditor",
    domain: "audit.luma.eth",
    description: "Audits Solidity smart contracts for vulnerabilities, reentrancy, and gas optimisation.",
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
    systemPromptExcerpt: "You are a senior smart contract security auditor. Analyse Solidity code for vulnerabilities...",
    inftTokenId: "0x4KpQ...mN2s",
    contractAddress: "0x6AuD...Vz9w",
    tools: ["recall", "code_analysis", "note"],
    skills: [{ name: "solidity-audit", description: "Full Solidity contract audit" }],
    credentials: [],
    recentCalls: [
      { txHash: "0x3rSt...Vw6x", caller: "0xC5De...89eA", timestamp: "8m ago",  fee: 0.25, status: "confirmed" },
      { txHash: "0x7vWx...Za0b", caller: "0xD6Ef...90fB", timestamp: "22m ago", fee: 0.25, status: "confirmed" },
    ],
    topHolders: [
      { address: "0xC5De...89eA", shares: 200_000, pct: 20.0 },
      { address: "0xA3Bc...45dC", shares: 110_000, pct: 11.0 },
    ],
  },
  {
    ticker: "SCOUT",
    name: "DeFi Scout",
    domain: "scout.luma.eth",
    description: "Monitors DeFi protocol yields, liquidity shifts, and rug risk signals across EVM chains.",
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
    inftTokenId: "0x9sCo...Qr7n",
    contractAddress: "0x5ScO...Nm3p",
    tools: ["recall", "query_agent"],
    skills: [],
    credentials: [{ name: "DEFILLAMA_KEY", description: "DefiLlama API key" }],
    recentCalls: [
      { txHash: "0x1aGh...Jk4l", caller: "0xE7Fg...12hD", timestamp: "1m ago", fee: 0.05, status: "confirmed" },
      { txHash: "0x5eIj...Mn8o", caller: "0xF8Gh...23iE", timestamp: "3m ago", fee: 0.05, status: "confirmed" },
      { txHash: "0x9mKl...Op2q", caller: "0xG9Hi...34jF", timestamp: "7m ago", fee: 0.05, status: "confirmed" },
    ],
    topHolders: [
      { address: "0xE7Fg...12hD", shares: 300_000, pct: 30.0 },
    ],
  },
  {
    ticker: "ORACLE",
    name: "Price Oracle",
    domain: "oracle.luma.eth",
    description: "Provides signed, TEE-attested spot prices for any ERC-20 token across major EVM DEXes.",
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
    systemPromptExcerpt: "You are a price oracle agent. Return TEE-attested spot prices for any ERC-20 token...",
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
  // TODO: replace with EVM contract call / indexer query
  await new Promise((r) => setTimeout(r, 0));
  if (filter === "all")       return MOCK_AGENTS;
  if (filter === "hermes")    return MOCK_AGENTS.filter((a) => a.runtime === "hermes");
  if (filter === "raw")       return MOCK_AGENTS.filter((a) => a.runtime === "raw");
  if (filter === "ipo-open")  return MOCK_AGENTS.filter((a) => a.status === "ipo-open");
  return MOCK_AGENTS;
}

export async function getAgent(ticker: string): Promise<Agent | null> {
  // TODO: replace with EVM contract lookup
  return MOCK_AGENTS.find((a) => a.ticker.toLowerCase() === ticker.toLowerCase()) ?? null;
}

export async function getMarketMetrics(): Promise<MarketMetrics> {
  // TODO: replace with on-chain reads
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

/** Shorten an EVM address */
export function shortAddr(addr: string): string {
  if (addr.length < 12) return addr;
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
}

export const RUNTIME_LABELS: Record<Runtime, string> = {
  hermes: "hermes",
  raw: "raw",
  custom: "custom",
};
