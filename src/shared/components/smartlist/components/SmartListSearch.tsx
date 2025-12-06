import { Button, Input } from "../../ui";
import { SmartListSearchProps } from "../smartList.types";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";

export default function SmartListSearch<T>({
  search,
  searchQuery,
  dispatch,
}: SmartListSearchProps<T>) {
  const hasSearchQuery = searchQuery.length > 0;

  const handleClearSearch = () => {
    dispatch({
      type: "SET_SEARCH_QUERY",
      payload: "",
    });
  };

  return (
    <div className="w-full max-w-xl">
      <Input
        type="text"
        value={searchQuery}
        placeholder={search?.placeholder || "Search..."}
        onChange={(event) => {
          dispatch({
            type: "SET_SEARCH_QUERY",
            payload: event.target.value,
          });
        }}
        startIcon={<MagnifyingGlassIcon className="h-4 w-4" />}
        className="w-full"
        helperText="Enter at least 3 characters to search"
      />
      {hasSearchQuery && (
        <div className="mt-2 flex justify-end">
          {
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearSearch}
              startIcon={<XMarkIcon className="h-3 w-3" />}
              className="text-pm-muted hover:text-pm-foreground transition-colors cursor-default outline-none border-none"
            >
              Clear search
            </Button>
          }
        </div>
      )}
    </div>
  );
}
