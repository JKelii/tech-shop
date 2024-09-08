"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ResponseGetCart } from "@/lib/mappers/getCart";
import { X } from "lucide-react";
import Image from "next/image";
import React from "react";

const BasketItems = ({ cart }: { cart: ResponseGetCart[] | undefined }) => {
  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Your Basket</CardTitle>
        </CardHeader>
        <CardContent>
          {cart?.map((product) => (
            <div
              key={product.id}
              className="flex items-center justify-between border-b py-4 h-52"
            >
              <div className="flex items-center space-x-4">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={100}
                  height={100}
                  className="rounded-md"
                />
                <div>
                  <h3 className="font-semibold">{product.name}</h3>
                  <p className="text-sm text-gray-500">Size: ?</p>
                  <p className="text-sm text-gray-500">
                    Quantity: {product.quantity}
                  </p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => product.id}>
                <X className="h-6 w-6" />
                <span className="sr-only">Remove item</span>
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default BasketItems;
