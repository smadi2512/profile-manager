import { Dispatch } from "react";
import { SearchConfig, PaginationConfig, FilterConfig } from "@/shared/types";
import { StateReducerOverride } from "./hooks/useSmartListReducer";
import { SmartListAction } from "./reducer/smartListReducer";

export interface SmartListItemsProps<T> {
  items: T[];
  itemKey: (item: T) => string | number;
  renderItem: (item: T) => React.ReactNode;
}

export interface SmartListSearchProps<T> {
  search: SearchConfig<T>;
  searchQuery: string;
  dispatch: Dispatch<SmartListAction>;
}

export interface SmartListFilterProps<T> {
  filter: FilterConfig<T>;
  activeFilters: Partial<Record<string, string[]>>;
  dispatch: Dispatch<SmartListAction>;
}

export interface SmartListPaginationProps {
  totalPages: number;
  pageIndex: number;
  handlePrevPage: () => void;
  handleNextPage: () => void;
}

//SmartList component types
export interface SmartListProps<T> extends SmartListItemsProps<T> {
  //Optional configs
  pagination?: PaginationConfig;
  search?: SearchConfig<T>;
  filter?: FilterConfig<T>;
  stateReducer?: StateReducerOverride;
  //Defaults
  defaultSearchQuery?: string;
  defaultFilters?: Partial<Record<string, string[]>>;
  defaultPageIndex?: number;
  className?: string;
}
