import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock3, Eye, HeartHandshake, MessageCircleMore, ShieldCheck, Users } from "lucide-react";
import { brand } from "@/config/brand";

export const metadata: Metadata = {
  title: "Why Speechless",
  description: `The principles guiding ${brand.name}: dignity, patience, choice, and respect for every way people communicate.`,
};

const principles = [
  { icon: Eye, title: "Assume less", copy: "A person’s words, eye contact, movement, or response time never tell you the full story. Curiosity is kinder than a snap judgment." },
  { icon: Clock3, title: "Give it a beat", copy: "Communication can take time. A pause is not an absence; sometimes it is the space a person needs to respond in their own way." },
  { icon: MessageCircleMore, title: "Every method counts", copy: "AAC, gesture, movement, expression, behavior, typing, signing, pictures, and presence can all carry meaning." },
  { icon: ShieldCheck, title: "Choice comes first", copy: "No one should be required to disclose a disability. Every design should be worn by choice—not used as an involuntary label." },
  { icon: Users, title: "Community shapes it", copy: "The brand should keep listening to nonverbal people, autistic adults, families, and caregivers as products and language evolve." },
  { icon: HeartHandshake, title: "Awareness becomes action", copy: "A shirt can open a conversation. Real inclusion happens when people respond with patience, access, respect, and welcome." },
];

export default function ApproachPage() {
  return (
    <>
      <section className="sl-approach-hero">
        <div className="shell sl-approach-hero__inner">
          <p className="sl-kicker">Why Speechless</p>
          <h1>Listen beyond<br /><em>the expected.</em></h1>
          <p>Speechless is built on one idea: spoken words are only one part of communication. Understanding starts when we slow down enough to notice the rest.</p>
        </div>
      </section>
      <section className="sl-principles shell shell--wide">
        <div className="sl-heading"><div><p className="sl-kicker">The standard we set</p><h2>What we stand for.</h2></div><p>These principles should guide the messages, the products, and the way the brand shows up in the world.</p></div>
        <div className="sl-principle-grid">
          {principles.map((item, index) => <article key={item.title}><span>0{index + 1}</span><item.icon strokeWidth={1.4} /><h2>{item.title}</h2><p>{item.copy}</p></article>)}
        </div>
      </section>
      <section className="sl-boundary">
        <div className="shell sl-boundary__inner">
          <p className="sl-kicker">An important boundary</p>
          <h2>Apparel can offer context.<br />It should never reduce a person to a diagnosis.</h2>
          <p>Speechless clothing is not medical identification, a safety device, therapy, or a substitute for accessible communication. The wearer’s comfort, consent, dignity, and privacy come first.</p>
        </div>
      </section>
      <section className="sl-approach-cta">
        <p className="sl-kicker">Start a better conversation</p>
        <h2>Wear the message.<br />Live the meaning.</h2>
        <Link href="/shop" className="sl-button sl-button--cream">Explore the four designs <ArrowRight size={17} /></Link>
      </section>
    </>
  );
}
