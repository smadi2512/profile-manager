//Pagination types
export type PaginationConfig = {
  pageSize: number;
};

export type UsePaginationResult<T> = {
  paginatedItems: T[];
  totalPages: number;
  handleNextPage: () => void;
  handlePrevPage: () => void;
};

//Filter types
export type FilterType = "select" | "checkbox";

export type FilterOption = string | number;

export interface FilterConfigItem {
  type: FilterType;
  options: FilterOption[];
  label?: string;
  placeholder?: string;
}

export type FilterConfig<T> = {
  [K in keyof T]?: FilterConfigItem;
};

//Search type
export type SearchConfig<T> = {
  keys: (keyof T)[];
  placeholder?: string;
  searchFn?: (item: T, searchQuery: string) => boolean;
};
