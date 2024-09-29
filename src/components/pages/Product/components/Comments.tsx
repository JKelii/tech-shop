"use client";

import {
  Pagination,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";
import { CircleUser } from "lucide-react";
import { parseAsInteger, useQueryState } from "nuqs";

import React from "react";

type ReviewsType = {
  content: string;
  name: string;
}[];

export const Comments = ({
  reviews,
  slug,
}: {
  reviews: ReviewsType;
  slug: string;
}) => {
  const itemsPerPage = 5;

  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));

  const totalPages = Math.ceil(reviews.length / itemsPerPage);

  const startIndex = (page - 1) * itemsPerPage;
  const currentItems = reviews.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <section className="flex justify-start items-start flex-col my-10 w-96 lg:w-[27rem] gap-4 ">
      <h3 className="text-black font-black text-2xl ml-10 self-start">
        Comments
      </h3>
      <p className="ml-10 self-start ">
        Share your thoughts and feedback on this product.
      </p>
      <div className="h-full flex justify-start items-start flex-col gap-4 w-full">
        {currentItems.length >= 1 ? (
          currentItems.map((item, index) => (
            <article
              key={index}
              className="flex justify-center items-center gap-4 ml-8 "
            >
              <CircleUser className="size-8 min-w-[2rem] min-h-[2rem] text-gray-500" />
              <div className="flex flex-col justify-center items-start">
                <div className="flex gap-4 justify-start items-center">
                  <p className="font-black">{item.name}</p>
                  <p className="text-xs">2 Days ago</p>
                </div>
                <p className="text-sm">{item.content}</p>
              </div>
            </article>
          ))
        ) : (
          <article className="flex justify-center items-center w-full">
            <p className="text-center mt-10 font-black">
              There are no comments yet
            </p>
          </article>
        )}
      </div>
      {reviews.length >= 1 && (
        <div className="flex justify-center items-center w-full mt-10 ">
          <div className="flex flex-col items-center gap-4 w-full">
            <div className="">
              <Pagination>
                <Pagination>
                  <PaginationPrevious
                    onClick={() => handlePageChange(page - 1)}
                    className={cn(
                      page === 1 ? "cursor-not-allowed" : "cursor-pointer"
                    )}
                  />

                  {page - 2 >= 1 && page <= totalPages && (
                    <PaginationLink
                      href="#"
                      isActive
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
                      onClick={() => handlePageChange(page - 1)}
                    >
                      {page - 1}
                    </PaginationLink>
                  )}

                  <span className="px-4 py-2 font-semibold">{page}</span>
                  {page < totalPages && (
                    <PaginationLink
                      href="#"
                      isActive
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
                        onClick={() => handlePageChange(page + 2)}
                      >
                        {page + 2}
                      </PaginationLink>
                    </div>
                  )}

                  <PaginationNext
                    onClick={() => handlePageChange(page + 1)}
                    className={cn(
                      page === totalPages
                        ? "cursor-not-allowed"
                        : "cursor-pointer"
                    )}
                  />
                </Pagination>
              </Pagination>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Comments;
