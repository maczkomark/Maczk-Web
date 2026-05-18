"use client";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { Spotlight } from "@/components/ui/spotlight";
import { Meteors } from "@/components/ui/meteors";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { TextReveal } from "@/components/ui/text-reveal";

export function Hero() {
  return (
    <AuroraBackground className="min-h-[100svh]">
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />
      <div className="relative pointer-events-none absolute inset-0 overflow-hidden">
        <Meteors number={20} />
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
          <Sparkles className="size-3.5 text-blue-400" /> Új generációs weboldalak — Maczkó Márk
        </motion.div>

        <TextReveal
          as="h1"
          text="Weboldalak, amelyek eladnak."
          className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/50"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-base md:text-xl text-neutral-300/90 max-w-2xl"
        >
          Modern, villámgyors, SEO-barát weboldalak vállalkozóknak.
          Egyedi tervezés, prémium animációk, mérhető eredmények.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-3 mt-2"
        >
          <Link href="/kapcsolat">
            <ShimmerButton>
              Kérek árajánlatot <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
            </ShimmerButton>
          </Link>
          <Link
            href="/munkaim"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm px-7 py-3 text-sm font-medium text-white hover:bg-white/10 transition"
          >
            Munkáim megtekintése
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
