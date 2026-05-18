import type { Metadata } from "next";
import { PageHeader } from "@/components/sections/page-header";
import { Services } from "@/components/sections/services";
import { Process } from "@/components/sections/process";
import { ContactCTA } from "@/components/sections/contact-cta";
import { SITE, SERVICES } from "@/lib/utils";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Szolgáltatások — weboldal, webáruház, SEO",
  description:
    "Egyedi weboldalak, webáruházak, SEO és karbantartás magyar vállalkozóknak. Nézd meg a teljes szolgáltatási palettát.",
  alternates: { canonical: `${SITE.url}/szolgaltatasok` },
};

export default function SzolgaltatasokPage() {
  return (
    <>
      <PageHeader
        eyebrow="Szolgáltatások"
        title="Minden, amire egy prémium oldalhoz szükség van"
        subtitle="Designtól a launch-ig — és azon túl is. Egyedi árajánlat 24 órán belül."
      />
      <Services />
      <section className="py-16 bg-black">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="font-display text-2xl md:text-4xl font-bold text-gradient text-center mb-10">
            Részletes szolgáltatások
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {SERVICES.map((s) => (
              <Link
                key={s.slug}
                href={`/szolgaltatasok/${s.slug}`}
                className="group rounded-2xl border border-white/10 bg-neutral-900/40 p-6 hover:bg-neutral-900/70 transition"
              >
                <h3 className="font-display text-xl font-bold text-white mb-2">{s.title}</h3>
                <p className="text-sm text-neutral-400 mb-4">{s.short}</p>
                <span className="inline-flex items-center gap-1 text-sm text-blue-400 group-hover:gap-2 transition-all">
                  Részletek <ArrowRight className="size-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <Process />
      <ContactCTA />
    </>
  );
}
