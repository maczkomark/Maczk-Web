import type { Metadata } from "next";
import { PageHeader } from "@/components/sections/page-header";
import { Faq } from "@/components/sections/faq";
import { ContactCTA } from "@/components/sections/contact-cta";
import { SITE } from "@/lib/utils";

export const metadata: Metadata = {
  title: "GYIK — gyakori kérdések",
  description:
    "Válaszok a leggyakoribb kérdésekre: ár, határidő, technológiák, garancia, karbantartás.",
  alternates: { canonical: `${SITE.url}/gyik` },
};

export default function GyikPage() {
  return (
    <>
      <PageHeader
        eyebrow="GYIK"
        title="Gyakori kérdések"
        subtitle="Ha másra is kíváncsi vagy, írj — egyetlen kérdés se 'túl sok'."
      />
      <Faq />
      <ContactCTA heading="Nincs köztük a kérdésed?" />
    </>
  );
}
