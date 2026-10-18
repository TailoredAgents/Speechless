import "server-only";
import { connection } from "next/server";
import { getAdminCollections, getAdminProducts, getPageSection } from "@/lib/admin-data";

export async function getCatalogProducts() {
  await connection();
  return (await getAdminProducts()).filter((product) => product.published);
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
