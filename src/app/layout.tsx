import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { site } from "@/data/site";
import "./globals.css";

// Self-hosted variable fonts (latin subsets from Google Fonts).
const manrope = localFont({
  src: "./fonts/Manrope.woff2",
  variable: "--font-manrope",
  weight: "200 800",
  display: "swap",
});

const jetbrains = localFont({
  src: "./fonts/JetBrainsMono.woff2",
  variable: "--font-jetbrains",
  weight: "100 800",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.fullName} — ${site.role}`,
    template: `%s — ${site.fullName}`,
  },
  description: site.description,
  openGraph: {
    title: `${site.fullName} — ${site.role}`,
    description: site.description,
    type: "website",
    url: site.url,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.fullName} — ${site.role}`,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#07070d",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${manrope.variable} ${jetbrains.variable}`}>
      <body className="min-h-dvh">{children}</body>
    </html>
  );
}
