"use client";
import { Timeline } from "@/components/ui/timeline";

export function Process() {
  const data = [
    {
      title: "1. Felmérés",
      content: (
        <div>
          <p className="text-neutral-300 text-sm md:text-base mb-4">
            Ingyenes konzultáció — megismerem a vállalkozást, a célokat és azt, hol tartasz most a
            digitális térben. 30–60 perc, online vagy személyesen.
          </p>
          <ul className="text-sm text-neutral-400 space-y-1.5 list-disc pl-5">
            <li>Üzleti célok és célközönség feltérképezése</li>
            <li>Jelenlegi online jelenlét és láthatóság átnézése</li>
            <li>Legnagyobb fájdalompontok és gyors nyerők azonosítása</li>
          </ul>
        </div>
      ),
    },
    {
      title: "2. Terv & prioritások",
      content: (
        <div>
          <p className="text-neutral-300 text-sm md:text-base mb-4">
            Összerakjuk, mi hozza a legtöbb értéket a legkevesebb ráfordításból — legyen az weboldal,
            hirdetés, láthatóság vagy egy automatizálás. Fontossági sorrendben, érthető tervvel.
          </p>
          <ul className="text-sm text-neutral-400 space-y-1.5 list-disc pl-5">
            <li>Mit építsünk, mit hirdessünk, mit automatizáljunk</li>
            <li>Reális ütemterv és átlátható költségkeret</li>
            <li>Mérőszámok: miből látjuk majd, hogy működik</li>
          </ul>
        </div>
      ),
    },
    {
      title: "3. Megvalósítás",
      content: (
        <div>
          <p className="text-neutral-300 text-sm md:text-base mb-4">
            Megépítem és beüzemelem — weboldal, kampány, Google Cégprofil, GEO vagy AI-automatizálás.
            Heti előrehaladás, bármikor kérdezhetsz.
          </p>
          <ul className="text-sm text-neutral-400 space-y-1.5 list-disc pl-5">
            <li>Kész, működő megoldás — nem prezentáció</li>
            <li>Modern, gyors, megbízható technológia</li>
            <li>Betanítás: megmutatom, hogyan használd</li>
          </ul>
        </div>
      ),
    },
    {
      title: "4. Mérés & finomítás",
      content: (
        <div>
          <p className="text-neutral-300 text-sm md:text-base mb-4">
            Az adatok döntenek, nem az érzések. Megnézzük, mi működik, és finomítunk — hogy a
            befektetésed valóban megtérüljön.
          </p>
          <ul className="text-sm text-neutral-400 space-y-1.5 list-disc pl-5">
            <li>Konverziók, forgalom, megtérülés mérése</li>
            <li>Kampányok és tartalom optimalizálása</li>
            <li>Átlátható havi riport, érthető nyelven</li>
          </ul>
        </div>
      ),
    },
    {
      title: "5. Folyamatos partnerség",
      content: (
        <div>
          <p className="text-neutral-300 text-sm md:text-base mb-4">
            Nem hagylak magadra az élesítés után. Havidíjas konstrukcióban viszem tovább a céged
            digitális fejlődését — lépésről lépésre, ahogy nőtök.
          </p>
          <ul className="text-sm text-neutral-400 space-y-1.5 list-disc pl-5">
            <li>Karbantartás, frissítések, rendben tartás</li>
            <li>Új lehetőségek (AI, automatizálás) bevezetése</li>
            <li>Egy elérhető partner, aki ismeri a vállalkozásod</li>
          </ul>
        </div>
      ),
    },
  ];
  return (
    <Timeline
      data={data}
      heading="A folyamat — átláthatóan"
      subheading="Az első beszélgetéstől a folyamatos fejlődésig — érthetően, határidőre, mérhető eredménnyel."
    />
  );
}
