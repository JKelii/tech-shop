"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponseGetCart } from "@/lib/mappers/getCart";
import React from "react";
import RemoveFromBasket from "./RemoveFromBasket";
import { priceUpdate } from "@/utils/priceUpdate";
import Image from "next/image";

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
          <p className="text-black/90 text-xl font-semibold mt-2">
            Total: {cart && total && priceUpdate(total)}
          </p>
          {cart ? (
            cart?.map((product) => (
              <div
                key={product.id}
                className="flex items-center justify-between border-b py-4 h-52 w-full"
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
            <div className="flex justify-start items-start h-full">
              <p className="text-gray-500">No items in basket</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BasketItems;
