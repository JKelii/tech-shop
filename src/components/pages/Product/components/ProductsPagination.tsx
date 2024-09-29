"use client";

import {
  Pagination,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";
import { priceUpdate } from "@/utils/priceUpdate";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { parseAsInteger, useQueryState } from "nuqs";

import React from "react";

type ProductsPaginationProps = {
  products: {
    description: string;
    id: string;
    name: string;
    price: number;
    slug: string;
    images: Array<{
      fileName: string;
      url: string;
      productImages: Array<{
        id: string;
        reviews: Array<{
          content: string;
          rating?: number | null;
        }>;
      }>;
    }>;
  }[];
};

const ProductsPagination = ({ products }: ProductsPaginationProps) => {
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));

  const itemsPerPage = 9;

  const totalPages = Math.ceil(products.length / itemsPerPage);

  const startIndex = (page - 1) * itemsPerPage;
  const currentItems = products.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <>
      <div className="grid min-w-[320px] grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-24 lg:gap-20">
        {currentItems.map((product) => (
          <Link
            href={`/item/${product.slug}`}
            key={product.id}
            className="bg-gray-50/80 shadow-md hover:translate-y-[-3px] transition rounded-md"
          >
            <span className="w-full h-full ">
              <article className="border-[1px] border-gray-500  hover:border-slate-700 size-80 rounded-md gap-2 flex justify-center items-center flex-col transition">
                <Image
                  src={product.images[0]?.url}
                  alt={product.name}
                  width={150}
                  height={150}
                  className="max-h-[150px] max-w-[150px] min-h-[120px] min-w-[120px]"
                />
                <p className="font-semibold self-start ml-4">{product.name}</p>
                <p className="text-sm self-start ml-4 text-muted-foreground">
                  {product.description}
                </p>
                <p className="font-bold self-start ml-4">
                  {priceUpdate(product.price)}
                </p>
              </article>
            </span>
          </Link>
        ))}
      </div>
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
    </>
  );
};

export default ProductsPagination;
