import Stripe from "stripe";
import { NextResponse, NextRequest } from "next/server";
import { env, getEnv } from "@/utils";

const stripe = new Stripe(getEnv(process.env.STRIPE_SECRET_KEY));

export const POST = async (req: NextRequest, res: NextResponse) => {
  const payload = await req.text();
  const response = JSON.parse(payload);

  const sig = req.headers.get("Stripe-Signature");

  const dateTime = new Date(response.create * 1000).toLocaleDateString();
  const timeString = new Date(response.create * 1000).toLocaleDateString();

  try {
    let event = stripe.webhooks.constructEvent(
      payload,
      sig!,
      getEnv(process.env.STRIPE_WEBHOOK_SECRET)
    );

    console.log("event", event.type);
    return NextResponse.json({ status: "Success", event: event.type });
  } catch (error) {
    return NextResponse.json({ status: "Failed", error });
  }
};
