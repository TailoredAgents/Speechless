import "server-only";
import { count, desc, eq, sql } from "drizzle-orm";
import { getDb } from "@/lib/db";
import { analyticsEvents, collectionsTable, contactInquiries, pageContent, productImages, productsTable, siteSettings, waitlistSignups } from "@/lib/db/schema";
import { collections as fixtureCollections, products as fixtureProducts } from "@/data/products";
import type { Product } from "@/types/catalog";

export async function getAdminProducts(): Promise<Product[]> {
  const db = getDb();
  if (!db) return fixtureProducts;
  const [rows, images] = await Promise.all([
    db.select().from(productsTable).orderBy(desc(productsTable.updatedAt)),
    db.select().from(productImages).orderBy(productImages.position),
  ]);
  return rows.map((row) => {
    const fixtureProduct = fixtureProducts.find((product) => product.slug === row.slug);
    const rowImages = images.filter((image) => image.productId === row.id).map((image) => image.url);
    return {
      id: row.id,
      slug: row.slug,
      name: row.name,
      collection: row.collectionSlug as Product["collection"],
      collectionLabel: row.collectionLabel,
      type: row.productType as Product["type"],
      audience: row.audience as Product["audience"],
      status: row.status as Product["status"],
      published: row.published,
      featured: row.featured,
      description: row.description,
      story: row.story,
      material: row.material,
      care: row.care,
      priceCents: row.priceCents,
      colors: row.colors,
      sizes: row.sizes,
      images: fixtureProduct ? rowImages.slice(0, fixtureProduct.images.length) : rowImages,
      imageViews: fixtureProduct?.imageViews,
      fit: row.fit as Product["fit"],
      comfortFeatures: row.comfortFeatures,
      verifiedComfortFeatures: row.verifiedComfortFeatures,
      conceptNote: row.conceptNote,
    };
  });
}

export async function getDashboardData() {
  const db = getDb();
  if (!db) return { connected: false, pageViews: 0, productViews: 0, addToCarts: 0, waitlist: 0, inquiries: 0, trend: [] as { date: string; views: number }[], recentInquiries: [] as { id: string; name: string; topic: string; createdAt: Date }[], topProducts: [] as { productId: string; views: number }[] };
  const [pageViews, productViews, addToCarts, waitlist, inquiries, recent, trendResult, topResult] = await Promise.all([
    db.select({ value: count() }).from(analyticsEvents).where(eq(analyticsEvents.event, "page_view")),
    db.select({ value: count() }).from(analyticsEvents).where(eq(analyticsEvents.event, "product_view")),
    db.select({ value: count() }).from(analyticsEvents).where(eq(analyticsEvents.event, "add_to_cart")),
    db.select({ value: count() }).from(waitlistSignups),
    db.select({ value: count() }).from(contactInquiries),
    db.select({ id: contactInquiries.id, firstName: contactInquiries.firstName, lastName: contactInquiries.lastName, topic: contactInquiries.topic, createdAt: contactInquiries.createdAt }).from(contactInquiries).orderBy(desc(contactInquiries.createdAt)).limit(5),
    db.execute<{ date: string; views: number }>(sql`select to_char(date_trunc('day', created_at), 'Mon DD') as date, count(*)::int as views from analytics_events where event = 'page_view' and created_at >= now() - interval '13 days' group by date_trunc('day', created_at) order by date_trunc('day', created_at)`),
    db.execute<{ productId: string; views: number }>(sql`select product_id as "productId", count(*)::int as views from analytics_events where event = 'product_view' and product_id is not null group by product_id order by views desc limit 5`),
  ]);
  return { connected: true, pageViews: pageViews[0]?.value || 0, productViews: productViews[0]?.value || 0, addToCarts: addToCarts[0]?.value || 0, waitlist: waitlist[0]?.value || 0, inquiries: inquiries[0]?.value || 0, trend: Array.from(trendResult), recentInquiries: recent.map((item) => ({ id: item.id, name: `${item.firstName} ${item.lastName}`, topic: item.topic, createdAt: item.createdAt })), topProducts: Array.from(topResult) };
}

export async function getInquiries() {
  const db = getDb();
  if (!db) return [];
  return db.select().from(contactInquiries).orderBy(desc(contactInquiries.createdAt));
}

export async function getWaitlist() {
  const db = getDb();
  if (!db) return [];
  return db.select().from(waitlistSignups).orderBy(desc(waitlistSignups.createdAt));
}

export async function getAdminCollections() {
  const db = getDb();
  if (!db) return fixtureCollections.map((item, index) => ({ id: item.slug, ...item, position: index, published: true }));
  return db.select().from(collectionsTable).orderBy(collectionsTable.position);
}

export async function getPageSection(pageKey: string, sectionKey: string) {
  const db = getDb();
  if (!db) return null;
  return (await db.select().from(pageContent).where(sql`${pageContent.pageKey} = ${pageKey} and ${pageContent.sectionKey} = ${sectionKey}`).limit(1))[0] || null;
}

export async function getSettings() {
  const db = getDb();
  if (!db) return [];
  return db.select().from(siteSettings);
}
