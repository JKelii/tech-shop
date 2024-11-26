"use server";

import { getOrdersByFilters } from "@/lib";
import { OrderStatus } from "@/lib/hygraph/generated/graphql";
import { getServerSession } from "next-auth";

export const getFilteredOrders = async ({
  minPrice,
  maxPrice,
  status,
  startDate,
  endDate,
}: {
  minPrice: number | undefined;
  maxPrice: number | undefined;
  status: OrderStatus;
  startDate: string | undefined;
  endDate: string | undefined;
}) => {
  const session = await getServerSession();
  const userEmail = session?.user?.email;

  if (!userEmail) return { error: "You are not logged in" };
  const filteredOrders = await getOrdersByFilters({
    email: userEmail,
    status: status,
    startDate: startDate ?? new Date(0).toISOString(),
    endDate: endDate ?? new Date().toISOString(),
    minPrice: minPrice ?? 1,
    maxPrice: maxPrice ?? Number.MAX_SAFE_INTEGER,
  });

  return filteredOrders;
};
