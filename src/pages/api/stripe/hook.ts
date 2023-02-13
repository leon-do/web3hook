import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import Stripe from "stripe";
import { buffer } from "micro";

const prisma = new PrismaClient();

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
    if (!sig) return res.status(400).send({ status: false });
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, { apiVersion: "2022-11-15" });
    // https://github.com/dijonmusters/build-a-saas-with-next-js-supabase-and-stripe/blob/master/21-subscribe-to-stripe-webhooks-using-next-js-api-routes/pages/api/stripe-hooks.js
    const event: any = stripe.webhooks.constructEvent(await buffer(req), sig, process.env.STRIPE_WEBHOOK_SECRET_KEY as string);
    if (event.type !== "checkout.session.completed") return res.status(400).send({ status: false });
    // get subscription
    const subscription = await stripe.subscriptions.retrieve(event.data.object.subscription);
    await prisma.user.update({
      where: { id: event.data.object.client_reference_id },
      data: { stripe: subscription.items.data[0].id },
    });
    return res.status(200).send({ status: true });
  } catch (error) {
    console.error(error);
    return res.status(400).send({ status: false });
  }
}
