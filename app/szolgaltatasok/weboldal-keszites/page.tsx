import type { Metadata } from "next";
import { PageHeader } from "@/components/sections/page-header";
import { Process } from "@/components/sections/process";
import { ContactCTA } from "@/components/sections/contact-cta";
import { TechStack } from "@/components/sections/tech-stack";
import { SITE } from "@/lib/utils";
import { Check, Zap, Smartphone, Search, Shield, Code2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Weboldal készítés — egyedi, gyors, SEO-barát",
  description:
    "Egyedi weboldal készítés vállalkozóknak. Modern Next.js stack, prémium animációk, mobil-first design, SEO alapok. Árajánlat 24 órán belül.",
  alternates: { canonical: `${SITE.url}/szolgaltatasok/weboldal-keszites` },
  keywords: ["weboldal készítés", "egyedi weboldal", "weboldalkészítő", "Next.js fejlesztő", "modern weboldal"],
};

const features = [
  { icon: Code2, title: "Egyedi design", desc: "Nem template — Figma terv, pixel-perfect kódolás." },
  { icon: Zap, title: "Villámgyors", desc: "PageSpeed 90+. Csak az lassú, ami el van rontva." },
  { icon: Smartphone, title: "Mobil-first", desc: "70% mobilon böngészik — neked is ott kell tökéletesnek lenned." },
  { icon: Search, title: "SEO-barát", desc: "Helyes HTML, gyors betöltés, strukturált adatok az első naptól." },
  { icon: Shield, title: "Biztonságos", desc: "HTTPS, biztonsági fejlécek, naprakész függőségek." },
  { icon: Check, title: "Könnyű kezelés", desc: "Egyszerű admin felület — magad is tudod szerkeszteni." },
];

const includes = [
  "Egyedi tervezés (Figma, két körös review)",
  "Reszponzív, mobil-first kódolás",
  "Animációk, interakciók (Framer Motion)",
  "SEO alapok: meta, sitemap, robots, structured data",
  "Google Analytics + Search Console beállítás",
  "Domain regisztráció (1. év)",
  "Prémium hosting (1. év)",
  "1 hónap garancia + utánkövetés",
  "Videós oktatás az adminhoz",
];

export default function WeboldalKeszitesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Szolgáltatás"
        title="Weboldal készítés"
        subtitle="Egyedi, gyors, SEO-barát weboldalak vállalkozóknak — designtól a launch-ig."
      />
      <section className="py-20 bg-black">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-4">
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <div
                  key={f.title}
                  className="rounded-2xl border border-white/10 bg-neutral-900/40 p-6 hover:border-white/20 transition"
                >
                  <Icon className="size-6 text-blue-400 mb-3" />
                  <h3 className="font-display text-lg font-bold text-white mb-1">{f.title}</h3>
                  <p className="text-sm text-neutral-400">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <section className="py-20 bg-black">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="font-display text-3xl md:text-5xl font-bold text-gradient mb-8 text-center">
            Mi van benne?
          </h2>
          <ul className="space-y-3">
            {includes.map((it) => (
              <li key={it} className="flex items-start gap-3 rounded-xl border border-white/5 bg-neutral-900/30 p-4">
                <Check className="size-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span className="text-neutral-200">{it}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <TechStack />
      <Process />
      <ContactCTA heading="Indítsuk el a weboldaladat" />
    </>
  );
}
