import type { Metadata } from "next";
import { PageHeader } from "@/components/sections/page-header";
import { ContactCTA } from "@/components/sections/contact-cta";
import { SITE } from "@/lib/utils";
import { Check, Sparkles, MapPin, MessageSquareText, FileSearch, Star, RefreshCw } from "lucide-react";

export const metadata: Metadata = {
  title: "GEO — láthatóság az AI-keresőkben + Google Cégprofil",
  description:
    "GEO (generative engine optimization): hogy a céged megjelenjen a ChatGPT és a Google AI válaszaiban, ne csak a kék linkek között. Google Cégprofil rendben tartása helyi vállalkozásoknak. Havidíjas csomag.",
  alternates: { canonical: `${SITE.url}/szolgaltatasok/geo-lathatosag` },
  keywords: [
    "GEO",
    "generative engine optimization",
    "AI keresőoptimalizálás",
    "ChatGPT láthatóság",
    "Google Cégprofil",
    "helyi láthatóság",
    "AI kereső",
  ],
};

const services = [
  { icon: Sparkles, title: "AI-keresős láthatóság", desc: "Tartalom és struktúra úgy felépítve, hogy a ChatGPT, a Google AI és a Perplexity is idézzen és ajánljon." },
  { icon: MapPin, title: "Google Cégprofil", desc: "Hiányzó adatok pótlása, kategóriák, nyitvatartás, fotók, szolgáltatások — hogy a térképen is megjelenj." },
  { icon: MessageSquareText, title: "Strukturált adatok", desc: "Schema.org jelölés, FAQ és Q&A, hogy a gépek egyértelműen értsék, mit csinálsz és kinek." },
  { icon: FileSearch, title: "Tartalom-stratégia", desc: "Kérdés-alapú tartalom, ami pont arra válaszol, amit az emberek az AI-tól kérdeznek rólad." },
  { icon: Star, title: "Vélemények kezelése", desc: "Recenzió-gyűjtés és -válaszolás folyamata — a vélemények súlya az AI-ajánlásokban is nő." },
  { icon: RefreshCw, title: "Havi rendben tartás", desc: "Folyamatos frissítés, mérés, finomítás — az AI-keresés gyorsan változik, lépést tartunk vele." },
];

export default function GeoPage() {
  return (
    <>
      <PageHeader
        eyebrow="Láthatóság & elérés"
        title="GEO — hogy az AI is rád találjon"
        subtitle="A keresés már nem kék linkek listája. A vásárlóid a ChatGPT-től és a Google AI-tól kérdeznek — és ott is meg kell jelenned."
      />

      <section className="py-16 bg-neutral-950">
        <div className="max-w-3xl mx-auto px-4">
          <div className="rounded-2xl border border-fuchsia-500/20 bg-fuchsia-500/[0.05] p-6 md:p-8">
            <h2 className="font-display text-2xl font-bold text-white mb-3">Mi az a GEO?</h2>
            <p className="text-neutral-300 text-sm md:text-base leading-relaxed">
              A <strong>GEO (generative engine optimization)</strong> a SEO következő rétege:
              míg a SEO a Google találati listájára optimalizál, a GEO arra, hogy a
              <em> generatív AI-válaszokban</em> — ChatGPT, Google AI Overviews, Perplexity, Gemini —
              a te céged jelenjen meg ajánlásként. Ahogy egyre többen kérdezik az AI-t
              („melyik a legjobb fogászat Szombathelyen?"), ez új, ma még szinte üres láthatósági réteg.
              Aki most lép, az lesz „az, akit az AI ajánl".
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-black">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-4">
            {services.map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.title}
                  className="rounded-2xl border border-white/10 bg-neutral-900/40 p-6 hover:border-fuchsia-500/30 transition"
                >
                  <Icon className="size-6 text-fuchsia-400 mb-3" />
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
            Őszintén a GEO-ról
          </h2>
          <p className="text-center text-neutral-400 mb-10">
            Ez egy korai, gyorsan változó terület. Ezt vállalom — és ezt nem:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6">
              <h3 className="font-bold text-emerald-400 mb-3">Amit ígérek</h3>
              <ul className="space-y-2 text-sm text-neutral-300">
                <li className="flex gap-2"><Check className="size-4 text-emerald-400 flex-shrink-0 mt-0.5" /> Teljes, naprakész Google Cégprofil</li>
                <li className="flex gap-2"><Check className="size-4 text-emerald-400 flex-shrink-0 mt-0.5" /> AI-barát, strukturált tartalom</li>
                <li className="flex gap-2"><Check className="size-4 text-emerald-400 flex-shrink-0 mt-0.5" /> Mérhető megjelenés (előtte-utána)</li>
                <li className="flex gap-2"><Check className="size-4 text-emerald-400 flex-shrink-0 mt-0.5" /> Havi átlátható riport</li>
                <li className="flex gap-2"><Check className="size-4 text-emerald-400 flex-shrink-0 mt-0.5" /> Korai belépő előny a piacodon</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-6">
              <h3 className="font-bold text-red-400 mb-3">Amit NEM ígérek</h3>
              <ul className="space-y-2 text-sm text-neutral-300">
                <li>• Garantált 1. hely a ChatGPT-ben (senki sem tudja)</li>
                <li>• Azonnali eredmény (ez is hónapok kérdése)</li>
                <li>• Az AI-modellek belső működésének „feltörése"</li>
                <li>• Mesterséges, kamu vélemények</li>
                <li>• Egyszeri munka — ez folyamatos rendben tartás</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <ContactCTA heading="Nézzük meg, lát-e az AI" />
    </>
  );
}
