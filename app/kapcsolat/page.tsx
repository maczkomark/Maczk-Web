import type { Metadata } from "next";
import { PageHeader } from "@/components/sections/page-header";
import { ContactCTA } from "@/components/sections/contact-cta";
import { SITE } from "@/lib/utils";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Kapcsolat — kérj árajánlatot",
  description:
    "Vedd fel velem a kapcsolatot — email, telefon, vagy az online űrlap. 24 órán belül válaszolok minden megkeresésre.",
  alternates: { canonical: `${SITE.url}/kapcsolat` },
};

const contacts = [
  { icon: Mail, label: "Email", value: SITE.email, href: `mailto:${SITE.email}` },
  { icon: Phone, label: "Telefon", value: SITE.phone, href: `tel:${SITE.phone.replace(/\s/g, "")}` },
  { icon: MapPin, label: "Helyszín", value: `${SITE.city}, ${SITE.country}` },
  { icon: Clock, label: "Válaszidő", value: "Átlagosan 24 órán belül" },
];

export default function KapcsolatPage() {
  return (
    <>
      <PageHeader
        eyebrow="Kapcsolat"
        title="Beszélgessünk a projektedről"
        subtitle="24 órán belül visszajelzek minden megkeresésre. Konzultáció ingyenes."
      />
      <section className="py-12 bg-black">
        <div className="max-w-4xl mx-auto px-4 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {contacts.map((c) => {
            const Icon = c.icon;
            const inner = (
              <>
                <Icon className="size-5 text-blue-400 mb-3" />
                <div className="text-xs uppercase tracking-wider text-neutral-500 mb-1">{c.label}</div>
                <div className="text-white font-medium">{c.value}</div>
              </>
            );
            return c.href ? (
              <a
                key={c.label}
                href={c.href}
                className="rounded-2xl border border-white/10 bg-neutral-900/40 p-5 hover:bg-neutral-900/70 transition"
              >
                {inner}
              </a>
            ) : (
              <div key={c.label} className="rounded-2xl border border-white/10 bg-neutral-900/40 p-5">
                {inner}
              </div>
            );
          })}
        </div>
      </section>
      <ContactCTA heading="Kérj konkrét árajánlatot" />
    </>
  );
}
