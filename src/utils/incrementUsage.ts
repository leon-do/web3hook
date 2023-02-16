import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, { apiVersion: "2022-11-15" });

// https://stripe.com/docs/products-prices/pricing-models#reporting-usage
export default async function incrementUsage(_subscriptionId: string): Promise<Stripe.Response<Stripe.UsageRecord>> {
  const increment = await stripe.subscriptionItems.createUsageRecord(_subscriptionId, {
    quantity: 1,
    action: "increment",
  });
  return increment;
}
