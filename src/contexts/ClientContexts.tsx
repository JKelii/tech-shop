"use client";
import React, { ReactNode } from "react";
import {
  CartContext,
  ProductInCart,
  ProductInFavorite,
} from "./ShopContext/CartContext";
import { SessionProvider } from "next-auth/react";

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
