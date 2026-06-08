// Süti-hozzájárulás kezelése + leképezés a Google Consent Mode v2-re.

export type CookiePrefs = {
  necessary: boolean;
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
};

export const CONSENT_KEY = "cookie-consent";
export const PREFS_KEY = "cookie-preferences";

export const DEFAULT_PREFS: CookiePrefs = {
  necessary: true,
  functional: false,
  analytics: false,
  marketing: false,
};

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

/** A választott preferenciák átküldése a Google Consent Mode-nak (élő frissítés). */
export function applyConsent(p: CookiePrefs) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("consent", "update", {
    analytics_storage: p.analytics ? "granted" : "denied",
    ad_storage: p.marketing ? "granted" : "denied",
    ad_user_data: p.marketing ? "granted" : "denied",
    ad_personalization: p.marketing ? "granted" : "denied",
    functionality_storage: p.functional ? "granted" : "denied",
    personalization_storage: p.functional ? "granted" : "denied",
    security_storage: "granted",
  });
}

/** Mentés localStorage-ba + azonnali consent-frissítés. */
export function saveConsent(p: CookiePrefs) {
  const prefs: CookiePrefs = { ...p, necessary: true };
  try {
    localStorage.setItem(PREFS_KEY, JSON.stringify(prefs));
    localStorage.setItem(CONSENT_KEY, "true");
  } catch {}
  applyConsent(prefs);
}

export function readPrefs(): CookiePrefs | null {
  try {
    const raw = localStorage.getItem(PREFS_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<CookiePrefs>;
    return { ...DEFAULT_PREFS, ...parsed, necessary: true };
  } catch {
    return null;
  }
}

export function hasConsent(): boolean {
  try {
    return localStorage.getItem(CONSENT_KEY) != null;
  } catch {
    return false;
  }
}

/** Esemény, amivel a footerből/adatvédelem oldalról újra megnyitható a banner. */
export const OPEN_EVENT = "cookie:open";
export function openCookieSettings() {
  if (typeof window !== "undefined") window.dispatchEvent(new Event(OPEN_EVENT));
}
