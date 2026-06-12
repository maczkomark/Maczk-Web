// Árazási adatok — Maczkó Web.
// Minden ár forintban (HUF). Alanyi adómentes, az árak ÁFA-t nem tartalmaznak.

export type PriceItem = {
  id: string;
  name: string;
  once?: number; // egyszeri díj
  monthly?: number; // havidíj (bérlés)
  hint?: string;
  perUnit?: string; // mennyiség-alapú tétel (egységár × db); a megjelenített egység, pl. "óra", "fő"
  maxDiscount?: number; // perUnit tételnél: mennyiségi kedvezmény plafonja (pl. 0.5 = max −50%)
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

// Választható tétel-csoportok (checkbox). Sorrend a kalkulátorban külön van megadva.
export const GROUPS: PriceGroup[] = [
  {
    id: "addons",
    title: "Kiegészítők",
    accent: "brand",
    items: [
      { id: "logo", name: "Logó tervezés", once: 26300 },
      { id: "foto", name: "Fotózás (helyszíni)", once: 60000 },
      { id: "blog", name: "Blog modul", once: 18800 },
      { id: "foglalas", name: "Foglalási rendszer", once: 67500, monthly: 4500 },
      { id: "hirlevel", name: "Hírlevél integráció (Mailchimp)", once: 18800, monthly: 1000 },
      { id: "gtm", name: "Google Tag Manager + Analytics", once: 13500 },
      { id: "social", name: "Social Media beágyazás", once: 5000 },
      { id: "urlap", name: "Egyedi űrlap + email értesítés", once: 13500 },
      { id: "velemenyek", name: "Vélemények / referenciák modul", once: 11300 },
      { id: "galeria", name: "Galéria / portfólió", once: 13500 },
      { id: "terkep", name: "Beágyazott térkép", once: 3800 },
      { id: "gdpr", name: "GDPR / cookie banner + adatkezelési tájékoztató", once: 6000 },
      { id: "oktatas", name: "Oktatás (1 óra)", once: 9000 },
    ],
  },
  {
    id: "optim",
    title: "Optimalizálás — SEO / GEO / sebesség",
    accent: "reach",
    hint: "Hogy gyors legyen az oldal, és megtaláljanak a Google-ben és az AI-keresőkben is. Pontosan azt válaszd ki, amire szükséged van.",
    items: [
      { id: "seo-audit", name: "SEO audit (technikai + tartalmi átvilágítás)", once: 25000 },
      { id: "seo-alap", name: "SEO alap (kulcsszavak, meta, sitemap, robots)", once: 30000 },
      { id: "seo-onpage", name: "On-page SEO finomhangolás (címek, headingek, belső linkek)", once: 20000 },
      { id: "seo-schema", name: "Strukturált adatok (Schema.org jelölés)", once: 15000 },
      { id: "speed", name: "Sebesség optimalizálás (Page Speed / Core Web Vitals)", once: 18000 },
      { id: "seo-havi", name: "Havi SEO karbantartás + tartalom", monthly: 8000 },
      { id: "geo-audit", name: "GEO alap audit + beállítás (AI-keresős láthatóság)", once: 45000 },
      { id: "geo-llms", name: "llms.txt + AI-olvasható FAQ blokkok", once: 18000 },
      { id: "geo-havi", name: "Havi GEO monitoring + frissítés", monthly: 8000 },
    ],
  },
  {
    id: "ai-auto",
    title: "AI-automatizálás",
    accent: "ai",
    hint: "Ismétlődő, kézi folyamatok kiváltása — kevesebb adminisztráció, gyorsabb kiszolgálás. Válaszd ki, mit automatizáljunk.",
    items: [
      { id: "ai-felmeres", name: "Folyamatfelmérés + automatizálási terv", once: 25000, hint: "Megnézzük, mely lépések automatizálhatók" },
      { id: "ai-foglalas", name: "Foglalás-visszaigazoló + emlékeztető automatizálás", once: 25000 },
      { id: "ai-email", name: "Bejövő e-mailek osztályozása + sablonválaszok", once: 22000 },
      { id: "ai-szamla", name: "Számla- és dokumentumfeldolgozás automatizálás", once: 30000 },
      { id: "ai-velemeny", name: "Automatikus vélemény-kérés vásárlás után", once: 15000 },
      { id: "ai-chatbot", name: "AI chatbot / ügyfélasszisztens a weboldalra", once: 80000, hint: "A céged adataira tanítva" },
      { id: "ai-crm", name: "Egyszerű CRM + lead-automatizálás beállítás", once: 45000, hint: "Hogy egy megkeresés se vesszen el" },
      {
        id: "ai-dashboard",
        name: "Vállalkozói dashboard (ügyfelek, bevétel, fizetések)",
        once: 60000,
        monthly: 6000,
        hint: "Saját webes felület: ügyfél-nyilvántartás, bevétel, ki mennyit és hogyan fizetett, egyszerű kimutatások",
      },
      { id: "ai-egyedi", name: "Egyedi automatizálási folyamat", custom: true, hint: "Van egy ismétlődő, kézi folyamatod? Megnézzük." },
      { id: "ai-uzemeltetes", name: "Havi üzemeltetés, felügyelet, finomhangolás", monthly: 10000 },
    ],
  },
  {
    id: "ai-train",
    title: "AI-használat betanítása",
    accent: "ai",
    hint: "A csapatod megtanul gyorsabban dolgozni AI-eszközökkel — valós, céges feladatokon. Minden tétel külön kérhető.",
    items: [
      { id: "train-workshop", name: "AI-workshop (résztvevőnként)", once: 12000, perUnit: "fő", maxDiscount: 0.5, hint: "1 fő a kezdő ár; minél többen, annál olcsóbb fejenként (2% / fő, max −50%)" },
      { id: "train-bevezetes", name: "AI-eszközök bevezetése (ChatGPT/Copilot fiók, beállítás)", once: 20000 },
      { id: "train-folyamat", name: "AI beépítése egy konkrét munkafolyamatba", once: 25000 },
      { id: "train-prompt", name: "Cégre szabott promptkönyvtár", once: 25000 },
      { id: "train-utankovetes", name: "Utánkövető konzultáció (óránként)", once: 12000, perUnit: "óra" },
      { id: "train-anyag", name: "Rögzített tananyag + kérdés-válasz lehetőség", once: 15000 },
    ],
  },
];

// Google & Meta hirdetések — a vevő állítja be a havi büdzsét (a platformnak fizeti),
// a kezelési díj ebből számolódik. Ezen felül egyszeri beállítási díjak.
export const AD_BUDGET_MAX = 1000000; // Ft / hó — a csúszka maximuma
export const AD_BUDGET_STEP = 25000;
export const AD_FEE_RATE = 0.15; // a büdzsé 15%-a a kezelési díj
export const AD_FEE_MIN = 25000; // de minimum ennyi / hó
export function adManagementFee(budget: number): number {
  if (budget <= 0) return 0;
  return Math.max(AD_FEE_MIN, Math.round((budget * AD_FEE_RATE) / 500) * 500);
}
export const AD_SETUP: PriceItem = {
  id: "ad-setup",
  name: "Hirdetés beállítás (fiók, követés, kampány)",
  once: 30000,
  hint: "Google Ads / Meta fiók, Pixel/Tag követés, célzás és kampánystruktúra beállítása",
};
export const GBP_SETUP: PriceItem = {
  id: "gbp-setup",
  name: "Google Cégprofil létrehozása + beállítás",
  once: 25000,
  hint: "Megjelenés a Google Térképen: adatok, kategóriák, fotók, szolgáltatások",
};

export const CLIENT_TYPES = [
  { id: "magan", label: "Magánszemély", mult: 1 },
  { id: "kkv", label: "Kisvállalkozás", mult: 1.15 },
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

// Közösségimédia-kezelés (havi, mennyiség-alapú).
export const SOCIAL_BASE: PriceItem = {
  id: "social-base",
  name: "Közösségimédia alapdíj",
  monthly: 25000,
  hint: "Stratégia, ütemezés, közösségkezelés, válaszolás, havi riport",
};

export type SocialUnit = { id: string; name: string; monthly: number; unit: string; maxDiscount: number; hint?: string };
export const SOCIAL_UNITS: SocialUnit[] = [
  { id: "social-post", name: "Poszt (grafika + szöveg)", monthly: 4500, unit: "db / hó", maxDiscount: 0.4 },
  { id: "social-story", name: "Story", monthly: 2000, unit: "db / hó", maxDiscount: 0.4 },
  { id: "social-reel", name: "Reel / rövid videó (vágás + felirat)", monthly: 10000, unit: "db / hó", maxDiscount: 0.3 },
];

/** Mennyiségi kedvezmény a social tartalmakra: 2% / darab, típusonként a saját plafonig. */
export const SOCIAL_STEP_DISCOUNT = 0.02;
export function socialUnitDiscount(qty: number, maxDiscount: number): number {
  return Math.min(Math.max(qty, 0) * SOCIAL_STEP_DISCOUNT, maxDiscount);
}

/**
 * Mennyiségi kedvezmény perUnit tételekre (pl. workshop / fő): 2% fejenként,
 * az 1. fő a kezdő ár (kedvezmény a 2. főtől), a saját plafonig.
 */
export function perUnitVolumeDiscount(qty: number, maxDiscount: number): number {
  return Math.min(Math.max(qty - 1, 0) * SOCIAL_STEP_DISCOUNT, maxDiscount);
}

/**
 * Kedvezmény-szorzók. Egy helyen állíthatók; minden megjelenített ár és a végösszeg ezen megy át.
 * PRICE_FACTOR   → egyszeri díjak (0.8 = −20%)
 * MONTHLY_FACTOR → havidíjak (0.9 = −10%)
 */
export const PRICE_FACTOR = 0.8;
export const MONTHLY_FACTOR = 0.9;

export function formatFt(n: number): string {
  return new Intl.NumberFormat("hu-HU").format(Math.round(n)) + " Ft";
}

/** Kedvezményes egyszeri (−20%) ár formázva. */
export function discFt(n: number): string {
  return formatFt(n * PRICE_FACTOR);
}

/** Kedvezményes havidíj (−10%) formázva. */
export function monthlyFt(n: number): string {
  return formatFt(n * MONTHLY_FACTOR);
}
