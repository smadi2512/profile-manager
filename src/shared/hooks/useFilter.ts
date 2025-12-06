import { useMemo } from "react";

export function useFilter<T>(
  items: T[],
  activeFilters: Partial<Record<string, string[]>>
): T[] {
  const filteredByFilters = useMemo(() => {
    //If there is no active filters => return the original items
    if (!activeFilters || Object.values(activeFilters).length === 0)
      return items;

    //Do filtering on items based on active filters
    return items.filter((item) =>
      Object.entries(activeFilters).every(([filterKey, selectedValues]) => {
        if (!selectedValues || selectedValues.length === 0) return true;
        const itemValue = item[filterKey as keyof T];
        //If the itemValue is an array
        if (Array.isArray(itemValue)) {
          return itemValue.some((val) => selectedValues.includes(String(val)));
        }
        return selectedValues?.includes(String(itemValue));
      })
    );
  }, [activeFilters, items]);

  return filteredByFilters;
}
