"use client";

import React, { useState } from "react";
import { CalendarIcon, SlidersHorizontal } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { FormProvider, useForm } from "react-hook-form";
import { OrdersList } from "./OrdersList";
import { OrderStatus } from "@/lib/hygraph/generated/graphql";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { parseAsInteger, useQueryState } from "nuqs";
import {
  Pagination,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { priceUpdate } from "@/utils/priceUpdate";

type OrderItemType = {
  slug: string;
  name: string;
  price: number;
  images: { url: string; fileName: string }[];
};

export type OrderType = {
  total: number;
  stripeCheckoutId: string;
  createdAt: string;
  orderStatus: OrderStatus;
  orderItems: (OrderItemType | null | undefined)[];
};

type FilterFormData = {
  status?: OrderStatus;
  minPrice?: number;
  maxPrice?: number;
  startDate?: Date;
  endDate?: Date;
};

export default function FilterOrders({ orders }: { orders: OrderType[] }) {
  const form = useForm<FilterFormData>({
    defaultValues: {
      status: undefined,
      minPrice: undefined,
      maxPrice: undefined,
      startDate: undefined,
      endDate: undefined,
    },
  });

  const { control, handleSubmit, reset } = form;

  const [filteredOrders, setFilteredOrders] = useState<OrderType[]>(orders);

  const onSubmit = (data: FilterFormData) => {
    const filtered = orders.filter((order) => {
      const orderDate = new Date(order.createdAt);

      const matchesStatus = data.status
        ? order.orderStatus === data.status
        : true;

      const matchesPrice =
        (!data.minPrice || order.total >= data.minPrice * 100) &&
        (!data.maxPrice || order.total <= data.maxPrice * 100);

      const matchesDate =
        (!data.startDate || orderDate >= data.startDate) &&
        (!data.endDate || orderDate <= data.endDate);

      return matchesStatus && matchesPrice && matchesDate;
    });

    setFilteredOrders(filtered);
  };

  const clearFilters = () => {
    reset();
    setFilteredOrders(orders);
  };

  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));

  const itemsPerPage = 5;

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

  const startIndex = (page - 1) * itemsPerPage;
  const currentItems = filteredOrders.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <div className="w-full min-w-[360px]">
      <Card className="mb-8">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex justify-center items-center gap-2">
              <SlidersHorizontal /> Filters
            </CardTitle>
          </div>
        </CardHeader>

        <FormProvider {...form}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6 px-6 py-4"
          >
            <FormField
              control={control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>

                  <Select
                    onValueChange={(value: string) =>
                      field.onChange(value as OrderStatus)
                    }
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="w-full">
                      <SelectItem value={OrderStatus.Pending}>
                        Pending
                      </SelectItem>
                      <SelectItem value={OrderStatus.Paid}>Paid</SelectItem>
                      <SelectItem value={OrderStatus.Created}>
                        Created
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex space-x-4">
              <FormField
                control={control}
                name="minPrice"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Min Price</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="0"
                        value={field.value ? String(field.value) : ""}
                        onChange={(e) =>
                          field.onChange(parseFloat(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="maxPrice"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Max Price</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="1000"
                        value={field.value ? String(field.value) : ""}
                        onChange={(e) =>
                          field.onChange(parseFloat(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex space-x-4">
              <FormField
                control={control}
                name="startDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col flex-1">
                    <FormLabel>Start Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="endDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col flex-1">
                    <FormLabel>End Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex gap-4">
              <Button
                type="submit"
                variant={"outline"}
                className="w-full bg-black text-white"
              >
                Apply Filters
              </Button>
              <Button
                type="button"
                variant={"outline"}
                className=" w-full bg-white text-black hover:bg-black hover:text-white"
                onClick={clearFilters}
              >
                Clear Filters
              </Button>
            </div>
          </form>
        </FormProvider>
      </Card>
      <div className="flex justify-center items-center w-full mt-10 ">
        <div className="flex flex-col items-center gap-4 w-full"></div>
      </div>
      <OrdersList orders={currentItems} />
      <nav
        className="mt-5"
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
                page === 1 && page === totalPages
                  ? "cursor-not-allowed"
                  : "cursor-pointer"
              )}
            />
          </Pagination>
        </ul>
      </nav>
    </div>
  );
}
