"use client";

import { usePathname } from "next/navigation";
import { AnalyticsTracker } from "@/components/analytics-tracker";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return <>{children}</>;
  return <><a href="#main-content" className="skip-link">Skip to content</a><Header/><main id="main-content">{children}</main><Footer/><AnalyticsTracker/></>;
}
