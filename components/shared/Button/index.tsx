import { cn } from "@/lib/utils/cn";
import { Loader2 } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Button visual variant */
  variant?: "primary" | "secondary" | "ghost" | "glass";
  /** Button size */
  size?: "sm" | "md" | "lg";
  /** Loading state */
  isLoading?: boolean;
  /** Full width button */
  fullWidth?: boolean;
  /** Icon to display before text */
  iconBefore?: React.ReactNode;
  /** Icon to display after text */
  iconAfter?: React.ReactNode;
}

/**
 * Button Component
 *
 * A flexible button component with multiple variants and sizes:
 * - Primary: Filled green button for main actions
 * - Secondary: Outlined button for secondary actions
 * - Ghost: Transparent button for subtle actions
 * - Glass: Glassmorphism effect button
 *
 * Includes loading states, icons, and accessibility features.
 *
 * @example
 * ```tsx
 * <Button variant="primary" size="md" isLoading={false}>
 *   Click Me
 * </Button>
 * ```
 */
export function Button({
  variant = "primary",
  size = "md",
  isLoading = false,
  fullWidth = false,
  iconBefore,
  iconAfter,
  className,
  disabled,
  children,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variantStyles = {
    primary:
      "bg-cashew-green text-white hover:bg-cashew-dark-green focus:ring-cashew-green shadow-md hover:shadow-lg",
    secondary:
      "border-2 border-cashew-green text-cashew-green hover:bg-cashew-green hover:text-white focus:ring-cashew-green",
    ghost: "text-cashew-green hover:bg-cashew-green/10 focus:ring-cashew-green/50",
    glass:
      "backdrop-blur-md bg-white/10 border border-white/20 text-white hover:bg-white/20 focus:ring-white/30 shadow-glass hover:shadow-glass-lg",
  };

  const sizeStyles = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <button
      className={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        fullWidth && "w-full",
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />}
      {!isLoading && iconBefore && <span aria-hidden="true">{iconBefore}</span>}
      {children}
      {!isLoading && iconAfter && <span aria-hidden="true">{iconAfter}</span>}
    </button>
  );
}
