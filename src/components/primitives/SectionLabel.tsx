"use client";

interface SectionLabelProps {
  children: React.ReactNode;
  dark?: boolean;
  className?: string;
}

export default function SectionLabel({
  children,
  dark = false,
  className = "",
}: SectionLabelProps) {
  return (
    <span
      className={`tag ${dark ? "tag-onyx" : ""} ${className}`}
      aria-label={typeof children === "string" ? children : undefined}
    >
      <span className="tag-dot" />
      {children}
    </span>
  );
}
