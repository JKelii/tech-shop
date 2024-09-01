"use server";

import { getCart } from "@/lib";
import { getEnv } from "@/utils";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Stripe } from "stripe";

const stripeClient = new Stripe(getEnv(process.env.STRIPE_KEY), {
  apiVersion: "2024-06-20",
});

export const createOrder = async () => {
  const cartId = cookies().get("cart")?.value;
  if (!cartId) {
    return { error: "Cart not found" };
  }

  const cart = await getCart({ id: cartId });
  if (!cart) {
    return { error: "Can't find cart" };
  }

  const { url, id } = await stripeClient.checkout.sessions.create({
    payment_method_types: ["p24", "card"],
    mode: "payment",
    line_items: cart.map(({ quantity, ...product }) => ({
      quantity,
      price_data: {
        currency: "eur",
        unit_amount: product.price,
        product_data: {
          name: product.name,
          images: [product.image],
        },
      },
    })),
    currency: "eur",
    success_url: "http://localhost:3000",
  });
  if (!url) return { message: "Problem with creating order" };
  if (id) {
  }
  redirect(url);
};
