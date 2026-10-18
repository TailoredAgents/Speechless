type Entry = { count: number; resetAt: number };
const buckets = new Map<string, Entry>();

export function checkRateLimit(key: string, limit = 10, windowMs = 60_000) {
  const now = Date.now();
  if (buckets.size > 10_000) {
    for (const [bucketKey, entry] of buckets) if (entry.resetAt < now) buckets.delete(bucketKey);
  }
  const current = buckets.get(key);
  if (!current || current.resetAt < now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, retryAfter: 0 };
  }
  current.count += 1;
  return { allowed: current.count <= limit, retryAfter: Math.ceil((current.resetAt - now) / 1000) };
}

export function requestKey(request: Request, scope: string) {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return `${scope}:${forwarded || request.headers.get("x-real-ip") || "local"}`;
}
