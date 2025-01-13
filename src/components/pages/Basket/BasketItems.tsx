"use client";
import Image from "next/image";
import React from "react";

import RemoveFromBasket from "./RemoveFromBasket";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { priceUpdate } from "@/utils/priceUpdate";

import type { ResponseGetCart } from "@/lib/mappers/getCart";

const BasketItems = ({ cart }: { cart: ResponseGetCart[] | undefined }) => {
  const total = cart
    ?.map((item) => item.price * item.quantity)
    .reduce((a, b) => a + b, 0);

  return (
    <div className="container mx-auto p-4">
      <Card>
        {cart && (
          <CardHeader className={cart ? "min-h-24" : "h-24"}>
            <CardTitle>Your Basket</CardTitle>
          </CardHeader>
        )}
        <CardContent className="flex flex-col gap-4">
          <p className="mt-2 text-xl font-semibold text-black/90">
            {cart &&
              cart.length >= 1 &&
              total &&
              `Total: ${priceUpdate(total)}`}
          </p>
          {cart ? (
            cart?.map((product) => (
              <div
                key={product.id}
                className="flex h-52 w-full items-center justify-between border-b py-4"
              >
                <div className="flex items-center space-x-4">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={100}
                    height={100}
                    priority
                    className="rounded-md"
                  />
                  <div>
                    <h3 className="font-semibold">{product.name}</h3>
                    <p className="text-sm text-gray-500">
                      Size: {product.size}
                    </p>
                    <p className="text-sm text-gray-500">
                      Price: {priceUpdate(product.price * product.quantity)}
                    </p>
                    <p className="text-sm text-gray-500">
                      Quantity: {product.quantity}
                    </p>
                  </div>
                </div>
                <RemoveFromBasket
                  product={product}
                  productId={product.id}
                  productQuantity={product.quantity}
                />
              </div>
            ))
          ) : (
            <div className="flex h-full items-start justify-start">
              <p className="text-gray-500">No items in basket</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BasketItems;
