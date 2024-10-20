import {
  Pagination,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import React from "react";
import { usePaginationQueryState } from "../hooks/usePaginationQueryState";
import { Options } from "nuqs";
import { cn } from "@/lib/utils";

type ProductPaginationType = {
  page: number;
  totalPages: number;
  setPage: <Shallow>(
    value: number | ((old: number) => number | null) | null,
    options?: Options<Shallow> | undefined
  ) => Promise<URLSearchParams>;
};

export const ProductsPagination = ({
  page,
  totalPages,
  setPage,
}: ProductPaginationType) => {
  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <ul>
      <Pagination className="w-full">
        {totalPages > 1 && (
          <PaginationPrevious
            onClick={() => handlePageChange(page - 1)}
            aria-label="Previous page"
            className={cn(
              "mx-2",
              page === 1 ? "cursor-not-allowed " : "cursor-pointer "
            )}
          />
        )}
        {page - 2 >= 1 && page <= totalPages && (
          <PaginationLink
            href="#"
            isActive
            className=""
            aria-label={`Go to ${page - 2}`}
            onClick={() => handlePageChange(page - 2)}
          >
            {page - 2}
          </PaginationLink>
        )}
        {page >= 2 && (
          <PaginationLink
            href="#"
            isActive
            className="mx-2"
            aria-label={`Go to ${page - 1}`}
            onClick={() => handlePageChange(page - 1)}
          >
            {page - 1}
          </PaginationLink>
        )}
        {totalPages > 1 && (
          <p
            tabIndex={page}
            aria-label={`${page}`}
            className="py-2 font-semibold text-center w-8"
            aria-selected="true"
            role="tab"
          >
            {page}
          </p>
        )}
        {page < totalPages && (
          <PaginationLink
            href="#"
            isActive
            className="mx-2"
            aria-label={`Go to ${page + 1}`}
            onClick={() => handlePageChange(page + 1)}
          >
            {page + 1}
          </PaginationLink>
        )}

        {page < totalPages && page + 2 <= totalPages && (
          <div className="px-2">
            <PaginationLink
              href="#"
              isActive
              aria-label={`Go to ${page + 2}`}
              onClick={() => handlePageChange(page + 2)}
            >
              {page + 2}
            </PaginationLink>
          </div>
        )}
        {totalPages > 1 && (
          <PaginationNext
            onClick={() => handlePageChange(page + 1)}
            aria-label="Next page"
            className={cn(
              "mx-2",
              page === totalPages ? "cursor-not-allowed" : "cursor-pointer"
            )}
          />
        )}
      </Pagination>
    </ul>
  );
};
