"use client";
import { createOrder } from "@/actions/order";
import { Button } from "@/components/ui/button";
import React from "react";

export const CheckoutButton = () => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createOrder();
      }}
      className="w-32 text-center border-2 border-black rounded-md m-6"
    >
      <Button>Go to checkout</Button>
    </form>
  );
};
