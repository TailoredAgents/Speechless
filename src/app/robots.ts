import type { MetadataRoute } from "next";
import { brand } from "@/config/brand";
export default function robots(): MetadataRoute.Robots { return brand.indexingEnabled ? { rules: { userAgent: "*", allow: "/", disallow: "/admin/" }, sitemap: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/sitemap.xml` } : { rules: { userAgent: "*", disallow: "/" } }; }
