import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const SITE = {
  name: "Maczkó Web",
  owner: "Maczkó Márk",
  tagline: "Weboldalak, amelyek eladnak",
  description:
    "Modern, gyors, SEO-barát weboldalak vállalkozóknak. Egyedi tervezés, prémium animációk, mérhető eredmények. Magyarországi webfejlesztő — Maczkó Márk.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://maczkoweb.hu",
  email: "info@maczkoweb.hu",
  phone: "+36 20 408 7765",
  city: "Szombathely",
  country: "Magyarország",
};

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
  },
  {
    slug: "webaruhaz",
    title: "Webáruház készítés",
    short: "Online értékesítés Stripe, Barion, készletkezelés és blog integrációval.",
    keywords: "webáruház készítés, online bolt, e-commerce fejlesztés",
  },
  {
    slug: "seo",
    title: "SEO optimalizálás",
    short: "Technikai és tartalmi SEO — első helyre a Google találatok között.",
    keywords: "SEO szakértő, keresőoptimalizálás, Google ranking",
  },
];
