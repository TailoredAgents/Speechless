import type { Metadata } from "next";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { brand } from "@/config/brand";

export const metadata: Metadata = { title: "Frequently Asked Questions", description: `Answers about the ${brand.name} founder preview, apparel direction, language, and launch.` };

const groups = [
  { title: "The idea", items: [
    ["Who is Speechless for?", "The website and brand are for everyone. The first products are adult graphic tees imagined for nonverbal autistic people, caregivers, family, friends, and community allies."],
    ["Why the name Speechless?", "It represents people who do not use speech—or use very little speech—to communicate. The brand’s point of view is that speechlessness is never voicelessness."],
    ["Is this a children’s clothing brand?", "Not exclusively. The intended starting point is adult sizing. Children’s sizing can follow after the team approves garments, fit, print quality, and the role each design should play."],
    ["Is the clothing a medical or safety product?", "No. It is awareness apparel, not medical identification, therapy, or a safety device. Wearing any message should always be a personal or family choice."],
  ] },
  { title: "The founder preview", items: [
    ["Can I purchase these shirts now?", "Not yet. This is a private founder preview designed to make the business feel real and help the team make decisions. The bag and checkout are demonstrations only."],
    ["Are the designs final?", "No. The names, graphics, colors, prices, garment blanks, sizing, photography, inventory, and policies are polished mock directions for Amber and the founding team to review."],
    ["Are the campaign images real customers?", "No. They are original concept visuals created for this presentation. Approved brand photography and real product samples should replace them before a public launch."],
    ["Why show prices if the shirts are not ready?", "Mock pricing makes the storefront and checkout journey tangible. Final retail prices should be set only after garment, printing, packaging, fee, and shipping costs are known."],
  ] },
  { title: "Language & launch", items: [
    ["Why does the brand use ‘nonverbal’?", "Tommy’s family uses ‘nonverbal,’ so that is the language this founder preview follows. Individual autistic people and families may describe communication differently, and the brand should respect personal preference."],
    ["Does the brand speak for every autistic person?", "No. Autism and communication are deeply individual. Speechless should avoid universal claims and keep making room for autistic and nonverbal people to shape the language and products."],
    ["What has to happen before launch?", "Approve the brand direction, select and test shirt blanks, finalize graphics, calculate pricing, photograph samples, write fulfillment and return policies, connect payments, and complete business and trademark review."],
    ["How can I share feedback?", "Use the contact page to send a note about the brand, designs, accessibility, or a potential collaboration. Feedback from the communities closest to this mission matters."],
  ] },
] as const;

export default function FaqPage() {
  return (
    <section className="faq-page shell">
      <div className="faq-heading"><p className="sl-kicker">Questions, answered honestly</p><h1>What to know<br /><em>before launch.</em></h1><p>The vision is real. The products are still being built. This page keeps that difference clear.</p></div>
      <div className="faq-groups">{groups.map((group) => <section key={group.title}><h2>{group.title}</h2><div>{group.items.map(([question, answer]) => <details key={question}><summary>{question}<ChevronDown size={18} /></summary><p>{answer}</p></details>)}</div></section>)}</div>
      <div className="faq-contact"><h2>Help shape what comes next.</h2><p>Have a perspective, product idea, accessibility note, or question the team should consider?</p><Link href="/contact" className="sl-button sl-button--ink">Send a note</Link></div>
    </section>
  );
}
