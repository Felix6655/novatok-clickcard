import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-01-28.clover",
});

export async function POST(req: Request) {
  function validateSupabaseUrl(url: string | undefined): string {
    if (!url) {
      throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL env variable.");
    }
    if (!/^https?:\/\//.test(url)) {
      throw new Error("Invalid NEXT_PUBLIC_SUPABASE_URL: Must be a valid HTTP or HTTPS URL.");
    }
    return url;
  }
  function validateSupabaseAnonKey(key: string | undefined): string {
    if (!key) {
      throw new Error("Missing NEXT_PUBLIC_SUPABASE_ANON_KEY env variable.");
    }
    return key;
  }
  const supabase = createClient(
    validateSupabaseUrl(process.env.NEXT_PUBLIC_SUPABASE_URL),
    validateSupabaseAnonKey(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
  );

  // Get logged-in user (requires auth session)
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    return new Response(`Auth error: ${error.message}`, { status: 401 });
  }

  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  // Create Stripe subscription checkout session
  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    client_reference_id: user.id,
    customer_email: user.email ?? undefined,
    line_items: [
      {
        price: process.env.STRIPE_PRICE_ID!,
        quantity: 1,
      },
    ],
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/cancel`,
  });

  return Response.json({ url: session.url });
}