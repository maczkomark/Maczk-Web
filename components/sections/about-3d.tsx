"use client";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Spotlight } from "@/components/ui/spotlight";
import { SplineScene } from "@/components/ui/splite";
import { SITE } from "@/lib/utils";

export function About3D() {
  return (
    <section id="rolam" className="relative py-24 md:py-32 bg-black">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-wider text-emerald-400 mb-4">
            Rólam
          </div>
          <h2 className="font-display text-4xl md:text-6xl font-bold text-gradient">
            {SITE.owner} — a céged digitalizációs asszisztense
          </h2>
        </motion.div>
        <Card className="w-full h-[500px] bg-black/[0.96] relative overflow-hidden">
          <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />
          <div className="flex h-full flex-col md:flex-row">
            <div className="flex-1 p-8 md:p-12 relative z-10 flex flex-col justify-center">
              <h3 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 mb-4">
                Egy ember, aki végigviszi a digitális fejlődésedet.
              </h3>
              <p className="text-neutral-300 max-w-lg mb-3">
                Maczkó Márk vagyok. Nem „csak" weboldalt készítek — segítek a vállalkozásodnak
                belépni és növekedni a digitális térben: weboldaltól és webáruháztól a Google/Meta
                hirdetésig, a kereső- és AI-láthatóságig, és az AI beépítéséig a mindennapjaitokba.
              </p>
              <p className="text-neutral-400 text-sm max-w-lg">
                Nem ügynökség, nem outsource — egy felelős, egy kapcsolat. A technológiát fordítom
                le a gyakorlatra: konkrét, működő megoldások, magyarul, érthetően, határidőre.
              </p>
            </div>
            <div className="flex-1 relative min-h-[300px]">
              <SplineScene
                scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                className="w-full h-full"
              />
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
