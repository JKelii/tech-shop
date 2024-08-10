"use server";

import {
  createCartAuthorized,
  createCartUnAuthorized,
  deleteCartProduct,
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

export const removeFromCart = async ({ product }: CheckCartParams) => {
  const cartCookie = cookies().get(COOKIE_NAME_CART);
  if (!cartCookie) return null;

  const cartId = cartCookie.value;
  const cart = await getCart({ id: cartId });

  if (!cart) return null;

  const productToRemove = cart.find(({ slug }) => slug === product.slug);

  if (productToRemove) {
    await deleteCartProduct({ cartProductId: productToRemove.id });
    const updatedCart = await getCart({ id: cartId });

    if (!updatedCart || updatedCart.length === 0) {
      cookies().delete(COOKIE_NAME_CART);
      return [];
    } else {
      return updatedCart;
    }
  }
};

export const updateCartQuantity = async ({ product }: CheckCartParams) => {
  const cartCookie = cookies().get(COOKIE_NAME_CART);
  if (!cartCookie) return;

  const cartId = cartCookie.value;
  const cart = await getCart({ id: cartId });

  if (!cart) return;

  const productToUpdate = cart.find(({ slug }) => slug === product.slug);

  if (productToUpdate) {
    await updateCartProduct({
      quantity: product.quantity,
      cartProductId: productToUpdate.id,
    });
  }
};
