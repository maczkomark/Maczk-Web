"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { NAV, SITE } from "@/lib/utils";
import { cn } from "@/lib/utils";

export function Navbar() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [path]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-all duration-300",
          scrolled ? "bg-black/70 backdrop-blur-xl border-b border-white/10" : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="font-display text-lg font-bold text-white flex items-center gap-2.5" aria-label={SITE.name}>
            <Image src="/logo-mark.png" alt="" width={36} height={36} priority className="size-9 rounded-md" />
            <span className="tracking-wide">{SITE.name}</span>
          </Link>
          <nav className="hidden lg:flex items-center gap-1">
            {NAV.map((item) => {
              const active = path === item.href || (item.href !== "/" && path.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative px-3 py-2 text-sm font-medium transition-colors",
                    active ? "text-white" : "text-neutral-400 hover:text-white"
                  )}
                >
                  {item.label}
                  {active && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute inset-x-2 -bottom-px h-px bg-gradient-to-r from-blue-500 to-violet-500"
                    />
                  )}
                </Link>
              );
            })}
          </nav>
          <Link
            href="/kapcsolat"
            className="hidden md:inline-flex items-center gap-2 rounded-full bg-white px-5 py-2 text-sm font-medium text-black hover:bg-white/90 transition"
          >
            Árajánlat
          </Link>
          <button
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden inline-flex items-center justify-center size-10 rounded-md text-white hover:bg-white/5"
            aria-label="Menü"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-2xl pt-20 px-6 lg:hidden"
          >
            <nav className="flex flex-col gap-2">
              {NAV.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ x: -40, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.05 * i }}
                >
                  <Link
                    href={item.href}
                    className="block py-3 text-2xl font-display font-bold text-white border-b border-white/5"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <Link
                href="/kapcsolat"
                className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-black"
              >
                Árajánlatot kérek
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
