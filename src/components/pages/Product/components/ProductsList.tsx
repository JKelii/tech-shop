"use client";

import React, { lazy, Suspense, useEffect, useState } from "react";
import { ITEMS_PER_PAGE } from "@/utils/constants";
import { usePaginationQueryState } from "../hooks/usePaginationQueryState";
import { ProductsFilters } from "./ProductsFilters";
import { ProductsPagination } from "./ProductsPagination";
import { useInView } from "react-intersection-observer";
import { Skeleton } from "@/components/ui/skeleton";

const ProductsListItems = lazy(() =>
  import("./ProductsListItems").then((module) => ({
    default: module.ProductsListItems,
  }))
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
    startIndex + ITEMS_PER_PAGE
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
          <Suspense fallback={<Skeleton className="w-full h-[800px]" />}>
            <div className="grid min-w-[320px] w-full grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-24 lg:gap-20">
              <ProductsListItems currentItems={currentItems} />
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
          </Suspense>
        )}
      </div>
    </div>
  );
};

export default ProductsList;
