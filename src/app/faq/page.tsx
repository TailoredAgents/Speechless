import type { Metadata } from "next";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { brand } from "@/config/brand";

export const metadata: Metadata = { title: "Frequently Asked Questions", description: `Answers about ${brand.name}, the founding collection, language, and launch.` };

const groups = [
  { title: "The idea", items: [
    ["Who is Speechless for?", "The website and brand are for everyone. The first products are adult graphic tees imagined for nonverbal autistic people, caregivers, family, friends, and community allies."],
    ["Why the name Speechless?", "It represents people who do not use speech—or use very little speech—to communicate. The brand’s point of view is that speechlessness is never voicelessness."],
    ["Is this a children’s clothing brand?", "Not exclusively. The intended starting point is adult sizing. Children’s sizing can follow after the team approves garments, fit, print quality, and the role each design should play."],
    ["Is the clothing a medical or safety product?", "No. It is awareness apparel, not medical identification, therapy, or a safety device. Wearing any message should always be a personal or family choice."],
  ] },
  { title: "The founding collection", items: [
    ["Can I purchase these shirts now?", "Not yet. The founding collection is in development. Save the designs you love and join the first-drop list to hear when ordering opens."],
    ["Are the designs final?", "The four founding graphics establish the creative direction. Garment blanks, final sizing, pricing, and production details will be confirmed before ordering opens."],
    ["Are the campaign images real customers?", "The current campaign imagery presents the creative direction. Future releases will introduce approved product photography and community stories with permission."],
    ["When will pricing be announced?", "Pricing will be shared after garments, printing, packaging, fees, and shipping costs are confirmed."],
  ] },
  { title: "Language & launch", items: [
    ["Why does the brand use ‘nonverbal’?", "Some people and families use ‘nonverbal’ to describe their communication experience. Individual autistic people may prefer different language, and Speechless should always respect personal preference."],
    ["Does the brand speak for every autistic person?", "No. Autism and communication are deeply individual. Speechless should avoid universal claims and keep making room for autistic and nonverbal people to shape the language and products."],
    ["What has to happen before launch?", "Approve the brand direction, select and test shirt blanks, finalize graphics, calculate pricing, photograph samples, write fulfillment and return policies, connect payments, and complete business and trademark review."],
    ["How can I share feedback?", "Use the contact page to send a note about the brand, designs, accessibility, or a potential collaboration. Feedback from the communities closest to this mission matters."],
  ] },
] as const;

export default function FaqPage() {
  return (
    <section className="faq-page shell">
      <div className="faq-heading"><p className="sl-kicker">Questions, answered honestly</p><h1>What to know<br /><em>before launch.</em></h1><p>The vision is clear, the first collection is taking shape, and thoughtful details still matter.</p></div>
      <div className="faq-groups">{groups.map((group) => <section key={group.title}><h2>{group.title}</h2><div>{group.items.map(([question, answer]) => <details key={question}><summary>{question}<ChevronDown size={18} /></summary><p>{answer}</p></details>)}</div></section>)}</div>
      <div className="faq-contact"><h2>Help shape what comes next.</h2><p>Have a perspective, product idea, accessibility note, or question the team should consider?</p><Link href="/contact" className="sl-button sl-button--ink">Send a note</Link></div>
    </section>
  );
}
