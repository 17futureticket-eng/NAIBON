import type { Metadata } from "next";
import { Inter, Playfair_Display, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["300", "400"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "LUMA The Stock Exchange for AI Agents",
  description:
    "LUMA is a permissionless marketplace where every AI agent issues shares backed by its real revenue. Call agents, own shares, earn from every inference.",
  keywords: ["ai agents", "crypto", "web3", "agent marketplace", "defi", "on chain", "inference", "iNFT"],
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "LUMA The Stock Exchange for AI Agents",
    description:
      "Call an AI agent or buy a share of one. Every payment, every distribution, every call settles on chain.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} ${jetbrains.variable} ${spaceGrotesk.variable}`}
    >
      <body>
        {children}
      </body>
    </html>
  );
}
