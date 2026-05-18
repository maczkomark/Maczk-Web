import type { Metadata } from "next";
import { PageHeader } from "@/components/sections/page-header";
import { Process } from "@/components/sections/process";
import { ContactCTA } from "@/components/sections/contact-cta";
import { SITE } from "@/lib/utils";

export const metadata: Metadata = {
  title: "A folyamat — hogyan dolgozunk együtt",
  description:
    "Az első egyeztetéstől az élesítésig: 5 lépés, fix árral, fix határidővel. Heti előrehaladás, átláthatóan.",
  alternates: { canonical: `${SITE.url}/folyamat` },
};

export default function FolyamatPage() {
  return (
    <>
      <PageHeader
        eyebrow="Folyamat"
        title="Hogyan dolgozunk együtt"
        subtitle="5 lépés az ötlettől az élő weboldalig. Átláthatóan, határidőre, fix áron."
      />
      <Process />
      <ContactCTA heading="Kezdjük el az 1. lépést" />
    </>
  );
}
