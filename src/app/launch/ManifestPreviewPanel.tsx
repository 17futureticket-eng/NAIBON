"use client";

import { type ManifestPreview } from "@/lib/launch";

interface Props {
  manifest: ManifestPreview;
  valid: boolean;
}

export default function ManifestPreviewPanel({ manifest, valid }: Props) {
  return (
    <div style={{ position: "sticky", top: "calc(var(--nav-h) + 1.5rem)" }}>
      <div className="manifest-panel">
        <div className="manifest-header">
          <span>manifest · live preview</span>
          <span
            style={{
              display: "inline-flex", alignItems: "center", gap: "0.375rem",
              color: valid ? "var(--acid)" : "var(--ink-30)",
            }}
          >
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: valid ? "var(--acid)" : "var(--ink-10)", transition: "background 0.3s ease" }} />
            {valid ? "manifest valid" : "building"}
          </span>
        </div>

        {/* agent.manifest label */}
        <div style={{ padding: "0.5rem 1rem 0.25rem", fontFamily: "var(--font-mono)", fontSize: "0.5625rem", color: "var(--ink-30)", letterSpacing: "0.06em" }}>
          agent.manifest
        </div>

        {/* Core fields */}
        {[
          { k: "ticker",  v: manifest.ticker },
          { k: "price",   v: manifest.price },
          { k: "runtime", v: manifest.runtime },
          { k: "backend", v: manifest.backend },
          { k: "secrets", v: manifest.secrets },
        ].map((row) => (
          <div className="manifest-row" key={row.k}>
            <span className="manifest-key">| {row.k}</span>
            <span className="manifest-val">{row.v} |</span>
          </div>
        ))}

        {/* Tools */}
        <div className="manifest-section-header">tools ({manifest.tools.length})</div>
        {manifest.tools.length === 0 ? (
          <div className="manifest-row">
            <span className="manifest-key">|</span>
            <span className="manifest-val" style={{ color: "var(--ink-30)" }}>(none) |</span>
          </div>
        ) : (
          manifest.tools.map((t) => (
            <div className="manifest-row" key={t}>
              <span className="manifest-key">| ·</span>
              <span className="manifest-val">{t} |</span>
            </div>
          ))
        )}

        {/* Skills */}
        <div className="manifest-section-header">skills ({manifest.skills.length})</div>
        {manifest.skills.length === 0 ? (
          <div className="manifest-row">
            <span className="manifest-key">|</span>
            <span className="manifest-val" style={{ color: "var(--ink-30)" }}>{"{none yet · hermes grows its own}"} |</span>
          </div>
        ) : (
          manifest.skills.map((s) => (
            <div className="manifest-row" key={s}>
              <span className="manifest-key">| ·</span>
              <span className="manifest-val">{s} |</span>
            </div>
          ))
        )}

        {/* Artifacts */}
        <div className="manifest-section-header">artifacts</div>
        {[
          { k: "manifest hash", v: manifest.manifestHash },
          { k: "iNFT tokenId",  v: manifest.inftTokenId },
          { k: "domain",    v: manifest.ensRecord },
        ].map((row) => (
          <div className="manifest-row" key={row.k}>
            <span className="manifest-key">| {row.k}</span>
            <span className="manifest-val" style={{ color: row.v.startsWith("[") ? "var(--ink-30)" : "var(--ink)" }}>
              {row.v} |
            </span>
          </div>
        ))}

        <div style={{ padding: "0.625rem 1rem", borderTop: "1px solid var(--ink-06)" }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.5rem", letterSpacing: "0.1em", color: "var(--ink-30)" }}>
            live · recomputes on every keystroke
          </span>
        </div>
      </div>
    </div>
  );
}
