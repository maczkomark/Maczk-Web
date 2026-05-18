import Link from "next/link";

export default function NotFound() {
  return (
    <section className="min-h-[80vh] flex flex-col items-center justify-center px-4 text-center bg-black">
      <h1 className="font-display text-6xl md:text-9xl font-bold text-gradient-brand mb-4">404</h1>
      <p className="text-xl text-white mb-2">Ez az oldal nem található.</p>
      <p className="text-neutral-400 mb-8">Lehet, hogy elköltözött, vagy sosem létezett.</p>
      <Link href="/" className="rounded-full bg-white px-6 py-3 text-sm font-medium text-black hover:bg-white/90 transition">
        Vissza a főoldalra
      </Link>
    </section>
  );
}
