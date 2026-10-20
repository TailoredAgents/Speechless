import type { Metadata } from "next";
import { brand } from "@/config/brand";

export const metadata: Metadata = { title: "Privacy Notice", description: `Privacy information for the ${brand.name} prelaunch website.` };

export default function PrivacyPage() {
  return <Policy title="Privacy notice" updated="Prelaunch notice — October 18, 2026">
    <h2>Our current website</h2><p>{brand.name} is preparing its first collection. Ordering is not open yet.</p>
    <h2>Information you provide</h2><p>We store the email address you submit to the product-update list. If you use the contact form, we store your name, email address, selected topic, message, and consent so the team can respond.</p>
    <h2>First-party website activity</h2><p>We record limited first-party events such as page views, product views, contact submissions, and email-list signups. We do not use this website to collect medical information, create advertising profiles, or track you across unrelated websites.</p>
    <h2>Service providers</h2><p>Our hosting and database providers process the technical information needed to operate this website. Additional providers and terms will be added before commerce opens.</p>
    <h2>Email choices</h2><p>Joining the email list gives us permission to send relevant product and release updates. Every marketing message will include an unsubscribe option once email delivery begins.</p>
    <h2>Your choices</h2><p>You may use the contact form to ask about access, correction, or deletion of information you submitted.</p>
    <h2>Updates</h2><p>This notice will be updated with final business contact information, retention details, and any region-specific disclosures before public commerce opens.</p>
  </Policy>;
}

function Policy({ title, updated, children }: { title: string; updated: string; children: React.ReactNode }) {
  return <article className="policy-page shell"><header><p className="eyebrow">{brand.name}</p><h1>{title}</h1><p>{updated}</p></header><div className="policy-page__body">{children}</div></article>;
}
