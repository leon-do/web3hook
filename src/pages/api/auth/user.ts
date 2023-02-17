import type { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "./[...nextauth]";
import { getServerSession } from "next-auth/next";
import { PrismaClient } from "@prisma/client";
import Stripe from "stripe";
import getTotalUsage from "@/utils/getTotalUsage";

const prisma = new PrismaClient();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, { apiVersion: "2022-11-15" });

type User = {
  apiKey: string;
  credits: number;
  paid: boolean | null; // true = has credit card, false = no credit card, null = has not checkout out
};

// Gets user data for /dashboard page
export default async function handler(req: NextApiRequest, res: NextApiResponse<User>) {
  try {
    console.log("/auth/user");
    const session = await getServerSession(req, res, authOptions);
    if (!session) return res.status(401).json({ apiKey: "", credits: 0, paid: false });
    const user = await prisma.user.findUnique({
      where: {
        email: session.user?.email as string,
      },
    });
    if (!user) return res.status(401).json({ apiKey: "", credits: 0, paid: false });
    // if no stripe checkout, return paid = null
    if (!user.stripe) return res.status(200).json({ apiKey: user.apiKey, credits: 0, paid: null });
    const subscriptionItem = await stripe.subscriptionItems.retrieve(user.stripe);
    const subscription: any = await stripe.subscriptions.retrieve(subscriptionItem.subscription);
    // if subscription is not active, return paid = null
    if (subscription.status !== "active") return res.status(200).json({ apiKey: user.apiKey, credits: 0, paid: null });
    return res.status(200).json({
      apiKey: user.apiKey,
      credits: await getTotalUsage(user.stripe),
      paid: subscription.default_payment_method ? true : false, // has credit card on file
    });
  } catch (error) {
    console.error(error);
    return res.status(401).json({ apiKey: "", credits: 0, paid: false });
  }
}
