import { useEffect } from "react";
import Stripe from "stripe";
import Loading from "../components/Loading";
import { loadStripe } from "@stripe/stripe-js";

type User = {
  apiKey: string;
  credits: number;
  paid: boolean | null;
};

// route between /dashboard or stripe checkout based on user status
export default function Checkout() {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const paymentMethod = urlParams.get("payment_method_collection");
    console.log(paymentMethod)
    fetch("/api/auth/user")
      .then((res) => res.json())
      .then((user: User) => {
        console.log(user.paid, paymentMethod)
        if (user.paid === true) window.location.href = "/dashboard";
        if (user.paid === null) checkout(paymentMethod);
        if (user.paid === false && paymentMethod) checkout(paymentMethod);
        if (user.paid === false && !paymentMethod) window.location.href = "/dashboard";
      });
  }, []);

  // go to stripe checkout
  async function checkout(_params: string | null) {
    const url = _params ? `/api/stripe/checkout?payment_method_collection=${_params}` : "/api/stripe/checkout";
    const checkout: Stripe.Checkout.Session = await fetch(url).then((res) => res.json());
    if ((checkout as any).error) return console.error((checkout as any).error);
    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
    const { error } = await stripe!.redirectToCheckout({ sessionId: checkout.id });
    if (error) window.location.href = "/";
  }

  return <Loading />;
}
