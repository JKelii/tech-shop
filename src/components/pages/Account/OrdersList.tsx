import { Package } from "lucide-react";
import Image from "next/image";
import React from "react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { OrderStatus } from "@/lib/hygraph/generated/graphql";
import { priceUpdate } from "@/utils/priceUpdate";

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
};

export const OrdersList = ({ orders }: { orders: OrderType[] }) => {
  return orders.map((order) => (
    <div key={order.stripeCheckoutId} className="mt-10 w-full min-w-[360px]">
      <Card className="">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Package className="mr-2" />
            <div className="flex w-full justify-between">
              <p>Order from {new Date(order.createdAt).toLocaleDateString()}</p>
              <Badge
                variant={"outline"}
                className={`
                  ${
                    order.orderStatus === OrderStatus.Pending
                      ? "bg-yellow-300"
                      : ""
                  }
                  ${
                    order.orderStatus === OrderStatus.Paid ? "bg-green-300" : ""
                  }
                  ${
                    order.orderStatus === OrderStatus.Created
                      ? "bg-gray-200"
                      : ""
                  }
                `}
              >
                {order.orderStatus}
              </Badge>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-1/4">Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Size</TableHead>
                <TableHead className="w-1/4">Quantity</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {order.orderItems.map(
                (item, index) =>
                  item && (
                    <TableRow key={index}>
                      <TableCell className="w-1/4">
                        <Image
                          width={100}
                          height={100}
                          src={item.product.image || ""}
                          alt={item.product.name || "Product Image"}
                          className="size-12 rounded object-cover"
                        />
                      </TableCell>
                      <TableCell>{item.product.name}</TableCell>
                      <TableCell>
                        {priceUpdate(
                          (item?.product?.price || 1) * item.quantity,
                        )}
                      </TableCell>
                      <TableCell>{item.size}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                    </TableRow>
                  ),
              )}
            </TableBody>
          </Table>
          <div className="mt-4 text-right">
            <strong>Order total: {priceUpdate(order.total)}</strong>
          </div>
        </CardContent>
      </Card>
    </div>
  ));
};
