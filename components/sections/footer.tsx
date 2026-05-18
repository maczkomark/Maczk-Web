import Link from "next/link";
import Image from "next/image";
import { SITE, NAV } from "@/lib/utils";
import { Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-black">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 grid gap-12 md:grid-cols-4">
        <div>
          <Link href="/" className="inline-block mb-4" aria-label={SITE.name}>
            <Image
              src="/logo-wordmark.png"
              alt={`${SITE.name} — ${SITE.tagline}`}
              width={400}
              height={120}
              className="h-12 w-auto brightness-0 invert"
            />
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
            <li><Link href="/szolgaltatasok/webaruhaz" className="text-neutral-400 hover:text-white">Webáruház</Link></li>
            <li><Link href="/szolgaltatasok/seo" className="text-neutral-400 hover:text-white">SEO optimalizálás</Link></li>
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
      <div className="border-t border-white/5 py-6 text-center text-xs text-neutral-500">
        © {new Date().getFullYear()} {SITE.name} — {SITE.owner}. Minden jog fenntartva.
      </div>
    </footer>
  );
}
