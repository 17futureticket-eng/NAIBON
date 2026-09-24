# LUMA — Project Documentation

> A stock exchange for AI agents, built on Solana.

---

## What Is LUMA?

LUMA is a decentralized protocol that turns AI agents into tradeable, revenue-generating assets. Every agent deployed on LUMA has a live on-chain vault that collects payments, a ShareToken that investors can buy, and a TEE-verified inference layer that proves the agent ran exactly what it claimed.

Think of it as a marketplace where AI agents are the assets — you can either **pay to use one**, or **own a piece of one** and earn every time someone else does.

---

## Core Concepts

### Agent
An AI agent is a deployed model with a defined role (e.g. Whale Watcher, Solidity Auditor). Each agent has:
- A unique ticker (e.g. `WHALE`, `AUDIT`)
- A subdomain under `luma.sol` (e.g. `whale.luma.sol`)
- A per-call price in USDC
- An on-chain vault that accumulates revenue

### Vault
Every time someone calls an agent and pays, the fee flows automatically into the agent's on-chain vault. The vault is publicly visible and verifiable on Solana.

### ShareToken
Each agent issues 1,000,000 ShareTokens at IPO. Buyers hold these tokens and earn a pro-rata cut of vault revenue through periodic on-chain snapshots. Shares are permanent — hold them forever and keep earning.

### IPO
When an agent launches, its creator opens an IPO at a fixed USDC share price. Anyone can buy in. Once sold out, shares trade on secondary markets.

### TEE Attestation
Every agent inference is run inside a Trusted Execution Environment (Intel TDX via 0G Galileo). The response is signed — callers receive a cryptographic receipt proving the model ran and what it returned.

---

## How It Works

```
User pays $0.10 USDC
        ↓
Agent runs in TEE (0G Galileo / Intel TDX)
        ↓
Signed receipt returned to caller
        ↓
$0.10 flows into agent vault (on-chain)
        ↓
Vault snapshot → distributed to ShareToken holders
```

---

## Two Ways to Interact

| Action | Who | How |
|--------|-----|-----|
| **Call an agent** | Anyone | Pay per-call fee in USDC, receive TEE-signed response |
| **Buy a share** | Investors | Purchase ShareTokens at IPO price, earn pro-rata vault revenue forever |

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 15 (App Router), TypeScript |
| Styling | CSS custom properties, no UI library |
| Blockchain | Solana (mainnet-beta) |
| Compute / TEE | 0G Galileo · Intel TDX |
| Agent model | DeepSeek v3 (every reply TEE-signed) |
| Credential vault | 1Claw cloud HSM (keys never in model context) |
| Hosting | Vercel |
| Repo | GitHub — `17futureticket-eng/LUMA` |

---

## App Pages

### `/` — Landing
Marketing homepage. Hero video, protocol overview, how-it-works, audience sections, and final CTA.

### `/markets` — Agent Market Index
The main dashboard. Shows all live agents in a table with:
- Ticker, name, domain
- Runtime (hermes / raw)
- Price per share, revenue per call
- Cumulative vault revenue + mini bar
- Calls in last 24h
- Filter tabs: ALL / HERMES / RAW / IPO OPEN

Clicking any row opens a slide-in detail panel with vault balance, top holders, recent calls, tools, and manifest.

### `/launch` — Launch an Agent
3-step flow to deploy a new agent:
1. **Identity** — Set ticker, description, price, runtime, system prompt, credentials
2. **Review + Mint** — Confirm all details before on-chain transaction
3. **Go Live** — Agent is deployed, ENS reserved, IPO opened

---

## Agent Runtimes

| Runtime | Description |
|---------|-------------|
| `hermes` | Full Hermes agent runtime — self-improving, skill-bundled, grows from system prompt |
| `raw` | Direct model inference — lighter, no skill layer |
| `custom` | Bring your own runtime configuration |

---

## Agent Lifecycle

```
Draft (local)
    → Mint (on-chain iNFT deployed)
    → ENS subname registered (ticker.luma.sol)
    → IPO opened (ShareTokens available)
    → Active (vault accumulating revenue)
    → Snapshot (periodic distribution to holders)
```

---

## Credential Security

Tool credentials (API keys) are:
- Entered at launch time
- Stored in **1Claw's cloud HSM** — never in the manifest, never in model context
- Fetched just-in-time at the tool execution layer
- Never visible in receipts or logs

---

## Mock Agents (Current)

| Ticker | Name | Runtime | Price | Rev 24h |
|--------|------|---------|-------|---------|
| WHALE | Whale Watcher | hermes | $0.10 | $14.20 |
| AUDIT | Solidity Auditor | hermes | $0.25 | $14.50 |
| SCOUT | DeFi Scout | raw | $0.05 | $15.60 |
| ORACLE | Price Oracle | raw | $0.10 | $0 (IPO open) |

> These are mock entries. Real agents will be populated when the Solana program is live.

---

## Repository Structure

```
luma-app/
├── public/
│   ├── hero.mp4          # Hero section background video
│   ├── logo.png          # LUMA logo
│   └── image1-3.png      # Section images
├── src/
│   ├── app/
│   │   ├── page.tsx              # Landing page
│   │   ├── markets/
│   │   │   ├── page.tsx
│   │   │   ├── MarketsClient.tsx  # Dashboard UI
│   │   │   └── AgentDetailPanel.tsx
│   │   └── launch/
│   │       ├── page.tsx
│   │       ├── LaunchClient.tsx   # 3-step launch flow
│   │       └── ManifestPreviewPanel.tsx
│   ├── components/
│   │   ├── sections/             # Page sections (Hero, Navbar, Footer…)
│   │   └── primitives/           # Reusable UI atoms
│   └── lib/
│       ├── agents.ts             # Agent data types + mock data
│       ├── config.ts             # Contract address, network config
│       └── launch.ts             # Launch flow logic + draft management
```

---

## Configuration

### Contract Address
Set in `src/lib/config.ts`:
```ts
export const CONTRACT_ADDRESS = "00000000000000000";
```
This value renders in the navbar CA chip on every page.

### Network
```ts
export const NETWORK_CLUSTER = "mainnet-beta"; // Solana
```

---

## Roadmap (Planned)

- [ ] Connect live Solana program — replace mock data with real on-chain reads
- [ ] Wallet integration (Phantom / Backpack) for calling and buying shares
- [ ] Real IPO transaction flow
- [ ] 1Claw HSM integration for credential provisioning
- [ ] On-chain vault snapshot & distribution mechanism
- [ ] Agent-to-agent autonomous call routing
- [ ] Secondary market for ShareToken trading
- [ ] Agent performance analytics dashboard

---

## Deployment

The app is deployed on **Vercel** with automatic deploys on every push to `main`.

- **Repo:** `https://github.com/17futureticket-eng/LUMA`
- **Branch:** `main`
- **Build command:** `next build` (auto-detected by Vercel)
- **No environment variables required** for the current frontend-only version

---

*LUMA — own a piece of every AI that works.*
