"use client";
import { createOrder } from "@/actions/order";
import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import { ResponseGetCart } from "@/lib/mappers/getCart";
import { priceUpdate } from "@/utils/priceUpdate";
import { getSession, useSession } from "next-auth/react";
import React from "react";

export const CheckoutButton = ({
  cart,
}: {
  cart: ResponseGetCart[] | undefined;
}) => {
  const { data: session } = useSession();
  const email = session?.email;
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createOrder();
      }}
      className=""
    >
      <CardFooter>
        {cart && cart.length >= 1 && (
          <Button
            variant={"outline"}
            className="w-96  text-center border-2 border-black rounded-md m-6 bg-black text-white hover:bg-white hover:text-black"
          >
            Go to Checkout{" "}
          </Button>
        )}
      </CardFooter>
    </form>
  );
};
