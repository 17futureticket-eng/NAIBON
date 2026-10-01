"use client";

export default function MetricsStrip() {
  return (
    <section
      id="metrics"
      aria-label="We are live"
      style={{
        background: "var(--ivory)",
        borderTop: "1px solid var(--ink-10)",
        borderBottom: "1px solid var(--ink-10)",
        padding: "4rem 0",
        textAlign: "center",
      }}
    >
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <span className="live-dot" aria-hidden="true" />
        <span
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 700,
            fontSize: "clamp(2.5rem, 7vw, 6rem)",
            letterSpacing: "-0.04em",
            lineHeight: 1,
            color: "var(--ink)",
          }}
        >
          We Are Live
        </span>
      </div>

      <style>{`
        .live-dot {
          display: inline-block;
          width: clamp(10px, 1.5vw, 18px);
          height: clamp(10px, 1.5vw, 18px);
          border-radius: 50%;
          background: #16a34a;
          position: relative;
          flex-shrink: 0;
        }
        .live-dot::after {
          content: "";
          position: absolute;
          inset: -4px;
          border-radius: 50%;
          background: #16a34a;
          opacity: 0.35;
          animation: live-pulse 1.6s ease-out infinite;
        }
        @keyframes live-pulse {
          0%   { transform: scale(1);   opacity: 0.35; }
          70%  { transform: scale(2.8); opacity: 0; }
          100% { transform: scale(2.8); opacity: 0; }
        }
      `}</style>
    </section>
  );
}
