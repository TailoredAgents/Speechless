import { z } from "zod";

export const emailSchema = z.string().trim().toLowerCase().email().max(254);
export const waitlistSchema = z.object({
  email: emailSchema,
  source: z.string().trim().min(1).max(120).optional().default("website"),
  productId: z.string().trim().max(100).optional(),
  website: z.string().max(0).optional().default(""),
});
export const contactSchema = z.object({
  firstName: z.string().trim().min(1).max(80),
  lastName: z.string().trim().min(1).max(80),
  email: emailSchema,
  topic: z.enum(["general", "products", "accessibility", "wholesale", "press"]),
  message: z.string().trim().min(10).max(5000),
  consent: z.union([z.literal("on"), z.literal(true)]),
  website: z.string().max(0).optional().default(""),
});

export const analyticsSchema = z.object({
  event: z.enum(["page_view", "product_view", "collection_view", "comfort_finder_complete", "add_to_cart", "waitlist_submission", "contact_submission"]),
  path: z.string().trim().startsWith("/").max(300),
  productId: z.string().trim().max(100).optional(),
});
