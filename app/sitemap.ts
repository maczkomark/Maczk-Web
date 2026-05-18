import type { MetadataRoute } from "next";
import { SITE, NAV, SERVICES } from "@/lib/utils";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const base = SITE.url.replace(/\/$/, "");
  const main = NAV.map((n) => ({
    url: `${base}${n.href}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: n.href === "/" ? 1.0 : 0.8,
  }));
  const services = SERVICES.map((s) => ({
    url: `${base}/szolgaltatasok/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));
  return [...main, ...services];
}
