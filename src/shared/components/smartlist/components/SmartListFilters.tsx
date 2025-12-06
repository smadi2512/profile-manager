import { useCallback, useState } from "react";
import { SmartListFilterProps } from "../smartList.types";
import { Button, Grid } from "@/shared/components";
import { FunnelIcon, XMarkIcon } from "@heroicons/react/24/outline";

// Import filter components
import SelectFilter from "./filters/SelectFilter";
import CheckboxFilter from "./filters/CheckboxFilter";

export default function SmartListFilters<T>({
  filter,
  activeFilters,
  dispatch,
}: SmartListFilterProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const handleFilterChange = useCallback(
    (key: string, value: string[]) => {
      dispatch({
        type: "SET_FILTER",
        payload: { key, value },
      });
    },
    [dispatch]
  );

  const clearAllFilters = useCallback(() => {
    dispatch({ type: "RESET_FILTERS" });
  }, [dispatch]);

  //Check if there are any active filters
  const hasActiveFilters = Object.values(activeFilters).some(
    (value) => value && value.length > 0
  );

  //Count active filters for display
  const activeFiltersCount = Object.values(activeFilters).filter(
    (value) => value && value.length > 0
  ).length;

  const renderFilterComponent = (filterKey: string, config: any) => {
    if (!config) return null;
    const value = activeFilters[filterKey] || [];
    switch (config.type) {
      case "select":
        return (
          <SelectFilter
            key={filterKey}
            filterKey={filterKey}
            config={config}
            value={value}
            onChange={handleFilterChange}
          />
        );

      case "checkbox":
        return (
          <CheckboxFilter
            key={filterKey}
            filterKey={filterKey}
            config={config}
            value={value}
            onChange={handleFilterChange}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      {/* Filter Header */}
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsOpen(!isOpen)}
          startIcon={<FunnelIcon className="h-4 w-4" />}
        >
          Filters {hasActiveFilters && `(${activeFiltersCount})`}
        </Button>

        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            endIcon={<XMarkIcon className="h-4 w-4" />}
            className="text-pm-error hover:text-pm-error"
          >
            Clear All
          </Button>
        )}
      </div>

      {/* Filter */}
      {isOpen && filter && (
        <Grid
          columns={3}
          gap="lg"
          maxWidth="full"
          className="p-4 border border-pm-border rounded-lg bg-pm-card"
        >
          {Object.entries(filter).map(([filterKey, config]) =>
            renderFilterComponent(filterKey, config)
          )}
        </Grid>
      )}
    </div>
  );
}
