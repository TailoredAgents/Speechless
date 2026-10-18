import type { Metadata } from "next";
import { CartPage } from "@/components/cart-page";
import { brand } from "@/config/brand";
export const metadata: Metadata = { title: "Shopping bag", description: `Review your ${brand.name} founder-preview selections.` };
export default function Page() { return <CartPage />; }
