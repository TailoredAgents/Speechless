import type { Metadata } from "next";
import { DemoCheckout } from "@/components/demo-checkout";

export const metadata: Metadata = {
  title: "Checkout preview",
  description: "Experience the private Speechless founder-preview checkout.",
};

export default function CheckoutPage() {
  return <DemoCheckout />;
}
