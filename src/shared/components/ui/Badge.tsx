import React from "react";
import { clsx } from "clsx";

export type BadgeVariant =
  | "default"
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "error"
  | "info";

export interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export default function Badge({
  variant = "default",
  children,
  className,
  size = "md",
}: BadgeProps) {
  const baseClasses = "inline-flex items-center font-medium rounded-full";

  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-2.5 py-0.5 text-sm",
    lg: "px-3 py-1 text-base",
  };

  const variantClasses = {
    default: "bg-pm-card text-pm-foreground border border-pm-border",
    primary: "bg-pm-primary text-pm-primary-foreground",
    secondary: "bg-pm-secondary text-white",
    success: "bg-pm-success text-white",
    warning: "bg-pm-warning text-white",
    error: "bg-pm-error text-white",
    info: "bg-pm-info text-white",
  };

  const classes = clsx(
    baseClasses,
    sizeClasses[size],
    variantClasses[variant],
    className
  );

  return <span className={classes}>{children}</span>;
}
