import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProductArt } from "@/components/product-art";
import { brand } from "@/config/brand";

export const metadata: Metadata = {
  title: "Our Story",
  description: `${brand.name} began with Tommy—and a family’s hope for more understanding in everyday moments.`,
};

export default function StoryPage() {
  return (
    <>
      <section className="sl-story-hero sl-story-hero--authentic">
        <div className="sl-story-hero__copy">
          <p className="sl-kicker">The beginning</p>
          <h1>This started<br />with <em>Tommy.</em></h1>
          <p>Tommy has nonverbal autism. He loves people and being part of his community. Speechless began with his family’s hope that a little more understanding could make everyday moments better.</p>
        </div>
        <div className="sl-story-hero__photo-reserve" role="img" aria-label="Reserved space for a founder-approved photograph of Tommy or his family">
          <span>Authentic story</span>
          <strong>Family image<br />reserved.</strong>
          <small>Added only with approval from Tommy’s family</small>
        </div>
      </section>

      <section className="sl-story-origin shell shell--wide">
        <div className="sl-story-origin__mark"><span>01</span><small>WHY IT<br />BEGAN</small></div>
        <div>
          <p className="sl-kicker">The practical hope</p>
          <h2>Not a label.<br />A little more context.</h2>
        </div>
        <div className="sl-story-origin__body">
          <p>Because autism is not always visible, people can misread a different way of responding. Those quick assumptions can make ordinary community moments harder than they need to be.</p>
          <p>Speechless is exploring modern graphic apparel that can offer context—for the person choosing to wear it, for a caregiver beside them, or for someone who wants to support a more patient community.</p>
          <p>The goal is not to explain a person to the world. It is to make a little more room for communication beyond speech.</p>
        </div>
      </section>

      <section className="sl-story-manifesto">
        <p>Our starting point</p>
        <blockquote>Nonverbal.<br /><em>Still communicating.</em></blockquote>
      </section>

      <section className="sl-story-future shell shell--wide">
        <div className="sl-story-future__art"><ProductArt slug="more-than-words-tee" /></div>
        <div className="sl-story-future__copy">
          <p className="sl-kicker">What comes next</p>
          <h2>Four concepts.<br />Then real samples.</h2>
          <p>The first edit focuses on four adult graphic tees with distinct messages and placements. Children’s sizing can follow only after garments, fit, print quality, and real-world feedback are ready.</p>
          <p>Amber and the founding team will approve the language, select suppliers, test samples, set policies, and decide how Tommy’s story is shared. This preview gives those decisions something concrete to react to.</p>
          <div className="sl-actions"><Link href="/shop" className="sl-button sl-button--ink">Review the four designs <ArrowRight size={17} /></Link><Link href="/our-approach" className="sl-button sl-button--text">Read the principles</Link></div>
        </div>
      </section>
    </>
  );
}
