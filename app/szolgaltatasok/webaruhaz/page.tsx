import type { Metadata } from "next";
import { PageHeader } from "@/components/sections/page-header";
import { Process } from "@/components/sections/process";
import { ContactCTA } from "@/components/sections/contact-cta";
import { SITE } from "@/lib/utils";
import { Check, ShoppingCart, CreditCard, Package, BarChart3, Truck, Tag } from "lucide-react";

export const metadata: Metadata = {
  title: "Webáruház készítés — Stripe, Barion, készletkezelés",
  description:
    "Egyedi webáruház készítés Shopify, WooCommerce vagy custom alapokon. Online fizetés, készletkezelés, automatizált rendelésfeldolgozás.",
  alternates: { canonical: `${SITE.url}/szolgaltatasok/webaruhaz` },
  keywords: ["webáruház készítés", "webshop készítés", "Shopify fejlesztő", "WooCommerce fejlesztő", "online bolt"],
};

const features = [
  { icon: ShoppingCart, title: "Egyedi termékkatalógus", desc: "Variánsok, méretek, színek, készlet — ahogy az üzletednek kell." },
  { icon: CreditCard, title: "Online fizetés", desc: "Stripe, Barion, Simple Pay — biztonságos, magyar nyelven." },
  { icon: Truck, title: "Szállítás integráció", desc: "GLS, Foxpost, Magyar Posta API integráció." },
  { icon: Package, title: "Készletkezelés", desc: "Automatikus készletfrissítés, alacsony készlet riasztás." },
  { icon: BarChart3, title: "Riportok", desc: "Forgalmi adatok, top termékek, kosár-elhagyás analitika." },
  { icon: Tag, title: "Kuponok, akciók", desc: "Kedvezménykódok, időszakos akciók, hűségprogram." },
];

export default function WebaruhazPage() {
  return (
    <>
      <PageHeader
        eyebrow="Szolgáltatás"
        title="Webáruház készítés"
        subtitle="Online értékesítés, ami tényleg konvertál — fizetéssel, szállítással, riportokkal."
      />
      <section className="py-20 bg-black">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-4">
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <div
                  key={f.title}
                  className="rounded-2xl border border-white/10 bg-neutral-900/40 p-6 hover:border-emerald-500/30 transition"
                >
                  <Icon className="size-6 text-emerald-400 mb-3" />
                  <h3 className="font-display text-lg font-bold text-white mb-1">{f.title}</h3>
                  <p className="text-sm text-neutral-400">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <section className="py-16 bg-neutral-950">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-gradient mb-4">
            Melyik platform a megfelelő?
          </h2>
          <p className="text-neutral-400 mb-12">A vállalkozásod méretétől, igényeitől és büdzsédtől függ.</p>
          <div className="grid md:grid-cols-3 gap-4 text-left">
            {[
              { name: "Shopify", desc: "Gyors setup, megbízható, havidíjas. Ideális kezdő/közepes shopnak.", best: "20–500 termék" },
              { name: "WooCommerce", desc: "WordPress alapú, rugalmasabb, olcsóbb hosting. Ideális magyar piacra.", best: "Bármilyen méret" },
              { name: "Custom (Next.js)", desc: "Maximális szabadság és sebesség. Nagyobb projektekhez.", best: "Skálázódó shop" },
            ].map((p) => (
              <div key={p.name} className="rounded-2xl border border-white/10 bg-neutral-900/40 p-6">
                <h3 className="font-display text-xl font-bold text-white mb-2">{p.name}</h3>
                <p className="text-sm text-neutral-400 mb-3">{p.desc}</p>
                <div className="text-xs uppercase tracking-wider text-emerald-400">{p.best}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Process />
      <ContactCTA heading="Kérj árajánlatot a webáruházra" />
    </>
  );
}
