import "server-only";
import { createHash, randomUUID } from "node:crypto";
import { compare, hash } from "bcryptjs";
import { and, eq, gt } from "drizzle-orm";
import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";
import { getDb } from "@/lib/db";
import { adminSessions, adminUsers } from "@/lib/db/schema";

const cookieName = "speechless_admin";
const sessionDuration = 8 * 60 * 60 * 1000;
let localPasswordHash: Promise<string> | undefined;

function secret() {
  const configured = process.env.SESSION_SECRET;
  if (configured && configured.length >= 32) return new TextEncoder().encode(configured);
  if (process.env.NODE_ENV === "production") throw new Error("SESSION_SECRET must be at least 32 characters in production.");
  return new TextEncoder().encode("speechless-local-development-secret-only");
}

function tokenHash(sessionId: string) {
  return createHash("sha256").update(sessionId).digest("hex");
}

export async function authenticateAdmin(email: string, password: string) {
  const expectedEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const bootstrapPassword = process.env.ADMIN_PASSWORD;
  if (!expectedEmail || !bootstrapPassword || email.trim().toLowerCase() !== expectedEmail) return null;

  const db = getDb();
  if (!db) {
    localPasswordHash ??= hash(bootstrapPassword, 12);
    return (await compare(password, await localPasswordHash)) ? { id: null, email: expectedEmail } : null;
  }

  const existing = await db.select().from(adminUsers).where(eq(adminUsers.email, expectedEmail)).limit(1);
  let user = existing[0];
  if (!user) {
    const [created] = await db.insert(adminUsers).values({ email: expectedEmail, passwordHash: await hash(bootstrapPassword, 12) }).returning();
    user = created;
  }
  return (await compare(password, user.passwordHash)) ? { id: user.id, email: user.email } : null;
}

export async function issueSession(user: { id: string | null; email: string }) {
  const sessionId = randomUUID();
  const expiresAt = new Date(Date.now() + sessionDuration);
  const token = await new SignJWT({ email: user.email, sid: sessionId, uid: user.id })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(Math.floor(expiresAt.getTime() / 1000))
    .sign(secret());
  const db = getDb();
  if (db) await db.insert(adminSessions).values({ adminUserId: user.id, tokenHash: tokenHash(sessionId), expiresAt });
  return { token, expiresAt };
}

export async function validateSessionToken(token: string | undefined) {
  if (!token) return null;
  try {
    const verified = await jwtVerify(token, secret());
    const email = verified.payload.email;
    const sid = verified.payload.sid;
    if (typeof email !== "string" || typeof sid !== "string") return null;
    const db = getDb();
    if (db) {
      const active = await db.select({ id: adminSessions.id }).from(adminSessions).where(and(eq(adminSessions.tokenHash, tokenHash(sid)), gt(adminSessions.expiresAt, new Date()))).limit(1);
      if (!active[0]) return null;
    }
    return { email, sid };
  } catch { return null; }
}

export async function getAdminSession() {
  const store = await cookies();
  return validateSessionToken(store.get(cookieName)?.value);
}

export async function getRequestAdmin(request: Request) {
  const token = request.headers.get("cookie")?.split(";").map((item) => item.trim()).find((item) => item.startsWith(`${cookieName}=`))?.slice(cookieName.length + 1);
  return validateSessionToken(token);
}

export async function revokeSession(token: string | undefined) {
  const session = await validateSessionToken(token);
  const db = getDb();
  if (session && db) await db.delete(adminSessions).where(eq(adminSessions.tokenHash, tokenHash(session.sid)));
}

export const adminCookie = {
  name: cookieName,
  options(expires: Date) {
    return { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax" as const, path: "/", expires };
  },
};
