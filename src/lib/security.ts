export function isSameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return true;
  try {
    const forwardedHost = request.headers.get("x-forwarded-host")?.split(",")[0]?.trim();
    const requestHost = forwardedHost || request.headers.get("host") || new URL(request.url).host;
    return new URL(origin).host === requestHost;
  } catch { return false; }
}

export function safeReferrerHost(value: string | null) {
  if (!value) return null;
  try { return new URL(value).hostname.slice(0, 253); } catch { return null; }
}
