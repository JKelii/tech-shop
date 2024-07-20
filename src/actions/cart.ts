"use server";

import {
  createCartAuthorized,
  createCartUnAuthorized,
  getCart,
  updateCartProduct,
} from "@/lib";
import { cookies } from "next/headers";

const COOKIE_NAME_CART = "cart";

type CheckCartParams = {
  product: {
    slug: string;
    quantity: number;
  };
  email?: string;
};

export const checkCart = async ({ product, email }: CheckCartParams) => {
  const findCart = cookies().get(COOKIE_NAME_CART);
  if (!findCart) {
    const createdCart = email
      ? await createCartAuthorized({ ...product, email })
      : await createCartUnAuthorized(product);

    if (!createdCart) return;
    cookies().set(COOKIE_NAME_CART, createdCart.id, {
      httpOnly: true,
      secure: true,
    });
  }

  if (findCart) {
    const cart = await getCart({ id: findCart.value });
    if (!cart) {
      return;
    }
    const updateProduct = cart.find(({ slug }) => slug === product.slug);
    if (updateProduct) {
      updateCartProduct({
        quantity: product.quantity + updateProduct.quantity,
        cartProductId: updateProduct.id,
      });
    }
  }
};

export const getCartFromCookie = async () => {
  const cartId = cookies().get(COOKIE_NAME_CART)?.value;
  console.log(cartId);
  if (cartId) {
    const cart = await getCart({ id: cartId });
    console.log(cart);
    return cart;
  }
};
