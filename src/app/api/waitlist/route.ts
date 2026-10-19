import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { analyticsEvents, waitlistSignups } from "@/lib/db/schema";
import { checkRateLimit, requestKey } from "@/lib/rate-limit";
import { isSameOrigin } from "@/lib/security";
import { waitlistSchema } from "@/lib/validation";

export async function POST(request: Request) {
  if (!isSameOrigin(request)) return NextResponse.json({ message: "Invalid request origin." }, { status: 403 });
  const limit = checkRateLimit(requestKey(request, "waitlist"), 5, 15 * 60_000);
  if (!limit.allowed) return NextResponse.json({ message: "Please wait before trying again." }, { status: 429, headers: { "Retry-After": String(limit.retryAfter) } });
  let payload: unknown;
  try { payload = await request.json(); } catch { return NextResponse.json({ message: "Invalid request." }, { status: 400 }); }
  const parsed = waitlistSchema.safeParse(payload);
  if (!parsed.success) return NextResponse.json({ message: "Enter a valid email address." }, { status: 400 });
  const db = getDb();
  if (!db) return NextResponse.json({ preview: true, message: "The launch list is temporarily unavailable. Please try again later." });
  await db.insert(waitlistSignups).values({ email: parsed.data.email, source: parsed.data.source }).onConflictDoUpdate({ target: waitlistSignups.email, set: { source: parsed.data.source } });
  await db.insert(analyticsEvents).values({ event: "waitlist_submission", path: parsed.data.productId ? `/products/${parsed.data.productId}` : "/", productId: parsed.data.productId });
  return NextResponse.json({ ok: true });
}
