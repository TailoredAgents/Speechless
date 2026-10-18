import { eq } from "drizzle-orm";
import { collections, products } from "../src/data/products";
import { getDb } from "../src/lib/db";
import { collectionsTable, productComfortAttributes, productImages, productsTable } from "../src/lib/db/schema";

async function seed() {
  const db = getDb();
  if (!db) {
    console.log("DATABASE_URL is not configured; fixture catalog remains active.");
    return;
  }
  for (const [position, collection] of collections.entries()) {
    await db.insert(collectionsTable).values({ ...collection, position, published: true }).onConflictDoUpdate({
      target: collectionsTable.slug,
      set: { name: collection.name, eyebrow: collection.eyebrow, description: collection.description, image: collection.image, position, updatedAt: new Date() },
    });
  }
  for (const product of products) {
    await db.insert(productsTable).values({
      id: product.id,
      slug: product.slug,
      name: product.name,
      collectionSlug: product.collection,
      collectionLabel: product.collectionLabel,
      productType: product.type,
      audience: product.audience,
      status: product.status,
      published: product.published,
      featured: product.featured || false,
      description: product.description,
      story: product.story,
      material: product.material,
      care: product.care,
      priceCents: product.priceCents,
      colors: product.colors,
      sizes: product.sizes,
      fit: product.fit,
      comfortFeatures: product.comfortFeatures,
      verifiedComfortFeatures: product.verifiedComfortFeatures,
      conceptNote: product.conceptNote,
    }).onConflictDoUpdate({
      target: productsTable.id,
      set: { slug: product.slug, name: product.name, collectionSlug: product.collection, collectionLabel: product.collectionLabel, productType: product.type, audience: product.audience, status: product.status, published: product.published, featured: product.featured || false, description: product.description, story: product.story, material: product.material, care: product.care, priceCents: product.priceCents, colors: product.colors, sizes: product.sizes, fit: product.fit, comfortFeatures: product.comfortFeatures, conceptNote: product.conceptNote, updatedAt: new Date() },
    });
    const existingImages = await db.select({ id: productImages.id, position: productImages.position }).from(productImages).where(eq(productImages.productId, product.id));
    if (!existingImages.length) {
      await db.insert(productImages).values(product.images.map((url, position) => ({ productId: product.id, url, position, alt: `${product.name} concept view`, isConcept: true })));
    } else {
      for (const [position, url] of product.images.entries()) {
        const existingImage = existingImages.find((image) => image.position === position);
        if (existingImage) {
          await db.update(productImages).set({ url, alt: `${product.name} concept view`, isConcept: true }).where(eq(productImages.id, existingImage.id));
        } else {
          await db.insert(productImages).values({ productId: product.id, url, position, alt: `${product.name} concept view`, isConcept: true });
        }
      }
    }
    const existingAttributes = await db.select({ id: productComfortAttributes.id }).from(productComfortAttributes).where(eq(productComfortAttributes.productId, product.id)).limit(1);
    if (!existingAttributes.length && product.comfortFeatures.length) {
      await db.insert(productComfortAttributes).values(product.comfortFeatures.map((attribute) => ({ productId: product.id, attribute, verified: false, evidenceNote: "Concept direction only; production verification pending." })));
    }
  }
  console.log(`Seeded ${collections.length} collections and ${products.length} concept products.`);
}

seed().then(() => process.exit(0)).catch((error) => { console.error(error); process.exit(1); });
