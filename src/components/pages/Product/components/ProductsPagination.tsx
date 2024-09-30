"use client";

import {
  Pagination,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Category, Product } from "@/lib/hygraph/generated/graphql";
import { cn } from "@/lib/utils";
import { priceUpdate } from "@/utils/priceUpdate";
import Image from "next/image";
import Link from "next/link";
import { parseAsInteger, useQueryState } from "nuqs";

import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { ProductType } from "../ProductPage";
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
import { Scalars } from "../../../../../tech-shop/src/lib/hygraph/generated/graphql";

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
};

type ProductsType = {
  products: Product[];
};

type FilterFormData = {
  products: ProductsType[];
  category: Category;
};

type Categories = {
  category: Scalars;
};

const ProductsPagination = ({ products }: ProductsPaginationProps) => {
  const form = useForm<FilterFormData>({
    defaultValues: {
      category: undefined,
    },
  });

  const { control, handleSubmit, reset } = form;

  const [filteredProducts, setFilteredProducts] =
    useState<ProductsPaginationProps>({ products });

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

  const onSubmit = (data: FilterFormData) => {
    const filtered = data.category
      ? products.filter((product) =>
          product.categories.some(
            (category) => category.name === data.category.name
          )
        )
      : products;

    setFilteredProducts({ products: filtered });
  };

  const clearFilters = () => {
    reset();
    setFilteredProducts({ products });
  };

  return (
    <>
      <FormProvider {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 px-6 py-4">
          <FormField
            control={control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select
                  onValueChange={(value: string) => {
                    field.onChange(value as Categories);
                  }}
                  defaultValue={field.name}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="w-full">
                    <SelectItem value={}>Pending</SelectItem>
                    <SelectItem value={}>Paid</SelectItem>
                    <SelectItem value={}>Created</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </FormProvider>
      <div className="grid min-w-[320px] grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-24 lg:gap-20">
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
          <nav
            className=""
            role="navigation"
            aria-label="Pagination Navigation"
          >
            <ul>
              <Pagination>
                <PaginationPrevious
                  onClick={() => handlePageChange(page - 1)}
                  aria-label="Previous page"
                  className={cn(
                    page === 1 ? "cursor-not-allowed" : "cursor-pointer"
                  )}
                />
                {page - 2 >= 1 && page <= totalPages && (
                  <PaginationLink
                    href="#"
                    isActive
                    aria-label={`Go to ${page - 2}`}
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
                    aria-label={`Go to ${page - 1}`}
                    onClick={() => handlePageChange(page - 1)}
                  >
                    {page - 1}
                  </PaginationLink>
                )}
                <li
                  tabIndex={page}
                  aria-label={`${page}`}
                  className="px-4 py-2 font-semibold"
                  aria-selected="true"
                  role="tab"
                >
                  {page}
                </li>
                {page < totalPages && (
                  <PaginationLink
                    href="#"
                    isActive
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
                      className="px-2"
                      aria-label={`Go to ${page + 2}`}
                      onClick={() => handlePageChange(page + 2)}
                    >
                      {page + 2}
                    </PaginationLink>
                  </div>
                )}

                <PaginationNext
                  onClick={() => handlePageChange(page + 1)}
                  aria-label="Next page"
                  className={cn(
                    page === totalPages
                      ? "cursor-not-allowed"
                      : "cursor-pointer"
                  )}
                />
              </Pagination>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default ProductsPagination;
