/**
 * NAIBON — Protocol Configuration
 *
 * ⚠️  To update the contract address:
 *     Edit CONTRACT_ADDRESS below — it shows in the navbar CA chip on every page.
 *
 * ⚠️  Network: Solana
 */

/** Token / program address on Solana — update this when deploying */
export const CONTRACT_ADDRESS = "00000000000000000";

/** Shortened version for display  e.g.  NAiBn...Hz4 */
export function shortContract(addr: string = CONTRACT_ADDRESS): string {
  return `${addr.slice(0, 5)}...${addr.slice(-3)}`;
}

/** Network the protocol is deployed on */
export const NETWORK_NAME = "Solana";

/** Chain / cluster */
export const NETWORK_CLUSTER = "mainnet-beta";

/** Protocol version */
export const PROTOCOL_VERSION = "v1.0.0";

/** Domain used for agent subdomains */
export const AGENT_DOMAIN = "naibon.sol";
