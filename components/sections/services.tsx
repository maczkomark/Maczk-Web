"use client";
import { Code2, Search, ShoppingCart, Wrench, Layers, Sparkles, Megaphone, Bot, GraduationCap } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export function Services() {
  const items = [
    {
      title: "Egyedi weboldalak",
      description: "Designtól a publikálásig — gyors, reszponzív, márkára szabott. Next.js + Tailwind stack.",
      icon: <Code2 className="h-5 w-5 text-blue-400" />,
    },
    {
      title: "Webáruház",
      description: "Stripe, Barion, WooCommerce — fizetéssel, szállítással, riportokkal.",
      icon: <ShoppingCart className="h-5 w-5 text-blue-400" />,
    },
    {
      title: "SEO optimalizálás",
      description: "Technikai és tartalmi SEO. Első helyre a Google találatok között.",
      icon: <Search className="h-5 w-5 text-fuchsia-400" />,
    },
    {
      title: "GEO — AI-keresős láthatóság",
      description: "Hogy a céged megjelenjen a ChatGPT és a Google AI válaszaiban is. Google Cégprofil rendben tartva.",
      icon: <Sparkles className="h-5 w-5 text-fuchsia-400" />,
    },
    {
      title: "Google & Meta hirdetések",
      description: "Célzott Google- és Facebook/Instagram-kampányok, mérhető megtérüléssel.",
      icon: <Megaphone className="h-5 w-5 text-fuchsia-400" />,
    },
    {
      title: "AI-automatizálás",
      description: "Foglalás-visszaigazoló, e-mail- és számlakezelés, recenzió-kérő — kész, beüzemelve. A gép dolgozik helyetted.",
      icon: <Bot className="h-5 w-5 text-emerald-400" />,
    },
    {
      title: "AI-használat betanítása",
      description: "Megmutatom a csapatodnak, hogyan spórolj napi órákat AI-eszközökkel — a ti folyamataitokra szabva.",
      icon: <GraduationCap className="h-5 w-5 text-emerald-400" />,
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-fr">
          {items.map((it, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: (i % 4) * 0.05 }}
              className="h-full"
            >
              <div className="group/bento h-full flex flex-col rounded-2xl border border-white/[0.08] bg-neutral-900/60 p-6 backdrop-blur-sm transition-all duration-300 hover:border-white/[0.18] hover:shadow-2xl hover:shadow-blue-500/[0.08]">
                <div className="mb-4 inline-flex size-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition group-hover/bento:-translate-y-0.5">
                  {it.icon}
                </div>
                <h3 className="font-display text-lg font-bold text-white mb-1.5">{it.title}</h3>
                <p className="font-sans text-sm text-neutral-400 leading-relaxed">{it.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link href="/szolgaltatasok" className="inline-flex items-center gap-2 text-sm text-neutral-300 hover:text-white">
            Összes szolgáltatás megtekintése →
          </Link>
        </div>
      </div>
    </section>
  );
}
