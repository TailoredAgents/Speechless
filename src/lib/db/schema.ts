import { boolean, index, integer, jsonb, pgTable, text, timestamp, uniqueIndex, uuid } from "drizzle-orm/pg-core";

export const adminUsers = pgTable("admin_users", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: text("email").notNull(),
  passwordHash: text("password_hash").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
}, (table) => [uniqueIndex("admin_users_email_idx").on(table.email)]);

export const adminSessions = pgTable("admin_sessions", {
  id: uuid("id").defaultRandom().primaryKey(),
  adminUserId: uuid("admin_user_id").references(() => adminUsers.id, { onDelete: "cascade" }),
  tokenHash: text("token_hash").notNull(),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
}, (table) => [uniqueIndex("admin_sessions_token_idx").on(table.tokenHash), index("admin_sessions_expiry_idx").on(table.expiresAt)]);

export const collectionsTable = pgTable("collections", {
  id: uuid("id").defaultRandom().primaryKey(),
  slug: text("slug").notNull(),
  name: text("name").notNull(),
  eyebrow: text("eyebrow").notNull().default(""),
  description: text("description").notNull().default(""),
  image: text("image").notNull().default(""),
  position: integer("position").notNull().default(0),
  published: boolean("published").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
}, (table) => [uniqueIndex("collections_slug_idx").on(table.slug)]);

export const productsTable = pgTable("products", {
  id: text("id").primaryKey(),
  slug: text("slug").notNull(),
  name: text("name").notNull(),
  collectionSlug: text("collection_slug").notNull(),
  collectionLabel: text("collection_label").notNull(),
  productType: text("product_type").notNull(),
  audience: text("audience").notNull(),
  status: text("status").notNull().default("concept"),
  published: boolean("published").notNull().default(false),
  featured: boolean("featured").notNull().default(false),
  description: text("description").notNull().default(""),
  story: text("story").notNull().default(""),
  material: text("material"),
  care: text("care"),
  priceCents: integer("price_cents"),
  colors: jsonb("colors").$type<{ name: string; hex: string }[]>().notNull().default([]),
  sizes: jsonb("sizes").$type<string[]>().notNull().default([]),
  fit: text("fit").notNull().default("Relaxed"),
  comfortFeatures: jsonb("comfort_features").$type<string[]>().notNull().default([]),
  verifiedComfortFeatures: jsonb("verified_comfort_features").$type<string[]>().notNull().default([]),
  conceptNote: text("concept_note").notNull().default(""),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
}, (table) => [uniqueIndex("products_slug_idx").on(table.slug), index("products_collection_idx").on(table.collectionSlug), index("products_status_idx").on(table.status)]);

export const productVariants = pgTable("product_variants", {
  id: uuid("id").defaultRandom().primaryKey(),
  productId: text("product_id").notNull().references(() => productsTable.id, { onDelete: "cascade" }),
  sku: text("sku"),
  color: text("color").notNull(),
  size: text("size").notNull(),
  priceCents: integer("price_cents"),
  sellable: boolean("sellable").notNull().default(false),
  externalId: text("external_id"),
}, (table) => [index("product_variants_product_idx").on(table.productId)]);

export const productImages = pgTable("product_images", {
  id: uuid("id").defaultRandom().primaryKey(),
  productId: text("product_id").notNull().references(() => productsTable.id, { onDelete: "cascade" }),
  url: text("url").notNull(),
  alt: text("alt").notNull().default(""),
  position: integer("position").notNull().default(0),
  isConcept: boolean("is_concept").notNull().default(true),
}, (table) => [index("product_images_product_idx").on(table.productId)]);

export const productComfortAttributes = pgTable("product_comfort_attributes", {
  id: uuid("id").defaultRandom().primaryKey(),
  productId: text("product_id").notNull().references(() => productsTable.id, { onDelete: "cascade" }),
  attribute: text("attribute").notNull(),
  verified: boolean("verified").notNull().default(false),
  evidenceNote: text("evidence_note"),
}, (table) => [index("product_comfort_product_idx").on(table.productId)]);

export const pageContent = pgTable("page_content", {
  id: uuid("id").defaultRandom().primaryKey(),
  pageKey: text("page_key").notNull(),
  sectionKey: text("section_key").notNull(),
  content: jsonb("content").$type<Record<string, unknown>>().notNull().default({}),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
}, (table) => [uniqueIndex("page_content_section_idx").on(table.pageKey, table.sectionKey)]);

export const siteSettings = pgTable("site_settings", {
  key: text("key").primaryKey(),
  value: jsonb("value").$type<unknown>().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export const waitlistSignups = pgTable("waitlist_signups", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: text("email").notNull(),
  source: text("source").notNull().default("website"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
}, (table) => [uniqueIndex("waitlist_email_idx").on(table.email), index("waitlist_created_idx").on(table.createdAt)]);

export const contactInquiries = pgTable("contact_inquiries", {
  id: uuid("id").defaultRandom().primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  topic: text("topic").notNull(),
  message: text("message").notNull(),
  status: text("status").notNull().default("new"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
}, (table) => [index("contact_status_idx").on(table.status), index("contact_created_idx").on(table.createdAt)]);

export const analyticsEvents = pgTable("analytics_events", {
  id: uuid("id").defaultRandom().primaryKey(),
  event: text("event").notNull(),
  path: text("path").notNull(),
  productId: text("product_id"),
  referrerHost: text("referrer_host"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
}, (table) => [index("analytics_event_idx").on(table.event), index("analytics_created_idx").on(table.createdAt), index("analytics_product_idx").on(table.productId)]);

export const auditLogs = pgTable("audit_logs", {
  id: uuid("id").defaultRandom().primaryKey(),
  adminEmail: text("admin_email").notNull(),
  action: text("action").notNull(),
  entityType: text("entity_type").notNull(),
  entityId: text("entity_id"),
  details: jsonb("details").$type<Record<string, unknown>>().notNull().default({}),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
}, (table) => [index("audit_created_idx").on(table.createdAt)]);
