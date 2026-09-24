"use client";

import Link from "next/link";

type Variant = "primary" | "ghost" | "ghost-onyx" | "nav";

interface ButtonProps {
  children: React.ReactNode;
  variant?: Variant;
  href?: string;
  onClick?: () => void;
  className?: string;
  external?: boolean;
  type?: "button" | "submit";
  disabled?: boolean;
}

const variantMap: Record<Variant, string> = {
  primary: "btn btn-primary",
  ghost: "btn btn-ghost",
  "ghost-onyx": "btn btn-ghost-onyx",
  nav: "btn btn-nav",
};

export default function Button({
  children,
  variant = "primary",
  href,
  onClick,
  className = "",
  external = false,
  type = "button",
  disabled = false,
}: ButtonProps) {
  const cls = `${variantMap[variant]} ${className}`;

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          className={cls}
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={cls}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
