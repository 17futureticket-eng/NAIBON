"use client";

import { useState } from "react";
import { CONTRACT_ADDRESS, shortContract } from "@/lib/config";

export default function AnnouncementBar() {
  const [copied, setCopied] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  const copy = () => {
    navigator.clipboard?.writeText(CONTRACT_ADDRESS).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 101,
        height: "36px",
        background: "rgba(10,20,50,0.96)",
        borderBottom: "1px solid rgba(30,111,255,0.25)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "0",
      }}
      role="banner"
      aria-label="Contract address"
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.625rem",
          maxWidth: "1440px",
          width: "100%",
          padding: "0 clamp(1rem, 3vw, 3.5rem)",
          justifyContent: "center",
          position: "relative",
        }}
      >
        {/* Label */}
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.5625rem",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "rgba(130,170,255,0.55)",
            whiteSpace: "nowrap",
          }}
        >
          Contract
        </span>

        {/* Address */}
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.625rem",
            letterSpacing: "0.05em",
            color: "rgba(180,210,255,0.85)",
            whiteSpace: "nowrap",
          }}
        >
          <span className="ca-full">{CONTRACT_ADDRESS}</span>
          <span className="ca-short">{shortContract()}</span>
        </span>

        {/* Copy button */}
        <button
          onClick={copy}
          aria-label="Copy contract address"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.25rem",
            padding: "0.15rem 0.5rem",
            background: copied ? "rgba(30,111,255,0.25)" : "rgba(255,255,255,0.06)",
            border: "1px solid rgba(30,111,255,0.25)",
            borderRadius: "3px",
            cursor: "pointer",
            fontFamily: "var(--font-mono)",
            fontSize: "0.5rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: copied ? "rgba(130,200,255,0.9)" : "rgba(130,170,255,0.55)",
            transition: "all 0.2s ease",
            whiteSpace: "nowrap",
          }}
        >
          {copied ? (
            <>
              <svg width="9" height="9" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                <path d="M2 5L4 7L8 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Copied
            </>
          ) : (
            <>
              <svg width="9" height="9" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <rect x="4" y="4" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.2" />
                <path d="M2 8V2H8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
              Copy
            </>
          )}
        </button>

        {/* Dismiss */}
        <button
          onClick={() => setDismissed(true)}
          aria-label="Dismiss"
          style={{
            position: "absolute",
            right: "clamp(1rem, 3vw, 3.5rem)",
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "rgba(130,170,255,0.35)",
            padding: "2px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <path d="M2 2L10 10M10 2L2 10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      <style>{`
        .ca-full  { display: none; }
        .ca-short { display: inline; }
        @media (min-width: 640px) {
          .ca-full  { display: inline; }
          .ca-short { display: none; }
        }
      `}</style>
    </div>
  );
}
