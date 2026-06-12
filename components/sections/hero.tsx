"use client";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles, BadgePercent } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { Spotlight } from "@/components/ui/spotlight";
import { Meteors } from "@/components/ui/meteors";
import { ShimmerButton } from "@/components/ui/shimmer-button";

const VERBS = [
  { word: "Megépítjük", className: "text-gradient-brand" },
  { word: "Megtaláltatjuk", className: "text-gradient-reach" },
  { word: "Automatizáljuk", className: "text-gradient-ai" },
];

function VerbCycler() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % VERBS.length), 2200);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="relative inline-block align-baseline">
      <AnimatePresence mode="wait">
        <motion.span
          key={i}
          initial={{ y: "0.4em", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-0.4em", opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className={`inline-block ${VERBS[i].className}`}
        >
          {VERBS[i].word}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

const PILLARS = [
  { label: "Jelenlét", dot: "bg-blue-400" },
  { label: "Láthatóság & elérés", dot: "bg-fuchsia-400" },
  { label: "AI & automatizálás", dot: "bg-emerald-400" },
];

export function Hero() {
  return (
    <AuroraBackground className="min-h-[100svh]">
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <Meteors number={16} />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 flex flex-col gap-7 items-center justify-center px-4 max-w-5xl text-center"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm text-white/80 backdrop-blur-sm"
        >
          <Sparkles className="size-3.5 text-emerald-400" /> Digitális partner vállalkozásoknak — Maczkó Márk
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.35 }}
        >
          <Link
            href="/arkalkulator"
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-emerald-500 px-4 py-1.5 text-sm font-semibold text-black shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 transition-shadow"
          >
            <BadgePercent className="size-4" />
            Akció: egyszeri díjakra −20%, havidíjakra −10%
            <ArrowRight className="size-3.5 transition group-hover:translate-x-0.5" />
          </Link>
        </motion.div>

        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight">
          <span className="block min-h-[1.1em]">
            <VerbCycler />
          </span>
          <span className="block bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/50">
            a vállalkozásod.
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-base md:text-xl text-neutral-300/90 max-w-2xl"
        >
          Segítek a cégeknek digitálisan növekedni — a weboldaltól és a Google/Meta
          hirdetésektől a kereső- és AI-láthatóságig, és az AI beépítéséig a mindennapokba.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75 }}
          className="flex flex-wrap items-center justify-center gap-2"
        >
          {PILLARS.map((p) => (
            <span
              key={p.label}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-neutral-300"
            >
              <span className={`size-1.5 rounded-full ${p.dot}`} /> {p.label}
            </span>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85 }}
          className="flex flex-col sm:flex-row gap-3 mt-2"
        >
          <Link href="/kapcsolat">
            <ShimmerButton>
              Kérek árajánlatot <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
            </ShimmerButton>
          </Link>
          <Link
            href="/szolgaltatasok"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm px-7 py-3 text-sm font-medium text-white hover:bg-white/10 transition"
          >
            Mit tudok nyújtani?
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="mt-10 flex items-center gap-6 text-xs text-neutral-400"
        >
          <span className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-emerald-400 animate-pulse" /> Új projekt fogadása
          </span>
          <span>PageSpeed 95+</span>
          <span className="hidden sm:inline">24h válaszidő</span>
        </motion.div>
      </motion.div>
    </AuroraBackground>
  );
}
