import { updateOrder } from "@/actions/order";
import Orders from "@/app/account/orders/page";
import { getEnv } from "@/utils";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const secretStripeWebhook = getEnv(process.env.SECRET_WEBHOOK);

export const config = {
  api: {},
};

const handler = async (req: NextRequest, res: NextResponse) => {
  const payload = await req.text();
  const response = JSON.parse(payload);
  const sig = req.headers.get("Stripe-Signature");

  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
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

    return NextResponse.json({ status: 200, event: event.type });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: `Webhook Error: ${error.message}` });
    }
  }
};

export { handler as POST };

const eventStripeWebhook = async (event: Stripe.Event) => {
  const type = event.type;

  try {
    switch (type) {
      case "checkout.session.completed":
        const session = event.data.object as Stripe.Checkout.Session;
        console.log("Checkout session completed:", session);

        if (event.id) {
          console.log("Event ID:", event.id);

          const order = await updateOrder("paid", session.id);
          console.log(session.id);
          console.log(order);
          if (order) {
            console.log("Order paid successfully:", order);
          } else {
            console.log("Order update failed or order not found.");
          }
        }
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }
  } catch (error) {
    console.error(`Error handling event ${type}:`, error);
  }
};
