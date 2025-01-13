import React from "react";
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

import { getProductsByCategories } from "@/actions/productsByCategory";

type Options<T> = {
  shallow?: T;
  someOtherOption?: boolean;
};

type ProductsFilterType = {
  selectedCategories: string[] | undefined;
  setFilteredProducts: React.Dispatch<
    React.SetStateAction<
      {
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
      }[]
    >
  >;
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
  setPage: <Shallow extends boolean | undefined>(
    value: number | ((old: number) => number | null) | null,
    options?: Options<Shallow>,
  ) => Promise<URLSearchParams>;
};

type FilterFormData = {
  selectedCategories: string[];
};

export const ProductsFilters = ({
  products,
  selectedCategories,
  setPage,
  setFilteredProducts,
}: ProductsFilterType) => {
  const form = useForm<FilterFormData>({
    defaultValues: {
      selectedCategories: selectedCategories,
    },
  });

  const onSubmit = async (data: FilterFormData) => {
    if (data.selectedCategories?.includes("All items")) {
      setFilteredProducts(products);
    } else {
      const filtered = await getProductsByCategories({
        categoryName: data.selectedCategories.toString(),
      });
      setFilteredProducts(filtered);
    }
    await setPage(1);
  };

  const getUniqueCategories = () => {
    const categories = new Set<string>([
      "All items",
      ...(selectedCategories || []),
    ]);
    return Array.from(categories);
  };

  const { control, handleSubmit } = form;
  return (
    <FormProvider {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mb-10 w-full space-y-6 px-6 py-4"
      >
        <FormField
          control={control}
          name="selectedCategories"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>

              <Select
                onValueChange={async (value: string) => {
                  field.onChange([value]);
                  await onSubmit({ selectedCategories: [value] });
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
  );
};
