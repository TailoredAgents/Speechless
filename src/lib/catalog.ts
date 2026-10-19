import "server-only";
import { connection } from "next/server";
import { getAdminCollections, getAdminProducts, getPageSection } from "@/lib/admin-data";
import { products as fixtureProducts } from "@/data/products";

const merchandisingOrder = new Map(fixtureProducts.map((product, index) => [product.id, index]));

export async function getCatalogProducts() {
  await connection();
  return (await getAdminProducts())
    .filter((product) => product.published)
    .toSorted((a, b) => (merchandisingOrder.get(a.id) ?? Number.MAX_SAFE_INTEGER) - (merchandisingOrder.get(b.id) ?? Number.MAX_SAFE_INTEGER));
}

export async function getCatalogProduct(slug: string) {
  return (await getCatalogProducts()).find((product) => product.slug === slug);
}

export async function getCatalogCollection(slug: string) {
  await connection();
  return (await getAdminCollections()).find((collection) => collection.slug === slug && collection.published);
}

export async function getHomeEditorial() {
  await connection();
  const section = await getPageSection("home", "editorial");
  return (section?.content || {}) as Record<string, string>;
}
