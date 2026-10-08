import type { Metadata } from "next";
import LegalPage from "@/components/sections/LegalPage";

export const metadata: Metadata = {
  title: "Disclaimer — LUMA",
  description: "Risk disclosures and legal disclaimer for LUMA protocol users.",
};

const SECTIONS = [
  {
    heading: "Experimental Software",
    body: [
      "LUMA is experimental software. It has not been audited by a third-party security firm. Smart contracts may contain bugs, logic errors, or vulnerabilities that result in partial or total loss of funds. By using the Protocol you accept this risk in full.",
      "Do not commit funds you cannot afford to lose. Do not treat any LUMA interface copy, documentation, or social media post as a guarantee of safety or correctness.",
    ],
  },
  {
    heading: "Not Financial Advice",
    body: [
      "Nothing on the LUMA interface, in its documentation, in its smart contracts, or communicated by anyone associated with LUMA constitutes financial, investment, legal, or tax advice.",
      "ShareTokens are not securities, are not regulated financial instruments, and are not offered, sold, or marketed as investments. They represent a smart-contract mechanism for distributing on-chain inference revenue. Their value depends entirely on the usage of individual agents, which is unpredictable and may be zero.",
    ],
  },
  {
    heading: "No Guarantee of Agent Quality",
    body: [
      "Agents are deployed permissionlessly by third parties. LUMA does not vet, audit, certify, or endorse any agent listed on the Protocol. TEE attestation proves that a response came from the agent's declared model in an isolated environment — it does not guarantee that the response is accurate, legal, safe, or useful.",
      "You are responsible for evaluating the quality and suitability of any agent you interact with. Do not rely on agent outputs for medical, legal, financial, or safety-critical decisions.",
    ],
  },
  {
    heading: "Regulatory Uncertainty",
    body: [
      "The legal status of crypto-asset protocols, AI agent markets, and on-chain revenue-sharing instruments is unsettled in most jurisdictions. Laws and regulations may change in ways that affect your ability to use the Protocol or the value of any positions you hold.",
      "LUMA makes no representation about the legality of using the Protocol in any specific jurisdiction. You are solely responsible for determining whether your use complies with applicable law. Users from jurisdictions where such activity is prohibited should not use the Protocol.",
    ],
  },
  {
    heading: "Smart Contract Risk",
    body: [
      "Smart contracts execute autonomously and irrevocably on-chain. Transactions cannot be reversed. If you send funds to the wrong address, interact with a malicious contract, or make an error in a transaction, those funds may be permanently lost.",
      "LUMA's smart contracts are immutable once deployed. No admin key, multisig, or governance mechanism can pause, reverse, or override contract execution once a transaction is confirmed.",
    ],
  },
  {
    heading: "Oracle and Infrastructure Risk",
    body: "The Protocol relies on external RPC nodes, price oracles, and compute infrastructure (including 0G Network TEE nodes). Failures, downtime, or manipulation of these dependencies may affect the Protocol's functionality, inference quality, or payment flows. LUMA does not control or guarantee the availability of any third-party infrastructure.",
  },
  {
    heading: "Liquidity Risk",
    body: "ShareTokens may have limited or no secondary market liquidity at any given time. You may not be able to sell ShareTokens at any price. IPO participation does not guarantee any minimum return. Vault distributions depend on inference volume, which may be negligible or zero.",
  },
  {
    heading: "Tax",
    body: "Receiving ShareToken distributions, selling ShareTokens, or receiving inference payments may be taxable events in your jurisdiction. LUMA does not provide tax reporting tools or advice. You are solely responsible for tracking and reporting your own tax obligations.",
  },
  {
    heading: "Limitation of Liability",
    body: [
      "To the fullest extent permitted by applicable law, LUMA, its contributors, and any associated parties expressly disclaim all liability for any direct, indirect, incidental, special, or consequential damages arising from your use of the Protocol.",
      "This includes, without limitation, loss of funds, loss of data, loss of profits, and any damages arising from smart contract bugs, oracle failures, agent misbehaviour, regulatory action, or any other cause.",
    ],
  },
  {
    heading: "Use at Your Own Risk",
    body: "LUMA is provided \"as is\" and \"as available\" without warranty of any kind, express or implied. You use the Protocol entirely at your own risk. If you do not accept this risk, do not use the Protocol.",
  },
];

export default function DisclaimerPage() {
  return (
    <LegalPage
      title="Disclaimer"
      subtitle="Read this before you use LUMA. The risks are real, the software is experimental, and nothing here is financial advice. We built this to be honest with you."
      lastUpdated="October 2026"
      sections={SECTIONS}
    />
  );
}
