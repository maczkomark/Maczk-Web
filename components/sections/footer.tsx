import Link from "next/link";
import Image from "next/image";
import { SITE, NAV } from "@/lib/utils";
import { Mail, Phone, MapPin } from "lucide-react";
import { CookieSettingsButton } from "@/components/cookie-settings-button";

export function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-black">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 grid gap-12 md:grid-cols-4">
        <div>
          <Link href="/" className="inline-flex items-center gap-2.5 mb-4" aria-label={SITE.name}>
            <Image src="/logo-mark.png" alt="" width={40} height={40} className="size-10 rounded-md" />
            <span className="font-display text-lg font-bold text-white tracking-wide">{SITE.name}</span>
          </Link>
          <p className="text-sm text-neutral-400 max-w-xs">{SITE.description}</p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4 text-sm">Oldalak</h4>
          <ul className="space-y-2">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sm text-neutral-400 hover:text-white transition">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4 text-sm">Szolgáltatások</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/szolgaltatasok/weboldal-keszites" className="text-neutral-400 hover:text-white">Weboldal készítés</Link></li>
            <li><Link href="/szolgaltatasok/seo" className="text-neutral-400 hover:text-white">SEO optimalizálás</Link></li>
            <li><Link href="/szolgaltatasok/geo-lathatosag" className="text-neutral-400 hover:text-white">GEO — AI-láthatóság</Link></li>
            <li><Link href="/szolgaltatasok/hirdetes" className="text-neutral-400 hover:text-white">Google &amp; Meta hirdetés</Link></li>
            <li><Link href="/szolgaltatasok/ai-automatizalas" className="text-neutral-400 hover:text-white">AI-automatizálás</Link></li>
            <li><Link href="/szolgaltatasok" className="text-neutral-400 hover:text-white">Összes szolgáltatás</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4 text-sm">Kapcsolat</h4>
          <ul className="space-y-3 text-sm text-neutral-400">
            <li className="flex items-center gap-2"><Mail className="size-4" /> <a href={`mailto:${SITE.email}`} className="hover:text-white">{SITE.email}</a></li>
            <li className="flex items-center gap-2"><Phone className="size-4" /> <a href={`tel:${SITE.phone.replace(/\s/g, "")}`} className="hover:text-white">{SITE.phone}</a></li>
            <li className="flex items-center gap-2"><MapPin className="size-4" /> {SITE.city}, {SITE.country}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/5 py-6 px-4 flex flex-col sm:flex-row items-center justify-center gap-x-4 gap-y-3 text-xs text-neutral-500">
        <span>© {new Date().getFullYear()} {SITE.name} — {SITE.owner}. Minden jog fenntartva.</span>
        <span className="hidden sm:inline text-neutral-700">·</span>
        <Link href="/adatvedelem" className="hover:text-white transition">Adatkezelés & sütik</Link>
        <span className="hidden sm:inline text-neutral-700">·</span>
        <CookieSettingsButton className="text-neutral-500 hover:text-white transition cursor-pointer underline-offset-4 hover:underline" />
      </div>
    </footer>
  );
}
