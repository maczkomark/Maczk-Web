import type { Metadata } from "next";
import { PageHeader } from "@/components/sections/page-header";
import { About3D } from "@/components/sections/about-3d";
import { Stats } from "@/components/sections/stats";
import { TechStack } from "@/components/sections/tech-stack";
import { ContactCTA } from "@/components/sections/contact-cta";
import { SITE } from "@/lib/utils";
import { Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Rólam — Maczkó Márk, digitalizációs partner",
  description:
    "Maczkó Márk vagyok — segítek a vállalkozásoknak digitálisan növekedni és integrálni az AI-t. Weboldal, webáruház, Google/Meta hirdetés, kereső- és AI-láthatóság (GEO) és automatizálás egy kézből.",
  alternates: { canonical: `${SITE.url}/rolam` },
};

const values = [
  { title: "Egy ember, egy felelős", desc: "Nem ügynökség. Te velem dolgozol, én viszem át a projektet az elejétől a végéig." },
  { title: "Digitalizációs partner", desc: "Weboldaltól a hirdetésen át az AI-ig — egy helyen, egy gondolkodással, a céged fejlődésére hangolva." },
  { title: "Mérhető eredmények", desc: "Megtérülés, konverzió, időmegtakarítás, láthatóság — adatokkal dolgozom, nem érzésre." },
  { title: "Átláthatóság", desc: "Érthető terv, fix árajánlat, rendszeres visszajelzés. Nincsenek meglepetések." },
];

export default function RolamPage() {
  return (
    <>
      <PageHeader
        eyebrow="Rólam"
        title="Maczkó Márk — a céged digitalizációs asszisztense"
        subtitle="Egy ember, aki végigviszi a vállalkozásod digitális fejlődését — a weboldaltól az AI-ig."
      />
      <section className="relative py-16 bg-black">
        <div className="max-w-4xl mx-auto px-4 prose prose-invert prose-neutral">
          <p className="text-lg text-neutral-300 leading-relaxed">
            Maczkó Márk vagyok, és abban segítek, hogy a vállalkozásod belépjen és növekedjen a
            digitális térben. Ez ma már jóval több, mint egy weboldal: hozzátartozik, hogy
            megtaláljanak a Google-ön és az AI-keresőkben, hogy a hirdetéseid valódi érdeklődőket
            hozzanak, és hogy az ismétlődő munkát a gép vegye le a válladról.
          </p>
          <p className="text-neutral-400 leading-relaxed mt-4">
            Nem küldlek át junior fejlesztőhöz, nem outsource-olok tengerentúlra. Te velem beszélsz,
            és a megoldásokat is én rakom össze. A célom mindig az, hogy a digitális jelenléted ne
            dísz legyen, hanem <em>üzleti eszköz</em>: ami elad, időt szabadít fel és növeli a céged.
            A technológiát — beleértve az AI-t — lefordítom a hétköznapi gyakorlatra.
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
