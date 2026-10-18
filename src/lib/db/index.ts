import "server-only";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

type Database = ReturnType<typeof drizzle<typeof schema>>;
const globalDatabase = globalThis as typeof globalThis & { speechlessDb?: Database; speechlessSql?: ReturnType<typeof postgres> };

export function hasDatabase() {
  return Boolean(process.env.DATABASE_URL);
}

export function getDb(): Database | null {
  const url = process.env.DATABASE_URL;
  if (!url) return null;
  if (!globalDatabase.speechlessSql) globalDatabase.speechlessSql = postgres(url, { max: 6, idle_timeout: 20, prepare: false });
  if (!globalDatabase.speechlessDb) globalDatabase.speechlessDb = drizzle(globalDatabase.speechlessSql, { schema });
  return globalDatabase.speechlessDb;
}
