"use client";
import React, { ReactNode } from "react";
import { CartContext } from "./ShopContext/CartContext";
import { SessionProvider } from "next-auth/react";

export const ClientContexts = ({ children }: { children: ReactNode }) => {
  return (
    <CartContext>
      <SessionProvider>{children}</SessionProvider>
    </CartContext>
  );
};
