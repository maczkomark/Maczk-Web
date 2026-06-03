import type { Metadata } from "next";
import { PageHeader } from "@/components/sections/page-header";
import { ContactCTA } from "@/components/sections/contact-cta";
import { SITE } from "@/lib/utils";
import { Check, CalendarClock, Mail, Receipt, Star, MessagesSquare, GraduationCap, Bot, Workflow } from "lucide-react";

export const metadata: Metadata = {
  title: "AI-automatizálás & AI-használat — kész megoldások mikrocégeknek",
  description:
    "Done-for-you AI-automatizálás helyi vállalkozásoknak: foglalás-visszaigazolás, e-mail- és számlakezelés, recenzió-kérés — kész, beüzemelve, havidíjas karbantartással. Plusz AI-használat betanítása a csapatodnak.",
  alternates: { canonical: `${SITE.url}/szolgaltatasok/ai-automatizalas` },
  keywords: [
    "AI automatizálás",
    "mesterséges intelligencia vállalkozásoknak",
    "folyamatautomatizálás",
    "AI betanítás",
    "AI integráció",
    "ügyfélszolgálat automatizálás",
  ],
};

const useCases = [
  { icon: CalendarClock, title: "Foglalás & emlékeztető", desc: "Automatikus visszaigazolás és emlékeztető — kevesebb lemondás, nulla kézi munka." },
  { icon: Mail, title: "Ügyfél-e-mailek", desc: "Beérkező megkeresések rendezése, gyors válasz-sablonok, AI-előszűrés." },
  { icon: Receipt, title: "Számla & adminisztráció", desc: "Számlafeldolgozás, adatkinyerés, ismétlődő papírmunka automatizálása." },
  { icon: Star, title: "Recenzió-kérés", desc: "Vásárlás után automatikus, jól időzített vélemény-kérés — több és jobb értékelés." },
  { icon: MessagesSquare, title: "Chat & gyakori kérdések", desc: "AI-asszisztens a weboldaladon, ami a tipikus kérdésekre azonnal válaszol." },
  { icon: Workflow, title: "Egyedi folyamat", desc: "Van egy ismétlődő, idegesítő, kézi folyamatod? Megnézzük, automatizálható-e." },
];

export default function AiAutomatizalasPage() {
  return (
    <>
      <PageHeader
        eyebrow="AI & automatizálás"
        title="AI, ami dolgozik helyetted"
        subtitle="Nem PowerPoint és nem tanácsadás — kész, beüzemelt automatizálás. Plusz megtanítom a csapatodat is használni az AI-t a mindennapokban."
      />

      <section className="py-16 bg-neutral-950">
        <div className="max-w-3xl mx-auto px-4">
          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.05] p-6 md:p-8">
            <div className="flex items-center gap-3 mb-3">
              <Bot className="size-6 text-emerald-400" />
              <h2 className="font-display text-2xl font-bold text-white">Done-for-you, nem „csináld magad"</h2>
            </div>
            <p className="text-neutral-300 text-sm md:text-base leading-relaxed">
              A legtöbb kisvállalkozás tudja, hogy le van maradva az AI-ban — de nincs ideje és
              tudása felzárkózni. Én a hidat adom a technológia és a hétköznapi működés között:
              kiválasztunk egy konkrét fájdalompontot, és kapsz rá egy <strong>működő megoldást</strong>,
              beüzemelve, havidíjas karbantartással. A gép dolgozik, te a szakmádra koncentrálsz.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-black">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="font-display text-3xl md:text-5xl font-bold text-gradient text-center mb-10">
            Mit lehet automatizálni?
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {useCases.map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.title}
                  className="rounded-2xl border border-white/10 bg-neutral-900/40 p-6 hover:border-emerald-500/30 transition"
                >
                  <Icon className="size-6 text-emerald-400 mb-3" />
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
          <div className="rounded-2xl border border-white/10 bg-neutral-900/40 p-6 md:p-8">
            <div className="flex items-center gap-3 mb-3">
              <GraduationCap className="size-6 text-emerald-400" />
              <h2 className="font-display text-2xl font-bold text-white">AI-használat betanítása</h2>
            </div>
            <p className="text-neutral-300 text-sm md:text-base leading-relaxed mb-4">
              Nem csak megépítem — meg is mutatom. Gyakorlati, a ti folyamataitokra szabott
              tréning, hogy a csapatod magabiztosan használja az AI-eszközöket a napi munkában:
            </p>
            <ul className="grid sm:grid-cols-2 gap-2 text-sm text-neutral-300">
              {[
                "Melyik feladatra melyik AI-eszköz",
                "Jó promptok a ti szakmátokra",
                "Tartalom- és e-mail-írás gyorsabban",
                "Adatok, dokumentumok feldolgozása",
                "Mire NE használd (adatvédelem, hibák)",
                "Bevezetés lépésről lépésre",
              ].map((t) => (
                <li key={t} className="flex gap-2">
                  <Check className="size-4 text-emerald-400 flex-shrink-0 mt-0.5" /> {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="py-20 bg-black">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="font-display text-3xl md:text-5xl font-bold text-gradient text-center mb-4">
            Őszintén
          </h2>
          <p className="text-center text-neutral-400 mb-10">
            Az AI hasznos eszköz, nem varázspálca. Ezt vállalom — és ezt nem:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6">
              <h3 className="font-bold text-emerald-400 mb-3">Amit ígérek</h3>
              <ul className="space-y-2 text-sm text-neutral-300">
                <li className="flex gap-2"><Check className="size-4 text-emerald-400 flex-shrink-0 mt-0.5" /> Működő, beüzemelt megoldás — nem prezentáció</li>
                <li className="flex gap-2"><Check className="size-4 text-emerald-400 flex-shrink-0 mt-0.5" /> Mérhető időmegtakarítás (órában)</li>
                <li className="flex gap-2"><Check className="size-4 text-emerald-400 flex-shrink-0 mt-0.5" /> Érthető magyarázat, betanítás</li>
                <li className="flex gap-2"><Check className="size-4 text-emerald-400 flex-shrink-0 mt-0.5" /> Havidíjas karbantartás, ha elromlik, javítom</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-6">
              <h3 className="font-bold text-red-400 mb-3">Amit NEM ígérek</h3>
              <ul className="space-y-2 text-sm text-neutral-300">
                <li>• Hogy az AI mindent megold ember nélkül</li>
                <li>• Az alkalmazottaid lecserélését</li>
                <li>• 100%-os pontosság minden esetben (ellenőrzés kell)</li>
                <li>• Drága, túlbonyolított „AI-stratégiát" papíron</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <ContactCTA heading="Mit automatizáljunk először?" />
    </>
  );
}
