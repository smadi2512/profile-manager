import { useMemo } from "react";
import { PaginationConfig, UsePaginationResult } from "@/shared/types";

export function usePagination<T>(
  items: T[],
  pageIndex: number,
  onPageChange: (newPageIndex: number) => void,
  paginationConfig: PaginationConfig
): UsePaginationResult<T> {
  //Handling the Pagination
  const pageSize = paginationConfig?.pageSize ?? items.length;
  const totalPages = Math.ceil(items.length / pageSize);

  const paginatedItems = useMemo(() => {
    return items.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize);
  }, [items, pageIndex, pageSize]);

  const handlePrevPage = () => {
    onPageChange(Math.max(0, pageIndex - 1));
  };

  const handleNextPage = () => {
    onPageChange(Math.min(totalPages - 1, pageIndex + 1));
  };

  return { totalPages, paginatedItems, handlePrevPage, handleNextPage };
}
