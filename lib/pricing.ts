// Árazási adatok — forrás: arlista.pdf (Maczkó Web).
// Minden ár forintban (HUF). Alanyi adómentes, az árak ÁFA-t nem tartalmaznak.

export type PriceItem = {
  id: string;
  name: string;
  once?: number; // egyszeri díj
  monthly?: number; // havidíj (bérlés)
  hint?: string;
  hours?: boolean; // óránként számlázott tétel (mennyiség megadható)
  custom?: boolean; // egyedi ár — személyes egyeztetés
};

export type PriceGroup = {
  id: string;
  title: string;
  accent: "brand" | "reach" | "ai" | "neutral";
  hint?: string;
  items: PriceItem[];
};

// Alapcsomag (egy választható)
export const PACKAGES: (PriceItem & { pages: number })[] = [
  { id: "landing", name: "Landing oldal", once: 60000, monthly: 6000, pages: 1, hint: "1 oldalas céloldal, kapcsolat űrlap, alap SEO" },
  { id: "alap", name: "Alap bemutatkozó", once: 110000, monthly: 9000, pages: 5, hint: "Bemutatkozás, szolgáltatások, kapcsolat (max 5 oldal)" },
  { id: "standard", name: "Standard céges", once: 190000, monthly: 12000, pages: 10, hint: "Több aloldal, blog, galéria, részletes SEO" },
  { id: "pro", name: "Pro / egyedi", once: 325000, monthly: 18000, pages: 15, hint: "Egyedi design, animációk, integrációk" },
  { id: "webshop", name: "Webshop", once: 425000, monthly: 25000, pages: 20, hint: "E-commerce, fizetés, készletkezelés" },
];

export const EXTRA_PAGE_PRICE = 18000; // / aloldal (egyszeri)
export const HOURLY_RATE = 12000; // óradíj egyedi munkára

// Karbantartás (egy választható)
export const MAINTENANCE: PriceItem[] = [
  { id: "maint-alap", name: "Alap karbantartás", monthly: 6000, hint: "Frissítés, heti mentés, havi 30 perc módosítás" },
  { id: "maint-bovitett", name: "Bővített karbantartás", monthly: 12000, hint: "Napi mentés, uptime-figyelés, havi 1 óra módosítás" },
  { id: "maint-premium", name: "Prémium karbantartás", monthly: 25000, hint: "24h SLA, havi 2 óra fejlesztés, negyedéves audit" },
];

// Kiegészítők és AI/marketing tételek (több is választható)
export const GROUPS: PriceGroup[] = [
  {
    id: "addons",
    title: "Kiegészítők",
    accent: "brand",
    items: [
      { id: "logo", name: "Logó tervezés", once: 26300 },
      { id: "foto", name: "Fotózás (helyszíni)", once: 60000 },
      { id: "szoveg", name: "Szövegírás (full)", once: 45000 },
      { id: "tobbnyelvu", name: "Többnyelvűség (per nyelv)", once: 33800, monthly: 1500 },
      { id: "blog", name: "Blog modul", once: 18800 },
      { id: "foglalas", name: "Foglalási rendszer", once: 67500, monthly: 4500 },
      { id: "hirlevel", name: "Hírlevél integráció (Mailchimp)", once: 18800, monthly: 1000 },
      { id: "gtm", name: "Google Tag Manager + Analytics", once: 13500 },
      { id: "seo-alap", name: "SEO alap (kulcsszavak, meta, sitemap)", once: 30000 },
      { id: "seo-havi", name: "Havi SEO karbantartás", monthly: 12000 },
      { id: "social", name: "Social Media beágyazás", once: 9000 },
      { id: "urlap", name: "Egyedi űrlap + email értesítés", once: 13500 },
      { id: "chat", name: "Live chat / Messenger gomb", once: 6000 },
      { id: "velemenyek", name: "Vélemények / referenciák modul", once: 11300 },
      { id: "galeria", name: "Galéria / portfólió", once: 13500 },
      { id: "terkep", name: "Beágyazott térkép", once: 3800 },
      { id: "gdpr", name: "GDPR / cookie banner", once: 6000 },
      { id: "sebesseg", name: "Sebesség optimalizálás (Core Web Vitals)", once: 26300 },
      { id: "oktatas", name: "Oktatás (1 óra)", once: 9000 },
      { id: "prioritas", name: "Prioritás támogatás (24h SLA)", monthly: 5000 },
      { id: "mentes", name: "Heti biztonsági mentés", monthly: 2000 },
    ],
  },
  {
    id: "geo",
    title: "GEO — AI-keresős láthatóság",
    accent: "reach",
    hint: "Hogy a céged megjelenjen a ChatGPT, Google AI, Gemini és Perplexity válaszaiban + a Google Térképen.",
    items: [
      { id: "geo-audit", name: "GEO alap audit + beállítás", once: 45000 },
      { id: "geo-cegprofil", name: "Google Cégprofil beállítás + optimalizálás", once: 25000 },
      { id: "geo-havi", name: "Havi GEO karbantartás + monitoring", monthly: 8000 },
    ],
  },
  {
    id: "ads",
    title: "Google & Meta hirdetések",
    accent: "reach",
    hint: "A médiaköltséget közvetlenül a platformnak fizeted, ezek a kezelési díjak.",
    items: [
      { id: "ads-setup", name: "Fiók- és kampánybeállítás (egyszeri)", once: 40000 },
      { id: "ads-kreativ", name: "Kreatív csomag (szövegek + 3 vizuál)", once: 25000 },
      { id: "ads-alap", name: "Havi kezelés – Alap (médiaköltség < 150e Ft)", monthly: 30000 },
      { id: "ads-novekedes", name: "Havi kezelés – Növekedés (150–500e Ft)", monthly: 50000 },
      { id: "ads-skalazas", name: "Havi kezelés – Skálázás (500e Ft felett)", custom: true, hint: "A médiaköltség 10%-a — személyes egyeztetés" },
    ],
  },
  {
    id: "ai-auto",
    title: "AI-automatizálás",
    accent: "ai",
    hint: "Ismétlődő, kézi folyamatok kiváltása AI-val és automatizálással.",
    items: [
      { id: "ai-felmeres", name: "Folyamatfelmérés + automatizálási terv", once: 25000 },
      { id: "ai-bevezetes", name: "Automatizálási folyamat bevezetése", once: 40000, hint: "folyamatonként" },
      { id: "ai-chatbot", name: "AI chatbot / ügyfélasszisztens beállítás", once: 80000 },
      { id: "ai-uzemeltetes", name: "Havi üzemeltetés, felügyelet, finomhangolás", monthly: 10000 },
    ],
  },
  {
    id: "ai-train",
    title: "AI-használat betanítása",
    accent: "ai",
    hint: "A csapatod megtanul gyorsabban dolgozni AI-eszközökkel — valós, céges feladatokon.",
    items: [
      { id: "train-workshop", name: "Csapat-workshop (kb. 2 óra)", once: 30000 },
      { id: "train-1on1", name: "Egyéni / 1-on-1 tréning (óránként)", once: 12000, hours: true },
      { id: "train-prompt", name: "Cégre szabott promptkönyvtár", once: 25000 },
    ],
  },
];

export const CLIENT_TYPES = [
  { id: "magan", label: "Magánszemély", mult: 1 },
  { id: "kkv", label: "Kisvállalkozás (egyéni / KKV)", mult: 1.15 },
  { id: "kozepes", label: "Közepes cég", mult: 1.4 },
  { id: "nagy", label: "Nagyobb cég / hálózat", mult: 1.8 },
];

export const INDUSTRIES = [
  { id: "altalanos", label: "Általános", mult: 1 },
  { id: "szolgaltatas", label: "Szolgáltatás (szépség, étterem, fodrász)", mult: 1 },
  { id: "it", label: "IT / tech", mult: 1.1 },
  { id: "ecom", label: "E-commerce / kereskedelem", mult: 1.25 },
  { id: "eu-penz-jog", label: "Egészségügy / pénzügy / jogi", mult: 1.35 },
  { id: "ipari", label: "Ipari / B2B", mult: 1.2 },
];

export const CYCLES = [
  { id: "havi", label: "Havi", discount: 0 },
  { id: "negyedeves", label: "Negyedéves", discount: 0.05 },
  { id: "eves", label: "Éves", discount: 0.15 },
];

export function formatFt(n: number): string {
  return new Intl.NumberFormat("hu-HU").format(Math.round(n)) + " Ft";
}
