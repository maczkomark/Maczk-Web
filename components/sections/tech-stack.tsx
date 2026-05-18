"use client";
import { Marquee } from "@/components/ui/marquee";
import { motion } from "framer-motion";

const techs = [
  "Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js", "PostgreSQL",
  "WordPress", "Shopify", "Figma", "Vercel", "Supabase", "Stripe", "Framer Motion", "GSAP",
];

const TechCard = ({ name }: { name: string }) => (
  <div className="relative flex h-16 w-44 cursor-pointer items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] px-6 backdrop-blur-sm transition hover:bg-white/[0.08] hover:border-white/20 group">
    <span className="text-sm font-medium text-white/80 group-hover:text-white transition">{name}</span>
    <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition pointer-events-none bg-gradient-to-r from-blue-500/10 via-violet-500/10 to-fuchsia-500/10" />
  </div>
);

export function TechStack() {
  return (
    <section className="relative w-full overflow-hidden py-20 bg-black border-y border-white/5">
      <motion.h3
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center text-xs uppercase tracking-[0.3em] text-neutral-500 mb-10"
      >
        Technológiák, amikkel dolgozom
      </motion.h3>
      <Marquee pauseOnHover className="[--duration:35s]">
        {techs.map((t) => <TechCard key={t} name={t} />)}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:40s] mt-4">
        {techs.slice().reverse().map((t) => <TechCard key={t} name={t} />)}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-black to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-black to-transparent" />
    </section>
  );
}
