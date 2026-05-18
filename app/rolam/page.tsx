import type { Metadata } from "next";
import { PageHeader } from "@/components/sections/page-header";
import { About3D } from "@/components/sections/about-3d";
import { Stats } from "@/components/sections/stats";
import { TechStack } from "@/components/sections/tech-stack";
import { ContactCTA } from "@/components/sections/contact-cta";
import { SITE } from "@/lib/utils";
import { Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Rólam — Maczkó Márk webfejlesztő",
  description:
    "Maczkó Márk vagyok, magyarországi webfejlesztő. 5+ év tapasztalat, 50+ projekt. Modern Next.js, React, SEO és prémium animációk.",
  alternates: { canonical: `${SITE.url}/rolam` },
};

const values = [
  { title: "Egy ember, egy felelős", desc: "Nem ügynökség. Te velem dolgozol, én viszem át a projektet." },
  { title: "Modern stack", desc: "Next.js, React, Tailwind, Framer Motion. Lassú WordPress-toldozgatás helyett gyors, jövőtálló kód." },
  { title: "Mérhető eredmények", desc: "Pagespeed, konverzió, kulcsszó-pozíció — adatokkal dolgozom." },
  { title: "Átláthatóság", desc: "Heti előrehaladás, fix árajánlat, fix határidő. Nincsenek meglepetések." },
];

export default function RolamPage() {
  return (
    <>
      <PageHeader
        eyebrow="Rólam"
        title="Maczkó Márk — webfejlesztő"
        subtitle="Egy ember, akit megbízhatsz a vállalkozásod online megjelenésével."
      />
      <section className="relative py-16 bg-black">
        <div className="max-w-4xl mx-auto px-4 prose prose-invert prose-neutral">
          <p className="text-lg text-neutral-300 leading-relaxed">
            5+ év tapasztalattal és 50+ projekttel a hátam mögött egyedül építem a klienseim weboldalait — a designtól az élesítésig. Nem küldlek át junior fejlesztőhöz, nem outsource-olok tengerentúlra. Te velem beszélsz, és a kódot is én írom.
          </p>
          <p className="text-neutral-400 leading-relaxed mt-4">
            Az volt mindig a célom, hogy ne csak <em>egy oldal</em> legyen — hanem egy üzleti eszköz. Egy oldal, ami eladja a terméket, lefoglalja az időpontot, megfogja a látogatót. Ehhez kell a modern stack, a SEO, a prémium animáció és a stabil infrastruktúra.
          </p>
        </div>
      </section>
      <About3D />
      <Stats />
      <section className="relative py-24 bg-black">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="font-display text-3xl md:text-5xl font-bold text-gradient text-center mb-12">
            Mit kapsz, ha velem dolgozol
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {values.map((v) => (
              <div key={v.title} className="rounded-2xl border border-white/10 bg-neutral-900/40 p-6">
                <Check className="size-5 text-blue-400 mb-3" />
                <h3 className="font-semibold text-white text-lg mb-1">{v.title}</h3>
                <p className="text-neutral-400 text-sm">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <TechStack />
      <ContactCTA heading="Beszélgessünk a projektedről" />
    </>
  );
}
