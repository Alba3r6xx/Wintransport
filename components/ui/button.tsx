import Link from "next/link";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "accent" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  href?: string;
  loading?: boolean;
  children: React.ReactNode;
}

const variants: Record<string, string> = {
  accent: "bg-accent text-white hover:bg-accent-hover shadow-sm shadow-accent/20",
  secondary: "bg-surface text-text hover:bg-surface-hover border border-border",
  outline: "border border-border text-text hover:bg-surface",
  ghost: "text-text-secondary hover:bg-surface hover:text-text",
  danger: "bg-danger text-white hover:bg-red-600",
};

const sizes: Record<string, string> = {
  sm: "px-3 py-1.5 text-sm rounded-lg gap-1.5",
  md: "px-4 py-2.5 text-sm rounded-xl gap-2",
  lg: "px-6 py-3 text-base rounded-xl gap-2",
};

export default function Button({
  variant = "accent",
  size = "md",
  href,
  loading,
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  const cls = cn(
    "inline-flex items-center justify-center font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:ring-offset-2",
    variants[variant],
    sizes[size],
    (loading || disabled) && "opacity-60 pointer-events-none",
    className
  );

  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }

  return (
    <button className={cls} disabled={loading || disabled} {...props}>
      {loading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      )}
      {children}
    </button>
  );
}
