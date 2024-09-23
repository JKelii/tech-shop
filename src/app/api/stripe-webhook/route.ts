import { updateOrder } from "@/actions/order";
import { OrderType } from "@/components/pages/Account/OrdersList";
import { getOrders } from "@/lib";
import { OrderStatus } from "@/lib/hygraph/generated/graphql";
import { getEnv } from "@/utils";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const secretStripeWebhook = getEnv(process.env.SECRET_WEBHOOK);
export const handler = async (req: NextRequest) => {
  const payload = await req.text();
  const sig = req.headers.get("stripe-signature");
  try {
    const stripe = new Stripe(getEnv(process.env.STRIPE_SECRET_KEY), {
      apiVersion: "2024-06-20",
    });
    if (typeof sig !== "string") {
      throw new Error("Signature is not a string!");
    }
    const event = stripe.webhooks.constructEvent(
      payload,
      sig,
      secretStripeWebhook
    );
    await eventStripeWebhook(event);
    NextResponse.json({ status: 200 });
  } catch (error) {
    if (error instanceof Error)
      NextResponse.json({ message: `Webhook Error ${error.message}` });
  }
};

export { handler as POST };

const eventStripeWebhook = async (event: Stripe.Event) => {
  const orders = await getOrders();
  if (Array.isArray(orders)) {
    const orderedId = orders.find(
      (item: OrderType) => item.stripeCheckoutId === event.id
    );
    const type = event.type;
    switch (type) {
      case "charge.succeeded":
        if (event.id) {
          console.log(event.id);
          if (orderedId) {
            const order = await updateOrder(orderedId.stripeCheckoutId, "paid");
            if (order) {
              console.log("order is paid");
            }
            break;
          }
        }
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
  }
};
