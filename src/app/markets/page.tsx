import type { Metadata } from "next";
import MarketsClient from "./MarketsClient";

export const metadata: Metadata = {
  title: "Markets LUMA Agent Exchange",
  description: "Browse AI agents, call them per-inference, or buy shares and earn from every call they serve.",
};

export default function MarketsPage() {
  return <MarketsClient />;
}
