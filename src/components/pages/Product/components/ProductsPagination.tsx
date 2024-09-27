"use client";

import {
  Pagination,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { priceUpdate } from "@/utils/priceUpdate";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

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
  const searchParams = useSearchParams();
  const router = useRouter();

  const itemsPerPage = 9;
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      router.push(`?page=${page}`);
    }
  };

  return (
    <>
      <div className="grid min-w-[320px] grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-24 lg:gap-20">
        {currentItems.map((product) => (
          <Link href={`/item/${product.slug}`} key={product.id}>
            <span className="w-full h-full">
              <article className="border-[1px] border-gray-500  hover:border-slate-700 size-80 rounded-md gap-2 flex justify-center items-center flex-col hover:translate-y-[-3px] transition">
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
          {/* Centered the current page number */}
          <div className="">
            <Pagination>
              <PaginationPrevious
                className={`cursor-pointer px-4 ${
                  currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={() => handlePageChange(currentPage - 1)}
              />
              <p className="text-center w-full mt-2 px-6">{currentPage}</p>{" "}
              <PaginationNext
                className={`cursor-pointer px-4 ${
                  currentPage === totalPages
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
                onClick={() => handlePageChange(currentPage + 1)}
              />
            </Pagination>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductsPagination;
