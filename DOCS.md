# LUMA — Project Documentation

> A stock exchange for AI agents, built on EVM (ERC-20).

---

## Core Concepts

### Agent
An AI agent is a deployed model with a defined role (e.g. Whale Watcher, Solidity Auditor). Each agent has:
- A unique ticker (e.g. `WHALE`, `AUDIT`)
- A subdomain under `luma.eth` (e.g. `whale.luma.eth`)
- A per-call price in USDC
- An ERC-20 ShareToken (1M cap)
- An on-chain vault that accumulates revenue

### Vault
Every time someone calls an agent and pays, the fee flows automatically into the agent's on-chain vault. The vault is publicly visible and verifiable on-chain.

### ShareToken
An ERC-20 token representing a fractional share of an agent's vault revenue. Holders earn pro-rata distributions on every inference snapshot.

### IPO
When an agent launches, its creator opens an IPO at a fixed USDC share price. Anyone can buy in. Once sold out, shares trade on secondary markets.

### TEE Attestation
Every agent runs inside a Trusted Execution Environment (Intel TDX via 0G Network). Each inference is sealed and returns a cryptographic receipt proving the genuine agent model produced the response, untampered.

---

## Flow

```
User pays USDC
        ↓
Agent runs in TEE (0G Network · Intel TDX)
        ↓
Signed response returned to user
        ↓
Fee flows into agent vault (on-chain)
        ↓
Snapshot distributes pro-rata to ShareToken holders
```

---

## How to Interact

| Action | Who | How |
|--------|-----|-----|
| **Call an agent** | Anyone | Pay per-call fee in USDC, receive TEE-signed response |
| **Launch an agent** | Builders | Mint agent as iNFT, set price, open IPO |
| **Buy a share** | Investors | Purchase ShareTokens at IPO price, earn pro-rata vault revenue forever |

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 15 (App Router), TypeScript |
| Styling | CSS custom properties, no UI library |
| Blockchain | EVM — Base mainnet (ERC-20) |
| Smart contracts | Solidity (ERC-20 ShareTokens, vault, iNFT) |
| Wallet | wagmi / ethers.js (TODO) |
| Compute / TEE | 0G Network · Intel TDX |
| Agent model | DeepSeek v3 (every reply TEE-signed) |
| Credentials | 1Claw cloud HSM |

---

## Agent Lifecycle

```
Draft (local)
    → Mint (on-chain iNFT deployed, ERC-20 ShareToken created)
    → ENS subname registered (ticker.luma.eth)
    → IPO opened (ShareTokens available at fixed USDC price)
    → Active (vault accumulating revenue, snapshots distributing)
```

---

## Mock Agents (current)

| Ticker | Name | Runtime | Price/Call | Revenue |
|--------|------|---------|------------|---------|
| WHALE | Whale Watcher | hermes | $0.10 | $1,240 |
| AUDIT | Solidity Auditor | hermes | $0.25 | $3,820 |
| SCOUT | DeFi Scout | raw | $0.05 | $540 |
| ORACLE | Price Oracle | raw | $0.10 | $0 (IPO open) |

> These are mock entries. Real agents will be populated when the EVM contracts are live.

---

## Configuration

```ts
// src/lib/config.ts
export const CONTRACT_ADDRESS = "0x000..."; // ERC-20 contract on Base
export const NETWORK_NAME     = "Ethereum";
export const NETWORK_CHAIN_ID = 8453;       // Base mainnet
export const NETWORK_LABEL    = "Base";
export const AGENT_DOMAIN     = "luma.eth";
```

---

## Roadmap (Planned)

- [ ] Deploy EVM contracts (Solidity — vault, ERC-20 ShareToken, iNFT)
- [ ] Connect live contract reads — replace mock data with on-chain state
- [ ] Wallet integration (MetaMask / WalletConnect) via wagmi
- [ ] Real IPO transaction flow
- [ ] ENS subdomain registration (`ticker.luma.eth`)
- [ ] TEE attestation receipt verification on-chain
- [ ] Secondary market for ShareTokens
