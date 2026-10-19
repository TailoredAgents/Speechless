import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { LaunchForm } from "@/components/launch-form";
import { Wordmark } from "@/components/wordmark";
import { brand } from "@/config/brand";

const footerLinks = [
  {
    title: "Explore",
    links: [
      ["Founding drop", "/shop"],
      ["For Me", "/collections/for-me"],
      ["Family & Caregivers", "/collections/family-caregivers"],
      ["Community & Allies", "/collections/community-allies"],
    ],
  },
  {
    title: "About",
    links: [
      ["Why Speechless", "/our-approach"],
      ["Find Your Message", "/comfort-finder"],
      ["FAQ", "/faq"],
      ["Contact", "/contact"],
    ],
  },
  {
    title: "Support",
    links: [
      ["Sizing & fit", "/faq"],
      ["Shipping & returns", "/faq"],
      ["Privacy", "/privacy"],
      ["Terms", "/terms"],
      ["Saved designs", "/cart"],
    ],
  },
];

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell shell--wide site-footer__main">
        <div className="site-footer__brand">
          <Wordmark inverted />
          <p>Graphic apparel for more patience, more understanding, and every meaningful form of communication.</p>
          <span>The founding collection is in development. Join the list for first access.</span>
        </div>
        <div className="site-footer__links">
          {footerLinks.map((group) => (
            <div key={group.title}>
              <h3>{group.title}</h3>
              {group.links.map(([label, href]) => (
                <Link href={href} key={href}>{label}</Link>
              ))}
            </div>
          ))}
        </div>
        <div className="site-footer__signup"><p className="sl-kicker">Follow the first drop</p><h2>New designs.<br />Thoughtful updates.</h2><LaunchForm compact source="footer" idPrefix="footer" /><small>Occasional launch notes, sent with intention.</small></div>
        <Link href="/contact" className="footer-contact"><span>Have a question?</span>Let&apos;s talk <ArrowUpRight size={22} /></Link>
      </div>
      <div className="shell shell--wide site-footer__bottom">
        <span>© {new Date().getFullYear()} {brand.name}</span>
        <span>Made for more patient communities</span>
        <span>Speech is one way to communicate. Never the only way.</span>
      </div>
    </footer>
  );
}
