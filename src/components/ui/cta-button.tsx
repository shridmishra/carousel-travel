"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface CtaButtonProps
  extends Omit<React.ComponentProps<typeof Button>, "variant" | "size"> {
  variant?: "default" | "dark" | string;
  size?: "default" | "sm" | "lg" | string;
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export const CtaButton = React.forwardRef<HTMLButtonElement, CtaButtonProps>(
  (
    {
      variant = "default",
      size = "default",
      children,
      className,
      onClick,
      type = "button",
      disabled = false,
      ...props
    },
    ref
  ) => {
    const sizeClasses =
      size === "sm"
        ? "h-[42px] py-2 px-6 text-sm font-medium"
        : size === "lg"
        ? "h-14 py-4 px-8 text-base font-medium"
        : "h-[52px] py-[14px] px-[32px] text-sm font-medium";

    const isDark = variant === "dark";

    return (
      <Button
        ref={ref}
        type={type}
        onClick={onClick}
        disabled={disabled}
        variant="unstyled"
        className={cn(
          "group relative overflow-hidden rounded-full font-sans transition-[color,background-color,border-color,transform] duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border active:scale-[0.97] active:duration-75",
          sizeClasses,
          isDark
            ? "bg-cta-dark border-cta-dark-border text-white-pure hover:text-cta-dark group-hover:text-cta-dark shadow-cta-rim-subtle"
            : "bg-cta-dark border-transparent text-cta-dark hover:text-cta-light-hover group-hover:text-cta-light-hover shadow-cta-rim",
          disabled ? "opacity-50 cursor-not-allowed pointer-events-none" : "cursor-pointer",
          className
        )}
        {...props}
      >
        {/* Sliding Layer */}
        {isDark ? (
          /* Dark variant: slides UP (from bottom to top) on hover, revealing white background */
          <span className="absolute inset-0 bg-white-pure rounded-full shadow-cta-layer translate-y-[102%] transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] z-0 pointer-events-none [@media(hover:hover)_and_(pointer:fine)]:group-hover:translate-y-0 motion-reduce:transition-none" />
        ) : (
          /* Default variant: slides DOWN (from center to bottom) on hover, revealing dark background */
          <span className="absolute inset-0 bg-white-pure rounded-full shadow-cta-layer translate-y-0 transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] z-0 pointer-events-none [@media(hover:hover)_and_(pointer:fine)]:group-hover:translate-y-[102%] motion-reduce:transition-none" />
        )}

        {/* Content wrapper */}
        <span className="relative z-10 flex items-center justify-center gap-1.5">
          {children}
        </span>
      </Button>
    );
  }
);

CtaButton.displayName = "CtaButton";

export default CtaButton;
