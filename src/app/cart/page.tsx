import type { Metadata } from "next";
import { CartPage } from "@/components/cart-page";
import { brand } from "@/config/brand";
export const metadata: Metadata = { title: "Saved designs", description: `Review the ${brand.name} designs you saved for launch.` };
export default function Page() { return <CartPage />; }
