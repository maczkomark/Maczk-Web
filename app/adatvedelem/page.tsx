import type { Metadata } from "next";
import { PageHeader } from "@/components/sections/page-header";
import { CookieSettingsButton } from "@/components/cookie-settings-button";
import { SITE } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Adatkezelési tájékoztató & sütik",
  description:
    "Hogyan kezeljük az adatokat és a sütiket a maczkoweb.hu oldalon. Google Analytics csak hozzájárulással (Consent Mode v2). Süti-beállításaid bármikor módosíthatod.",
  alternates: { canonical: `${SITE.url}/adatvedelem` },
  robots: { index: true, follow: true },
};

export default function AdatvedelemPage() {
  return (
    <>
      <PageHeader
        eyebrow="Jogi"
        title="Adatkezelés & sütik"
        subtitle="Átláthatóan arról, milyen adatokat és sütiket használ az oldal — és hogyan rendelkezhetsz róluk."
      />
      <section className="py-16 bg-black">
        <div className="max-w-3xl mx-auto px-4 space-y-10 text-neutral-300">
          <div className="rounded-2xl border border-white/10 bg-neutral-900/40 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <p className="text-sm text-neutral-300">
              Bármikor megnézheted vagy megváltoztathatod a süti-hozzájárulásodat:
            </p>
            <CookieSettingsButton />
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold text-white mb-3">Az adatkezelő</h2>
            <p className="text-sm leading-relaxed">
              {SITE.owner} ({SITE.name}) — {SITE.city}, {SITE.country}. Elérhetőség:{" "}
              <a href={`mailto:${SITE.email}`} className="text-blue-400 hover:underline">{SITE.email}</a>,{" "}
              {SITE.phone}.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold text-white mb-3">Mik azok a sütik?</h2>
            <p className="text-sm leading-relaxed">
              A sütik (cookie-k) kis adatfájlok, amelyeket a böngésződ tárol. Vannak, amelyek
              az oldal működéséhez kellenek, mások a forgalom méréséhez vagy kényelmi funkciókhoz.
              Az oldal a hozzájárulásodat a böngésződ helyi tárolójában (localStorage) jegyzi meg —
              ez nem kerül továbbításra harmadik félhez.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold text-white mb-3">Süti-kategóriák</h2>
            <ul className="space-y-3 text-sm">
              <li className="rounded-xl border border-white/10 bg-neutral-900/30 p-4">
                <strong className="text-white">Szükséges</strong> — az oldal alapvető működéséhez.
                Mindig aktív, nem igényel hozzájárulást.
              </li>
              <li className="rounded-xl border border-white/10 bg-neutral-900/30 p-4">
                <strong className="text-white">Funkcionális</strong> — megjegyzi a beállításaidat,
                kényelmi funkciók. Csak hozzájárulással.
              </li>
              <li className="rounded-xl border border-white/10 bg-neutral-900/30 p-4">
                <strong className="text-white">Analitika</strong> — Google Analytics 4, a látogatottság
                mérésére, anonimizált IP-vel. Csak a hozzájárulásod után indul.
              </li>
              <li className="rounded-xl border border-white/10 bg-neutral-900/30 p-4">
                <strong className="text-white">Marketing</strong> — személyre szabott hirdetésekhez.
                Jelenleg nincs aktívan használatban; csak hozzájárulással lépne életbe.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold text-white mb-3">Google Analytics & Consent Mode</h2>
            <p className="text-sm leading-relaxed">
              Az oldal a Google Analytics 4-et használja a forgalom méréséhez. A Google Consent Mode v2
              alapján <strong>alapértelmezetten minden mérés és tárolás tiltott</strong>, és kizárólag akkor
              aktiválódik, ha az „Analitika" kategóriához hozzájárulsz. Hozzájárulás nélkül nem történik
              analitikai adatgyűjtés. A hozzájárulásodat bármikor visszavonhatod a fenti gombbal.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold text-white mb-3">Jogaid</h2>
            <p className="text-sm leading-relaxed">
              A GDPR alapján jogod van tájékoztatáshoz, hozzáféréshez, helyesbítéshez, törléshez és
              a hozzájárulás visszavonásához. Kérdés esetén írj a{" "}
              <a href={`mailto:${SITE.email}`} className="text-blue-400 hover:underline">{SITE.email}</a>{" "}
              címre.
            </p>
            <p className="text-xs text-neutral-500 mt-4">
              Ez a tájékoztató általános jellegű; a konkrét, teljes adatkezelési szabályzatot érdemes a
              vállalkozás adataival kiegészíteni.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
