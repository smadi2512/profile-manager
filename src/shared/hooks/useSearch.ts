import { useMemo } from "react";
import { SearchConfig } from "@/shared/types";

export function useSearch<T>(
  items: T[],
  searchQuery: string,
  searchConfig: SearchConfig<T>
): T[] {
  const filteredBySearch = useMemo(() => {
    //If there is no search query => return the original items
    if (!searchQuery || searchConfig.keys.length === 0) return items;

    //Do searching on items based on searchQuery string
    return items.filter((item) => {
      const term = searchQuery.trim().toLowerCase();
      if (term.length < 2) return true;
      // If user provided a custom search function, use it.
      if (searchConfig.searchFn) {
        return searchConfig.searchFn(item, searchQuery);
      }

      // Otherwise, use default key-based search
      return searchConfig.keys.some((key) => {
        const value = item[key];
        //Searching for string
        if (typeof value === "string") {
          return value.toLowerCase().includes(searchQuery.toLowerCase());
        }
        //Searching for number
        if (typeof value === "number") {
          return value.toString().includes(searchQuery.toString());
        }
        //Searching for object
        if (typeof value === "object" && value !== null) {
          return JSON.stringify(value)
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
        }
      });
    });
  }, [items, searchConfig, searchQuery]);

  return filteredBySearch;
}
