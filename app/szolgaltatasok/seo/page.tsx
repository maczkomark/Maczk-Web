import type { Metadata } from "next";
import { PageHeader } from "@/components/sections/page-header";
import { ContactCTA } from "@/components/sections/contact-cta";
import { SITE } from "@/lib/utils";
import { Check, TrendingUp, FileSearch, Globe, Wand2, Link2, BarChart3 } from "lucide-react";

export const metadata: Metadata = {
  title: "SEO optimalizálás — első helyre a Google-ben",
  description:
    "Technikai és tartalmi SEO szolgáltatás magyar vállalkozóknak. Audit, kulcsszó-kutatás, on-page és technikai optimalizálás, mérhető pozíció-növekedés.",
  alternates: { canonical: `${SITE.url}/szolgaltatasok/seo` },
  keywords: ["SEO optimalizálás", "keresőoptimalizálás", "SEO szakértő", "Google ranking", "kulcsszókutatás"],
};

const services = [
  { icon: FileSearch, title: "SEO audit", desc: "Részletes elemzés a meglévő oldalról: technikai hibák, tartalmi hiányosságok, versenytárs összehasonlítás." },
  { icon: Wand2, title: "Technikai SEO", desc: "Sebesség, Core Web Vitals, mobilbarátság, structured data, sitemap, robots." },
  { icon: Globe, title: "On-page SEO", desc: "Cím- és meta-tagek, headings, belső linkek, képek alt-szövege, kulcsszó-stratégia." },
  { icon: Link2, title: "Tartalmi SEO", desc: "Blog cikkek, kulcsszó-kutatás, tartalomstratégia, témaklaszterek." },
  { icon: BarChart3, title: "Mérés és riport", desc: "Havi riport: pozíció-változás, organic forgalom, konverzió. Adatokkal érvelünk, nem érzéssel." },
  { icon: TrendingUp, title: "Folyamatos finomítás", desc: "A SEO maraton, nem sprint. Havi munkaidő, folyamatos pozíció-növekedés." },
];

export default function SeoPage() {
  return (
    <>
      <PageHeader
        eyebrow="Szolgáltatás"
        title="SEO optimalizálás"
        subtitle="Technikai és tartalmi keresőoptimalizálás — első helyre a Google találatok között."
      />
      <section className="py-20 bg-black">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-4">
            {services.map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.title}
                  className="rounded-2xl border border-white/10 bg-neutral-900/40 p-6 hover:border-amber-500/30 transition"
                >
                  <Icon className="size-6 text-amber-400 mb-3" />
                  <h3 className="font-display text-lg font-bold text-white mb-1">{s.title}</h3>
                  <p className="text-sm text-neutral-400">{s.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <section className="py-20 bg-neutral-950">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="font-display text-3xl md:text-5xl font-bold text-gradient text-center mb-4">
            Mit garantálok és mit nem
          </h2>
          <p className="text-center text-neutral-400 mb-10">
            Senki nem tud "garantált 1. helyet" ígérni. Akik mégis, hazudnak. Én ezt garantálom:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6">
              <h3 className="font-bold text-emerald-400 mb-3">Amit ígérek</h3>
              <ul className="space-y-2 text-sm text-neutral-300">
                <li className="flex gap-2"><Check className="size-4 text-emerald-400 flex-shrink-0 mt-0.5" /> Technikailag tökéletes alap</li>
                <li className="flex gap-2"><Check className="size-4 text-emerald-400 flex-shrink-0 mt-0.5" /> Releváns kulcsszó-stratégia</li>
                <li className="flex gap-2"><Check className="size-4 text-emerald-400 flex-shrink-0 mt-0.5" /> 90+ PageSpeed</li>
                <li className="flex gap-2"><Check className="size-4 text-emerald-400 flex-shrink-0 mt-0.5" /> Havi átlátható riport</li>
                <li className="flex gap-2"><Check className="size-4 text-emerald-400 flex-shrink-0 mt-0.5" /> Mérhető pozíció-növekedés</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-6">
              <h3 className="font-bold text-red-400 mb-3">Amit NEM ígérek</h3>
              <ul className="space-y-2 text-sm text-neutral-300">
                <li>• "1 hét alatt 1. helyre" (lehetetlen)</li>
                <li>• Black-hat technikák (büntetést kapsz)</li>
                <li>• Mindenre garantált rangsor</li>
                <li>• Azonnali eredmény (3–6 hónap valós)</li>
                <li>• "Bele nem nézünk a Google-ba" (átverés)</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <ContactCTA heading="Kérj SEO auditot" />
    </>
  );
}
