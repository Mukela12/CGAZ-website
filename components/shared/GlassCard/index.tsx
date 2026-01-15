import { cn } from "@/lib/utils/cn";

interface GlassCardProps {
  /** Visual variant of the glass card */
  variant?: "primary" | "secondary" | "overlay";
  /** Content to be rendered inside the card */
  children: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Enable hover effect with lift and enhanced shadow */
  hoverable?: boolean;
  /** Click handler for interactive cards */
  onClick?: () => void;
}

/**
 * Glass Card Component
 *
 * A reusable card component with glassmorphism effects including:
 * - Backdrop blur for frosted glass appearance
 * - Semi-transparent backgrounds
 * - Border with opacity
 * - Shadow effects
 * - Optional hover animations
 *
 * @example
 * ```tsx
 * <GlassCard variant="primary" hoverable>
 *   <h3>Card Title</h3>
 *   <p>Card content goes here</p>
 * </GlassCard>
 * ```
 */
export function GlassCard({
  variant = "primary",
  children,
  className,
  hoverable = false,
  onClick,
}: GlassCardProps) {
  const baseStyles = "rounded-2xl shadow-glass transition-all duration-300";

  const variantStyles = {
    primary: "backdrop-blur-md bg-white/10 border border-white/20",
    secondary: "backdrop-blur-lg bg-white/5 border border-white/10",
    overlay: "backdrop-blur-xl bg-gradient-to-br from-white/20 to-transparent border border-white/10",
  };

  const hoverStyles = hoverable
    ? "hover:bg-white/15 hover:shadow-glass-lg hover:-translate-y-1 cursor-pointer"
    : "";

  return (
    <div
      className={cn(baseStyles, variantStyles[variant], hoverStyles, className)}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onClick();
              }
            }
          : undefined
      }
    >
      {children}
    </div>
  );
}
