"use client";
import React, { ReactNode } from "react";
import { CartContext, ProductInCart } from "./ShopContext/CartContext";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";

export const ClientContexts = ({
  children,
  cartFromDatabase,
}: {
  children: ReactNode;
  cartFromDatabase: ProductInCart[] | undefined;
}) => {
  return (
    <CartContext cartFromDatabase={cartFromDatabase}>
      <SessionProvider>{children}</SessionProvider>
    </CartContext>
  );
};
