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
import { parseAsInteger, useQueryState } from "nuqs";

import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

type FilterFormData = {
  selectedCategories: string[];
};

const ProductsPagination = ({
  products,
  selectedCategories,
}: ProductsPaginationProps) => {
  const form = useForm<FilterFormData>({
    defaultValues: {
      selectedCategories: selectedCategories,
    },
  });

  const { control, handleSubmit } = form;

  const [filteredProducts, setFilteredProducts] = useState(products);

  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));

  const itemsPerPage = 9;

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const startIndex = (page - 1) * itemsPerPage;
  const currentItems = filteredProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const onSubmit = (data: FilterFormData) => {
    if (data.selectedCategories?.includes("All items")) {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((product) =>
        product.categories.some((category) =>
          data.selectedCategories?.includes(category.name)
        )
      );
      setFilteredProducts(filtered);
    }
    setPage(1);
  };

  const getUniqueCategories = () => {
    const categories = new Set<string>(["All items"]);
    products.forEach((product) => {
      product.categories.forEach((category) => {
        categories.add(category.name);
      });
    });
    return Array.from(categories);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <>
      <FormProvider {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 px-6 py-4 mb-10"
        >
          <FormField
            control={control}
            name="selectedCategories"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>

                <Select
                  onValueChange={(value: string) => {
                    field.onChange([value]);
                    onSubmit({ selectedCategories: [value] });
                  }}
                  defaultValue={"All items"}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="w-full">
                    {getUniqueCategories().map((categoryName) => (
                      <SelectItem key={categoryName} value={categoryName}>
                        {categoryName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </FormProvider>
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
            <ul>
              <Pagination className="w-full">
                {totalPages > 1 && (
                  <PaginationPrevious
                    onClick={() => handlePageChange(page - 1)}
                    aria-label="Previous page"
                    className={cn(
                      "mx-2",
                      page === 1 ? "cursor-not-allowed " : "cursor-pointer "
                    )}
                  />
                )}
                {page - 2 >= 1 && page <= totalPages && (
                  <PaginationLink
                    href="#"
                    isActive
                    className=""
                    aria-label={`Go to ${page - 2}`}
                    onClick={() => handlePageChange(page - 2)}
                  >
                    {page - 2}
                  </PaginationLink>
                )}
                {page >= 2 && (
                  <PaginationLink
                    href="#"
                    isActive
                    className="mx-2"
                    aria-label={`Go to ${page - 1}`}
                    onClick={() => handlePageChange(page - 1)}
                  >
                    {page - 1}
                  </PaginationLink>
                )}
                {totalPages > 1 && (
                  <p
                    tabIndex={page}
                    aria-label={`${page}`}
                    className="py-2 font-semibold text-center w-8"
                    aria-selected="true"
                    role="tab"
                  >
                    {page}
                  </p>
                )}
                {page < totalPages && (
                  <PaginationLink
                    href="#"
                    isActive
                    className="mx-2"
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
                      aria-label={`Go to ${page + 2}`}
                      onClick={() => handlePageChange(page + 2)}
                    >
                      {page + 2}
                    </PaginationLink>
                  </div>
                )}
                {totalPages > 1 && (
                  <PaginationNext
                    onClick={() => handlePageChange(page + 1)}
                    aria-label="Next page"
                    className={cn(
                      "mx-2",
                      page === totalPages
                        ? "cursor-not-allowed"
                        : "cursor-pointer"
                    )}
                  />
                )}
              </Pagination>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default ProductsPagination;
