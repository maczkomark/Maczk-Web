"use client";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { motion } from "framer-motion";

const faqs = [
  {
    q: "Mennyibe kerül egy weboldal?",
    a: "Az ár a projekt méretétől és a funkcióktól függ. Minden oldalra egyedi árajánlatot készítek 24 órán belül egy rövid egyeztetés után — így pontosan azt fizeted, amire szükséged van, sem többet, sem kevesebbet.",
  },
  {
    q: "Mennyi ideig tart az elkészítés?",
    a: "Egy bemutatkozó oldal általában 2–3 hét, egy webáruház 4–8 hét. A pontos határidőt a tervezési fázisban véglegesítjük, és tartom is.",
  },
  {
    q: "Magam is tudom majd szerkeszteni az oldalt?",
    a: "Igen — minden oldalhoz egyszerű admin felületet (CMS) adok, illetve videós oktatást, hogy bátran tudd kezelni. Nem kell programozói tudás.",
  },
  {
    q: "Domain és tárhely benne van az árban?",
    a: "Az első év domain regisztráció és prémium hosting az árajánlat része. A második évtől átlátható havi/éves díj, vagy átveheted te is.",
  },
  {
    q: "Mi van, ha valami elromlik később?",
    a: "Az átadás után 1 hónap garanciát adok minden hibára. Ezután havidíjas karbantartási csomag is választható: frissítések, mentések, gyors hibajavítás.",
  },
  {
    q: "Régi oldalt is fel tudsz újítani?",
    a: "Igen. Megnézem a meglévő oldalt, és javaslatot teszek vagy a felújításra (gyorsabb, olcsóbb), vagy egy új oldal készítésére (modern stack, sokáig tart).",
  },
  {
    q: "Hogyan dolgozunk együtt — online vagy személyesen?",
    a: "Mindkettő mehet. Szombathelyen és Vas vármegyében elérhető vagyok személyesen, országosan pedig online (Google Meet/Zoom). A teljes folyamat 100%-ban végigvihető online is.",
  },
  {
    q: "Csak weboldalt készítesz, vagy mást is?",
    a: "Sokkal többet. A céged teljes digitális fejlődésében segítek: weboldal és webáruház, SEO és AI-keresős láthatóság (GEO), Google Cégprofil, Google és Meta (Facebook/Instagram) hirdetések, valamint AI-automatizálás és AI-betanítás. Tekints rám a vállalkozásod digitalizációs asszisztenseként.",
  },
  {
    q: "Mit jelent az AI-automatizálás egy kis cégnek?",
    a: "Azt, hogy az ismétlődő, időrabló feladatokat a gép végzi: foglalás-visszaigazolás, e-mail-rendezés, számlafeldolgozás, recenzió-kérés. Kész, beüzemelt megoldást adok — nem tanácsadást vagy prezentációt —, és meg is tanítom a csapatodat használni az AI-eszközöket.",
  },
  {
    q: "Mi az a GEO, és miért fontos?",
    a: "A GEO (generative engine optimization) a SEO következő rétege: arra optimalizál, hogy a céged megjelenjen a ChatGPT és a Google AI válaszaiban is, ne csak a klasszikus találati listán. Egyre többen kérdezik az AI-t ajánlásért — érdemes ott is láthatónak lenni.",
  },
  {
    q: "Garantálod, hogy első leszek a Google-ben?",
    a: "Senki nem tud ilyet ígérni — ha mégis, hazudik. Amit garantálok: technikailag tökéletes alapot, releváns kulcsszavakat, gyors oldalt és tartalomstratégiát. Ezekkel a top 10-be kerülni 3–6 hónap, az élre 6–12 — a kompetíciótól függően.",
  },
];

export function Faq() {
  return (
    <section id="gyik" className="py-24 bg-black">
      <div className="max-w-3xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-wider text-amber-400 mb-4">
            GYIK
          </div>
          <h2 className="font-display text-4xl md:text-6xl font-bold text-gradient">Gyakori kérdések</h2>
        </motion.div>
        <Accordion type="single" collapsible className="text-neutral-200">
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger className="text-base md:text-lg">{f.q}</AccordionTrigger>
              <AccordionContent className="text-base">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
