type LoadingSize = "sm" | "md" | "lg";
type LoadingLayout = "vertical" | "horizontal";

interface LoadingIndicatorProps {
  size?: LoadingSize;
  className?: string;
  text?: string;
  layout?: LoadingLayout;
}

export default function LoadingIndicator({
  size = "md",
  className = "",
  text = "",
  layout = "vertical",
}: LoadingIndicatorProps) {
  const sizes: Record<LoadingSize, string> = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  };

  if (layout === "horizontal") {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <div
          className={`animate-spin rounded-full border-b-2 border-primary ${sizes[size]}`}
        ></div>
        {text && <span className="text-sm text-current">{text}</span>}
      </div>
    );
  }

  return (
    <div
      className={`flex flex-col items-center justify-center py-8 ${className}`}
    >
      <div
        className={`animate-spin rounded-full border-b-2 border-primary ${sizes[size]}`}
      ></div>
      {text && (
        <div className="text-center text-sm mt-4 text-pm-muted">{text}</div>
      )}
    </div>
  );
}
