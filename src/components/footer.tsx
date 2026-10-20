import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { LaunchForm } from "@/components/launch-form";
import { Wordmark } from "@/components/wordmark";
import { brand } from "@/config/brand";

const footerLinks = [
  {
    title: "Explore",
    links: [
      ["Shop all tees", "/shop"],
      ["For Me", "/collections/for-me"],
      ["For Someone I Love", "/collections/family-caregivers"],
      ["Community & Allies", "/collections/community-allies"],
    ],
  },
  {
    title: "About",
    links: [
      ["Why Speechless", "/our-approach"],
      ["Find Your Tee", "/comfort-finder"],
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
    ],
  },
];

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell shell--wide site-footer__main">
        <div className="site-footer__brand">
          <Wordmark inverted />
          <p>Graphic tees with bold messages, easy energy, and more than one way to communicate.</p>
          <span>New designs are on the way. Get the first look.</span>
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
        <div className="site-footer__signup"><p className="sl-kicker">Get the first look</p><h2>New tees.<br />Fresh ideas.</h2><LaunchForm compact source="footer" idPrefix="footer" /><small>Occasional product updates. That&apos;s it.</small></div>
        <Link href="/contact" className="footer-contact"><span>Have a question?</span>Let&apos;s talk <ArrowUpRight size={22} /></Link>
      </div>
      <div className="shell shell--wide site-footer__bottom">
        <span>© {new Date().getFullYear()} {brand.name}</span>
        <span>Made to be worn your way</span>
        <span>Speech is one way to communicate. Never the only way.</span>
      </div>
    </footer>
  );
}
