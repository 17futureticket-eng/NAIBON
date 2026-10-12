"use client";

import { useState, useCallback } from "react";
import { useHorseGallop } from "@/hooks/useHorseGallop";

/* ─────────────────────────────────────────────────────────────
   Horseshoe SVG icon
   ───────────────────────────────────────────────────────────── */
function HorseshoeIcon({ muted }: { muted: boolean }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      style={{ display: "block", flexShrink: 0 }}
    >
      {/* Horseshoe shape */}
      <path
        d="M12 3C7.03 3 3 7.03 3 12v3c0 2.76 2.24 5 5 5h1.5c.83 0 1.5-.67 1.5-1.5V17c0-.55-.45-1-1-1H8c-1.66 0-3-1.34-3-3v-1c0-3.87 3.13-7 7-7s7 3.13 7 7v1c0 1.66-1.34 3-3 3h-1.5c-.55 0-1 .45-1 1v1.5c0 .83.67 1.5 1.5 1.5H16c2.76 0 5-2.24 5-5v-3c0-4.97-4.03-9-9-9z"
        fill="currentColor"
        opacity={muted ? 0.35 : 1}
      />
      {/* Mute slash */}
      {muted && (
        <line
          x1="4" y1="4" x2="20" y2="20"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.7"
        />
      )}
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────
   Provider — mounts once in layout, adds toggle to every page
   ───────────────────────────────────────────────────────────── */
export default function HorseGallopProvider() {
  const [enabled, setEnabled] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useHorseGallop(enabled);

  const toggle = useCallback(() => {
    setEnabled((prev) => !prev);
    setShowTooltip(true);
    setTimeout(() => setShowTooltip(false), 1800);
  }, []);

  return (
    <>
      {/* Toggle button — bottom right, unobtrusive */}
      <button
        onClick={toggle}
        aria-label={enabled ? "Mute horse gallop sound" : "Enable horse gallop sound"}
        title={enabled ? "Mute gallop" : "Enable gallop"}
        style={{
          position: "fixed",
          bottom: "1.375rem",
          right: "1.375rem",
          zIndex: 9999,
          width: "36px",
          height: "36px",
          borderRadius: "50%",
          border: "1px solid rgba(10,14,26,0.15)",
          background: enabled
            ? "rgba(10,14,26,0.88)"
            : "rgba(242,244,248,0.88)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          color: enabled ? "#fff" : "rgba(10,14,26,0.55)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: enabled
            ? "0 2px 16px rgba(10,14,26,0.22)"
            : "0 1px 8px rgba(10,14,26,0.10)",
          transition: "background 0.25s ease, color 0.25s ease, box-shadow 0.25s ease, transform 0.15s ease",
          outline: "none",
          padding: 0,
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.1)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
        }}
      >
        <HorseshoeIcon muted={!enabled} />
      </button>

      {/* Tooltip */}
      {showTooltip && (
        <div
          aria-live="polite"
          style={{
            position: "fixed",
            bottom: "4rem",
            right: "1.375rem",
            zIndex: 9999,
            background: "rgba(10,14,26,0.82)",
            color: "#fff",
            fontFamily: "var(--font-mono, monospace)",
            fontSize: "0.5rem",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            padding: "0.3rem 0.625rem",
            borderRadius: "4px",
            whiteSpace: "nowrap",
            pointerEvents: "none",
            animation: "gallop-tooltip-in 0.2s ease both",
          }}
        >
          {enabled ? "🐎 Gallop on" : "🔇 Gallop off"}
        </div>
      )}

      <style>{`
        @keyframes gallop-tooltip-in {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        /* Respect reduced-motion — hide the button entirely */
        @media (prefers-reduced-motion: reduce) {
          [aria-label="Enable horse gallop sound"],
          [aria-label="Mute horse gallop sound"] {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}
