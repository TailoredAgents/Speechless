import type { Metadata } from "next";
import { brand } from "@/config/brand";

export const metadata: Metadata = { title: "Terms of Use", description: `Terms for using the ${brand.name} prelaunch website.` };

export default function TermsPage() {
  return <article className="policy-page shell"><header><p className="eyebrow">{brand.name}</p><h1>Terms of use</h1><p>Prelaunch terms — October 18, 2026</p></header><div className="policy-page__body">
    <h2>Prelaunch availability</h2><p>The founding collection is not currently available to order. Saving a design or joining the first-drop list does not create a purchase, reserve inventory, or guarantee future availability or pricing.</p>
    <h2>Product information</h2><p>Final garments, colors, materials, sizing, prices, production methods, and availability will be confirmed before ordering opens. Campaign imagery presents the intended creative direction.</p>
    <h2>No medical claims</h2><p>The apparel and website do not provide medical advice, diagnosis, treatment, identification, or a safety service. No garment can communicate every person&apos;s needs or replace accessible communication and individual support.</p>
    <h2>Saved designs</h2><p>Saved selections remain on your device and are provided as a convenience while you explore the collection. They can be removed at any time.</p>
    <h2>Acceptable use</h2><p>Do not interfere with the website, attempt unauthorized access, submit unlawful or abusive content, or use automated means that materially degrade the service.</p>
    <h2>Creative ownership</h2><p>Website copy, graphics, product artwork, photography, and brand materials may not be reproduced or redistributed without permission.</p>
    <h2>Changes</h2><p>The collection and website may evolve before ordering opens. Final commerce, shipping, return, and customer-service terms will be published before the first sale.</p>
  </div></article>;
}
