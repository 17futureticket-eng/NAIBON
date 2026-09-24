"use client";

interface ImageFrameProps {
  children: React.ReactNode;
  dark?: boolean;
  browser?: boolean;
  className?: string;
  label?: string;
}

export default function ImageFrame({
  children,
  dark = false,
  browser = false,
  className = "",
  label,
}: ImageFrameProps) {
  return (
    <div
      className={`${dark ? "img-frame-dark" : "img-frame"} ${className}`}
      role="img"
      aria-label={label}
    >
      {browser && (
        <div className="browser-chrome">
          <span className="browser-dot" />
          <span className="browser-dot" />
          <span className="browser-dot" />
        </div>
      )}
      {children}
    </div>
  );
}
