# Speechless

A founder-ready prelaunch storefront for an adult-first, word-forward autism awareness apparel brand.

The storefront presents four focused graphic T-shirt designs for nonverbal autistic people, caregivers, families, and community allies. Seven earlier directions remain preserved as unpublished drafts. It includes complete collection, product, saved-design, and first-drop signup journeys while remaining safely disconnected from payments and fulfillment.

## Preview status

- **This is a prelaunch storefront.** Visitors can explore the founding collection, save preferred designs and sizes, and join the first-drop list while commerce remains disabled.
- **Speechless is a working name.** Complete business-name and trademark review before public launch.
- **The site defaults to `noindex`.** Do not enable indexing before brand, product, and policy approval.
- **Checkout remains disabled.** Visitors can save designs locally, but the site does not request payment, reserve inventory, or create an order.
- **Campaign and garment images are original concept assets.** Replace them with approved samples and photography before commercial use.

## Local setup

Requirements: Node.js 22 and npm.

```bash
npm ci
npm run dev
```

Open the local URL printed by Next.js. Without `.env.local`, the storefront uses read-only fixture data and works without third-party accounts.

To open the local admin in read-only fixture mode, create `.env.local` from `.env.example` and set:

```env
SESSION_SECRET=replace-with-at-least-32-random-characters
ADMIN_EMAIL=owner@example.com
ADMIN_PASSWORD=replace-with-a-long-unique-password
```

Never commit `.env.local`.

## Database-backed development

Set `DATABASE_URL` to a disposable PostgreSQL database, then run:

```bash
npm run db:migrate
npm run db:seed
npm run dev
```

The idempotent seed creates three collections and eleven concept products: four published core designs and seven unpublished drafts. When PostgreSQL is connected, contact inquiries and first-party storefront events persist, the dashboard receives live data, and authorized product/collection writes are enabled.

## Quality commands

```bash
npm run typecheck
npm run lint
npm test
npm run build
npm run check:links -- http://localhost:3000
node scripts/render-product-mockups.mjs
npm run images:optimize
```

## Key locations

- `src/config/brand.ts` — centralized brand defaults and indexing flag
- `src/data/products.ts` — four-product founding collection plus preserved unpublished drafts
- `src/data/product-designs.ts` — canonical wording, artwork files, audiences, and print-placement specifications
- `PRODUCT_ARTWORK_INVENTORY.md` — featured-SKU artwork and approval inventory
- `PHOTOGRAPHY_INVENTORY.md` — image provenance, placement, and approval inventory
- `ROUND3_QC_REPORT.md` — current creative QA findings and incomplete work
- `src/components/product-art.tsx` — canonical SVG presentation for artwork-only and legacy-draft surfaces
- `scripts/render-product-mockups.mjs` — reproducible fabric-aware garment composites
- `scripts/optimize-images.mjs` — repeatable storefront WebP generation for fast delivery
- `src/components/cart-page.tsx` — saved-design review and first-drop signup experience
- `src/app/refresh.css` — current Speechless visual system
- `src/lib/db/schema.ts` — PostgreSQL schema
- `public/images/` — original campaign and garment concept assets
- `public/images/speechless-hero-more-than-words-v3.webp` — optimized exact-art social-sharing campaign image
- `OWNER_CHECKLIST.md` — decisions required to turn the preview into a real store
- `DEPLOYMENT.md` — Render deployment guidance

## Security and commerce boundary

The admin uses signed HTTP-only sessions, server-side session validation, bcrypt password hashing, origin checks, Zod validation, and login throttling. Credentials are environment-only.

Card data must never be collected directly by this application. At launch, a reviewed commerce provider should own verified SKUs, inventory, carts, payment, checkout, orders, taxes, and fulfillment.

## Known preview limitations

- Fixture mode is read-only.
- No commerce, fulfillment, email, or customer-support provider is connected.
- Product uploads are not enabled; approved assets use controlled file references.
- Policies are structured drafts and require owner/legal review.
- Product messaging should receive feedback from nonverbal people, autistic adults, caregivers, and families before public launch.
