import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProductArt } from "@/components/product-art";

export const metadata: Metadata = { title: "Find Your Message", description: "Find the Speechless collection that matches how you want to show up." };

const routes = [
  { title: "For me", prompt: "I want a design chosen from the wearer’s point of view.", href: "/collections/for-me", slug: "im-nonverbal-still-communicating-tee", tone: "blue" },
  { title: "For someone I love", prompt: "I want to show support without speaking over someone.", href: "/collections/family-caregivers", slug: "different-communication-same-respect-tee", tone: "orange" },
  { title: "For the community", prompt: "I want a broader reminder about communication.", href: "/collections/community-allies", slug: "speech-isnt-the-only-way-tee", tone: "yellow" },
];

export default function FindMessagePage() {
  return (
    <section className="sl-message-finder shell shell--wide">
      <header><p className="sl-kicker">Find your message</p><h1>How do you want<br />to show up?</h1><p>Choose the direction that feels most like you. No quiz, diagnosis, or personal information required.</p></header>
      <div className="sl-message-finder__grid">{routes.map((route, index) => <Link href={route.href} className={`sl-message-choice sl-message-choice--${route.tone}`} key={route.title}><span>0{index + 1}</span><div className="sl-message-choice__art"><ProductArt slug={route.slug} compact /></div><div><p>{route.prompt}</p><h2>{route.title}</h2><strong>See the collection <ArrowRight size={16} /></strong></div></Link>)}</div>
    </section>
  );
}
