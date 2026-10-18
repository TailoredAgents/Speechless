import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { analyticsEvents } from "@/lib/db/schema";
import { checkRateLimit, requestKey } from "@/lib/rate-limit";
import { safeReferrerHost } from "@/lib/security";
import { analyticsSchema } from "@/lib/validation";

export async function POST(request: Request) {
  const db = getDb();
  if (!db) return new NextResponse(null, { status: 204 });
  const limit = checkRateLimit(requestKey(request, "analytics"), 80, 60_000);
  if (!limit.allowed) return new NextResponse(null, { status: 204 });
  let payload: unknown;
  try { payload = await request.json(); } catch { return new NextResponse(null, { status: 204 }); }
  const parsed = analyticsSchema.safeParse(payload);
  if (!parsed.success) return new NextResponse(null, { status: 204 });
  try {
    await db.insert(analyticsEvents).values({ ...parsed.data, referrerHost: safeReferrerHost(request.headers.get("referer")) });
  } catch {
    return new NextResponse(null, { status: 204 });
  }
  return new NextResponse(null, { status: 204 });
}
