import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = { title: "Saved designs", robots: { index: false, follow: false } };

export default function CheckoutPage() {
  redirect("/cart");
}
