import type { Metadata } from "next";
import { PageHeader } from "@/components/sections/page-header";
import { Process } from "@/components/sections/process";
import { ContactCTA } from "@/components/sections/contact-cta";
import { SITE } from "@/lib/utils";

export const metadata: Metadata = {
  title: "A folyamat — hogyan dolgozunk együtt",
  description:
    "A felméréstől a folyamatos partnerségig: 5 lépés a céged digitális fejlődéséhez. Weboldal, hirdetés, láthatóság és AI — átláthatóan, határidőre.",
  alternates: { canonical: `${SITE.url}/folyamat` },
};

export default function FolyamatPage() {
  return (
    <>
      <PageHeader
        eyebrow="Folyamat"
        title="Hogyan dolgozunk együtt"
        subtitle="5 lépés a felméréstől a folyamatos digitális fejlődésig. Átláthatóan, határidőre, mérhető eredménnyel."
      />
      <Process />
      <ContactCTA heading="Kezdjük el az 1. lépést" />
    </>
  );
}
