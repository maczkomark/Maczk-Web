"use client";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Mail } from "lucide-react";

const FORM_ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT || "/api/quote";
const FORM_TOKEN = process.env.NEXT_PUBLIC_FORM_TOKEN || "";

export function ContactCTA({ heading = "Kérj árajánlatot" }: { heading?: string }) {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd.entries());
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        let msg = "Hiba történt — próbáld újra.";
        try {
          const j = await res.json();
          if (j?.error) msg = j.error;
        } catch {}
        throw new Error(msg);
      }
      setSent(true);
      (e.target as HTMLFormElement).reset();
    } catch (err: any) {
      setError(err?.message ?? "Ismeretlen hiba.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section
      id="kapcsolat"
      className="relative h-auto min-h-[40rem] w-full bg-neutral-950 overflow-hidden flex flex-col items-center justify-center antialiased py-24"
    >
      <BackgroundBeams />
      <div className="max-w-2xl mx-auto p-4 relative z-10 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="font-display text-4xl md:text-6xl text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 font-bold">
            {heading}
          </h2>
          <p className="text-neutral-400 max-w-lg mx-auto my-4 text-base text-center">
            Írd le pár sorban a projektet — 24 órán belül visszajelzek egy konkrét árajánlattal és időtervvel.
          </p>
        </motion.div>

        {sent ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-8 text-center"
          >
            <CheckCircle2 className="size-12 text-emerald-400 mx-auto mb-3" />
            <h3 className="text-xl font-bold text-white mb-2">Köszönöm az üzenetet!</h3>
            <p className="text-neutral-300 text-sm">24 órán belül visszaírok az árajánlattal.</p>
          </motion.div>
        ) : (
          <form onSubmit={onSubmit} className="space-y-4 mt-2">
            {FORM_TOKEN && <input type="hidden" name="_token" value={FORM_TOKEN} />}
            <input type="text" name="_honeypot" tabIndex={-1} autoComplete="off" className="absolute -left-[9999px] opacity-0 pointer-events-none" aria-hidden="true" />
            <div className="grid md:grid-cols-2 gap-4">
              <input
                name="name"
                required
                placeholder="Neved *"
                className="w-full rounded-lg border border-white/10 bg-neutral-900/50 px-4 py-3 text-sm text-white placeholder:text-neutral-500 focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/30 transition"
              />
              <input
                name="email"
                type="email"
                required
                placeholder="Email cím *"
                className="w-full rounded-lg border border-white/10 bg-neutral-900/50 px-4 py-3 text-sm text-white placeholder:text-neutral-500 focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/30 transition"
              />
            </div>
            <input
              name="phone"
              placeholder="Telefonszám (opcionális)"
              className="w-full rounded-lg border border-white/10 bg-neutral-900/50 px-4 py-3 text-sm text-white placeholder:text-neutral-500 focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/30 transition"
            />
            <select
              name="type"
              required
              className="w-full rounded-lg border border-white/10 bg-neutral-900/50 px-4 py-3 text-sm text-white focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/30 transition"
            >
              <option value="">Mire lenne szükséged? *</option>
              <option>Bemutatkozó weboldal</option>
              <option>Webáruház</option>
              <option>Landing page / kampányoldal</option>
              <option>Régi oldal felújítása</option>
              <option>SEO optimalizálás</option>
              <option>GEO — AI-keresős láthatóság</option>
              <option>Google & Meta hirdetések</option>
              <option>AI-automatizálás / AI-betanítás</option>
              <option>Egyéb</option>
            </select>
            <textarea
              name="message"
              required
              rows={5}
              placeholder="Mesélj a projektről... *"
              className="w-full rounded-lg border border-white/10 bg-neutral-900/50 px-4 py-3 text-sm text-white placeholder:text-neutral-500 focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/30 transition"
            />
            <button
              disabled={loading}
              className="group relative w-full rounded-lg bg-gradient-to-r from-blue-500 via-violet-500 to-fuchsia-500 px-6 py-3.5 text-sm font-medium text-white transition hover:opacity-95 disabled:opacity-50 overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <Mail className="size-4" />
                {loading ? "Küldés..." : "Árajánlatot kérek"}
              </span>
              <span className="absolute inset-0 bg-[linear-gradient(110deg,transparent,rgba(255,255,255,0.4),transparent)] bg-[length:200%_100%] animate-shimmer" />
            </button>
            {error && <p className="text-center text-sm text-red-400">{error}</p>}
            <p className="text-xs text-center text-neutral-500">
              Az adataidat bizalmasan kezelem, nem osztom meg harmadik féllel.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
