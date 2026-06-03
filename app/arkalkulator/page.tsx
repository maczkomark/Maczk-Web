import type { Metadata } from "next";
import { PageHeader } from "@/components/sections/page-header";
import { Calculator } from "@/components/sections/calculator";
import { ContactCTA } from "@/components/sections/contact-cta";
import { SITE } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Árkalkulátor — állítsd össze a csomagod",
  description:
    "Interaktív árkalkulátor: válaszd ki a weboldal-, marketing- és AI-szolgáltatásokat, és láss azonnal egy tájékoztató árat. Egyedi igény esetén személyre szabott ajánlat. Teljes árlista letölthető PDF-ben.",
  alternates: { canonical: `${SITE.url}/arkalkulator` },
  keywords: ["árkalkulátor", "weboldal ár", "weboldal készítés ár", "árlista", "Maczkó Web árak"],
};

export default function ArkalkulatorPage() {
  return (
    <>
      <PageHeader
        eyebrow="Árkalkulátor"
        title="Állítsd össze, mire van szükséged"
        subtitle="Jelöld be a szolgáltatásokat, és láss azonnal egy tájékoztató árat — majd egy kattintással küldd át nekem ajánlatkérésként. Egyedi igényre személyre szabott ajánlatot adok."
      />
      <Calculator />
      <ContactCTA heading="Inkább beszéljük meg élőben?" />
    </>
  );
}
