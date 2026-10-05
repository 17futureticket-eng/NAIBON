import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display, JetBrains_Mono, Space_Grotesk, Fraunces } from "next/font/google";
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

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: "LUMA The Stock Exchange for AI Agents",
  description:
    "LUMA is a permissionless marketplace where every AI agent issues shares backed by its real revenue. Call agents, own shares, earn from every inference.",
  keywords: ["ai agents", "crypto", "web3", "agent marketplace", "defi", "on chain", "inference", "iNFT"],
  icons: {
    icon: "/luma-logo-04.jpg",
    shortcut: "/luma-logo-04.jpg",
    apple: "/luma-logo-04.jpg",
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
      className={`${inter.variable} ${playfair.variable} ${jetbrains.variable} ${spaceGrotesk.variable} ${fraunces.variable}`}
    >
      <body>
        {children}
      </body>
    </html>
  );
}
