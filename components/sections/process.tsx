"use client";
import { Timeline } from "@/components/ui/timeline";

export function Process() {
  const data = [
    {
      title: "1. Egyeztetés",
      content: (
        <div>
          <p className="text-neutral-300 text-sm md:text-base mb-4">
            Ingyenes konzultáció — megismerem a vállalkozást, a célokat és a célközönséget. 30–60 perc, online vagy személyesen.
          </p>
          <ul className="text-sm text-neutral-400 space-y-1.5 list-disc pl-5">
            <li>Üzleti célok feltérképezése</li>
            <li>Konkurencia áttekintése</li>
            <li>Költségvetés és határidő egyeztetése</li>
          </ul>
        </div>
      ),
    },
    {
      title: "2. Tervezés",
      content: (
        <div>
          <p className="text-neutral-300 text-sm md:text-base mb-4">
            Wireframe és Figma design. Két körös review, mielőtt egy sor kódot írnék.
          </p>
          <ul className="text-sm text-neutral-400 space-y-1.5 list-disc pl-5">
            <li>Sitemap és felhasználói folyamatok</li>
            <li>Pixel-perfect Figma mockup minden oldalra</li>
            <li>Mobil + desktop verzió</li>
          </ul>
        </div>
      ),
    },
    {
      title: "3. Fejlesztés",
      content: (
        <div>
          <p className="text-neutral-300 text-sm md:text-base mb-4">
            Modern stack: Next.js, Tailwind, prémium animációk. Heti előrehaladás, kérdezhetsz bármikor.
          </p>
          <ul className="text-sm text-neutral-400 space-y-1.5 list-disc pl-5">
            <li>Tiszta, karbantartható kód</li>
            <li>Reszponzív minden eszközön</li>
            <li>SEO és accessibility a kezdetektől</li>
          </ul>
        </div>
      ),
    },
    {
      title: "4. Tesztelés",
      content: (
        <div>
          <p className="text-neutral-300 text-sm md:text-base mb-4">
            Reszponzív, sebesség, SEO, böngészők. PageSpeed 90+ a cél, és el is érjük.
          </p>
          <ul className="text-sm text-neutral-400 space-y-1.5 list-disc pl-5">
            <li>Cross-browser tesztelés</li>
            <li>Lighthouse audit &amp; Core Web Vitals</li>
            <li>Visszajelzés alapján finomítás</li>
          </ul>
        </div>
      ),
    },
    {
      title: "5. Élesítés és támogatás",
      content: (
        <div>
          <p className="text-neutral-300 text-sm md:text-base mb-4">
            Domain, hosting, analytics. Az első hónap utánkövetés ingyenes — utána havidíjas csomag.
          </p>
          <ul className="text-sm text-neutral-400 space-y-1.5 list-disc pl-5">
            <li>Google Analytics + Search Console beállítás</li>
            <li>1 hónap garancia minden hibára</li>
            <li>Oktató videó az adminhoz</li>
          </ul>
        </div>
      ),
    },
  ];
  return (
    <Timeline
      data={data}
      heading="A folyamat — átláthatóan"
      subheading="Az első beszélgetéstől az élesítésig — fix árral, fix határidővel, weekly check-innel."
    />
  );
}
