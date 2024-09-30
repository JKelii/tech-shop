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
import { Package } from "lucide-react";
import Image from "next/image";
import React from "react";

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

export const OrdersList = ({ orders }: { orders: OrderType[] }) => {
  return orders.map((order) => (
    <div key={order.stripeCheckoutId} className="w-full min-w-[360px] mt-10">
      <Card className="">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Package className="mr-2" />
            <div className="flex w-full justify-between">
              <p>
                {" "}
                Order from {new Date(order.createdAt).toLocaleDateString()}{" "}
              </p>
              <Badge
                variant={"outline"}
                className={`
    ${order.orderStatus === OrderStatus.Pending ? "bg-yellow-300" : ""}
    ${order.orderStatus === OrderStatus.Paid ? "bg-green-300" : ""}
    ${order.orderStatus === OrderStatus.Created ? "bg-gray-200" : ""}
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
                <TableHead className="w-1/4">Name</TableHead>
                <TableHead className="w-1/4">Price</TableHead>
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
                          src={item.images[0]?.url}
                          alt={item.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                      </TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{priceUpdate(item.price)}</TableCell>
                      <TableCell>1</TableCell>
                    </TableRow>
                  )
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
