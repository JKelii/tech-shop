"use client";

import React, { lazy, Suspense, useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { OrderStatus } from "@/lib/hygraph/generated/graphql";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { parseAsInteger, useQueryState } from "nuqs";
import { OrderFromProvider } from "./OrderFromProvider";
import { useInView } from "react-intersection-observer";
import { Skeleton } from "@/components/ui/skeleton";
import { getFilteredOrders } from "@/actions/filteredOrders";

const OrdersList = lazy(() =>
  import("./OrdersList").then((module) => ({
    default: module.OrdersList,
  }))
);

const OrdersPagination = lazy(() =>
  import("./OrdersPagination").then((module) => ({
    default: module.OrdersPagination,
  }))
);

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

type FilterOrdersType = {
  orders: OrderType;
};

export const FilterOrders = ({ orders }: FilterOrdersType) => {
  const { ref: ordersRef, inView: ordersInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [filteredOrders, setFilteredOrders] = useState<OrderType>(orders);

  const allOrdersTypes = orders.map((item) => item.orderStatus);
  const ordersStatuses = allOrdersTypes.filter(
    (element, index) => allOrdersTypes.indexOf(element) === index
  );
  console.log(ordersStatuses);

  const onSubmit = async (data: FilterFormData) => {
    const filteredOrders = await getFilteredOrders({
      minPrice: data.order.minPrice ? data.order.minPrice / 100 : 1,
      maxPrice: data.order.maxPrice
        ? data.order.maxPrice / 100
        : Number.MAX_SAFE_INTEGER,
      status: data.order.status ?? OrderStatus.Created,
      startDate: data.order.startDate?.toISOString()
        ? data.order.startDate?.toISOString()
        : new Date(0).toISOString(),
      endDate: data.order.endDate?.toISOString()
        ? data.order.endDate?.toISOString()
        : new Date().toISOString(),
    });

    setFilteredOrders(filteredOrders as OrderType);
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
        <OrderFromProvider
          onSubmit={onSubmit}
          setFilteredOrders={setFilteredOrders}
          orders={orders}
        />
      </Card>
      <div className="flex justify-center items-center w-full mt-10 ">
        <div className="flex flex-col items-center gap-4 w-full"></div>
      </div>
      <div ref={ordersRef} className="w-full">
        {ordersInView && (
          <Suspense fallback={<Skeleton className="h-[500px] w-full" />}>
            <OrdersList orders={currentItems} />
            <OrdersPagination
              page={page}
              handlePageChange={handlePageChange}
              totalPages={totalPages}
            />
          </Suspense>
        )}
      </div>
    </div>
  );
};
