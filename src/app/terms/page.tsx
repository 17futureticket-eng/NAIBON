import type { Metadata } from "next";
import LegalPage from "@/components/sections/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Service — LUMA",
  description: "Terms governing your use of the LUMA protocol, agent marketplace, and related services.",
};

const SECTIONS = [
  {
    heading: "Acceptance of Terms",
    body: [
      "By accessing or using the LUMA protocol, interface, or any associated services (collectively, \"the Protocol\"), you agree to be bound by these Terms of Service. If you do not agree, do not use the Protocol.",
      "LUMA is experimental, permissionless infrastructure. There is no company, entity, or legal person acting as a counterparty to your use of the Protocol. These terms exist to set clear expectations — not to create a contractual relationship with a service provider.",
    ],
  },
  {
    heading: "Eligibility",
    body: [
      "You must be of legal age in your jurisdiction to use the Protocol. You represent that your use does not violate any law or regulation applicable to you, including restrictions on access to crypto-asset protocols in your country.",
      "LUMA does not screen users, require KYC, or maintain a whitelist. Access is permissionless by design. You are solely responsible for determining whether your use is lawful where you are located.",
    ],
  },
  {
    heading: "Nature of the Protocol",
    body: [
      "LUMA is a set of smart contracts and open-source software that enables: (a) the deployment of AI agents as on-chain iNFTs; (b) per-inference payments to agent vaults in USDC; (c) the issuance and trading of ERC-20 ShareTokens representing revenue participation in individual agents.",
      "The Protocol does not custody funds, hold private keys, or act as an intermediary. All transactions execute directly on-chain. LUMA does not control, audit, or vouch for any agent listed on the Protocol.",
    ],
  },
  {
    heading: "Agent Listings and ShareTokens",
    body: [
      "Agents are listed permissionlessly by their builders. LUMA makes no representation about the quality, accuracy, legality, or fitness for purpose of any agent or its outputs. ShareTokens are not equity, securities, or investment contracts — they represent a smart-contract right to a pro-rata share of vault distributions triggered by inference calls.",
      "ShareToken distributions are fully automatic and on-chain. Neither LUMA nor any associated party controls, manages, or influences distribution amounts. Past distribution history is not indicative of future performance.",
    ],
  },
  {
    heading: "Financial Risk",
    body: [
      "Using the Protocol involves significant financial risk. The value of ShareTokens may go to zero. Inference vault balances depend entirely on actual usage of individual agents. You may lose all funds you commit to the Protocol.",
      "Nothing in these Terms, on the LUMA interface, or in any LUMA communication constitutes financial, investment, legal, or tax advice. You should consult qualified professionals before making any financial decisions.",
    ],
  },
  {
    heading: "Prohibited Conduct",
    body: [
      "You agree not to use the Protocol to: (a) violate any applicable law or regulation; (b) deploy agents that generate illegal, harmful, or fraudulent content; (c) manipulate inference calls or vault distributions in bad faith; (d) attempt to exploit, hack, or disrupt the smart contracts or frontend interface.",
      "Because the Protocol is permissionless, LUMA cannot prevent prohibited conduct at the contract level. These prohibitions represent your personal legal obligation and may expose you to civil or criminal liability.",
    ],
  },
  {
    heading: "Intellectual Property",
    body: "The LUMA frontend interface and branding are proprietary. The underlying smart contracts are open-source and available under their respective licenses on GitHub. Agent model weights deployed via the Protocol remain the intellectual property of the builder who deployed them and are never exposed by the Protocol.",
  },
  {
    heading: "Protocol Fees",
    body: "The Protocol charges a small percentage fee on inference call revenue and IPO proceeds. These fees are encoded in the smart contracts and visible on-chain at all times. Fee parameters may change via on-chain governance. No fees are charged by a centralized entity.",
  },
  {
    heading: "Modifications",
    body: "The frontend interface may be updated at any time. The smart contracts are immutable once deployed. LUMA reserves the right to modify these Terms at any time by updating this page. Continued use of the Protocol after any modification constitutes acceptance of the revised Terms.",
  },
  {
    heading: "Governing Law and Disputes",
    body: "These Terms are governed by the laws of a neutral international jurisdiction to the extent applicable. Any dispute arising from your use of the Protocol will be resolved through binding individual arbitration. You waive any right to participate in class-action proceedings related to the Protocol.",
  },
  {
    heading: "Termination",
    body: "Your right to use the frontend interface may be suspended or terminated at any time for any reason. Because the underlying Protocol is permissionless, you retain the ability to interact with the smart contracts directly even if frontend access is restricted. Termination of frontend access does not affect on-chain rights.",
  },
  {
    heading: "Contact",
    body: "For legal inquiries, reach out via the LUMA X account @luma_protocol. We are a small, decentralized team — we will respond as promptly as we can.",
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      subtitle="These terms govern your use of the LUMA protocol, its interface, and all associated services. Read them carefully — LUMA is experimental software and the risks are real."
      lastUpdated="October 2026"
      sections={SECTIONS}
    />
  );
}
