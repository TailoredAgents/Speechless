import "server-only";
import { unstable_cache } from "next/cache";
import { getAdminCollections, getAdminProducts, getPageSection } from "@/lib/admin-data";
import { products as fixtureProducts } from "@/data/products";

const merchandisingOrder = new Map(fixtureProducts.map((product, index) => [product.id, index]));
const getCachedProducts = unstable_cache(getAdminProducts, ["catalog-products"], { revalidate: 60, tags: ["catalog"] });
const getCachedCollections = unstable_cache(getAdminCollections, ["catalog-collections"], { revalidate: 60, tags: ["catalog"] });
const getCachedHomeEditorial = unstable_cache(() => getPageSection("home", "editorial"), ["home-editorial"], { revalidate: 60, tags: ["content"] });

export async function getCatalogProducts() {
  return (await getCachedProducts())
    .filter((product) => product.published)
    .toSorted((a, b) => (merchandisingOrder.get(a.id) ?? Number.MAX_SAFE_INTEGER) - (merchandisingOrder.get(b.id) ?? Number.MAX_SAFE_INTEGER));
}

export async function getCatalogProduct(slug: string) {
  return (await getCatalogProducts()).find((product) => product.slug === slug);
}

export async function getCatalogCollection(slug: string) {
  return (await getCachedCollections()).find((collection) => collection.slug === slug && collection.published);
}

export async function getHomeEditorial() {
  const section = await getCachedHomeEditorial();
  return (section?.content || {}) as Record<string, string>;
}
