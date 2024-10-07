import { updateOrder } from "@/actions/order";
import { getEnv } from "@/utils";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const secretStripeWebhook = getEnv(process.env.SECRET_WEBHOOK);
const handler = async (req: NextRequest) => {
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

  return NextResponse.json({ status: "200" });
};

export { handler as POST };

const eventStripeWebhook = async (event: Stripe.Event) => {
  const type = event.type;
  switch (type) {
    case "charge.succeeded":
      console.log({ event });
      if (event.id) {
        const order = await updateOrder(event.id, "paid");
        if (order) {
          console.log("order is paid");
        }
        break;
      }
    default:
      console.log(`Unhandled event type ${event.type}`);
  }
};
