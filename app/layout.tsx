import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";
import { SITE } from "@/lib/utils";

const inter = Inter({ subsets: ["latin", "latin-ext"], display: "swap", variable: "--font-inter" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — Weboldal készítés ${SITE.city} | ${SITE.owner}`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    "weboldal készítés",
    "weboldalkészítő cég",
    "webfejlesztő",
    "webáruház készítés",
    "SEO optimalizálás",
    "Maczkó Márk",
    "Maczkó Web",
    "Next.js fejlesztő",
    "React fejlesztő",
    "prémium weboldal",
    "Budapest webfejlesztő",
  ],
  authors: [{ name: SITE.owner, url: SITE.url }],
  creator: SITE.owner,
  publisher: SITE.name,
  alternates: { canonical: SITE.url },
  openGraph: {
    type: "website",
    locale: "hu_HU",
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: SITE.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
  },
  icons: { icon: "/favicon.ico", apple: "/apple-touch-icon.png" },
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: SITE.name,
  alternateName: SITE.owner,
  description: SITE.description,
  url: SITE.url,
  email: SITE.email,
  telephone: SITE.phone,
  founder: { "@type": "Person", name: SITE.owner },
  areaServed: { "@type": "Country", name: "Magyarország" },
  address: { "@type": "PostalAddress", addressLocality: SITE.city, addressCountry: "HU" },
  priceRange: "Egyedi árajánlat",
  serviceType: ["Weboldal készítés", "Webáruház készítés", "SEO optimalizálás", "UI/UX design"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="hu" className={`${inter.variable} dark`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans bg-black text-white antialiased">
        <Navbar />
        <main className="relative">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
