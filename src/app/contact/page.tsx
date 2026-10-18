import type { Metadata } from "next";
import { Mail, MessageCircle, Store } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { brand } from "@/config/brand";
export const metadata: Metadata = { title: "Contact", description: `Contact the ${brand.name} prelaunch team.` };
export default function ContactPage() {
  return <section className="contact-page shell shell--wide"><div className="contact-page__intro"><p className="eyebrow">Contact</p><h1>Let&apos;s begin a<br /><em>conversation.</em></h1><p>Questions, accessibility feedback, partnership ideas, and thoughtful notes are welcome. This preview does not yet use an email delivery provider.</p><div className="contact-methods"><article><MessageCircle /><div><strong>General questions</strong><span>Products, launch plans, and the wider idea.</span></div></article><article><Store /><div><strong>Retail & partnerships</strong><span>For future wholesale or creative collaboration.</span></div></article><article><Mail /><div><strong>Response status</strong><span>Messages are stored only when the database is connected.</span></div></article></div></div><div className="contact-page__form"><ContactForm /></div></section>;
}
