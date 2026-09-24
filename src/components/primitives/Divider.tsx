"use client";

interface DividerProps {
  dark?: boolean;
  className?: string;
}

export default function Divider({ dark = false, className = "" }: DividerProps) {
  return (
    <div
      className={`${dark ? "divider-onyx" : "divider"} ${className}`}
      role="separator"
      aria-hidden="true"
    />
  );
}
