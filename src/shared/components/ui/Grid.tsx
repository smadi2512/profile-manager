// shared/components/ui/Grid.tsx
import { ReactNode } from "react";

interface GridProps {
  children: ReactNode;
  className?: string;
  columns?: 1 | 2 | 3 | 4;
  gap?: "xs" | "sm" | "md" | "lg";
  maxWidth?: "sm" | "md" | "lg" | "xl" | "4xl" | "full";
}

export default function Grid({
  children,
  className = "",
  columns = 3,
  gap = "md",
  maxWidth = "xl",
}: GridProps) {
  const columnClasses = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  };

  const gapClasses = {
    xs: "gap-2",
    sm: "gap-4",
    md: "gap-6",
    lg: "gap-8",
  };

  const maxWidthClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "4xl": "max-w-4xl",
    full: "max-w-full",
  };

  return (
    <div
      className={`grid ${columnClasses[columns]} ${gapClasses[gap]} ${maxWidthClasses[maxWidth]} mx-auto ${className}`}
    >
      {children}
    </div>
  );
}
