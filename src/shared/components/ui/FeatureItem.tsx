interface FeatureItemProps {
  children: React.ReactNode;
  id: string;
  icon?: React.ReactNode;
  className?: string;
}

export default function FeatureItem({
  children,
  id,
  icon = <div className="w-2 h-2 bg-pm-accent rounded-full shrink-0"></div>,
  className = "",
}: FeatureItemProps) {
  return (
    <div
      key={id}
      className={`flex items-center gap-3 p-3 rounded-lg hover:bg-pm-background transition-colors ${className}`}
    >
      {icon}
      <span className="text-pm-foreground">{children}</span>
    </div>
  );
}
