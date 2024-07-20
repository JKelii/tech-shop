"use client";

import {
  Pagination,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { CircleUser } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";

import React, { useEffect } from "react";

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
  const searchParams = useSearchParams();
  const router = useRouter();

  const itemsPerPage = 5;
  const totalPages = Math.ceil(reviews.length / itemsPerPage);

  const currentPage = parseInt(searchParams.get("reviewsPage") || "1", 10);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = reviews.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    sessionStorage.setItem("scrollPosition", window.scrollY.toString());
    router.push(`/item/${slug}?reviewsPage=${newPage}`);
  };

  useEffect(() => {
    const savedPosition = sessionStorage.getItem("scrollPosition");
    if (savedPosition) {
      window.scrollTo(0, parseInt(savedPosition, 10));
    }
  }, [currentPage]);

  return (
    <section className="flex justify-start items-start flex-col my-10 w-[27rem] gap-4 ">
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
              <CircleUser className="size-8 text-gray-500" />
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
        <div className="flex flex-col justify-center items-center gap-4 w-full">
          <p>{currentPage}</p>
          <Pagination>
            <PaginationPrevious
              className="cursor-pointer"
              onClick={() => handlePageChange(currentPage - 1)}
            />
            <PaginationNext
              className="cursor-pointer"
              onClick={() => handlePageChange(currentPage + 1)}
            />
          </Pagination>
        </div>
      )}
    </section>
  );
};

export default Comments;
