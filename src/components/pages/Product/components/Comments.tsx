"use client";

import { CircleUser, Clock } from "lucide-react";
import { parseAsInteger, useQueryState } from "nuqs";
import React from "react";

import CreateComment from "./CreateComment";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Pagination,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Separator } from "@/components/ui/separator";

import { cn } from "@/lib/utils";

type ReviewsType = {
  content: string;
  name: string;
  date: string;
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

  const handlePageChange = async (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      await setPage(newPage);
    }
  };

  return (
    <section className="container mx-auto my-10 flex w-full flex-col items-center justify-center gap-4 ">
      <Card className="w-full min-w-[350px] bg-gray-100/80 px-6 pb-4">
        <CardHeader className="self-start text-2xl font-black text-black">
          <CardTitle>Comments</CardTitle>
        </CardHeader>
        <Separator />

        <div className="mt-6 flex size-full flex-col items-start justify-start gap-4">
          {currentItems.length >= 1 ? (
            currentItems.map((item, index) => (
              <Card
                key={index}
                className="w-full bg-white shadow-sm transition-shadow duration-200 hover:shadow-md"
              >
                <CardContent className="p-4">
                  <div className="flex space-x-4">
                    <CircleUser className="size-8 min-h-8 min-w-8" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-500">
                          {item.name}
                        </h3>
                        <span className="flex items-center text-sm text-gray-500">
                          <Clock className="mr-1 size-4" />
                          {item.date}
                        </span>
                      </div>
                      <p className="mt-2 text-gray-700">{item.content}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <article className="flex w-full items-center justify-center">
              <p className="my-10 text-center font-black">
                There are no comments yet
              </p>
            </article>
          )}
        </div>

        {reviews.length >= 1 && (
          <div className="mt-10 flex w-full items-center justify-center ">
            <div className="flex w-full flex-col items-center gap-4">
              <div className="">
                <Pagination>
                  <Pagination>
                    <PaginationPrevious
                      onClick={() => handlePageChange(page - 1)}
                      className={cn(
                        page === 1 ? "cursor-not-allowed" : "cursor-pointer",
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
                          : "cursor-pointer",
                      )}
                    />
                  </Pagination>
                </Pagination>
              </div>
              <div className="flex w-full items-center justify-center"></div>
            </div>
          </div>
        )}
        <Card className="w-full min-w-[350px] bg-gray-100/80 shadow-md transition-shadow duration-200 hover:shadow-md">
          <CreateComment slug={slug} />
        </Card>
      </Card>
    </section>
  );
};

export default Comments;
