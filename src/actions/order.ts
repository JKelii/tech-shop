"use server";

import { createOrderHygraph, getCart, updateOrderStatus } from "@/lib";
import { OrderStatus } from "@/lib/hygraph/generated/graphql";
import { getEnv } from "@/utils";
import { getServerSession } from "next-auth";
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
  const session = await getServerSession();
  const email = session?.user?.email;

  if (!url) return { message: "Problem with creating order" };
  if (id) {
    const orderId = await createOrderHygraph({
      email: email,
      stripeCheckoutId: id,
      orderStatus: OrderStatus.Created,
      total: cart.reduce((acc, curr) => acc + curr.price * curr.quantity, 0),
      orderItems: cart.map((item) => ({
        size: item.size,
        productId: item.productId,
        quantity: item.quantity,
        total: item.price * item.quantity,
      })),
    });

    if (orderId) {
      cookies().delete("cart");
      redirect(url);
    }
    if (!orderId) {
      return { error: "Can't create order" };
    }
  }
};

export const updateOrder = async (
  orderStatus: string,
  stripeCheckoutId: string
) => {
  const updatedOrder = await updateOrderStatus({
    stripeCheckoutId: stripeCheckoutId,
    orderStatus: orderStatus as OrderStatus,
  });

  if (updatedOrder) {
    return { message: "Order updated" };
  }

  return { error: "Failed to update order" };
};
