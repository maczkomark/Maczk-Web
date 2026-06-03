"use client";
import { motion } from "framer-motion";
import { Layers, Handshake, Bot, Clock } from "lucide-react";

const items = [
  { icon: Layers, label: "Egy kézből, A-tól Z-ig", desc: "Weboldal, hirdetés, láthatóság és AI — egy felelőssel" },
  { icon: Handshake, label: "Helyi, gyakorlati partner", desc: "Nem ügynökség — érthető, kézzelfogható megoldások" },
  { icon: Bot, label: "AI-fókusz", desc: "A céged az AI irányába, mérhető időmegtakarítással" },
  { icon: Clock, label: "Gyors válaszidő", desc: "Átlagosan 24 órán belül visszajelzek" },
];

export function Stats() {
  return (
    <section className="relative py-24 bg-gradient-to-b from-black via-neutral-950 to-black border-y border-white/5">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-4">
        {items.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="rounded-2xl border border-white/10 bg-neutral-900/40 p-6 text-center hover:border-white/20 transition"
            >
              <Icon className="size-7 text-neutral-300 mx-auto mb-3" />
              <div className="font-display text-lg md:text-xl font-bold text-white">{s.label}</div>
              <p className="mt-1 text-xs md:text-sm text-neutral-400">{s.desc}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
