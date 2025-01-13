import { NextResponse } from "next/server";
import Stripe from "stripe";

import { updateOrder } from "@/actions/order";
import { getEnv } from "@/utils";

import type { NextRequest } from "next/server";
import { getOrders } from "@/lib";
import type { OrderType } from "@/components/pages/Account/OrdersList";

const secretStripeWebhook = getEnv(process.env.SECRET_WEBHOOK);

const handler = async (req: NextRequest) => {
  const payload = await req.text();
  const sig = req.headers.get("Stripe-Signature");

  try {
    const stripe = new Stripe(getEnv(process.env.STRIPE_KEY), {
      apiVersion: "2024-06-20",
    });

    if (typeof sig !== "string") {
      throw new Error("Signature is not a string!");
    }

    const event = stripe.webhooks.constructEvent(
      payload,
      sig,
      secretStripeWebhook,
    );

    await eventStripeWebhook(event);

    return NextResponse.json({ status: 200, event: event.type });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: `Webhook Error: ${error.message}` });
    }
  }
};

export { handler as POST };

const eventStripeWebhook = async (event: Stripe.Event) => {
  const orders = await getOrders();
  if (Array.isArray(orders)) {
    const orderedId = orders.find(
      (item: OrderType) => item.stripeCheckoutId === event.id,
    );
    const type = event.type;
    switch (type) {
      case "charge.succeeded":
        if (event.id) {
          if (orderedId) {
            const order = await updateOrder(orderedId.stripeCheckoutId, "paid");
            if (order) {
            }
            break;
          }
        }
      default:
        throw Error(`Unhandled event type ${event.type}`);
    }
  }
};
