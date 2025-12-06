import { memo, useMemo, useState } from "react";
import { PaginationConfig, SearchConfig } from "@/shared/types";

import {
  useFilter,
  usePagination,
  useSearch,
  useDebouncedValue,
} from "@/shared/hooks";
import { Button, GenericList } from "@/shared/components";
import { SmartListProps } from "../smartList.types";

import { useSmartListReducer } from "../hooks/useSmartListReducer";
import SmartListSearch from "./SmartListSearch";
import SmartListFilters from "./SmartListFilters";
import SmartListPagination from "./SmartListPagination";


import { Squares2X2Icon, ListBulletIcon } from "@heroicons/react/24/outline";

function SmartListInner<T>({
  items,
  itemKey,
  renderItem,
  pagination,
  search,
  filter,
  stateReducer,
  defaultSearchQuery = "",
  defaultFilters = {},
  defaultPageIndex = 0,
  className = "",
}: SmartListProps<T>) {
  const [state, dispatch] = useSmartListReducer(
    {
      searchQuery: defaultSearchQuery,
      activeFilters: defaultFilters,
      pageIndex: defaultPageIndex,
    },
    stateReducer
  );
  const { searchQuery, activeFilters, pageIndex } = state;

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  //Memoized: Search config
  const searchConfig: SearchConfig<T> = useMemo(
    () => search ?? { keys: [] },
    [search]
  );
  //Handling the search with debounce or keep the items.
  const debouncedQuery = useDebouncedValue(searchQuery, 300);
  const filteredBySearch = useSearch(items, debouncedQuery, searchConfig);

  //Handling the filter
  const filteredByFilters = useFilter(filteredBySearch, activeFilters);

  //Memoized: Pagination config
  const paginationConfig: PaginationConfig = useMemo(() => {
    return (
      pagination ?? {
        pageSize: filteredByFilters.length,
      }
    );
  }, [filteredByFilters.length, pagination]);

  const onPageChange = (pageIndex: number) => {
    dispatch({ type: "SET_PAGE_INDEX", payload: pageIndex });
  };
  //Handling the pagination
  const { totalPages, paginatedItems, handlePrevPage, handleNextPage } =
    usePagination(filteredByFilters, pageIndex, onPageChange, paginationConfig);

  //Results count
  const resultsInfo = useMemo(() => {
    const total = items.length;
    const filtered = filteredByFilters.length;
    const showing = paginatedItems.length;
    const hasFilters = searchQuery || Object.keys(activeFilters).length > 0;

    return { total, filtered, showing, hasFilters };
  }, [
    items.length,
    filteredByFilters.length,
    paginatedItems.length,
    searchQuery,
    activeFilters,
  ]);

  return (
    <section className={`space-y-4 ${className}`}>
      <div id="list-header" className="mt-14">
        {/* Search and view toggle section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          {/* Left side: search */}
          <div className="flex-1 w-full">
            {search && (
              <SmartListSearch
                search={search}
                searchQuery={searchQuery}
                dispatch={dispatch}
              />
            )}
          </div>
          {/* Right side: view mode and results info  */}
          <div className="flex flex-row items-start sm:items-center gap-3 w-full sm:w-auto">
            {/* View Mode Toggle */}
            <div className="flex border border-pm-border rounded-lg p-1 bg-pm-card">
              <Button
                variant={viewMode === "grid" ? "primary" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="flex items-center gap-2 px-3"
              >
                <Squares2X2Icon className="h-4 w-4" />
                <span>Grid</span>
              </Button>
              <Button
                variant={viewMode === "list" ? "primary" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="flex items-center gap-2 px-3"
              >
                <ListBulletIcon className="h-4 w-4" />
                <span>List</span>
              </Button>
            </div>
            {/* Results Info */}
            <div className="text-sm text-pm-muted bg-pm-card px-3 py-2 rounded-lg">
              {resultsInfo.hasFilters ? (
                <>
                  <strong>{resultsInfo.showing}</strong> of{" "}
                  <strong>{resultsInfo.filtered}</strong>
                  {resultsInfo.filtered !== resultsInfo.total &&
                    ` (from ${resultsInfo.total})`}
                </>
              ) : (
                `${resultsInfo.showing} of ${resultsInfo.total}`
              )}
            </div>
          </div>
        </div>
        {/* Filter section */}
        {filter && (
          <div className="space-y-4 p-4 border border-pm-border rounded-lg bg-pm-card mt-4">
            <SmartListFilters
              filter={filter}
              activeFilters={activeFilters}
              dispatch={dispatch}
            />
          </div>
        )}
      </div>

      {paginatedItems.length > 0 ? (
        <>
          <div id="list-content" className="mt-12">
            <GenericList<T>
              items={paginatedItems}
              keyExtractor={itemKey}
              renderItem={renderItem}
              layout={viewMode}
              gridConfig={{
                columns: 3,
                gap: "md",
                maxWidth: "full",
              }}
              className={viewMode === "list" ? "max-w-4xl mx-auto" : ""}
            />
          </div>
          {totalPages > 1 && (
            <div id="list-pagination" className="mt-12">
              <SmartListPagination
                totalPages={totalPages}
                pageIndex={pageIndex}
                handlePrevPage={handlePrevPage}
                handleNextPage={handleNextPage}
              />
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12 text-pm-muted">No items found</div>
      )}
    </section>
  );
}

const SmartList = memo(SmartListInner) as typeof SmartListInner;

export default SmartList;