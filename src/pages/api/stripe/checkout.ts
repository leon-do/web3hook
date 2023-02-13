import type { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "../auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import { PrismaClient } from "@prisma/client";
import absoluteUrl from "next-absolute-url";
import Stripe from "stripe";

const prisma = new PrismaClient();

type ErrorResponse = {
  error: string;
};

// https://egghead.io/lessons/next-js-charge-customer-for-stripe-subscription-in-next-js
export default async function handler(req: NextApiRequest, res: NextApiResponse<Stripe.Checkout.Session | ErrorResponse>) {
  try {
    console.log("/stripe/checkout");
    const session = await getServerSession(req, res, authOptions);
    if (!session) return res.status(401).json({ error: "Unauthorized Session" });
    if (!session.user?.email) return res.status(401).json({ error: "Unauthorized Email" });
    const user = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user) return res.status(401).json({ error: "Unauthorized User" });
    // https://user-images.githubusercontent.com/19412160/218244860-6fdb20a2-12b3-49d8-9147-2ae904872e3d.png
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, { apiVersion: "2022-11-15" });
    const checkout: Stripe.Checkout.Session = await stripe.checkout.sessions.create({
      client_reference_id: user.id,
      customer_email: user.email || undefined,
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [{ price: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID as string }],
      success_url: `${absoluteUrl(req).protocol}//${absoluteUrl(req).host}/checkout`,
      cancel_url: `${absoluteUrl(req).protocol}//${absoluteUrl(req).host}/`,
      payment_method_collection: req.query.payment_method_collection === "always" ? "always" : "if_required", // 'always' or 'if_required'
    });
    res.status(200).json(checkout);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Checkout Error" });
  }
}
