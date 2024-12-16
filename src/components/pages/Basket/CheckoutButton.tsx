"use client";
import { useSession } from "next-auth/react";
import React, { useTransition } from "react";
import { ThreeDots } from "react-loader-spinner";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";

import { createOrder } from "@/actions/order";

import type { ResponseGetCart } from "@/lib/mappers/getCart";

export const CheckoutButton = ({
  cart,
}: {
  cart: ResponseGetCart[] | undefined;
}) => {
  const { data: session } = useSession();
  const [isPending, startTransition] = useTransition();
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        startTransition(async () => {
          if (session) {
            await createOrder();
          } else {
            toast("You have to be logged in");
          }
        });
      }}
      className=""
    >
      <CardFooter>
        {cart && cart.length >= 1 && (
          <Button
            variant={"outline"}
            disabled={isPending}
            className="m-6  w-96 rounded-md border-2 border-black bg-black text-center text-white hover:bg-white hover:text-black"
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
