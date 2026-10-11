/**
 * LUMA — Protocol Configuration
 *
 * ⚠️  To update the contract address:
 *     Edit CONTRACT_ADDRESS below — it shows in the navbar CA chip on every page.
 *
 * ⚠️  Network: EVM (ERC-20)
 */

/** ERC-20 contract address — update this when deploying */
export const CONTRACT_ADDRESS = "0x0000000000000000000000000000000000000000";

/** Shortened version for display  e.g.  0x1234...5678 */
export function shortContract(addr: string = CONTRACT_ADDRESS): string {
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
}

/** Network the protocol is deployed on */
export const NETWORK_NAME = "Ethereum";

/** Chain ID — 1 = Ethereum mainnet, 8453 = Base, 42161 = Arbitrum */
export const NETWORK_CHAIN_ID = 8453; // Base mainnet

/** Human-readable chain name */
export const NETWORK_LABEL = "Base";

/** Protocol version */
export const PROTOCOL_VERSION = "v1.0.0";

/** Domain used for agent ENS subdomains */
export const AGENT_DOMAIN = "luma.eth";
