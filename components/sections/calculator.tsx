"use client";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Check, Download, Send, CheckCircle2, Calculator as CalcIcon, Info, Minus, Plus, Megaphone } from "lucide-react";
import {
  PACKAGES,
  GROUPS,
  CLIENT_TYPES,
  INDUSTRIES,
  CYCLES,
  EXTRA_PAGE_PRICE,
  SOCIAL_BASE,
  SOCIAL_UNITS,
  AD_SETUP,
  GBP_SETUP,
  AD_BUDGET_MAX,
  AD_BUDGET_STEP,
  AD_FEE_RATE,
  adManagementFee,
  PRICE_FACTOR,
  MONTHLY_FACTOR,
  socialUnitDiscount,
  perUnitVolumeDiscount,
  formatFt,
  discFt,
  monthlyFt,
  type PriceItem,
  type PriceGroup,
} from "@/lib/pricing";

const FORM_ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT || "/api/quote";
const FORM_TOKEN = process.env.NEXT_PUBLIC_FORM_TOKEN || "";

const ADS_ONCE = [AD_SETUP, GBP_SETUP];

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
  if (it.once) parts.push(discFt(it.once) + (it.perUnit ? ` / ${it.perUnit}` : ""));
  if (it.monthly) parts.push(monthlyFt(it.monthly) + " / hó");
  return parts.join(" + ") || "—";
}

export function Calculator() {
  const [packageId, setPackageId] = useState<string | null>(null);
  const [extraPages, setExtraPages] = useState(0);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [qty, setQty] = useState<Record<string, number>>({});
  const [socialBase, setSocialBase] = useState(false);
  const [socialQty, setSocialQty] = useState<Record<string, number>>({});
  const [adBudget, setAdBudget] = useState(0);
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
  const group = (id: string) => GROUPS.find((g) => g.id === id)!;

  function toggle(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  const calc = useMemo(() => {
    const pkg = PACKAGES.find((p) => p.id === packageId) || null;
    const allItems = [...GROUPS.flatMap((g) => g.items), ...ADS_ONCE];
    const chosen = allItems.filter((i) => selected.has(i.id));

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
      const q = i.perUnit ? qty[i.id] || 1 : 1;
      const vdisc = i.perUnit && i.maxDiscount ? perUnitVolumeDiscount(q, i.maxDiscount) : 0;
      const unitOnce = (i.once || 0) * (1 - vdisc);
      if (i.once) onceSum += unitOnce * q;
      if (i.monthly) monthlySum += i.monthly;
      const label = i.perUnit
        ? `${i.name} × ${q} ${i.perUnit}${vdisc > 0 ? ` (−${Math.round(vdisc * 100)}%)` : ""}`
        : i.name;
      const priceStr = i.perUnit && i.once ? `${discFt(unitOnce)} / ${i.perUnit}` : priceLabel(i);
      lines.push({ name: label, price: priceStr });
    });

    // Közösségimédia alapdíj (havi, −10%)
    if (socialBase) {
      monthlySum += SOCIAL_BASE.monthly || 0;
      lines.push({ name: SOCIAL_BASE.name, price: monthlyFt(SOCIAL_BASE.monthly || 0) + " / hó" });
    }
    // Social tartalmak: mennyiségi kedvezmény (2%/db, típusonkénti plafonig), a havi −10% HELYETT.
    let socialUnitsAfter = 0;
    let socialUnitsList = 0;
    SOCIAL_UNITS.forEach((u) => {
      const q = socialQty[u.id] || 0;
      if (q > 0) {
        const disc = socialUnitDiscount(q, u.maxDiscount);
        const unit = u.monthly * (1 - disc);
        socialUnitsAfter += unit * q;
        socialUnitsList += u.monthly * q;
        lines.push({
          name: `${u.name} × ${q} / hó${disc > 0 ? ` (−${Math.round(disc * 100)}%)` : ""}`,
          price: formatFt(unit) + " / db",
        });
      }
    });

    // Hirdetéskezelési díj (a büdzsé alapján; a büdzsét a platformnak fizeti, nem nekem).
    const adFee = adManagementFee(adBudget);
    if (adBudget > 0) {
      lines.push({ name: "Hirdetéskezelés (havi)", price: formatFt(adFee) + " / hó" });
      lines.push({ name: "Hirdetési büdzsé (közvetlenül a platformnak)", price: formatFt(adBudget) + " / hó" });
    }

    const mult = clientType.mult * industry.mult;
    const cyc = 1 - cycle.discount;
    // Akció: egyszeri díjak −20%; rendszeres havidíjak −10%; social tartalmak mennyiségi kedvezménnyel.
    // A hirdetéskezelési díjra nincs külön kedvezmény (büdzsé-alapú).
    const onceList = onceSum * mult;
    const onceTotal = onceList * PRICE_FACTOR;
    const monthlyList = (monthlySum + socialUnitsList) * mult * cyc + adFee;
    const monthlyTotal = (monthlySum * MONTHLY_FACTOR + socialUnitsAfter) * mult * cyc + adFee;
    const needsTalk = hasCustom || requestCustom;

    return { onceTotal, monthlyTotal, onceList, monthlyList, adFee, adBudget, mult, hasCustom, needsTalk, lines };
  }, [packageId, extraPages, selected, qty, socialBase, socialQty, adBudget, clientType, industry, cycle, requestCustom]);

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
      "Akció: az egyszeri díjak −20%, a havidíjak −10% kedvezménnyel.",
      `Tájékoztató egyszeri díj: ${formatFt(calc.onceTotal)}`,
      `Tájékoztató havidíj (kezeléssel): ${formatFt(calc.monthlyTotal)} / hó`,
      calc.adBudget > 0 ? `Ebből hirdetési büdzsé a platformnak: ${formatFt(calc.adBudget)} / hó` : "",
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
              <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-cyan-500 to-emerald-500 px-2 py-0.5 text-[11px] font-bold text-black mr-1.5 align-middle">
                AKCIÓ: −20% / −10%
              </span>
              Állítsd össze, mire van szükséged — a kalkulátor egy <strong>tájékoztató árat</strong> mutat.
              Most akció: az egyszeri díjakra −20%, a havidíjakra −10% kedvezmény. A végleges ajánlatot mindig
              személyre szabva véglegesítjük. Az árak ÁFA-mentesek.
            </p>
          </div>
          <a
            href="/maczko-web-arlista.pdf"
            download="Maczko-Web-arlista.pdf"
            className="inline-flex flex-shrink-0 items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-medium text-white hover:bg-white/10 transition"
          >
            <Download className="size-4" /> Teljes árlista (PDF)
          </a>
        </div>

        <div className="grid lg:grid-cols-[1fr_380px] gap-8 items-start">
          {/* BAL: kiválasztás */}
          <div className="space-y-10">
            {/* 1. Alapcsomag */}
            <Block title="1. Alapcsomag" subtitle="Válaszd ki a weboldal alapját (vagy hagyd üresen, ha csak optimalizálás / hirdetés / AI kell).">
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
                        {discFt(p.once!)} <span className="text-neutral-500">+ {monthlyFt(p.monthly!)}/hó · {p.pages} oldal</span>
                      </p>
                    </button>
                  );
                })}
              </div>
              {packageId && (
                <div className="mt-3 flex items-center justify-between rounded-xl border border-white/10 bg-neutral-900/40 p-4">
                  <div>
                    <p className="text-sm text-white font-medium">Extra aloldal</p>
                    <p className="text-xs text-neutral-400">{discFt(EXTRA_PAGE_PRICE)} / aloldal (a csomagon felül)</p>
                  </div>
                  <Stepper value={extraPages} onChange={setExtraPages} />
                </div>
              )}
            </Block>

            {/* 2. Kiegészítők */}
            <GroupSection g={group("addons")} number={2} selected={selected} onToggle={toggle} qty={qty} setQty={setQty} />

            {/* 3. Optimalizálás */}
            <GroupSection g={group("optim")} number={3} selected={selected} onToggle={toggle} qty={qty} setQty={setQty} />

            {/* 4. Hirdetések */}
            <Block
              title="4. Google & Meta hirdetések"
              subtitle="A havi hirdetési büdzsét te állítod be (azt közvetlenül a platformnak fizeted). A kezelési díjam ebből számolódik."
            >
              <div className="grid sm:grid-cols-2 gap-3 mb-4">
                {ADS_ONCE.map((it) => (
                  <ItemCard
                    key={it.id}
                    it={it}
                    accent="reach"
                    on={selected.has(it.id)}
                    onToggle={() => toggle(it.id)}
                    qtyVal={qty[it.id] || 1}
                    onQty={(v) => setQty((h) => ({ ...h, [it.id]: v }))}
                  />
                ))}
              </div>

              <div className="rounded-xl border border-white/10 bg-neutral-900/40 p-5">
                <div className="flex items-center gap-2 mb-1">
                  <Megaphone className="size-4 text-fuchsia-400" />
                  <span className="text-sm font-medium text-white">Havi hirdetési büdzsé</span>
                </div>
                <p className="text-xs text-neutral-500 mb-4">
                  Ezt az összeget a hirdetésekre szánod, és közvetlenül a Google/Meta felé fizeted — nem nekem.
                </p>

                <div className="flex items-center justify-between mb-2">
                  <span className="font-display text-xl font-bold text-white tabular-nums">{formatFt(adBudget)}</span>
                  <span className="text-xs text-neutral-400">/ hó</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={AD_BUDGET_MAX}
                  step={AD_BUDGET_STEP}
                  value={adBudget}
                  onChange={(e) => setAdBudget(Number(e.target.value))}
                  className="w-full accent-fuchsia-500 cursor-pointer"
                  aria-label="Havi hirdetési büdzsé"
                />
                <div className="flex justify-between text-[11px] text-neutral-600 mt-1">
                  <span>0 Ft</span>
                  <span>{formatFt(AD_BUDGET_MAX)}+</span>
                </div>

                <div className="mt-4 flex items-center justify-between rounded-lg border border-fuchsia-500/20 bg-fuchsia-500/[0.06] px-4 py-3">
                  <div>
                    <p className="text-sm text-white font-medium">Hirdetéskezelési díj</p>
                    <p className="text-[11px] text-neutral-400">a büdzsé {Math.round(AD_FEE_RATE * 100)}%-a, de minimum {formatFt(25000)}</p>
                  </div>
                  <span className="font-display text-lg font-bold text-fuchsia-300 tabular-nums">
                    {adBudget > 0 ? `${formatFt(calc.adFee)} / hó` : "—"}
                  </span>
                </div>
              </div>
            </Block>

            {/* 5. AI-automatizálás */}
            <GroupSection g={group("ai-auto")} number={5} selected={selected} onToggle={toggle} qty={qty} setQty={setQty} />

            {/* 6. AI-betanítás */}
            <GroupSection g={group("ai-train")} number={6} selected={selected} onToggle={toggle} qty={qty} setQty={setQty} />

            {/* 7. Közösségimédia-kezelés */}
            <Block
              title="7. Közösségimédia-kezelés"
              subtitle="Havi tartalomkezelés — minél többet kérsz egy típusból, annál olcsóbb darabonként (2% / db; poszt és story max −40%, reel max −30%)."
            >
              <button
                type="button"
                onClick={() => setSocialBase((v) => !v)}
                className={`w-full text-left rounded-xl border p-4 mb-3 transition ${
                  socialBase ? ACCENT_SEL.reach : "border-white/10 bg-neutral-900/40 hover:border-white/20"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`flex size-5 flex-shrink-0 items-center justify-center rounded-md border ${
                      socialBase ? "border-transparent bg-fuchsia-400" : "border-white/20"
                    }`}
                  >
                    {socialBase && <Check className="size-3.5 text-black" />}
                  </span>
                  <span className="flex-1">
                    <span className="block text-sm font-medium text-white">{SOCIAL_BASE.name}</span>
                    <span className="block text-xs text-neutral-500 mt-0.5">{SOCIAL_BASE.hint}</span>
                  </span>
                  <span className="text-xs text-neutral-300 whitespace-nowrap">{monthlyFt(SOCIAL_BASE.monthly || 0)} / hó</span>
                </div>
              </button>

              <div className="grid sm:grid-cols-3 gap-3">
                {SOCIAL_UNITS.map((u) => {
                  const q = socialQty[u.id] || 0;
                  const disc = socialUnitDiscount(q, u.maxDiscount);
                  const unit = u.monthly * (1 - disc);
                  return (
                    <div
                      key={u.id}
                      className={`rounded-xl border p-4 transition ${
                        q > 0 ? ACCENT_SEL.reach : "border-white/10 bg-neutral-900/40"
                      }`}
                    >
                      <p className="text-sm font-medium text-white">{u.name}</p>
                      <p className="text-xs mt-0.5">
                        {disc > 0 ? (
                          <>
                            <span className="text-neutral-500 line-through">{formatFt(u.monthly)}</span>{" "}
                            <span className="text-emerald-400 font-medium">{formatFt(unit)}</span>
                            <span className="text-neutral-500"> / {u.unit}</span>
                          </>
                        ) : (
                          <span className="text-neutral-400">{formatFt(u.monthly)} / {u.unit}</span>
                        )}
                      </p>
                      <p className="text-[11px] mt-0.5 mb-3">
                        {disc > 0 ? (
                          <span className="text-emerald-400">
                            −{Math.round(disc * 100)}% mennyiségi kedvezmény
                            {disc >= u.maxDiscount ? " (max)" : ""}
                          </span>
                        ) : (
                          <span className="text-neutral-500">2% / db, max {Math.round(u.maxDiscount * 100)}%</span>
                        )}
                      </p>
                      <Stepper value={q} onChange={(v) => setSocialQty((s) => ({ ...s, [u.id]: v }))} />
                    </div>
                  );
                })}
              </div>
            </Block>

            {/* 8. Rólad */}
            <Block title="8. Rólad" subtitle="Az ügyfél típusa, iparága és a számlázási ciklus befolyásolja a végösszeget.">
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
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <CalcIcon className="size-5 text-emerald-400" />
                  <h3 className="font-display text-lg font-bold text-white">Tájékoztató ár</h3>
                </div>
                <span className="rounded-full bg-gradient-to-r from-cyan-500 to-emerald-500 px-2.5 py-1 text-[11px] font-bold text-black">
                  AKCIÓ
                </span>
              </div>

              <div className="space-y-3 mb-4">
                <Row
                  label="Egyszeri díj"
                  value={formatFt(calc.onceTotal)}
                  original={calc.onceList > calc.onceTotal ? formatFt(calc.onceList) : undefined}
                  big
                />
                <Row
                  label="Havidíj"
                  value={`${formatFt(calc.monthlyTotal)} / hó`}
                  original={calc.monthlyList > calc.monthlyTotal ? formatFt(calc.monthlyList) : undefined}
                  big
                />
                {calc.adBudget > 0 && (
                  <Row label="+ hirdetési büdzsé (platformnak)" value={`${formatFt(calc.adBudget)} / hó`} />
                )}
                {cycleId !== "havi" && calc.monthlyTotal > 0 && (
                  <Row
                    label={cycleId === "eves" ? "Éves szinten" : "Negyedévente"}
                    value={formatFt(calc.monthlyTotal * (cycleId === "eves" ? 12 : 3))}
                  />
                )}
              </div>

              <p className="text-xs text-neutral-500 mb-4">
                Akció: <span className="text-emerald-400 font-medium">egyszeri díjak −20%</span>,{" "}
                <span className="text-emerald-400 font-medium">havidíjak −10%</span>. Szorzók: ügyfél ×
                {clientType.mult} · iparág ×{industry.mult}. Az árak ÁFA-mentesek.
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

        {/* Végső összegző — amit kiválasztottál */}
        <div className="mt-12">
          <h2 className="font-display text-xl md:text-2xl font-bold text-white mb-1">Összegzés — amit kiválasztottál</h2>
          <p className="text-sm text-neutral-400 mb-4">Az alábbi tételeket küldöd át ajánlatkérésként.</p>
          {calc.lines.length === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-neutral-900/40 p-6 text-sm text-neutral-500">
              Még nem választottál ki tételt — jelölj be fent, amire szükséged van.
            </div>
          ) : (
            <div className="rounded-2xl border border-white/10 bg-neutral-900/40 overflow-hidden">
              <div className="divide-y divide-white/5">
                {calc.lines.map((l, i) => (
                  <div key={i} className="flex items-center justify-between gap-4 px-5 py-3">
                    <span className="text-sm text-neutral-200">{l.name}</span>
                    <span className="text-sm text-neutral-400 tabular-nums whitespace-nowrap">{l.price}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-white/10 bg-white/[0.02] divide-y divide-white/5">
                <div className="flex items-center justify-between px-5 py-3">
                  <span className="text-sm font-medium text-white">Egyszeri összesen</span>
                  <span className="flex items-baseline gap-2">
                    {calc.onceList > calc.onceTotal && (
                      <span className="text-xs text-neutral-500 line-through tabular-nums">{formatFt(calc.onceList)}</span>
                    )}
                    <span className="font-display font-bold text-white tabular-nums">{formatFt(calc.onceTotal)}</span>
                  </span>
                </div>
                <div className="flex items-center justify-between px-5 py-3">
                  <span className="text-sm font-medium text-white">Havidíj összesen</span>
                  <span className="flex items-baseline gap-2">
                    {calc.monthlyList > calc.monthlyTotal && (
                      <span className="text-xs text-neutral-500 line-through tabular-nums">{formatFt(calc.monthlyList)}</span>
                    )}
                    <span className="font-display font-bold text-white tabular-nums">{formatFt(calc.monthlyTotal)} / hó</span>
                  </span>
                </div>
                {calc.adBudget > 0 && (
                  <div className="flex items-center justify-between px-5 py-3">
                    <span className="text-sm text-neutral-400">+ hirdetési büdzsé (közvetlenül a platformnak)</span>
                    <span className="text-sm text-neutral-300 tabular-nums">{formatFt(calc.adBudget)} / hó</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ---- segéd-komponensek ---- */

function ItemCard({
  it,
  accent,
  on,
  onToggle,
  qtyVal,
  onQty,
}: {
  it: PriceItem;
  accent: PriceGroup["accent"];
  on: boolean;
  onToggle: () => void;
  qtyVal: number;
  onQty: (v: number) => void;
}) {
  const vdisc = it.perUnit && it.maxDiscount ? perUnitVolumeDiscount(qtyVal, it.maxDiscount) : 0;
  const unitOnce = (it.once || 0) * (1 - vdisc);
  const showVol = on && it.perUnit && it.maxDiscount && vdisc > 0;
  return (
    <div
      className={`rounded-xl border p-4 transition ${
        on ? ACCENT_SEL[accent] : "border-white/10 bg-neutral-900/40 hover:border-white/20"
      }`}
    >
      <button type="button" onClick={onToggle} className="w-full text-left flex items-start gap-3">
        <span
          className={`mt-0.5 flex size-5 flex-shrink-0 items-center justify-center rounded-md border ${
            on ? `border-transparent ${ACCENT_DOT[accent]}` : "border-white/20"
          }`}
        >
          {on && <Check className="size-3.5 text-black" />}
        </span>
        <span className="flex-1">
          <span className="block text-sm font-medium text-white">{it.name}</span>
          {it.hint && <span className="block text-xs text-neutral-500 mt-0.5">{it.hint}</span>}
          <span className="block text-xs mt-1">
            {showVol ? (
              <>
                <span className="text-neutral-500 line-through">{discFt(it.once || 0)}</span>{" "}
                <span className="text-emerald-400 font-medium">{discFt(unitOnce)}</span>
                <span className="text-neutral-500">
                  {" "}
                  / {it.perUnit} (−{Math.round(vdisc * 100)}%{vdisc >= (it.maxDiscount || 0) ? ", max" : ""})
                </span>
              </>
            ) : (
              <span className="text-neutral-400">{priceLabel(it)}</span>
            )}
          </span>
        </span>
      </button>
      {on && it.perUnit && (
        <div className="mt-3 flex items-center justify-between pl-8">
          <span className="text-xs text-neutral-400">{it.perUnit === "fő" ? "Résztvevők" : "Mennyiség"} ({it.perUnit})</span>
          <Stepper value={qtyVal} min={1} onChange={onQty} />
        </div>
      )}
    </div>
  );
}

function GroupSection({
  g,
  number,
  selected,
  onToggle,
  qty,
  setQty,
}: {
  g: PriceGroup;
  number: number;
  selected: Set<string>;
  onToggle: (id: string) => void;
  qty: Record<string, number>;
  setQty: React.Dispatch<React.SetStateAction<Record<string, number>>>;
}) {
  return (
    <Block title={`${number}. ${g.title}`} subtitle={g.hint}>
      <div className="grid sm:grid-cols-2 gap-3">
        {g.items.map((it) => (
          <ItemCard
            key={it.id}
            it={it}
            accent={g.accent}
            on={selected.has(it.id)}
            onToggle={() => onToggle(it.id)}
            qtyVal={qty[it.id] || 1}
            onQty={(v) => setQty((h) => ({ ...h, [it.id]: v }))}
          />
        ))}
      </div>
    </Block>
  );
}

function Block({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }}>
      <h2 className="font-display text-xl md:text-2xl font-bold text-white mb-1">{title}</h2>
      {subtitle ? <p className="text-sm text-neutral-400 mb-4">{subtitle}</p> : <div className="mb-4" />}
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

function Row({ label, value, original, big = false }: { label: string; value: string; original?: string; big?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-neutral-400">{label}</span>
      <span className="flex items-baseline gap-2">
        {original && <span className="text-xs text-neutral-500 line-through tabular-nums">{original}</span>}
        <span className={big ? "font-display text-xl font-bold text-white tabular-nums" : "text-sm text-neutral-300 tabular-nums"}>
          {value}
        </span>
      </span>
    </div>
  );
}
