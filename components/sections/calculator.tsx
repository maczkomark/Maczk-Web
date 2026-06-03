"use client";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Check, Download, Send, CheckCircle2, Calculator as CalcIcon, Info, Minus, Plus } from "lucide-react";
import {
  PACKAGES,
  MAINTENANCE,
  GROUPS,
  CLIENT_TYPES,
  INDUSTRIES,
  CYCLES,
  EXTRA_PAGE_PRICE,
  formatFt,
  type PriceItem,
} from "@/lib/pricing";

const FORM_ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT || "/api/quote";
const FORM_TOKEN = process.env.NEXT_PUBLIC_FORM_TOKEN || "";

const ACCENT_DOT: Record<string, string> = {
  brand: "bg-blue-400",
  reach: "bg-fuchsia-400",
  ai: "bg-emerald-400",
  neutral: "bg-neutral-400",
};
const ACCENT_SEL: Record<string, string> = {
  brand: "border-blue-500/50 bg-blue-500/[0.07]",
  reach: "border-fuchsia-500/50 bg-fuchsia-500/[0.07]",
  ai: "border-emerald-500/50 bg-emerald-500/[0.07]",
  neutral: "border-white/30 bg-white/[0.05]",
};

function priceLabel(it: PriceItem) {
  if (it.custom) return "Egyedi";
  const parts: string[] = [];
  if (it.once) parts.push(formatFt(it.once) + (it.hours ? " / óra" : ""));
  if (it.monthly) parts.push(formatFt(it.monthly) + " / hó");
  return parts.join(" + ") || "—";
}

export function Calculator() {
  const [packageId, setPackageId] = useState<string | null>(null);
  const [extraPages, setExtraPages] = useState(0);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [hours, setHours] = useState<Record<string, number>>({});
  const [maintId, setMaintId] = useState<string | null>(null);
  const [clientTypeId, setClientTypeId] = useState("kkv");
  const [industryId, setIndustryId] = useState("altalanos");
  const [cycleId, setCycleId] = useState("havi");
  const [requestCustom, setRequestCustom] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clientType = CLIENT_TYPES.find((c) => c.id === clientTypeId)!;
  const industry = INDUSTRIES.find((i) => i.id === industryId)!;
  const cycle = CYCLES.find((c) => c.id === cycleId)!;

  function toggle(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  const calc = useMemo(() => {
    const pkg = PACKAGES.find((p) => p.id === packageId) || null;
    const allItems = GROUPS.flatMap((g) => g.items);
    const chosen = allItems.filter((i) => selected.has(i.id));
    const maint = MAINTENANCE.find((m) => m.id === maintId) || null;

    let onceSum = 0;
    let monthlySum = 0;
    let hasCustom = false;
    const lines: { name: string; price: string }[] = [];

    if (pkg) {
      onceSum += pkg.once || 0;
      monthlySum += pkg.monthly || 0;
      lines.push({ name: `Csomag: ${pkg.name}`, price: priceLabel(pkg) });
    }
    if (extraPages > 0) {
      onceSum += extraPages * EXTRA_PAGE_PRICE;
      lines.push({ name: `Extra aloldal × ${extraPages}`, price: formatFt(extraPages * EXTRA_PAGE_PRICE) });
    }
    chosen.forEach((i) => {
      if (i.custom) {
        hasCustom = true;
        lines.push({ name: i.name, price: "Egyedi" });
        return;
      }
      const qty = i.hours ? hours[i.id] || 1 : 1;
      if (i.once) onceSum += i.once * qty;
      if (i.monthly) monthlySum += i.monthly;
      lines.push({ name: i.hours ? `${i.name} × ${qty} óra` : i.name, price: priceLabel(i) });
    });
    if (maint) {
      monthlySum += maint.monthly || 0;
      lines.push({ name: maint.name, price: priceLabel(maint) });
    }

    const mult = clientType.mult * industry.mult;
    const onceTotal = onceSum * mult;
    const monthlyBase = monthlySum * mult;
    const monthlyTotal = monthlyBase * (1 - cycle.discount);
    const needsTalk = hasCustom || requestCustom;

    return { onceTotal, monthlyTotal, mult, hasCustom, needsTalk, lines, monthlySum };
  }, [packageId, extraPages, selected, hours, maintId, clientType, industry, cycle, requestCustom]);

  function buildSummary() {
    const rows = calc.lines.map((l) => `• ${l.name} — ${l.price}`).join("\n");
    return [
      "ÁRKALKULÁTOR — ajánlatkérés",
      "",
      "Választott tételek:",
      rows || "• (nincs tétel kiválasztva)",
      "",
      `Ügyfél típus: ${clientType.label} (×${clientType.mult})`,
      `Iparág: ${industry.label} (×${industry.mult})`,
      `Számlázási ciklus: ${cycle.label}${cycle.discount ? ` (−${cycle.discount * 100}%)` : ""}`,
      "",
      `Tájékoztató egyszeri díj: ${formatFt(calc.onceTotal)}`,
      `Tájékoztató havidíj: ${formatFt(calc.monthlyTotal)} / hó`,
      calc.needsTalk ? "Megjegyzés: egyedi tétel(ek) — a végleges ár személyes egyeztetés után alakul ki." : "",
      message ? `\nÜgyfél üzenete:\n${message}` : "",
    ]
      .filter(Boolean)
      .join("\n");
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      setError("A név és az email cím megadása kötelező.");
      return;
    }
    setLoading(true);
    setError(null);
    const payload = {
      name,
      email,
      phone,
      type: requestCustom || calc.hasCustom ? "Egyedi árajánlatkérés (kalkulátor)" : "Árkalkulátor ajánlatkérés",
      message: buildSummary(),
      _token: FORM_TOKEN || undefined,
    };
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        let msg = "Hiba történt — próbáld újra, vagy írj emailben.";
        try {
          const j = await res.json();
          if (j?.error) msg = j.error;
        } catch {}
        throw new Error(msg);
      }
      setSent(true);
    } catch (err: any) {
      setError(err?.message ?? "Ismeretlen hiba.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="relative py-16 md:py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* PDF letöltés sáv */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-white/10 bg-neutral-900/40 p-5">
          <div className="flex items-start gap-3">
            <Info className="size-5 text-emerald-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-neutral-300">
              Állítsd össze, mire van szükséged — a kalkulátor egy <strong>tájékoztató árat</strong> mutat.
              A végleges ajánlatot mindig személyre szabva véglegesítjük. Az árak ÁFA-mentesek (alanyi adómentesség).
            </p>
          </div>
          <a
            href="/arlista.pdf"
            download
            className="inline-flex flex-shrink-0 items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-medium text-white hover:bg-white/10 transition"
          >
            <Download className="size-4" /> Teljes árlista (PDF)
          </a>
        </div>

        <div className="grid lg:grid-cols-[1fr_380px] gap-8 items-start">
          {/* BAL: kiválasztás */}
          <div className="space-y-10">
            {/* Alapcsomag */}
            <Block title="1. Alapcsomag" subtitle="Válaszd ki a weboldal alapját (vagy hagyd üresen, ha csak kiegészítő/AI-szolgáltatás kell).">
              <div className="grid sm:grid-cols-2 gap-3">
                {PACKAGES.map((p) => {
                  const on = packageId === p.id;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setPackageId(on ? null : p.id)}
                      className={`text-left rounded-xl border p-4 transition ${
                        on ? ACCENT_SEL.brand : "border-white/10 bg-neutral-900/40 hover:border-white/20"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-display font-bold text-white">{p.name}</span>
                        {on && <Check className="size-4 text-blue-400" />}
                      </div>
                      <p className="text-xs text-neutral-400 mb-2">{p.hint}</p>
                      <p className="text-sm text-neutral-200">
                        {formatFt(p.once!)} <span className="text-neutral-500">+ {formatFt(p.monthly!)}/hó · {p.pages} oldal</span>
                      </p>
                    </button>
                  );
                })}
              </div>
              {packageId && (
                <div className="mt-3 flex items-center justify-between rounded-xl border border-white/10 bg-neutral-900/40 p-4">
                  <div>
                    <p className="text-sm text-white font-medium">Extra aloldal</p>
                    <p className="text-xs text-neutral-400">{formatFt(EXTRA_PAGE_PRICE)} / aloldal (a csomagon felül)</p>
                  </div>
                  <Stepper value={extraPages} onChange={setExtraPages} />
                </div>
              )}
            </Block>

            {/* Tétel-csoportok */}
            {GROUPS.map((g, gi) => (
              <Block key={g.id} title={`${gi + 2}. ${g.title}`} subtitle={g.hint}>
                <div className="grid sm:grid-cols-2 gap-3">
                  {g.items.map((it) => {
                    const on = selected.has(it.id);
                    return (
                      <div
                        key={it.id}
                        className={`rounded-xl border p-4 transition ${
                          on ? ACCENT_SEL[g.accent] : "border-white/10 bg-neutral-900/40 hover:border-white/20"
                        }`}
                      >
                        <button type="button" onClick={() => toggle(it.id)} className="w-full text-left flex items-start gap-3">
                          <span
                            className={`mt-0.5 flex size-5 flex-shrink-0 items-center justify-center rounded-md border ${
                              on ? `border-transparent ${ACCENT_DOT[g.accent]}` : "border-white/20"
                            }`}
                          >
                            {on && <Check className="size-3.5 text-black" />}
                          </span>
                          <span className="flex-1">
                            <span className="block text-sm font-medium text-white">{it.name}</span>
                            {it.hint && <span className="block text-xs text-neutral-500 mt-0.5">{it.hint}</span>}
                            <span className="block text-xs text-neutral-400 mt-1">{priceLabel(it)}</span>
                          </span>
                        </button>
                        {on && it.hours && (
                          <div className="mt-3 flex items-center justify-between pl-8">
                            <span className="text-xs text-neutral-400">Órák száma</span>
                            <Stepper
                              value={hours[it.id] || 1}
                              min={1}
                              onChange={(v) => setHours((h) => ({ ...h, [it.id]: v }))}
                            />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </Block>
            ))}

            {/* Karbantartás */}
            <Block title={`${GROUPS.length + 2}. Karbantartás`} subtitle="Havidíjas, bármikor felmondható, hűségidő nélkül.">
              <div className="grid sm:grid-cols-3 gap-3">
                {MAINTENANCE.map((m) => {
                  const on = maintId === m.id;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setMaintId(on ? null : m.id)}
                      className={`text-left rounded-xl border p-4 transition ${
                        on ? ACCENT_SEL.neutral : "border-white/10 bg-neutral-900/40 hover:border-white/20"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-white">{m.name}</span>
                        {on && <Check className="size-4 text-white" />}
                      </div>
                      <p className="text-xs text-neutral-500 mb-2">{m.hint}</p>
                      <p className="text-sm text-neutral-200">{formatFt(m.monthly!)} / hó</p>
                    </button>
                  );
                })}
              </div>
            </Block>

            {/* Szorzók */}
            <Block title={`${GROUPS.length + 3}. Rólad`} subtitle="Az ügyfél típusa, iparága és a számlázási ciklus befolyásolja a végösszeget.">
              <div className="grid sm:grid-cols-3 gap-4">
                <Select label="Ügyfél típus" value={clientTypeId} onChange={setClientTypeId} options={CLIENT_TYPES} />
                <Select label="Iparág" value={industryId} onChange={setIndustryId} options={INDUSTRIES} />
                <Select
                  label="Számlázási ciklus (bérlés)"
                  value={cycleId}
                  onChange={setCycleId}
                  options={CYCLES.map((c) => ({ id: c.id, label: c.discount ? `${c.label} (−${c.discount * 100}%)` : c.label }))}
                />
              </div>
            </Block>
          </div>

          {/* JOBB: összegző + kapcsolat (sticky) */}
          <div className="lg:sticky lg:top-24 space-y-4">
            <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-neutral-900/80 to-neutral-900/40 p-6">
              <div className="flex items-center gap-2 mb-4">
                <CalcIcon className="size-5 text-emerald-400" />
                <h3 className="font-display text-lg font-bold text-white">Tájékoztató ár</h3>
              </div>

              <div className="space-y-3 mb-4">
                <Row label="Egyszeri díj" value={formatFt(calc.onceTotal)} big />
                <Row label="Havidíj" value={`${formatFt(calc.monthlyTotal)} / hó`} big />
                {cycleId !== "havi" && calc.monthlyTotal > 0 && (
                  <Row
                    label={cycleId === "eves" ? "Éves szinten" : "Negyedévente"}
                    value={formatFt(calc.monthlyTotal * (cycleId === "eves" ? 12 : 3))}
                  />
                )}
              </div>

              <p className="text-xs text-neutral-500 mb-4">
                Szorzók: ügyfél ×{clientType.mult} · iparág ×{industry.mult}. Az árak ÁFA-mentesek.
              </p>

              {calc.needsTalk && (
                <div className="mb-4 rounded-lg border border-emerald-500/20 bg-emerald-500/[0.06] p-3 text-xs text-emerald-200">
                  Néhány tételnél a pontos ár az igényektől függ — ezt egy rövid beszélgetésen véglegesítjük közösen.
                </div>
              )}

              <label className="flex items-start gap-2 mb-5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={requestCustom}
                  onChange={(e) => setRequestCustom(e.target.checked)}
                  className="mt-0.5 size-4 accent-emerald-500"
                />
                <span className="text-sm text-neutral-300">
                  Egyedi elképzelésem van — kérek <strong>személyre szabott ajánlatot</strong>.
                </span>
              </label>

              {sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-5 text-center"
                >
                  <CheckCircle2 className="size-10 text-emerald-400 mx-auto mb-2" />
                  <p className="font-bold text-white mb-1">Megkaptam, köszönöm!</p>
                  <p className="text-sm text-neutral-300">24 órán belül visszajelzek a személyre szabott ajánlattal.</p>
                </motion.div>
              ) : (
                <form onSubmit={onSubmit} className="space-y-3">
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="Neved *"
                    className="w-full rounded-lg border border-white/10 bg-neutral-900/60 px-3.5 py-2.5 text-sm text-white placeholder:text-neutral-500 focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/30 transition"
                  />
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    required
                    placeholder="Email cím *"
                    className="w-full rounded-lg border border-white/10 bg-neutral-900/60 px-3.5 py-2.5 text-sm text-white placeholder:text-neutral-500 focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/30 transition"
                  />
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Telefonszám (opcionális)"
                    className="w-full rounded-lg border border-white/10 bg-neutral-900/60 px-3.5 py-2.5 text-sm text-white placeholder:text-neutral-500 focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/30 transition"
                  />
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={3}
                    placeholder="Megjegyzés, részletek... (opcionális)"
                    className="w-full rounded-lg border border-white/10 bg-neutral-900/60 px-3.5 py-2.5 text-sm text-white placeholder:text-neutral-500 focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/30 transition"
                  />
                  <button
                    disabled={loading}
                    className="group relative w-full overflow-hidden rounded-lg bg-gradient-to-r from-cyan-500 to-emerald-500 px-5 py-3 text-sm font-semibold text-black transition hover:opacity-95 disabled:opacity-50"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      <Send className="size-4" />
                      {loading ? "Küldés..." : requestCustom || calc.hasCustom ? "Egyedi ajánlatkérés elküldése" : "Ajánlatkérés elküldése"}
                    </span>
                  </button>
                  {error && <p className="text-center text-sm text-red-400">{error}</p>}
                  <p className="text-[11px] text-center text-neutral-500">
                    A választásod összegzését elküldöm magamnak, és személyesen visszajelzek.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---- segéd-komponensek ---- */

function Block({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
    >
      <h2 className="font-display text-xl md:text-2xl font-bold text-white mb-1">{title}</h2>
      {subtitle && <p className="text-sm text-neutral-400 mb-4">{subtitle}</p>}
      {!subtitle && <div className="mb-4" />}
      {children}
    </motion.div>
  );
}

function Stepper({ value, onChange, min = 0 }: { value: number; onChange: (v: number) => void; min?: number }) {
  return (
    <div className="flex items-center gap-1">
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        className="inline-flex size-8 items-center justify-center rounded-md border border-white/15 bg-white/5 text-white hover:bg-white/10"
        aria-label="Csökkentés"
      >
        <Minus className="size-4" />
      </button>
      <span className="w-8 text-center text-sm font-medium text-white tabular-nums">{value}</span>
      <button
        type="button"
        onClick={() => onChange(value + 1)}
        className="inline-flex size-8 items-center justify-center rounded-md border border-white/15 bg-white/5 text-white hover:bg-white/10"
        aria-label="Növelés"
      >
        <Plus className="size-4" />
      </button>
    </div>
  );
}

function Select({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { id: string; label: string }[];
}) {
  return (
    <label className="block">
      <span className="block text-xs text-neutral-400 mb-1.5">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-white/10 bg-neutral-900/60 px-3 py-2.5 text-sm text-white focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/30 transition"
      >
        {options.map((o) => (
          <option key={o.id} value={o.id} className="bg-neutral-900">
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function Row({ label, value, big = false }: { label: string; value: string; big?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-neutral-400">{label}</span>
      <span className={big ? "font-display text-xl font-bold text-white tabular-nums" : "text-sm text-neutral-300 tabular-nums"}>
        {value}
      </span>
    </div>
  );
}
