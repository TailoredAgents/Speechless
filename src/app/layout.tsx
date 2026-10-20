import type { Metadata, Viewport } from "next";
import { DM_Sans, Instrument_Serif } from "next/font/google";
import { SiteChrome } from "@/components/site-chrome";
import { StoreProvider } from "@/components/store-provider";
import { brand } from "@/config/brand";
import "./globals.css";
import "./refresh.css";

const sans = DM_Sans({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const serif = Instrument_Serif({ subsets: ["latin"], variable: "--font-serif", weight: "400", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: {
    default: `${brand.name} — More than words`,
    template: `%s — ${brand.name}`,
  },
  description: brand.description,
  robots: brand.indexingEnabled ? { index: true, follow: true } : { index: false, follow: false },
  openGraph: {
    title: `${brand.name} — More than words`,
    description: brand.description,
    type: "website",
    images: [{ url: "/images/speechless-hero-more-than-words-v3.webp", width: 1727, height: 911, alt: `${brand.name} founding collection campaign` }],
  },
  twitter: { card: "summary_large_image", title: `${brand.name} — More than words`, description: brand.description, images: ["/images/speechless-hero-more-than-words-v3.webp"] },
};

export const viewport: Viewport = {
  themeColor: "#fff8ef",
  colorScheme: "light",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable}`}>
      <body>
        <StoreProvider>
          <SiteChrome>{children}</SiteChrome>
        </StoreProvider>
      </body>
    </html>
  );
}
