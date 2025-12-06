import { Button } from "../../ui";
import { SmartListPaginationProps } from "../smartList.types";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

export default function SmartListPagination({
  totalPages,
  pageIndex,
  handlePrevPage,
  handleNextPage,
}: SmartListPaginationProps) {
  return (
    <div className="flex justify-center items-center gap-4 py-4">
      <Button
        variant="outline"
        size="sm"
        onClick={handlePrevPage}
        disabled={pageIndex === 0}
        startIcon={<ChevronLeftIcon className="h-4 w-4" />}
      >
        Previous
      </Button>

      <span className="bg-pm-card text-sm text-pm-foreground px-3 py-1 rounded-md">
        Page <strong>{pageIndex + 1}</strong> of <strong>{totalPages}</strong>
      </span>

      <Button
        variant="outline"
        size="sm"
        onClick={handleNextPage}
        disabled={pageIndex === totalPages - 1}
        endIcon={<ChevronRightIcon className="h-4 w-4" />}
      >
        Next
      </Button>
    </div>
  );
}
