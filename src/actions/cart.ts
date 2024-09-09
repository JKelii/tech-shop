"use server";

import index from "@/app/pages";
import {
  createCart,
  createCartProduct,
  deleteCartProduct,
  getCart,
  updateCartProduct,
} from "@/lib";

import { cookies } from "next/headers";

const COOKIE_NAME_CART = "cart";

export type ManageCartParams = {
  productId: string;
  product: {
    slug: string;
    quantity: number;
  };
  email: string | undefined;
};

export const manageCart = async ({
  product,
  email,
}: {
  email: string | undefined;
  product: {
    slug: string;
    quantity: number;
  };
}) => {
  const findCart = cookies().get(COOKIE_NAME_CART);

  if (!findCart) {
    const createdCart = await createCart({ ...product, email });
    if (!createdCart) {
      return { error: "Can't create cart" };
    }

    cookies().set(COOKIE_NAME_CART, createdCart.id, {
      httpOnly: true,
      secure: true,
    });
    return { message: "Product added to cart" };
  }

  const cart = await getCart({ id: findCart.value });

  if (!cart) {
    cookies().delete(COOKIE_NAME_CART);
    return { error: "Can't find cart" };
  }

  const updateProduct = cart.find(({ slug }) => slug === product.slug);

  if (updateProduct) {
    updateCartProduct({
      quantity: product.quantity + updateProduct.quantity,
      cartProductId: updateProduct.id,
    });
    return { message: "Product added to cart" };
  }
  createCartProduct({
    cartId: findCart.value,
    quantity: product.quantity,
    slug: product.slug,
  });
  return { message: "Product added to cart" };
};

export const getCartFromCookie = async () => {
  const cartId = cookies().get(COOKIE_NAME_CART)?.value;
  if (cartId) {
    const cart = await getCart({ id: cartId });
    console.log(cart);
    return cart;
  }
};
export const removeFromCart = async (productId: string) => {
  const cartCookie = cookies().get(COOKIE_NAME_CART);
  if (!cartCookie) return null;

  const cartId = cartCookie.value;
  const cart = await getCart({ id: cartId });

  if (!cart) return null;

  const productToRemove = productId;

  if (productToRemove) {
    await deleteCartProduct({ cartProductId: productId });
    const updatedCart = await getCart({ id: cartId });

    if (!updatedCart || updatedCart.length === 0) {
      cookies().delete(COOKIE_NAME_CART);
      return [];
    } else {
      return updatedCart;
    }
  }
};

export const updateCartQuantity = async ({
  slug,
  quantity,
}: {
  slug: string;
  quantity: number;
}) => {
  const cartCookie = cookies().get(COOKIE_NAME_CART);
  if (!cartCookie) return;

  const cartId = cartCookie.value;
  const cart = await getCart({ id: cartId });

  if (!cart) return;

  const productToUpdate = cart.find(
    (product: { slug: string }) => product.slug === slug
  );

  if (productToUpdate) {
    await updateCartProduct({
      quantity: quantity,
      cartProductId: productToUpdate.id,
    });
  }
};
