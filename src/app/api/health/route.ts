import { NextResponse } from "next/server";
import { sql } from "drizzle-orm";
import { getDb } from "@/lib/db";

export const dynamic = "force-dynamic";
export async function GET() {
  const db = getDb();
  if (!db) return NextResponse.json({ status: "ok", mode: "fixture", database: "not configured" });
  try { await db.execute(sql`select 1`); return NextResponse.json({ status: "ok", mode: "database", database: "connected" }); }
  catch { return NextResponse.json({ status: "degraded", mode: "database", database: "unavailable" }, { status: 503 }); }
}
