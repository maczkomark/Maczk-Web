"use client";

import { useEffect, useRef, useState } from "react";
import { Cookie, Shield, Info, X, ChevronDown, ChevronUp, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  saveConsent,
  readPrefs,
  hasConsent,
  OPEN_EVENT,
  DEFAULT_PREFS,
  type CookiePrefs,
} from "@/lib/consent";

interface CookieBannerProps {
  title?: string;
  message?: string;
  acceptText?: string;
  rejectText?: string;
  customizeText?: string;
  icon?: "cookie" | "shield" | "info";
  className?: string;
  privacyHref?: string;
}

export function CookieBanner(props: CookieBannerProps) {
  const {
    title = "Sütiket használunk",
    message = "Sütiket használunk az oldal működéséhez, és — a hozzájárulásoddal — a forgalom méréséhez.",
    acceptText = "Összes elfogadása",
    rejectText = "Csak a szükséges",
    customizeText = "Beállítás",
    icon = "cookie",
    className,
    privacyHref = "/adatvedelem",
  } = props;

  const [visible, setVisible] = useState(false);
  const [render, setRender] = useState(false);
  const [showPrefs, setShowPrefs] = useState(false);
  const [prefs, setPrefs] = useState<CookiePrefs>(DEFAULT_PREFS);

  const prefsRef = useRef<HTMLDivElement | null>(null);
  const [prefsHeight, setPrefsHeight] = useState<number>(0);

  // Megnyitás: ha még nincs döntés, vagy ha kívülről kérik (footer / adatvédelem).
  useEffect(() => {
    const stored = readPrefs();
    if (stored) setPrefs(stored);
    if (!hasConsent()) open();

    const onOpen = () => {
      const cur = readPrefs();
      if (cur) setPrefs(cur);
      open();
    };
    window.addEventListener(OPEN_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_EVENT, onOpen);
  }, []);

  useEffect(() => {
    if (showPrefs && prefsRef.current) {
      setPrefsHeight(prefsRef.current.scrollHeight);
    } else {
      setPrefsHeight(0);
    }
  }, [showPrefs, prefs]);

  function open() {
    setRender(true);
    requestAnimationFrame(() => setVisible(true));
  }

  function close() {
    setVisible(false);
    setShowPrefs(false);
    setTimeout(() => setRender(false), 300);
  }

  function acceptAll() {
    const all: CookiePrefs = { necessary: true, functional: true, analytics: true, marketing: true };
    setPrefs(all);
    saveConsent(all);
    close();
  }

  function rejectAll() {
    const only: CookiePrefs = { necessary: true, functional: false, analytics: false, marketing: false };
    setPrefs(only);
    saveConsent(only);
    close();
  }

  function savePreferences() {
    saveConsent(prefs);
    close();
  }

  if (!render) return null;

  const IconEl = icon === "shield" ? Shield : icon === "info" ? Info : Cookie;

  const PrefRow = ({
    title,
    desc,
    field,
    locked,
  }: {
    title: string;
    desc: string;
    field: keyof CookiePrefs;
    locked?: boolean;
  }) => (
    <div className="flex items-start gap-2 p-2 rounded-lg border border-border">
      <button
        type="button"
        disabled={locked}
        onClick={() => !locked && setPrefs((p) => ({ ...p, [field]: !p[field] }))}
        className={cn(
          "mt-0.5 inline-flex size-5 items-center justify-center rounded border",
          locked
            ? "bg-muted text-muted-foreground border-border cursor-not-allowed"
            : "bg-background border-border hover:bg-accent cursor-pointer"
        )}
        aria-pressed={prefs[field]}
        aria-label={`${title} süti beállítás`}
      >
        {prefs[field] && <Check className="size-4" />}
      </button>
      <div className="flex-1">
        <div className="text-xs font-medium">
          {title} {locked && <span className="text-[10px] text-muted-foreground">(kötelező)</span>}
        </div>
        <p className="text-[10px] text-muted-foreground mt-0.5">{desc}</p>
      </div>
    </div>
  );

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Süti-hozzájárulás"
      className={cn("fixed right-4 bottom-4 md:right-6 md:bottom-6", "z-[60] w-[360px] max-w-[90vw]")}
    >
      <div
        className={cn(
          "relative border border-border/70 rounded-xl bg-card/95 text-card-foreground shadow-xl backdrop-blur",
          "p-4 flex flex-col gap-3",
          visible
            ? cn("animate-in", "fade-in", "slide-in-from-bottom-8")
            : cn("animate-out", "fade-out", "slide-out-to-bottom-8"),
          "duration-300 ease-out",
          className
        )}
      >
        <div className="flex items-center gap-3">
          <span className="inline-flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary ring-1 ring-primary/20">
            <IconEl className="size-5" aria-hidden="true" />
          </span>
          <h2 className="text-sm font-semibold leading-5">{title}</h2>
          <button
            type="button"
            onClick={rejectAll}
            className="ml-auto inline-flex size-8 items-center justify-center rounded-md hover:bg-foreground/5 cursor-pointer"
            aria-label="Bezárás — csak a szükséges sütik"
          >
            <X className="size-4 text-muted-foreground" />
          </button>
        </div>

        <p className="text-xs leading-5 text-muted-foreground">
          {message} Részletek az{" "}
          <a href={privacyHref} className="underline underline-offset-4 hover:text-foreground cursor-pointer">
            adatkezelési tájékoztatóban
          </a>
          .
        </p>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowPrefs((p) => !p)}
            className={cn(
              "px-3 py-1.5 rounded-md border border-border/70 cursor-pointer",
              "bg-muted text-muted-foreground text-xs",
              "hover:bg-muted/80 transition-colors flex items-center gap-1"
            )}
            aria-expanded={showPrefs}
            aria-controls="cookie-preferences-inline"
          >
            {customizeText}
            {showPrefs ? <ChevronUp className="size-3" /> : <ChevronDown className="size-3" />}
          </button>

          <button
            type="button"
            onClick={rejectAll}
            className={cn(
              "px-3 py-1.5 rounded-md text-xs cursor-pointer",
              "bg-muted text-muted-foreground border border-border/70",
              "hover:bg-muted/80 transition-colors"
            )}
          >
            {rejectText}
          </button>

          <button
            type="button"
            onClick={acceptAll}
            className={cn(
              "ml-auto px-3 py-1.5 rounded-md text-xs cursor-pointer font-medium",
              "bg-primary text-primary-foreground",
              "hover:bg-primary/90 transition-colors"
            )}
          >
            {acceptText}
          </button>
        </div>

        <div
          id="cookie-preferences-inline"
          ref={prefsRef}
          style={{ height: prefsHeight ? `${prefsHeight}px` : 0 }}
          className={cn("overflow-hidden transition-[height] duration-300 ease-out will-change-[height]")}
        >
          {showPrefs && (
            <div className="mt-2 flex flex-col gap-2 animate-in fade-in slide-in-from-bottom-2 duration-200">
              <PrefRow title="Szükséges" desc="Az oldal alapvető működéséhez nélkülözhetetlen." field="necessary" locked />
              <PrefRow title="Funkcionális" desc="Megjegyzi a beállításaidat, kényelmi funkciók." field="functional" />
              <PrefRow title="Analitika" desc="Segít mérni és javítani az oldalt (Google Analytics)." field="analytics" />
              <PrefRow title="Marketing" desc="Személyre szabott hirdetésekhez (jelenleg nincs használatban)." field="marketing" />

              <div className="flex justify-end gap-2 mt-1">
                <button
                  type="button"
                  onClick={() => setShowPrefs(false)}
                  className="px-2.5 py-1 rounded-md border border-border bg-muted text-muted-foreground text-xs hover:bg-muted/80 cursor-pointer"
                >
                  Mégse
                </button>
                <button
                  type="button"
                  onClick={savePreferences}
                  className="px-2.5 py-1 rounded-md bg-primary text-primary-foreground text-xs hover:bg-primary/90 cursor-pointer"
                >
                  Beállítások mentése
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
