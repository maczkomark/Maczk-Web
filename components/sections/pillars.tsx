"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, Hammer, Radar, Bot } from "lucide-react";
import { PILLARS, SERVICES } from "@/lib/utils";

const ICONS = { jelenlet: Hammer, lathatosag: Radar, ai: Bot } as const;

const ACCENT: Record<string, { ring: string; glow: string; text: string; dot: string }> = {
  brand: {
    ring: "hover:border-blue-500/40",
    glow: "from-blue-500/10",
    text: "text-gradient-brand",
    dot: "bg-blue-400",
  },
  reach: {
    ring: "hover:border-fuchsia-500/40",
    glow: "from-fuchsia-500/10",
    text: "text-gradient-reach",
    dot: "bg-fuchsia-400",
  },
  ai: {
    ring: "hover:border-emerald-500/40",
    glow: "from-emerald-500/10",
    text: "text-gradient-ai",
    dot: "bg-emerald-400",
  },
};

export function Pillars() {
  return (
    <section className="relative py-24 md:py-32 bg-neutral-950 overflow-hidden">
      <div className="bg-ai-glow absolute inset-x-0 top-0 h-64 -z-0" />
      <div className="relative max-w-7xl mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-wider text-neutral-400 mb-4">
            Hogyan segítek
          </div>
          <h2 className="font-display text-4xl md:text-6xl font-bold text-gradient mb-4">
            Három pillér, egy{" "}
            <span className="text-gradient-ai">digitális partner</span>
          </h2>
          <p className="text-neutral-400 text-base md:text-lg">
            A céged a digitális térben akkor nő, ha mindhárom kör működik: van mit
            megtalálni, megtalálnak, és a háttér magától megy. Mindháromban segítek.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
          {PILLARS.map((p, i) => {
            const Icon = ICONS[p.id];
            const a = ACCENT[p.accent];
            const services = SERVICES.filter((s) => p.services.includes(s.slug as never));
            return (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className={`group relative flex flex-col rounded-3xl border border-white/10 bg-neutral-900/40 p-7 transition-colors ${a.ring}`}
              >
                <div
                  className={`pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-b ${a.glow} to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
                />
                <div className="relative z-10 flex items-center justify-between mb-6">
                  <span className="inline-flex size-11 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                    <Icon className="size-5 text-white" />
                  </span>
                  <span className="font-display text-sm font-bold text-neutral-600">{p.num}</span>
                </div>
                <span className={`relative z-10 font-display text-sm font-semibold mb-1 ${a.text}`}>
                  {p.tagline}
                </span>
                <h3 className="relative z-10 font-display text-2xl font-bold text-white mb-2">
                  {p.title}
                </h3>
                <p className="relative z-10 text-sm text-neutral-400 mb-5">{p.short}</p>
                <ul className="relative z-10 mt-auto space-y-1.5">
                  {services.map((s) => (
                    <li key={s.slug}>
                      <Link
                        href={`/szolgaltatasok/${s.slug}`}
                        className="group/link flex items-center gap-2 text-sm text-neutral-300 hover:text-white transition-colors"
                      >
                        <span className={`size-1.5 rounded-full ${a.dot}`} />
                        <span className="flex-1">{s.title}</span>
                        <ArrowUpRight className="size-3.5 text-neutral-600 transition group-hover/link:text-white group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
