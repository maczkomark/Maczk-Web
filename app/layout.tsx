import type { Metadata, Viewport } from "next";
import { Space_Grotesk, DM_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";
import { GoogleAnalytics } from "@/components/analytics";
import { CookieBanner } from "@/components/ui/cookie-banner";
import { SITE } from "@/lib/utils";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "G-3Z2K4XQ03D";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
});
const dmSans = DM_Sans({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — Weboldal készítés ${SITE.city} | ${SITE.owner}`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    "weboldal készítés",
    "webáruház készítés",
    "SEO optimalizálás",
    "GEO",
    "AI keresőoptimalizálás",
    "Google Ads kezelés",
    "Meta Ads",
    "Facebook hirdetés",
    "AI automatizálás",
    "AI integráció vállalkozásoknak",
    "digitális marketing Szombathely",
    "Maczkó Márk",
    "Maczkó Web",
    "digitális partner",
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
  logo: `${SITE.url}/logo-wordmark.png`,
  image: `${SITE.url}/logo-wordmark.png`,
  email: SITE.email,
  telephone: SITE.phone,
  founder: { "@type": "Person", name: SITE.owner },
  areaServed: { "@type": "Country", name: "Magyarország" },
  address: { "@type": "PostalAddress", addressLocality: SITE.city, addressCountry: "HU" },
  priceRange: "Egyedi árajánlat",
  serviceType: [
    "Weboldal készítés",
    "Webáruház készítés",
    "SEO optimalizálás",
    "GEO — AI-keresős láthatóság",
    "Google Ads kezelés",
    "Meta (Facebook/Instagram) hirdetés",
    "AI-automatizálás",
    "AI-integráció és betanítás",
  ],
  slogan: SITE.tagline,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="hu" className={`${spaceGrotesk.variable} ${dmSans.variable} dark`}>
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
        <CookieBanner />
        <GoogleAnalytics gaId={GA_ID} />
      </body>
    </html>
  );
}
