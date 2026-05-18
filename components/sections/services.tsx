"use client";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { Code2, Smartphone, Search, ShoppingCart, Palette, Wrench, Layers } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export function Services() {
  const items = [
    {
      title: "Egyedi weboldalak",
      description: "Designtól a publikálásig — gyors, reszponzív, márkára szabott. Next.js + Tailwind stack.",
      icon: <Code2 className="h-5 w-5 text-neutral-300" />,
      className: "md:col-span-2",
    },
    {
      title: "Webáruház",
      description: "Shopify, WooCommerce, custom — fizetéssel, szállítással, riportokkal.",
      icon: <ShoppingCart className="h-5 w-5 text-neutral-300" />,
    },
    {
      title: "SEO optimalizálás",
      description: "Technikai és tartalmi SEO. Első helyre a Google találatok között.",
      icon: <Search className="h-5 w-5 text-neutral-300" />,
    },
    {
      title: "Mobil-first design",
      description: "Telefonon is gyönyörű és villámgyors. Mert a látogatók 70%-a mobilról jön.",
      icon: <Smartphone className="h-5 w-5 text-neutral-300" />,
    },
    {
      title: "Branding & UI design",
      description: "Logó, színpaletta, tipográfia — egységes vizuális identitás.",
      icon: <Palette className="h-5 w-5 text-neutral-300" />,
      className: "md:col-span-2",
    },
    {
      title: "Karbantartás",
      description: "Frissítések, biztonsági mentés, hibajavítás — havidíjas csomagban.",
      icon: <Wrench className="h-5 w-5 text-neutral-300" />,
    },
  ];
  return (
    <section id="szolgaltatasok" className="relative py-24 md:py-32 overflow-hidden">
      <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)] -z-10" />
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-wider text-neutral-400 mb-4">
            <Layers className="size-3" /> Szolgáltatások
          </div>
          <h2 className="font-display text-4xl md:text-6xl font-bold text-gradient mb-4">
            Minden, amire egy <span className="text-gradient-brand">prémium</span> oldalhoz szükség van
          </h2>
          <p className="text-neutral-400 text-base md:text-lg">
            Designtól a launch-ig — és azon túl is. Egy emberrel beszélsz, egy emberrel dolgozol.
          </p>
        </motion.div>
        <BentoGrid className="md:auto-rows-[12rem]">
          {items.map((it, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.05 }}
              className={it.className}
            >
              <BentoGridItem {...it} />
            </motion.div>
          ))}
        </BentoGrid>
        <div className="text-center mt-12">
          <Link href="/szolgaltatasok" className="inline-flex items-center gap-2 text-sm text-neutral-300 hover:text-white">
            Összes szolgáltatás megtekintése →
          </Link>
        </div>
      </div>
    </section>
  );
}
