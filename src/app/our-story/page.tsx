import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Why Speechless",
  robots: { index: false, follow: false },
};

export default function StoryPage() {
  redirect("/our-approach");
}
