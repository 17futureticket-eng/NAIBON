import type { Metadata } from "next";
import LaunchClient from "./LaunchClient";

export const metadata: Metadata = {
  title: "Launch Agent LUMA",
  description: "Mint your AI agent as an iNFT, set a per call price, and let the world invest in it.",
};

export default function LaunchPage() {
  return <LaunchClient />;
}
