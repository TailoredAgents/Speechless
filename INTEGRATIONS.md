# Connected and future integrations

## Working now

- Local fixture-backed storefront with twelve concept products
- PostgreSQL persistence through Drizzle when `DATABASE_URL` is configured
- Secure single-admin bootstrap and server-validated sessions
- Product, collection, selected homepage content, and settings management
- Contact inquiry and launch-interest storage
- Anonymous first-party storefront events and real dashboard aggregates
- Local-device launch bag
- Deterministic, non-medical Comfort Finder
- Render Blueprint, migration, seed, and health endpoint

## Intentionally not connected

### Commerce

The customer presentation, catalog model, cart-like launch bag, and future provider boundary are separate. Shopify Storefront API plus Shopify-hosted checkout is the preferred future direction. Once connected, Shopify should own verified SKUs, variants, prices, inventory, carts, checkout, and order state; local fields must not compete with it.

### Email

Signups can be stored, but no confirmation or campaign email is sent. A future adapter must handle verified domains, explicit consent, suppression lists, unsubscribe behavior, retries, and auditability.

### AI and automation

The dashboard roadmap includes shopping guidance, support, lifecycle marketing, marketing intelligence, and merchandising assistance. None is presented as active. Future agents must use approved product and policy data, respect consent and access controls, avoid medical inference, and hand off uncertain or sensitive questions to a person.

### External analytics

The current application records limited first-party events. A future Google Analytics or marketing adapter should remain isolated and should not be enabled without an approved privacy and consent review.

### Uploads

Arbitrary public uploads are intentionally unavailable. Product images currently use controlled local references. A future image pipeline needs authenticated uploads, file validation, object storage, transformations, access control, and an asset-approval workflow.
