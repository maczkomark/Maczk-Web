import type { Metadata } from "next";
import { PageHeader } from "@/components/sections/page-header";
import { Portfolio } from "@/components/sections/portfolio";
import { ContactCTA } from "@/components/sections/contact-cta";
import { SITE } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Munkáim — portfólió és esettanulmányok",
  description:
    "Friss webfejlesztési projektek: éttermek, webáruházak, portfólió oldalak, SaaS platformok. Interaktív 3D portfólió.",
  alternates: { canonical: `${SITE.url}/munkaim` },
};

export default function MunkaimPage() {
  return (
    <>
      <PageHeader
        eyebrow="Portfólió"
        title="Pár friss munkám"
        subtitle="Mozgasd a kurzort a kártyák felett — interaktív 3D élmény. Mert miért ne?"
      />
      <Portfolio />
      <ContactCTA heading="Te is itt szeretnél lenni a következő projektnél?" />
    </>
  );
}
