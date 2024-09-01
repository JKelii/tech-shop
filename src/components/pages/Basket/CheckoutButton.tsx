"use client";
import { createOrder } from "@/actions/order";
import { Button } from "@/components/ui/button";
import { getSession, useSession } from "next-auth/react";
import React from "react";

export const CheckoutButton = () => {
  const { data: session } = useSession();
  const email = session?.email;
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createOrder({ email });
      }}
      className="w-32 text-center border-2 border-black rounded-md m-6"
    >
      <Button>Go to checkout</Button>
    </form>
  );
};
