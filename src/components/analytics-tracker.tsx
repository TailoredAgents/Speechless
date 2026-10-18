"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname.startsWith("/admin")) return;
    const controller = new AbortController();
    void fetch("/api/analytics", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ event: "page_view", path: pathname }),
      keepalive: true,
      signal: controller.signal,
    });
    return () => controller.abort();
  }, [pathname]);

  return null;
}
