"use client";

import {
  Pagination,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";
import { CircleUser, Clock } from "lucide-react";
import { parseAsInteger, useQueryState } from "nuqs";

import React from "react";
import CreateComment from "./CreateComment";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

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

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <section className="flex justify-center container mx-auto items-center flex-col my-10 w-full gap-4 ">
      <Card className="px-6 bg-gray-100/80 pb-4 w-full min-w-[350px]">
        <CardHeader className="text-black font-black text-2xl self-start">
          <CardTitle>Comments</CardTitle>
        </CardHeader>
        <Separator />

        <div className="h-full flex justify-start items-start flex-col gap-4 w-full mt-6">
          {currentItems.length >= 1 ? (
            currentItems.map((item, index) => (
              <Card
                key={index}
                className="bg-white w-full shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <CardContent className="p-4">
                  <div className="flex space-x-4">
                    <CircleUser className="size-8 min-w-[2rem] min-h-[2rem]" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-lg text-gray-500">
                          {item.name}
                        </h3>
                        <span className="text-sm text-gray-500 flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
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
            <article className="flex justify-center items-center w-full">
              <p className="text-center mt-10 font-black">
                There are no comments yet
              </p>
            </article>
          )}
        </div>
      </Card>
      <div className="w-full flex justify-center items-center">
        <Card className="bg-gray-100/80 w-full shadow-md hover:shadow-md transition-shadow duration-200 min-w-[350px]">
          <CreateComment slug={slug} />
        </Card>
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
