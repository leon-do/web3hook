import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import Stripe from "stripe";
import { buffer } from "micro";

const prisma = new PrismaClient();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, { apiVersion: "2022-11-15" });

type Data = {
  status: boolean;
};

// stripe needs raw reqest body
export const config = { api: { bodyParser: false } };

// https://egghead.io/lessons/next-js-subscribe-to-stripe-webhooks-using-next-js-api-routes
export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  try {
    console.log("/stripe/hook");
    const sig = req.headers["stripe-signature"];
    if (!sig) return res.status(401).send({ status: false });
    // https://github.com/dijonmusters/build-a-saas-with-next-js-supabase-and-stripe/blob/master/21-subscribe-to-stripe-webhooks-using-next-js-api-routes/pages/api/stripe-hooks.js
    const event: any = stripe.webhooks.constructEvent(await buffer(req), sig, process.env.STRIPE_WEBHOOK_SECRET_KEY as string);
    if (event.type === "checkout.session.completed") await handleCheckoutSessionCompleted(event);
    return res.status(200).send({ status: true });
  } catch (error) {
    console.error(error);
    return res.status(400).send({ status: false });
  }
}

// update stripe id to database
async function handleCheckoutSessionCompleted(_event: any): Promise<void> {
  const subscription = await stripe.subscriptions.retrieve(_event.data.object.subscription);
  await prisma.user.update({
    where: { id: _event.data.object.client_reference_id },
    data: { stripe: subscription.items.data[0].id },
  });
}
