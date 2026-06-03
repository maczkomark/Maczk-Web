import type { Metadata } from "next";
import { PageHeader } from "@/components/sections/page-header";
import { ContactCTA } from "@/components/sections/contact-cta";
import { SITE } from "@/lib/utils";
import { Check, Search, Facebook, Target, BarChart3, Wallet, PenTool } from "lucide-react";

export const metadata: Metadata = {
  title: "Google & Meta hirdetések — célzott kampányok megtérüléssel",
  description:
    "Google Ads és Meta (Facebook/Instagram) hirdetéskezelés helyi vállalkozásoknak. Célzott kampányok, átlátható büdzsé, mérhető megtérülés. Beállítás és havi optimalizálás.",
  alternates: { canonical: `${SITE.url}/szolgaltatasok/hirdetes` },
  keywords: [
    "Google Ads",
    "Meta Ads",
    "Facebook hirdetés",
    "Instagram hirdetés",
    "PPC kezelés",
    "online hirdetés",
    "hirdetéskezelés Szombathely",
  ],
};

const services = [
  { icon: Search, title: "Google Ads", desc: "Keresési, display és Maps-hirdetések — pont akkor jelensz meg, amikor rád keresnek." },
  { icon: Facebook, title: "Meta Ads", desc: "Facebook és Instagram kampányok — figyelemfelkeltés és érdeklődők gyűjtése helyben." },
  { icon: Target, title: "Pontos célzás", desc: "Földrajzi, demográfiai és érdeklődés alapú célzás — nem a fél országnak fizetsz." },
  { icon: PenTool, title: "Kreatív + szöveg", desc: "Hirdetésszövegek és vizuálok, amik kattintásra ösztönöznek, nem görgetésre." },
  { icon: BarChart3, title: "Mérés & riport", desc: "Konverziókövetés beállítva, havi riport: mire ment a pénz és mi jött vissza belőle." },
  { icon: Wallet, title: "Átlátható büdzsé", desc: "Tiszta keret, nincs eltűnő pénz. A hirdetési költséget te fizeted közvetlenül a platformnak." },
];

export default function HirdetesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Láthatóság & elérés"
        title="Google & Meta hirdetések"
        subtitle="Célzott kampányok, amik valódi érdeklődőket hoznak — átlátható büdzsével és mérhető megtérüléssel."
      />

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
          <h2 className="font-display text-3xl md:text-5xl font-bold text-gradient text-center mb-10">
            Hogyan dolgozom
          </h2>
          <ol className="space-y-3">
            {[
              "Megnézzük a célt: érdeklődő, foglalás, vásárlás vagy ismertség?",
              "Beállítom a kampányt, célzást, konverziókövetést és a kreatívokat.",
              "Indulás után heti figyelés, havi optimalizálás a számok alapján.",
              "Átlátható havi riport — mire ment a büdzsé és mi a megtérülés.",
            ].map((step, i) => (
              <li
                key={i}
                className="flex items-start gap-4 rounded-xl border border-white/5 bg-neutral-900/30 p-4"
              >
                <span className="flex-shrink-0 font-display font-bold text-fuchsia-400 text-lg w-7">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-neutral-200 text-sm md:text-base">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-20 bg-black">
        <div className="max-w-3xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6">
              <h3 className="font-bold text-emerald-400 mb-3">Amit ígérek</h3>
              <ul className="space-y-2 text-sm text-neutral-300">
                <li className="flex gap-2"><Check className="size-4 text-emerald-400 flex-shrink-0 mt-0.5" /> Korrekt beállítás és konverziókövetés</li>
                <li className="flex gap-2"><Check className="size-4 text-emerald-400 flex-shrink-0 mt-0.5" /> Átlátható, érthető havi riport</li>
                <li className="flex gap-2"><Check className="size-4 text-emerald-400 flex-shrink-0 mt-0.5" /> Folyamatos optimalizálás az adatok alapján</li>
                <li className="flex gap-2"><Check className="size-4 text-emerald-400 flex-shrink-0 mt-0.5" /> A hirdetési pénzed a tiéd marad (platformnak fizeted)</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-6">
              <h3 className="font-bold text-red-400 mb-3">Amit NEM ígérek</h3>
              <ul className="space-y-2 text-sm text-neutral-300">
                <li>• „Garantált X vásárló" — a piac dönt, nem ígérgetek</li>
                <li>• Azonnali csoda az első héten</li>
                <li>• Olcsó kattintás minden áron, rossz minőségű forgalommal</li>
                <li>• Eltitkolt költségek és átláthatatlan számlák</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <ContactCTA heading="Indítsunk egy kampányt" />
    </>
  );
}
