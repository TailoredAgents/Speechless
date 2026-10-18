# Render deployment guide

## Before deployment

1. Push this repository to a private GitHub repository.
2. Review `OWNER_CHECKLIST.md` and keep the storefront in presentation mode.
3. Choose a long, unique admin password and an admin email address.
4. Confirm the intended Render service name. The included Blueprint uses `speechless-web` and `speechless-db`.

## Deploy the Blueprint

1. In Render, create a new **Blueprint** and connect the repository.
2. Render reads `render.yaml` and proposes one always-on `0.5c-512mb` Node.js web service (currently $7/month) plus one Free PostgreSQL database.
3. Supply the prompted values:
   - `ADMIN_EMAIL`
   - `ADMIN_PASSWORD`
   - `NEXT_PUBLIC_SITE_URL` (for the default service name, use the final `https://speechless-web.onrender.com` URL if available)
4. Keep `COMMERCE_PROVIDER=disabled`.
5. Deploy the Blueprint.

The start process runs Drizzle migrations and the idempotent seed before starting Next.js. The application listens on Render's `PORT` through `next start`, and `/api/health` reports fixture, connected, or degraded database state.

After deployment, verify:

- `/api/health` returns `status: ok` and `database: connected`.
- `/admin/login` accepts the environment-provided bootstrap credentials.
- The storefront renders and remains noindexed.
- A test contact inquiry and launch-list signup appear in the dashboard.
- Product edits persist across a redeploy and reach the storefront.
- Logout invalidates the admin session.

## Free-tier database warning

Render's current Free PostgreSQL instances expire 30 days after creation. They have no backups and are intended for previews, not durable production. Before expiration, upgrade the database or migrate it to long-lived PostgreSQL. Render currently provides a 14-day upgrade grace period after expiry, after which the database and its data can be deleted.

Do not treat the free database as permanent business infrastructure. Export or migrate any genuine launch signups and inquiries before the expiration date.

## Production launch changes

Before a real commercial launch:

- Complete trademark and legal review.
- Move to a paid PostgreSQL plan with backups.
- Replace all concept products and imagery with owner-approved catalog data.
- Complete privacy, terms, returns, shipping, tax, consent, and accessibility review.
- Connect Shopify or another reviewed commerce system as the system of record.
- Configure an email provider and verified sending domain.
- Perform database-backed integration, security, accessibility, and load testing.
- Change indexing only after the launch-readiness review.

## Rollback

Render supports service-version rollback. Database schema rollback is not automatic; migrations should be additive where possible and backed up before any destructive change. The included initial migration only creates new tables and indexes.
