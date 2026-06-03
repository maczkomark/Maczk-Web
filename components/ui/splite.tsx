"use client";
import { Suspense, lazy, useEffect, useRef, useState } from "react";

const Spline = lazy(() => import("@splinetool/react-spline"));

interface SplineSceneProps {
  scene: string;
  className?: string;
}

/**
 * A Spline 3D runtime (~több száz KB) csak akkor töltődik be, amikor a szekció
 * tényleg a nézetbe ér — így a kezdeti oldalbetöltés gyors marad. Reduced-motion
 * esetén egyáltalán nem töltjük be a 3D-t, csak egy halk placeholder marad.
 */
export function SplineScene({ scene, className }: SplineSceneProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [allowMotion, setAllowMotion] = useState(true);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setAllowMotion(!reduce);
    if (reduce) return;

    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      {inView && allowMotion ? (
        <Suspense
          fallback={
            <div className="w-full h-full flex items-center justify-center">
              <span className="loader" />
            </div>
          }
        >
          <Spline scene={scene} className="w-full h-full" />
        </Suspense>
      ) : (
        <div
          aria-hidden
          className="w-full h-full bg-ai-glow"
          style={{
            background:
              "radial-gradient(50% 50% at 60% 40%, rgba(34,211,238,0.18) 0%, rgba(139,92,246,0.10) 45%, transparent 75%)",
          }}
        />
      )}
    </div>
  );
}
