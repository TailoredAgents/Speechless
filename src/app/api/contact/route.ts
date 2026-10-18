import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { analyticsEvents, contactInquiries } from "@/lib/db/schema";
import { checkRateLimit, requestKey } from "@/lib/rate-limit";
import { isSameOrigin } from "@/lib/security";
import { contactSchema } from "@/lib/validation";

export async function POST(request: Request) {
  if (!isSameOrigin(request)) return NextResponse.json({ message: "Invalid request origin." }, { status: 403 });
  const limit = checkRateLimit(requestKey(request, "contact"), 4, 15 * 60_000);
  if (!limit.allowed) return NextResponse.json({ message: "Please wait before sending another message." }, { status: 429, headers: { "Retry-After": String(limit.retryAfter) } });
  let payload: unknown;
  try { payload = await request.json(); } catch { return NextResponse.json({ message: "Invalid request." }, { status: 400 }); }
  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) return NextResponse.json({ message: "Please complete each required field." }, { status: 400 });
  const db = getDb();
  if (!db) return NextResponse.json({ preview: true, message: "Preview mode is active, so this message was not stored. Connect PostgreSQL to enable inquiries." });
  const { firstName, lastName, email, topic, message } = parsed.data;
  await db.insert(contactInquiries).values({ firstName, lastName, email, topic, message });
  await db.insert(analyticsEvents).values({ event: "contact_submission", path: "/contact" });
  return NextResponse.json({ ok: true });
}
