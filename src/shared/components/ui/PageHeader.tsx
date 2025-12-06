import { ReactElement, ReactNode } from "react";

interface PageHeaderProps {
  icon?: ReactElement;
  title: string;
  subtitle: string;
  children?: ReactNode;
  align?: "center" | "left" | "right";
  size?: "lg" | "xl" | "2xl";
}

export default function PageHeader({
  icon,
  title,
  subtitle,
  children,
  align = "center",
  size = "2xl",
}: PageHeaderProps) {
  const sizeClasses = {
    lg: "text-3xl md:text-4xl",
    xl: "text-4xl md:text-5xl",
    "2xl": "text-4xl md:text-6xl",
  };

  const alignClasses = {
    center: "text-center mx-auto",
    left: "text-left mr-auto",
    right: "text-right ml-auto",
  };

  return (
    <section
      className={`py-5 space-y-8 animate-pm-fade-in ${alignClasses[align]}`}
    >
      <div className="space-y-4">
        {icon && (
          <div className="inline-flex items-center justify-center w-20 h-20 bg-pm-primary rounded-2xl shadow-lg mb-4">
            {icon}
          </div>
        )}

        <h1
          className={`font-bold leading-none pb-1.5 bg-linear-to-r from-pm-primary to-pm-accent bg-clip-text text-transparent ${sizeClasses[size]}`}
        >
          {title}
        </h1>

        <p
          className={`text-xl text-pm-muted leading-relaxed ${alignClasses[align]}`}
        >
          {subtitle}
        </p>
      </div>
      {children}
    </section>
  );
}
