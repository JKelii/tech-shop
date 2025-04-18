"use server";

import { cookies } from "next/headers";

import {
  createCart,
  createCartProduct,
  deleteCartProduct,
  getCart,
  updateCartProduct,
} from "@/lib";

const COOKIE_NAME_CART = "cart";

export type ManageCartParams = {
  productId: string;
  product: {
    slug: string;
    size: string;
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
    size: string;
    slug: string;
    quantity: number;
  };
}) => {
  const findCart = (await cookies()).get(COOKIE_NAME_CART);

  if (!findCart) {
    const createdCart = await createCart({ ...product, email });

    if (!createdCart) {
      return { error: "Can't create cart" };
    }

    (await cookies()).set(COOKIE_NAME_CART, createdCart.id, {
      httpOnly: true,
      secure: true,
    });
    return { message: "Product added to cart" };
  }

  const cart = await getCart({ id: findCart.value });

  if (!cart) {
    (await cookies()).delete(COOKIE_NAME_CART);
    return { error: "Can't find cart" };
  }

  const updateProduct = cart.find(
    ({ slug, size }) => slug === product.slug && size === product.size,
  );
  const cartProductId = updateProduct?.id;

  if (!updateProduct) {
    await createCartProduct({
      size: product.size,
      cartId: findCart.value,
      quantity: product.quantity,
      slug: product.slug,
    });
    return { message: "Product added to cart" };
  } else if (updateProduct) {
    if (cartProductId) {
      await updateCartProduct({
        quantity: product.quantity + updateProduct.quantity,
        cartProductId: cartProductId,
        size: product.size,
      });
    }
  }

  return { message: "Product quantity updated in cart" };
};

export const getCartFromCookie = async () => {
  const cartId = (await cookies()).get(COOKIE_NAME_CART)?.value;
  if (cartId) {
    const cart = await getCart({ id: cartId });
    return cart;
  }
};
export const removeFromCart = async (productId: string) => {
  const cartCookie = (await cookies()).get(COOKIE_NAME_CART);
  if (!cartCookie) return null;

  const cartId = cartCookie.value;
  const cart = await getCart({ id: cartId });

  if (!cart) return null;

  const productToRemove = productId;

  if (productToRemove) {
    await deleteCartProduct({ cartProductId: productId });
    const updatedCart = await getCart({ id: cartId });

    if (!updatedCart || updatedCart.length === 0) {
      (await cookies()).delete(COOKIE_NAME_CART);
      return [];
    } else {
      return updatedCart;
    }
  }
};
