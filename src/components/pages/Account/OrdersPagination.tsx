import React from "react";

import {
  Pagination,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { cn } from "@/lib/utils";

export const OrdersPagination = ({
  page,
  handlePageChange,
  totalPages,
}: {
  page: number;
  handlePageChange: (newPage: number) => void;
  totalPages: number;
}) => {
  return (
    <nav className="mt-5" role="navigation" aria-label="Pagination Navigation">
      <ul>
        <Pagination>
          <PaginationPrevious
            onClick={() => handlePageChange(page - 1)}
            aria-label="Previous page"
            className={cn(page === 1 ? "cursor-not-allowed" : "cursor-pointer")}
          />
          {page - 2 >= 1 && page <= totalPages && (
            <PaginationLink
              href="#"
              isActive
              aria-label={`Go to ${page - 2}`}
              className="mx-2"
              onClick={() => handlePageChange(page - 2)}
            >
              {page - 2}
            </PaginationLink>
          )}
          {page >= 2 && (
            <PaginationLink
              href="#"
              isActive
              aria-label={`Go to ${page - 1}`}
              onClick={() => handlePageChange(page - 1)}
            >
              {page - 1}
            </PaginationLink>
          )}
          <li
            tabIndex={page}
            aria-label={`${page}`}
            className="px-4 py-2 font-semibold"
            aria-selected="true"
            role="tab"
          >
            {page}
          </li>
          {page < totalPages && (
            <PaginationLink
              href="#"
              isActive
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
                className="px-2"
                aria-label={`Go to ${page + 2}`}
                onClick={() => handlePageChange(page + 2)}
              >
                {page + 2}
              </PaginationLink>
            </div>
          )}

          <PaginationNext
            onClick={() => handlePageChange(page + 1)}
            aria-label="Next page"
            className={cn(
              page === 1 && page === totalPages
                ? "cursor-not-allowed"
                : "cursor-pointer",
            )}
          />
        </Pagination>
      </ul>
    </nav>
  );
};
