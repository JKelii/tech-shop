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
import { Options } from "nuqs";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";

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
  setPage: <Shallow>(
    value: number | ((old: number) => number | null) | null,
    options?: Options<Shallow> | undefined
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

  const { control, handleSubmit } = form;
  return (
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
  );
};
