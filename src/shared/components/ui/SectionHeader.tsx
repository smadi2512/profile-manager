import { ReactElement, ReactNode } from "react";

interface SectionHeaderProps {
  icon?: ReactElement;
  title: string;
  subtitle?: string;
  children?: ReactNode;
  variant?: "primary" | "secondary";
}

export default function SectionHeader({
  icon,
  title,
  subtitle,
  children,
  variant = "primary",
}: SectionHeaderProps) {
  const variantClasses = {
    primary: "bg-gradient-to-r from-pm-primary to-pm-accent",
    secondary: "bg-gradient-to-r from-pm-secondary to-pm-accent",
  };

  return (
    <section className="space-y-6 animate-pm-fade-in">
      <div className="space-y-4">
        {icon && (
          <div className="inline-flex items-center justify-center w-16 h-16 bg-pm-primary rounded-2xl shadow-lg">
            {icon}
          </div>
        )}

        <h2
          className={`text-3xl md:text-4xl font-bold bg-clip-text text-transparent ${variantClasses[variant]}`}
        >
          {title}
        </h2>

        {subtitle && (
          <p className="text-lg text-pm-muted max-w-2xl leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
      {children}
    </section>
  );
}
