"use server";

import { createCart, getCart } from "@/lib";
import { GetCartByIdDocument } from "@/lib/hygraph/generated/graphql";
import { mapperGetCart } from "@/lib/mappers/getCart";
import { cookies } from "next/headers";

const COOKIE_NAME_CART = "cart";

export const checkCart = async (product: {
  slug: string;
  quantity: number;
  email?: string;
}) => {
  const findCart = cookies().get(COOKIE_NAME_CART);
  if (!findCart) {
    const createdCart = await createCart(product);
    if (!createdCart) return;
    cookies().set(COOKIE_NAME_CART, createdCart.id, {
      httpOnly: true,
      secure: true,
    });
  }

  if (findCart) {
  }
  console.log("Hej");
};

export const getCartFromCookie = async () => {
  const cartId = cookies().get(COOKIE_NAME_CART)?.value;
  if (cartId) {
    const cart = await getCart({ id: cartId });
    return cart;
  }
};
