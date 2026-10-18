import { NextResponse } from "next/server";
import { z } from "zod";
import { adminCookie, authenticateAdmin, issueSession } from "@/lib/auth";
import { checkRateLimit, requestKey } from "@/lib/rate-limit";
import { isSameOrigin } from "@/lib/security";

const schema = z.object({ email: z.string().email().max(254), password: z.string().min(8).max(200) });
export async function POST(request: Request) {
  if (!isSameOrigin(request)) return NextResponse.json({ message: "Invalid request origin." }, { status: 403 });
  const limit = checkRateLimit(requestKey(request, "admin-login"), 5, 15 * 60_000);
  if (!limit.allowed) return NextResponse.json({ message: "Too many attempts. Please wait and try again." }, { status: 429, headers: { "Retry-After": String(limit.retryAfter) } });
  let body: unknown;
  try { body = await request.json(); } catch { return NextResponse.json({ message: "Invalid request." }, { status: 400 }); }
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ message: "Enter a valid email and password." }, { status: 400 });
  const user = await authenticateAdmin(parsed.data.email, parsed.data.password);
  if (!user) return NextResponse.json({ message: "The email or password is incorrect, or admin bootstrap is not configured." }, { status: 401 });
  const session = await issueSession(user);
  const response = NextResponse.json({ ok: true });
  response.cookies.set(adminCookie.name, session.token, adminCookie.options(session.expiresAt));
  return response;
}
