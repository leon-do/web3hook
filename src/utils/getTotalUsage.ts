import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, { apiVersion: "2022-11-15" });

// Get total usage aka credits for a subscription 
export default async function getTotalUsage(_subscriptionId: string): Promise<number> {
  const usage = await stripe.subscriptionItems.listUsageRecordSummaries(_subscriptionId);
  return usage.data[0].total_usage;
}
