import React from "react";
import { FormProvider, useForm } from "react-hook-form";

import { OrderFormFields } from "./OrderFormFields";

import { Button } from "@/components/ui/button";

import type { OrderStatus } from "@/lib/hygraph/generated/graphql";

type ProductType = {
  image: string | undefined;
  price: number | undefined;
  name: string | undefined;
  slug: string | undefined;
};

type OrderItemType = {
  size: string | null | undefined;
  quantity: number;
  product: ProductType;
};

export type OrderType = {
  total: number;
  stripeCheckoutId: string;
  createdAt: string;
  orderStatus: OrderStatus;
  orderItems: (OrderItemType | null | undefined)[];
}[];

type FilterFormData = {
  order: {
    status?: OrderStatus;
    minPrice?: number;
    maxPrice?: number;
    startDate?: Date;
    endDate?: Date;
  };
};

export const OrderFromProvider = ({
  onSubmit,
  setFilteredOrders,
  orders,
}: {
  onSubmit: (data: FilterFormData) => void;
  setFilteredOrders: React.Dispatch<React.SetStateAction<OrderType>>;
  orders: OrderType;
}) => {
  const form = useForm<FilterFormData>({});
  const { control, handleSubmit, reset } = form;

  const clearFilters = () => {
    reset();
    setFilteredOrders(orders);
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 px-6 py-4">
        <OrderFormFields control={control} />

        <div className="flex gap-4">
          <Button
            type="button"
            variant={"outline"}
            className=" w-full bg-white text-black hover:bg-black hover:text-white"
            onClick={clearFilters}
          >
            Clear Filters
          </Button>
          <Button
            type="submit"
            variant={"outline"}
            className="w-full bg-black text-white"
          >
            Apply Filters
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};
