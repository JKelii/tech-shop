"use client";

import { priceUpdate } from "@/utils/priceUpdate";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { ITEMS_PER_PAGE } from "@/utils/constants";
import { usePaginationQueryState } from "../hooks/usePaginationQueryState";
import { ProductsFilters } from "./ProductsFilters";
import { ProductsPagination } from "./ProductsPagination";

type ProductsPaginationProps = {
  products: {
    description: string;
    id: string;
    name: string;
    price: number;
    slug: string;
    categories: Array<{
      name: string;
    }>;
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
  selectedCategories?: string[] | undefined;
};

const ProductsList = ({
  products,
  selectedCategories,
}: ProductsPaginationProps) => {
  const [filteredProducts, setFilteredProducts] = useState(products);

  const { page, setPage } = usePaginationQueryState();

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const currentItems = filteredProducts.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  return (
    <>
      <ProductsFilters
        setPage={setPage}
        selectedCategories={selectedCategories}
        setFilteredProducts={setFilteredProducts}
        products={products}
      />
      <div className="grid min-w-[320px] grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-24 lg:gap-20">
        {currentItems.map((product) => (
          <Link
            href={`/item/${product.slug}`}
            key={product.id}
            className="bg-white/60 shadow-md hover:translate-y-[-3px] transition rounded-md"
          >
            <span className="w-full h-full ">
              <article className="border-[1px] border-gray-500  hover:border-slate-700 size-80 rounded-md gap-2 flex justify-center items-center flex-col transition">
                <Image
                  src={product.images[0]?.url}
                  alt={product.name}
                  width={150}
                  height={150}
                  className=" min-h-[120px] min-w-[120px] w-auto h-auto"
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
          <nav
            className=""
            role="navigation"
            aria-label="Pagination Navigation"
          >
            <ProductsPagination
              page={page}
              setPage={setPage}
              totalPages={totalPages}
            />
          </nav>
        </div>
      </div>
    </>
  );
};

export default ProductsList;
