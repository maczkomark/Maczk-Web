import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const SITE = {
  name: "Maczkó Web",
  owner: "Maczkó Márk",
  tagline: "Megépítjük. Megtaláltatjuk. Automatizáljuk.",
  description:
    "Segítek a vállalkozásoknak digitálisan növekedni — weboldaltól és webáruháztól a Google/Meta hirdetésig, a kereső- és AI-láthatóságig (GEO) és az AI-automatizálásig. Helyi, gyakorlati digitális partner — Maczkó Márk, Szombathely.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://maczkoweb.hu",
  email: "info@maczkoweb.hu",
  phone: "+36 20 408 7765",
  city: "Szombathely",
  country: "Magyarország",
};

/**
 * Három pillér — az ernyő-küldetés ("segítek a cégeknek digitálisan
 * növekedni és integrálni az AI-t") lebontása.
 */
export const PILLARS = [
  {
    id: "jelenlet",
    num: "01",
    title: "Jelenlét",
    tagline: "Megépítjük",
    short: "Weboldal és webáruház, ami betölt, jól néz ki és elad — a digitális alap.",
    accent: "brand", // kék → ibolya → rózsaszín
    services: ["weboldal-keszites", "webaruhaz"],
  },
  {
    id: "lathatosag",
    num: "02",
    title: "Láthatóság & elérés",
    tagline: "Megtaláltatjuk",
    short: "SEO, AI-keresős láthatóság (GEO), Google Cégprofil és Google/Meta hirdetések — hogy rád találjanak.",
    accent: "reach", // ibolya → rózsaszín
    services: ["seo", "geo-lathatosag", "hirdetes"],
  },
  {
    id: "ai",
    num: "03",
    title: "AI & automatizálás",
    tagline: "Automatizáljuk",
    short: "Kész, beüzemelt automatizálások és AI-betanítás — hogy a gép dolgozzon helyetted.",
    accent: "ai", // cián → smaragd
    services: ["ai-automatizalas"],
  },
] as const;

export const NAV = [
  { href: "/", label: "Főoldal" },
  { href: "/rolam", label: "Rólam" },
  { href: "/szolgaltatasok", label: "Szolgáltatások" },
  { href: "/munkaim", label: "Munkáim" },
  { href: "/folyamat", label: "Folyamat" },
  { href: "/gyik", label: "GYIK" },
  { href: "/kapcsolat", label: "Kapcsolat" },
];

export const SERVICES = [
  {
    slug: "weboldal-keszites",
    title: "Weboldal készítés",
    short: "Egyedi, gyors, SEO-barát weboldalak vállalkozóknak.",
    keywords: "weboldal készítés, weboldalkészítő, webfejlesztő, prémium weboldal",
    pillar: "jelenlet",
    accent: "brand",
  },
  {
    slug: "webaruhaz",
    title: "Webáruház készítés",
    short: "Online értékesítés Stripe, Barion, készletkezelés és blog integrációval.",
    keywords: "webáruház készítés, online bolt, e-commerce fejlesztés",
    pillar: "jelenlet",
    accent: "brand",
  },
  {
    slug: "seo",
    title: "SEO optimalizálás",
    short: "Technikai és tartalmi SEO — első helyre a Google találatok között.",
    keywords: "SEO szakértő, keresőoptimalizálás, Google ranking",
    pillar: "lathatosag",
    accent: "reach",
  },
  {
    slug: "geo-lathatosag",
    title: "GEO — AI-keresős láthatóság",
    short: "Hogy a céged megjelenjen a ChatGPT/Google AI válaszaiban + Google Cégprofil rendben tartása.",
    keywords: "GEO, generative engine optimization, AI keresőoptimalizálás, Google Cégprofil, helyi láthatóság",
    pillar: "lathatosag",
    accent: "reach",
  },
  {
    slug: "hirdetes",
    title: "Google & Meta hirdetések",
    short: "Célzott Google- és Meta- (Facebook/Instagram) hirdetések — mérhető megtérüléssel, helyi fókusszal.",
    keywords: "Google Ads, Meta Ads, Facebook hirdetés, Instagram hirdetés, PPC, online hirdetés kezelés",
    pillar: "lathatosag",
    accent: "reach",
  },
  {
    slug: "ai-automatizalas",
    title: "AI-automatizálás & AI-használat",
    short: "Kész, beüzemelt automatizálások (foglalás, e-mail, számla) + AI-betanítás a csapatodnak.",
    keywords: "AI automatizálás, mesterséges intelligencia vállalkozásoknak, folyamatautomatizálás, AI betanítás, AI integráció",
    pillar: "ai",
    accent: "ai",
  },
];
