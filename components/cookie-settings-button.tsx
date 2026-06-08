"use client";
import { Cookie } from "lucide-react";
import { openCookieSettings } from "@/lib/consent";

export function CookieSettingsButton({ className }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={openCookieSettings}
      className={
        className ??
        "inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white hover:bg-white/10 transition"
      }
    >
      <Cookie className="size-4" /> Süti-beállítások módosítása
    </button>
  );
}
