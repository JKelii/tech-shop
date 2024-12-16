"use client";

import React, { lazy, Suspense, useState } from "react";
import { useInView } from "react-intersection-observer";

import { usePaginationQueryState } from "../hooks/usePaginationQueryState";
import { ProductsFilters } from "./ProductsFilters";
import { ProductsPagination } from "./ProductsPagination";

import { Skeleton } from "@/components/ui/skeleton";

import { ITEMS_PER_PAGE } from "@/utils/constants";

const ProductsListItems = lazy(() =>
  import("./ProductsListItems").then((module) => ({
    default: module.ProductsListItems,
  })),
);

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
    startIndex + ITEMS_PER_PAGE,
  );

  const { ref: productsRef, inView: productsInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div className="w-full">
      <ProductsFilters
        setPage={setPage}
        selectedCategories={selectedCategories}
        setFilteredProducts={setFilteredProducts}
        products={products}
      />
      <div className="w-full" ref={productsRef}>
        {productsInView && (
          <Suspense fallback={<Skeleton className="h-[800px] w-full" />}>
            <div className="grid w-full min-w-[320px] grid-cols-1 gap-4 md:gap-24 lg:grid-cols-2 lg:gap-20 xl:grid-cols-3">
              <ProductsListItems currentItems={currentItems} />
            </div>
            <div className="mt-10 flex w-full items-center justify-center ">
              <div className="flex w-full flex-col items-center gap-4">
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
          </Suspense>
        )}
      </div>
    </div>
  );
};

export default ProductsList;
