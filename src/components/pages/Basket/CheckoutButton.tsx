"use client";
import { createOrder } from "@/actions/order";
import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import { ResponseGetCart } from "@/lib/mappers/getCart";
import { priceUpdate } from "@/utils/priceUpdate";
import { getSession, useSession } from "next-auth/react";
import React, { useTransition } from "react";
import { ThreeDots } from "react-loader-spinner";

export const CheckoutButton = ({
  cart,
}: {
  cart: ResponseGetCart[] | undefined;
}) => {
  const { data: session } = useSession();
  const email = session?.email;
  const [isPending, startTransition] = useTransition();
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        startTransition(async () => {
          createOrder();
        });
      }}
      className=""
    >
      <CardFooter>
        {cart && cart.length >= 1 && (
          <Button
            variant={"outline"}
            disabled={isPending}
            className="w-96  text-center border-2 border-black rounded-md m-6 bg-black text-white hover:bg-white hover:text-black"
          >
            {isPending ? (
              <ThreeDots
                visible={true}
                height="50"
                width="50"
                color="#fff"
                radius="9"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClass=""
              />
            ) : (
              <p> Go to Checkout </p>
            )}
          </Button>
        )}
      </CardFooter>
    </form>
  );
};
