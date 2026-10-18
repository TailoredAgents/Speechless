import { NextResponse } from "next/server";
import { adminCookie, revokeSession } from "@/lib/auth";
import { isSameOrigin } from "@/lib/security";
export async function POST(request: Request) {
  if (!isSameOrigin(request)) return NextResponse.json({ message: "Invalid request origin." }, { status: 403 });
  const token = request.headers.get("cookie")?.split(";").map((item) => item.trim()).find((item) => item.startsWith(`${adminCookie.name}=`))?.slice(adminCookie.name.length + 1);
  await revokeSession(token);
  const response = NextResponse.json({ ok: true });
  response.cookies.set(adminCookie.name, "", { ...adminCookie.options(new Date(0)), maxAge: 0 });
  return response;
}
