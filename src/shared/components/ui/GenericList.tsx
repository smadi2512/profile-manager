import Grid from "./Grid";

interface GenericListProps<T> {
  items: T[];
  keyExtractor: (item: T) => string | number;
  renderItem: (item: T) => React.ReactNode;
  layout?: "grid" | "list";
  gridConfig?: {
    columns?: 1 | 2 | 3 | 4;
    gap?: "xs" | "sm" | "md" | "lg";
    maxWidth?: "sm" | "md" | "lg" | "xl" | "4xl" | "full";
  };
  className?: string;
  emptyMessage?: string;
}

function GenericList<T>({
  items,
  keyExtractor,
  renderItem,
  layout = "list",
  gridConfig = {
    columns: 3,
    gap: "md",
    maxWidth: "full",
  },
  className,
  emptyMessage = "No items found.",
}: GenericListProps<T>) {
  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="max-w-md mx-auto space-y-4">
          <h3 className="text-lg font-medium text-pm-muted">{emptyMessage}</h3>
        </div>
      </div>
    );
  }

  if (layout === "grid") {
    return (
      <Grid
        columns={gridConfig?.columns}
        className={className}
        gap={gridConfig?.gap}
        maxWidth={gridConfig?.maxWidth}
      >
        {items.map((item) => (
          <div key={keyExtractor(item)} className="animate-pm-fade-in">
            {renderItem(item)}
          </div>
        ))}
      </Grid>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {items.map((item) => (
        <div
          key={keyExtractor(item)}
          className="animate-pm-slide-up hover:shadow-md transition-shadow"
        >
          {renderItem(item)}
        </div>
      ))}
    </div>
  );
}

export default GenericList;
